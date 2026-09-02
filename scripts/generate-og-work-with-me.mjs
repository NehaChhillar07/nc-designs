// Generates the OG card for /work-with-me in the near-black per-page family
// (title, short warm-underlined phrase, dash, name) so a link dropped into a
// DM or LinkedIn message previews like the rest of the site's cards.
//
//   node scripts/generate-og-work-with-me.mjs
//
// Static filename (like the other page cards): the card is new, so no cache
// holds a stale copy of it.

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "public/og/work-with-me.png");

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: radial-gradient(120% 140% at 15% 20%, #1c1c1e 0%, #0b0b0c 60%, #050506 100%);
    font-family: Inter, -apple-system, "Helvetica Neue", sans-serif;
    overflow: hidden;
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 96px;
    color: #ffffff;
  }
  .title {
    font-size: 84px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }
  .sub {
    margin-top: 28px;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: -0.012em;
    color: #E5E7EB;
  }
  .mark { position: relative; display: inline-block; }
  .mark::after {
    content: "";
    position: absolute;
    left: -2px; right: -2px; bottom: -6px;
    height: 6px;
    background: #FF9800;
    border-radius: 3px;
  }
  .dash {
    margin-top: 44px;
    width: 64px; height: 4px;
    border-radius: 2px;
    background: #9CA3AF;
  }
  .name {
    margin-top: 28px;
    font-size: 28px;
    font-weight: 500;
    color: #D1D5DB;
  }
</style>
</head>
<body>
  <div class="title">Work with me</div>
  <div class="sub">Product design plus a <span class="mark">working front end</span>. One person.</div>
  <div class="dash"></div>
  <div class="name">Neha Chhillar</div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);

const interLoaded = await page.evaluate(() => document.fonts.check("700 84px Inter"));
if (!interLoaded) throw new Error("Inter did not load — refusing to write a card in the fallback face");

const png = await page.screenshot({ type: "png" });
await browser.close();
await writeFile(OUT, png);
console.log(`wrote ${path.relative(root, OUT)} — 1200x630 @2x`);
