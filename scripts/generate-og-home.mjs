// Regenerates public/og/home.png — the card that shows when the site root is
// pasted into Slack, LinkedIn, iMessage, or X.
//
// The six per-page cards in public/og/ share one layout: near-black field,
// oversized white subject on the left, hairline rule, small grey line under it,
// and a product screenshot floating on the right. This renders the homepage
// card in that same layout so the set stays one family.
//
//   node scripts/generate-og-home.mjs
//
// Geometry below was sampled from public/og/human-firewall.png so the new card
// lines up with the existing ones rather than approximating them by eye.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(root, "public/work/1st-case study/hf-dashboard-overview.jpeg");
const OUT = path.join(root, "public/og/home.png");

// The source shot is 3360x1922. Its bottom strip carries the signed-in account
// row (name + email) and a floating action button; clipping to 1770 drops both,
// which matters for an image whose whole job is to be pasted in public.
const SHOT_W = 3360;
const SHOT_FULL_H = 1922;
const SHOT_CLIP_H = 1770;

// Sampled from human-firewall.png: screenshot occupies x 716-1134, centred on y 315.
const FRAME_W = 418;
const FRAME_H = Math.round((FRAME_W * SHOT_CLIP_H) / SHOT_W); // 220
const IMG_H = (FRAME_W * SHOT_FULL_H) / SHOT_W; // drawn taller, clipped by the frame

const shot = await readFile(SOURCE);
const shotUri = `data:image/jpeg;base64,${shot.toString("base64")}`;

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #050505;
    font-family: Inter, -apple-system, "Helvetica Neue", sans-serif;
    display: flex; align-items: center;
    overflow: hidden;
  }
  .left { padding-left: 76px; width: 640px; }
  h1 {
    font-size: 78px; font-weight: 800; line-height: 0.98;
    letter-spacing: -0.035em; color: #ffffff;
  }
  .rule { width: 60px; height: 2px; background: #8d8d8d; margin: 40px 0 26px; }
  .role { font-size: 23px; font-weight: 500; letter-spacing: -0.01em; color: #dbdbdb; }
  .frame {
    width: ${FRAME_W}px; height: ${FRAME_H}px;
    margin-left: 22px;
    border-radius: 9px; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 24px 60px rgba(0,0,0,0.65);
    background: #ffffff;
  }
  .frame img { display: block; width: ${FRAME_W}px; height: ${IMG_H}px; }
</style>
</head>
<body>
  <div class="left">
    <h1>Neha<br>Chhillar</h1>
    <div class="rule"></div>
    <div class="role">Product Designer</div>
  </div>
  <div class="frame"><img src="${shotUri}" alt=""></div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: "png" });
await browser.close();

await writeFile(OUT, png);
console.log(`wrote ${path.relative(root, OUT)} — 1200x630`);
