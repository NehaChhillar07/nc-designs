// ============================================
// Flashcard Training Builder Case Study Data
// All content is configurable — no hardcoded text in components
// Mirrors human-firewall-data.ts shape
// ============================================

export const flashcardTrainingCaseStudyData = {
    // Hero Section
    hero: {
        meta: "Micro-Training — InfoSec Ventures",
        title: "Moving security training out of a service queue and into the customer's hands",
        tags: "Enterprise SaaS · Cybersecurity · AI-Native Workflows",
        timeline: "2025",
        team: "Product, Eng, CS, Graphics",
        role: "Product Designer & Builder",
        caption: "Micro-Training Library — the self-serve home for AI-built flashcard training",
    },

    // Section 01 — The Starting Point
    startingPoint: {
        heading: "Training was the one thing nobody wanted to build,",
        headingSuffix: "and the one thing nobody could.",
        body: [
            "Inside Human Firewall, every phishing simulation ends with training. The user clicks the simulated email, lands on a page, and gets a course attached to it. Long video, long text, the usual format.",
            "People didn't finish it. Even after reminders, completion stayed low. The training felt forced, so people backed off.",
            "There was a second problem underneath that one. We didn't have a way to make these courses ourselves. We used a third-party tool to build them, exported the SCORM package, and showed it to the client. Customer Success and the graphics team did that work.",
        ],
        // HandoffTrail nodes — the slowness of the trail IS the point
        handoffTrail: [
            "Graphics",
            "Marketing",
            "Customer Success",
            "Client sign-off",
            "Assigned",
        ],
    },

    // Section 02 — What we were seeing
    whatWeSaw: {
        heading: "This came up as a real client-facing escalation,",
        headingSuffix: "not just a hunch.",
        body: [
            "This wasn't just something I noticed. It came up through the CTO, who handles client-facing escalations, as a recurring problem across accounts.",
            "I was also seeing it on the ground, chasing the status of a single course, asking the graphics team about posters, the marketing team about video, Customer Success about client sign-off. For one course.",
            "Admins on the client side wanted to do this themselves. They couldn't, because there was no tool to create a course and export a SCORM package. So they relied on us instead, and every handoff was a place for delay and miscommunication.",
        ],
        // BeforeWantedToggle — segmented control flips between two lists
        beforeState: {
            label: "How training got made",
            items: [
                "Built on a third-party tool",
                "CS and Graphics did the work",
                "Every change was a handoff",
                "Clients waited on us",
            ],
        },
        wantedState: {
            label: "What clients wanted",
            items: [
                "To build it themselves",
                "Without a ticket",
                "Without waiting",
                "On their own timeline",
            ],
        },
        pullQuote: "The problem wasn't the training. It was who the system forced to make it.",
    },

    // Section 03 — The shift
    theShift: {
        heading: "Move the work to the customer, and give",
        headingHighlight: "Customer Success their focus back",
        headingSuffix: ".",
        body: [
            "Course creation was one small part of a much bigger security job. It didn't need to take up a security team's attention, and it didn't need to sit with Customer Success either.",
            "So the goal became simple. Give clients the tool to do it themselves, let AI handle the heavy parts of making content, and free up Customer Success for the security work that actually needs them.",
        ],
        // AuthorityShift — token labeled "Course Creation" slides from CS → Client
        zones: {
            from: "Customer Success",
            to: "Client",
            token: "Course Creation",
        },
        pullQuote: "Course creation was one small task inside a much larger security job. AI could carry it. People shouldn't have to.",
    },

    // Section 04 — The format question
    formatQuestion: {
        heading: "Two ways to lift engagement.",
        headingSuffix: "We sequenced them, not killed one.",
        body: [
            "We looked at two ways to lift engagement: conversational training, where the end user talks to an AI that teaches the topic, and flashcard training, swipe-based cards like Duolingo.",
            "I built the conversational version to a full high-fidelity prototype in Cursor with Claude and tested it with real users. Engagement didn't move. Clients couldn't relate to it the way they related to a flashcard format they already understood.",
            "So we made a sequencing call. Flashcards first, because people connect with them immediately. Conversational stays on the roadmap as a second engagement bet, to revisit once the flashcard format proves out.",
        ],
        // DeferredBet — two paths: flashcard "now", conversational "later/roadmap"
        paths: {
            now: {
                label: "Flashcards",
                state: "Now",
                desc: "Familiar format. Tested. Shipping.",
            },
            later: {
                label: "Conversational",
                state: "On the roadmap",
                desc: "A second engagement bet, after flashcards prove out.",
            },
        },
    },

    // Section 05 — Why flashcards (CENTERPIECE: LiveFlashcardDemo)
    whyFlashcards: {
        heading: "I chose the format employees already knew",
        headingHighlight: "in their hands",
        headingSuffix: ".",
        body: [
            "When we tested card-based learning, the response was different. People were comfortable right away.",
            "Every employee being enrolled had used Duolingo or something like it. They already knew how cards work, so the format didn't get in the way. Swipe forward, swipe back, learning cards and quiz cards mixed, a few minutes instead of a long module.",
        ],
        demoCaption: "Try it — this is the format an employee actually sees.",
        // Real card content for the live demo
        cards: [
            {
                type: "learning",
                front: "Data Privacy isn't paperwork.",
                back: "It's the difference between trust and a public incident. Most breaches start with a small choice — a shared file, a forwarded email, a screenshot in a chat.",
                packLabel: "Data Privacy Essentials",
                image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80&auto=format&fit=crop",
            },
            {
                type: "learning",
                front: "What counts as personal data?",
                back: "Anything that can identify a person directly or in combination — name, email, employee ID, IP address, photo, even a desk location paired with a role.",
                packLabel: "Data Privacy Essentials",
                image: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=600&q=80&auto=format&fit=crop",
            },
            {
                type: "quiz",
                question: "A colleague asks you to share a customer's email over Slack. What's the safest move?",
                options: [
                    { text: "Share it — they're on the team", correct: false },
                    { text: "Ask why they need it, then share via the approved CRM", correct: true },
                    { text: "Forward the original email instead", correct: false },
                ],
                explanation: "Need-to-know plus the right channel. Slack isn't the record system; the CRM is.",
                packLabel: "Data Privacy Essentials",
                image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&q=80&auto=format&fit=crop",
            },
            {
                type: "learning",
                front: "AI tools and personal data.",
                back: "Pasting customer data into a public AI tool is the same as posting it on a forum. Use approved tools, or strip the identifiers before you ask.",
                packLabel: "AI Ethics",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80&auto=format&fit=crop",
            },
        ] as const,
        pullQuote: "I didn't pick flashcards because they were new. I picked them because people already knew how to use them.",
    },

    // Section 06 — I built it backwards first (SENIOR-READ SECTION)
    backwardsFirst: {
        heading: "I designed the end result first.",
        headingSuffix: "Then I had to undo it.",
        body: [
            "I approached this as an exploratory build, taking reference from Duolingo and other card-based learning apps to find the format that fit.",
            "My first approach was to design the end result first, how the learner would see and swipe the cards. I spent the first two or three days getting that experience right.",
            "Then I hit the problem. A finished-looking card is not an editable one. To let admins edit cards inline, and to reuse the card elsewhere in the product, I needed the opposite of what I had built.",
            "So I changed the order. I went back to the base and built each component and each section inside the card first, then rebuilt the preview on top of that. Building it component-first is also why the code could later be reused as a module inside Human Firewall 3.",
        ],
        // BackwardsToForwards — flip between two states of the same card
        states: {
            endResultFirst: {
                label: "End-result first",
                status: "Polished. Locked. Not reusable.",
                desc: "Looked done. Couldn't be edited. Couldn't be reused.",
            },
            baseFirst: {
                label: "Base first",
                status: "Editable. Reusable. Composable.",
                desc: "Three components — title, body, media — wired so the preview is just a rendering of the parts.",
            },
        },
        flipCaption: "Building it component-first is why the code could later live inside Human Firewall 3.",
        pullQuote: "A finished-looking card is not an editable one.",
    },

    // Section 07 — How it works
    howItWorks: {
        heading: "One studio. Three ways in.",
        headingSuffix: "Built for whoever the admin is that day.",
        bodyIntro: "Creation starts with three ways in, because not every admin wants to start the same way.",
        // ThreeWayEntry — three cards, expand on hover/tap
        entries: [
            {
                label: "With AI",
                tagline: "chat to design the training from scratch",
                detail: "The admin sets the tone of the content, generates cards, and keeps refining until they're happy with what it made.",
            },
            {
                label: "With Doc",
                tagline: "upload source material and generate cards from it",
                detail: "Drop in a policy doc or training script. The AI extracts the structure and proposes a card pack — the admin edits from there.",
            },
            {
                label: "From Scratch",
                tagline: "build manually, with AI on tap when needed",
                detail: "Full manual control. Quick AI generation for any single card on demand. Use it when you already know exactly what you want.",
            },
        ],
        toolbarNote: "The AI generates structure (front, back, impact, do-this, key terms, compliance), and a toolbar refines without restarting — add modules, include real-world scenarios, focus on specific regulations, create media, push to training cards.",
        pullQuote: "The AI isn't the product. The workflow is. AI is one participant in it.",
    },

    // Section 08 — AI prepares, the admin decides
    aiPrepares: {
        heading: "AI prepares the training.",
        headingHighlight: "The admin decides it ships",
        headingSuffix: ".",
        body: [
            "The AI does the work of structuring and drafting the cards. But nothing goes out until the admin pushes it.",
            "The admin reviews the cards, edits, and only then presses Push to Training Cards. The training gets structured, the cards get generated, and it saves to their library. The admin is the one who decides it's ready.",
        ],
        // ApproveToPublish — sequence the reader plays through
        publishSteps: [
            "Structuring modules",
            "Generating cards",
            "Saving to your library",
            "Published",
        ],
        publishCta: "Push to Training Cards",
        // Match HF's Automation / Authority paired-label treatment
        pairedLabels: {
            automation: { label: "Automation", value: "AI prepares" },
            authority: { label: "Authority", value: "Admin ships" },
        },
        pullQuote: "Generating a course is effort. Standing behind it is a decision. The first can be automated. The second can't.",
    },

    // Section 09 — Freedom inside the card
    freedomInside: {
        heading: "Enough freedom to make the card theirs.",
        headingSuffix: "Not enough to break it.",
        body: [
            "Everyone's design taste is different, so the card editor gives real control. Each card has three components: title, body, and media. You can long-press a component and drag it up or down to reorder it. Select any text and a styling toolbar shows up right above it. You can upload your own media.",
            "The freedom has a limit, and the limit explains itself. A line under the card says media takes space, text is limited to 200 characters, remove media for up to 500. The tradeoff is shown at the moment it matters, then it's the admin's call.",
        ],
        // MiniCardEditor — bounded freedom
        editorGuidance: "Media takes space. Text limited to 200 characters. Remove media for up to 500.",
        limitWithMedia: 200,
        limitWithoutMedia: 500,
        components: ["title", "body", "media"] as const,
        pullQuote: "Most tools either lock you in or let you overflow. I did neither — I explained the cost and let the admin choose.",
    },

    // Section 10 — Two different surfaces
    twoSurfaces: {
        heading: "The person building a course and the person taking one",
        headingHighlight: "are not in the same headspace",
        headingSuffix: ".",
        body: [
            "The admin building a course and the employee taking it aren't in the same headspace, so the two surfaces look different on purpose. The creator side is light and dense, built like a tool. The learner side is dark and calm, one card at a time. On mobile it's pure swipe — left, right, forward, back, however the user wants to move.",
        ],
        // SurfaceToggle — Creator (light, dense) vs Learner (dark, calm)
        surfaces: {
            creator: {
                label: "Creator",
                desc: "Light. Dense. Built like a tool.",
            },
            learner: {
                label: "Learner",
                desc: "Dark. Calm. One card at a time.",
            },
        },
        pullQuote: "Creation is a workspace. Learning is an experience. They shouldn't look the same.",
    },

    // Section 11 — Where it is now
    whereItIs: {
        heading: "Live on 10 enterprise clients,",
        headingHighlight: "inside Human Firewall 3",
        headingSuffix: ".",
        body: [
            "All of them use it regularly, enrolling their users with content personalised by role, designation, and level.",
            "It started as its own product, designed and built end to end, and the engineering team brought the code directly into HF3.",
        ],
        crossLinkText: "This format now closes the loop inside Human Firewall",
        crossLinkHref: "/case-study/human-firewall",
        pullQuote: "The work moved from a service queue to the customer. That was always the real design.",
    },

    // Section 12 — What I take from it (NO interaction — stillness)
    takeFromIt: {
        heading: "This was empathising, solving, testing, and deciding —",
        headingSuffix: "all in real time.",
        body: [
            "For me, this wasn't just thinking and decision-making.",
            "It was empathising in real time, finding a solution in real time, testing it in real time, and deciding whether it actually worked. With AI, all of that became possible to do quickly.",
        ],
    },
};

export type FlashcardTrainingData = typeof flashcardTrainingCaseStudyData;
