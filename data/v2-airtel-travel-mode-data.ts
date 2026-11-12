// Airtel Travel Mode case study 2.0 (/v2/case-study/airtel-travel-mode).
//
// The story is not rewritten: its questions, decisions and reasoning are the
// live study's (data/airtel-travel-mode-data.ts, imported where a line is
// kept as is). The copy is edited so each claim is made once (TRIM), and
// every wording change is listed in SLIPS.
// Decisions: a self-initiated concept, not affiliated with Airtel, never
// launched; Airtel stays in the screens, with a disclaimer in notes; the
// hero opens on a product screen (2026-11-03). The prototype was fixed and
// recaptured instead of captioning its contradictions (2026-11-05): GST at
// 18%, the number masked, the banners read from the trip's state, and a
// placeholder helpline. See DIVERGENCES.md in the prototype repo.
// Design rules: design-system/neha-portfolio/pages/case-study-v2.md

import { airtelData as at } from "@/data/airtel-travel-mode-data";
import type { Shot } from "@/data/v2-human-firewall-data";
import { humanFirewallCaseStudyData as hf } from "@/data/human-firewall-data";
import { SITE_URL } from "@/lib/site";

// Captures of the fixed prototype, taken by tools/capture_case_study.mjs.
const V2 = "/work/airtel-v2";
const PROTOTYPE = at.hero.prototypeHref;

/** Phone captures are 393×852 at 2x; the two screens of today's app are cropped from a board. */
const phone = (name: string, alt: string, bar: string, stamp?: string): Shot => ({ src: `${V2}/${name}.png`, alt, w: 786, h: 1704, bar, stamp });
const today = (name: string, alt: string, bar: string): Shot => ({ src: `${V2}/${name}.png`, alt, w: 672, h: 1460, bar, stamp: "today's app" });
const clip = (name: string, alt: string, bar: string): Shot => ({ src: `${V2}/${name}-poster.jpg`, video: `${V2}/${name}.mp4`, alt, w: 600, h: 1300, bar });

const TRIM = {
    status: "Never launched, so there are no users or results yet. Every screen here is a capture of the working prototype.",
    lede: "Airtel's app sells a roaming pack, then says nothing until the bill. I redesigned roaming in Airtel Thanks around the questions a traveller asks, in the order she asks them, and built it so you can try it.",
    scene: [
        "Then Malaysia, then the UAE: nine days, on postpaid, and every bank OTP comes to this number. You tap International Roaming in the Airtel app, and a web page loads a list of packs. Nobody asks where you're going or for how long, so which one covers nine days is on you. You pick ₹2,999.",
        "A green tick: request received. Has ₹2,999 left your account? Is a request a yes? It doesn't say. Then nothing until the plane door opens. If the phone doesn't connect, the support chat needs data you don't have.",
    ],
    // SLIP: "The brief said…" is gone: there was no brief, it's self-initiated.
    reframe:
        "Airtel already sells one simple pack structure, so which pack is right is answered commercially. It isn't answered in the interface, and after the purchase the app goes quiet.",
    researchLede:
        "Seven public sources. Complaints come from people who hit problems, so I read them as a map of where worry sits, not how often things break. Each worry became one of her questions.",
    placementLede:
        "Travel Mode is true a few days a year. So the test for four options: can the app enter it for her, on arrival?",
    trip: [
        "Every pack covers the same 180+ countries, so asking where she's going filters nothing. I still ask: it confirms she's covered, sizes the pack to her dates, and gives the app a trip to hold on to. No dates, no day 3 of 9, no arrival to spot.",
        "The recommendation is computed, not written. Change the trip.",
    ],
    money: "The review says the amount, the GST, the bill it lands on and its due date, and that the pack won't start until she's out of India.",
    // SLIP: "The version I submitted" → "My first version".
    confirm: "Then the confirmation, in the order she worries: today the pack is confirmed, 25 August the trip starts, 2 September the bill arrives. My first version resolved a tick, and it read like a receipt. So the mark became a stamp that says Confirmed, never Paid.",
    landing:
        "She didn't open the app; she landed, and it told her. The number comes before the data on purpose: her worry isn't gigabytes, it's whether her bank OTPs will still reach her.",
    landingAfter:
        "Everything on the not-connected screen was saved to her phone before she flew, so it opens without internet. The free call sits beside WhatsApp, because WhatsApp works on airport Wi-Fi when the SIM doesn't.",
    days: "Usage reaches Airtel up to four hours late, so every figure is an estimate and the screen says so. The minutes bar drains from full, because she's watching a balance disappear, not a total grow. Scrub through the trip.",
    charged: [
        "“My minutes were still being used as calls were getting diverted to voicemail,” one traveller wrote. Each forwarded call is billed as an outgoing roaming call, and today she finds out from the bill.",
        "Here a banner names the cause the same day, and the dashboard lists it: ₹35 for three calls forwarded to voicemail, ₹6 for a declined call, which still connects. The banner's ₹41 is the ledger's total, so the two can't disagree.",
    ],
    runsOut:
        "On postpaid nothing stops when the pack ends: everything carries on at standard roaming rates. So the risk isn't being cut off, it's a bill nobody warned her about. Two days out, a banner says what happens next, read from her auto-add switch. When it ends, “still work” comes before the rates.",
    system: [
        "Six banners and a Live Activity read the same trip object as the dashboard. Nothing is typed twice, so nothing can disagree.",
        "I built it in code with Claude Code, not Smart Animate. The first build replayed the Figma file: pixel-perfect, and dead. Making it work meant departing from the file, and every departure is written down. Running it against real dates caught four things a static file never shows:",
    ],
    liveActivity: "The file drew the Live Activity collapsed only, so I designed the expanded state: four fixed moments, not one cell per day, read at a glance off a locked phone.",
    measuresHeading: "It never launched, so there are no results. This is what I'd measure, and the first test I'd run.",
    postpaid:
        "Both in a month would have made neither good. Prepaid is a different shape: it pays at purchase, spends from a live balance, and stops rather than slows. Its ended state would lead with “incoming texts are still free”, so OTPs still arrive.",
    // Approved by Neha (2026-11-12), simplified.
    differently: "I'd test the not-connected screen with five travellers before polishing the animations.",
    // Shorter findings for the route (the live page's research notes).
    findings: {
        "where-is-roaming": "A web page inside the app. Not one app review I read mentions roaming.",
        "which-pack": "MyJio asks where and when, then filters its plans. Airtel asks neither.",
        "charging-me-now": "Type “roaming usage”: all ten suggestions turn into charges.",
        "is-it-working": "Type “roaming not”: the suggestions are countries. “Want to use it for getting important OTPs here in Canada.”",
        "how-much-left": "Airtel's terms: usage is “not available with Airtel in real time”.",
        "why-charged": "Without a pack, a one-day pack switches on by itself. “Sir its activated automatically.”",
        "pack-runs-out": "Airtel's terms: the credit limit isn't monitored while roaming.",
    } as Record<string, string>,
    placement: {
        row: "Somewhere she goes. It can't be selected for her on landing.",
        manage: "Stops her paying a bill from abroad.",
        tab: "Sits there all year for a few days' use.",
        chosen: "Tap Travel to enter, All to leave: no exit to design. And the app can select it for her on arrival.",
    },
    measures: [
        "Asking for the trip first only works if it moves buying earlier.",
        "Per thousand travellers. Naming every cause should bring these down, not move them.",
        "And the Live Activity kept on through the trip.",
    ],
    firstTest:
        "five people who travelled abroad this year, offline, starting from the not-connected state. Do they find the Travel tile without a hint? Does the arrival screen make sense when they're stressed and without signal? Does a named cause stop the urge to call support?",
    caught: [
        { lead: "Minutes that never reset.", body: "The meter said daily and behaved like a trip total." },
        { lead: "Day 1 of 10 beside Day 1 of 9.", body: "Pack days against trip days. Now every count names what it counts." },
        { lead: "“Ends tomorrow” two days early.", body: "The banner now reads the pack days left, like the dashboard." },
        { lead: "An end date from the wrong thing.", body: "The pack ended on the trip's date, not the pack's." },
    ],
    stats: [
        { value: "22 → 11", label: "Figma screens to routes: most screens are states of one." },
        { value: "1.17 MB", label: "The scene-graph player I threw away: 2,790 nodes, not one real input." },
        { value: "0", label: "Numbers typed twice. Everything computes from the trip." },
    ],
    notes: [
        "A self-initiated concept, not affiliated with or endorsed by Airtel. Its name and logo appear in the screens only to show the design in context.",
        "Research sources, all public: a recorded walkthrough of today's app, Google search suggestions, public complaint threads, app reviews of Airtel Thanks, Airtel's roaming terms and FAQ, and MyJio's roaming flow, which I walked myself.",
        "Prices are illustrative, modelled on Airtel's published packs, with GST at 18%. The phone number and the helpline are placeholders.",
        "The lock-screen banners and the Live Activity are iOS patterns. Most phones in India run Android, where the same trip would drive a persistent notification and a widget.",
        "Screens captured from the prototype on 12 Nov 2026, after fixing the places it disagreed with itself; each fix is listed in the repo's DIVERGENCES.md. Motion uses two easing curves and one spring, for the stamp.",
    ],
};

const Q = {
    roaming: at.placement,
    pack: at.trip,
    charge: at.money,
    working: at.landing,
    left: at.days,
    charged: at.charged,
    runsOut: at.runsOut,
};

// The seven questions as one trip. Each stop links to where it's answered;
// left, charged and runs-out share chapter 06.
const ACTS = at.questions.acts.map((act) => ({
    label: act.label,
    stops: act.rows.map((r) => ({ id: r.question.id, n: r.question.n, question: r.question.question, finding: TRIM.findings[r.question.id] ?? r.note, source: r.source })),
}));

// The landed lock screen: the hero's second print and the first screen of
// the hands-on moment. One definition, two captions.
const LANDED = phone(
    "lock-connected",
    "Lock screen, Tue 25 Aug: You are in Singapore, and you are online. Your pack went live by itself. Day 1 of your 9-day trip, unlimited data, 40 GB at full speed, about 100 minutes of calls a day.",
    "the moment she lands",
);

export const atV2 = {
    meta: {
        title: "Airtel Travel Mode · a case study by Neha Chhillar",
        description: TRIM.lede,
        canonical: `${SITE_URL}/case-study/airtel-travel-mode`,
    },

    chapters: [
        { id: "problem", n: "01", label: "The problem, and seven questions", short: "The problem" },
        { id: Q.roaming.id, n: "02", label: "Before you fly", short: "Before you fly" },
        { id: Q.working.id, n: "03", label: "The moment she lands", short: "Is my phone working?" },
        { id: Q.left.id, n: "04", label: "Every day after", short: "During the trip" },
        { id: "system", n: "05", label: "One trip, built in code", short: "One trip, every surface" },
        { id: "measure", n: "06", label: "What I'd measure, and what it cost", short: "Measures, trade-offs" },
        { id: "learned", n: "07", label: "What this changed in me", short: "Lessons" },
        { id: "notes", n: "—", label: "Notes & methods", short: "Notes & methods" },
    ],
    railLabel: "chapters",

    hero: {
        eyebrow: "self-initiated concept · not affiliated with airtel · not launched",
        title: ["Airtel", "Travel Mode"],
        titleLabel: "Airtel Travel Mode",
        line: `${at.hero.h1Pre}${at.hero.h1Highlight}`,
        lineHighlight: at.hero.h1Highlight,
        lede: TRIM.lede,
        status: TRIM.status,
        facts: [
            { label: "role", value: "Product designer, solo" },
            // Neha (2026-11-12): just a month.
            { label: "timeline", value: "One month, 2026" },
            { label: "research", value: at.hero.metaRow[4].value },
        ],
        prototype: { href: PROTOTYPE, label: "Try the prototype →" },
        // A product screen first, not the logo poster: the first tap, and the
        // moment the page's question is answered.
        // Poster: the recording's first frame (home, the Travel tile), not the logo frame.
        departure: { ...clip("rec-departure", at.hero.clip.label, "the first tap: before you fly"), src: `${V2}/rec-departure-first.jpg` },
        landed: LANDED,
    },

    problem: {
        heading: at.scene.h2,
        steps: [
            { body: TRIM.scene[0], shot: today("evidence-loading", at.scene.steps[0].shot.alt, "today: a web page, not a screen") },
            { body: TRIM.scene[1], shot: today("evidence-request-received", at.scene.steps[1].shot.alt, "today: a success tick for a request") },
        ],
        reframe: TRIM.reframe,
        pullQuote: at.scene.pullQuote,
        researchHeading: at.questions.h2.replace(". So", ", so"),
        researchLede: TRIM.researchLede,
        acts: ACTS,
    },

    // 02 · before you fly: three questions, one chapter (like 04).
    placement: {
        heading: Q.roaming.question,
        answer: Q.roaming.answer,
        lede: TRIM.placementLede,
        rejected: [
            { title: "A row only, no tile", desc: TRIM.placement.row },
            { title: "Manage becomes Travel Mode", desc: TRIM.placement.manage },
            { title: "A fifth nav tab", desc: TRIM.placement.tab },
        ],
        chosen: {
            title: "A tile in the category row",
            desc: TRIM.placement.chosen,
        },
        homeLabel: "home",
        home: [
            { id: "before", label: "before a trip", shots: [phone("home-today", at.placement.shots[0].shot.alt, "travel joins all, wi-fi, postpaid and bank")] },
            { id: "trip", label: "trip booked", shots: [phone("home-with-trip", at.placement.shots[1].shot.alt, "the tile is the switch, the row is the glance")] },
        ],
    },

    trip: {
        id: Q.pack.id,
        heading: Q.pack.question,
        answer: Q.pack.answer,
        body: TRIM.trip,
        form: phone(
            "trip-filled",
            "Trip form: Tell us about your trip. Destination Singapore, Malaysia and UAE; leaving 25 Aug 2026, coming back 2 Sep 2026, 9 days; Explore IR packs.",
            "the trip comes first: where, and when",
        ),
        presetsLabel: "trip",
        presets: [
            { id: "9", label: "3 countries · 9 days", shots: [phone("packs-3-countries-9-days", at.trip.presets[0].shot.alt, "“outlasts your 9 days by one” is checkable")] },
            { id: "4", label: "thailand · 4 days", shots: [phone("packs-1-country-4-days", at.trip.presets[1].shot.alt, "too long, and it says why it's still worth it")] },
            { id: "14", label: "thailand · 14 days", shots: [phone("packs-1-country-14-days", at.trip.presets[2].shot.alt, "₹2,999 “ends four days before you fly home”")] },
            { id: "20", label: "3 countries · 20 days", shots: [phone("packs-3-countries-20-days", at.trip.presets[3].shot.alt, "twenty days: the 30-day pack, room to spare")] },
        ],
        scoringLabel: "how it scores a pack",
        scoring: [
            { rule: "A pack that ends before she flies home", score: "−25" },
            { rule: "Every unused day", score: "−1.5" },
            { rule: "Minutes count from day five", score: "" },
            { rule: "Price is judged per day", score: "" },
        ],
        scoringNote: "the reason sentence comes from the same score",
    },

    money: {
        id: Q.charge.id,
        heading: Q.charge.question,
        answer: Q.charge.answer,
        body: TRIM.money,
        buttonLabel: "the button, three ways",
        rejected: [
            { title: "Pay ₹3,539", desc: "Reads as a payment. Nothing is taken now." },
            { title: "Confirm request", desc: "Today's wording. A request can be declined." },
        ],
        chosen: { title: "₹3,539 on your bill dated 2 Sep", desc: "The fact she's agreeing to, in the bill's words. If it's wrong, she sees it now." },
        review: phone(
            "review",
            "Review screen: ₹2,999 for 10 days, charged to your postpaid bill 999****9991. Pack ₹2,999 plus ₹540 GST, ₹3,539 added to your bill, shows on your 2 Sep bill, due 12 Sep. The button reads ₹3,539 on your bill dated 2 Sep.",
            "₹2,999 + ₹540 gst, on the 2 sep bill",
        ),
        confirmation: clip("rec-confirmation", "Recording of the prototype: pressing the bill button slides the confirmation over the review, and a Confirmed stamp lands.", "the button pressed, the stamp lands"),
        confirm: TRIM.confirm,
    },

    landing: {
        heading: Q.working.question,
        answer: Q.working.answer,
        body: TRIM.landing,
        // The hands-on moment: the banner and the screen it opens, switched together.
        switchLabel: "on arrival",
        states: [
            {
                id: "connected",
                label: "connected",
                shots: [
                    { ...LANDED, bar: "the banner on her lock screen" },
                    phone("landed-connected", at.landing.states[0].shots[1].alt, "tap it: her number first, then the pack"),
                ],
                caption: "The banner and the screen it opens say the same thing, with the day count the dashboard will use.",
            },
            {
                id: "not-connected",
                label: "not connected",
                shots: [
                    phone("lock-not-connected", at.landing.states[1].shots[0].alt, "same moment, no network"),
                    phone(
                        "landed-not-connected",
                        "Arrival screen, not connected: You've landed, but your phone hasn't connected. Your 10 days haven't started yet. Call free on +91 98765 43210, or WhatsApp, which works on airport or hotel Wi-Fi.",
                        "the screen it opens, offline",
                    ),
                ],
                caption: "The same arc, stalled halfway. Her first fear is that the pack is burning, so the first line says it hasn't started.",
            },
        ],
        after: TRIM.landingAfter,
        pullQuote: at.landing.pullQuote,
    },

    days: {
        heading: Q.left.question,
        answer: Q.left.answer,
        body: TRIM.days,
        scrubLabel: "day",
        scrubOf: "of 9",
        dayShots: at.days.dayShots.map((s, i) => ({ ...phone(`dashboard-day-${i + 1}`, s.alt, "the trip dashboard"), caption: s.caption ?? "" })),
        redZone: { lead: at.days.cards[0].h3, body: "25 of 100 minutes with a week to go is a normal Tuesday." },
        charged: {
            id: Q.charged.id,
            heading: Q.charged.question,
            body: TRIM.charged,
            banner: phone("lock-missed-calls", at.charged.parts[0].shot.alt, "thu 27 aug, the same day"),
            ledger: phone("dashboard-day-3-ledger", at.charged.parts[1].shot.alt, "₹41 = ₹35 + ₹6, under the pack"),
            pullQuote: at.charged.pullQuote,
        },
        runsOut: {
            id: Q.runsOut.id,
            heading: Q.runsOut.question,
            body: TRIM.runsOut,
            shots: [
                phone(
                    "lock-pack-ending-manual",
                    "Lock screen, Tue 1 Sep: Your pack ends in 2 days. ₹2,999 adds another 10 days. Nothing happens automatically.",
                    "two days out, auto-add off",
                ),
                phone("lock-pack-ended", at.runsOut.shots[1].shot.alt, "reassure, then inform"),
                phone("pack-ended", at.runsOut.shots[2].shot.alt, "if the trip outlasts the pack, it counts"),
            ],
            // The prototype's banner reads the switch (fixed 2026-11-12).
            autoAdd: "with auto-add on, the same banner says it adds itself, and that she can turn it off",
        },
    },

    system: {
        heading: at.system.h2,
        body: TRIM.system,
        tripLabel: at.system.tripLabel,
        trip: at.system.trip,
        feedsLabel: at.system.feedsLabel,
        feeds: at.system.feeds,
        caughtLabel: at.motion.caughtLabel,
        caught: TRIM.caught,
        liveActivity: phone(
            "lock-live-activity",
            "Lock screen Live Activity on Thu 27 Aug: Live in Singapore, day 3 of 9, 7 days to go, a rail from Landed to Today to Last day to Home, 45 minutes left, 83 SMS left, ₹41 extra spent, with Add days and WhatsApp buttons.",
            "the live activity, read off a locked phone",
        ),
        liveBody: TRIM.liveActivity,
        stats: TRIM.stats,
    },

    measure: {
        heading: TRIM.measuresHeading,
        items: at.measures.items.map((m, i) => ({ ...m, body: TRIM.measures[i] })),
        firstTest: { ...at.measures.firstTest, body: TRIM.firstTest },
        tradeoffsHeading: "Three decisions I could have made differently, and what each cost.",
        costLabel: at.tradeoffs.costLabel,
        tradeoffs: [
            { ...at.tradeoffs.items[1], body: TRIM.postpaid },
            at.tradeoffs.items[4],
            at.tradeoffs.items[5],
        ],
        unresolvedHeading: "Two things I couldn't resolve.",
        unresolved: [
            {
                lead: "How the app knows she's landed.",
                body: "The design rests on the app speaking first, and I can't prove that from outside. The network knows the moment the SIM registers abroad (that's when carriers send today's welcome SMS), but a banner from the app needs data or an OS hook. My fallback is that SMS, in the banner's words. I'd ask the network team first.",
            },
            {
                lead: "Whether an unused pack is still billed.",
                body: "Airtel's terms don't say whether an unactivated postpaid pack shows on the bill if the trip never happens. I designed around what's published and made cancelling self-serve. A production version needs the actual policy.",
            },
        ],
    },

    learned: {
        before: at.closer.changedPre.trim(),
        highlight: at.closer.changedHighlight,
        // Lesson 3 replaces “Motion is an argument or it is decoration.”
        lessons: [at.closer.lessons[0], at.closer.lessons[1], "Run the design against real dates. The static file hid four bugs that only running it showed."],
        differentlyLabel: "What I'd do differently",
        differently: TRIM.differently,
        prototype: { href: PROTOTYPE, label: "Try the prototype, any trip →" },
        repo: { href: "https://github.com/NehaChhillar07/airtel-travel-mode", label: "The code is public →" },
    },

    notes: {
        heading: "Notes & methods",
        items: TRIM.notes,
    },

    next: {
        label: "next case study",
        title: "Human Firewall",
        line: "a 10-year-old security platform, rebuilt AI-native. admins launch without calling support",
        href: "/v2/case-study/human-firewall",
        shot: { src: hf.hero.scrollHero.media, alt: "", w: 3246, h: 1830, bar: "human firewall" } satisfies Shot,
    },
};

// Every wording change from the live page, for review.
export const SLIPS = [
    "hero · eyebrow “Airtel · Travel Mode” → “self-initiated concept · not affiliated with airtel · not launched” (decided 2026-11-03); the status line says there are no users or results yet.",
    "hero · timeline “July 2026, one month” → “One month, 2026” (Neha, 2026-11-12).",
    "hero · opens on the departure recording and the landed lock screen, not the logo poster; the disciplines line and the hand-drawn annotation removed.",
    "hero · the “short version” strip (three moves) removed: each move is a chapter, and the closing ladder that repeated it is gone too.",
    "money · ₹520 GST → ₹540 and ₹3,519 → ₹3,539 everywhere (18%; the prototype now computes it).",
    "01 · “The brief said awareness and adoption of roaming packs were low” → “The obvious problem is that too few people buy roaming packs” (there was no brief). The scene shortened; the three hand notes, the WhatsApp and manual-steps details removed.",
    "01 · problem and research become one chapter; the seven questions drawn as one trip, each stop linking to its answer. The two segments cut to one line (postpaid is the spine).",
    "02 · where is roaming, which pack and is it charging me become one chapter, “before you fly”. The four placement options shortened; “the test” leads. The trip form added (it was never shown); the scoring rules move from small print to a card. “Today the app sells a pack to a number” and the “any trip in the prototype” link removed.",
    "02 · “The version I submitted” → “My first version”; the confirmation heading and “The problem was never the tick. It was the ring blooming out of it” removed; the stamp rules removed (they repeated “Confirmed, never Paid”).",
    "03 · the “roaming not” autocomplete line removed here (it's on the route in 01); the arrival banner now says “unlimited data, 40 GB at full speed”.",
    "04 · how much is left, why was I charged and when it runs out become one chapter. The second card, the low-balance pair and the usage banner removed. The pack-ending banner now reads the auto-add switch: “Nothing happens automatically” only when it's off.",
    "05 · the system and the build become one chapter, about 250 words. The three motion spec tables, the dashboard recording and “three transitions I replaced” removed; the spring moves to notes.",
    "06 · trade-offs cut from seven to three (02, 05, 06): the rest repeated chapters. “What I would do next” removed. New: how landing would be detected, beside the billing question, as two things not resolved.",
    "07 · the closing ladder removed; lesson 3 “Motion is an argument or it is decoration” → “Run the design against real dates…”; “what I'd do differently” added (approved 2026-11-12).",
    "notes · new: the not-affiliated disclaimer, the sources, illustrative prices and placeholder numbers, iOS-only surfaces, the motion spec, and the capture date.",
    "all chapters · body copy shortened, claims unchanged: see TRIM.",
];
