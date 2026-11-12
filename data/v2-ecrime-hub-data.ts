// eCrime Hub case study 2.0 (/v2/case-study/ecrime-hub).
//
// The story is not rewritten here: its claims, decisions and order are the
// live study's (data/ecrime-hub-data.ts, imported, never retyped, plus the
// strings that live inside components/case-study/ecrime-hub-case-study.tsx,
// marked "from the component"). The body copy is edited down so each claim
// is made once (TRIM); every wording change is listed in SLIPS.
// Decisions (2026-11-03/05): cybersecurity SaaS work, delivered through Human
// Firewall for its client Dubai Police; Dubai Police named with its logos;
// photos of identifiable people left out or cropped.
// Design rules: design-system/neha-portfolio/pages/case-study-v2.md

import { eCrimeHubCaseStudyData as ec } from "@/data/ecrime-hub-data";
import type { Figure } from "@/components/v2-case-study/outcome";
import type { Shot } from "@/data/v2-human-firewall-data";
import { SITE_URL } from "@/lib/site";

const LIVE = "/work/2nd-case study";
// v2 crops, stills and the blurred recording (made from the live assets).
const V2 = "/work/ecrime-hub";

// The edited copy, in one place, for review against the live page.
const TRIM = {
    line: "A public cybersecurity website that helps citizens report cybercrime and understand digital risks.",
    impact: "Launched with Dubai Police on 12 July 2025 · 1.42 million visitors in its first year · 40+ pages from three templates, in Arabic and English.",
    why: [
        "Cyberattacks were rising fast. In May 2025 the UAE's head of cyber security put them at an average of 200,000 a day.",
        "That worried Dubai Police enough to bring in a cybersecurity team, Human Firewall, to build one public site for awareness and for reporting.",
        "It's for everyone in Dubai: businesses and corporate teams, families, kids and grandparents. Anyone can learn about a risk, or report something suspicious online, on a phone or on any device.",
        "Dubai Police's first reference was Australia's national cybersecurity website. We pushed back: the audiences, cultural context and threat landscape were different.",
    ],
    whyAfter: "The team responded well once they saw their identity reflected in a format that felt distinctly theirs.",
    report: [
        "Dubai Police asked for every report to be filed in their own form, on their official website. So Report, in the header of every page, takes the citizen straight there.",
        "A plain link out would have ended there: the citizen leaves, and nobody on our side knows. So we added the one thing we could control. Every click on Report also sends a nudge to Human Firewall's cybersecurity team, so they can act on it.",
    ],
    system: [
        "Cybersecurity content was structured into clear, scannable topics, so non-technical users could understand complex risks.",
        "The homepage sets trust and orientation. Topic pages share one layout to introduce each area, and content pages inherit the same logic, so a new page never needed a new design.",
        "Arabic and English parity was non-negotiable: every page and flow works identically in both, so layouts leave room for 30% text expansion without breaking the hierarchy.",
    ],
    assistant: [
        "A chatbot with a Dubai Police officer mascot answers questions about cybersecurity risks. Its topics and guardrails were defined through structured prompting rules, so it stays within approved education topics.",
    ],
    launch: [
        "The platform launched publicly as part of Dubai Police's cybersecurity awareness work, with campaigns across public spaces in Dubai.",
        "Billboards and screens carried a QR code straight to the platform. The site map had planned that door: campaign and QR visits are one of its four entry points.",
        "Monthly quizzes, public education initiatives and school programs followed.",
    ],
    lessons: [
        "When the client owns a step, design around it. The report form wasn't ours, so the click became the signal.",
        "Design the template, not the page. Three layouts carried every page through a tight timeline.",
        "Plan the offline door. The QR entry was part of the site map.",
    ],
};

export const ecV2 = {
    meta: {
        title: "eCrime Hub · a case study by Neha Chhillar",
        description: TRIM.line,
        // Same story as the live page, so search engines are pointed there.
        canonical: `${SITE_URL}/case-study/ecrime-hub`,
    },

    chapters: [
        { id: "why", n: "01", label: "Why this existed", short: "Why it existed" },
        { id: "report", n: "02", label: "Reporting-first experience", short: "Report, don't rebuild" },
        { id: "system", n: "03", label: "Visual system", short: "Three templates" },
        { id: "assistant", n: "04", label: "AI-powered cyber assistant", short: "The assistant" },
        { id: "launch", n: "05", label: "Public launch", short: "Launch" },
        { id: "learnings", n: "06", label: "Learnings", short: "Learnings" },
        { id: "notes", n: "—", label: "Notes & methods", short: "Notes & methods" },
    ],
    railLabel: "chapters",

    hero: {
        // SLIP 1: "Case study · Dubai Police" → the delivery frame.
        eyebrow: "Human Firewall · client: Dubai Police",
        title: ["ecrime", "hub"],
        titleLabel: ec.hero.scrollHero.title,
        line: TRIM.line, // SLIP 2: "designed to help … at a national scale" shortened
        lineHighlight: "report cybercrime",
        impact: TRIM.impact,
        facts: [
            // from the component
            // SLIP: the live page said Sep–Nov 2025; the launch was 12 July 2025 (Emirates 24|7).
            { label: "timeline", value: "2025 · launched 12 July" },
            { label: "team", value: "Dubai Police executives, 2 engineers, a PM" },
            // SLIP 3: the role names its parts (from role.highlights)
            { label: "role", value: "Product designer: information architecture, core flows, visual direction" },
        ],
        shot: {
            src: `${V2}/hero-poster.jpg`,
            video: `${LIVE}/hero.mp4`,
            alt: "The eCrime Hub homepage: the Dubai skyline under the site header, with Report in the top right",
            w: 1600,
            h: 852,
            bar: "ecrimehub.gov.ae · homepage",
            stamp: "live site",
        } satisfies Shot,
    },

    // ---------- 01 ----------
    why: {
        heading: "Dubai Police needed one trusted place to report cybercrime and learn the risks.",
        headingSuffix: "Not a copy of another country's site.",
        body: TRIM.why,
        decision: {
            rejected: [{ title: "Replicate Australia's national cybersecurity site", desc: "A proven model, built for a different audience, culture and threat landscape." }],
            chosen: {
                title: "Dubai Police's own identity",
                desc: "Its visual identity and government design language, with a modern, approachable tone that made cybersecurity feel new and relevant to the public.",
            },
        },
        after: TRIM.whyAfter,
        constraintsLabel: "working inside",
        // from constraints.items and role.body, said once each
        constraints: [
            "Government-grade compliance and branding rules",
            "Dubai Police brand, security and accessibility guidelines",
            "Highly sensitive, data-heavy content",
            "An accelerated delivery timeline",
        ],
    },

    // ---------- 02: the hands-on moment ----------
    report: {
        heading: "Reports are filed on Dubai Police's own form.",
        headingSuffix: "And every Report click alerts a security team.",
        body: TRIM.report,
        switchLabel: "what a Report click does",
        // The first option is the starting state.
        options: {
            link: {
                label: "a plain link out",
                good: false,
                lanes: [
                    {
                        id: "citizen",
                        label: "the citizen",
                        steps: [
                            { label: "Citizen", sub: "something looks wrong" },
                            { label: "eCrime Hub", sub: "Report, in every header" },
                            { label: "Dubai Police's official form", tone: "oxblood" as const },
                        ],
                    },
                    {
                        id: "team",
                        label: "the security team",
                        steps: [{ label: "Report clicked" }, { label: "No one hears about it", tone: "broken" as const }],
                    },
                ],
                results: ["The citizen reaches the official form.", "The security team never hears about it."],
            },
            nudge: {
                label: "link out + a nudge",
                good: true,
                lanes: [
                    {
                        id: "citizen",
                        label: "the citizen",
                        steps: [
                            { label: "Citizen", sub: "something looks wrong" },
                            { label: "eCrime Hub", sub: "Report, in every header" },
                            { label: "Dubai Police's official form", tone: "oxblood" as const },
                        ],
                    },
                    {
                        id: "team",
                        label: "the security team",
                        steps: [{ label: "Report clicked" }, { label: "Nudge to Human Firewall's cybersecurity team", tone: "oxblood" as const }, { label: "The team can act" }],
                    },
                ],
                results: ["The citizen reaches the official form.", "The security team is nudged at the same moment."],
            },
        },
        menuShot: {
            src: `${V2}/report-menu.jpg`,
            alt: "The Report and Recover menu, opening on Report a cybercrime (eCrime.ae), then recovery steps, guidance for residents and tourists, and contacts",
            w: 1600,
            h: 852,
            bar: "Report and Recover menu · live site",
        } satisfies Shot,
    },

    // ---------- 03 ----------
    system: {
        heading: "Three templates carry every page.",
        headingSuffix: "So the content could scale without redesign.",
        body: TRIM.system,
        mapLabel: "the site map, by template",
        templates: [
            { id: "home", label: "Homepage template" },
            { id: "topic", label: "Topic template" },
            { id: "content", label: "Content template" },
        ],
        // Redrawn from the project's information architecture (IA.png).
        map: {
            entries: ["Homepage", "Campaign / QR entry", "Direct topic entry", "Direct report entry"],
            sections: [
                { title: "Get the Basics Right", pages: ["Reporting basics", "Recognise phishing", "Think before clicking", "Password hygiene", "Multi-factor authentication"] },
                { title: "Protect", pages: ["Device security", "Safe browsing & mobile use", "Account protection (MFA, OTP)", "Backups & device hygiene"] },
                { title: "Threats", pages: ["Phishing", "Smishing (SMS phishing)", "Vishing (voice phishing)", "Quishing (QR phishing)", "Malware"] },
                { title: "Scams", pages: ["Job scams", "Banking & OTP scams", "Delivery & e-commerce scams", "Romance scams"] },
                { title: "Report & Recover", pages: ["Report a cybercrime", "What to do if scammed", "Recovery steps", "Guidance for residents, tourists, businesses, government staff"] },
            ],
            layers: ["AI cyber assistant, on every page", "Language switch", "Accessibility support"],
        },
        contentShot: {
            src: `${V2}/content-page.png`,
            alt: "A content page, Report it: Save yourself, and everyone else, with who it is for (individuals, seniors, tourists) and its reading level (beginner)",
            w: 2297,
            h: 1432,
            bar: "Content template · live site",
        } satisfies Shot,
        contentNote: "Every content page says who it's for and its reading level.",
        illustrationShot: {
            src: `${V2}/illustrations.png`,
            alt: "The illustration set, grouped by section: Report and Recover, Scams, Threats, Protect",
            w: 2297,
            h: 1432,
            bar: ec.visualSystem.images[2].annotation,
        } satisfies Shot,
    },

    // ---------- 04 ----------
    assistant: {
        heading: "The assistant answers inside approved topics.",
        body: TRIM.assistant,
        shot: {
            src: `${V2}/bot-poster.jpg`,
            video: `${V2}/bot.mp4`,
            alt: "The assistant, Lamya, explaining why an uploaded image looks AI-generated, on ecrimehub.gov.ae",
            w: 832,
            h: 480,
            bar: "The cyber assistant · live site",
        } satisfies Shot,
    },

    // ---------- 05 ----------
    launch: {
        heading: "Launched in public, with a QR code back to the site.",
        body: TRIM.launch,
        backdrop: {
            src: `${V2}/launch-backdrop.jpg`,
            alt: "The launch backdrop: Press Conference Marking Cybersecurity Awareness Month, with eCrime Hub's Report it, Secure it, Spot it",
            w: 1600,
            h: 360,
            bar: "Launch press conference · cropped",
        } satisfies Shot,
        billboard: {
            src: `${LIVE}/1.jpeg`,
            alt: "A billboard in Dubai: Dubai is safe with your digital awareness, with a QR code to the platform",
            w: 1280,
            h: 960,
            bar: "Billboard with QR entry",
        } satisfies Shot,
        mall: {
            src: `${V2}/mall-banner.jpg`,
            alt: "A mall LED banner with the same campaign and QR code",
            w: 1280,
            h: 225,
            bar: "Mall screen · cropped",
        } satisfies Shot,
        // The outcome, sourced. "40+ pages" is an output, not an outcome, so
        // it stays in the impact line and isn't set as a figure.
        outcome: {
            primary: {
                value: 1.42,
                decimals: 2,
                suffix: "M",
                label: "visitors in its first year",
                source: "since launch on 12 July 2025 · Emirates 24|7, 9 Aug 2026",
            },
        } as null | { primary: Figure; secondary?: Figure[] },
    },

    // ---------- 06 ----------
    learnings: {
        heading: ec.learnings.items[0] + ".",
        lessons: TRIM.lessons,
        next: ec.evolving.body,
    },

    notes: {
        heading: "Notes & methods",
        items: [
            "1.42 million visitors since launch on 12 July 2025, as reported by Emirates 24|7 on 9 August 2026 (“Dubai Police e-crime awareness platform surpasses 1.4 million visitors in its first year”).",
            "The 200,000-a-day figure is for the UAE as a whole: Mohamed Al Kuwaiti, the UAE government's head of cyber security, in Khaleej Times, 14 May 2025.",
            "40+ counts the pages designed for launch. The site map above shows its first two levels; every page uses one of those templates.",
            "Screens and recordings are from the live site, ecrimehub.gov.ae. A name in the assistant recording is blurred, and launch photos are cropped to leave people out.",
            "The site map and the report paths are redrawn from the project's information architecture.",
            "Delivered through Human Firewall, the cybersecurity SaaS platform; Dubai Police was its client.",
        ],
    },

    next: {
        label: "next case study",
        title: "unsaid",
        line: "idea to live product, solo, in three weeks",
        href: "/v2/case-study/unsaid",
        shot: { src: "/work/unsaid/home-dark.png", alt: "", w: 796, h: 1731, bar: "unsaid" } satisfies Shot,
    },
};

// Every wording change from the live page, for review.
export const SLIPS = [
    "Hero · Eyebrow “Case study · Dubai Police” → “Human Firewall · client: Dubai Police”.",
    "Hero · Pitch shortened; “at a national scale” removed (a city police service).",
    "Hero · Impact line added; the role names its parts. The pinned scroll opener and the second hero are removed.",
    "All chapters · New claim headings (the live page had no headings); body copy shortened, claims unchanged: see TRIM.",
    "01 · The 2025 attack figure (sourced) and the audience added, from Neha (2026-11-09); context and the Australia pushback as one chapter; constraints listed once.",
    "02 · Corrected by Neha (2026-11-09): the redirect was Dubai Police's requirement, not a debate. The live “Design Decision” callout (stakeholders wanted it in one place; chain of custody) is not used. The chapter is now the nudge Human Firewall added to every Report click.",
    "03 · “Education at scale” leads the chapter; the three-level/four-tier wording settled as three templates; the 30% expansion folded in here.",
    "04 · The escalation, city-wide blocking and “One person's report protects millions” claims removed: backend systems, not shown to be Neha's work.",
    "05 · Launch photos of people dropped or cropped; the QR entry point connected to the site map.",
    "06 · Learnings: the first kept as the heading; three specific lessons drawn from the study (the first rewritten to match the corrected ch 02).",
    "Hero + 05 · Outcome added: 1.42 million visitors in the first year, and the timeline corrected to the 12 July 2025 launch (Emirates 24|7), confirmed by Neha (2026-11-09).",
    "Removed: “<3 clicks / 6+ steps” and “2 languages” metrics until sourced; the AI-made IA and user-flow images (redrawn); the Unsplash cluster.",
];
