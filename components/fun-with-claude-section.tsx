"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Highlighter } from "@/components/ui/highlighter";
import { DoodleLayer } from "@/components/fun-with-claude-doodle";
import { funWithClaudeData, type FunItem } from "@/data/fun-with-claude-data";

// ============================================
// A warm, scalable grid of small project cards — things designed in Claude
// Design and shipped for real in Claude Code. Stays on the site's restrained
// motion budget (fade-up on scroll, no bounce). Light warm panel sits between
// white Work above and the About section below.
// ============================================

const PANEL_BG = "linear-gradient(165deg,#ECE5DC,#E5DACE,#DCCFC1)";

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

export function FunWithClaudeSection() {
    const { eyebrow, heading, highlight, items } = funWithClaudeData;
    const [before, after] = heading.split(highlight);

    return (
        <div
            className="relative isolate rounded-[28px] border border-black/[0.06] px-6 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20"
            style={{ background: PANEL_BG }}
        >
            {/* Hidden marker-doodle layer — draws behind the content */}
            <DoodleLayer />
            {/* Header */}
            <motion.p {...fadeUp} className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500 mb-5">
                {eyebrow}
            </motion.p>
            <motion.h2
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.05 }}
                className="text-[30px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-medium tracking-tight text-gray-900 leading-[1.1]"
            >
                {before}
                <Highlighter action="underline" color="#FF9800" isView>
                    {highlight}
                </Highlighter>
                {after}
            </motion.h2>
            {/* Grid — scales as more products are added */}
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {items.map((item, i) => (
                    <FunCard key={item.id} item={item} index={i} />
                ))}
            </div>
        </div>
    );
}

function FunCard({ item, index }: { item: FunItem; index: number }) {
    return (
        <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 + index * 0.06 }}
            className="group"
        >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/[0.06] shadow-[0_16px_44px_-20px_rgba(0,0,0,0.28)]">
                <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                />
            </div>

            {/* Copy */}
            <div className="mt-4">
                <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-lg md:text-xl font-medium tracking-tight text-gray-900">
                        {item.title}
                    </h3>
                    <span
                        className="inline-block px-2 py-0.5 text-[13px]"
                        style={{
                            fontFamily: "var(--font-caveat), cursive",
                            color: "#fff",
                            background: item.accent,
                            borderRadius: "6px",
                            transform: "rotate(-3deg)",
                        }}
                    >
                        {item.tag}
                    </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.blurb}</p>
                <div className="mt-3 flex items-center gap-4 text-sm font-medium">
                    {item.liveHref && (
                        <a
                            href={item.liveHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 hover:opacity-70 transition-opacity"
                            style={{ textDecoration: "underline", textUnderlineOffset: "3px", textDecorationColor: item.accent }}
                        >
                            {item.liveLabel}
                        </a>
                    )}
                    {item.caseHref && (
                        <Link href={item.caseHref} className="text-gray-500 hover:text-gray-900 transition-colors">
                            {item.caseLabel}
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
