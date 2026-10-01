// ============================================
// Human Firewall Case Study Data
// All content is configurable — no hardcoded text in components
// ============================================

export const humanFirewallCaseStudyData = {
    // Hero Section
    hero: {
        // The before state. The homepage card carries the after ("Admins
        // stopped calling support..."), so the two read as a pair.
        // titleHighlight must be a substring of title.
        title: "Admins couldn’t launch, read, or act without support. The platform couldn’t tell them what to do next.",
        titleHighlight: "what to do next",
        subtitle: "Rebuilding a 10-year-old security platform into an AI-native one, as the only designer.",
        timeline: "2025 to Q1 2026",
        team: "Product, Eng, CS",
        role: "Product Designer",
        buildNoteLabel: "How it was built",
        buildNote:
            "Flows on this platform were ideated as working software in Claude Code before Figma became the single source of truth. Several modules shipped from that loop.",
        // Scroll-expansion opener — the dashboard grows from a small card to
        // near-fullscreen before the case study text begins
        scrollHero: {
            // The card's own eyebrow: the title says the product name, so the
            // eyebrow carries what the title doesn't (kind of work + client).
            // This is the only place the client is named up top.
            eyebrow: "Case study · InfoSec Ventures",
            title: "Human Firewall",
            date: "2025 to Q1 2026",
            hint: "Scroll to expand",
            media: "/work/1st-case study/hero-image.png",
            mediaAlt: "Human Risk Index dashboard: risk trend, phishing and training stats, and module overview",
            background: "/hero-gradient.avif",
        },
    },

    // Section 01 — The Starting Point
    startingPoint: {
        heading: "A 10-year-old platform.",
        headingSuffix: "Functional, not empowering.",
        body: [
            "Human Firewall 2.0 had been running for nearly a decade. It allowed security teams to run simulations, assign training, and view risk scores. It worked, but it reflected the era it was built in.",
            "Campaigns were historically executed. Analytics were static. Risk was displayed as a number. Workflows required frequent support involvement.",
            "The system was functional. It wasn\u2019t empowering. Modernizing without breaking trust became the real challenge.",
        ],
        legacy: {
            label: "HF 2: Legacy",
            items: [
                "Manual campaign creation",
                "Static reporting",
                "CS-dependent workflows",
                "Risk as a number",
            ],
        },
        needed: {
            label: "HF 3: What Was Needed",
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
        closing: "I used Gen AI tools (Cursor, Claude, ChatGPT) to rapidly explore flows and prototype campaign structures. AI accelerated exploration. Direction and constraints were always human-defined.",
        collaboration: "Engineering wanted to push AI content creation to a later MVP. Fair point: the fine-tuning for realistic phishing templates needed time we didn't have. But HF3 had to feel like it was doing the work from day one. So we split it: MVP1 shipped with a pre-made library while the AI flow was built in parallel. Writing that library by hand turned out to be the research. By MVP2, we knew exactly how the prompts should behave.",
    },

    // Section 03 — Low Compromise ≠ Low Risk
    compromiseInsight: {
        heading: "Low compromise didn\u2019t always mean",
        headingHighlight: "low risk",
        body: "In several campaigns, compromise appeared low, but open rates were low too. We weren\u2019t measuring vulnerability. We were measuring non-engagement.",
        improvements: {
            title: "To improve measurement accuracy, we introduced:",
            items: [
                { label: "Action-based delivery", desc: "emails triggered when users were active" },
                { label: "Needle phishing", desc: "AI-personalized content for realism" },
            ],
            footnote: "Open rates increased. Compromise increased. Not because risk worsened, but because it became visible.",
        },
    },

    // Behavioral Funnel Data
    // stages: strictly descending, each one a subset of the stage above it.
    // counterMetric: Reported is measured against all recipients, not against
    // Compromised, so it sits outside the funnel instead of below it.
    behavioralFunnel: {
        stages: [
            { label: "Sent", pct: 100, color: "hsl(220 10% 75%)" },
            { label: "Opened", pct: 78, color: "hsl(210 60% 65%)" },
            { label: "Clicked", pct: 45, color: "hsl(35 80% 60%)" },
            { label: "Compromised", pct: 25, color: "hsl(0 65% 58%)" },
        ],
        counterMetric: {
            label: "Reported",
            pct: 12,
            color: "hsl(140 50% 50%)",
            note: "Measured against all recipients, not a stage in the funnel.",
        },
        caption: "Illustrative funnel shape, not client data.",
    },

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
        rejectedVersions: {
            eyebrow: "What we tried before the radar",
            versions: [
                {
                    label: "V1",
                    title: "A weighted single number with hover to explain",
                    body: "The number got better. The trust did not. Admins still asked CS what it meant.",
                },
                {
                    label: "V2",
                    title: "A long horizontal bar split by contributing factor",
                    body: "Technically accurate. Admins read it left to right and stopped at the first factor.",
                },
                {
                    label: "V3",
                    title: "A radial gauge with severity zones",
                    body: "Looked decisive. But severity was the wrong frame. A user is not eighty percent risky. They are risky in a specific way.",
                },
            ],
            closingPullQuote: "The shift came when we stopped trying to summarize risk and started trying to describe it.",
        },
        pillars: [
            { label: "Behavior", desc: "Simulation response patterns" },
            { label: "Training", desc: "Compliance & completion" },
            { label: "Amplifier", desc: "Role sensitivity weight" },
        ],
        hierarchy: ["Organization", "Department", "Group", "User"],
        pullQuote: "Not a score: a structure.",
        customerQuote: {
            before: "“Understanding our security posture used to be a closed conversation between us and the security team. With vCRO, ",
            underlined: "every role can read it from their own view",
            after: ". The non security stakeholders finally understand where we stand.”",
            attribution: "CISO, mid sized enterprise customer. Paraphrased from migration feedback.",
        },
    },

    // Section 06 — Reporting Without Distortion
    reporting: {
        heading: "We chose not to soften truth, and not to",
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
        headingSuffix: ", not punishment",
        steps: ["Compromise", "Landing Page", "Flashcard Training"],
        body: [
            "A transparent landing page explained the simulation and highlighted missed cues, followed by a single action: Start Training.",
            "Flashcards became the core format. Each pack combined learning cards with quiz cards: short, interactive, immediate. No long LMS modules. No passive video fatigue.",
            "Training strictness was configurable. Compliance modules remained non-skippable by default. Awareness modules allowed flexibility.",
        ],
    },

    // Section 08 — Building HF3 While HF2 Lived
    migration: {
        heading: "Two systems. One customer base.",
        headingSuffix: "Zero room for confusion.",
        body: "HF 3 was not a replacement launched overnight. Migration had to feel justified, not forced.",
        quotes: [
            "\u201cI don\u2019t need to call CS for everything.\u201d",
            "\u201cI trust the system more.\u201d",
        ],
        quotesAttribution: "From customer calls during the HF3 beta.",
        closing: "HF 3 reduced dependency. It increased clarity. That difference, more than AI, drove adoption.",
    },

    // Section 09 — Confidence Replaced Dependency
    confidence: {
        heading: "The shift wasn\u2019t loud. It was",
        headingHighlight: "behavioral",
        metric: {
            primary: "48 percent increase in admin engagement after the HF3 rollout.",
            footnote: "Measured before and after across all 10 migrated clients.",
        },
        bodyParagraphs: [
            "The shift showed up across signals over the first six months of HF3, not in a single dashboard.",
            "CS tickets that used to come in before every campaign launch dropped to a trickle. Campaigns that took days to schedule started going out the same day. Admins began discovering features without asking, the role sensitivity settings, the gamification controls, the training strictness toggles.",
            "The numbers backed this up. Admin engagement went up 48 percent, measured before and after across all 10 migrated clients. Customer side report adoption rose 32 percent, measured via portal downloads across the same clients. And new feature and bug report escalations dropped roughly 20 percent on onboarded customers.",
            "Admins stopped needing reassurance before pressing launch. The platform stopped feeling like a tool they operated carefully. It became a system they trusted.",
        ],
        customerQuote: {
            text: "\u201cWe trust the system enough to launch without help. That is the win.\u201d",
            attribution: "Security operations lead, enterprise customer. Paraphrased from migration feedback.",
        },
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
