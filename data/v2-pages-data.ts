// Copy for the /v2 pages other than the homepage (data/home-v2-data.ts) and
// the case studies (not rebuilt yet; v2 links to the current ones).
// Repo rule: no hardcoded copy inside components — everything reads from here.
// Design rules: design-system/neha-portfolio/pages/home-v2.md

import { firstDesignerEssay } from "@/data/writing-first-designer-data";
import { whereIsTheDeliverabilityEssay } from "@/data/writing-where-is-the-deliverability-data";

// Every v2 route in one place, so links never drift back to the old site.
export const V2 = {
    home: "/v2",
    work: "/v2#v2-work",
    resume: "/v2/resume",
    workWithMe: "/v2/work-with-me",
    writing: (slug: string) => `/v2/writing/${slug}`,
    caseStudy: (slug: string) => `/v2/case-study/${slug}`,
} as const;

// The essays reuse their existing content verbatim; only the layout is new.
export const v2Essays = {
    "first-designer": firstDesignerEssay,
    "where-is-the-deliverability": whereIsTheDeliverabilityEssay,
} as const;
export type V2EssaySlug = keyof typeof v2Essays;

export type JourneyStat = { prefix: string; value: number; suffix: string; label: string };
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
                    { prefix: "", value: 50, suffix: "k+", label: "ecrime hub visitors, week one" },
                ],
                work: ["human-firewall", "flashcard-training", "ecrime-hub"],
            },
            {
                id: "solo",
                mark: "2026",
                when: "2026, alongside",
                role: "on my own",
                place: "nights and weekends",
                line: "an app taken from idea to live, solo, and a roaming redesign tested as working software.",
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
        eyebrow: "freelance",
        // One line each: letterpress lines never wrap, so each must fit a phone.
        headline: ["product design for", "founders building", "AI products."],
        body: "i find the problem worth solving, test the answer with real users as working software, and hand your engineers a front end they can ship on.",
        proof: [
            { value: "+52%", label: "onboarding completion" },
            { value: "20% → 80%", label: "training engagement" },
        ],
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
