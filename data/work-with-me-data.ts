// Copy for /work-with-me — the freelance offer page.
// Repo rule: no hardcoded copy inside components — everything reads from this file.
//
// Pricing lives ONLY on this page, never on the homepage (a recruiter reading
// pricing there would read it as a flight risk — the page exists so cold
// outreach and LinkedIn have one link that explains offer, price, and start).

import { TESTIMONIAL_ENG, TESTIMONIAL_PM } from "@/lib/placeholders";

export type PackageCard = {
    name: string;
    tagline: string;
    deliverables: string[];
    duration: string; // also shown in the hover cursor tag
    price: string;
    sticker?: string; // rotated Caveat aside
    dark: boolean; // dark cover treatment vs light card
};

export type Step = {
    number: string;
    name: string;
    body: string;
};

export type Testimonial = {
    // Unreplaced token → hidden in production, sample shown in dev.
    // Replace the token in lib/placeholders.ts with "Quote | Name | Role"
    // (pipe-separated) and the real card renders everywhere.
    token: string;
    sample: { quote: string; name: string; role: string };
};

export const workWithMeData = {
    meta: {
        title: "Work with Neha Chhillar · Product design plus working front end",
        description:
            "Freelance product designer who designs in Figma and builds the front end in Next.js. Product sprints and single screen rebuilds for founders building AI products.",
        url: "/work-with-me",
        ogImage: "/og/work-with-me.png",
    },

    hero: {
        eyebrow: "Freelance",
        headline: "Design plus a working front end. One person.",
        // The Highlighter mark wraps this exact substring of the headline.
        highlight: "working front end",
        body:
            "I design your product in Figma and build the front end myself, fully interactive and production ready. Your developers start from my code, not from screenshots.",
        availability: "Open to freelance projects and full-time roles.",
    },

    whoFor: {
        eyebrow: "Who this is for",
        body:
            "Founders and small teams building AI products who have a backend or an idea, and need the front end designed and built without hiring two people.",
    },

    packages: {
        eyebrow: "Two ways to start",
        cards: [
            {
                name: "Product sprint",
                tagline: "Your MVP or a core flow, designed and built end to end.",
                deliverables: [
                    "Research and flows",
                    "Design system with tokens in Figma",
                    "Working front end in Next.js and TypeScript",
                    "Handoff: repo plus Figma file",
                ],
                duration: "2 to 3 weeks",
                price: "USD 3,000 to 5,000",
                dark: true,
            },
            {
                name: "One screen rebuild",
                tagline: "Your most important or most broken screen, redesigned and coded.",
                deliverables: ["One screen or flow", "Figma plus working code", "3 days"],
                duration: "3 days",
                price: "USD 300 to 500",
                sticker: "a quick way to see how I work",
                dark: false,
            },
        ] as PackageCard[],
    },

    process: {
        eyebrow: "How it works",
        steps: [
            {
                number: "01",
                name: "Call",
                body: "30 minutes. What you are building, what is blocking you, when you need it live.",
            },
            {
                number: "02",
                name: "Scope",
                body: "A one page proposal within 24 hours. Fixed price, fixed timeline.",
            },
            {
                number: "03",
                name: "Design and build",
                body: "Short written updates every two days. You see working screens, not status reports.",
            },
            {
                number: "04",
                name: "Handoff",
                body: "A repo and a Figma file. Two rounds of revision included.",
            },
        ] as Step[],
    },

    testimonials: {
        eyebrow: "What it's like",
        items: [
            {
                token: TESTIMONIAL_PM,
                sample: {
                    quote:
                        "Neha turned a vague brief into working screens inside a week. The prototype stopped every scope argument before it started.",
                    name: "Sample name",
                    role: "Product Manager",
                },
            },
            {
                token: TESTIMONIAL_ENG,
                sample: {
                    quote:
                        "We shipped her front end almost as-is. Clean components, sane naming, none of the usual redesign-in-code phase.",
                    name: "Sample name",
                    role: "Engineer",
                },
            },
        ] as Testimonial[],
    },

    proof: {
        eyebrow: "Proof",
        // ids from data/case-study-data.ts — unsaid, Flashcard, Human Firewall
        projectIds: [6, 3, 1],
    },

    video: {
        line: "Two minutes on what I bring and how I work.",
        title: "Two-minute intro",
    },

    terms: "50% to start, 50% on delivery. Payment by Wise or PayPal. I take two projects a month.",

    cta: {
        book: "Book a call",
        email: "or email me",
        emailSubject: "Project inquiry",
    },
};

export type WorkWithMeData = typeof workWithMeData;
