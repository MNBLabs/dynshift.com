// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { wgslVitePlugin } from "@vgpu/wgsl/loader-vite";

/**
 * The deployed origin, written down once. Canonical URLs, the sitemap and
 * the social-card URL derive from it; every internal link is relative.
 */
export default defineConfig({
  site: "https://dynshift.com",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [sitemap()],
  // The hero's shaders live in .wgsl files that import one another; the
  // loader resolves that graph at build time. No client framework: the page
  // is a gateway, and a gateway should be instant.
  vite: { plugins: [wgslVitePlugin()] },
});
