// ============================================
// ABOUT SECTION DATA - Images and text content
// ============================================

export interface AboutMedia {
    id: number;
    src: string;
    alt: string;
    type: "image" | "video";
    aspectRatio: "3:4" | "9:16" | "4:3" | "16:9";
    frameType: "hero" | "tall" | "standard" | "small";
    rotation: number;
}

// All available media files in public/about/
export const allAboutMedia: AboutMedia[] = [
    {
        id: 1,
        src: "/about/IMG_0873.jpeg",
        alt: "With a puppy in the mountains",
        type: "image",
        aspectRatio: "3:4",
        frameType: "hero",
        rotation: -2,
    },
    {
        id: 2,
        src: "/about/IMG_9198.jpeg",
        alt: "At Yamuna Ghat",
        type: "image",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: 2,
    },
    {
        id: 3,
        src: "/about/IMG_9318.jpeg",
        alt: "With June",
        type: "image",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: -1,
    },
    {
        id: 4,
        src: "/about/IMG_7742.jpeg",
        alt: "Night selfie",
        type: "image",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: 3,
    },
    {
        id: 5,
        src: "/about/IMG_7595.png",
        alt: "Standing pose",
        type: "image",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: -2,
    },
    {
        id: 6,
        src: "/about/WhatsApp%20Image%202026-01-10%20at%2000.40.34.jpeg",
        alt: "Auto ride",
        type: "image",
        aspectRatio: "3:4",
        frameType: "standard",
        rotation: -3,
    },
    {
        id: 7,
        src: "/about/WhatsApp%20Image%202026-01-10%20at%2000.42.31.jpeg",
        alt: "June close-up",
        type: "image",
        aspectRatio: "3:4",
        frameType: "standard",
        rotation: 2,
    },
    {
        id: 8,
        src: "/about/WhatsApp%20Image%202026-01-10%20at%2000.44.34.jpeg",
        alt: "Taj Mahal artwork",
        type: "image",
        aspectRatio: "9:16",
        frameType: "small",
        rotation: -1,
    },
    {
        id: 9,
        src: "/about/WhatsApp%20Image%202026-01-10%20at%2000.46.18.jpeg",
        alt: "Random selfie",
        type: "image",
        aspectRatio: "3:4",
        frameType: "standard",
        rotation: 3,
    },
    {
        id: 10,
        src: "/about/IMG_0765.mp4",
        alt: "Video moment",
        type: "video",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: 0,
    },
    {
        id: 11,
        src: "/about/IMG_7672.mp4",
        alt: "Video moment",
        type: "video",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: 0,
    },
    {
        id: 12,
        src: "/about/IMG_8363.mp4",
        alt: "Video moment",
        type: "video",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: 0,
    },
];

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Get a curated selection of media for the gallery
export function getRandomAboutMedia(): AboutMedia[] {
    const heroes = allAboutMedia.filter(m => m.frameType === "hero");
    const talls = allAboutMedia.filter(m => m.frameType === "tall");
    const standards = allAboutMedia.filter(m => m.frameType === "standard");
    const smalls = allAboutMedia.filter(m => m.frameType === "small");

    const shuffledHeroes = shuffleArray(heroes);
    const shuffledTalls = shuffleArray(talls);
    const shuffledStandards = shuffleArray(standards);
    const shuffledSmalls = shuffleArray(smalls);

    const selection: AboutMedia[] = [];

    if (shuffledHeroes.length > 0) {
        selection.push({ ...shuffledHeroes[0], id: 1 });
    }

    const tallVideos = shuffledTalls.filter(m => m.type === "video");
    const tallImages = shuffledTalls.filter(m => m.type === "image");

    if (tallVideos.length > 0) {
        selection.push({ ...tallVideos[0], id: 2 });
    }
    selection.push(...tallImages.slice(0, tallVideos.length > 0 ? 2 : 3).map((m, i) => ({ ...m, id: 3 + i })));

    selection.push(...shuffledStandards.slice(0, 3).map((m, i) => ({ ...m, id: 6 + i })));

    const remaining = [...shuffledSmalls, ...shuffledStandards.slice(3)];
    selection.push(...remaining.slice(0, 2).map((m, i) => ({ ...m, id: 9 + i })));

    return selection;
}

// Legacy exports
export type AboutImage = AboutMedia;
export const aboutImages = allAboutMedia.filter(m => m.type === "image");

export const aboutHeading = "I'm Neha Chhillar";

export const aboutParagraphs = [
    "I prefer understanding things before reacting. I like noticing patterns, sitting with unclear ideas, and bringing structure to chaos. Messy problems don't overwhelm me. They make me curious.",
    "I learn through experiments rather than theory. Trying things and seeing what actually works matters more to me than assumptions. Outside work, I spend a lot of time with my dog, June. Being around her quietly, without words, is where I slow down and observe. That mindset shapes how I think about people and systems.",
];
