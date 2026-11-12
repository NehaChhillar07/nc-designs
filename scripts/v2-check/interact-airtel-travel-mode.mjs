// Airtel Travel Mode: the arrival switch (the banner and the screen it opens
// flip together, by click and keys), the home and trip-preset switches, the
// day scrubber (buttons, keys, ends), the question route's links, the
// recordings (play on screen; reduced motion keeps the poster), and no
// console errors.
//   node scripts/v2-check/interact-airtel-travel-mode.mjs

import { launch, open, reporter, wait } from "./lib.mjs";

const slug = "airtel-travel-mode";
const r = reporter();
const browser = await launch();

// The alt text of the screens currently shown in a switch.
const shown = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(`${s} div[aria-hidden="false"] img`)].map((i) => i.alt).join(" | "), sel);
const center = (page, sel) => page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center" }), sel);
const radio = (page, sel, label) =>
    page.evaluateHandle((s, l) => [...document.querySelectorAll(`${s} [role=radio]`)].find((b) => b.textContent.trim() === l), sel, label);

for (const w of [1440, 390]) {
    const { page, errors } = await open(browser, slug, w);

    // the hero moment: connected / not connected, two phones in step
    const ARR = '[data-phone-switch="at-arrival"]';
    await center(page, ARR);
    await wait(500);
    let s = await shown(page, ARR);
    r.ok(`${w}: arrival starts connected, both phones`, s.includes("you are online") && s.includes("you're connected"), s.slice(0, 120));
    await (await radio(page, ARR, "not connected")).click();
    await wait(600);
    s = await shown(page, ARR);
    r.ok(`${w}: not connected flips the banner and the screen together`, s.includes("hasn't found a network") && s.includes("hasn't connected") && !s.includes("you are online"), s.slice(0, 120));
    const cap = await page.evaluate((sel) => document.querySelector(`${sel} figcaption`).textContent, ARR);
    r.ok(`${w}: the caption follows the state`, cap.includes("hasn't started"));
    await page.keyboard.press("ArrowLeft");
    await wait(600);
    r.ok(`${w}: arrow keys switch back`, (await shown(page, ARR)).includes("you are online"));

    // home: before a trip / trip booked
    const HOME = '[data-phone-switch="at-home"]';
    await center(page, HOME);
    await (await radio(page, HOME, "trip booked")).click();
    await wait(600);
    r.ok(`${w}: home switches to the booked trip`, (await shown(page, HOME)).includes("trip booked"));

    // trip presets, by keys
    const TRIP = '[data-phone-switch="at-trip"]';
    await center(page, TRIP);
    await (await radio(page, TRIP, "3 countries · 9 days")).focus();
    await page.keyboard.press("ArrowRight");
    await wait(600);
    r.ok(`${w}: trip presets move by keys`, (await shown(page, TRIP)).includes("4-day trip to Thailand"));

    // the day scrubber
    const DAY = "[data-day-scrub]";
    await center(page, DAY);
    const day = () => page.evaluate((s) => document.querySelector(`${s} figcaption`).textContent, DAY);
    r.ok(`${w}: the dashboard opens on day 3`, (await day()).startsWith("day 3 of 9"));
    await page.click(`${DAY} button[aria-label="Next day"]`);
    await wait(400);
    r.ok(`${w}: next day`, (await day()).startsWith("day 4 of 9"));
    await page.focus(`${DAY} input[type=range]`);
    await page.keyboard.press("End");
    await wait(400);
    r.ok(`${w}: End jumps to the last day`, (await day()).startsWith("day 9 of 9"));
    r.ok(`${w}: next is off on the last day`, await page.evaluate((s) => document.querySelector(`${s} button[aria-label="Next day"]`).disabled, DAY));

    // the route's stops all land on a heading
    const links = await page.evaluate(() => [...document.querySelectorAll("[data-trip-route] a")].map((a) => a.getAttribute("href")));
    const missing = await page.evaluate((ls) => ls.filter((h) => !document.querySelector(h)), links);
    r.ok(`${w}: seven route stops, each linking to its answer`, links.length === 7 && missing.length === 0, missing.join(" "));

    // the recordings play while on screen
    if (w === 1440) {
        await page.evaluate(() => window.scrollTo(0, 0));
        await center(page, "header video");
        await wait(1200);
        r.ok(`${w}: the departure recording plays`, await page.evaluate(() => !document.querySelector("header video").paused));
    }
    r.ok(`${w}: no console errors`, errors.length === 0, errors.join(" | "));
    await page.close();
}

{
    const { page, errors } = await open(browser, slug, 1440, { reduce: true });
    await wait(1500);
    r.ok("reduced motion: the recordings stay on their posters", await page.evaluate(() => [...document.querySelectorAll("main video")].every((v) => v.paused)));
    const ARR = '[data-phone-switch="at-arrival"]';
    await center(page, ARR);
    await (await radio(page, ARR, "not connected")).click();
    await wait(600);
    r.ok("reduced motion: the arrival switch still works", (await shown(page, ARR)).includes("hasn't connected"));
    r.ok("reduced motion: no console errors", errors.length === 0, errors.join(" | "));
    await page.close();
}

await browser.close();
r.done();
