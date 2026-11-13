// Layout at phone, tablet and desktop widths: no horizontal overflow, no
// console errors, one h1, alt text on every image, the title on the first
// screen, at most two canvases. Screenshots go to --out (default: none).
//   node scripts/site-check/layout.mjs <slug> [--out dir] [widths...]

import { argSlug, launch, open, reporter, scrollThrough, wait } from "./lib.mjs";

const slug = argSlug();
const args = process.argv.slice(3);
const outAt = args.indexOf("--out");
const out = outAt >= 0 ? args[outAt + 1] : null;
const widths = args.filter((a, i) => /^\d+$/.test(a) && args[i - 1] !== "--out").map(Number);

const r = reporter();
const browser = await launch();
for (const w of widths.length ? widths : [390, 768, 1280, 1440]) {
    const { page, errors } = await open(browser, slug, w);
    if (out) await page.screenshot({ path: `${out}/${slug}-first-${w}.png` });
    await scrollThrough(page);
    await wait(2500);
    const info = await page.evaluate(() => {
        const h1 = document.querySelector("h1");
        return {
            overflow: document.documentElement.scrollWidth - window.innerWidth,
            h1: document.querySelectorAll("h1").length,
            h2: document.querySelectorAll("main h2").length,
            noAlt: document.querySelectorAll("main img:not([alt])").length,
            titleTop: h1 ? h1.getBoundingClientRect().top + window.scrollY : 99999,
            canvases: document.querySelectorAll("canvas").length,
            height: document.documentElement.scrollHeight,
        };
    });
    if (out) await page.screenshot({ path: `${out}/${slug}-full-${w}.png`, fullPage: true });
    r.ok(`${w}: no horizontal overflow`, info.overflow <= 0, `${info.overflow}px`);
    r.ok(`${w}: no console errors`, errors.length === 0, errors.join(" | "));
    r.ok(`${w}: one h1`, info.h1 === 1, `${info.h1} h1 · ${info.h2} h2`);
    r.ok(`${w}: alt on every image`, info.noAlt === 0);
    r.ok(`${w}: title on the first screen`, info.titleTop < 900);
    r.ok(`${w}: at most two canvases`, info.canvases <= 2, `${info.canvases}`);
    await page.close();
}
await browser.close();
r.done();
