
# Eject to Vercel SSR

## Why the 404 happens now

The current build targets **Cloudflare Workers** via `@lovable.dev/vite-tanstack-config` + `@cloudflare/vite-plugin`. The output in `dist/` is a Worker bundle (`_worker.js` + `wrangler.jsonc`). Vercel doesn't recognise it, so every URL → `404 NOT_FOUND`. Vercel needs either a static SPA or a Node/Edge serverless function output.

You picked **Full SSR on Vercel**, so we'll re-target the build at Vercel's serverless preset (Nitro `vercel`), keeping SSR + server routes (`sitemap.xml`, `robots.txt`, `/$pillar/$post`) working.

## What this changes (and the trade-off you accepted)

- The Lovable preview and one-click Publish are wired to the Cloudflare preset. Once we eject, **the in-editor live preview may behave differently and the Lovable Publish button may stop producing a working build**. Vercel becomes the source of truth for hosting.
- The Lovable GitHub sync still works for editing — only the runtime target moves.

## Plan

### 1. Replace `vite.config.ts`
Drop `@lovable.dev/vite-tanstack-config` (which silently injects the Cloudflare plugin) and write an explicit config:

```ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({ target: "vercel" }), // <- Nitro vercel preset
    viteReact(),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
});
```

The `target: "vercel"` flag is the key change — Nitro emits a `.vercel/output/` directory in the v3 Build Output API format, which Vercel auto-detects.

### 2. Simplify `src/server.ts`
The current file is a Cloudflare Worker `export default { fetch }` shim with custom error normalisation. On Vercel, Nitro generates the serverless entry; we don't need that shim. We will:
- Delete `src/server.ts`, `src/lib/error-capture.ts`, `src/lib/error-page.ts` (Cloudflare-specific).
- Keep the `errorComponent` on the root route (already present) so React-tree errors still get a branded fallback.
- Move the legacy-redirect logic from `src/server.ts` into a tiny TanStack `beforeLoad` on the root route, or skip it (we don't actually have legacy URLs yet).

### 3. Remove Cloudflare-only files
- Delete `wrangler.jsonc`.
- Remove `@cloudflare/vite-plugin` and `@lovable.dev/vite-tanstack-config` from `package.json`.

### 4. Add `vercel.json` (minimal)
Nitro's vercel preset usually self-configures, but pin the framework + node version to avoid auto-detection surprises:

```json
{
  "framework": null,
  "buildCommand": "vite build",
  "outputDirectory": ".vercel/output"
}
```

### 5. Convert `sitemap.xml` and `robots.txt`
They are currently TanStack server routes. They'll keep working under Nitro vercel (each becomes its own serverless function), but for a static, free-tier-friendly result we'll convert them to static files generated at build time via a small `scripts/generate-static.mjs` that runs in `postbuild`. Output → `public/sitemap.xml` and `public/robots.txt`. Then delete the two server-route files. (This also avoids spending Vercel function invocations on bot traffic.)

### 6. Verify on Vercel
- Push to GitHub (already done). Vercel will pick up the next commit.
- In Vercel project settings: **Framework Preset → Other**, **Build Command → `vite build`**, **Output Directory → `.vercel/output`** (matches `vercel.json` above).
- Add any env vars that `process.env` currently reads (none required for the current frontend-only app — Lovable Cloud isn't enabled).
- After deploy, test: `/`, `/budgeting`, `/budgeting/zero-based-budgeting`, `/budgeting/some-other-stub` (catch-all), `/sitemap.xml`, `/robots.txt`, hard-refresh on a deep link.

### 7. Roll-back path
If anything goes sideways, restoring the original `vite.config.ts`, `src/server.ts`, `wrangler.jsonc`, and re-adding the two removed deps puts the project back on Cloudflare/Lovable hosting. I'll keep the diff small and atomic so this is one revert.

## Out of scope
- Custom domain on Vercel (do that in Vercel UI after the build is green).
- Switching to Edge runtime (we're picking Node serverless for max compatibility).
- Any changes to app code, routes, or content.
