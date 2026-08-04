"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { lora, spaceGrotesk } from "@/components/case-study/fonts";

// ============================================
// Shared renderer for writing pages (/writing/*). Editorial reading layout
// with exactly TWO fonts (the stored writings pair — no Inter here):
//   Space Grotesk — title, section headings, eyebrow, date/read-time meta
//   Lora         — dek (italic) and body prose
// Narrow text measure, wider cover image. Restrained motion: fade-up only.
// ============================================

export type EssayBlock = { type: "p"; text: string } | { type: "h2"; text: string };

export type Essay = {
    meta: {
        title: string;
        description: string;
        url: string;
        ogImage: string;
    };
    title: string;
    dek: string;
    dateISO: string;
    dateDisplay: string;
    readTime: string;
    cover: string;
    coverAlt: string;
    // Real pixel size of the cover file. Omit only if it is 2400x1120 like the
    // first essay's — a wrong ratio renders stretched with no build or runtime
    // error, so pass the actual numbers whenever a cover is not that size.
    coverWidth?: number;
    coverHeight?: number;
    blocks: EssayBlock[];
};

const DEFAULT_COVER_WIDTH = 2400;
const DEFAULT_COVER_HEIGHT = 1120;

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const LORA = { fontFamily: "var(--font-lora), Georgia, serif" };
const GROTESK = { fontFamily: "var(--font-space-grotesk), sans-serif" };

export function EssayArticle({ essay }: { essay: Essay }) {
    return (
        <article className={`${lora.variable} ${spaceGrotesk.variable} px-4 sm:px-8`}>
            {/* Hero */}
            <header className="mx-auto max-w-[880px]">
                <motion.p
                    {...fadeUp}
                    className="text-sm font-medium uppercase tracking-[0.18em] mb-5"
                    style={GROTESK}
                >
                    <Link
                        href="/#writings"
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Writings
                    </Link>
                </motion.p>
                <motion.h1
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.05 }}
                    className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] max-w-[720px]"
                    style={GROTESK}
                >
                    {essay.title}
                </motion.h1>
                <motion.p
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.1 }}
                    className="mt-5 text-[19px] md:text-[21px] italic text-gray-600 leading-relaxed max-w-[640px]"
                    style={LORA}
                >
                    {essay.dek}
                </motion.p>
                <motion.p
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.15 }}
                    className="mt-6 text-sm text-gray-500"
                    style={GROTESK}
                >
                    <time dateTime={essay.dateISO}>{essay.dateDisplay}</time>
                    <span aria-hidden="true" className="mx-2">
                        ·
                    </span>
                    {essay.readTime}
                </motion.p>

                {/* Cover */}
                <motion.div
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.2 }}
                    className="mt-10 md:mt-12 relative rounded-2xl overflow-hidden border border-black/[0.06] shadow-[0_16px_44px_-20px_rgba(0,0,0,0.28)]"
                >
                    <Image
                        src={essay.cover}
                        alt={essay.coverAlt}
                        width={essay.coverWidth ?? DEFAULT_COVER_WIDTH}
                        height={essay.coverHeight ?? DEFAULT_COVER_HEIGHT}
                        sizes="(max-width: 920px) 100vw, 880px"
                        className="w-full h-auto"
                        priority
                    />
                </motion.div>
            </header>

            {/* Body */}
            <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                className="mx-auto max-w-[680px] mt-12 md:mt-16"
            >
                {essay.blocks.map((block, index) =>
                    block.type === "h2" ? (
                        <h2
                            key={index}
                            className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mt-12 md:mt-14 mb-5"
                            style={GROTESK}
                        >
                            {block.text}
                        </h2>
                    ) : (
                        <p
                            key={index}
                            className="text-[17px] md:text-[19px] text-gray-700 leading-[1.8] mb-6"
                            style={LORA}
                        >
                            {block.text}
                        </p>
                    )
                )}
            </motion.div>
        </article>
    );
}
