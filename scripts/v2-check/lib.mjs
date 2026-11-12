// Shared helpers for the v2 case-study checks (puppeteer, a dev server on
// V2_URL, default http://localhost:3000). Run from the repo root:
//   node scripts/v2-check/layout.mjs ecrime-hub
// Every check prints PASS / FAIL lines and exits non-zero on a FAIL.

import puppeteer from "puppeteer";

export const BASE = process.env.V2_URL ?? "http://localhost:3000";
export const urlFor = (slug) => `${BASE}/v2/case-study/${slug}`;
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launch(args = []) {
    return puppeteer.launch({ headless: true, args });
}

// Opens a study at a width, collecting console errors.
export async function open(browser, slug, w = 1440, opts = {}) {
    const page = await browser.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 200)));
    await page.setViewport({ width: w, height: 900, isMobile: w < 768, hasTouch: w < 768 });
    if (opts.reduce) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(urlFor(slug), { waitUntil: "networkidle0", timeout: 120000 });
    return { page, errors };
}

// Scrolls the whole page so every in-view moment plays.
export async function scrollThrough(page, step = 500, pause = 140) {
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += step) {
        await page.evaluate((y) => window.scrollTo(0, y), y);
        await wait(pause);
    }
}

export function reporter() {
    const lines = [];
    let failed = 0;
    return {
        ok(name, pass, extra = "") {
            if (!pass) failed++;
            lines.push(`${pass ? "PASS" : "FAIL"}  ${name}${extra ? "  · " + extra : ""}`);
        },
        done() {
            console.log(lines.join("\n"));
            process.exitCode = failed ? 1 : 0;
        },
    };
}

export function argSlug() {
    const slug = process.argv[2];
    if (!slug) {
        console.error("usage: node <script> <slug> [...]");
        process.exit(2);
    }
    return slug;
}
