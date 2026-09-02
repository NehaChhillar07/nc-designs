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
        src: "/about/about-puppy-mountains.jpeg",
        alt: "With a puppy in the mountains",
        type: "image",
        aspectRatio: "3:4",
        frameType: "hero",
        rotation: -2,
    },
    {
        id: 2,
        src: "/about/about-yamuna-ghat.jpeg",
        alt: "At Yamuna Ghat",
        type: "image",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: 2,
    },
    {
        id: 3,
        src: "/about/about-with-june.jpeg",
        alt: "With June",
        type: "image",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: -1,
    },
    {
        id: 4,
        src: "/about/about-night-selfie.jpeg",
        alt: "Night selfie",
        type: "image",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: 3,
    },
    {
        id: 5,
        src: "/about/about-standing-pose.png",
        alt: "Standing pose",
        type: "image",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: -2,
    },
    {
        id: 6,
        src: "/about/about-auto-ride-selfie.jpeg",
        alt: "Auto ride",
        type: "image",
        aspectRatio: "3:4",
        frameType: "standard",
        rotation: -3,
    },
    {
        id: 7,
        src: "/about/about-mirror-selfie.jpeg",
        alt: "June close-up",
        type: "image",
        aspectRatio: "3:4",
        frameType: "standard",
        rotation: 2,
    },
    {
        id: 8,
        src: "/about/about-golden-hour-selfie.jpeg",
        alt: "Taj Mahal artwork",
        type: "image",
        aspectRatio: "9:16",
        frameType: "small",
        rotation: -1,
    },
    {
        id: 9,
        src: "/about/about-night-balcony-portrait.jpeg",
        alt: "Random selfie",
        type: "image",
        aspectRatio: "3:4",
        frameType: "standard",
        rotation: 3,
    },
    {
        id: 10,
        src: "/about/about-video-moment-1.mp4",
        alt: "Video moment",
        type: "video",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: 0,
    },
    {
        id: 11,
        src: "/about/about-video-moment-2.mp4",
        alt: "Video moment",
        type: "video",
        aspectRatio: "9:16",
        frameType: "tall",
        rotation: 0,
    },
    {
        id: 12,
        src: "/about/about-video-moment-3.mp4",
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

// ============================================
// SCROLL CHOREOGRAPHY CASTING
// Four square quadrant photos. bottomLeft ends up front-most in the
// stack and expands to fill the page — cast an image there whose
// subject survives a full-screen crop.
// `position` biases the square/full-page crop so faces stay in view.
// Everything not cast here appears in the strip below the text.
// ============================================

const byId = (id: number): AboutMedia => allAboutMedia.find(m => m.id === id)!;

export const aboutChoreography = {
    topLeft: { ...byId(4), position: "center 35%" }, // night selfie with June — face in upper half
    topRight: { ...byId(1), position: "center 30%" }, // with the puppy, warm daylight
    bottomLeft: { ...byId(6), position: "center 60%" }, // car-ride selfie — front image, expands full page; face low-center
    bottomRight: { ...byId(9), position: "center 60%" }, // night balcony portrait — face sits low
};

const choreographyIds = [
    aboutChoreography.topLeft.id,
    aboutChoreography.topRight.id,
    aboutChoreography.bottomLeft.id,
    aboutChoreography.bottomRight.id,
];

// Spread videos evenly between the images so they don't cluster at the end.
// Deterministic on purpose — a random shuffle would render differently on
// server and client and break hydration.
function mixMedia(media: AboutMedia[]): AboutMedia[] {
    const images = media.filter(m => m.type === "image");
    const videos = media.filter(m => m.type === "video");

    const mixed: AboutMedia[] = [];
    let taken = 0;
    videos.forEach((video, i) => {
        const groupSize = Math.ceil((images.length - taken) / (videos.length + 1 - i));
        mixed.push(...images.slice(taken, taken + groupSize), video);
        taken += groupSize;
    });
    mixed.push(...images.slice(taken));
    return mixed;
}

// Remaining media — shown as the moments strip below the about text
export const aboutStripMedia = mixMedia(allAboutMedia.filter(m => !choreographyIds.includes(m.id)));

// Legacy exports
export type AboutImage = AboutMedia;
export const aboutImages = allAboutMedia.filter(m => m.type === "image");

export const aboutHeading = "I'm Neha Chhillar";

export const aboutParagraphs = [
    "I prefer understanding things before reacting. I like noticing patterns, sitting with unclear ideas, and bringing structure to chaos. Messy problems don't overwhelm me. They make me curious.",
    "I learn through experiments rather than theory. Trying things and seeing what actually works matters more to me than assumptions. Outside work, I spend a lot of time with my dog, June. Being around her quietly, without words, is where I slow down and observe. That mindset shapes how I think about people and systems.",
];

// "Working with me" — three handwritten notes appended after the personal
// story (brief section 5, Block A). Rendered as taped paper notes in the
// Caveat hand, echoing the photo strip's rotated cards and the signature chip.
export const workingWithMe = {
    eyebrow: "Working with me",
    notes: [
        {
            lead: "I ramp fast.",
            text: "Week one, I get your product, your users, your market.",
            rotate: -2.5,
        },
        {
            lead: "You get Figma and code.",
            text: "A system with tokens, and a front end that runs.",
            rotate: 1.5,
        },
        {
            lead: "I write decisions, not updates.",
            text: "What I chose and why. No meeting needed.",
            rotate: -1.5,
        },
    ],
};
