// Data for the homepage "Writings" section.
// Repo rule: no hardcoded copy inside components — everything reads from this file.
//
// Editorial zigzag rows: thumbnail on one side, big title overlapping the
// image edge, dek + arrow on the other side. Rows alternate image left/right
// automatically by index — just append new posts to the array. Thumbnails
// render at their actual aspect ratio (pass the file's real pixel size).
// Only add readingTime once the piece is actually written — no invented
// numbers.

export type WritingPost = {
    id: string;
    title: string;
    category: string; // uppercase eyebrow above the thumbnail
    description: string;
    image: string; // thumbnail path under /public
    imageAlt: string;
    imageWidth: number; // actual pixel size of the file
    imageHeight: number;
    readingTime?: string; // e.g. "3 min read" — only on published posts
    link?: string; // external URL or internal path; omit while comingSoon
    comingSoon?: boolean;
};

export const writingsData = {
    eyebrow: "Writings",
    heading: "Notes from the messy middle.",
    highlight: "messy middle", // underlined by the Highlighter
    comingSoonLabel: "Coming Soon",
    readFallbackLabel: "Read",
    posts: [
        {
            id: "first-designer",
            title: "What being the first designer really costs you",
            category: "Career",
            description:
                "Being the first designer is two jobs wearing one title. You get judged on one of them.",
            image: "/writing/first-designer-cover.png",
            imageAlt:
                "A solid navy card reading \"The job you're hired for.\" next to gray text fading out that reads \"The job nobody names.\"",
            imageWidth: 2400,
            imageHeight: 1120,
            readingTime: "3 min read",
            link: "/writing/first-designer",
        },
    ] as WritingPost[],
};

export type WritingsData = typeof writingsData;
