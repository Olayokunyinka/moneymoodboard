// Postbuild adapter: converts Vite output (dist/client + dist/server) into
// Vercel's Build Output API v3 layout (.vercel/output).
//
// Layout produced:
//   .vercel/output/static/         <- static assets (from dist/client)
//   .vercel/output/functions/ssr.func/   <- Node serverless function for SSR
//   .vercel/output/config.json     <- routing rules
import { cpSync, mkdirSync, writeFileSync, existsSync, rmSync, readdirSync, statSync, copyFileSync } from "node:fs";
import { resolve, join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { nodeFileTrace } from "@vercel/nft";

const here = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(here, "..");
const dist = resolve(root, "dist");
const out = resolve(root, ".vercel/output");
const staticDir = resolve(out, "static");
const fnDir = resolve(out, "functions/ssr.func");

// Clean
rmSync(out, { recursive: true, force: true });
mkdirSync(staticDir, { recursive: true });
mkdirSync(fnDir, { recursive: true });

// 1) Copy client build to static dir
cpSync(resolve(dist, "client"), staticDir, { recursive: true });

// 2) Copy server build into the function dir (preserve dist/server/* layout so
//    relative imports inside start.js still resolve)
cpSync(resolve(dist, "server"), fnDir, { recursive: true });

// Copy package.json for dependencies
copyFileSync(resolve(root, "package.json"), join(fnDir, "package.json"));

// 3) Trace runtime dependencies of start.js using @vercel/nft and copy them
//     into the function dir so externalized packages resolve at runtime.
const serverEntry = resolve(fnDir, "start.js");
const { fileList, warnings } = await nodeFileTrace([serverEntry], {
  base: root,
  processCwd: root,
});
for (const w of warnings) {
  if (!String(w.message || w).includes("Cannot find module")) continue;
  console.warn("[nft]", w.message || w);
}
let copied = 0;
for (const file of fileList) {
  const abs = resolve(root, file);
  // Skip files that are already inside the function dir (server build itself)
  if (abs.startsWith(fnDir + "/") || abs === serverEntry) continue;
  if (!existsSync(abs)) continue;
  const dest = resolve(fnDir, file);
  mkdirSync(dirname(dest), { recursive: true });
  try {
    copyFileSync(abs, dest);
    copied++;
  } catch (e) {
    console.warn("[nft] copy failed", file, e.message);
  }
}
console.log(`✓ Traced and copied ${copied} runtime dependency files`);

// 3) Vercel function handler — adapts Node (req,res) ↔ Web fetch.
const handler = `import { Readable } from "node:stream";
import server from "./server.js";

export default async function handler(req, res) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const url = new URL(req.url, \`\${protocol}://\${host}\`);

    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) {
      if (Array.isArray(v)) v.forEach((vv) => headers.append(k, vv));
      else if (v != null) headers.set(k, String(v));
    }

    const method = req.method || "GET";
    const hasBody = method !== "GET" && method !== "HEAD";
    const request = new Request(url.toString(), {
      method,
      headers,
      body: hasBody ? Readable.toWeb(req) : undefined,
      duplex: "half",
    });

    const response = await server.fetch(request);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    if (response.body) {
      const nodeStream = Readable.fromWeb(response.body);
      nodeStream.pipe(res);
    } else {
      res.end();
    }
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("content-type", "text/plain");
    }
    res.end("Internal Server Error");
  }
}
`;
writeFileSync(join(fnDir, "index.mjs"), handler);

// 4) .vc-config.json for the function
writeFileSync(
  join(fnDir, ".vc-config.json"),
  JSON.stringify({
    runtime: "nodejs20.x",
    handler: "index.mjs",
    launcherType: "Nodejs",
    shouldAddHelpers: false,
    shouldAddSourcemapSupport: false,
    supportsResponseStreaming: true,
  }, null, 2)
);

// 5) Build the list of static files so we can route them directly and let
//    everything else fall through to SSR.
function listFiles(dir, prefix = "") {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = prefix ? `${prefix}/${entry}` : entry;
    const s = statSync(full);
    if (s.isDirectory()) out.push(...listFiles(full, rel));
    else out.push(rel);
  }
  return out;
}
const staticFiles = listFiles(staticDir);

// 6) config.json — handle filesystem first (static), then fall back to SSR
const config = {
  version: 3,
  routes: [
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/ssr" },
  ],
};
writeFileSync(resolve(out, "config.json"), JSON.stringify(config, null, 2));

console.log(`✓ Vercel output built: ${staticFiles.length} static files + ssr function`);
