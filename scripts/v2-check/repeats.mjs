// Each claim once: counts phrases in the rendered <main> text against a
// spec of [phrase, expected count] in scripts/v2-check/specs/<slug>.repeats.json.
//   node scripts/v2-check/repeats.mjs <slug>

import { readFileSync } from "node:fs";

import { argSlug, launch, open, reporter } from "./lib.mjs";

const slug = argSlug();
const spec = JSON.parse(readFileSync(new URL(`./specs/${slug}.repeats.json`, import.meta.url), "utf8"));

const r = reporter();
const browser = await launch();
const { page } = await open(browser, slug, 1440);
const text = (await page.evaluate(() => document.querySelector("main").textContent)).replace(/\s+/g, " ").toLowerCase();
for (const [phrase, want] of spec) {
    const got = text.split(phrase.toLowerCase()).length - 1;
    r.ok(`"${phrase}" ×${got}`, got === want, `want ${want}`);
}
await browser.close();
r.done();
