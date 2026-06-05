import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const sourcePath = fileURLToPath(new URL("public/images/pixel-bloom.png", root));
const texturePath = fileURLToPath(new URL("public/data/pixel-bloom-field.png", root));
const manifestPath = fileURLToPath(new URL("src/generated/pixelBloomManifest.json", root));

const textureWidth = 192;
const textureHeight = 288;
const seedLimit = 512;

function luminance(r, g, b) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function quantizeColor(value) {
  return Math.max(0, Math.min(255, Math.round(value / 24) * 24));
}

await mkdir(dirname(texturePath), { recursive: true });
await mkdir(dirname(manifestPath), { recursive: true });

const sourceMeta = await sharp(sourcePath).metadata();
const resized = sharp(sourcePath)
  .resize(textureWidth, textureHeight, {
    fit: "fill",
    kernel: "lanczos3"
  })
  .ensureAlpha();

await resized.clone().png({ compressionLevel: 9, palette: false }).toFile(texturePath);

const { data } = await resized.raw().toBuffer({ resolveWithObject: true });
const significant = [];
const paletteBins = new Map();
let weightTotal = 0;
let weightedX = 0;
let weightedY = 0;
let minX = 1;
let minY = 1;
let maxX = 0;
let maxY = 0;

for (let y = 0; y < textureHeight; y += 1) {
  for (let x = 0; x < textureWidth; x += 1) {
    const offset = (y * textureWidth + x) * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const a = data[offset + 3] / 255;
    const lum = luminance(r, g, b) * a;
    const chroma = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
    const score = Math.max(0, lum - 0.025) + chroma * 0.18;

    if (score < 0.08) continue;

    const nx = (x + 0.5) / textureWidth;
    const ny = (y + 0.5) / textureHeight;
    significant.push({
      x: Number(nx.toFixed(5)),
      y: Number(ny.toFixed(5)),
      rgba: [r, g, b, Math.round(a * 255)],
      score: Number(score.toFixed(5))
    });

    const weight = score * score;
    weightTotal += weight;
    weightedX += nx * weight;
    weightedY += ny * weight;
    minX = Math.min(minX, nx);
    minY = Math.min(minY, ny);
    maxX = Math.max(maxX, nx);
    maxY = Math.max(maxY, ny);

    const key = `${quantizeColor(r)},${quantizeColor(g)},${quantizeColor(b)}`;
    paletteBins.set(key, (paletteBins.get(key) ?? 0) + weight);
  }
}

significant.sort((a, b) => b.score - a.score);

const palette = [...paletteBins.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 18)
  .map(([key, weight]) => ({
    rgb: key.split(",").map((value) => Number(value)),
    weight: Number((weight / Math.max(weightTotal, 1)).toFixed(5))
  }));

const manifest = {
  source: "/images/pixel-bloom.png",
  fieldTexture: "/data/pixel-bloom-field.png",
  sourceWidth: sourceMeta.width,
  sourceHeight: sourceMeta.height,
  textureWidth,
  textureHeight,
  significantPixelCount: significant.length,
  centerOfMass: {
    x: Number((weightedX / Math.max(weightTotal, 1)).toFixed(5)),
    y: Number((weightedY / Math.max(weightTotal, 1)).toFixed(5))
  },
  boundingBox: {
    x0: Number(minX.toFixed(5)),
    y0: Number(minY.toFixed(5)),
    x1: Number(maxX.toFixed(5)),
    y1: Number(maxY.toFixed(5))
  },
  palette,
  tendrilSeeds: significant.slice(0, seedLimit)
};

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(
  `Extracted ${significant.length} luminous/color pixels from ${sourceMeta.width}x${sourceMeta.height} into ${textureWidth}x${textureHeight}.`
);
