// Word-for-word against the live study: lists every string literal of 3+
// words in the live data file that the v2 page doesn't show (text, alt or
// aria-label). Each one should be an approved TRIM/SLIP. Informational: it
// prints the list and never fails.
//   node scripts/site-check/words.mjs <slug> data/<live-data>.ts

import { readFileSync } from "node:fs";

import { argSlug, launch, open } from "./lib.mjs";

const slug = argSlug();
const file = process.argv[3];
const src = readFileSync(file, "utf8");
const strings = [...src.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1].replace(/\\'/g, "'")).filter((s) => s.split(" ").length >= 3 && !s.startsWith("http"));

const browser = await launch();
const { page } = await open(browser, slug, 1440);
const text = await page.evaluate(() => {
    const alts = [...document.querySelectorAll("img[alt]")].map((i) => i.alt).join(" ¶ ");
    const labels = [...document.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label")).join(" ¶ ");
    return (document.body.textContent + " ¶ " + alts + " ¶ " + labels).replace(/\s+/g, " ").toLowerCase();
});
const missing = strings.filter((s) => !text.includes(s.replace(/\s+/g, " ").toLowerCase()));
console.log(`${strings.length} live strings, ${missing.length} not on the v2 page (each should be an approved TRIM/SLIP):`);
missing.forEach((m) => console.log("  -", m));
await browser.close();
