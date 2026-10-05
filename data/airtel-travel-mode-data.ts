// All prose for the Airtel Travel Mode case study lives here.
// Repo rule: no hardcoded copy inside components, everything reads from this file.
// Emphasis inside body strings uses *asterisks*; the renderer converts them to <em>.
// Bold lead-ins inside captions use **double asterisks**.
//
// Every screen is a capture of the working prototype
// (github.com/NehaChhillar07/airtel-travel-mode), taken by
// tools/capture_case_study.mjs in the Airtel workspace. Numbers in the copy are
// read off those captures or the prototype's source, never typed from memory.
//
// The page is told from inside one postpaid traveller's trip. "You" appears in
// the hero and the opening scene only; each chapter is headed by the question
// she asks at that point, in her words; the reasoning under it is mine.

import { SITE_URL } from "@/lib/site";

const ASSET = "/work/airtel-travel-mode";
const PROTOTYPE_HREF = "https://airtel-travel-mode.vercel.app";

/** Phone captures are 393x852 at 2x. */
export const SHOT_SIZE = { width: 786, height: 1704 } as const;
/** The two evidence screenshots of today's Airtel app, cropped from the archive board. */
export const EVIDENCE_SIZE = { width: 672, height: 1460 } as const;

export type Shot = { src: string; alt: string; caption?: string };
export type Clip = { src: string; poster: string; label: string; caption: string };
export type SpecRow = { beat: string; what: string; timing: string };

const shot = (name: string, alt: string, caption?: string): Shot => ({
    src: `${ASSET}/${name}.png`,
    alt,
    caption,
});

/* The trip, in three acts, and the seven questions she asks along the way.
   Chapters, the question map and the "three moves" links all read from here,
   so a question is written once. */

const ACTS = ["Before you fly", "The moment she lands", "Every day after"] as const;

export type Question = { id: string; n: number; act: string; question: string };

const q = (id: string, n: number, act: number, question: string): Question => ({ id, n, act: ACTS[act], question });

const Q = {
    roaming: q("where-is-roaming", 1, 0, "Where is roaming in this app?"),
    pack: q("which-pack", 2, 0, "Which pack covers my trip?"),
    charge: q("charging-me-now", 3, 0, "Is this charging me now?"),
    working: q("is-it-working", 4, 1, "Is my phone working? Will my OTPs reach me?"),
    left: q("how-much-left", 5, 2, "How much do I have left?"),
    charged: q("why-charged", 6, 2, "Why was I charged for that?"),
    runsOut: q("pack-runs-out", 7, 2, "What happens when the pack runs out?"),
};

export const QUESTION_COUNT = Object.keys(Q).length;

const MOVES = [
    {
        line: "Ask where she is going.",
        body: "The pack is sized to her dates, and the reason says why.",
        to: Q.pack.id,
    },
    {
        line: "Say what it costs before she taps.",
        body: "The button carries the amount and the bill it lands on.",
        to: Q.charge.id,
    },
    {
        line: "Speak first when she lands.",
        body: "Her phone tells her she is connected before she opens the app.",
        to: Q.working.id,
    },
];

export const airtelData = {
    // Labels for the swipeable rows of phones on small screens.
    rows: {
        hint: "Swipe for the next screen",
        motion: "Three recordings of the prototype",
    },

    meta: {
        // No "| Neha Chhillar" suffix here: the root layout title template appends it.
        title: "Roaming, sorted before you fly · Airtel Travel Mode",
        description:
            "A mobile UX case study told from inside one traveller's trip: international roaming in the Airtel Thanks app, redesigned around the questions she asks, from buying a pack to landing to the last day. Research, decisions, trade-offs, and a working prototype.",
        ogTitle: "You've landed. Is your phone working? · Airtel Travel Mode",
        readingTime: "9 min read",
        url: `${SITE_URL}/case-study/airtel-travel-mode`,
        ogImage: "/og/airtel-travel-mode.png",
    },

    hero: {
        metaLine: "Airtel · Travel Mode",
        h1Pre: "You've landed. ",
        h1Highlight: "Is your phone working?",
        h1Post: "",
        lede: "Airtel's app sells a roaming pack, then says nothing until the bill. I redesigned roaming in Airtel Thanks around the questions a traveller asks, in the order she asks them. Then built it, so you can try it.",
        disciplines: "Mobile UX · Research to code · Motion",
        metaRow: [
            { label: "Timeline", value: "July 2026, one month" },
            { label: "Team", value: "Solo" },
            { label: "Role", value: "Product designer" },
            { label: "Status", value: "Not launched" },
            { label: "Research", value: "Desk research, no interviews" },
        ],
        note: "Every screen on this page is a capture of the working prototype. Open it and try any trip.",
        prototypeHref: PROTOTYPE_HREF,
        prototypeLabel: "Try the prototype",
        clip: {
            src: `${ASSET}/rec-departure.mp4`,
            poster: `${ASSET}/rec-departure-poster.jpg`,
            label: "Recording of the prototype: tapping the Travel tile plays the departure sequence into the trip form.",
            caption: "",
        } satisfies Clip,
        annotation: "the first tap is an argument. every tap after is a door.",
    },

    // The ending first: the three moves the page goes on to prove.
    moves: {
        label: "The short version",
        items: MOVES,
        linkLabel: "See it",
    },

    scene: {
        label: "The problem",
        h2: "Imagine you fly to Singapore on Tuesday.",
        // Two steps, each two beats of the story beside the real screen they happen on.
        steps: [
            {
                paragraphs: [
                    "Then Malaysia, then the UAE. Nine days. You're on postpaid, and every bank OTP you get comes to this number. So before you go, you open the Airtel app and tap International Roaming. A web page starts to load.",
                    "A list of packs. Nobody asks where you are going or for how long, so working out which one covers nine days is on you. The only thing you can edit is your mobile number. You pick ₹2,999.",
                ],
                shot: {
                    src: `${ASSET}/evidence-loading.png`,
                    alt: "The current Airtel app: International Roaming opens a web page that says Please wait, we are loading the page for you.",
                    caption: "**A web page, not a screen.**",
                } satisfies Shot,
                // Written beside the screen in hand, each with an arrow into it.
                notes: ["cannot know you have landed", "cannot hold on to your trip", "cannot reach you"],
            },
            {
                paragraphs: [
                    "A green tick. Request received. Has ₹2,999 left your account? Is a request a yes? It doesn't say. It says the pack will switch on when you land, and that to manage it, you follow three steps by hand.",
                    "Then nothing, until the plane door opens. The device settings you need were shown back at checkout. If the phone doesn't connect, the support chat needs data you don't have, and the WhatsApp number cannot be tapped.",
                ],
                shot: {
                    src: `${ASSET}/evidence-request-received.png`,
                    alt: "The current Airtel app after buying: a green tick over Request received for ₹2999 pack, then three manual steps to manage the pack.",
                    caption:
                        "**A success tick for a request.** I could not tell whether ₹2,999 had left my account.",
                } satisfies Shot,
            },
        ],
        brief: 'The brief said awareness and adoption of roaming packs were low. Buying one in the live app showed the sharper problem. Airtel has already flattened foreign rates into one simple pack structure, so "which pack is right for me" is answered commercially. It is not answered in the interface, and after the purchase the app goes quiet.',
        pullQuote: "The current experience is a catalogue. What travellers need is a companion.",
        turn: "That traveller is who I designed for. The rest of this page follows her trip, one question at a time.",
    },

    questions: {
        label: "Research",
        h2: "No travellers to interview. So I read where the worry shows up.",
        lede: "Seven public sources, none of which needed anyone's permission. Search and complaint data come from people who hit problems, so I read them as a map of where worry sits, not how often things break. Each worry became one of her questions.",
        acts: [
            {
                label: ACTS[0],
                rows: [
                    {
                        question: Q.roaming,
                        source: "Recorded walkthrough · app reviews",
                        note: "International Roaming opens a web page inside the app. And not one of the app reviews I read mentioned roaming at all.",
                    },
                    {
                        question: Q.pack,
                        source: "MyJio, walked myself",
                        note: "Jio asks for the destination and the dates, then filters its plans. Airtel asks for neither.",
                    },
                    {
                        question: Q.charge,
                        source: "Google autocomplete",
                        note: 'Type "roaming usage" and all ten suggestions are rewritten to charges.',
                    },
                ],
            },
            {
                label: ACTS[1],
                rows: [
                    {
                        question: Q.working,
                        source: "Google autocomplete · public complaints",
                        note: 'Type "roaming not" and the suggestions are countries: Bahrain, USA, Nepal, Canada. "Want to use it for getting important OTPs here in Canada."',
                    },
                ],
            },
            {
                label: ACTS[2],
                rows: [
                    {
                        question: Q.left,
                        source: "Airtel terms",
                        note: 'Roaming usage is "not available with Airtel in real time".',
                    },
                    {
                        question: Q.charged,
                        source: "Airtel FAQ · public complaints",
                        note: 'Without a pack, a one-day pack switches on by itself. "Sir its activated automatically."',
                    },
                    {
                        question: Q.runsOut,
                        source: "Airtel terms",
                        note: "The credit limit is not monitored while roaming.",
                    },
                ],
            },
        ],
        segmentsH3: "Two segments. They diverge on what happens when benefits run out.",
        segments: [
            {
                tag: "Frequent traveller · postpaid",
                h3: "Short work trips. Wants it handled, and fast.",
                body: "What breaks: silent billing. The bill is the first she hears of a charge she never started. So every charge is named with its cause.",
            },
            {
                tag: "Occasional traveller · prepaid",
                h3: "One longer trip. Compares carefully, even against a local SIM.",
                body: "What breaks: being cut off. Prepaid stops when the allowance is gone. So it warns early, and exhaustion gets its own screen.",
            },
        ],
        spine: "The whole flow is postpaid. Prepaid is written up in trade-off 02, not designed.",
        segmentQuote: "Data is the thing they buy. The number is the thing they need.",
        segmentQuoteCite: "OTPs, bank messages and UPI all depend on the Indian number. No eSIM can provide it.",
    },

    /* ------------------------------------------------ before you fly */

    placement: {
        ...Q.roaming,
        answer: "In the category row, as a Travel tile. A state the app enters, not a place she has to find.",
        lede: "Travel Mode is true a few days a year. So the question was what kind of thing it should be. Four options, one test.",
        options: [
            {
                label: "A row only, no tile",
                chosen: false,
                body: "The safer version, and the one a cautious team would ship. Rejected because a row is somewhere you go, not something the app becomes. It cannot be pre-selected when she lands, so the app can only wait to be opened at the moment she most needs it to speak first.",
            },
            {
                label: "Manage becomes Travel Mode",
                chosen: false,
                body: "The most committed option. Rejected because it removes the commerce surface for the length of the trip and stops her paying a bill from abroad. Bolder is not better if the customer cannot get out.",
            },
            {
                label: "A fifth nav tab",
                chosen: false,
                body: "Rejected on product grounds. All four existing tabs carry revenue, and a permanent tab would sit there for a state that is true a few days a year.",
            },
            {
                label: "A tile in the category row",
                chosen: true,
                body: "It extends a control the app already has for filtering this surface. Entering is a tap on Travel, leaving is a tap on All, so there is no exit to design and no way to feel trapped. And it can be selected for her on arrival.",
            },
        ],
        rejectedLabel: "Rejected",
        chosenLabel: "Chosen",
        shotsLabel: "The home screen, before and during a trip",
        shots: [
            {
                label: "Before a trip",
                shot: shot(
                    "home-today",
                    "Prototype home screen before a trip: the category row reads All, Travel, Wi-Fi, Postpaid, Bank, and International Roaming is a row that says your plan doesn't work outside India.",
                    "Before a trip. Travel joins All, Wi-Fi, Postpaid and Bank.",
                ),
            },
            {
                label: "Trip booked",
                shot: shot(
                    "home-with-trip",
                    "Prototype home screen with a trip booked: the roaming row has become a trip card marked Travel Mode on, 8 days left on your pack.",
                    "Once a trip is live it also appears as a row: the tile is the switch, the row is the glance.",
                ),
            },
        ],
        callout: {
            lead: "The test:",
            body: "can Travel Mode become a state the app enters on its own, or does she have to go and find it? Only the tile answers yes. It can be selected for her on arrival, which is what lets the app speak first.",
        },
    },

    trip: {
        ...Q.pack,
        answer: "The one her dates need. So the app asks for the trip first, and the pack comes second.",
        body: [
            "Today the app sells a pack to a number. There is no idea of a trip anywhere in it.",
            "Every pack covers the same 180+ countries, so asking where she is going filters nothing. I still ask. It tells her she is covered. It sizes the pack to her dates instead of leaving that maths to her. And it gives the app a trip to hold on to: without dates there is no day 3 of 9, no arrival to spot, no alert before the pack ends.",
            "The recommendation is computed, not written. Change the trip.",
        ],
        presetsLabel: "Trips",
        presets: [
            {
                label: "Singapore, Malaysia, UAE · 9 days",
                shot: shot(
                    "packs-3-countries-9-days",
                    "Packs for a 9-day trip to Singapore, Malaysia and UAE: ₹2,999 for 10 days is recommended, covers all three countries and outlasts your 9 days by one.",
                    '"Outlasts your 9 days by one" is checkable. "10 days, unlimited" is not.',
                ),
            },
            {
                label: "Thailand · 4 days",
                shot: shot(
                    "packs-1-country-4-days",
                    "Packs for a 4-day trip to Thailand: ₹2,999 for 10 days is recommended, worth it if the trip stretches or you fly again this month.",
                    "A short trip still gets the 10-day pack, and the reason says why it is worth it rather than pretending it fits.",
                ),
            },
            {
                label: "Thailand · 14 days",
                shot: shot(
                    "packs-1-country-14-days",
                    "Packs for a 14-day trip to Thailand: ₹3,999 for 30 days is recommended, and the ₹2,999 pack ends four days before you fly home.",
                    "Past ten days the 30-day pack wins, and the ₹2,999 card says it ends four days before she flies home.",
                ),
            },
            {
                label: "Three countries · 20 days",
                shot: shot(
                    "packs-3-countries-20-days",
                    "Packs for a 20-day trip to Singapore, Malaysia and Thailand: ₹3,999 for 30 days is recommended and covers all three countries with room to spare.",
                    "Twenty days, three countries: the 30-day pack, with room to spare.",
                ),
            },
        ],
        scoring:
            "A pack that ends before she flies home loses 25 points. Every unused day costs 1.5. Minutes matter from day five. Price is judged per day.",
        prototypeLine: "Four trips here. Any trip in the prototype.",
    },

    money: {
        ...Q.charge,
        answer: "No. Postpaid does not pay here, so the screen says what will happen instead.",
        body: [
            'The whole flow is postpaid, so nothing is paid when she confirms. Once she picks a pack, the review screen says what will happen instead: the amount, the GST, which bill it lands on, when that bill is due, and that the pack does not start until she is out of India. "Nothing is charged yet" sits under every button before this one.',
        ],
        pairLabel: "Review, then confirmation",
        review: shot(
            "review",
            "Review screen: ₹2,999 for 10 days, charged to your postpaid bill, ₹2,999 plus ₹520 GST, ₹3,519 added to your bill, shows on your 2 Sep bill, due 12 Sep. The button reads ₹3,519 on your bill dated 2 Sep.",
            "**Review.** Enough about the money that she knows nothing is taken now. The button carries the fact, not a verb.",
        ),
        confirmation: shot(
            "confirmation",
            "Confirmation screen: a Confirmed stamp, your phone will work in Singapore, and a timeline: now pack confirmed, 25th Aug your 9 day trip starts with nothing paid yet, 2nd Sep ₹2,999 plus GST on your bill.",
            "**Confirmation.** Quiet on purpose. It says Confirmed, not Paid or Done, because on postpaid nothing has been paid yet.",
        ),
        buttonLabel: "The button, three ways",
        buttonRejected: [
            { label: "Pay ₹3,519", body: "Reads as a payment. Nothing is taken now." },
            {
                label: "Confirm request",
                body: "What the app says today. A request can be declined, so she does not know if she is covered.",
            },
        ],
        buttonChosen: {
            label: "₹3,519 on your bill dated 2 Sep",
            body: "The fact she is agreeing to, in the words the bill will use. If it is wrong, she sees it now and not in September.",
        },
        confirmH2: "Nothing was paid, so nothing is celebrated. One fact settled, two dated.",
        confirmBody: [
            "Today she confirmed the pack. On 25 August the trip starts. On 2 September the bill arrives. In that order, because what she is actually asking is whether the bill comes before the trip or after.",
            "The version I submitted resolved a tick and grew the timeline. Watching it, the tick still read like a receipt. The problem was never the tick. It was the ring blooming out of it. So the mark became a stamp, and the stamp got rules.",
        ],
        stampRules: [
            { h3: "The word is Confirmed.", body: "Never Paid, Success or Done. Stamps mean recorded: a visa, a boarding pass." },
            { h3: "No ring, no loop.", body: "One light pass, once, after it settles. A loop turns arrival into shimmer." },
            { h3: "Uphill, not downhill.", body: "It lands at −7°. A clockwise tilt reads as deflating." },
        ],
    },

    /* ------------------------------------------- the moment she lands */

    landing: {
        ...Q.working,
        answer: "Her phone tells her before she asks. Arrival is where the worry peaks, and today the app has nothing for it.",
        body: [
            'Type "roaming not" into Google and the suggestions are country names, typed by people already abroad with a phone that is not working. So the app speaks first: she did not open it, she landed and it told her. The number comes before the data on purpose. Her worry is not gigabytes, it is whether her bank OTPs will still reach her.',
        ],
        statesLabel: "The banner on arrival, connected and not",
        screensLabel: "The arrival screen, connected and not",
        screenLabel: "The screen it opens",
        states: [
            {
                label: "Connected",
                shots: [
                    shot(
                        "lock-connected",
                        "Lock screen, Tue 25 Aug: You are in Singapore, and you are online. Your pack went live by itself. Day 1 of your 9-day trip, unlimited data, about 100 minutes of calls a day.",
                        "**She did not open the app.** It spoke first, with the day count the dashboard will use.",
                    ),
                    shot(
                        "landed-connected",
                        "Arrival screen, connected: You're in Singapore and you're connected. Your number is working, bank OTPs and UPI will reach you here. Your ₹2,999 pack just started.",
                        "**Tapping it opens this.** The number comes first: her OTPs will reach her. The plane flies the arc and lands on the flag.",
                    ),
                ],
            },
            {
                label: "Not connected",
                shots: [
                    shot(
                        "lock-not-connected",
                        "Lock screen, Tue 25 Aug: Your phone hasn't found a network yet. You've landed in Singapore but nothing has registered. Three quick checks usually fix it.",
                        "**Same moment, no network.** The three checks were saved to the phone before she flew.",
                    ),
                    shot(
                        "landed-not-connected",
                        "Arrival screen, not connected: You've landed, but your phone hasn't connected. Your 10 days haven't started yet. Call free or WhatsApp.",
                        "**Same arc, stalled.** A question mark stops halfway and keeps trying. Her first fear is that ₹2,999 is burning. It is not, so that is said first.",
                    ),
                ],
            },
        ],
        after: "Everything on that screen was saved to her phone before she flew, so it opens with no internet. The help card carries the free number and lives on the lock screen. WhatsApp is there because it works on airport Wi-Fi when the SIM does not.",
        pullQuote: "Failure told in the same language as success.",
    },

    /* ------------------------------------------------ every day after */

    days: {
        ...Q.left,
        answer: "Data is unlimited on this pack. Minutes and texts are what run out, so those lead.",
        body: [
            "Airtel's terms say usage can reach them up to four hours late. So every figure is an estimate and the screen says so. The minutes bar drains from full, because she is watching a balance disappear, not a total accumulate. Scrub through the trip.",
        ],
        scrubLabel: "Day {day} of 9",
        scrubAria: "Day of the trip",
        dayShots: [
            shot("dashboard-day-1", "Trip dashboard, day 1 of 9: 98 of 100 minutes left today, 100 of 100 texts, 0.3 GB used.", "Day one. Nothing spent yet but a two-minute call."),
            shot("dashboard-day-2", "Trip dashboard, day 2 of 9: 49 of 100 minutes left today, 98 texts, 2.3 GB used.", "Minutes are a daily 100 and start again at midnight. Texts and data are for the whole pack."),
            shot("dashboard-day-3", "Trip dashboard, day 3 of 9: 45 of 100 minutes left today, 83 texts, 8.4 GB used.", "Day three: 45 minutes left today, 83 texts and 8.4 GB for the trip."),
            shot("dashboard-day-4", "Trip dashboard, day 4 of 9: 48 of 100 minutes left today, 81 texts, 10.4 GB used.", "A quiet day. Minutes reset at midnight; texts do not."),
            shot("dashboard-day-5", "Trip dashboard, day 5 of 9: 38 of 100 minutes left today, 79 texts, 12.4 GB used.", "Texts only go one way. So does data: 12.4 GB of the 40 at full speed."),
            shot("dashboard-day-6", "Trip dashboard, day 6 of 9: 57 of 100 minutes left today, 77 texts, 14.4 GB used.", "Each day's minutes are their own. Yesterday's leftovers do not carry over."),
            shot("dashboard-day-7", "Trip dashboard, day 7 of 9: 54 of 100 minutes left today, 75 texts, 16.4 GB used, 3 days left.", "Three days left on the trip."),
            shot("dashboard-day-8", "Trip dashboard, day 8 of 9: 50 of 100 minutes left today, 73 texts, 18.4 GB used, 2 days left.", "Two days left and 18.4 GB used, nowhere near the 40 GB where it slows."),
            shot("dashboard-day-9", "Trip dashboard, day 9 of 9: today's cell is red, 56 of 100 minutes left today, 71 texts, 20.4 GB used, 1 day left.", "The last day. Two pack days remain, so today's cell turns red. The pack outlasts the trip by one."),
        ],
        cards: [
            {
                h3: "The red zone is a fifth, not a quarter.",
                body: "It was 25% and read as alarmed far too often. 25 of 100 with a week to go is a normal Tuesday. A fifth is where the figure is worth a colour.",
            },
            {
                h3: "Unlimited data marches. It never fills.",
                body: "A bar that fills says there is a limit. A moving dotted line says there is nothing to fill towards.",
            },
        ],
        lowLabel: "When it runs low",
        low: [
            {
                label: "A heavier trip",
                shot: shot(
                    "dashboard-low",
                    "A heavier trip on day 8: 18 of 100 minutes left today and 13 of 100 texts, both in red, with a note that usage reaches Airtel up to four hours late.",
                    "A heavier trip on the same day 8. Minutes and texts under a fifth, both red.",
                ),
            },
            {
                label: "Before data slows",
                shot: shot(
                    "lock-usage",
                    "Lock screen, Tue 1 Sep: You've used 90% of your full-speed data. After 40 GB you stay connected at 80 Kbps. Enough for maps and messages.",
                    "**Before it slows.** The same 40 GB the meter is measured against, and what 80 Kbps still covers.",
                ),
            },
        ],
    },

    charged: {
        ...Q.charged,
        answer: "The cause sits beside every charge, and the banner arrives the day it happens, not a month later on the bill.",
        // Two beats, each beside its screen: the banner the day it happens,
        // then the cost so far with the cause beside each charge.
        parts: [
            {
                body: '"My minutes were still being used as calls were getting diverted to voicemail," one traveller wrote. Every call forwarded to voicemail in India is billed as an outgoing roaming call. Today she learns that from the bill, with no reason beside it.',
                shot: shot(
                    "lock-missed-calls",
                    "Lock screen, Thu 27 Aug: ₹41 for calls you didn't take. Three calls were forwarded to your voicemail in India. Each one is billed as an outgoing call.",
                    "**The same day.** The banner names the cause, because that is the difference between a bill and a betrayal.",
                ),
            },
            {
                body: "Here the banner arrives the same day and names the cause, and the dashboard lists it under the pack: ₹35 for three calls forwarded to voicemail, ₹6 for a call she declined, which still connects. The ₹41 on the banner is the same ledger total, so the two cannot disagree.",
                shot: shot(
                    "dashboard-day-3-ledger",
                    "Below the meters on day 3: this trip so far ₹3,040, ₹2,999 pack plus ₹41 you didn't start, itemised as ₹35 voicemail divert for 3 calls forwarded and ₹6 for a call you declined.",
                    "**The cost so far.** The pack, then ₹41 she did not start, each with its cause.",
                ),
            },
        ],
        pullQuote: "People are not angry about the amount. They are angry that nobody told them why.",
    },

    runsOut: {
        ...Q.runsOut,
        answer: "Nothing is cut off. She hears two days before, and after it ends every rupee is counted with its cause.",
        body: [
            'On postpaid nothing stops when the pack ends. Calls, texts and data carry on at standard roaming rates, and Airtel\'s terms say the credit limit is not watched while she roams. So the risk is not being cut off. It is a bill nobody warned her about. Two days out, the banner says the pack is ending and that nothing happens automatically. When it ends, "still work" comes before the rates.',
        ],
        shotsLabel: "The pack ending, ended, and after",
        shots: [
            {
                label: "Two days out",
                shot: shot(
                    "lock-pack-ending",
                    "Lock screen, Tue 1 Sep: Your pack ends in 2 days. ₹2,999 adds another 10 days. Nothing happens automatically.",
                    "**Two days out.** Worked out from the pack days left, so it only says tomorrow on the day that is true.",
                ),
            },
            {
                label: "It ends",
                shot: shot(
                    "lock-pack-ended",
                    "Lock screen, Fri 4 Sep: Your pack has ended. Calls, texts and data still work, now at standard roaming rates.",
                    "**Reassure, then inform.** Still work comes before the rates.",
                ),
            },
            {
                label: "After it ends",
                shot: shot(
                    "pack-ended",
                    "Pack ended screen on day 11 of a 12-day trip: your pack has ended, calls, texts and data still work at standard roaming rates, ₹450 charged since it ended and counting up.",
                    "**If the trip outlasts the pack.** What it now costs counts up in paise.",
                ),
            },
        ],
    },

    /* ------------------------------------------------------ the system */

    system: {
        label: "Behind every answer",
        h2: "One trip, every surface. A banner cannot say something the dashboard doesn't.",
        lede: "Six notifications and a Live Activity, all derived from the same trip object as the dashboard. Nothing is typed twice, so nothing can disagree.",
        liveActivity: shot(
            "lock-live-activity",
            "Lock screen Live Activity on Thu 27 Aug: Live in Singapore, day 3 of 9, 7 days to go, a rail from Landed to Today to Last day to Home, 45 minutes left, 83 SMS left, ₹41 extra spent.",
        ),
        liveLabel: "The Live Activity",
        liveBody:
            "The file drew the widget collapsed and nothing else, so the expanded state was built. Four fixed moments (Landed, Today, Last day, Home) rather than one cell per day, because this is read at a glance off a locked phone.",
        tripLabel: "One trip",
        trip: ["Singapore, Malaysia, UAE", "25 Aug to 2 Sep, 9 days", "₹2,999 pack, 10 days"],
        feedsLabel: "feeds",
        feeds: [
            "The arrival screen",
            "The dashboard and its day count",
            "The cost so far, with causes",
            "Six lock-screen banners",
            "The Live Activity",
        ],
    },

    /* ----------------------------------------------------- the build */

    motion: {
        label: "How it was built",
        h2: "Built in code with Claude Code, not Smart Animate, so the per-layer timing survives and every number computes.",
        lede: "Two easing curves throughout. The stamp gets a spring loose enough to undershoot, because it is the one thing that makes contact. Recordings of the working prototype, beside the timing each was built to.",
        specLabel: "The timing",
        specHeaders: { beat: "Beat", what: "What moves", timing: "Timing" },
        pieces: [
            {
                title: "The first tap",
                total: "about 3.8 s",
                clip: {
                    src: `${ASSET}/rec-departure.mp4`,
                    poster: `${ASSET}/rec-departure-poster.jpg`,
                    label: "Recording of the departure sequence in the prototype.",
                    caption:
                        'A split-flap board turns "after you land" into "before you fly", then an iris opens onto the trip.',
                } satisfies Clip,
                spec: [
                    { beat: "Press", what: "The Travel tile compresses before anything opens", timing: "90 ms" },
                    { beat: "Lockup", what: '"Travel Mode" arrives, rests, then settles', timing: "at 1,060 ms" },
                    { beat: "Problem", what: 'The board flaps up "After you land"', timing: "at 1,280 ms" },
                    { beat: "Hold", what: "The problem stays readable before the board turns", timing: "700 ms" },
                    { beat: "Answer", what: 'The board turns to "Before you fly" and sits there', timing: "850 ms" },
                    { beat: "Wipe", what: "An iris clears the frame onto the trip form", timing: "340 ms" },
                ] satisfies SpecRow[],
            },
            {
                title: "Review to confirmation",
                total: "about 2 s",
                clip: {
                    src: `${ASSET}/rec-confirmation.mp4`,
                    poster: `${ASSET}/rec-confirmation-poster.jpg`,
                    label: "Recording of the review to confirmation transition in the prototype.",
                    caption:
                        "The confirmation slides over the review, then the stamp lands and undershoots. That undershoot is the press.",
                } satisfies Clip,
                spec: [
                    { beat: "Push", what: "Confirmation slides over; review drops back 32% at 0.55 opacity", timing: "at 0" },
                    { beat: "Mark", what: "The confirmed mark draws", timing: "done by 740 ms" },
                    { beat: "Stamp", what: "Scale 1.55 to 1, rotate −16° to −7°, spring 380 / 17 / 0.9", timing: "at 780 ms" },
                    { beat: "Recoil", what: "The mark answers the hit", timing: "at 820 ms" },
                    { beat: "Title", what: "Your phone will work in Singapore", timing: "at 920 ms" },
                    { beat: "Timeline", what: "Now, 25th Aug, 2nd Sep draw down", timing: "at 1,060 ms" },
                    { beat: "Sheen", what: "One light pass across the stamp", timing: "at 1,300 ms, 620 ms" },
                    { beat: "Setup", what: "The checks and the help card", timing: "at 1,550 ms" },
                ] satisfies SpecRow[],
            },
            {
                title: "A day passes",
                total: "per day",
                clip: {
                    src: `${ASSET}/rec-dashboard.mp4`,
                    poster: `${ASSET}/rec-dashboard-poster.jpg`,
                    label: "Recording of the trip dashboard advancing from day 3 to day 8 in the prototype.",
                    caption:
                        "Day 3 to day 8. Minutes reset each midnight; texts and data run for the whole pack.",
                } satisfies Clip,
                spec: [
                    { beat: "Minutes", what: "Start again from the new day's allowance", timing: "each midnight" },
                    { beat: "Texts, data", what: "Keep running for the whole pack", timing: "cumulative" },
                    { beat: "Spend", what: "Counts to its figure", timing: "700 ms" },
                    { beat: "Unlimited", what: "The dotted line marches; still under reduced motion", timing: "1.1 s loop" },
                ] satisfies SpecRow[],
            },
        ],
        replacedLabel: "Three transitions I replaced",
        replaced: [
            {
                tag: "V1",
                h3: "A cross-fade into the trip.",
                body: "Both screens double-exposed at half opacity. Replaced by a clip-path reveal: the incoming screen is opaque from frame one, only the circle moves.",
            },
            {
                tag: "V2",
                h3: "Endings coloured from the hero artwork.",
                body: "A swappable asset deciding what a transition looks like. Now both wash to the screen white every root already is.",
            },
            {
                tag: "V3",
                h3: "A second, shorter piece for every tap after.",
                body: "Delightful once, a toll thereafter. I tried a half-version for repeat taps and cut that too. The set piece plays once a load; every tap after is a plain navigation, with nothing to get wrong.",
            },
        ],
        buildH3: "From Figma to something that runs",
        stats: [
            { value: "22 → 11", label: "Figma screens to routes. Most screens are states of one screen." },
            { value: "1.17 MB", label: "The scene-graph player I threw away. 2,790 positioned nodes, not one real input." },
            { value: "0", label: "Numbers typed twice. The reason sentence, day counts and ledger all compute from the trip." },
        ],
        buildBody:
            "The first build replayed the Figma file: pixel-perfect, and dead. Making it functional meant some things had to disagree with the file, so every departure is written down, including the one number that changes (GST) and three places the source contradicted itself. Fidelity is checked by dropping the exported PNG over the live screen in difference blend mode. Anything that moved lights up.",
        caughtLabel: "What running it caught",
        caughtIntro: "Running the prototype against real dates caught four things a static file never shows. Each is fixed in the code.",
        caught: [
            { lead: "Minutes that never reset.", body: "The meter said daily and behaved like a total for the whole trip." },
            { lead: "Day 1 of 10 beside Day 1 of 9.", body: "One counted pack days, the other trip days, and neither said which. Now every count names what it counts." },
            { lead: "\"Ends tomorrow\" two days early.", body: "The banner now reads the pack days left, the same arithmetic as the dashboard." },
            { lead: "An end date from the wrong thing.", body: "The pack-ended screen dated the end from the trip, not the pack." },
        ],
    },

    /* --------------------------------------------- how I'd know it worked */

    measures: {
        label: "Evidence",
        h2: "It never launched, so there are no results to show. This is what I would measure, and the first test I would run.",
        items: [
            {
                tag: "Primary",
                h3: "Packs bought before departure",
                body: "The share of roaming packs bought before she flies rather than after she lands. Asking for the trip first only works if it moves buying earlier.",
            },
            {
                tag: "Guardrail",
                h3: "Roaming calls to support, and bill disputes",
                body: "Per thousand travellers, especially the ones that start with why was I charged. Naming every cause should bring these down, not move them somewhere else.",
            },
            {
                tag: "Leading signal",
                h3: "The arrival banner, opened within the hour",
                body: "And the Live Activity kept on through the trip. If she opens it on landing and keeps it, the app is speaking at the right moment.",
            },
        ],
        firstTest: {
            lead: "The first test I would run:",
            body: "five people who travelled abroad this year, on the prototype, offline, starting from the not-connected state. Is the Travel tile found without a hint? Is the arrival screen understood by someone stressed and without signal? Does naming the cause of a charge stop the urge to call support?",
        },
    },

    tradeoffs: {
        label: "Trade-offs",
        h2: "Seven decisions I could have made differently, and what each one cost.",
        costLabel: "Gave up",
        items: [
            {
                title: "Travel as a tile, over a fifth nav tab.",
                body: "A tile can be selected for her on arrival.",
                cost: "permanence. A control that appears and disappears is harder to learn.",
            },
            {
                title: "Postpaid as the spine, over two parallel flows.",
                body: 'Building both in one month would have made neither good. Prepaid is a different emotional shape, not a variant: it pays at purchase, so the review becomes a payment; it holds packs for 30 days, not 365; it spends from a live balance during the trip; and it stops rather than slows when the allowance is gone. So its ended state is "calls and data have stopped", with incoming texts still free so bank OTPs reach her, and that said first.',
                cost: "prepaid depth. It is a documented divergence, not a designed path.",
            },
            {
                title: "Asking where and when, over keeping the flat list.",
                body: "The question confirms coverage and sizes the pack rather than filtering.",
                cost: "a little of the simplicity of one list for everyone.",
            },
            {
                title: "Marking figures as approximate, over showing them as exact.",
                body: "The screen admits it does not know exactly.",
                cost: "the feeling of precision. Less satisfying, and more honest than a number the bill will contradict.",
            },
            {
                title: "Retargeting the product grid to trip items.",
                body: "A gold loan is not what she wants in an arrivals hall.",
                cost: "cross-sell while she is abroad. Somebody's conversion target lives on that grid.",
            },
            {
                title: "Turn off roaming only where charges are uncapped.",
                body: "Shown in a healthy state it invites her to cut off her own OTPs to save a rate that resets at midnight.",
                cost: "a permanent emergency brake.",
            },
            {
                title: "Naming the cause of every charge, over showing a total.",
                body: "People are angry that nobody told them why, not about the amount.",
                cost: "a cleaner screen.",
            },
        ],
        unresolved: {
            lead: "One thing I could not resolve.",
            body: "Airtel's terms do not say whether an unactivated postpaid pack still appears on the bill if the trip never happens. I designed around what is published, and made cancelling self-serve instead of a phone queue. A production version needs the actual policy.",
        },
    },

    closer: {
        nextLabel: "What I would do next",
        nextH2: "This is the spine, not the product.",
        next: [
            {
                lead: "Finish the flows this design points at.",
                body: "Add days, add data, change a pack, turn voicemail off. Each is a chevron with nothing behind it.",
            },
            { lead: "Prepaid as a first-class flow.", body: "It deserves its own pass." },
        ],
        changedLabel: "What this project changed in me",
        changedPre: "The honest number is less satisfying than the exact one. ",
        changedHighlight: "It is the one the bill agrees with.",
        lessons: [
            "When I cannot reach users, the published constraints are the research.",
            "A confirmation is a record of what will happen and when, not a celebration.",
            "Motion is an argument or it is decoration.",
        ],
        // The same three lines the page opened with, so it ends where it began.
        ladder: MOVES.map((m) => m.line),
    },
};

export type AirtelData = typeof airtelData;
