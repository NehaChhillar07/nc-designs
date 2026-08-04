// Content for the essay "Where is the deliverability?".
// Repo rule: no hardcoded copy inside components — everything reads from this file.
//
// Rendered by components/writing/essay-article.tsx at /writing/where-is-the-deliverability.
// Text is verbatim from the author — do not edit phrasing here for "polish".

import type { Essay } from "@/components/writing/essay-article";
import { SITE_URL } from "@/lib/site";

export const whereIsTheDeliverabilityEssay: Essay = {
    meta: {
        title: "Where is the deliverability?",
        description:
            "AI made starting easy. Delivering still comes down to three things nobody can skip.",
        url: `${SITE_URL}/writing/where-is-the-deliverability`,
        // Dedicated 1200x630 share card, matching the case studies. Not the cover:
        // that is 2:1 and would be letterboxed or cropped by every platform.
        ogImage: "/og/writing-where-is-the-deliverability.png",
        ogImageAlt: "Where is the deliverability? - Neha Chhillar",
    },
    title: "Where is the deliverability?",
    dek: "AI made starting easy. Delivering still comes down to three things nobody can skip.",
    dateISO: "2026-08-02",
    dateDisplay: "August 2, 2026",
    readTime: "4 min read",
    cover: "/writing/where-is-the-deliverability-cover.png",
    coverWidth: 2400,
    coverHeight: 1280,
    coverAlt:
        "A dark navy card headed \"What you cannot skip\", listing three numbered items: 01 Topic, know what you are building; 02 Solution, decide what AI cannot; 03 Testing, prove it ships, not demos. An arrow points to the word \"Delivered.\" in orange, under a closing line: the tool was never the answer, these three are.",
    blocks: [
        {
            type: "p",
            text: "That is the question I keep asking. Everyone is building faster than ever. Founders open Claude Code, describe a product, and ship the same week. No Figma file, no design system, no handoff. In Stack Overflow's 2025 Developer Survey, 84% of developers said they use or plan to use AI coding tools. Y Combinator partners said, as reported by TechCrunch in March 2025, that a quarter of their Winter 2025 startups had codebases that were about 95% AI-generated.",
        },
        {
            type: "p",
            text: "Starting has never been easier. But starting is not delivering, and the delivery data tells a different story.",
        },
        {
            type: "p",
            text: "GitClear, a company that studies code quality, analyzed 211 million lines of code change from large companies. After AI tools arrived, refactoring (cleaning up code so it stays healthy) fell from 25% of all changes in 2021 to under 10% in 2024, and code rewritten within two weeks went up sharply. In the same Stack Overflow survey, 45% of developers said their biggest frustration is AI code that is \"almost right, but not quite.\"",
        },
        {
            type: "p",
            text: "Google engineer Addy Osmani named this pattern in December 2024: the 70% problem. AI gets you 70% of the way shockingly fast. The last 30% is where projects stall. That 30% is deliverability.",
        },
        {
            type: "p",
            text: "Here is the cleanest test of the whole debate. Name one complex B2B SaaS that is live in production, with paying customers, built end to end by AI with zero human intervention. No human in the decisions, the product thinking, the testing. I went looking, and I could not find one. Even those YC startups with 95% AI-written code have humans doing the other 5%, and look at what the 5% is: deciding what to build, judging what is right, making the output production-worthy. That work is not cleanup after AI. That work is the product.",
        },
        {
            type: "p",
            text: "I design enterprise security software, where a single checkbox has history and someone's safety depends on things behaving as promised. I have also shipped a small product solo with AI. From both seats, the same conclusion: the last 30% is not a code problem. It is a decisions problem. Which means it is fixable, and the fix comes down to three things: knowing your topic, owning the solution, and testing what ships.",
        },
        { type: "h2", text: "You have a vibe, not a topic" },
        {
            type: "p",
            text: "AI amplifies whatever you give it. Give it a clear problem and it builds fast in the right direction. Give it a vague idea and it builds fast in a random direction, and you find out at the end.",
        },
        {
            type: "p",
            text: "This is where most AI projects lose, before a single prompt. If you cannot write one paragraph saying what the product does, who it is for, and what \"done\" means, you do not have a topic yet. You have a vibe.",
        },
        {
            type: "p",
            text: "The fix costs one page. Write the problem, the user, and the definition of done before you open any tool. Figma's 2025 AI Report, which surveyed 2,500 designers and developers, found that teams who shipped successful AI products were far more likely to have explored and agreed on the direction before committing: 60% of successful teams, versus 39% of the ones that failed. Clarity before building is not slow. It is the thing that makes fast possible.",
        },
        { type: "h2", text: "The decisions AI cannot make" },
        {
            type: "p",
            text: "Once the topic is clear, AI can generate any screen. What it cannot do is decide which screen is right, because the right answer lives in context it does not have. What happens when data is missing. What an admin sees versus what a user sees. Which edge case will hurt someone. Who is allowed to do what.",
        },
        {
            type: "p",
            text: "Those decisions are the real design work, and in the AI world they are the whole job. This is also what a design system always was, underneath the Figma file: decisions made once, written down, so you do not remake them badly a hundred times. That asset still matters. It just has to live where the AI can use it now, as rules, states, and edge cases written into the prompt, the codebase, or the docs.",
        },
        {
            type: "p",
            text: "The same Figma report backs this up. Among teams whose AI products shipped successfully, 75% said design and dev made decisions closely together, versus 54% of the teams that failed. The tool did not predict delivery. Who made the decisions, and when, did.",
        },
        {
            type: "p",
            text: "If nothing is decided anywhere and every prompt starts from zero, you will ship the demo in a day and spend three months fixing what the demo hid.",
        },
        { type: "h2", text: "Test what ships, not what demos" },
        {
            type: "p",
            text: "\"Almost right, but not quite\" is now the most common failure mode in software, and almost-right is invisible in a demo. It only shows up when someone uses the product the way real users will break it: wrong inputs, missing data, slow networks, the button pressed twice.",
        },
        {
            type: "p",
            text: "So testing cannot be the step after building anymore. It has to be the gate. Every AI-built piece gets checked against your definition of done and your decisions before it counts as finished. Not \"it works on my machine.\" It works in the ugly cases.",
        },
        {
            type: "p",
            text: "Testing feels slow. But the GitClear churn numbers above are the cost of skipping it. You pay the time anyway, later, with interest.",
        },
        { type: "h2", text: "The tool was never the answer" },
        {
            type: "p",
            text: "The fight gets framed as Figma versus AI. It is not. Both camps can win and both can fail, because the tool was never what decided it.",
        },
        {
            type: "p",
            text: "Know your topic. Own the decisions AI cannot make. Test what ships. Miss those three and AI gives you a fast start and a stalled product. Get them right and the speed is real, all the way to delivery.",
        },
        {
            type: "p",
            text: "So let me flip my question to you. Have you delivered a product with AI, not just started one? What broke in your last 30%? And if you know a complex B2B product running in production with real customers and truly no human in the loop, show me. I would genuinely like to be wrong.",
        },
        {
            type: "p",
            text: "Tell me how it works in your team right now. I am collecting real answers, not hot takes.",
        },
    ],
};
