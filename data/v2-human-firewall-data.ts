// Human Firewall case study 2.0 (/v2/case-study/human-firewall).
//
// The story is NOT rewritten here. Every string comes from the live case
// study: data/human-firewall-data.ts (imported, never retyped) plus the few
// strings that live inside components/case-study/human-firewall-case-study.tsx
// (copied verbatim below, marked "from the component").
//
// The only edits are the approved slips, each marked "SLIP n" and listed in
// SLIPS at the bottom. The live page is untouched by them.
// Design rules: design-system/neha-portfolio/pages/case-study-v2.md

import { humanFirewallCaseStudyData as hf } from "@/data/human-firewall-data";
import { SITE_URL } from "@/lib/site";

const IMG = "/work/1st-case study";
// The flashcard cover with the client's logo blurred.
const CARDS = "/work/flashcard/hf-cards.png";

export type Shot = { src: string; alt: string; w: number; h: number; bar: string; stamp?: string };

const PROTOTYPE = "Claude Code prototype"; // from the component

export const hfV2 = {
    meta: {
        title: "Human Firewall · a case study by Neha Chhillar",
        description:
            "Rebuilding a 10-year-old security platform into an AI-native one, as the only designer.",
        // Same story as the live page, so search engines are pointed there.
        canonical: `${SITE_URL}/case-study/human-firewall`,
    },

    // Chapter labels are the live page's section labels (from the component).
    // `short` is for the chapter index only; headings on the page are unchanged.
    chapters: [
        { id: "starting-point", n: "01", label: "The Starting Point" , short: "Starting point" },
        { id: "ai-shift", n: "02", label: "The AI Shift" , short: "Retrofit vs rebuild" },
        { id: "low-compromise", n: "03", label: "Low Compromise ≠ Low Risk" , short: "Low compromise ≠ low risk" },
        { id: "ai-launch", n: "04", label: "AI Could Launch. We Said No." , short: "We said no" },
        { id: "risk-score", n: "05", label: "Risk Score Redesign" , short: "Risk score" },
        { id: "reporting", n: "06", label: "Reporting Without Distortion" , short: "No distortion" },
        { id: "micro-learning", n: "07", label: "Compromise → Micro-Learning" , short: "Micro-learning" },
        { id: "migration", n: "08", label: "Building HF3 While HF2 Lived" , short: "Migration" },
        { id: "confidence", n: "09", label: "Confidence Replaced Dependency" , short: "Outcome" },
        { id: "reflection", n: "10", label: "What This Project Changed in Me" , short: "Reflection" },
        { id: "notes", n: "—", label: "Notes & methods" , short: "Notes & methods" },
    ],
    railLabel: "chapters",

    hero: {
        eyebrow: hf.hero.scrollHero.eyebrow,
        title: ["human", "firewall"],
        titleLabel: hf.hero.scrollHero.title,
        problem: hf.hero.title,
        problemHighlight: hf.hero.titleHighlight,
        subtitle: hf.hero.subtitle,
        facts: [
            { label: "timeline", value: hf.hero.timeline },
            { label: "team", value: hf.hero.team },
            { label: "role", value: hf.hero.role },
        ],
        buildNoteLabel: hf.hero.buildNoteLabel,
        buildNote: hf.hero.buildNote,
        shot: {
            src: hf.hero.scrollHero.media,
            alt: hf.hero.scrollHero.mediaAlt,
            w: 3246,
            h: 1830,
            bar: "Human Risk Index",
        } satisfies Shot,
    },

    startingPoint: {
        ...hf.startingPoint,
        // SLIP 1: "historically executed" → "manually executed".
        body: hf.startingPoint.body.map((p) => p.replace("historically executed", "manually executed")),
    },

    aiShift: {
        ...hf.aiShift,
        heading: { a: "Retrofit", vs: " vs. ", b: "Rebuild" }, // from the component
        collaborationLabel: "Working with Engineering", // from the component
        shot: {
            src: `${IMG}/ai-campaign-generation.png`,
            alt: "HF 3 campaign creation: AI generating 2,157 personalized templates with per-department progress",
            w: 2870,
            h: 1708,
            bar: "HF 3: AI-Assisted Campaign Creation",
            stamp: PROTOTYPE,
        } satisfies Shot,
    },

    compromise: {
        ...hf.compromiseInsight,
        funnel: {
            // The reader flips between the two. "after" is the live page's
            // funnel; "before" is an illustrative shape for the state the story
            // describes ("compromise appeared low, but open rates were low too").
            // Both are labelled illustrative, as the live caption already says.
            before: [
                { label: "Sent", pct: 100 },
                { label: "Opened", pct: 31 },
                { label: "Clicked", pct: 14 },
                { label: "Compromised", pct: 6 },
            ],
            after: hf.behavioralFunnel.stages.map(({ label, pct }) => ({ label, pct })),
            reportedBefore: 5,
            counter: hf.behavioralFunnel.counterMetric,
            caption: hf.behavioralFunnel.caption,
            toggle: {
                label: "delivery",
                before: "send to everyone",
                after: "action-based delivery",
                hint: "flip it",
            },
        },
        shot: {
            src: `${IMG}/action-based-delivery.jpeg`,
            alt: "Action-Based Delivery Logic",
            w: 2720,
            h: 824,
            bar: "Action-Based Delivery Logic",
        } satisfies Shot,
    },

    aiLaunch: {
        ...hf.aiLaunch,
        // from the component
        split: [
            { k: "Automation", v: "AI prepares" },
            { k: "Authority", v: "Admins approve" },
        ],
        shot: {
            src: `${IMG}/targeted-campaign-plan.png`,
            alt: "HF 3 targeted campaign: per-person attack plan with AI-chosen angles, difficulty levels, and the reasoning behind each one",
            w: 2844,
            h: 1798,
            bar: "HF 3: Targeted campaign · one email per person",
            stamp: PROTOTYPE,
        } satisfies Shot,
    },

    riskScore: {
        ...hf.riskScore,
        rejectedStamp: "rejected",
        // SLIP 3: radar labels use the pillar wording, so the two never disagree.
        radar: hf.riskScore.pillars.map((p, i) => ({ ...p, value: [82, 48, 65][i] })), // values from the component
        radarCaption: "One user, described across the three factors. Illustrative values, not client data.", // from the component
        radarAria: "Radar figure of the three risk factors: Behavior 82, Training 48, Amplifier 65 for a sample user",
        hierarchyLabel: "Hierarchy breakdown", // from the component
        shot: {
            src: `${IMG}/vcro.jpeg`,
            alt: "vCRO: risk categories and per-user risk view",
            w: 2852,
            h: 1918,
            bar: "vCRO: Risk categories & per-user view",
        } satisfies Shot,
    },

    // SLIP 4: the "Compromised / Reported" legend is dropped (no chart here).
    reporting: {
        ...hf.reporting,
        shot: {
            src: `${IMG}/gamification.jpeg`,
            alt: "Gamification Dashboard: Points & Badges",
            w: 2846,
            h: 1766,
            bar: "Gamification Dashboard: Points & Badges",
        } satisfies Shot,
    },

    microLearning: {
        ...hf.microLearning,
        shots: [
            {
                src: `${IMG}/phishing-email-gmail.png`,
                alt: "Simulated phishing email in Gmail: Apple Vision Pro Enterprise Beta lure",
                w: 1999,
                h: 1006,
                bar: "Compromise",
            },
            {
                src: `${IMG}/simulation-reveal.jpg`,
                alt: "HumanFirewall reveal page shown after clicking, “Oops! Apple wasn't real” with the warning signs breakdown",
                w: 1999,
                h: 982,
                bar: "Landing Page",
            },
            {
                src: CARDS,
                alt: "HF 3: Flashcard Training cover card preview",
                w: 2458,
                h: 1720,
                bar: "Flashcard Training",
            },
        ] satisfies Shot[],
        link: { text: "See how the training builder was designed", href: "/case-study/flashcard-training" }, // from the component
    },

    migration: {
        ...hf.migration,
        // from the component
        before: {
            note: "7 tabs, manual setup, CS-dependent",
            shot: {
                src: `${IMG}/hf2-legacy-campaign-scenarios.jpeg`,
                alt: "HF 2: Legacy campaign creation with 7-tab manual workflow",
                w: 3354,
                h: 1928,
                bar: "HF 2: Legacy",
            } satisfies Shot,
        },
        after: {
            note: "AI-assisted, self-serve, clean structure",
            shot: {
                src: `${IMG}/campaign-wizard-4-questions.png`,
                alt: "HF 3 Redesigned campaign creation: answer 4 questions (What, Who, Then, When) wizard",
                w: 1999,
                h: 1078,
                bar: "HF 3: Redesigned",
                stamp: PROTOTYPE,
            } satisfies Shot,
        },
    },

    confidence: {
        ...hf.confidence,
        // SLIP 2: paragraph 3 repeated the 48% sentence that the metric card
        // already carries. The paragraph keeps its other two numbers.
        bodyParagraphs: hf.confidence.bodyParagraphs.map((p) =>
            p.replace(" Admin engagement went up 48 percent, measured before and after across all 10 migrated clients.", ""),
        ),
        // The three numbers the story states, set as figures.
        stats: [
            { prefix: "+", value: 48, suffix: "%", label: "admin engagement", note: "before and after, all 10 migrated clients" },
            { prefix: "+", value: 32, suffix: "%", label: "customer side report adoption", note: "portal downloads, same clients" },
            { prefix: "−", value: 20, suffix: "%", label: "feature and bug escalations", note: "roughly, on onboarded customers" },
        ],
    },

    reflection: hf.reflection,

    // Gathered from the story's own captions and footnotes. Nothing new is claimed.
    notes: {
        heading: "Notes & methods",
        items: [
            "Admin engagement (+48%) was measured before and after across all 10 migrated clients.",
            "Customer side report adoption (+32%) was measured via portal downloads across the same clients.",
            "New feature and bug report escalations dropped roughly 20 percent on onboarded customers.",
            "The funnel and the risk radar are illustrative shapes, not client data.",
            "Customer quotes are paraphrased from migration feedback and from customer calls during the HF3 beta.",
            `Screens marked “${PROTOTYPE}” come from the loop described above: ${hf.hero.buildNote}`,
        ],
    },

    next: {
        label: "next case study",
        title: "Flashcard Builder",
        line: "training engagement from 20% to 80%. engineering built on my prototype",
        href: "/case-study/flashcard-training",
        shot: { src: CARDS, alt: "", w: 2458, h: 1720, bar: "flashcard builder" } satisfies Shot,
    },
};

// Every wording change from the live page, for review.
export const SLIPS = [
    "01 · “Campaigns were historically executed.” → “Campaigns were manually executed.”",
    "09 · The 48% sentence in paragraph 3 removed: the metric card above already states it.",
    "05 · Radar labels now use the pillar wording (e.g. “Simulation response patterns”).",
    "06 · The “Compromised / Reported” legend removed: it had no chart attached.",
];
