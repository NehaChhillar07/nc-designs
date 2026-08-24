// Regenerates public/og/home.png — the card that shows when the site root is
// pasted into Slack, LinkedIn, iMessage, or X.
//
// This one deliberately breaks from the near-black layout the six per-page
// cards share. It is the homepage card, so it mirrors the homepage hero
// instead: the warm gradient blob, the name stacked and set huge, and the
// positioning line under it. Someone who clicks through should land on the
// thing they just saw.
//
//   node scripts/generate-og-home.mjs
//
// Geometry is a scaled read of app/page.tsx: uppercase, tracking-tighter,
// leading-none, and the second name line pulled up so the two blocks sit
// tight the way they do on the page.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GRADIENT = path.join(root, "public/hero-gradient.avif");
const OUT = path.join(root, "public/og/home.png");

// The blob is a 1200x1200 AVIF with an alpha channel. Sized so its warm core
// sits behind the name and its fade lands inside the frame, leaving clean
// white at the corners. Larger than this and the whole card goes pink.
const BLOB = 980;

const gradient = await readFile(GRADIENT);
const gradientUri = `data:image/avif;base64,${gradient.toString("base64")}`;

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
    background: #ffffff;
    font-family: Inter, -apple-system, "Helvetica Neue", sans-serif;
    overflow: hidden;
    position: relative;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  /* Same treatment as the hero: sits behind the name at 80% so the black
     type stays at full contrast over it. */
  .blob {
    position: absolute;
    width: ${BLOB}px; height: ${BLOB}px;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.8;
    z-index: 0;
  }
  .name {
    position: relative; z-index: 1;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 150px;
    line-height: 1;
    letter-spacing: -0.048em;
    color: #111827;
  }
  /* The hero pulls the second line up by 0.24em, but the hero has a portrait
     sitting in the gap. With nothing between them, two dense lines of caps at
     that pull intersect rather than overlap. 0.15em keeps them tight. */
  .name .second { margin-top: -0.15em; }

  .line {
    position: relative; z-index: 1;
    margin-top: 40px;
    font-size: 28px;
    font-weight: 500;
    letter-spacing: -0.012em;
    color: #111827;
    white-space: nowrap;
  }
  /* The marker underline is the site's signature device. Drawn as a block
     rather than text-decoration so the weight and offset are controllable at
     this size, and kept warm because this line sits past the blob's core. */
  .mark { position: relative; display: inline-block; }
  .mark::after {
    content: "";
    position: absolute;
    left: -2px; right: -2px; bottom: -6px;
    height: 6px;
    background: #FF9800;
    border-radius: 3px;
  }
</style>
</head>
<body>
  <img class="blob" src="${gradientUri}" alt="">
  <div class="name">
    <div>Neha</div>
    <div class="second">Chhillar</div>
  </div>
  <div class="line">Product Designer specialising in security and <span class="mark">AI-native B2B SaaS</span></div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);

// Guard against the silent failure mode: if Google Fonts is unreachable the
// page falls back to Helvetica and the card ships in the wrong typeface.
const interLoaded = await page.evaluate(() => document.fonts.check("700 150px Inter"));
if (!interLoaded) throw new Error("Inter did not load — refusing to write a card in the fallback face");

// Second guard: the name must not overflow the card horizontally.
const overflow = await page.evaluate(() => {
  const el = document.querySelector(".name");
  const line = document.querySelector(".line");
  return Math.max(el.getBoundingClientRect().width, line.getBoundingClientRect().width);
});
if (overflow > 1120) throw new Error(`content is ${Math.round(overflow)}px wide, past the 1120px safe width`);

const png = await page.screenshot({ type: "png" });
await browser.close();

await writeFile(OUT, png);
console.log(`wrote ${path.relative(root, OUT)} — 1200x630 @2x, widest line ${Math.round(overflow)}px`);
