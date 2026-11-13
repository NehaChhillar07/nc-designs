// Flashcard Builder case study 2.0 (/case-study/flashcard-training).
//
// The story is not rewritten here: its claims, decisions, numbers and order
// are the live study's. The body copy is shortened (TRIM, approved by Neha);
// every other string comes from the live case study: data/flashcard-training-data.ts (imported, never retyped) plus the few
// strings that live inside components/case-study/flashcard-training-case-study.tsx
// and its interaction components (copied verbatim below, marked "from the
// component").
//
// New strings are staging only (labels, captions, notes built from the
// study's own facts). Wording changes are marked "SLIP n" and listed
// in SLIPS at the bottom. The live page is untouched by them.
// Design rules: design-system/neha-portfolio/pages/case-study-v2.md

import { flashcardTrainingCaseStudyData as fc } from "@/data/flashcard-training-data";
import type { Shot } from "@/data/v2-human-firewall-data";
import { SITE_URL } from "@/lib/site";

// The real learner cover card, with the client's logo blurred.
const CARDS = "/work/flashcard/hf-cards.png";

// The cards the decks deal. One shape for every deck on the page.
export type DeckCard =
    | { kind: "cover"; tag: string }
    // A card with nothing to flip: unsaid's confessions.
    | { kind: "note"; tag: string; mood: string; text: string; reaction: string }
    | { kind: "learn"; tag: string; front: string; back: string; image?: string; alt?: string; pack?: string }
    | {
          kind: "quiz";
          tag: string;
          question: string;
          options: ReadonlyArray<{ text: string; correct: boolean }>;
          explanation: string;
          image?: string;
          pack?: string;
      };

// SLIP 6: the body copy, shortened by Neha's approval (2026-10-31). Every
// claim, decision and number is kept; the live page keeps the long version.
const TRIM = {
    impact: "Training completion ~20% → ~80% · live on 10 enterprise clients, inside Human Firewall 3.",
    // SLIP 7: 01 names its two problems (learners, admins), and the old 02
    // ("What we were seeing") and 02 ("The shift") fold into it.
    startingPoint: [
        "Inside Human Firewall, every phishing simulation ends with training: a long video or text course. That training had two problems.",
        "Learners didn't finish it. Even after reminders, completion stayed low. The training felt forced.",
        "And admins couldn't make it. Customer Success and the graphics team built each course in a third-party tool, exported a SCORM package, and passed it from team to team before a client saw it.",
        "It reached the CTO as a recurring escalation across accounts. Client admins wanted to build training themselves, but had no tool to do it.",
    ],
    goal: "The goal: give clients the tool to build training themselves, let AI do the heavy content work, and free Customer Success for the security work that needs them.",
    formatQuestion: [
        "We looked at two ways to lift engagement: conversational training, where an AI teaches the topic, and swipe-based flashcards like Duolingo.",
        "I built the conversational version as a high-fidelity prototype in Claude Code and tested it with real users. Engagement didn't move. Clients couldn't relate to it the way they related to cards.",
        "So we sequenced them: flashcards first, because people connect with them immediately, and conversational kept on the roadmap for once flashcards prove out.",
    ],
    // SLIP 8: the old 04 ("I chose the format employees already knew") folds
    // into the format chapter as one sentence, softened from "every employee".
    afterDeck: "In testing, people were comfortable with cards right away. Most had used Duolingo or something like it, so the format got out of the way: a few minutes of swiping, learning and quiz cards mixed, instead of a long module.",
    backwardsFirst: [
        "I started with the end result, taking cues from Duolingo and other card apps, and spent the first two or three days getting the learner's swipe right.",
        "Then I hit the problem. Admins needed to edit cards inline, and the product needed to reuse them elsewhere. A polished card could do neither.",
        "So I went back to the base, built each component inside the card first, and rebuilt the preview on top. Building component-first is why engineering could later reuse the code as a module inside Human Firewall 3.",
    ],
    toolbarNote: "The AI drafts the structure (front, back, impact, do-this, key terms, compliance), and a toolbar refines it without starting over.",
    aiPrepares: [
        "The AI structures and drafts the cards, but nothing goes out until the admin reviews them, edits, and presses Push to Training Cards.",
    ],
    // SLIP 9: the old 08 ("Two different surfaces") folds into one sentence here.
    freedomInside: [
        "Everyone's taste differs, so the editor gives real control: long-press a component to drag it up or down, select text for a styling toolbar, or upload your own media.",
        "The limit explains itself. A line under the card says media takes space: 200 characters with it, 500 without. The tradeoff shows at the moment it matters, then it's the admin's call.",
        "The two sides look different on purpose: the creator side is light and dense, built like a tool; the learner side is dark and calm, one card at a time.",
    ],
    whereItIs: ["All ten use it regularly, enrolling users with content personalised by role, designation and level."],
    // SLIP 10: the reflection as the three lessons the story itself shows.
    lessons: [
        "Build the base before the polish.",
        "Test the ambitious idea cheaply, and be willing to shelve it.",
        "A working prototype is a better handoff than a spec.",
    ],
};

// SLIP 1: the tool is Claude Code, not Cursor.
const claudeCode = (s: string) => s.replace("Built in Cursor.", "Built in Claude Code.").replace("in Cursor with Claude", "in Claude Code");

export const fcV2 = {
    meta: {
        title: "Flashcard Builder · a case study by Neha Chhillar",
        description: fc.hero.subtitle,
        // Same story as the live page, so search engines are pointed there.
        canonical: `${SITE_URL}/case-study/flashcard-training`,
    },

    // Chapter labels are the live page's section labels (from the component).
    // Merged chapters carry both labels. `short` is for the chapter index only.
    chapters: [
        { id: "starting-point", n: "01", label: "The Starting Point", short: "Two problems" },
        { id: "format-question", n: "02", label: "The format question", short: "The format" },
        { id: "backwards", n: "03", label: "I built it backwards first", short: "Backwards first" },
        { id: "studio", n: "04", label: "How it works", short: "The studio" },
        { id: "freedom", n: "05", label: "Freedom inside the card", short: "Bounded freedom" },
        { id: "where-now", n: "06", label: "Where it is now", short: "Outcome" },
        { id: "take-from-it", n: "07", label: "What I take from it", short: "Reflection" },
        { id: "notes", n: "—", label: "Notes & methods", short: "Notes & methods" },
    ],
    railLabel: "chapters",

    hero: {
        eyebrow: fc.hero.meta,
        title: ["flashcard", "builder"],
        titleLabel: "Flashcard Builder",
        // "Built in Cursor. Engineering shipped the code." → SLIP 1.
        line: claudeCode(fc.hero.title),
        lineHighlight: "Engineering shipped the code.", // from the component (the highlighted half)
        subtitle: fc.hero.subtitle,
        facts: [
            { label: "timeline", value: fc.hero.timeline },
            { label: "team", value: fc.hero.team },
            { label: "role", value: fc.hero.role },
        ],
        impact: TRIM.impact,
        caption: "the cover of a live pack, as a learner sees it. client logo blurred",
    },

    // The cover print: the real cover card, cut out of the screenshot.
    cover: {
        src: CARDS,
        alt: "The real learner cover card for a pack called AI Threats in Cybersecurity, with the client's logo blurred",
        w: 2458,
        h: 1720,
        // The card's box inside the screenshot, in % of the image.
        crop: { x: 30.75, y: 15.1, w: 39, h: 67.4 },
        bar: "Learner cover card",
        stamp: "live product",
    },

    // ---------- 01: The Starting Point (two problems, then the goal) ----------
    startingPoint: {
        ...fc.startingPoint,
        body: TRIM.startingPoint,
        handoffLabel: "The handoff trail for one course", // from the component (aria-label)
        passCard: "one course",
        hopLabel: "handoff",
        passAgain: "pass it again",
        // The old chapter 02's heading closes this chapter, with the goal.
        shift: { ...fc.theShift, goal: TRIM.goal },
    },

    // ---------- 02: The format question, then the hands-on deck ----------
    formatQuestion: {
        ...fc.formatQuestion,
        body: TRIM.formatQuestion, // SLIP 1 + 6
        afterDeck: TRIM.afterDeck,
        roadmapNote: "roadmap",
    },

    // The deck itself (from the old chapter 04).
    whyFlashcards: {
        ...fc.whyFlashcards,
        tryLabel: "give it a try",
        // The cover is the hero print already, so the deck starts on a card.
        deck: [
            ...fc.whyFlashcards.cards.map(
                (c): DeckCard =>
                    c.type === "quiz"
                        ? { kind: "quiz", tag: "Quiz", question: c.question, options: c.options, explanation: c.explanation, image: c.image, pack: c.packLabel }
                        : { kind: "learn", tag: "Learning", front: c.front, back: c.back, image: c.image, alt: "", pack: c.packLabel },
            ),
        ] satisfies DeckCard[],
        deckLabel: "Data Privacy Essentials, a sample flashcard pack",
        complete: "pack complete",
        restart: "start again",
        controls: { prev: "Previous card", next: "Next card", flip: "Flip card" },
        keys: "← → to move · space to flip",
        transcript: "read the pack as text",
        slowMo: "0.5× speed",
    },

    // ---------- 03: I built it backwards first ----------
    backwardsFirst: {
        ...fc.backwardsFirst,
        body: TRIM.backwardsFirst,
        locked: "locked",
        layers: fc.freedomInside.components,
        sample: (() => {
            const c = fc.whyFlashcards.cards[0];
            return c.type === "learning" ? { title: c.front, body: c.back, image: c.image } : { title: "", body: "", image: "" };
        })(),
        mediaSlot: "Media slot", // from the component
    },

    // ---------- 04: How it works + AI prepares ----------
    howItWorks: {
        ...fc.howItWorks,
        toolbarLabel: "Iteration toolbar", // from the component
        toolbarNote: TRIM.toolbarNote,
        // The toolbar's actions (from the live toolbarNote), shown in the toolbar mock.
        toolbarTools: ["add modules", "include real-world scenarios", "focus on specific regulations", "create media", "push to training cards"],
        pickLabel: "three ways in",
    },
    aiPrepares: {
        ...fc.aiPrepares,
        body: TRIM.aiPrepares,
        // from the component
        draftStatus: "Draft training: ready, not shipped",
        doneStatus: "Published: saved to your library",
        reset: "Reset",
        libraryLabel: "your library",
        // What gets dealt into the library: the sample pack's cards.
        dealt: fc.whyFlashcards.cards.map((c) => (c.type === "quiz" ? c.question : c.front)),
    },

    // ---------- 05: Freedom inside the card (absorbs Two different surfaces) ----------
    freedomInside: {
        ...fc.freedomInside,
        body: TRIM.freedomInside,
        // from the component
        editorLabel: "Inline card editor",
        removeMedia: "Remove media",
        addMedia: "Add media",
        mediaSlot: "Media slot",
        tryLabel: "Try it",
        tryDrag: "Drag a component to reorder. Toggle media to see the limit drop from 500 to 200.",
        tryButtons: "Use the up/down buttons to reorder. Toggle media to see the character limit drop from 500 to 200.",
        overBy: (n: number) => `Over the limit by ${n} chars. Remove media or trim text.`,
        starter: {
            title: "Data Privacy isn't paperwork.",
            body: "It's the difference between trust and a public incident. Most breaches start with a small choice.",
        },
    },

    // ---------- 06: Where it is now ----------
    whereItIs: {
        ...fc.whereItIs,
        body: TRIM.whereItIs,
        crossLinkHref: "/case-study/human-firewall",
        outcome: {
            prefix: "~",
            value: 80,
            suffix: "%",
            from: "~20%",
            label: "training completion",
            source: "share of assigned learners who finished, across live clients · method and limits in notes",
        },
        // The admin-side number for the thesis. Waiting on Neha; renders when set.
        adminMetric: null as null | { value: string; label: string; source: string },
    },

    // ---------- 07: What I take from it ----------
    takeFromIt: { ...fc.takeFromIt, lessons: TRIM.lessons },

    // Gathered from the study's own facts and captions. Nothing new is claimed.
    notes: {
        heading: "Notes & methods",
        items: [
            "Training completion (~20% → ~80%) is the share of assigned learners who finished: the old long video and text courses against flashcard packs, measured across the live clients. Packs are also shorter than the old courses, so the lift reflects format and length together.",
            "The cover card is a screen from the live product, with the client's logo blurred. The card photos are stock, the deck, studio and editor on this page are rebuilt for reading, and client names are withheld.",
            `How it was built: ${fc.buildNote}`,
        ],
    },

    next: {
        label: "next case study",
        title: "eCrime Hub",
        line: "1.42 million visitors in its first year, for dubai police. every report click alerts a security team",
        href: "/case-study/ecrime-hub",
        shot: { src: "/work/ecrime-hub/hero-poster.jpg", alt: "", w: 1600, h: 852, bar: "ecrime hub" } satisfies Shot,
    },
};

// Every wording change from the live page, for review.
export const SLIPS = [
    "Hero · “Built in Cursor.” → “Built in Claude Code.”",
    "02 · “in Cursor with Claude” → “in Claude Code”.",
    "06 · Outcome added: training completion ~20% → ~80%, with its source line.",
    "Opener · Impact line under the subtitle; build note and tags moved off the first screen (the build note is in notes).",
    "All chapters · Body copy shortened (approved 2026-10-31), claims and numbers unchanged: see TRIM.",
    "01 · Names its two problems; absorbs “What we were seeing” (CTO sentence kept) and “The shift” (heading + goal). Flip card, pull quotes and “not just a hunch” heading removed.",
    "02 · Absorbs the old 04 as one sentence, softened from “every employee” to “most”.",
    "04 · Automation/Authority split, draft note, footnote and “The AI isn't the product” pull quote removed.",
    "05 · Absorbs “Two different surfaces” as one sentence; the guidance note and “three components” sentence removed.",
    "06 · Client cards and “started as its own product” sentence removed.",
    "07 · Reflection rewritten as three lessons drawn from the story.",
    "Removed: hero deck, pop quizzes, craft sheet. Notes cut to three items, with the metric's limit stated.",
];
