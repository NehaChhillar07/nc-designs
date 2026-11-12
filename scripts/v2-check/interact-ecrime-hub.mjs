// eCrime Hub: the Report-click switch (click and keys), the site map deal,
// the recordings (play on screen, paused under reduced motion), phones.
//   node scripts/v2-check/interact-ecrime-hub.mjs

import { launch, open, reporter, wait } from "./lib.mjs";

const slug = "ecrime-hub";
const r = reporter();
const results = (page) => page.evaluate(() => [...document.querySelectorAll("#report [aria-live] li")].map((l) => l.textContent.trim()));
const browser = await launch();

for (const w of [1440, 390]) {
    const { page, errors } = await open(browser, slug, w);
    await page.evaluate(() => document.querySelector("#report [role=radiogroup]").scrollIntoView({ block: "center" }));
    await wait(1200);
    const before = await results(page);
    r.ok(`${w}: starts on a plain link out`, before.some((t) => t.includes("never hears")), before.join(" / "));
    const hand = await page.$('#report [role=radio][aria-checked="false"]');
    await hand.click();
    await wait(1200);
    const after = await results(page);
    r.ok(`${w}: click adds the nudge`, after.some((t) => t.includes("nudged at the same moment")), after.join(" / "));
    r.ok(
        `${w}: the path redraws with the nudge`,
        await page.evaluate(() => [...document.querySelectorAll("#report ol li")].some((l) => l.textContent.includes("Nudge to Human Firewall"))),
    );
    await page.focus('#report [role=radio][aria-checked="true"]');
    await page.keyboard.press("ArrowLeft");
    await wait(600);
    r.ok(`${w}: arrow keys switch back`, (await results(page)).some((t) => t.includes("never hears")));

    // the site map deals itself in once it arrives
    await page.evaluate(() => document.querySelector("#system figure").scrollIntoView({ block: "center" }));
    await wait(3500);
    const hidden = await page.evaluate(() => [...document.querySelectorAll("#system figure li")].filter((l) => getComputedStyle(l).opacity !== "1").length);
    r.ok(`${w}: the site map is fully dealt`, hidden === 0, `${hidden} still hidden`);

    // a recording plays while on screen
    await page.evaluate(() => document.querySelector("#assistant video").scrollIntoView({ block: "center" }));
    await wait(1500);
    r.ok(`${w}: the assistant recording plays on screen`, await page.evaluate(() => !document.querySelector("#assistant video").paused));
    r.ok(`${w}: no console errors`, errors.length === 0, errors.join(" | "));
    await page.close();
}
{
    const { page, errors } = await open(browser, slug, 1280, { reduce: true });
    await page.evaluate(() => document.querySelector("#assistant video").scrollIntoView({ block: "center" }));
    await wait(1500);
    r.ok("reduced motion: recordings stay paused", await page.evaluate(() => [...document.querySelectorAll("video")].every((v) => v.paused)));
    r.ok("reduced motion: no console errors", errors.length === 0, errors.join(" | "));
    await page.close();
}
await browser.close();
r.done();
