"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";
import { useCursor } from "@/components/ui/cursor-context";
import { writingsData, type WritingPost } from "@/data/writings-data";

// ============================================
// Editorial zigzag rows for writing: category eyebrow above a large
// thumbnail, big title overlapping the image edge, dek + circular arrow on
// the other side. Rows alternate image left/right by index. Thumbnails keep
// their file's actual aspect ratio. Restrained motion budget: fade-up on
// scroll, title shade + arrow-circle fill on hover, read-time cursor tag.
// ============================================

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

export function WritingsSection() {
    const { eyebrow, heading, highlight, posts } = writingsData;
    const [before, after] = heading.split(highlight);
    const { setCursor, resetCursor } = useCursor();

    // Reset cursor when the section unmounts (e.g. navigating away mid-hover)
    useEffect(() => {
        return () => {
            resetCursor();
        };
    }, [resetCursor]);

    const handleMouseEnter = (post: WritingPost) => {
        const tagText = post.comingSoon
            ? writingsData.comingSoonLabel
            : post.readingTime || writingsData.readFallbackLabel;
        setCursor("tag", tagText);
    };

    return (
        <section onMouseLeave={resetCursor}>
            {/* Header */}
            <motion.p {...fadeUp} className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500 mb-5">
                {eyebrow}
            </motion.p>
            <motion.h2
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.05 }}
                className="text-[30px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-medium tracking-tight text-gray-900 leading-[1.1] max-w-4xl"
            >
                {before}
                <Highlighter action="underline" color="#FF9800" isView>
                    {highlight}
                </Highlighter>
                {after}
            </motion.h2>
            {/* Rows — image alternates left/right by index, unless a post sets
                `reversed` explicitly. The override exists so reordering posts
                (newest first) does not silently flip an existing row. */}
            <div className="mt-14 md:mt-20 space-y-20 md:space-y-28">
                {posts.map((post, index) => (
                    <WritingRow
                        key={post.id}
                        post={post}
                        reversed={post.reversed ?? index % 2 === 1}
                        onMouseEnter={() => handleMouseEnter(post)}
                        onMouseLeave={resetCursor}
                    />
                ))}
            </div>
        </section>
    );
}

function WritingRow({
    post,
    reversed,
    onMouseEnter,
    onMouseLeave,
}: {
    post: WritingPost;
    reversed: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}) {
    // Only the IMAGE changes sides. Every text element stays left-aligned on every
    // row, because mirroring the text cost more than the rhythm was worth: a
    // right-aligned two-line dek gives each line an unpredictable starting edge, so
    // the eye has to hunt for the start of every line, and the eyebrow ended up
    // pinned to the far right above the image, detached from the title it labels.
    const content = (
        <div className="relative lg:grid lg:grid-cols-12 lg:items-center">
            {/* Hover bloom — one soft cloud behind BOTH the cover and the text, so the
                whole row lifts as a single object rather than the image alone. Sits on
                its own layer under the content and is inert to the pointer. The long
                ease is the interaction: it drifts in rather than snapping. Reduced
                motion is handled globally in globals.css, which clamps every
                transition-duration, so this becomes instant for those users. */}
            <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-6 -inset-y-10 z-0 rounded-[48px] opacity-0 blur-2xl transition-opacity duration-700 ease-out group-hover:opacity-100 md:-inset-x-12 md:-inset-y-14"
                style={{
                    background:
                        "radial-gradient(58% 58% at 50% 50%, rgba(16,24,40,0.16) 0%, rgba(16,24,40,0.07) 45%, rgba(16,24,40,0) 78%)",
                }}
            />

            {/* Thumbnail — actual aspect ratio of the file */}
            <div className={`relative z-10 lg:col-span-7 ${reversed ? "lg:order-2 lg:col-start-6" : ""}`}>
                <Image
                    src={post.image}
                    alt={post.imageAlt}
                    width={post.imageWidth}
                    height={post.imageHeight}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="w-full h-auto rounded-2xl border border-black/[0.06] shadow-[0_16px_44px_-20px_rgba(0,0,0,0.28)] transition-shadow duration-700 ease-out group-hover:shadow-[0_40px_100px_-30px_rgba(16,24,40,0.42)]"
                />
            </div>

            {/* Eyebrow + title + dek + arrow, as one block so the category label sits
                with the headline it belongs to. The title used to be pulled 128px over
                the thumbnail (lg:-ml-32 / lg:-mr-32); it is near-black text, so that
                only read when the cover happened to be light where the title landed,
                and the area needing to stay light grew as the viewport narrowed
                (~19% of the source image at 1440, ~26% at 1024) — not a constraint any
                cover can be designed around. Below lg everything stacks. */}
            <div
                className={`relative z-10 mt-6 lg:mt-0 lg:col-span-5 ${
                    reversed ? "lg:order-1 lg:col-start-1 lg:row-start-1 lg:pr-10" : "lg:pl-10"
                }`}
            >
                {/* Title and dek only. The category eyebrow and the read-time line are
                    deliberately not rendered — `category` and `readingTime` stay on the
                    data because the hover cursor still reads readingTime for its tag. */}
                <h3 className="text-[28px] sm:text-[36px] md:text-[44px] font-medium tracking-tight leading-[1.08] text-gray-900 group-hover:text-gray-600 transition-colors">
                    {post.title}
                </h3>
                <div className="mt-6 md:mt-8 flex items-start gap-5">
                    <span className="shrink-0 w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-900 group-hover:border-gray-900">
                        <ArrowRight className="w-5 h-5 text-gray-600 transition-colors duration-300 group-hover:text-white" />
                    </span>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md">
                        {post.description}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <motion.div {...fadeUp} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {post.link ? (
                <Link href={post.link} className="block group">
                    {content}
                </Link>
            ) : (
                // No `group`: coming-soon rows stay inert since nothing is clickable
                <div>{content}</div>
            )}
        </motion.div>
    );
}
