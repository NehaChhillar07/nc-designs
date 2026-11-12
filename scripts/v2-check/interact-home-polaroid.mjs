// The v2 homepage polaroid variants: hover opens the properties panel, a click
// swaps the photo (it develops), keys move between variants without nudging
// the polaroid, "moving" plays a clip, reduced motion keeps it still.
//   node scripts/v2-check/interact-home-polaroid.mjs [--out dir]

import puppeteer from "puppeteer";

import { BASE, reporter, wait } from "./lib.mjs";

const out = process.argv.includes("--out") ? process.argv[process.argv.indexOf("--out") + 1] : null;
const r = reporter();
const POL = '[data-piece][aria-label^="me.polaroid"]';
const caption = (page) => page.evaluate((s) => document.querySelector(s).querySelector("[aria-live]").textContent, POL);

async function open(browser, opts = {}) {
    const page = await browser.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 160)));
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 160)));
    if (opts.reduce) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.setViewport({ width: 1440, height: 900 });
    // Skip the greeting and signing, as a repeat visit would.
    await page.evaluateOnNewDocument(() => sessionStorage.setItem("v2-greeted", "1"));
    await page.goto(`${BASE}/v2`, { waitUntil: "networkidle0", timeout: 120000 });
    await wait(4500);
    return { page, errors };
}

const browser = await puppeteer.launch({ headless: true });
{
    const { page, errors } = await open(browser);
    const pol = await page.$(POL);
    r.ok("the polaroid is on the desk", !!pol);
    r.ok("its label says it has variants", (await pol.evaluate((e) => e.getAttribute("aria-label"))).includes("8 variants"));
    r.ok("the panel is hidden at rest", !(await page.$('[aria-labelledby="polaroid-variant"]')));

    const b = await pol.boundingBox();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await wait(500);
    r.ok("hover opens the properties panel", !!(await page.$('[aria-labelledby="polaroid-variant"]')));
    if (out) await page.screenshot({ path: `${out}/polaroid-hover.png`, clip: { x: b.x - 260, y: b.y - 40, width: b.width + 300, height: b.height + 120 } });

    // move onto the panel: it must stay open
    const june = await page.evaluateHandle(() => [...document.querySelectorAll('[role="radio"]')].find((x) => x.textContent.trim() === "with june"));
    const jb = await june.boundingBox();
    await page.mouse.move(jb.x + jb.width / 2, jb.y + jb.height / 2, { steps: 8 });
    await wait(300);
    r.ok("moving onto the panel keeps it open", !!(await page.$('[aria-labelledby="polaroid-variant"]')));
    const before = await pol.boundingBox();
    await page.mouse.down();
    await page.mouse.up();
    await wait(350);
    if (out) await page.screenshot({ path: `${out}/polaroid-developing.png`, clip: { x: b.x - 260, y: b.y - 40, width: b.width + 300, height: b.height + 120 } });
    await wait(1400);
    if (out) await page.screenshot({ path: `${out}/polaroid-june.png`, clip: { x: b.x - 260, y: b.y - 40, width: b.width + 300, height: b.height + 120 } });
    r.ok("a click swaps to with june", (await caption(page)) === "me and june");
    const after = await pol.boundingBox();
    r.ok("clicking the panel doesn't move the polaroid", Math.abs(after.x - before.x) < 1 && Math.abs(after.y - before.y) < 1);

    // keyboard: arrows move between variants, not the polaroid
    await page.focus('[role="radio"][aria-checked="true"]');
    await page.keyboard.press("ArrowRight");
    await wait(300);
    r.ok("arrow right moves to the next variant", (await caption(page)) === "june, the actual boss");
    const kb = await pol.boundingBox();
    r.ok("arrow keys don't nudge the polaroid", Math.abs(kb.x - after.x) < 1);
    r.ok("focus inside the panel keeps it open", !!(await page.$('[aria-labelledby="polaroid-variant"]')));

    // the moving variant plays a clip
    const moving = await page.evaluateHandle(() => [...document.querySelectorAll('[role="radio"]')].find((x) => x.textContent.includes("moving")));
    await moving.click();
    await wait(1500);
    r.ok("moving plays a clip", await page.evaluate((s) => { const v = document.querySelector(s).querySelector("video"); return !!v && !v.paused; }, POL));

    await page.mouse.move(20, 880);
    await page.evaluate(() => document.activeElement?.blur());
    await wait(500);
    r.ok("leaving closes the panel", !(await page.$('[aria-labelledby="polaroid-variant"]')));
    r.ok("the variant stays after leaving", (await caption(page)) === "never still for long");
    r.ok("no console errors", errors.length === 0, errors.join(" | "));
    await page.close();
}
{
    const { page, errors } = await open(browser, { reduce: true });
    const pol = await page.$(POL);
    await pol.focus();
    await wait(300);
    const moving = await page.evaluateHandle(() => [...document.querySelectorAll('[role="radio"]')].find((x) => x.textContent.includes("moving")));
    await moving.click();
    await wait(800);
    r.ok("reduced motion: the clip stays on its still", await page.evaluate((s) => { const v = document.querySelector(s).querySelector("video"); return !!v && v.paused; }, POL));
    r.ok("reduced motion: no console errors", errors.length === 0, errors.join(" | "));
    await page.close();
}
await browser.close();
r.done();
