// Flashcard Builder: the learner deck (drag, keys, flip, quiz, end), spec
// mode, the 0.5× switch, the deal, the entry fan, the editor on phones,
// reduced motion and no WebGL.
//   node scripts/site-check/interact-flashcard-training.mjs

import { launch, open, reporter, urlFor, wait } from "./lib.mjs";

const slug = "flashcard-training";
const r = reporter();
const DECK = '[aria-roledescription="flashcard deck"]';
const label = (page) => page.evaluate((s) => document.querySelector(s).getAttribute("aria-label"), DECK);

const browser = await launch();
{
    const { page, errors } = await open(browser, slug, 1440);
    await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center" }), DECK);
    await wait(800);
    const deck = await page.$(DECK);
    r.ok("deck starts on card 1", (await label(page)).includes("Card 1 of 4"));

    const b = await deck.boundingBox();
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx - 40, cy, { steps: 12 });
    await wait(150);
    await page.mouse.up();
    await wait(900);
    r.ok("short slow drag springs back", (await label(page)).includes("Card 1 of 4"));

    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx - 220, cy, { steps: 20 });
    await page.mouse.up();
    await wait(1000);
    r.ok("drag past the threshold throws", (await label(page)).includes("Card 2 of 4"));

    await deck.focus();
    await page.keyboard.press(" ");
    await wait(900);
    const back = await page.evaluate((s) => document.querySelector(`${s} .z-10 [aria-hidden='false']`)?.textContent?.slice(0, 20), DECK);
    r.ok("space flips the card", !!back && back.startsWith("Learning"), back);
    await page.keyboard.press("ArrowRight");
    await wait(900);
    r.ok("arrow right moves on", (await label(page)).includes("Card 3 of 4"));
    const opt = await page.evaluateHandle((s) => [...document.querySelectorAll(`${s} .z-10 button`)].find((x) => x.textContent.includes("CRM")), DECK);
    await opt.click();
    await wait(500);
    const fb = await page.evaluate((s) => document.querySelector(`${s} [aria-live]`)?.textContent, DECK);
    r.ok("the quiz answers back", !!fb && fb.includes("Need-to-know"));

    await page.evaluate(() => document.activeElement?.blur());
    await page.keyboard.press("s");
    await wait(700);
    r.ok("spec mode draws the swipe threshold", await page.evaluate(() => [...document.querySelectorAll(".v2-spec-tag")].some((t) => t.textContent.includes("swipe at ±90px"))));
    await page.keyboard.press("s");

    await deck.focus();
    await page.keyboard.press("ArrowRight");
    await wait(800);
    await page.keyboard.press("ArrowRight");
    await wait(900);
    r.ok("pack complete", await page.evaluate(() => document.body.innerText.toLowerCase().includes("pack complete")));

    const sw = await page.$('[role="switch"]');
    await sw.click();
    r.ok("0.5× switch turns on", (await sw.evaluate((e) => e.getAttribute("aria-checked"))) === "true");
    await sw.click();

    const push = await page.evaluateHandle(() => [...document.querySelectorAll("button")].find((x) => x.textContent.includes("Push to Training Cards")));
    await push.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await push.click();
    await wait(5200);
    r.ok("push publishes and deals", await page.evaluate(() => document.body.innerText.includes("Published: saved to your library")));

    const doc = await page.evaluateHandle(() => [...document.querySelectorAll('[role="radio"]')].find((x) => x.textContent.includes("With Doc")));
    await doc.click();
    r.ok("entry fan is a radio group", (await doc.evaluate((e) => e.getAttribute("aria-checked"))) === "true");
    r.ok("desktop: no console errors", errors.length === 0, errors.join(" | "));
    await page.close();
}
{
    const { page, errors } = await open(browser, slug, 390);
    const down = await page.$('button[aria-label="Move Title down"]');
    r.ok("phone: reorder buttons present", !!down);
    if (down) {
        await down.evaluate((el) => el.scrollIntoView({ block: "center" }));
        await down.click();
        await wait(500);
        r.ok("phone: reorder works", await page.evaluate(() => document.querySelector('button[aria-label="Move Body up"]')?.disabled === true));
    }
    r.ok("phone: no console errors", errors.length === 0, errors.join(" | "));
    await page.close();
}
{
    const { page, errors } = await open(browser, slug, 1280, { reduce: true });
    r.ok("reduced motion: no console errors", errors.length === 0, errors.join(" | "));
    await page.close();
}
await browser.close();
{
    const b2 = await launch(["--disable-webgl", "--disable-webgl2", "--disable-3d-apis"]);
    const page = await b2.newPage();
    await page.goto(urlFor(slug), { waitUntil: "networkidle0" });
    await wait(1500);
    const c = await page.evaluate(() => document.querySelectorAll("canvas").length);
    r.ok("no WebGL: CSS table only", c === 0, `${c} canvases`);
    await b2.close();
}
r.done();
