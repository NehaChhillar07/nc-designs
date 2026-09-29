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
// Writing index — a grid of compact cards, three across on desktop.
//
// This replaced full-width alternating rows, which spent a whole screen on a
// single post and would not have scaled past a handful. Cards keep the cover in
// its own frame with the title and dek underneath, rather than overlaying the
// title on the artwork: these covers are themselves typographic (numbered
// lists, pull quotes), so a headline on top would stack type on type and dim
// the art behind a scrim.
//
// Covers are letterboxed inside a fixed 2:1 frame rather than cropped to fill.
// The two current files are 2.14:1 and 1.875:1 and any crop tight enough to
// unify them would clip artwork that runs close to the edge — and every future
// cover would inherit that constraint.
//
// Restrained motion budget: fade-up on scroll, cloudy bloom + shadow lift on
// hover, title shade, and the read-time cursor tag.
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
            {/* Newest first — array order is display order, there is no sort. */}
            <div className="mt-8 grid gap-x-10 gap-y-5 sm:mt-14 sm:gap-y-16 sm:grid-cols-2 md:mt-16 md:gap-x-14 md:gap-y-20 lg:grid-cols-3 lg:gap-x-16">
                {posts.map((post, index) => (
                    <WritingCard
                        key={post.id}
                        post={post}
                        index={index}
                        onMouseEnter={() => handleMouseEnter(post)}
                        onMouseLeave={resetCursor}
                    />
                ))}
            </div>
        </section>
    );
}

function WritingCard({
    post,
    index,
    onMouseEnter,
    onMouseLeave,
}: {
    post: WritingPost;
    index: number;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}) {
    const content = (
        <div className="relative h-full">
            {/* Hover bloom — one soft cloud behind BOTH the cover and the text, so the
                card lifts as a single object rather than the image alone. Its own layer
                under the content, inert to the pointer. The long ease is the
                interaction: it drifts in rather than snapping. z-0 with the content at
                z-10, never a negative z-index, which would drop it behind the page
                background and render nothing. Reduced motion is handled globally in
                globals.css, which clamps every transition-duration. */}
            <div
                aria-hidden
                className="pointer-events-none absolute -inset-5 z-0 rounded-[36px] opacity-0 blur-2xl transition-opacity duration-700 ease-out group-hover:opacity-100"
                style={{
                    background:
                        "radial-gradient(60% 60% at 50% 50%, rgba(16,24,40,0.18) 0%, rgba(16,24,40,0.08) 45%, rgba(16,24,40,0) 78%)",
                }}
            />

            <div className="relative z-10 flex h-full items-center gap-4 sm:flex-col sm:items-stretch sm:gap-0">
                {/* Square cover slot, identical on every card. The artwork fills it
                    (object-cover), so the frame lives on the slot again. */}
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl border border-black/[0.06] bg-gray-50 shadow-[0_10px_30px_-16px_rgba(16,24,40,0.28)] transition-shadow duration-700 ease-out group-hover:shadow-[0_30px_70px_-24px_rgba(16,24,40,0.42)] sm:w-auto sm:rounded-2xl">
                    <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        sizes="(max-width: 639px) 96px, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        priority={index < 3}
                    />
                </div>

                <div className="min-w-0 sm:contents">
                <h3 className="text-[17px] sm:mt-6 sm:text-[21px] md:text-[23px] font-medium tracking-tight leading-[1.25] sm:leading-[1.18] text-gray-900 transition-colors group-hover:text-gray-600">
                    {post.title}
                </h3>
                <p className="hidden sm:block mt-3 text-[15px] md:text-base text-gray-600 leading-relaxed">
                    {post.description}
                </p>

                {/* Pushed to the bottom so the arrow lines up across cards whose titles
                    and deks run to different lengths. */}
                <span className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors group-hover:text-gray-900 sm:mt-auto sm:pt-6">
                    {post.comingSoon ? writingsData.comingSoonLabel : writingsData.readFallbackLabel}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </span>
                </div>
            </div>
        </div>
    );

    return (
        <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: Math.min(index, 3) * 0.06 }}
            className="h-full"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {post.link ? (
                <Link href={post.link} className="group block h-full">
                    {content}
                </Link>
            ) : (
                // No `group`: coming-soon cards stay inert since nothing is clickable
                <div className="h-full">{content}</div>
            )}
        </motion.div>
    );
}
