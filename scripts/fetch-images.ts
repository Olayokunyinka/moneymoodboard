// Optional build-time pipeline: downloads Unsplash hero photos for each
// article, generates AVIF/WebP/JPEG derivatives at 1600w and 800w, and
// composites a 1200×630 OG card per article. Skipped by default to keep
// local dev fast; set ENABLE_IMAGE_PIPELINE=1 to run.
//
// Requires `sharp` to be installed (`bun add -d sharp`).
//
// Outputs:
//   public/og/articles/{pillar}__{slug}-1600.{avif|webp|jpg}
//   public/og/articles/{pillar}__{slug}-800.{avif|webp|jpg}
//   public/og/cards/{pillar}__{slug}.png
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { pillars } from "../src/lib/pillars";
import { articleBodies } from "../src/lib/articles";

if (!process.env.ENABLE_IMAGE_PIPELINE) {
  console.log("ℹ Image pipeline skipped (set ENABLE_IMAGE_PIPELINE=1 to run).");
  process.exit(0);
}

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");
const outArticles = resolve(projectRoot, "public/og/articles");
const outCards = resolve(projectRoot, "public/og/cards");
mkdirSync(outArticles, { recursive: true });
mkdirSync(outCards, { recursive: true });

// Lazy-load sharp so the script can be evaluated even when sharp isn't installed.
let sharp: typeof import("sharp").default;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("✗ `sharp` is not installed. Run `bun add -d sharp` first.");
  process.exit(1);
}

async function downloadOnce(url: string, destBase: string) {
  if (existsSync(`${destBase}.jpg`)) return;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`fetch ${url} → ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  // 1600w
  await Promise.all([
    sharp(buf).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${destBase}-1600.jpg`),
    sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${destBase}-1600.webp`),
    sharp(buf).resize({ width: 1600, withoutEnlargement: true }).avif({ quality: 55, effort: 0 }).toFile(`${destBase}-1600.avif`),
    sharp(buf).resize({ width: 800, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(`${destBase}-800.jpg`),
    sharp(buf).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${destBase}-800.webp`),
    sharp(buf).resize({ width: 800, withoutEnlargement: true }).avif({ quality: 52, effort: 0 }).toFile(`${destBase}-800.avif`),
  ]);
  // Fallback canonical .jpg (for legacy hotlinks)
  await sharp(buf).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(`${destBase}.jpg`);
}

function escapeSvg(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function ogCard(pillarLabel: string, title: string, dest: string) {
  if (existsSync(dest)) return;
  const safeTitle = escapeSvg(title.slice(0, 110));
  const safePillar = escapeSvg(pillarLabel.toUpperCase());
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="60" y="60" width="200" height="36" rx="18" fill="#22d3ee" opacity="0.18"/>
  <text x="78" y="86" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="700" fill="#22d3ee" letter-spacing="2">${safePillar}</text>
  <foreignObject x="60" y="140" width="1080" height="360">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Inter,system-ui,sans-serif;font-size:62px;font-weight:800;line-height:1.1;color:#f8fafc;">
      ${safeTitle}
    </div>
  </foreignObject>
  <text x="60" y="570" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="700" fill="#94a3b8">MoneyMoodBoard</text>
  <circle cx="1140" cy="555" r="18" fill="#22d3ee"/>
</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(dest);
}

type Job = { key: string; base: string; img?: string; title: string; pillarLabel: string };
const jobs: Job[] = [];
for (const p of pillars) {
  for (const c of p.clusters) {
    for (const post of c.posts) {
      const key = `${p.slug}/${post.slug}`;
      const body = articleBodies[key];
      jobs.push({
        key,
        base: `${p.slug}__${post.slug}`,
        img: body?.featuredImage && body.featuredImage.startsWith("http") ? body.featuredImage : undefined,
        title: post.title,
        pillarLabel: p.shortName ?? p.slug,
      });
    }
  }
}

const CONCURRENCY = 6;
let count = 0;
let idx = 0;
async function worker() {
  while (idx < jobs.length) {
    const j = jobs[idx++];
    if (j.img) {
      try {
        await downloadOnce(j.img, resolve(outArticles, j.base));
      } catch (e) {
        console.warn("download failed", j.key, (e as Error).message);
      }
    }
    try {
      await ogCard(j.pillarLabel, j.title, resolve(outCards, `${j.base}.png`));
      count++;
      if (count % 10 === 0) console.log(`  ...${count}/${jobs.length}`);
    } catch (e) {
      console.warn("og card failed", j.key, (e as Error).message);
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.log(`✓ Image pipeline processed ${count} articles`);
