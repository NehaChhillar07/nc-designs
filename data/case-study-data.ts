// Case Study Data for TexlaCulture HR System

export const texlacultureCaseStudy = {
    // Hero Section
    hero: {
        title: "Building Solutions, Not just HR Management Software",
        subtitle: "TexlaCulture",
        backgroundImage: "/case-study/texlaculture/hero-banner.png",
    },

    // Project Metadata
    metadata: {
        type: { label: "Type", value: "SaaS, Web & App Product" },
        sector: { label: "Sector", value: "HR Technology" },
        responsibility: { label: "Responsibility", value: "Brand / Design System / Product" },
        timeline: { label: "Timeline", value: "18 Months" },
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

    // Target Market
    targetMarket: {
        title: "Target Market",
        stats: [
            { label: "Serviceable Obtainable Market", value: "241.1 Million", companies: "1.1 Million Companies" },
            { label: "Serviceable Available Market", value: "344.45 Million", companies: "1.6 Million Companies" },
            { label: "Total Available Market", value: "24.25 billion", companies: "300 Million Companies" },
        ],
        summary: "1.1 Million Companies Startups, SME's, Large Enterprise",
    },

    // User Personas
    userPersonas: {
        title: "User Persona",
        personas: [
            { name: "Ronald Richards", role: "CHRO" },
            { name: "Arlene McCoy", role: "Hiring Manager" },
            { name: "Devon Lane", role: "Team Leader" },
            { name: "Jenny Wilson", role: "IT & Technology" },
            { name: "Jerome Bell", role: "Finance Manager" },
            { name: "Eleanor Pena", role: "HR Admin" },
            { name: "Jacob Jones", role: "Executive" },
            { name: "Leslie Alexander", role: "Learning Manager" },
        ],
        detailedPersona: {
            name: "Sarah Williams",
            role: "HR Manager at XYZ Company",
            age: "35 Years",
            background: "Sarah has been in HR for 12 years, holding a degree in Human Resources Management and various industry certifications.",
            approach: [
                "Proactive: Anticipates issues and addresses them early.",
                "Data-Driven: Relies on data for informed decisions.",
                "Employee-Centric: Focuses on employee satisfaction and engagement.",
            ],
            painPoints: [
                "Complex Navigation: Frustrated with the current system's inefficient navigation.",
                "Technical Jargon: Finds it hard to explain technical terms to non-HR staff.",
                "Customization Limits: Current tools lack flexibility for XYZ Company's needs.",
                "Coordination Delays: Time-consuming coordination with the product team for small requests.",
                "Employee Engagement: Struggles to effectively engage employees.",
            ],
            personality: ["Analytical", "Vibrant", "Empathetic", "Non-Tech", "Collaborative"],
            decisionPower: {
                decisionMaker: 5,
                actionDoer: 5,
                implementer: 3,
                user: 6,
            },
        },
    },

    // Navigation System
    navigationSystem: {
        title: "Navigation System",
        ideation: {
            title: "Ideation / Approachable design strategy",
            iteration: "Iteration 1",
            description: "Navigation bar has 4 major sections My Space, Team Space, HR Space, Admin. Each section has 10+ modules that can further expand with submodules.",
            problems: [
                "Making it difficult for them to quickly find and focus on the specific module or submodule",
                "Decreased productivity and user satisfaction",
            ],
        },
        finalized: {
            title: "Finalized Flow",
            description: "An overlay modal segregated into three modes: Employee Mode, HR Space, and Admin Mode, each consisting of individual module app icons.",
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
                title: "Efficiency",
                description: "20% of users had difficulty memorizing the product flow.",
            },
            {
                title: "Memorability",
                description: "Users were able to perform actions after understanding the product.",
            },
            {
                title: "Errors",
                description: "After gaining understanding, 8% of users still made errors while performing certain actions.",
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
    },

    // Hi-Fi Designs
    hifiDesigns: {
        title: "Hi-Fi Designs",
        credentials: {
            url: "https://dev.texlaculture.ai/",
            username: "24",
            password: "1234",
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
        title: "Human Firewall",
        category: "PRODUCT DESIGN · CYBERSECURITY · AI-DRIVEN SAAS",
        description: "AI-driven human risk management platform focused on identifying, reducing, and responding to human risk within organisations through awareness, simulations, and behavioural insights.",
        image: "/work/humanfirewall.svg",
        link: null,
        comingSoon: true,
        readingTime: "Coming Soon",
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
        readingTime: "12 mins",
    },
];
