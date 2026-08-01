// Data for the homepage "Fun with Claude" section.
// Repo rule: no hardcoded copy inside components — everything reads from this file.
//
// A scalable grid of small project cards — things designed in Claude Design and
// shipped for real in Claude Code. Add more items to grow the grid.

export type FunItem = {
    id: string;
    title: string;
    blurb: string;
    tag: string; // Caveat handwritten sticker
    image: string;
    imageAlt: string;
    liveHref?: string; // external live URL (omit if none)
    liveLabel?: string;
    caseHref?: string; // internal case-study link (omit if none)
    caseLabel?: string;
    accent: string; // per-item accent hex
};

export type DoodleCopy = {
    sticker: string; // Caveat handwritten opener on the popover
    line: string;
    cta: string; // opens the Connect overlay
    dismissAria: string;
};

export const funWithClaudeData = {
    eyebrow: "Fun with Claude",
    heading: "I design and ship real products with AI.",
    highlight: "ship real products", // underlined by the Highlighter
    items: [
        {
            id: "unsaid",
            title: "unsaid",
            blurb:
                "An anonymous confessions app with two worlds: personal and professional. A live Next.js + Supabase app.",
            tag: "designed AND built, solo",
            image: "/work/unsaid-case study/home-dark.png",
            imageAlt: "The unsaid home screen in dark mode, showing the wordmark \"say the thing you've never said\" and a confession card.",
            liveHref: "https://unsaidnow.vercel.app",
            liveLabel: "see it live →",
            caseHref: "/case-study/unsaid",
            caseLabel: "case study →",
            accent: "#B06A48",
        },
    ] as FunItem[],
    // Hidden marker-doodle layer on the panel background: doodle enough and
    // this popover slides in.
    doodle: {
        sticker: "nice doodle",
        line: "You scribbled on my portfolio. Imagine what we'd make on purpose.",
        cta: "let's talk",
        dismissAria: "Dismiss",
    } as DoodleCopy,
};

export type FunWithClaudeData = typeof funWithClaudeData;
