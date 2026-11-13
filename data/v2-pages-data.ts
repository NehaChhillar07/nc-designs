// Copy for the /v2 pages other than the homepage (data/home-v2-data.ts) and
// the case studies (not rebuilt yet; v2 links to the current ones).
// Repo rule: no hardcoded copy inside components — everything reads from here.
// Design rules: design-system/neha-portfolio/pages/home-v2.md

import { firstDesignerEssay } from "@/data/writing-first-designer-data";
import { whereIsTheDeliverabilityEssay } from "@/data/writing-where-is-the-deliverability-data";

// Every v2 route in one place, so links never drift back to the old site.
export const V2 = {
    home: "/",
    work: "/#v2-work",
    resume: "/resume",
    workWithMe: "/work-with-me",
    writing: (slug: string) => `/writing/${slug}`,
    caseStudy: (slug: string) => `/case-study/${slug}`,
} as const;

// The essays reuse their existing content verbatim; only the layout is new.
export const v2Essays = {
    "first-designer": firstDesignerEssay,
    "where-is-the-deliverability": whereIsTheDeliverabilityEssay,
} as const;
export type V2EssaySlug = keyof typeof v2Essays;

export type JourneyStat = { prefix: string; value: number; suffix: string; label: string; decimals?: number };
export type JourneyStop = {
    id: string;
    mark: string;
    when: string;
    role: string;
    place: string;
    line: string;
    stats: JourneyStat[];
    work: string[];
    current?: boolean;
};

export const v2Pages = {
    essay: {
        back: "home",
        eyebrow: "writing",
        next: "read next",
        byline: "by",
        author: "neha chhillar",
    },

    resume: {
        meta: {
            title: "Resume · Neha Chhillar",
            description: "Senior product designer for AI products. Resume.",
        },
        heading: "resume",
        sub: "the long version, stop by stop, with the work i made at each. the one-page pdf is a download away.",
        download: "download pdf",
        downloading: "preparing…",
        copy: "copy link",
        copied: "copied",
        downloadError: "the download didn’t start. try again, or email me for a copy.",
        file: "/Neha_Chhillar_Resume.pdf",

        // The on-screen resume is the route, oldest stop first. Facts come from
        // the PDF; `work` lists ids from homeV2Data.work.rows, so a stop's
        // prints and links never drift from the homepage. `mark` is the big
        // ghost numeral behind the stop.
        journeyLabel: "the route so far",
        readPrefix: "read",
        hereLabel: "you are here",
        stops: [
            {
                id: "du",
                mark: "2020",
                when: "jun 2020 – feb 2023",
                role: "english honours",
                place: "university of delhi · then google ux, coursera",
                line: "three years of reading closely, then a ux certificate. i shipped my first enterprise product eight months after it.",
                stats: [],
                work: [],
            },
            {
                id: "texlaculture",
                mark: "2023",
                when: "mar 2023 – aug 2024",
                role: "ux designer",
                place: "texlaculture · gurgaon",
                line: "founding designer of an hrms, from scratch: onboarding, hiring, attendance, learning, performance. 40+ modules folded into three modes.",
                stats: [
                    { prefix: "", value: 8, suffix: "k+", label: "employees in year one" },
                    { prefix: "+", value: 52, suffix: "%", label: "onboarding completion" },
                ],
                work: [],
            },
            {
                id: "infosec",
                mark: "2024",
                when: "aug 2024 – sep 2026",
                role: "product designer",
                place: "infosec ventures · gurgaon",
                line: "the only designer on a 10-year-old security platform. i rebuilt it as AI-native with one pm and eight engineers, and wrote front ends engineering shipped.",
                stats: [
                    { prefix: "+", value: 48, suffix: "%", label: "admin engagement" },
                    { prefix: "+", value: 32, suffix: "%", label: "report adoption" },
                    // Emirates 24|7, 9 Aug 2026: "more than 1.42 million visitors since its launch on 12 July 2025".
                    { prefix: "", value: 1.42, decimals: 2, suffix: "M", label: "ecrime hub visitors, first year" },
                ],
                work: ["human-firewall", "flashcard-training", "ecrime-hub"],
            },
            {
                id: "solo",
                mark: "2026",
                when: "2026, alongside",
                role: "on my own",
                place: "nights and weekends",
                line: "an app taken from idea to live, solo, and a roaming redesign built as working software.",
                stats: [{ prefix: "", value: 3, suffix: " weeks", label: "unsaid, idea to live" }],
                work: ["unsaid", "airtel-travel-mode"],
            },
            {
                id: "gemini",
                mark: "now",
                when: "oct 2026 – now",
                role: "product designer",
                place: "gemini solutions · bfsi",
                line: "designing wholesale banking for a leading UAE bank. one module of the platform, end to end.",
                stats: [],
                work: [],
                current: true,
            },
        ] as JourneyStop[],
    },

    // Rewritten for the new positioning: judgment and outcomes first, code as
    // the method. No pricing or packages (Neha's decision, 2026-09).
    workWithMe: {
        meta: {
            title: "Work with Neha Chhillar · Freelance product design",
            description:
                "Freelance product design for founders building AI products. I find the problem worth solving, and prove the answer works with real users.",
        },
        eyebrow: "freelance product design · for founders building AI products",
        // The hero is a sentence the founder finishes. Each "stuck on" answer
        // pulls the matching proof onto the desk: a real result from a real
        // project, with its source, never a number on its own. The finished
        // sentence travels with the booking as its note.
        sentence: {
            pre: "i'm building",
            mid: "for",
            post: "and i'm stuck on",
            end: ".",
            labels: { building: "what you're building", who: "who it's for", stuck: "where you're stuck" },
            building: ["an AI product", "a SaaS platform", "an internal tool", "a consumer app", "a security product", "a fintech product", "a learning product", "a public service"],
            who: ["teams at work", "admins and IT", "security teams", "banks and finance teams", "learners", "everyday people", "a city or a government"],
            // Every answer deals a real screen with a sourced result. Numbers
            // are the case studies' own (Human Firewall: before and after, all
            // 10 migrated clients; eCrime Hub: Emirates 24|7, Aug 2026).
            stuck: [
                {
                    id: "onboarding",
                    label: "onboarding",
                    value: "+48%",
                    what: "admin engagement",
                    source: "human firewall · four questions replaced the campaign form. all 10 migrated clients, before and after",
                    href: "/case-study/human-firewall",
                    link: "read how",
                    image: { src: "/work/1st-case study/campaign-wizard-4-questions.png", alt: "Human Firewall's campaign setup: four questions instead of a long form", position: "left top", ratio: 4 / 3 },
                },
                {
                    id: "support",
                    label: "too many support tickets",
                    value: "−20%",
                    what: "feature and bug escalations",
                    source: "human firewall · roughly, on onboarded customers",
                    href: "/case-study/human-firewall",
                    link: "read how",
                    image: { src: "/work/1st-case study/ai-campaign-generation.png", alt: "Human Firewall's AI campaign generation: the campaign drafted for the admin to review", position: "left top", ratio: 4 / 3 },
                },
                {
                    id: "reports",
                    label: "reports nobody opens",
                    value: "+32%",
                    what: "report adoption",
                    source: "human firewall · portal downloads, the same 10 clients",
                    href: "/case-study/human-firewall",
                    link: "read how",
                    image: { src: "/work/1st-case study/hero-image.png", alt: "The Human Firewall dashboard: the human risk index for an organisation", position: "left top", ratio: 4 / 3 },
                },
                {
                    id: "finishing",
                    label: "getting people to finish",
                    value: "20% → 80%",
                    what: "training completion",
                    source: "flashcard builder · live on 10 enterprise clients",
                    href: "/case-study/flashcard-training",
                    link: "read how",
                    image: { src: "/work/flashcard/hf-cards.png", alt: "The real cover card of a live training pack, client logo blurred", crop: { x: 30.75, y: 15.1, w: 39, h: 67.4 }, ratio: (2458 * 39) / (1720 * 67.4) },
                },
                {
                    id: "acting",
                    label: "getting people to act",
                    value: "1.42M",
                    what: "visitors in its first year",
                    source: "ecrime hub · for dubai police. every report click alerts a security team",
                    href: "/case-study/ecrime-hub",
                    link: "read how",
                    image: { src: "/work/ecrime-hub/hero-poster.jpg", alt: "The eCrime Hub homepage over the Dubai skyline", position: "center", ratio: 4 / 3 },
                },
                {
                    id: "scale",
                    label: "content that has to scale",
                    value: "40+",
                    what: "pages from three templates",
                    source: "ecrime hub · in arabic and english, for dubai police",
                    href: "/case-study/ecrime-hub",
                    link: "read how",
                    image: { src: "/work/ecrime-hub/content-page.png", alt: "An eCrime Hub content page built from one of its three templates", position: "left top", ratio: 4 / 3 },
                },
                {
                    id: "first",
                    label: "shipping the first version",
                    value: "3 weeks",
                    what: "idea to live, solo",
                    source: "unsaid · designed in claude design, built in claude code",
                    href: "/case-study/unsaid",
                    link: "read how",
                    image: { src: "/work/unsaid/home-dark.png", alt: "The unsaid home screen: say the thing you've never said", position: "center top", ratio: 4 / 3 },
                },
                {
                    id: "safety",
                    label: "keeping a community safe",
                    value: "2 layers",
                    what: "of moderation before anything posts",
                    source: "unsaid · rules, then an AI safety model. crisis gets a soft door, not a block",
                    href: "/case-study/unsaid",
                    link: "read how",
                    image: { src: "/work/unsaid/your-turn.png", alt: "unsaid's write screen: say the thing you've never said, no name, ever", position: "center 52%", ratio: 4 / 3 },
                },
                {
                    id: "trust",
                    label: "users who don't trust the bill",
                    value: "₹41",
                    what: "= ₹35 + ₹6, every charge named",
                    source: "airtel travel mode · a self-initiated concept, built as a working prototype",
                    href: "/case-study/airtel-travel-mode",
                    link: "read how",
                    image: { src: "/work/airtel-v2/dashboard-day-3-ledger.png", alt: "The Airtel Travel Mode ledger: ₹41 you didn't start, itemised as ₹35 voicemail divert and ₹6 for a declined call", position: "center 24%", ratio: 4 / 3 },
                },
                {
                    id: "idea",
                    label: "proving an idea before building it",
                    value: "1 trip",
                    what: "drives every screen, in code",
                    source: "airtel travel mode · not launched. try the prototype on its page",
                    href: "/case-study/airtel-travel-mode",
                    link: "read how",
                    image: { src: "/work/airtel-v2/lock-connected.png", alt: "Airtel Travel Mode's lock screen on landing: you are in Singapore, and you are online", position: "center 34%", ratio: 4 / 3 },
                },
            ],
            hint: "pick yours. the proof changes with it",
            note: "your sentence comes with the booking",
        },
        body: "i find the problem worth solving, test the answer with real users as working software, and hand your engineers a front end they can ship on.",
        whoFor: {
            heading: "who this is for",
            body: "founders and small teams building AI products, who need product judgment, not just screens.",
        },
        availability: "open to freelance projects and full-time roles.",
        cta: {
            book: "book a call",
            note: "thirty minutes. no deck needed.",
            email: "or email me",
            emailSubject: "Project inquiry",
        },
    },

    notFound: {
        code: "404",
        heading: "nothing filed here.",
        body: "the link may be old, or the page moved. everything else is still on the desk.",
        links: [
            { href: V2.home, label: "home" },
            { href: V2.work, label: "work" },
            { href: V2.resume, label: "resume" },
        ],
    },

    connect: {
        heading: "say hi.",
        lead: "the fastest way to reach me is email. a call works too.",
        close: "close",
        copyHint: "click to copy",
        copied: "copied",
        call: "book a call",
        callNote: "thirty minutes, no deck needed",
        linkedin: "linkedin",
        resume: "resume",
    },
};
