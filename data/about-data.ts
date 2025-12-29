// ============================================
// ABOUT SECTION DATA - Images and text content
// ============================================

export interface AboutImage {
    id: number;
    src: string;
    alt: string;
    aspectRatio: "3:4" | "4:5" | "1:1" | "4:3" | "16:10";
    size: "small" | "medium" | "large";
    rotation: number;
}

export const aboutImages: AboutImage[] = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
        alt: "Portrait",
        aspectRatio: "3:4",
        size: "large",
        rotation: -2,
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        alt: "Workspace",
        aspectRatio: "4:3",
        size: "medium",
        rotation: 3,
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=500&fit=crop",
        alt: "June the dog",
        aspectRatio: "1:1",
        size: "small",
        rotation: -3,
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500&h=500&fit=crop",
        alt: "Coffee moment",
        aspectRatio: "1:1",
        size: "small",
        rotation: 2,
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop",
        alt: "Candid",
        aspectRatio: "3:4",
        size: "medium",
        rotation: -2,
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop",
        alt: "Desk setup",
        aspectRatio: "16:10",
        size: "medium",
        rotation: 1,
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop",
        alt: "Portrait 2",
        aspectRatio: "3:4",
        size: "medium",
        rotation: 2,
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop",
        alt: "Minimal moment",
        aspectRatio: "1:1",
        size: "small",
        rotation: -1,
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        alt: "Creative work",
        aspectRatio: "4:3",
        size: "medium",
        rotation: 3,
    },
    {
        id: 10,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
        alt: "Detail",
        aspectRatio: "1:1",
        size: "small",
        rotation: -2,
    },
];

export const aboutHeading = "I'm Neha Chhillar";

export const aboutParagraphs = [
    "I prefer understanding things before reacting. I like noticing patterns, sitting with unclear ideas, and bringing structure to chaos. Messy problems don't overwhelm me. They make me curious.",
    "I learn through experiments rather than theory. Trying things and seeing what actually works matters more to me than assumptions. Outside work, I spend a lot of time with my dog, June. Being around her quietly, without words, is where I slow down and observe. That mindset shapes how I think about people and systems.",
];
