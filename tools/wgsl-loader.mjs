// Node ESM hook so `import shader from "./x.wgsl"` works outside a bundler,
// resolving the import graph the same way the Vite plugin does.
import { fileURLToPath } from "node:url";
import { resolveShader } from "@vgpu/wgsl/runtime";

export async function load(url, context, next) {
  if (!url.endsWith(".wgsl")) return next(url, context);
  const resolved = await resolveShader({ entry: fileURLToPath(url) });
  return {
    format: "module",
    shortCircuit: true,
    source: `export default ${JSON.stringify({ version: 1, wgsl: resolved.wgsl, functionExports: [] })};`,
  };
}
