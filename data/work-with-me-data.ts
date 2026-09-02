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
        // This exact substring renders in the Caveat hand in the strong warm
        // tone — the one contrast word, like 21st.dev's "living".
        highlight: "working",
        // Marker syntax (rendered by MarkedText): __phrase__ draws the warm
        // underline, ==phrase== the soft warm highlight.
        body:
            "First designer twice. Onboarding completion ==up 52%==, engagement ==up 48%==. I build the front end myself, so your developers start from __my code, not screenshots__.",
        availability: "Open to freelance projects and full-time roles.",
    },

    whoFor: {
        eyebrow: "Who this is for",
        body:
            "Founders and small teams building AI products who need __real product thinking, not just screens__, designed and built ==without hiring two people==.",
    },


    testimonials: {
        eyebrow: "What it's like",
        // Items live in data/testimonials-data.ts, shared with the About section.
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
        // Handwritten aside above the booking button, with the drawn arrow.
        note: "thirty minutes. no deck needed.",
    },
};

export type WorkWithMeData = typeof workWithMeData;
