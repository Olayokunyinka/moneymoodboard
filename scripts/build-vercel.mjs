// Postbuild adapter: converts Vite output (dist/client + dist/server) into
// Vercel's Build Output API v3 layout (.vercel/output).
//
// Layout produced:
//   .vercel/output/static/         <- static assets (from dist/client)
//   .vercel/output/functions/ssr.func/   <- Node serverless function for SSR
//   .vercel/output/config.json     <- routing rules
import { cpSync, mkdirSync, writeFileSync, existsSync, rmSync, readdirSync, statSync } from "node:fs";
import { resolve, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

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
//    relative imports inside server.js still resolve)
cpSync(resolve(dist, "server"), fnDir, { recursive: true });

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
