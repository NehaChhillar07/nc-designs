// Copy for /work-with-me — the freelance offer page.
// Repo rule: no hardcoded copy inside components — everything reads from this file.
//
// No public pricing by Neha's decision (2026-09): packages and process were
// removed — scope and price are discussed on the call instead.


export const workWithMeData = {
    meta: {
        title: "Work with Neha Chhillar · Product design plus working front end",
        description:
            "Freelance product designer who designs in Figma and builds the front end in Next.js, for founders building AI products.",
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


    testimonials: {
        eyebrow: "What it's like",
        // Items live in data/testimonials-data.ts, shared with the About section.
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
