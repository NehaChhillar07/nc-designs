// The v2 social preview cards: the 1200×630 image shown when a page is
// pasted into LinkedIn, Slack, iMessage or X. One per page, in the v2 look:
// paper, oxblood display serif, a mono eyebrow, the page's one-line outcome,
// and its lead screen as a print on the desk.
//
//   node scripts/generate-og-v2.mjs            # all cards → public/og/v2/
//   node scripts/generate-og-v2.mjs unsaid     # just one
//
// The copy is the pages' own (data/v2-*.ts), shortened to fit a card.
// lib/v2-seo.ts points each page's og:image and twitter:image here.

import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "public/og/v2");
const SITE = "nc-designs.vercel.app";

// kind: "wide" (a desktop screen), "phone" (a tall capture), "portrait" (a photo).
const CARDS = [
    {
        slug: "home",
        eyebrow: "product designer",
        title: ["neha", "chhillar"],
        line: "i find the problem worth solving, and prove the answer works.",
        print: { src: "public/hero-portrait.jpg", kind: "portrait", caption: "me, probably redlining something" },
    },
    {
        slug: "resume",
        eyebrow: "resume",
        title: ["resume"],
        line: "Neha Chhillar, senior product designer for AI products. The long version, stop by stop.",
        print: { src: "public/hero-portrait.jpg", kind: "portrait", caption: "neha chhillar" },
    },
    {
        slug: "work-with-me",
        eyebrow: "freelance",
        title: ["work", "with me"],
        line: "Product design for founders building AI products. The problem worth solving, proven with real users.",
    },
    {
        slug: "human-firewall",
        eyebrow: "case study · cybersecurity saas",
        title: ["Human", "Firewall"],
        line: "A 10-year-old security platform, rebuilt AI-native. Admins launch without calling support.",
        print: { src: "public/work/1st-case study/hero-image.png", kind: "wide", caption: "human risk index" },
    },
    {
        slug: "flashcard-training",
        eyebrow: "case study · micro-training",
        title: ["Flashcard", "Builder"],
        line: "Training completion from ~20% to ~80%, live on 10 enterprise clients.",
        // The real learner cover card, cut out of the screenshot (client logo blurred).
        print: { src: "public/work/flashcard/hf-cards.png", kind: "card", crop: { x: 30.75, y: 15.1, w: 39, h: 67.4, ratio: (2458 * 39) / (1720 * 67.4) }, caption: "a live pack's cover" },
    },
    {
        slug: "ecrime-hub",
        eyebrow: "case study · client: dubai police",
        title: ["eCrime", "Hub"],
        line: "1.42 million visitors in its first year. Every report click alerts a security team.",
        print: { src: "public/work/ecrime-hub/hero-poster.jpg", kind: "wide", caption: "ecrime hub" },
    },
    {
        slug: "unsaid",
        eyebrow: "case study · side project",
        title: ["unsaid"],
        line: "an anonymous confessions app. idea to live, solo, in three weeks.",
        print: { src: "public/work/unsaid/home-dark.png", kind: "phone", caption: "the live app" },
    },
    {
        slug: "airtel-travel-mode",
        eyebrow: "case study · self-initiated concept",
        title: ["Airtel", "Travel Mode"],
        line: "You've landed. Is your phone working?",
        print: { src: "public/work/airtel-v2/lock-connected.png", kind: "phone", caption: "the moment she lands" },
    },
    {
        slug: "writing-first-designer",
        eyebrow: "essay · july 30, 2026",
        title: ["What being the first", "designer really costs you"],
        small: true,
        line: "Being the first designer is two jobs wearing one title. You get judged on one of them.",
        print: { src: "public/writing/first-designer-cover.png", kind: "wide", caption: "an essay" },
    },
    {
        slug: "writing-where-is-the-deliverability",
        eyebrow: "essay · august 2, 2026",
        title: ["Where is the", "deliverability?"],
        small: true,
        line: "AI made starting easy. But did it make delivering easy? Three things nobody can skip.",
        print: { src: "public/writing/where-is-the-deliverability-cover.png", kind: "wide", caption: "an essay" },
    },
];

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };
const dataUri = async (rel) => `data:${MIME[path.extname(rel).toLowerCase()]};base64,${(await readFile(path.join(root, rel))).toString("base64")}`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

async function html(card) {
    const p = card.print;
    const img = p ? await dataUri(p.src) : null;
    const PRINT = {
        wide: "width:520px; right:-40px; top:130px; transform:rotate(-2.5deg);",
        phone: "width:250px; right:110px; top:58px; transform:rotate(3deg);",
        portrait: "width:300px; right:100px; top:70px; transform:rotate(3deg);",
        card: "width:330px; right:96px; top:64px; transform:rotate(2.5deg);",
    };
    const imgStyle = { wide: "", phone: "border-radius:22px;", portrait: "height:360px; object-fit:cover; object-position:top;", card: "" };
    // A crop (in % of the image) shows one region of a larger screenshot.
    const imgTag = p?.crop
        ? `<span style="display:block; position:relative; overflow:hidden; aspect-ratio:${p.crop.ratio};"><img src="${img}" style="position:absolute; width:${10000 / p.crop.w}%; max-width:none; left:${(-100 * p.crop.x) / p.crop.w}%; top:${(-100 * p.crop.y) / p.crop.h}%;"></span>`
        : `<img src="${img}">`;
    const textW = p ? (p.kind === "wide" ? 620 : 700) : 1000;
    const titleSize = card.small ? 76 : card.title.join("").length > 14 ? 104 : 124;
    return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500&family=Inter:wght@400;500&display=block" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1200px; height:630px; overflow:hidden; position:relative; background:#ede6da; color:#1a1414; font-family:Inter, sans-serif; }
/* the paper's faint rules */
body::before { content:""; position:absolute; inset:0; background:repeating-linear-gradient(to bottom, transparent 0 41px, rgb(107 15 18 / 0.05) 41px 42px); }
.text { position:absolute; left:72px; top:64px; width:${textW}px; }
.eyebrow { font:500 19px "Geist Mono", monospace; color:#6e6259; letter-spacing:-0.01em; }
h1 { font:400 ${titleSize}px/0.86 "Instrument Serif", serif; color:#6b0f12; letter-spacing:-0.025em; margin-top:22px; }
h1 span { display:block; }
h1 span:nth-child(2) { font-style:italic; padding-left:${card.small ? 0 : 0.45}em; }
.line { font:400 34px/1.18 "Instrument Serif", serif; color:#1a1414; margin-top:30px; max-width:${Math.min(textW, 600)}px; }
.foot { position:absolute; left:72px; bottom:48px; font:400 17px "Geist Mono", monospace; color:#6b0f12; display:flex; gap:14px; align-items:center; }
.foot i { width:28px; height:1px; background:rgb(107 15 18 / 0.4); display:inline-block; }
.print { position:absolute; background:#f7f3ec; padding:12px 12px 0; box-shadow:0 30px 50px -28px rgba(60,10,12,0.6); ${p ? PRINT[p.kind] : ""} }
.print img { display:block; width:100%; ${p ? imgStyle[p.kind] : ""} }
.print p { font:400 14px "Geist Mono", monospace; color:#1a1414; padding:10px 2px 12px; }
.stamp { position:absolute; right:86px; bottom:60px; font:500 16px "Geist Mono", monospace; text-transform:uppercase; letter-spacing:0.06em; color:#6b0f12; border:1.5px solid #6b0f12; padding:6px 12px; transform:rotate(-6deg); background:#f7f3ec; }
</style></head><body>
<div class="text">
  <p class="eyebrow">${esc(card.eyebrow)}</p>
  <h1>${card.title.map((t) => `<span>${esc(t)}</span>`).join("")}</h1>
  <p class="line">${esc(card.line)}</p>
</div>
${p ? `<figure class="print">${imgTag}<p>${esc(p.caption)}</p></figure>` : `<span class="stamp">taking on projects</span>`}
<p class="foot"><span>neha chhillar</span><i></i><span>${SITE}</span></p>
</body></html>`;
}

const only = process.argv[2];
await mkdir(OUT, { recursive: true });
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
for (const card of CARDS) {
    if (only && card.slug !== only) continue;
    await page.setContent(await html(card), { waitUntil: "load", timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, `${card.slug}.png`) });
    console.log(`ok  og/v2/${card.slug}.png`);
}
await browser.close();
