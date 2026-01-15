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
        image?: string;
        imageAlt?: string;
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
        }>;
    };
    visualSystem: {
        heading: string;
        body: string;
        images: Array<{
            src: string;
            alt: string;
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
        body: string;
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
            "Enable quick and clear cybercrime reporting for the public",
            "Educate citizens on cyber threats and safe digital behaviour",
            "Maintain trust, seriousness, and compliance at a government level",
        ],
    },

    role: {
        heading: "My role",
        body: "Led the end-to-end design of the public website, working within strict Dubai Police brand, security, and accessibility guidelines. Responsible for information architecture, core user flows, visual direction, and overall usability under tight timelines.",
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
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
                imageAlt: "Reporting flow UI",
            },
            {
                title: "Education at scale",
                body: "Cybersecurity content was structured into clear, scannable topics to make complex risks understandable for non-technical users.",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
                imageAlt: "Education topics UI",
            },
            {
                title: "Assisted learning",
                body: "An AI-powered cyber assistant was introduced to help users ask questions and understand cyber risks conversationally, without navigating heavy content.",
                image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
                imageAlt: "AI assistant interaction",
            },
        ],
    },

    visualSystem: {
        heading: "Visual execution under guidelines",
        body: "The visual system strictly followed Dubai Police brand guidelines. AI-assisted image generation was used to scale illustrations quickly while maintaining consistency, seriousness, and cultural relevance.",
        images: [
            { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop", alt: "Illustration grid" },
            { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop", alt: "Hero variation" },
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
        heading: "What's evolving",
        body: "Ongoing work includes a dedicated kids portal, interactive education experiences, and continued improvements to reporting flows.",
    },
};
