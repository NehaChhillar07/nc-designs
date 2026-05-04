// Case Study Data for TexlaCulture HR System

export const texlacultureCaseStudy = {
    // Hero Section
    hero: {
        meta: "TexlaCulture — HR Technology",
        title: "Building Solutions, Not just HR Management Software",
        subtitle: "TexlaCulture",
        tags: "SaaS · HR Technology · End-to-end Product Design",
        backgroundImage: "/case-study/texlaculture/hero-banner.png",
        timeline: "18 Months",
        team: "Founder, 2 Engineers, QA",
        role: "Brand / Design System / Product",
    },

    // Process Steps
    processSteps: [
        { number: 1, label: "Research" },
        { number: 2, label: "Problem" },
        { number: 3, label: "Approach" },
        { number: 4, label: "Architecture" },
        { number: 5, label: "LoFi Wireframes" },
        { number: 6, label: "User Testing" },
        { number: 7, label: "HiFi Designs & Development" },
    ],

    // Self-awareness intro — highest-ROI single edit per reviewer
    selfAwareness: {
        content: "This was my first end-to-end SaaS project. Looking back, I'd approach the persona work very differently — fewer composite personas, more grounded interview quotes. What I learned here directly informed the research approach in Human Firewall.",
    },

    // Brief Section
    brief: {
        title: "Brief",
        content: "TexlaCulture transformed the HR tech landscape with a complete DIY tool featuring easy policy configuration and a simpler design. Utilising the latest technology, the product enhances HR and employee engagement through personalised branding and themes. Within the first year, this customised, fully-fledged solution successfully acquired 12 customers and over 8,000 users globally.",
    },

    // Problem Statement
    problemStatement: {
        title: "Problem Statement",
        items: [
            "Common issues include complex navigation and technical jargon unrelated to HR tasks.",
            "Frequent frustration due to the need to go back and forth to complete single actions.",
            "Lack of customizable policy options leads to dissatisfaction and forced compromises.",
            "Existing products fail to meet HR professionals' needs for a user-friendly, human-centric design.",
            "HR Veterans fails to get a product that simplifies workflows and effectively engages employees.",
        ],
    },

    // User Research Testimonials
    testimonials: {
        headerText: "Identified several major pain points from HR experts currently using market HR management tools",
        quotes: [
            {
                name: "Robin Gill Ripu",
                role: "Ex-Head of Human Resources at Chaayos",
                quote: "\"It is extremely frustrating to go back and forth to complete a single action due to complex navigation in our daily tasks.\"",
                avatar: "/case-study/texlaculture/avatars/robin.png",
            },
            {
                name: "Sumeet Malik",
                role: "Product & Marketing at Chaayos",
                quote: "\"Over complicated flows makes it more difficult to get familiar with tool\"",
                avatar: "/case-study/texlaculture/avatars/sumeet.png",
            },
            {
                name: "Chandrakant Aggrawal",
                role: "Founder & HR Expert",
                quote: "\"Coordinating with the product team for small flow change requests causes delays in many of our day-to-day activities.\"",
                avatar: "/case-study/texlaculture/avatars/chandrakant.png",
            },
        ],
    },

    // Product Approach
    productApproach: {
        title: "Product Approach",
        subtitle: "After detailed qualitative research with HR veterans, we identified several key areas to address:",
        items: [
            {
                title: "DIY Tool",
                points: [
                    "Allows HRs to configure policies with ease.",
                    "Minimizes frustration and enhances user experience.",
                ],
            },
            {
                title: "Easy Navigation",
                points: [
                    "Simpler and more intuitive design to streamline navigation.",
                    "Reduces dependency on the product team and avoids delays in day-to-day activities.",
                ],
            },
            {
                title: "Latest Technology",
                points: [
                    "Keeps the product up-to-date and reliable for any kind of customization possible.",
                ],
            },
            {
                title: "Personalization",
                points: [
                    "Personalize their experience with their own branding and theme",
                    "Deeper connection with the product and increases usability",
                ],
            },
        ],
    },


    // Navigation System
    navigationSystem: {
        title: "Navigation System",
        ideation: {
            title: "Ideation / Approachable design strategy",
            iteration: "Iteration 1",
            description: "The original sidebar listed every module across all roles — Employee, HR, and Admin — in a single vertical scroll. An admin with full access saw 30+ tabs at once. There was no separation between what you needed as an employee versus what you needed as an admin.",
            problems: [
                "Finding the right module meant scrolling through irrelevant role-specific sections every time",
                "No role context — admins, HR managers, and employees all saw the same overwhelming wall of tabs",
            ],
        },
        finalized: {
            title: "Finalized Flow",
            description: "We moved to an overlay modal split into three modes: Employee, HR Space, and Admin. An admin who needs to check something as an employee simply switches mode — they see only what's relevant to that role. No more scrolling through a wall of tabs to find one action.",
            features: [
                "Search bar makes it easy to search with keywords.",
                "Pin app feature help users to access from side bar at any point of time.",
            ],
        },
        uxApproach: [
            "Side Panel with Icon labeling created more space for real content of product that matters to users most.",
            "To maximize screen width, Navigation can be hide",
            "Tool tip make it easy for users to remember what the icon denotes to",
            "Menu Option has segregated modes with search option",
            "Pin App allows users to select favourite and important app, that can be accessed anytime.",
        ],
        images: {
            iteration: "/case-study/texlaculture/navigation-iteration.png",
            finalized: "/case-study/texlaculture/navigation-finalized.png",
            video: "/case-study/texlaculture/navigation-demo.mp4",
        },
    },

    // Personalized Theme
    personalizedTheme: {
        title: "Personalized Theme",
        ideation: {
            title: "Ideation / Approachable design strategy",
            iteration: "Iteration 1",
            description: "Keep color theme open for user's to select as per the choice.",
            feedback: "During user testing, it was highlighted that HR professionals preferred a non-customizable interface, fixed to the brand's colors and design, to maintain consistency.",
        },
        finalized: {
            title: "Finalized Flow",
            description: "Create universal palette and shades of it as primary palette.",
            result: "Accordingly, Per client's need color will be change from admin setting and all user's will be engaged as per set brand's palette.",
        },
        uxApproach: [
            "Setting panel operation creates a themed space for user.",
            "Whether user want to use focus mode, or multi page mode.",
            "Dark & Light theme for personalized choices.",
            "System color theme set from admin setting that ensures an engagement between employees towards brands and give a feel of affinity.",
            "It enables usability and user screen time increase.",
        ],
    },

    // Ideation
    ideation: {
        title: "Ideation | Product Strategies.",
        description: "For ideation, strategizing, and product discussions, I prefer using pen and paper, a whiteboard, or sketching over any digital tools. This approach allows for a free flow of creativity, enabling countless possible ideas to emerge.",
        summary: "For both web and app development, I used this method for each module and submodule to understand, create solutions, finalize the flow, and determine possible features for MVP 1",
        image: "/work/3rd-case study/ideation-product.svg",
    },

    // Wireframes
    wireframes: {
        title: "Wireframes",
        images: [
            "/work/3rd-case study/wireframe-3rd.svg",
        ],
    },

    // Prototype Testing
    prototypeTesting: {
        description: "After creating high-fidelity designs, we prototyped each module for initial testing across multiple departments. This testing aimed to understand how quickly users could perform actions, identify if they needed assistance with any tasks, and uncover any concerns that arose during internal testing.",
        image: "/work/3rd-case study/explore.svg",
    },

    // Usability Testing
    usabilityTesting: {
        title: "Usability Testing",
        note: "Usability testing performed with out first 3 customers that were live implemented with all the modules, free of cost.",
        components: [
            {
                title: "Learnability",
                description: "Users found it easy to accomplish the basic functionality of the product. Users with experience using complex tools had a strong positive view of the product.",
            },
            {
                title: "Memorability",
                description: "Users were able to perform actions after understanding the product.",
            },
            {
                title: "Satisfaction",
                description: "Users were satisfied with how quickly tasks could be completed, experiencing no frustration.",
            },
        ],
    },

    // Challenge & Takeaway
    challengeTakeaway: {
        challenge: {
            title: "Challenge",
            content: "A key challenge in this project was prioritizing product development while ensuring designs remained aligned with user experience. Managing multiple modules and user flows simultaneously added complexity. Additionally, overseeing the development process to ensure adherence to the discussed flow and features was demanding.",
        },
        takeaway: {
            title: "Take away",
            content: "I learned the importance of thoroughly engaging with users during testing to gather valuable insights. Conducting user testing before development is crucial, as it significantly reduces the need for extensive iterations post-development. This approach ensures a more efficient and user-centered development process.",
        },
        collaboration: "The development team flagged the mode-segregated navigation overlay as complex to build within the sprint timeline. We agreed to ship the core three-mode structure first with basic search, deferring the pin-to-sidebar feature to a follow-up release. This let us validate the navigation model with real users before investing in the secondary interaction pattern.",
    },

    // Hi-Fi Designs
    hifiDesigns: {
        title: "Hi-Fi Designs",
        requestAccess: {
            label: "Request access to explore the live product",
            mailto: "mailto:neha.chhillar@gmail.com?subject=TexlaCulture%20Demo%20Access%20Request",
        },
        screens: [],
    },

    // Design System
    designSystem: {
        title: "Design System",
        description: "To establish a unified design system ensuring consistent user interface (UI) elements across both web and mobile applications, thereby enhancing overall product cohesion and user experience.",
        implementation: [
            "I Developed a comprehensive design system that included a library of reusable components, standardized color palettes, typography, and layout grids. Handed over the design system components to the development team.",
        ],
        note: "This collaborative approach ensured that both designers and developers were aligned, facilitating seamless integration of UI elements into the product.",
        image: "/work/3rd-case study/designsystme-3rd.svg",
    },
};

// Project data for ExploreMore component
export const otherProjects = [
    {
        id: 1,
        title: "Designing a Human Firewall Platform to Reduce Enterprise Human Risk",
        category: "Enterprise cybersecurity SaaS · Admin-heavy workflows",
        description: "End-to-End UX Architecture for Phishing Simulations, Training & AI-Assisted Risk Insights",
        image: "/work/humanfirewall.svg",
        link: "/case-study/human-firewall",
        readingTime: "8 mins",
    },
    {
        id: 2,
        title: "eCrime Hub | Dubai Police",
        category: "WEBSITE DESIGN · CYBERSECURITY · PUBLIC PLATFORM",
        description: "Public-facing cybersecurity platform designed to help citizens report cybercrime and learn about digital risks.",
        image: "/work/dp.svg",
        link: "/case-study/ecrime-hub",
        readingTime: "4 mins",
    },
    {
        id: 3,
        title: "TexlaCulture HRMS",
        category: "Product Design · End-to-end · SaaS",
        description: "Simplifying hiring, onboarding, and core people workflows for modern organizations.",
        image: "/work/texlaculture.svg",
        link: "/case-study/texlaculture",
        readingTime: "5 mins",
    },
];
