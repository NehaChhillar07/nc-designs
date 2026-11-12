// Length: words in <main>, screens at 1440×900, reading time at 230 wpm,
// interactive controls, and where the first sourced number appears.
//   node scripts/v2-check/measure.mjs <slug> [--max-words n] [--max-screens n] [--status-only]
// --status-only: the study has no outcome number yet, so the first screen
// must carry a status line instead (the border-l impact/status paragraph).

import { argSlug, launch, open, reporter } from "./lib.mjs";

const slug = argSlug();
const args = process.argv.slice(3);
const num = (flag) => (args.includes(flag) ? Number(args[args.indexOf(flag) + 1]) : null);
const maxWords = num("--max-words");
const maxScreens = num("--max-screens");
const statusOnly = args.includes("--status-only");

const r = reporter();
const browser = await launch();
const { page } = await open(browser, slug, 1440);
const m = await page.evaluate(() => {
    const main = document.querySelector("main");
    const words = main.innerText.split(/\s+/).filter(Boolean).length;
    const screens = Math.round(document.documentElement.scrollHeight / innerHeight);
    const controls = main.querySelectorAll("button, [role=radio], [role=switch], input, textarea, [tabindex='0']").length;
    // the first big figure (an Outcome value or a % number)
    const fig = [...main.querySelectorAll("dd, p, span")].find((el) => el.children.length === 0 && /(\d+\s?%|\d+\+)/.test(el.textContent));
    const figAt = fig ? Math.round(((fig.getBoundingClientRect().top + scrollY) / innerHeight) * 10) / 10 : null;
    const status = [...main.querySelectorAll("header p")].find((p) => p.className.includes("border-l-2"));
    const statusAt = status ? Math.round(((status.getBoundingClientRect().top + scrollY) / innerHeight) * 10) / 10 : null;
    return { words, screens, controls, figAt, statusAt };
});
console.log(`${slug}: ${m.words} words (~${Math.round(m.words / 230)} min) · ${m.screens} screens · ${m.controls} controls · first number at screen ${m.figAt}`);
if (maxWords) r.ok(`words ≤ ${maxWords}`, m.words <= maxWords, `${m.words}`);
if (maxScreens) r.ok(`screens ≤ ${maxScreens}`, m.screens <= maxScreens, `${m.screens}`);
if (statusOnly) r.ok("a status line on the first screen", m.statusAt !== null && m.statusAt < 1, `screen ${m.statusAt}`);
else r.ok("a number on the first screen", m.figAt !== null && m.figAt < 1, `screen ${m.figAt}`);
await browser.close();
r.done();
