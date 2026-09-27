// Generates the Airtel Travel Mode share card and homepage cover from real
// captures of the prototype (public/work/airtel-travel-mode/*.png), laid on
// the editorial-dark band the case study opens with. Colours are read from
// the tokens in app/globals.css rather than typed here, so the card and the
// page cannot drift apart.
//
//   node scripts/generate-og-airtel.mjs
//
// Writes:
//   public/og/airtel-travel-mode.png          1200x630 @2x (link previews)
//   public/work/thumbs/airtel-travel-mode.png 1800x1800 (homepage card)

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSET = path.join(root, "public/work/airtel-travel-mode");

/* Pull a custom property's value out of the :root block of globals.css. */
const css = await readFile(path.join(root, "app/globals.css"), "utf8");
function token(name) {
    const m = css.match(new RegExp(`${name}:\\s*([^;]+);`));
    if (!m) throw new Error(`token ${name} not found in globals.css`);
    return m[1].trim();
}
const T = {
    band: token("--editorial-dark-gradient"),
    cream: token("--cream"),
    creamSoft: token("--cream-soft"),
    creamFaint: token("--cream-faint"),
    warm: token("--accent-warm"),
};

async function dataUri(name) {
    const buf = await readFile(path.join(ASSET, `${name}.png`));
    return `data:image/png;base64,${buf.toString("base64")}`;
}
const shots = {
    front: await dataUri("landed-connected"),
    left: await dataUri("dashboard-day-3"),
    right: await dataUri("lock-connected"),
};

const phoneCss = `
  .phone { position: absolute; border-radius: 44px; overflow: hidden;
           box-shadow: 0 40px 90px rgb(0 0 0 / 0.55), 0 0 0 1px rgb(255 255 255 / 0.08); }
  .phone img { display: block; width: 100%; height: auto; }
`;

const fonts = `<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&family=Inter:wght@400;500&family=Caveat:wght@600&display=swap" rel="stylesheet">`;

const ogHtml = `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; background: ${T.band};
         font-family: Inter, sans-serif; color: ${T.cream}; position: relative; }
  .copy { position: absolute; left: 88px; top: 0; bottom: 0; width: 660px;
          display: flex; flex-direction: column; justify-content: center; }
  .eyebrow { font-size: 22px; font-weight: 500; color: ${T.creamSoft}; letter-spacing: 0.01em; }
  .title { margin-top: 22px; font-family: "Space Grotesk", sans-serif; font-weight: 500;
           font-size: 54px; line-height: 1.18; letter-spacing: -0.03em; }
  /* The hook wraps across lines, so the mark is a text underline that wraps
     with it rather than a block that cannot. */
  .mark { text-decoration: underline; text-decoration-color: ${T.warm};
          text-decoration-thickness: 5px; text-underline-offset: 12px; }
  .dash { margin-top: 40px; width: 64px; height: 4px; border-radius: 2px; background: ${T.creamFaint}; }
  .name { margin-top: 24px; font-size: 26px; font-weight: 500; color: ${T.creamSoft}; }
  ${phoneCss}
  .p1 { width: 250px; left: 760px; top: 70px; transform: rotate(-4deg); opacity: 0.9; }
  .p2 { width: 250px; left: 900px; top: 40px; transform: rotate(3deg); }
</style></head><body>
  <div class="copy">
    <div class="eyebrow">Airtel Travel Mode · a mobile case study</div>
    <div class="title">You've landed.<br><span class="mark">Is your phone working?</span></div>
    <div class="dash"></div>
    <div class="name">Neha Chhillar</div>
  </div>
  <div class="phone p1"><img src="${shots.left}"></div>
  <div class="phone p2"><img src="${shots.front}"></div>
</body></html>`;

const coverHtml = `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: transparent; }
  .card { width: 1800px; height: 1800px; border-radius: 72px; overflow: hidden; position: relative;
          background: ${T.band}; }
  ${phoneCss}
  .phone { border-radius: 64px; }
  /* Held in the upper two thirds, like the other covers, so the dark lower
     third is free for the title the Explore More card lays over it. */
  .l { width: 380px; left: 360px; top: 430px; transform: rotate(-7deg); opacity: 0.92; }
  .r { width: 380px; right: 360px; top: 430px; transform: rotate(7deg); opacity: 0.92; }
  .f { width: 440px; left: 680px; top: 330px; }
</style></head><body>
  <div class="card">
    <div class="phone l"><img src="${shots.left}"></div>
    <div class="phone r"><img src="${shots.right}"></div>
    <div class="phone f"><img src="${shots.front}"></div>
  </div>
</body></html>`;

const browser = await puppeteer.launch({ headless: true });

const og = await browser.newPage();
await og.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await og.setContent(ogHtml, { waitUntil: "networkidle0" });
await og.evaluate(() => document.fonts.ready);
if (!(await og.evaluate(() => document.fonts.check('500 54px "Space Grotesk"')))) {
    throw new Error("Space Grotesk did not load, refusing to write a card in the fallback face");
}
const ogPath = path.join(root, "public/og/airtel-travel-mode.png");
await writeFile(ogPath, await og.screenshot({ type: "png" }));

const cover = await browser.newPage();
await cover.setViewport({ width: 1800, height: 1800, deviceScaleFactor: 1 });
await cover.setContent(coverHtml, { waitUntil: "networkidle0" });
const coverPath = path.join(root, "public/work/thumbs/airtel-travel-mode.png");
await writeFile(coverPath, await cover.screenshot({ type: "png", omitBackground: true }));

await browser.close();
console.log(`wrote ${path.relative(root, ogPath)} and ${path.relative(root, coverPath)}`);
