// Content for the essay "What being the first designer really costs you".
// Repo rule: no hardcoded copy inside components — everything reads from this file.
//
// Rendered by components/writing/essay-article.tsx at /writing/first-designer.
// Text is verbatim from the author — do not edit phrasing here for "polish".

import type { Essay } from "@/components/writing/essay-article";
import { SITE_URL } from "@/lib/site";

export const firstDesignerEssay: Essay = {
    meta: {
        title: "What being the first designer really costs you",
        description:
            "Being the first designer is two jobs wearing one title. You get judged on one of them.",
        url: `${SITE_URL}/writing/first-designer`,
        // Dedicated 1200x630 share card, matching the case studies. Not the cover:
        // that is 2:1 and would be letterboxed or cropped by every platform.
        ogImage: "/og/writing-first-designer.png",
        ogImageAlt: "What being the first designer really costs you - Neha Chhillar",
    },
    title: "What being the first designer really costs you",
    dek: "Being the first designer is two jobs wearing one title. You get judged on one of them.",
    dateISO: "2026-07-30",
    dateDisplay: "July 30, 2026",
    readTime: "3 min read",
    cover: "/writing/first-designer-cover.png",
    coverAlt:
        "A solid navy card reading \"The job you're hired for.\" next to gray text fading out that reads \"The job nobody names.\" Caption below: you can screenshot the left, the right never makes the portfolio.",
    blocks: [
        { type: "p", text: "My first month, I spent most of my time not designing." },
        {
            type: "p",
            text: "There was a setting in the product nobody could explain. I asked around. One person thought it was for a client from years back. Another told me not to touch it. So I didn't touch anything. I just tried to work out what was safe to change, and which parts were scars from decisions no one remembered making. In standup I said I was \"still ramping up.\" True, and nowhere near the whole story.",
        },
        {
            type: "p",
            text: "I've been the first designer twice now. Both times, the title hid a second job.",
        },
        {
            type: "p",
            text: "The first job is the one you're hired for: ship the screens, move the numbers. The second is the one nobody mentions in the interview: build the design function itself. Decide what \"done\" means. Decide what good looks like, when there's no one above you who's already decided. Teach a company that's never had a designer what a designer is even for.",
        },
        {
            type: "p",
            text: "You get judged on the first job. The second one is invisible, until it's missing and things quietly break.",
        },
        { type: "h2", text: "The invisible work" },
        {
            type: "p",
            text: "That confusing setting was the small version of a bigger problem. Before I could design anything new, I had to understand why the old thing worked the way it did. What was deliberate, what was a rushed compromise, what was just never fixed. On an old product with enterprise clients who didn't want anything moving under them, that wasn't a phase. It was most of the job.",
        },
        {
            type: "p",
            text: "And it shows up as nothing. No screens, no before-and-after, no line on the roadmap that reads \"spent three weeks making sure the next change wouldn't break.\" You do the work, and the only proof is that nothing broke, which from the outside looks exactly like doing nothing.",
        },
        {
            type: "p",
            text: "The things I built to hold the team together were the same. At some point I wrote down what a finished design actually was: not a screen, a definition. What had to be in the file before anyone could build it. Before that, \"done\" meant something different to everyone, and every handoff cost a day of arguing about it. After, that day just disappeared. And because it disappeared quietly, no one noticed it had ever been there.",
        },
        { type: "p", text: "You can't screenshot an absence." },
        { type: "h2", text: "No one above you" },
        { type: "p", text: "The risk score was one number. I decided it shouldn't be." },
        {
            type: "p",
            text: "I thought it was wrong, so I turned it into something a security lead could actually act on. No design review. No senior designer asking me to defend it. No one to catch me if I was making it worse. Just me, a Figma file, and every client who'd see whatever I shipped.",
        },
        {
            type: "p",
            text: "I was right, it turned out. But look at how I found out: months later, secondhand, in a review, I heard teams had started leaning on it. That's the feedback loop when you're the first designer. Real, but slow, and always late.",
        },
        {
            type: "p",
            text: "When there's no one above you, you never learn whether you're good or just unchallenged. Every call goes straight to the world, and the only verdict is slow and hard to trace back to the moment you were unsure. You make confident decisions for years with no idea if you're getting better. You don't lose that doubt. You learn to work inside it.",
        },
        { type: "h2", text: "What you get back" },
        { type: "p", text: "It wasn't all cost." },
        {
            type: "p",
            text: "You learn what design is actually for. Not on a slide, but because you had to justify the whole function every few months, to people who weren't sure they needed it. Most designers never do this. In a bigger company the value of design is assumed; someone won that argument years ago. When you're the first, no one has. You are the argument. And you come out able to tie a design decision to a real outcome without blinking, because you've had to.",
        },
        { type: "h2", text: "The one thing worth doing" },
        {
            type: "p",
            text: "If you're the first designer somewhere right now: the product you build will be redesigned by someone else in a few years. The function you build will outlast you.",
        },
        {
            type: "p",
            text: "So write the second job down. The definitions. The reasons behind the settings no one can explain. Nobody else is keeping that record, and it's the half of the work that never makes it into a portfolio.",
        },
        { type: "p", text: "You spent half your time on it. It deserves to survive you." },
    ],
};
