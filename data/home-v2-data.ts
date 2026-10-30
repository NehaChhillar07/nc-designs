// Content for homepage 2.0 (/v2).
// Repo rule: no hardcoded copy inside components — everything reads from this file.
// Design rules for this page: design-system/neha-portfolio/pages/home-v2.md
//
// Word budget: about 250 visible words for the whole page. Before adding a
// line, cut one.

import { TESTIMONIAL_ENG, TESTIMONIAL_PM } from "@/lib/placeholders";

export type WorkStatus = "shipped" | "live" | "prototype" | "client";

// Where a piece rests on the hero desk. x/y are percentages of the desk,
// w is the piece's width (desktop widths are designed at 1440 and shrink with
// the viewport below that), r its resting tilt in degrees. Desktop and phone
// have separate homes because the desk has a different shape on each.
export type DeskHome = { x: number; y: number; w: number; r: number };
export type DeskPlacement = { desktop: DeskHome; phone: DeskHome };
// Where a pile member moves when the pile fans out (relative to its stacked spot).
export type DeskFan = { desktop: { dx: number; dy: number; r: number }; phone: { dx: number; dy: number; r: number } };

// Featured work is big on the desk and gets a tall row in the list. The rest
// sits in the "more work" pile and gets compact rows.
export type WorkTier = "featured" | "more";

export type WorkRow = {
    id: string;
    name: string;
    // One line, a fact or a number. YC style: name + outcome.
    outcome: string;
    status: WorkStatus;
    year: string;
    href: string;
    thumb: string;
    thumbAlt: string;
    readingTime: string;
    tier: WorkTier;
    desk: DeskPlacement;
    // Pile members only.
    fan?: DeskFan;
};

// The current role. The client stays unnamed until Neha confirms the NDA
// allows it; then set CLIENT to "First Abu Dhabi Bank".
const COMPANY = "gemini solutions";
const CLIENT = "a leading UAE bank";

export const homeV2Data = {
    meta: {
        title: "Neha Chhillar · Product designer",
        description:
            "Senior product designer for AI products. I find the problem worth solving, and prove the answer works with real users before engineering builds it.",
        url: "/v2",
    },

    topBar: {
        name: "neha chhillar",
        // Bump by hand when the page changes.
        // What she is doing right now, Paco-style. Update when it changes.
        updated: `now: ${COMPANY} · bfsi`,
        specToggle: "redlines",
        specHint: "S",
        resume: "resume",
        resumeHref: "/v2/resume",
        homeHref: "/v2",
        connect: "connect",
    },

    // Plays once per visit before the hero. Any click or key skips it.
    // The last word holds while the page arrives behind it.
    greeting: ["hey", "hiii", "ok hi.", "i’m neha"],

    // The hero is a desk: the work sits on it as pieces you can drag, throw
    // and inspect. Scrolling (or "tidy up") files every piece into its row in
    // the work list below, and scrolling back up scatters them again.
    desk: {
        tidy: "tidy up",
        // Read by assistive tech and shown as the cursor tag over a piece.
        pieceHint: "drag, or click to open",
        open: "open case study",
        // Arrow keys nudge a focused piece; Shift moves it further.
        keysHint: "arrow keys move it. enter opens it.",
        note: {
            // Kumar's line, in her own hand: evidence over taste.
            lines: ["users said", "> i think"],
            desk: { desktop: { x: 51, y: 66, w: 150, r: -4 }, phone: { x: 68, y: 65, w: 96, r: 5 } },
        },
        polaroid: {
            caption: "me, probably redlining something",
            desk: { desktop: { x: 89, y: 3, w: 125, r: 5 }, phone: { x: 72, y: 1, w: 80, r: 6 } },
        },
        pileLabel: {
            text: "more work",
            desk: { desktop: { x: 76.5, y: 88 }, phone: { x: 3, y: 84 } },
        },
        // The current BFSI work, under NDA: a print of a redacted page.
        nda: {
            tag: "under nda",
            year: "2026",
            // The facts stay readable; only the screen's values are blacked out.
            company: "Gemini Solutions",
            industry: "wholesale banking · bfsi",
            label: "wholesale banking",
            // Under the card in the phone deck; the print already names the work.
            client: "for a leading UAE bank",
            meta: "under NDA · 2026",
            open: "ask me about it on a call",
            desk: { desktop: { x: 63, y: 50, w: 185, r: 7 }, phone: { x: 2, y: 54, w: 140, r: -5 } },
        },
    },

    hero: {
        first: "neha",
        last: "chhillar",
        // Positioning: judgment and outcomes first. Code is the method (it makes
        // the evidence real), never the headline.
        line: "product designer. i find the problem worth solving, and prove the answer works.",
        note: "my prototypes are real code, so the user tests are real too.",
        // Phones only: two scannable lines instead of the bio paragraph.
        currently: { label: "currently", text: `${COMPANY} · wholesale banking, bfsi` },
        previously: { label: "previously", text: "first designer at two companies · human firewall" },
        seeWork: "see the work",
        portrait: "/hero-portrait.jpg",
        portraitAlt: "Neha Chhillar",
        // Benji style: the proof sits inside a sentence, with the project linked.
        bio: {
            // Leads with the current role, then the track record.
            now: `now at ${COMPANY}, designing wholesale banking for ${CLIENT}. i own one module of the platform, end to end.`,
            // Phones only.
            short: "before that, first designer at two companies.",
            before: "before that, first designer at two companies. i rebuilt",
            linkText: "human firewall",
            linkHref: "/v2/case-study/human-firewall",
            after: "as an AI-native platform, solo, for 100+ enterprise security teams.",
        },
    },

    // YC style: numbers instead of adjectives.
    // Numbers count up on arrival, so value is a number and the symbols sit apart.
    proof: [
        // One outcome per line, each from a shipped project.
        { prefix: "", value: 80, suffix: "%", label: "training engagement, was 20%" },
        { prefix: "+", value: 52, suffix: "%", label: "onboarding completion" },
        { prefix: "+", value: 48, suffix: "%", label: "engagement after the rebuild" },
    ],

    work: {
        heading: "work",
        statusLabels: {
            shipped: "shipped",
            live: "live",
            prototype: "prototype",
            client: "client",
        } satisfies Record<WorkStatus, string>,
        cursorPrefix: "read",
        moreHeading: "more work",
        // The phone deck.
        deckHeading: "work",
        deckFeatured: "featured",
        deckPrev: "previous project",
        deckNext: "next project",
        rows: [
            {
                id: "human-firewall",
                name: "Human Firewall",
                outcome: "admins launch without calling support. engagement +48%",
                status: "shipped",
                year: "2025–26",
                href: "/v2/case-study/human-firewall",
                thumb: "/work/thumbs/human-firewall.png",
                thumbAlt: "Human Risk Index dashboard",
                readingTime: "8 min",
                tier: "featured",
                desk: { desktop: { x: 52, y: 5, w: 400, r: -3 }, phone: { x: 3, y: 0, w: 220, r: -3 } },
            },
            {
                id: "flashcard-training",
                name: "Flashcard Builder",
                outcome: "training engagement from 20% to 80%. engineering built on my prototype",
                status: "shipped",
                year: "2025",
                href: "/case-study/flashcard-training",
                thumb: "/work/flashcard/hf-cards.png", // client logo blurred
                thumbAlt: "Flashcard training cards",
                readingTime: "6 min",
                tier: "featured",
                desk: { desktop: { x: 80, y: 30, w: 250, r: 4 }, phone: { x: 47, y: 33, w: 170, r: 4 } },
            },
            {
                id: "unsaid",
                name: "unsaid",
                outcome: "idea to live product, solo, in three weeks",
                status: "live",
                year: "2026",
                href: "/case-study/unsaid",
                thumb: "/work/thumbs/unsaid.png",
                thumbAlt: "unsaid app screens",
                readingTime: "6 min",
                tier: "more",
                desk: { desktop: { x: 73, y: 64, w: 170, r: -4 }, phone: { x: 30, y: 78, w: 112, r: -4 } },
                fan: { desktop: { dx: -175, dy: 24, r: -7 }, phone: { dx: -88, dy: 6, r: -8 } },
            },
            {
                id: "airtel-travel-mode",
                name: "Airtel Travel Mode",
                outcome: "roaming that explains itself before you call support. freelance concept, working prototype",
                status: "prototype",
                year: "2026",
                href: "/case-study/airtel-travel-mode",
                thumb: "/work/thumbs/airtel-travel-mode.png",
                thumbAlt: "Airtel Travel Mode screens",
                readingTime: "9 min",
                tier: "more",
                desk: { desktop: { x: 73.6, y: 65, w: 170, r: 2 }, phone: { x: 31, y: 79, w: 112, r: 2 } },
                fan: { desktop: { dx: 0, dy: -6, r: 1 }, phone: { dx: 0, dy: -4, r: 1 } },
            },
            {
                id: "ecrime-hub",
                name: "eCrime Hub",
                outcome: "reporting a cybercrime in under 3 clicks, down from 6+. for Dubai Police",
                status: "client",
                year: "2025",
                href: "/case-study/ecrime-hub",
                thumb: "/work/thumbs/ecrime-hub.png",
                thumbAlt: "eCrime Hub website",
                readingTime: "4 min",
                tier: "more",
                desk: { desktop: { x: 74.2, y: 66, w: 170, r: 6 }, phone: { x: 32, y: 80, w: 112, r: 6 } },
                fan: { desktop: { dx: 175, dy: 20, r: 8 }, phone: { dx: 92, dy: 8, r: 9 } },
            },
        ] as WorkRow[],
    },

    // Each principle is a promise with a receipt: the project that proves it.
    principles: {
        heading: "how i work",
        items: [
            {
                line: "i start with the problem, not the screen.",
                receipt: "low compromise meant low engagement, not low risk",
                href: "/v2/case-study/human-firewall",
            },
            {
                line: "my calls come with evidence, not taste.",
                receipt: "my pm put it better, below",
                href: "#v2-kind",
            },
            {
                line: "i test ideas as working software, so the team learns before it builds.",
                receipt: "engineering shipped the flashcard builder on my front end",
                href: "/case-study/flashcard-training",
            },
            {
                line: "i own the outcome, end to end.",
                receipt: "first designer at two companies",
            },
        ],
    },

    // Jenny Wen style log. Dates are from when each piece went up; edit freely.
    lately: {
        heading: "lately",
        nowLabel: "now",
        items: [
            { date: "oct 2026", text: `joined ${COMPANY}. designing wholesale banking for ${CLIENT}` },
            { date: "sep 2026", text: "redesigned airtel roaming as a travel mode", href: "/case-study/airtel-travel-mode" },
            { date: "aug 2026", text: "wrote “where is the deliverability?”", href: "/v2/writing/where-is-the-deliverability" },
            { date: "jul 2026", text: "wrote what being the first designer costs you", href: "/v2/writing/first-designer" },
            { date: "jul 2026", text: "shipped unsaid, solo", href: "/case-study/unsaid" },
        ],
    },

    // Excerpts are verbatim fragments of the full quotes in lib/placeholders.ts.
    // `token` is the full quote: it gates the item (while unreplaced,
    // production hides it) and is shown in full on the profile card.
    kindWords: {
        heading: "kind words",
        items: [
            {
                token: TESTIMONIAL_PM,
                excerpt:
                    "Neha finds the problem herself, shows up with a working version, and defends her calls with what users said, not with taste. Rare.",
                name: "Kumar Deepam",
                role: "product manager",
                team: "human firewall",
                avatar: "/testimonials/kumar.png",
            },
            {
                token: TESTIMONIAL_ENG,
                excerpt: "It was working code, proper states, same tokens as the Figma file.",
                name: "Deepanshu Sharma",
                role: "senior full stack engineer",
                team: "human firewall",
                avatar: "/testimonials/deepanshu.png",
            },
        ],
    },

    footer: {
        line: "say hi.",
        // The fixed pill on phones.
        pill: "say hi",
        copyHint: "click to copy",
        copied: "copied",
        call: "book a call",
        linkedin: "linkedin",
        github: "github",
        workWithMe: "work with me",
        workWithMeHref: "/v2/work-with-me",
        resume: "resume",
        resumeHref: "/v2/resume",
        // Commits are in +05:30, so the clock runs on India time.
        timeZone: "Asia/Kolkata",
        timeLabel: "ist",
    },
};

export type HomeV2Data = typeof homeV2Data;
