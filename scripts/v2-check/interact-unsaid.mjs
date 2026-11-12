// unsaid: the safety sorter (right, wrong, next, done, again), the
// author-erased flow (plays to the end; reduced motion lands there at once),
// the confession deck (throw by drag and keys, felt-this inside the card),
// phones and reduced motion.
//   node scripts/v2-check/interact-unsaid.mjs

import { launch, open, reporter, wait } from "./lib.mjs";

const slug = "unsaid";
const r = reporter();
const DECK = '[aria-roledescription="flashcard deck"]';
const label = (page) => page.evaluate((s) => document.querySelector(s).getAttribute("aria-label"), DECK);
const sorterText = (page) => page.evaluate(() => document.querySelector("#safety figure").innerText);
const browser = await launch();

for (const w of [1440, 390]) {
    const { page, errors } = await open(browser, slug, w);

    // the author is erased on the way to the feed
    await page.evaluate(() => document.querySelector("#rule ol").scrollIntoView({ block: "center" }));
    await wait(3600);
    const flow = await page.evaluate(() => document.querySelector("#rule ol").innerText);
    r.ok(`${w}: the flow ends with the author erased`, flow.includes("author erased") && flow.includes("never sent"));

    // the sorter
    await page.evaluate(() => document.querySelector("#safety figure").scrollIntoView({ block: "center" }));
    await wait(500);
    const pick = async (txt) => {
        const b = await page.evaluateHandle((t) => [...document.querySelectorAll("#safety figure button")].find((x) => x.textContent.trim() === t), txt);
        await b.click();
        await wait(500);
    };
    const next = async () => {
        const b = await page.evaluateHandle(() => [...document.querySelectorAll("#safety figure button")].find((x) => x.textContent.includes("next line")));
        await b.click();
        await wait(600);
    };
    await pick("posts");
    r.ok(`${w}: line 1 · venting posts (right)`, (await sorterText(page)).includes("✓ right"));
    await next();
    await pick("blocked");
    const t2 = await sorterText(page);
    r.ok(`${w}: line 2 · a wrong pick is corrected`, t2.includes("× not quite") && t2.includes("soft door"));
    await next();
    await pick("blocked");
    r.ok(`${w}: line 3 · outing yourself is blocked`, (await sorterText(page)).includes("de-anon guard stops it"));
    await next();
    await pick("posts");
    await next();
    r.ok(`${w}: the sorter ends on the policy`, (await sorterText(page)).includes("venting through, harm out"));
    const again = await page.evaluateHandle(() => [...document.querySelectorAll("#safety figure button")].find((x) => x.textContent.includes("start again")));
    await again.click();
    await wait(600);
    r.ok(`${w}: start again`, (await sorterText(page)).includes("1 / 4"));

    // the two worlds over one phone
    await page.evaluate(() => document.querySelector("#worlds [role=radiogroup]").scrollIntoView({ block: "center" }));
    await wait(400);
    const cap = () => page.evaluate(() => document.querySelector("#worlds figcaption").textContent);
    r.ok(`${w}: worlds start on personal`, (await cap()).includes("personal"));
    const pro = await page.evaluateHandle(() => [...document.querySelectorAll("#worlds [role=radio]")].find((b) => b.textContent.includes("professional")));
    await pro.click();
    await wait(700);
    r.ok(`${w}: switch shows the professional feed`, (await cap()).includes("professional") && (await page.evaluate(() => [...document.querySelectorAll("#worlds [aria-hidden=false] img")].some((i) => i.alt.includes("tech lead")))));

    // the deck
    await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center" }), DECK);
    await wait(800);
    r.ok(`${w}: the deck starts on 1 of 3`, (await label(page)).includes("Card 1 of 3"));
    const felt = await page.$(`${DECK} .z-10 button[aria-pressed]`);
    await felt.click();
    await wait(500);
    r.ok(`${w}: felt this toggles inside the card`, (await felt.evaluate((e) => e.getAttribute("aria-pressed"))) === "true" && (await label(page)).includes("Card 1 of 3"));
    const deck = await page.$(DECK);
    await deck.focus();
    await page.keyboard.press("ArrowRight");
    await wait(900);
    r.ok(`${w}: arrow right throws to 2 of 3`, (await label(page)).includes("Card 2 of 3"));
    r.ok(`${w}: no flip button on this deck`, await page.evaluate(() => !document.querySelector('button[aria-label="flip"]')));
    r.ok(`${w}: no console errors`, errors.length === 0, errors.join(" | "));
    await page.close();
}
{
    const { page, errors } = await open(browser, slug, 1280, { reduce: true });
    await page.evaluate(() => document.querySelector("#rule ol").scrollIntoView({ block: "center" }));
    await wait(400);
    r.ok("reduced motion: the flow is already at its end", (await page.evaluate(() => document.querySelector("#rule ol").innerText)).includes("author erased"));
    r.ok("reduced motion: no console errors", errors.length === 0, errors.join(" | "));
    await page.close();
}
await browser.close();
r.done();
