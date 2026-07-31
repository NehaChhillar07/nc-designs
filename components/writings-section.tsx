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
            {/* Rows — image alternates left/right by index */}
            <div className="mt-14 md:mt-20 space-y-20 md:space-y-28">
                {posts.map((post, index) => (
                    <WritingRow
                        key={post.id}
                        post={post}
                        reversed={index % 2 === 1}
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
    const content = (
        <>
            {/* Eyebrow above the thumbnail */}
            <p
                className={`text-[12px] md:text-[13px] font-medium text-gray-500 uppercase tracking-[0.18em] mb-4 ${
                    reversed ? "lg:text-right" : ""
                }`}
            >
                {post.category}
            </p>

            <div className="lg:grid lg:grid-cols-12 lg:items-center">
                {/* Thumbnail — actual aspect ratio of the file */}
                <div className={`lg:col-span-7 ${reversed ? "lg:order-2 lg:col-start-6" : ""}`}>
                    <Image
                        src={post.image}
                        alt={post.imageAlt}
                        width={post.imageWidth}
                        height={post.imageHeight}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="w-full h-auto rounded-2xl border border-black/[0.06] shadow-[0_16px_44px_-20px_rgba(0,0,0,0.28)]"
                    />
                </div>

                {/* Title + dek + arrow. Title pulls into the image column on
                    desktop for the overlap; below lg everything stacks. */}
                <div
                    className={`relative z-10 mt-6 lg:mt-0 lg:col-span-5 ${
                        reversed ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""
                    }`}
                >
                    <h3
                        className={`text-[28px] sm:text-[36px] md:text-[44px] font-medium tracking-tight leading-[1.08] text-gray-900 group-hover:text-gray-600 transition-colors ${
                            reversed ? "lg:-mr-32 lg:text-right" : "lg:-ml-32"
                        }`}
                    >
                        {post.title}
                    </h3>
                    <div
                        className={`mt-6 md:mt-8 flex items-start gap-5 ${
                            reversed ? "lg:flex-row-reverse lg:text-right" : ""
                        } ${reversed ? "" : "lg:pl-8"}`}
                    >
                        <span className="shrink-0 w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-900 group-hover:border-gray-900">
                            <ArrowRight className="w-5 h-5 text-gray-600 transition-colors duration-300 group-hover:text-white" />
                        </span>
                        <div>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md">
                                {post.description}
                            </p>
                            {post.readingTime && !post.comingSoon && (
                                <p className="mt-3 text-sm font-medium text-gray-500">{post.readingTime}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
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
