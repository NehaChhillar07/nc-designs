// Work with me: the sentence hero. Each "stuck on" answer deals its proof
// (with its source), the booking link carries the finished sentence, the
// blanks open a themed listbox that works from the keyboard, and reduced motion still swaps the proof.
//   node scripts/site-check/interact-work-with-me.mjs

import puppeteer from "puppeteer";

import { BASE, VERCEL_ONLY, reporter, wait } from "./lib.mjs";

const r = reporter();
// Pick an answer the way a visitor does: open the blank, click the option.
async function pick(page, blank, option) {
    await page.click(`[aria-controls="${blank}-list"]`);
    await wait(250);
    const opt = await page.evaluateHandle((b, o) => [...document.querySelectorAll(`#${b}-list [role=option]`)].find((li) => li.textContent.startsWith(o)), blank, option);
    await opt.click();
    await wait(900);
}
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
    r.ok(`${tag}: starts on onboarding, with its source`, (await proof(page)).includes("+48%") && (await proof(page)).includes("all 10 migrated clients"));
    await pick(page, "wwm-stuck", "getting people to finish");
    r.ok(`${tag}: the panel closes after a choice`, !(await page.$("#wwm-stuck-list")));
    r.ok(`${tag}: "getting people to finish" deals the flashcard proof`, (await proof(page)).includes("20% → 80%") && (await proof(page)).includes("flashcard builder"));
    r.ok(`${tag}: the booking note is the finished sentence`, (await book(page)).includes("notes=i'm building an AI product for teams at work, and i'm stuck on getting people to finish."));

    if (!reduce && w === 1440) {
        // Keyboard: Tab to the third blank, open it, move, choose, focus returns.
        await page.focus('[aria-controls="wwm-stuck-list"]');
        await page.keyboard.press("Enter");
        await wait(250);
        r.ok(`${tag}: Enter opens the panel, focus inside`, await page.evaluate(() => document.activeElement?.id === "wwm-stuck-list"));
        const size = await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector("#wwm-stuck-list [role=option]")).fontSize));
        r.ok(`${tag}: options are set at reading size, not headline size`, size <= 24, `${size}px`);
        await page.keyboard.press("Home");
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Enter");
        await wait(900);
        r.ok(`${tag}: arrows and Enter choose from the keyboard`, (await proof(page)).includes("+32%"));
        r.ok(`${tag}: focus returns to the word`, await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "wwm-stuck-list"));
        await page.keyboard.press("Enter");
        await wait(250);
        await page.keyboard.press("Escape");
        await wait(250);
        r.ok(`${tag}: Escape closes it`, !(await page.$("#wwm-stuck-list")));
        await page.click('[aria-controls="wwm-who-list"]');
        await wait(250);
        await page.mouse.click(5, 880);
        await wait(300);
        r.ok(`${tag}: a click outside closes it`, !(await page.$("#wwm-who-list")));
    }
    if (!reduce && w === 1440) {
        // Every sticking point deals a real screen, a stamped result and a source.
        await page.click('[aria-controls="wwm-stuck-list"]');
        await wait(300);
        const ids = await page.evaluate(() => [...document.querySelectorAll("#wwm-stuck-list [role=option]")].map((o) => o.textContent.replace("✓", "").trim()));
        await page.keyboard.press("Escape");
        await wait(250);
        const bad = [];
        for (const label of ids) {
            await pick(page, "wwm-stuck", label);
            const ok = await page.evaluate(() => {
                const f = document.querySelector("[aria-live=polite] figure");
                const img = f?.querySelector("img");
                return !!img && img.complete && img.naturalWidth > 0 && f.innerText.includes("·") && f.innerText.includes("read how");
            });
            if (!ok) bad.push(label);
        }
        r.ok(`${tag}: all ${ids.length} answers deal a screen, a result and a source`, ids.length >= 10 && bad.length === 0, bad.join(", "));
    }
    r.ok(`${tag}: no horizontal overflow`, (await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 0);
    r.ok(`${tag}: no console errors`, errors.length === 0, errors.join(" | "));
    await page.close();
}
await browser.close();
r.done();
