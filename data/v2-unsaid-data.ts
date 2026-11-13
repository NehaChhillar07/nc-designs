// unsaid case study 2.0 (/case-study/unsaid).
//
// The story is not rewritten: its claims, decisions and lowercase voice are
// the live study's (data/unsaid-data.ts, imported, never retyped). The copy
// is edited so each claim is made once (TRIM), and every wording change is
// listed in SLIPS. Decisions (2026-11-03/05): designed in Claude Design and
// built in Claude Code; the "real register" posts are real and OK to show;
// leave out anything that could backfire.
// Design rules: design-system/neha-portfolio/pages/case-study-v2.md

import type { DeckCard } from "@/data/v2-flashcard-data";
import type { Shot } from "@/data/v2-human-firewall-data";
import { unsaidData as un } from "@/data/unsaid-data";
import { SITE_URL } from "@/lib/site";

// v2 crops of the live screens (the phones without their surrounds).
const V2 = "/work/unsaid";

const TRIM = {
    status: "live at unsaidnow.vercel.app · designed and built solo in three weeks · next.js and supabase",
    origin: [
        "everyone at work was in a mood. snappy, tired, quietly done with the day. and nobody was going to *say* anything.",
        "so on a break i built a small thing: a page where you type the sentence you're not saying, hit send, and it just goes. no name, no profile.",
        "i shared the link with a few people. they came back and said they felt lighter. one called it the first honest thing they'd done all week.",
        "that was the whole insight. people don't need advice.",
    ],
    rule: [
        "most apps treat anonymity as a toggle in settings. here it's load-bearing: who wrote a post never leaves the server. the app you hold can't see it. it only ever reads a version of the feed with the author erased.",
        // From the repo: tests/anonymity.test.mjs, run in CI on every push.
        "and it's tested, not promised: a check runs on every push and fails the build if any view the app reads ever exposes the author.",
        // From docs/what-anonymous-means.md and supabase/functions/mute.
        "nobody else, not nobody at all. sign in the default way and unsaid holds no identity, just a random id. mute works the same way: the server looks up the author and never sends it back.",
        "that one constraint quietly deleted half the features a normal social app would have.",
    ],
    safety: [
        // From the repo: supabase/functions/_shared/rules.ts and moderation.ts.
        "so every confession and reply passes two layers first. a rule layer catches the obvious on the spot: slurs, self-harm methods, and anything that could out someone, like a company, a city or a phone number, even when it's the writer's own. then a safety model reads the rest against a written policy.",
        "the tuning is the whole thing. the policy says, in so many words, that sadness, anger, swearing and venting are allowed. it blocks only harm aimed outward: threats, hate, harassing a real person, anything illegal. replies get stricter limits than posts, because a reply to a confession has to be gentler than the confession.",
        "and crisis language never just gets blocked. it opens a soft door: Tele-MANAS (14416), iCall and AASRA, a gentle \"you deserve someone real on the other end,\" and the choice to still let the feeling out. a stated plan or method is the one thing always blocked.",
        // From docs/moderation-policy.md and the admin metrics page.
        "once it's live, three reports hide a post until a person reviews it, within a day. every block is logged with the rule that fired, so the filters can be audited and fixed.",
    ],
    worlds: [
        "personal is the warm world: home, love, family, the 2am stuff. professional is the cool world: work, money, the things you'd never say in a standup.",
        "same you, two rooms, one tap apart. switch, and the colour, the mood and the confessions change with it.",
    ],
    feel: [
        "each confession is a card. it tracks your finger, tilts as you drag, and commits past 92 pixels or a fast enough flick.",
        "the only public reactions are warm ones: felt this, and same. and there is no downvote anywhere. if a confession isn't yours, \"not for me\" lets it drift away, and the person who wrote it never knows.",
        // From rules.ts: POST_MAX_CHARS 500, COMMENT_MAX_CHARS 280, eight MOOD_KEYS.
        "writing one is its own little ritual: up to 500 characters (replies get 280), one of eight moods, replies on or off, then release.",
    ],
    made: [
        "i designed every screen first, in real html and css: the two-world palette, space grotesk for the interface, lora for the confessions.",
        "claude code turned that into a live, installable next.js app on supabase, with realtime, so a stranger's \"felt this\" lands the moment they tap it. an ios app is built too, waiting on an apple developer account.",
    ],
    // The calls behind the build, from the repo and its history.
    calls: [
        "keep the author out of every view the app can read, and test it on every push.",
        "make edge functions the only way to write, so moderation and rate limits can't be skipped.",
        "ship the design as code: one token package with the same names as the design, a 44px tap target as a token, reduced motion guarded on every animation.",
        "audit my own system before launch, twice: de-anon precision, duplicate reports, and a bypass in the role-title guard, closed.",
    ],
    // DRAFT for Neha's approval, grounded in rules.ts ("company detection is
    // the #1 false-positive source") and moderation.ts (the model "catches
    // harm phrased cleverly ... that the keyword rules can't").
    differently: "next time i'd lean on the model for the de-anon guard sooner. keyword lists flag everyday words that are also company names, like apple or meta, and still miss clever phrasing.",
    lessons: [
        "pick the one rule first. every feature after it is a yes or a no to that rule.",
        "tune the guard for the venting, not against it. the feelings people can't say anywhere else are the point.",
        "let what's missing do the work: no profiles, no streaks, no dopamine counter.",
    ],
};

const SHOTS = {
    home: {
        src: `${V2}/home-dark.png`,
        alt: "the home screen: say the thing you've never said, the personal and professional switch, and a card with not for me and felt this 6",
        w: 796,
        h: 1731,
        bar: "not for me, or felt this",
    } satisfies Shot,
    personal: {
        src: `${V2}/world-personal.png`,
        alt: "the live feed in the personal world, warm: overthinker, 27, confused: i'm 27 and i still don't know what i actually like",
        w: 780,
        h: 1376,
        bar: "personal · live feed",
    } satisfies Shot,
    professional: {
        src: `${V2}/world-professional.png`,
        alt: "the live feed in the professional world, cool: tech lead, 8 yrs, angry: the intern is better than me and i'm the one reviewing his work",
        w: 780,
        h: 1376,
        bar: "professional · live feed",
    } satisfies Shot,
    warm: {
        src: `${V2}/feed-warm.png`,
        alt: "the feed in the light theme, with the personal and professional switch at the top and 2 new drops",
        w: 806,
        h: 1736,
        bar: "personal or professional, top left",
    } satisfies Shot,
    yourTurn: {
        src: `${V2}/your-turn.png`,
        alt: "your turn: a field that says say the thing you've never said, no name, ever, and this is where they don't have to disappear",
        w: 796,
        h: 1260,
        bar: "your turn · no name, ever",
    } satisfies Shot,
};

export const unV2 = {
    meta: {
        title: "unsaid · a case study by Neha Chhillar",
        description: un.hero.sub,
        canonical: `${SITE_URL}/case-study/unsaid`,
    },

    chapters: [
        { id: "origin", n: "01", label: un.origin.title, short: "where it came from" },
        { id: "rule", n: "02", label: un.invariant.title, short: "one rule" },
        { id: "safety", n: "03", label: un.safety.title, short: "what gets through" },
        { id: "worlds", n: "04", label: un.worlds.title, short: "two worlds" },
        { id: "feel", n: "05", label: un.feel.title, short: "the feel" },
        { id: "made", n: "06", label: `${un.made.title} · ${un.closer.title}`, short: "made, and learned" },
        { id: "notes", n: "—", label: "notes & methods", short: "notes & methods" },
    ],
    railLabel: "chapters",

    hero: {
        // SLIP 1: "fun project · 2026" → "side project · 2026".
        eyebrow: "side project · 2026",
        title: un.hero.brand,
        lineBefore: un.hero.h1Pre,
        lineHighlight: un.hero.h1Highlight,
        sub: un.hero.sub,
        status: TRIM.status,
        facts: [
            { label: "role", value: un.hero.metaRow[0].value },
            // SLIP 2: "a few caffeinated weeks" → "three weeks" (as the homepage says).
            // From the repo history: first commit 11 Jun 2026, launch 2 Jul 2026.
            { label: "timeline", value: "three weeks to launch, jun–jul 2026" },
            { label: "made with", value: un.hero.metaRow[2].value },
        ],
        live: { href: un.hero.liveHref, label: un.hero.liveLabel },
        // The live home screen, not the design mock (its 1.3k / 612 counts
        // were made up; the live feed's are single and double digits).
        shot: { ...SHOTS.home, bar: "the live app" },
    },

    origin: {
        before: un.origin.h2Pre,
        highlight: un.origin.h2Highlight,
        body: TRIM.origin,
        decision: {
            rejected: [{ title: un.origin.compare.faded }],
            chosen: { title: un.origin.compare.bold },
        },
    },

    rule: {
        // SLIP 9: "nobody can ever know" → "nobody else can ever know", the
        // promise unsaid's own docs make ("anonymous to everyone else: total").
        heading: un.invariant.h2.replace("nobody can ever know", "nobody else can ever know"),
        body: TRIM.rule,
        // The self-playing flow: a post, the server, the feed.
        flow: {
            stations: ["you write it", "the server", "everyone's feed"],
            author: "by: you",
            kept: "author kept here, never sent",
            erased: "author erased",
            sample: un.swipeCards[2].body,
            again: "again",
        },
        pullQuote: un.invariant.pullQuote,
        deletedLabel: "deleted",
        // SLIP 3: "you can mute a voice" moves out of the deleted list.
        deleted: un.invariant.deleted.filter((d) => !d.item.startsWith("you can")).map((d) => ({ ...d, note: d.item === "no DMs" ? "" : d.note })),
        addedLabel: "added, carefully",
        added: un.invariant.deleted.filter((d) => d.item.startsWith("you can")),
    },

    safety: {
        heading: un.safety.h2,
        body: TRIM.safety,
        // The hands-on moment. Example lines written for this page (not posts),
        // each answered by the policy above.
        sorter: {
            label: "where does it go?",
            choices: [
                { id: "posts", label: "posts" },
                { id: "door", label: "posts, with a soft door" },
                { id: "blocked", label: "blocked" },
            ],
            lines: [
                {
                    text: "i'm so jealous of my best friend's life i can't look at her posts anymore.",
                    answer: "posts",
                    why: "jealousy is venting. the safety model's written policy lets it through by name.",
                },
                {
                    text: "i don't want to exist right now.",
                    answer: "door",
                    why: "crisis language opens a soft door: real helplines, and the choice to still let the feeling out.",
                },
                {
                    // Checked against rules.ts: deanonHits returns ["deanon:city"].
                    text: "everyone at my office in bangalore thinks i got promoted on merit. i didn't.",
                    answer: "blocked",
                    why: "a city or a company can out the writer, so the de-anon guard stops it, even when it's about yourself. it's the most common way anonymity breaks.",
                },
                {
                    text: "i miss my dad every single day and i never say it.",
                    answer: "posts",
                    why: "grief passes both layers untouched.",
                },
            ],
            right: "right",
            notQuite: "not quite",
            next: "next line",
            again: "start again",
            done: "that's the policy: venting through, harm out, crisis gets a door.",
        },
        layers: [
            {
                id: "guard",
                label: "every confession",
                steps: [
                    // The structure only: the prose above names what each layer catches.
                    { label: "a confession" },
                    { label: "rule pass" },
                    { label: "ai safety model" },
                    { label: "the feed", tone: "oxblood" as const },
                ],
            },
            {
                id: "crisis",
                label: "or",
                steps: [{ label: "crisis language" }, { label: "the soft door", tone: "oxblood" as const }],
            },
            {
                id: "live",
                label: "once it's live",
                steps: [{ label: "three reports" }, { label: "hidden" }, { label: "a person reviews it", sub: "within a day", tone: "oxblood" as const }],
            },
        ],
        // SLIP: the heading keeps its first sentence ("a few, lightly, from the wild side" was unclear).
        registerHeading: un.register.h2.split(". ")[0] + ".",
        // Neha (2026-11-12): the live page's "felt this 8.2k" counts were
        // invented; the real posts show without numbers.
        register: un.register.cards.map((c) => ({ role: c.role, mood: c.mood, body: c.body })),
        // Neha (2026-11-03): real posts from the live feed, OK to show.
        registerLabel: "real posts, shared anonymously",
        // SLIP: the caption keeps its first sentence.
        registerCaption: un.register.caption.split(". ")[0] + ".",
    },

    worlds: {
        heading: un.worlds.h2,
        body: TRIM.worlds,
        // The two worlds, switched over one phone: live captures, 2026-11-11.
        switchLabel: "world",
        shots: { personal: SHOTS.personal, professional: SHOTS.professional },
    },

    feel: {
        // SLIP 5: the heading is the live intro line; "a tiny physics engine" (springs) is dropped.
        heading: "you don't scroll a list here. you move through confessions one card at a time.",
        body: TRIM.feel,
        deck: un.swipeCards.map((c): DeckCard => ({ kind: "note", tag: c.role, mood: c.mood, text: c.body, reaction: "felt this" })),
        deckLabel: "three confessions",
        controls: { prev: "previous confession", next: "next confession", flip: "flip" },
        complete: "that's all three",
        restart: "start again",
        swipe: { offset: 92, velocity: 450 },
        yourTurn: SHOTS.yourTurn,
    },

    made: {
        heading: "designed in claude design. built in claude code.",
        body: TRIM.made,
        closer: un.closer.h2,
        calls: TRIM.calls,
        callsLabel: "the calls were mine. claude code typed them.",
        lessons: TRIM.lessons,
        differentlyLabel: "what i'd do differently",
        differently: TRIM.differently,
        repo: { href: "https://github.com/NehaChhillar07/unsaid", label: "the code is public →" },
        finalLine: un.closer.finalLine,
        live: { href: un.closer.liveHref, label: un.closer.liveLabel },
    },

    notes: {
        heading: "notes & methods",
        items: [
            "the confessions in chapter 03 are real posts from the live feed, shared anonymously.",
            "the four lines in the sorter are written for this page, not posts. each answer is what the app's own rule layer and written moderation policy return, checked against the code.",
            "the anonymity, moderation and build details come from the public repo: the anonymity test, the rules and moderation files, and the moderation and anonymity docs.",
            "screens are from the live app. the two worlds were captured from the public feed on 11 nov 2026.",
        ],
    },

    next: {
        label: "next case study",
        title: "Airtel Travel Mode",
        line: "roaming redesigned around a traveller's questions. a self-initiated concept, built as a working prototype",
        href: "/case-study/airtel-travel-mode",
        shot: { src: "/work/thumbs/airtel-travel-mode.png", alt: "", w: 1800, h: 1800, bar: "airtel travel mode" } satisfies Shot,
    },
};

// Every wording change from the live page, for review.
export const SLIPS = [
    "02 · heading: “nobody can ever know it's you” → “nobody else can ever know it's you” (unsaid's own anonymity doc); the anonymity test, anonymous sign-in and mute added from the repo.",
    "03 · the opening paragraph removed (it restated the heading); safety rewritten from the repo: the two layers in detail, stricter replies, named helplines, method always blocked, reports and the moderation log. Sorter line 3 replaced (the old one isn't caught by the rule layer); answers checked against the code.",
    "04 · the two worlds shown with live captures and a switch.",
    "05 · “280 characters” corrected to 500 (replies 280), with eight moods.",
    "hero · the design mock (felt this 1.3k, same 612) replaced by the live home screen; 03 · the invented felt-this counts (8.2k, 5.4k, 7.1k, 6.8k) removed from the real posts (Neha, 2026-11-12).",
    "06 · the calls behind the build, the repo link, and “what i'd do differently” (DRAFT, needs Neha's yes).",
    "hero · “fun project · 2026” → “side project · 2026”; the hero note “yes, it's real and live. go tap something.” removed.",
    "hero · timeline “a few caffeinated weeks” → “three weeks, 2026” (as the homepage and resume say).",
    "02 · “you can mute a voice” moves from the deleted list to “added, carefully”; the “nobody slides anywhere” note and “which turned out to be the best thing about it” removed.",
    "03 · safety and the real register become one chapter: the sorter (new, example lines written for this page), the layers as a flow, then the real posts labelled as real. The repeated pull quote removed.",
    "05 · heading is the live intro line; “a tiny physics engine” dropped (it's springs). “hearts spray across the entire screen” and “no likes counter to win” removed (the screens show counts). The swipe, felt-this and spill-it copy merged and shortened; the images now match their text.",
    "06 · how it was made and what i take from it as one chapter; the stack tags removed (the paragraph names the stack); “i mostly just kept good taste”, “card-free” and the self-deprecating lines removed; three lessons drawn from the study.",
    "01 · “a dumb little thing” → “a small thing”; the last paragraph keeps “people don't need advice” and drops the half that repeated the heading.",
    "06 · the closer's two paragraphs (profiles, streaks, the dumb monday lesson) become the three lessons; the final line stays.",
    "all chapters · body copy shortened, claims unchanged: see TRIM.",
];
