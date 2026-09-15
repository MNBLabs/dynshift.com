// Renders one frame of the hero's black hole headlessly and writes it as the
// poster the page shows while WebGPU is unavailable or still warming up.
//
//   npm run poster
//   -> public/brand/sky.webp (1600x900, desktop layout) and
//      public/brand/sky-portrait.webp (900x1600, the renderer's mobile layout)
//
// Same pipeline, same settings as the browser: the poster is a frame of the
// real thing, not an approximation of it.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolveShader } from "@vgpu/wgsl/runtime";
import { PNG } from "pngjs";
import * as vgpu from "vgpu/node";
import { defaultHeroSettings } from "../src/hero/settings.ts";
import {
  createTargets, destroyTargets, prewarm, renderChain,
  setBakeUniforms, setBindings, setPostUniforms, setShadeUniforms,
} from "../src/hero/pipeline.ts";
import { createNoiseVolume, NOISE_VOLUME_SIZE, noiseVolumeSampler } from "../src/hero/noise-volume.mjs";

const WIDTH = Number(process.argv[2] ?? 1600);
const HEIGHT = Number(process.argv[3] ?? 900);
const OUT = process.argv[4] ?? "public/brand/sky.png";
// --mobile applies the renderer's own under-768px layout: hole centred,
// no roll, no pointer yaw, the copy band faded.
const MOBILE = process.argv.includes("--mobile");

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const shader = async (name) => (await resolveShader({ entry: here(`../src/hero/${name}.wgsl`) })).wgsl;

const [bake, refine, shade, bloom, composite] = await Promise.all(
  ["bake", "refine", "shade", "bloom", "composite"].map(shader),
);

const gpu = await vgpu.init();
try {
  const settings = defaultHeroSettings();
  settings.bloom.radius *= 0.5;
  settings.bloom.strength *= 0.5;
  if (MOBILE) Object.assign(settings, { centerX: 0, centerY: 0, cameraRoll: 0, mouseYaw: 0, centerFade: 1 });

  const postSampler = vgpu.sampler(gpu, { minFilter: "linear", magFilter: "linear" });
  const effects = {
    bake: vgpu.effect(gpu, bake),
    refine: vgpu.effect(gpu, refine),
    shade: vgpu.effect(gpu, shade),
    bloomExtract: vgpu.effect(gpu, bloom),
    bloomBlurH0: vgpu.effect(gpu, bloom),
    bloomBlurV0: vgpu.effect(gpu, bloom),
    bloomDown1: vgpu.effect(gpu, bloom),
    bloomBlurH1: vgpu.effect(gpu, bloom),
    bloomBlurV1: vgpu.effect(gpu, bloom),
    bloomDown2: vgpu.effect(gpu, bloom),
    bloomBlurH2: vgpu.effect(gpu, bloom),
    bloomBlurV2: vgpu.effect(gpu, bloom),
    composite: vgpu.effect(gpu, composite),
    postSampler,
    noiseSampler: noiseVolumeSampler(vgpu, gpu),
    noiseVolume: createNoiseVolume(gpu, NOISE_VOLUME_SIZE),
  };
  const output = vgpu.target(gpu, { size: [WIDTH, HEIGHT] });
  const targets = createTargets(vgpu, gpu, [WIDTH, HEIGHT]);
  setBakeUniforms(effects, targets, settings);
  setShadeUniforms(effects, targets, settings, 4.2, 0);
  setBindings(effects, targets);
  setPostUniforms(effects, targets, settings);
  await prewarm(effects, targets, output);
  vgpu.frame(gpu, (frame) => renderChain(frame, effects, targets, output, true));
  const pixels = await output.color.read({ mipLevel: 0, region: "all" });
  const png = new PNG({ width: WIDTH, height: HEIGHT });
  png.data.set(pixels);
  writeFileSync(OUT, PNG.sync.write(png));
  destroyTargets(targets);
  console.log(`wrote ${OUT} ${WIDTH}x${HEIGHT}`);
} finally {
  gpu.dispose();
}
