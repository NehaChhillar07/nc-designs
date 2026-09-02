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

// A paragraph of the intro. `lead` is the opening clause that carries the
// point; it renders in full-strength text so the thesis is scannable without
// breaking the sentence into its own element.
export type IntroParagraph = {
    lead?: string;
    text: string;
};

export type DoodleCopy = {
    sticker: string; // Caveat handwritten opener on the popover
    line: string;
    cta: string; // opens the Connect overlay
    dismissAria: string;
};

export const funWithClaudeData = {
    eyebrow: "Experiments",
    heading: "I don't stop at the prototype link anymore.",
    highlight: "prototype link", // underlined by the Highlighter
    intro: [
        {
            lead: "AI does the effort. I keep the judgement.",
            text:
                "I design in Figma, then build the flow in Claude Code when it needs to be felt, not clicked through. If the prototype holds up, engineering starts from my code. Plenty gets thrown away, and that is the point.",
        },
    ] as IntroParagraph[],
    toolsLabel: "Tools, if you're counting:",
    tools: ["Figma", "Cursor", "Claude Code", "Claude Design"],
    // unsaid moved into the main Work list. New side projects land here;
    // while the list is empty the section shows `emptyLine` instead of a grid.
    items: [] as FunItem[],
    emptyLine: "More coming.",
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
