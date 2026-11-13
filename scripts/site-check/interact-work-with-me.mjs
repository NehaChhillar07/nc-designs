// Work with me: the sentence hero. Each "stuck on" answer deals its proof
// (with its source), the booking link carries the finished sentence, the
// blanks are reachable from the keyboard, and reduced motion still swaps the proof.
//   node scripts/site-check/interact-work-with-me.mjs

import puppeteer from "puppeteer";

import { BASE, VERCEL_ONLY, reporter, wait } from "./lib.mjs";

const r = reporter();
const STUCK = 'select[aria-label="where you\'re stuck"]';
const proof = (page) => page.evaluate(() => document.querySelector("[aria-live=polite] figure")?.innerText ?? "");
const book = (page) => page.evaluate(() => decodeURIComponent([...document.querySelectorAll("a")].find((a) => a.href.includes("cal.com"))?.href ?? ""));

const browser = await puppeteer.launch({ headless: true });
for (const [w, reduce] of [[1440, false], [390, false], [1440, true]]) {
    const tag = reduce ? "reduced motion" : String(w);
    const page = await browser.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && !VERCEL_ONLY(m) && errors.push(m.text().slice(0, 160)));
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 160)));
    if (reduce) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.setViewport({ width: w, height: 900, isMobile: w < 768, hasTouch: w < 768 });
    await page.goto(`${BASE}/work-with-me`, { waitUntil: "networkidle0", timeout: 120000 });

    r.ok(`${tag}: one h1, the page's subject`, (await page.evaluate(() => [...document.querySelectorAll("h1")].map((h) => h.textContent))).join() === "freelance product design · for founders building AI products");
    r.ok(`${tag}: starts on onboarding, with its source`, (await proof(page)).includes("+52%") && (await proof(page)).includes("texlaculture"));
    await page.select(STUCK, "finishing");
    await wait(900);
    r.ok(`${tag}: "getting people to finish" deals the flashcard proof`, (await proof(page)).includes("20% → 80%") && (await proof(page)).includes("flashcard builder"));
    r.ok(`${tag}: the booking note is the finished sentence`, (await book(page)).includes("notes=i'm building an AI product for teams at work, and i'm stuck on getting people to finish."));

    if (!reduce && w === 1440) {
        // Tab reaches each blank in order, with a visible focus ring. (Choosing
        // a value with the keys is the native select's own, per platform.)
        await page.evaluate(() => document.querySelector("h1").setAttribute("tabindex", "-1"));
        await page.focus("h1");
        const order = [];
        for (let i = 0; i < 3; i++) {
            await page.keyboard.press("Tab");
            order.push(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")));
        }
        r.ok(`${tag}: Tab reaches the three blanks in order`, order.join("|") === "what you're building|who it's for|where you're stuck", order.join("|"));
        const ring = await page.evaluate(() => getComputedStyle(document.activeElement.nextElementSibling).outlineStyle);
        r.ok(`${tag}: the focused blank shows a ring`, ring !== "none", ring);
    }
    r.ok(`${tag}: no horizontal overflow`, (await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 0);
    r.ok(`${tag}: no console errors`, errors.length === 0, errors.join(" | "));
    await page.close();
}
await browser.close();
r.done();
