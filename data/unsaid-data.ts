// All prose for the unsaid case study lives here.
// Repo rule: no hardcoded copy inside components — everything reads from this file.
// Emphasis inside body strings uses *asterisks*; the renderer converts them to <em>.

import { SITE_URL } from "@/lib/site";

const LIVE_HREF = "https://unsaidnow.vercel.app";
const LIVE_LABEL = "see it live →";
const ASSET = "/work/unsaid-case study";

// A "the feel" block is either a live demo or a phone screenshot — shared shape.
type FeelBlock = {
    label: string;
    h3: string;
    body: string;
    annotation: string;
    demo?: "swipe" | "felt";
    image?: string;
    imageAlt?: string;
    reversed?: boolean;
};

export const unsaidData = {
    meta: {
        // No "| Neha Chhillar" suffix here: the root layout title template appends it.
        title: "unsaid · say the thing you've never said",
        description:
            "a fun project: an anonymous confessions app with two worlds: personal & professional. designed in claude design, built in claude code. next.js + supabase, live and real.",
        ogTitle: "unsaid · the app i built so people could finally say it",
        readingTime: "6 min read",
        roleTag: "Design + Build · Solo",
        url: `${SITE_URL}/case-study/unsaid`,
        ogImage: "/og/unsaid.png",
    },

    hero: {
        eyebrow: "fun project · 2026",
        brand: "unsaid",
        h1Pre: "the app i built so people could say the thing they'd ",
        h1Highlight: "never say out loud.",
        sub: "an anonymous confessions app. two worlds: personal and professional. nobody knows it's you. everybody feels it.",
        metaRow: [
            { label: "Role", value: "designed & built solo" },
            { label: "Timeline", value: "a few caffeinated weeks" },
            { label: "Made with", value: "Claude Design → Claude Code" },
        ],
        liveHref: LIVE_HREF,
        liveLabel: LIVE_LABEL,
        image: `${ASSET}/home-dark.png`,
        imageAlt:
            "the unsaid home screen: brand, the personal/professional toggle, and a confession card",
        annotation: "yes, it's real and live. go tap something.",
    },

    origin: {
        number: "01",
        title: "where it came from",
        h2Pre: "it started on a very normal terrible monday. and ended as ",
        h2Highlight: "somewhere to put the sentence.",
        h2Post: "",
        body: [
            "everyone at work was in a mood. snappy, tired, quietly done with the day. and nobody was going to *say* anything. we're all far too professional for that.",
            "so on a break i built a dumb little thing: a page where you type the sentence you're not saying, hit send, and it just… goes. no name. no profile. no \"wait, who posted this.\"",
            "i shared the link with a few people. and something weird happened: they came back and said they felt lighter. one of them said it was the first honest thing they'd done all week.",
            "that was the whole insight. people don't need advice. they need somewhere to put the sentence.",
        ],
        compare: {
            faded: "a group chat where everyone knows exactly whose 2am thought that was.",
            bold: "a place where the sentence leaves your body, and can't be traced back to it.",
        },
    },

    invariant: {
        number: "02",
        title: "the invariant",
        h2: "there was exactly one rule. nobody can ever know it's you. every other decision bent around it.",
        body: [
            "most apps treat anonymity as a toggle in settings. here it's load-bearing. the thing that identifies you (who wrote a post) never leaves the server. the app you hold literally cannot see it. it only ever reads a version of the feed with the author erased.",
            "that one constraint quietly deleted half the features a normal social app would have. which turned out to be the best thing about it.",
        ],
        pullQuote:
            "anonymity isn't a feature here. it's the product. take it out and there's nothing left worth protecting.",
        deleted: [
            { item: "no dislike button", note: "nobody gets dunked on" },
            { item: "no DMs", note: "nobody slides anywhere" },
            { item: "no images", note: "words only, on purpose" },
            { item: "no public profiles", note: "there's no \"you\" to stalk" },
            { item: "you can mute a voice", note: "without ever learning whose it was" },
        ],
    },

    worlds: {
        number: "03",
        title: "two worlds",
        h2: "the thing you can't tell your family isn't the thing you can't tell your team. so there are two of you.",
        body: [
            "personal is the warm world: home, love, family, the 2am stuff. professional is the cool world: work, money, the things you'd never say in a standup.",
            "same you. two rooms. the whole app changes temperature when you switch: colour, mood, the kind of confession you see.",
        ],
        caption: "go on, flip it.",
    },

    feel: {
        number: "04",
        title: "the feel",
        h2Pre: "it's an anonymous message app. it did not need to feel this good. but the whole thing runs on ",
        h2Highlight: "a tiny physics engine",
        h2Post: ", so.",
        intro: "you don't scroll a list here. you move through confessions one card at a time, and every interaction has a little bit of hand-feel built in.",
        blocks: [
            {
                label: "swipe deck",
                h3: "a card you can throw.",
                body: "each confession is a card you can throw. it tracks your finger 1:1, tilts as you drag, and commits when you pass 92 pixels, or flick it fast enough.",
                annotation: "drag me. i tilt. throw me. i go. →",
                demo: "swipe",
                reversed: false,
            },
            {
                label: "felt this",
                h3: "the only public reaction is warmth.",
                body: "tap \"felt this\" and hearts spray across the entire screen. no likes counter to win, no leaderboard. just, someone out there felt it too.",
                annotation: "tap it. trust me. →",
                demo: "felt",
                reversed: true,
            },
            {
                label: "not for me",
                h3: "the quiet skip.",
                body: "no downvote exists anywhere in the app. if a confession isn't yours, the card just exhales: drifts down, blurs, and dissolves. the person who wrote it never knows. nobody gets dunked on here.",
                annotation: "there is no downvote. on purpose.",
                image: `${ASSET}/feed-dark.png`,
                imageAlt: "a confession card in the dark theme with felt this and not for me",
                reversed: false,
            },
            {
                label: "spill it",
                h3: "writing one is its own little ritual.",
                body: "pick a mood, decide if replies are on, and hit release. the words literally fly up out of the card and vanish into the feed. ✈️",
                annotation: "280 characters. that's the whole diary entry.",
                image: `${ASSET}/intro-threshold.png`,
                imageAlt: "the compose field: say the thing you've never said, no name ever",
                reversed: true,
            },
        ] as FeelBlock[],
    },

    safety: {
        number: "05",
        title: "safety",
        h2: "an anonymous feelings app is a moderation minefield. this was the hardest design problem, and it wasn't a screen.",
        body: [
            "if strangers can post anonymously, you have to decide, in code, what a stranger is allowed to feel out loud. and catch the exact moment it stops being a feeling and becomes harm.",
            "so every confession passes a layered guard before it's ever seen. a fast rule pass catches the obvious: slurs, attempts to out someone, self-harm methods. then an ai safety model reads the rest.",
            "the tuning is the whole thing: it lets raw venting through (anger, jealousy, grief, even \"i don't want to exist right now\") because that's the point of the app. it only blocks genuine harm: threats, hate, targeting a real person, anything illegal.",
            "and crisis language never just gets blocked. it opens a soft door instead: real helplines, a gentle \"you deserve someone real on the other end,\" and the choice to still let the feeling out.",
        ],
        pullQuote:
            "the hardest problem wasn't a layout. it was deciding what a stranger is allowed to say when no one knows it's them.",
        chips: ["rule pass", "ai safety classifier", "crisis → helplines, never a hard block"],
    },

    register: {
        number: "06",
        title: "real register",
        h2: "this is how people talk when they're sure no one's watching. a few, lightly, from the wild side of the feed.",
        cards: [
            {
                role: "old soul, gen-z body",
                mood: "🥀 nostalgic",
                felt: "felt this 8.2k",
                body: "i keep trying to fit into this generation, but my heart keeps looking for a world that doesn't exist anymore.",
            },
            {
                role: "first spill",
                mood: "🔥 unfiltered",
                felt: "felt this 5.4k",
                body: "wtf is spilling? i can say any and everything without coating. straight up. no shame baby.",
            },
            {
                role: "credit limit: emotional",
                mood: "😵‍💫 broke",
                felt: "felt this 7.1k",
                body: "is it just me or is everyone surviving on cc like we have no real money fr.",
            },
            {
                role: "everyone's therapist",
                mood: "🫥 numb",
                felt: "felt this 6.8k",
                body: "i'm the friend everyone vents to. no one's ever asked if i'm okay.",
            },
        ],
        caption:
            "every one of these would be unsayable with a name attached. that's the product doing its job.",
    },

    made: {
        number: "07",
        title: "how it was made",
        h2Pre: "designed in claude design. built in claude code. i mostly just kept ",
        h2Highlight: "good taste",
        h2Post: " and said \"no\" a lot.",
        body: [
            "i mocked the entire thing up in claude design first: every screen, in real html and css, as a proper handoff bundle. two-world palette, space grotesk for chrome, lora serif for the confessions, the little speech-bubble mask as the logo.",
            "then claude code turned the handoff into a live product: a next.js progressive web app on the front, supabase on the back. anonymous sign-in, a strict \"author never leaves the server\" rule enforced in the database, edge functions as the only way to write, and realtime so a \"felt this\" from a stranger lands on your screen the instant they tap it.",
            "the ai moderation layer runs card-free. the whole thing ships as an installable app. it is, genuinely, an anonymous message app that took a suspicious amount of engineering.",
        ],
        tags: [
            "Claude Design",
            "Claude Code",
            "Next.js",
            "Supabase",
            "Framer Motion",
            "Realtime",
            "AI moderation",
            "PWA",
        ],
        annotation: "a lot of app for a place to whisper into.",
    },

    closer: {
        number: "08",
        title: "what i take from it",
        h2: "building for anonymity is mostly an exercise in restraint. every feature you don't add is a kind of care.",
        body: [
            "i kept wanting to add things: profiles, streaks, a little dopamine counter. and almost every time, the right answer was no. the app is good because of what's missing from it.",
            "and the dumb monday lesson still stands. sometimes the whole product is just giving a person a safe place to finish a sentence they've been holding for years.",
        ],
        finalLine: "say the thing you've never said.",
        liveHref: LIVE_HREF,
        liveLabel: LIVE_LABEL,
    },

    // Sample confession cards reused by the swipe demo (section 04).
    swipeCards: [
        {
            role: "up at 3am",
            mood: "🌙 lonely",
            body: "i have a hundred people i could text right now and not a single one i could call crying at 2am.",
        },
        {
            role: "the funny one",
            mood: "🫥 heavy",
            body: "being the funny friend is a full time job. i clocked out tonight in a parking lot.",
        },
        {
            role: "almost there",
            mood: "🫧 scared",
            body: "i think i'm about to let down everyone who believed in me, and i can't say it out loud.",
        },
    ],
};

export type UnsaidData = typeof unsaidData;
