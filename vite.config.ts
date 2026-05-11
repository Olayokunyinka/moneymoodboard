// @ts-check
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { tanStackStartVite } from "@tanstack/start-plugin-core/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    tanStackStartVite({
      type: "ssr",
    }),
    tsConfigPaths(),
    tailwindcss(),
  ],
});
