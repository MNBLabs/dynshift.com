/**
 * Every icon the site serves, generated from the supplied mark.
 *
 *   node tools/icons.mjs
 *
 * The source is brand/source/mark-white.svg, kept exactly as the designer
 * exported it. Nothing here redraws the mark: the path data is copied
 * through verbatim; only the canvas (viewBox), the fill and the backing tile
 * change.
 *
 * The export is a 566 x 566 artboard with the triangle in its top three
 * quarters (room was left for the wordmark under it). Icons need the mark
 * itself, centred, so every output crops to the triangle's own bounds: the
 * mask polygon spans x 39.25 to 526.75 and y 2.77 to 424.5.
 *
 * Outputs, all under public/:
 *   favicon.svg            the mark alone, black on light browser chrome and
 *                          white on dark (prefers-color-scheme), transparent
 *   favicon.ico            16, 32 and 48 px tiles, for anything without SVG
 *   favicon.png            96 px tile (a multiple of 48, as Search prefers)
 *   apple-touch-icon.png   180 px, square and full-bleed (iOS rounds it)
 *   icon-192.png, icon-512.png       rounded tiles for the web manifest
 *   icon-maskable-512.png  full-bleed, mark inside the maskable safe zone
 */
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const pub = (f) => join(root, "public", f);

const GROUND = "#0d0d0d"; // --ground, and the site's theme-color
const INK = "#ffffff"; // the supplied white

const source = readFileSync(join(root, "brand/source/mark-white.svg"), "utf8");
const inner = source.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");

// The triangle's bounds inside the artboard, from the mask polygon.
const B = { x: 39.25, y: 2.77, w: 487.5, h: 421.73 };
const cx = B.x + B.w / 2;
const cy = B.y + B.h / 2;

/** A square viewBox around the mark, the mark taking `fill` of its width. */
function crop(fill) {
  const side = B.w / fill;
  return `${(cx - side / 2).toFixed(2)} ${(cy - side / 2).toFixed(2)} ${side.toFixed(2)} ${side.toFixed(2)}`;
}

/** The mark's own paths with the paint (not the mask) set to `color`. */
function paint(color, idPrefix) {
  return inner
    .replace(/(<(?!mask)[a-z]+\b[^>]*?)fill="white"/g, `$1fill="${color}"`)
    .replace(/id="([^"]+)"/g, `id="${idPrefix}$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${idPrefix}$1)`);
}

// favicon.svg: transparent, follows the browser's light or dark chrome.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${crop(0.98)}">
<style>.m{fill:#000}@media (prefers-color-scheme:dark){.m{fill:#fff}}</style>
${paint("CURRENT", "f-").replace(/fill="CURRENT"/g, 'class="m"')}
</svg>
`;
writeFileSync(pub("favicon.svg"), favicon);

/**
 * A tile: the ground colour with the mark centred on it. Small sizes give
 * the mark more of the tile, because at 16 px every pixel of the delta's
 * counter matters more than the margin.
 */
function tile(size, { fill, radius }) {
  const r = radius * size;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<rect width="${size}" height="${size}" rx="${r}" fill="${GROUND}"/>
<svg x="0" y="0" width="${size}" height="${size}" viewBox="${crop(fill)}">${paint(INK, "t-")}</svg>
</svg>`;
}

async function png(svg, size, file) {
  await sharp(Buffer.from(svg), { density: 72 * 4 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(file);
}

const tmp = mkdtempSync(join(tmpdir(), "ds-icons-"));
try {
  const ico = [];
  for (const [size, fill] of [
    [16, 0.86],
    [32, 0.8],
    [48, 0.76],
  ]) {
    const f = join(tmp, `ico-${size}.png`);
    await png(tile(size, { fill, radius: 0.22 }), size, f);
    ico.push(f);
  }
  execFileSync("magick", [...ico, pub("favicon.ico")]);

  await png(tile(96, { fill: 0.72, radius: 0.22 }), 96, pub("favicon.png"));
  await png(tile(180, { fill: 0.62, radius: 0 }), 180, pub("apple-touch-icon.png"));
  await png(tile(192, { fill: 0.64, radius: 0.22 }), 192, pub("icon-192.png"));
  await png(tile(512, { fill: 0.64, radius: 0.22 }), 512, pub("icon-512.png"));
  // Maskable: launchers crop to as little as the central 80% circle; a mark
  // at 52% of the width stays inside it on every shape.
  await png(tile(512, { fill: 0.52, radius: 0 }), 512, pub("icon-maskable-512.png"));
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

console.log("icons written to public/");
