// ============================================
// Human Firewall Case Study Data
// All content is configurable — no hardcoded text in components
// ============================================

export const humanFirewallCaseStudyData = {
    // Hero Section
    hero: {
        meta: "Human Firewall — InfoSec Ventures",
        title: "Evolving a legacy security platform into an AI-native risk intelligence system",
        tags: "Enterprise SaaS · Cybersecurity · AI-Assisted Design",
        timeline: "2024 — Present",
        team: "Product, Eng, CS",
        role: "Product Designer",
    },

    // Section 01 — The Starting Point
    startingPoint: {
        heading: "A 10-year-old platform.",
        headingSuffix: "Functional, not empowering.",
        body: [
            "Human Firewall 2.0 had been running for nearly a decade. It allowed security teams to run simulations, assign training, and view risk scores. It worked — but it reflected the era it was built in.",
            "Campaigns were historically executed. Analytics were static. Risk was displayed as a number. Workflows required frequent support involvement.",
            "The system was functional. It wasn\u2019t empowering. Modernizing without breaking trust became the real challenge.",
        ],
        legacy: {
            label: "HF 2 — Legacy",
            items: [
                "Manual campaign creation",
                "Static reporting",
                "CS-dependent workflows",
                "Risk as a number",
            ],
        },
        needed: {
            label: "HF 3 — What Was Needed",
            items: [
                "AI-assisted creation",
                "Behavioral intelligence",
                "Self-serve confidence",
                "Risk as a structure",
            ],
        },
    },

    // Section 02 — The AI Shift
    aiShift: {
        body: [
            "HF 2.0 was built in a pre-AI era. Campaign creation was manual, content required effort, reporting was static. Meanwhile, competitors were adopting AI-driven workflows.",
            "We had two options:",
        ],
        optionA: {
            label: "Option A",
            title: "Add AI to a 10-year-old system",
            desc: "Modernize the surface. Not the foundation.",
        },
        optionB: {
            label: "Option B \u2713",
            title: "Build entirely new",
            desc: "Design around AI, not on top of it.",
        },
        closing: "I used Gen AI tools (Cursor, Claude, ChatGPT) to rapidly explore flows and prototype campaign structures. AI accelerated exploration — direction and constraints were always human-defined.",
    },

    // Section 03 — Low Compromise ≠ Low Risk
    compromiseInsight: {
        heading: "Low compromise didn\u2019t always mean",
        headingHighlight: "low risk",
        body: "In several campaigns, compromise appeared low — but open rates were low too. We weren\u2019t measuring vulnerability — we were measuring non-engagement.",
        improvements: {
            title: "To improve measurement accuracy, we introduced:",
            items: [
                { label: "Action-based delivery", desc: "emails triggered when users were active" },
                { label: "Needle phishing", desc: "AI-personalized content for realism" },
            ],
            footnote: "Open rates increased. Compromise increased. Not because risk worsened — but because it became visible.",
        },
    },

    // Behavioral Funnel Data
    behavioralFunnel: [
        { label: "Sent", pct: 100, color: "hsl(220 10% 75%)" },
        { label: "Opened", pct: 72, color: "hsl(210 60% 65%)" },
        { label: "Clicked", pct: 38, color: "hsl(35 80% 60%)" },
        { label: "Compromised", pct: 12, color: "hsl(0 65% 58%)" },
        { label: "Reported", pct: 24, color: "hsl(140 50% 50%)" },
    ],

    // Section 04 — AI Could Launch. We Said No.
    aiLaunch: {
        heading: "Sending a campaign to 10,000 employees is not a background action.",
        headingSuffix: "It is an organizational event.",
        pullQuote: "Automation reduces effort. Authority stays human.",
    },

    // Section 05 — Risk Score Redesign
    riskScore: {
        heading: "A risk score without context is just",
        headingHighlight: "anxiety",
        body: "HF 2 showed risk as a number. But a number without explanation creates uncertainty. Admins couldn\u2019t see why risk increased, which factor contributed most, or where to intervene.",
        pillars: [
            { label: "Behavior", desc: "Simulation response patterns" },
            { label: "Training", desc: "Compliance & completion" },
            { label: "Amplifier", desc: "Role sensitivity weight" },
        ],
        hierarchy: ["Organization", "Department", "Group", "User"],
        pullQuote: "Not a score — a structure.",
    },

    // Section 06 — Reporting Without Distortion
    reporting: {
        heading: "We chose not to soften truth — and not to",
        headingHighlight: "dramatize",
        headingSuffix: "it either.",
        body: [
            "No ranking of failures. No public exposure of compromised users.",
            "Gamification rewarded positive behavior: reporting phishing, completing training, improving over time.",
        ],
        pullQuote: "Failure stayed private. Improvement became visible.",
    },

    // Section 07 — Compromise → Micro-Learning
    microLearning: {
        heading: "Compromise became",
        headingHighlight: "intervention",
        headingSuffix: "— not punishment",
        steps: ["Compromise", "Landing Page", "Flashcard Training"],
        body: [
            "A transparent landing page explained the simulation and highlighted missed cues — followed by a single action: Start Training.",
            "Flashcards became the core format. Each pack combined learning cards with quiz cards — short, interactive, immediate. No long LMS modules. No passive video fatigue.",
            "Training strictness was configurable. Compliance modules remained non-skippable by default. Awareness modules allowed flexibility.",
        ],
    },

    // Section 08 — Building HF3 While HF2 Lived
    migration: {
        heading: "Two systems. One customer base.",
        headingSuffix: "Zero room for confusion.",
        body: "HF 3 was not a replacement launched overnight. Migration had to feel justified — not forced.",
        quotes: [
            "\u201cI don\u2019t need to call CS for everything.\u201d",
            "\u201cI trust the system more.\u201d",
        ],
        closing: "HF 3 reduced dependency. It increased clarity. That difference — more than AI — drove adoption.",
    },

    // Section 09 — Confidence Replaced Dependency
    confidence: {
        heading: "The shift wasn\u2019t loud — it was",
        headingHighlight: "behavioral",
        outcomes: [
            "Fewer CS escalations",
            "Smoother campaign launches",
            "More feature exploration",
            "Higher training enrollment",
        ],
        closing: "Admins didn\u2019t need reassurance before pressing launch. They understood what they were doing. The platform stopped feeling like a tool they operated carefully. It became a system they trusted.",
    },

    // Section 10 — Personal Reflection
    reflection: {
        heading: "I moved from designing interfaces to",
        headingHighlight: "defining boundaries",
        lessons: [
            "Where AI should act.",
            "Where humans must decide.",
            "How risk should be shown.",
            "How failure should be handled.",
        ],
        closing: "In the AI era, execution is accelerated. Judgment is not.",
        statement: [
            "Clarity builds trust.",
            "Trust creates autonomy.",
            "Autonomy scales products.",
        ],
    },
};
