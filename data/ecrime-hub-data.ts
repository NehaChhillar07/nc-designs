// ============================================
// eCrime Hub Case Study Data
// All content is configurable - no hardcoded text in components
// ============================================

export interface eCrimeHubData {
    hero: {
        meta: string;
        title: string;
        subtitle: string;
        tags: string;
    };
    context: {
        heading: string;
        body: string;
    };
    objective: {
        heading: string;
        items: string[];
    };
    role: {
        heading: string;
        body: string;
        highlights: string[];
        iaImage?: string;
        iaImageAlt?: string;
        userFlowImage?: string;
        userFlowImageAlt?: string;
        visualDirectionImage?: string;
        visualDirectionImageAlt?: string;
    };
    constraints: {
        heading: string;
        items: string[];
    };
    designApproach: {
        heading: string;
        sections: Array<{
            title: string;
            body: string;
            image?: string;
            imageAlt?: string;
            video?: string;
            secondImage?: string;
            secondImageAlt?: string;
        }>;
    };
    visualSystem: {
        heading: string;
        mainStatement: string;
        body: string;
        philosophy: string;
        images: Array<{
            src: string;
            alt: string;
            annotation: string;
        }>;
    };
    outcome: {
        heading: string;
        body: string;
    };
    learnings: {
        heading: string;
        items: string[];
    };
    evolving: {
        heading: string;
        mainStatement: string;
        body: string;
    };
    publicImpact: {
        header: {
            title: string;
            subtext: string;
        };
        officialLaunch: {
            body: string;
            media: { src: string; alt: string };
        };
        awarenessCampaigns: {
            bullets: string[];
            images: Array<{ src: string; alt: string }>;
        };
        ongoingEngagement: {
            body: string;
            subtext: string;
            mediaCluster: Array<{ src: string; alt: string; aspect: 'vertical' | 'square' | 'landscape' }>;
        };
        closingStatement: string;
    };
}

export const eCrimeHubCaseStudyData: eCrimeHubData = {
    hero: {
        meta: "eCrime Hub — Dubai Police",
        title: "A public cybersecurity website designed to help citizens report cybercrime and understand digital risks at a national scale.",
        subtitle: "",
        tags: "Public Platform · Cybersecurity · Government · AI-assisted Design",
    },

    context: {
        heading: "Why this existed",
        body: "Cybercrime incidents were rapidly increasing, accelerated by AI-driven attacks. Dubai Police needed a single, trusted public platform that could both enable cybercrime reporting and educate citizens on digital and human risks, without compromising clarity, authority, or trust.",
    },

    objective: {
        heading: "Objective",
        items: [
            "Simplify cybercrime reporting",
            "Educate citizens on digital risks",
            "Build public trust at scale",
        ],
    },

    role: {
        heading: "My role",
        body: "Led the end-to-end design of the public website, working within strict Dubai Police brand, security, and accessibility guidelines. Responsible for information architecture, core user flows, visual direction, and overall usability under tight timelines.",
        highlights: ["information architecture", "core user flows", "visual direction"],
        iaImage: "/work/2nd-case study/IA.png",
        iaImageAlt: "Information Architecture Diagram",
        userFlowImage: "/work/2nd-case study/user flow.png",
        userFlowImageAlt: "User Flow Diagram",
        visualDirectionImage: "",
        visualDirectionImageAlt: "",
    },

    constraints: {
        heading: "Constraints that shaped the design",
        items: [
            "Government-grade compliance and branding rules",
            "Highly sensitive and data-heavy content",
            "Multi-language public audience",
            "Accelerated delivery timeline",
        ],
    },

    designApproach: {
        heading: "Design approach",
        sections: [
            {
                title: "Reporting-first experience",
                body: "Reporting flows were designed to be linear, distraction-free, and easy to complete, especially for users under stress or urgency.",
                image: "/work/2nd-case study/passwords-page.png",
                imageAlt: "Education content page",
            },
            {
                title: "Education at scale",
                body: "Cybersecurity content was structured into clear, scannable topics to make complex risks understandable for non-technical users.",
                video: "/work/2nd-case study/content &.mp4",
            },
            {
                title: "Assisted learning",
                body: "An AI-powered cyber assistant was introduced to help users ask questions and understand cyber risks conversationally, without navigating heavy content.",
                video: "/work/2nd-case study/bot.mp4",
            },
        ],
    },

    visualSystem: {
        heading: "Visual system",
        mainStatement: "The website was designed as a three-level visual system to ensure consistency, scalability, and speed of execution under strict guidelines.",
        body: "The homepage establishes trust and orientation. Level-1 pages follow a shared layout to introduce major cybersecurity topics. Level-2 pages use a consistent structure to present detailed information, while Level-3 content pages inherit the same visual logic, allowing large volumes of content to scale without redesign.",
        philosophy: "Rather than designing dozens of unique pages, the focus was on three core visual templates. All remaining pages reuse these templates, with content dynamically replacing visuals while preserving hierarchy, clarity, and tone.",
        images: [
            {
                src: "/work/2nd-case study/layout.svg",
                alt: "Visual system layout",
                annotation: "Three core templates: Homepage, Topic pages (L1/L2), and Content pages (L3)"
            },
            {
                src: "/work/2nd-case study/content.svg",
                alt: "Level-1 page template",
                annotation: "Content-heavy L3 pages use consistent layout for easy comprehension"
            },
            {
                src: "/work/2nd-case study/illustration.svg",
                alt: "Level-2/3 content template",
                annotation: "AI-generated illustrations within Dubai Police brand guidelines"
            },
        ],
    },

    outcome: {
        heading: "Outcome",
        body: "The final website delivered a clear, trusted public experience that enabled cybercrime reporting, improved awareness, and supported Dubai Police's broader cybersecurity initiatives through education and prevention.",
    },

    learnings: {
        heading: "Learnings",
        items: [
            "Public trust products demand clarity over creativity",
            "Constraints accelerate better decisions when embraced early",
            "Education is a critical layer in cybersecurity, not an afterthought",
        ],
    },

    evolving: {
        heading: "",
        mainStatement: "The outcome was not a launch moment, but a system that continues to support the public over time.",
        body: "Ongoing work includes a dedicated kids portal, interactive education experiences, and continued improvements to reporting flows.",
    },

    publicImpact: {
        header: {
            title: "Public Launch & Ongoing Impact",
            subtext: "A brief overview of how the platform was introduced, adopted, and sustained at a public scale.",
        },
        officialLaunch: {
            body: "The platform was officially introduced through a public launch aligned with Dubai Police's cybersecurity initiatives. The focus was to establish trust, visibility, and a clear path for citizens to report and understand cybercrime.",
            media: {
                src: "/work/2nd-case study/launched.jpeg",
                alt: "Official launch event",
            },
        },
        awarenessCampaigns: {
            bullets: [
                "Awareness campaigns deployed across public spaces in Dubai",
                "High-visibility placements designed for immediate public access",
                "QR-led entry points connecting offline audiences to the platform",
            ],
            images: [
                { src: "/work/2nd-case study/1.jpeg", alt: "Awareness campaign 1" },
                { src: "/work/2nd-case study/2.jpeg", alt: "Awareness campaign 2" },
                { src: "/work/2nd-case study/3.jpeg", alt: "Awareness campaign 3" },
            ],
        },
        ongoingEngagement: {
            body: "Following launch, the platform became part of ongoing cybersecurity awareness efforts. Monthly quizzes, public education initiatives, and school programs were introduced to keep citizens informed as cyber threats continued to evolve.",
            subtext: "Engagement initiatives were designed for repeat participation rather than one-time interaction.",
            mediaCluster: [
                { src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop", alt: "Cybersecurity quiz creative", aspect: "vertical" },
                { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop", alt: "School awareness initiative", aspect: "square" },
                { src: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=400&fit=crop", alt: "Public digital content", aspect: "landscape" },
            ],
        },
        closingStatement: "The impact of the platform is measured through sustained public participation and trust, not short-term engagement metrics.",
    },
};
