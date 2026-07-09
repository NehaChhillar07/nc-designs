"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Highlighter } from "@/components/ui/highlighter";
import { unsaidData } from "@/data/unsaid-data";
import { lora, spaceGrotesk } from "@/components/case-study/unsaid/fonts";
import { WorldToggleDemo } from "@/components/case-study/unsaid/WorldToggleDemo";
import { SwipeCardDemo } from "@/components/case-study/unsaid/SwipeCardDemo";
import { FeltBurstDemo } from "@/components/case-study/unsaid/FeltBurstDemo";

// ============================================
// ANIMATION — slow, natural, no bounce (matches the rest of the site)
// ============================================
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};
const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

const d = unsaidData;

// unsaid palette (flavor layered over the portfolio's editorial base)
const WARM = "#B06A48";
const WARM_DEEP = "#9C5A3C";
const CREAM = "#F1E9DF";
const CREAM_SOFT = "rgba(241,233,223,0.72)";
const CREAM_FAINT = "rgba(241,233,223,0.5)";
const THRESHOLD = "#1A1512";
const ORANGE = "#FF9800";
const HERO_BG =
    "radial-gradient(125% 120% at 50% 32%,#241D18 0%,#1A1512 54%,#110D0B 100%)";
const HL_GREEN = "#9FE8C6";
const HL_ORANGE = "#FFD79A";

const caveat = { fontFamily: "var(--font-caveat), cursive" } as const;
const serif = { fontFamily: "var(--font-lora), serif" } as const;
const grotesk = { fontFamily: "var(--font-space-grotesk), sans-serif" } as const;

// Convert *asterisk* emphasis inside data strings into <em>.
function withEmphasis(text: string): ReactNode {
    return text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
            <em key={i} className="italic text-gray-900">
                {part.slice(1, -1)}
            </em>
        ) : (
            <span key={i}>{part}</span>
        )
    );
}

function MaskIcon({ size = 26, color = WARM }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color }}>
            <path
                d="M5 4h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-7l-4.5 3.5V16H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"
                fill="currentColor"
                fillOpacity="0.16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <circle cx="8" cy="10" r="1.15" fill="currentColor" />
            <circle cx="12" cy="10" r="1.15" fill="currentColor" />
            <circle cx="16" cy="10" r="1.15" fill="currentColor" />
        </svg>
    );
}

function SectionLabel({ number, title, dark = false }: { number: string; title: string; dark?: boolean }) {
    return (
        <motion.div {...fadeInUp} className="mb-6 flex items-center gap-3">
            <span style={{ ...caveat, color: dark ? WARM : ORANGE }} className="text-2xl font-bold leading-none">
                {number}
            </span>
            <span
                className="text-xs font-semibold uppercase tracking-[0.14em]"
                style={{ color: dark ? CREAM_FAINT : "#9ca3af" }}
            >
                {title}
            </span>
        </motion.div>
    );
}

function H2({ pre, highlight, post, color, className = "" }: { pre: string; highlight?: string; post?: string; color?: string; className?: string }) {
    return (
        <motion.h2
            {...fadeInUp}
            className={`mb-6 max-w-3xl text-2xl font-medium leading-tight tracking-tight text-gray-900 md:text-[2.1rem] ${className}`}
        >
            {pre}
            {highlight && (
                <Highlighter action="highlight" color={color ?? HL_GREEN} isView>
                    {highlight}
                </Highlighter>
            )}
            {post}
        </motion.h2>
    );
}

function Body({ items, className = "" }: { items: readonly string[]; className?: string }) {
    return (
        <motion.div {...fadeInUp} className={`max-w-3xl text-[1.05rem] leading-relaxed text-gray-600 ${className}`}>
            {items.map((p, i) => (
                <p key={i} className="mb-4 last:mb-0">
                    {withEmphasis(p)}
                </p>
            ))}
        </motion.div>
    );
}

function PullQuote({ children }: { children: ReactNode }) {
    return (
        <motion.blockquote
            {...fadeInUp}
            className="my-10 max-w-3xl border-l-[3px] pl-6 text-xl italic leading-snug text-gray-900/80 md:text-[1.7rem]"
            style={{ ...serif, borderColor: WARM }}
        >
            {children}
        </motion.blockquote>
    );
}

const wrap = "mx-auto max-w-3xl px-6";
const wrapWide = "mx-auto max-w-5xl px-6";
const sectionPad = "py-16 md:py-24";

export function UnsaidCaseStudy() {
    return (
        <article className={`${lora.variable} ${spaceGrotesk.variable} bg-white`}>
            {/* ============ HERO — dark threshold band ============ */}
            <header className="overflow-hidden pt-28 pb-20 text-center md:pt-36 md:pb-24" style={{ background: HERO_BG, color: CREAM }}>
                <div className={wrapWide}>
                    <motion.span
                        {...fadeInUp}
                        className="inline-block rounded-full px-3 py-0.5 text-xl font-bold"
                        style={{ ...caveat, color: ORANGE, background: "rgba(255,152,0,0.1)", transform: "rotate(-2deg)" }}
                    >
                        {d.hero.eyebrow}
                    </motion.span>

                    <motion.div
                        initial={fadeInUp.initial}
                        whileInView={fadeInUp.whileInView}
                        viewport={fadeInUp.viewport}
                        transition={{ ...fadeInUp.transition, delay: 0.1 }}
                        className="mt-6 inline-flex items-center gap-2"
                    >
                        <MaskIcon color={CREAM} />
                        <span className="text-[1.4rem] font-bold" style={{ ...grotesk, color: CREAM }}>
                            {d.hero.brand}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={fadeInUp.initial}
                        whileInView={fadeInUp.whileInView}
                        viewport={fadeInUp.viewport}
                        transition={{ ...fadeInUp.transition, delay: 0.15 }}
                        className="mx-auto mt-6 max-w-3xl text-3xl font-light leading-tight tracking-tight md:text-5xl"
                        style={{ color: CREAM }}
                    >
                        {d.hero.h1Pre}
                        <Highlighter action="underline" color={ORANGE} isView>
                            <span style={{ ...serif, fontStyle: "italic", fontWeight: 500 }}>{d.hero.h1Highlight}</span>
                        </Highlighter>
                    </motion.h1>

                    <motion.p
                        initial={fadeInUp.initial}
                        whileInView={fadeInUp.whileInView}
                        viewport={fadeInUp.viewport}
                        transition={{ ...fadeInUp.transition, delay: 0.2 }}
                        className="mx-auto mt-6 max-w-xl text-[1.05rem]"
                        style={{ color: CREAM_SOFT }}
                    >
                        {d.hero.sub}
                    </motion.p>

                    <motion.div
                        initial={fadeInUp.initial}
                        whileInView={fadeInUp.whileInView}
                        viewport={fadeInUp.viewport}
                        transition={{ ...fadeInUp.transition, delay: 0.25 }}
                        className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-10"
                    >
                        {d.hero.metaRow.map((m) => (
                            <div key={m.label} className="text-left">
                                <div className="mb-1 text-[0.72rem] uppercase tracking-[0.12em]" style={{ color: CREAM_FAINT }}>
                                    {m.label}
                                </div>
                                <div className="text-[0.95rem] font-medium" style={{ color: CREAM }}>
                                    {m.value}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={fadeInUp.initial}
                        whileInView={fadeInUp.whileInView}
                        viewport={fadeInUp.viewport}
                        transition={{ ...fadeInUp.transition, delay: 0.3 }}
                        className="mt-10"
                    >
                        <Link
                            href={d.hero.liveHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-medium transition-colors hover:bg-white/10"
                            style={{ color: CREAM, border: "1px solid rgba(241,233,223,0.4)" }}
                        >
                            {d.hero.liveLabel}
                        </Link>
                    </motion.div>

                    {/* phone + handwritten note */}
                    <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.4 }} className="relative mx-auto mt-16 w-[min(280px,72vw)]">
                        <div
                            className="overflow-hidden rounded-[34px]"
                            style={{ boxShadow: "0 30px 80px rgba(0,0,0,.5)", border: "1px solid rgba(241,233,223,.08)" }}
                        >
                            <Image
                                src={d.hero.image}
                                alt={d.hero.imageAlt}
                                width={1020}
                                height={1910}
                                priority
                                className="h-auto w-full"
                            />
                        </div>
                        <p
                            className="mt-6 text-center text-lg font-semibold leading-tight lg:absolute lg:left-[calc(100%+1.5rem)] lg:top-[44%] lg:mt-0 lg:w-40 lg:-translate-y-1/2 lg:text-left"
                            style={{ ...caveat, color: ORANGE, transform: "rotate(-3deg)" }}
                        >
                            {d.hero.annotation} <span className="lg:hidden">↙</span>
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* ============ 01 ORIGIN ============ */}
            <section className={sectionPad}>
                <div className={wrap}>
                    <SectionLabel number={d.origin.number} title={d.origin.title} />
                    <H2 pre={d.origin.h2Pre} highlight={d.origin.h2Highlight} post={d.origin.h2Post} />
                    <Body items={d.origin.body} />
                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        <motion.div {...fadeInUp} className="rounded-2xl border border-gray-200 p-6 text-gray-400">
                            <span className="mb-2 block text-lg" style={{ color: WARM }}>✕</span>
                            <span className="line-through">{d.origin.compare.faded}</span>
                        </motion.div>
                        <motion.div
                            initial={fadeInUp.initial}
                            whileInView={fadeInUp.whileInView}
                            viewport={fadeInUp.viewport}
                            transition={{ ...fadeInUp.transition, delay: 0.12 }}
                            className="rounded-2xl border-2 border-gray-900 p-6"
                        >
                            <span className="mb-2 block text-lg" style={{ color: WARM }}>✓</span>
                            <span className="text-gray-900">{d.origin.compare.bold}</span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============ 02 INVARIANT ============ */}
            <section className={`${sectionPad} bg-gray-50`}>
                <div className={wrap}>
                    <SectionLabel number={d.invariant.number} title={d.invariant.title} />
                    <H2 pre={d.invariant.h2} />
                    <Body items={d.invariant.body} />
                    <PullQuote>{d.invariant.pullQuote}</PullQuote>
                    <div className="max-w-2xl">
                        {d.invariant.deleted.map((row, i) => (
                            <motion.div
                                key={row.item}
                                initial={fadeInUp.initial}
                                whileInView={fadeInUp.whileInView}
                                viewport={fadeInUp.viewport}
                                transition={{ ...fadeInUp.transition, delay: i * 0.08 }}
                                className="flex items-baseline gap-3 border-b border-dashed border-gray-200 py-3"
                            >
                                <span className="font-bold" style={{ color: WARM }}>✕</span>
                                <span className="font-semibold text-gray-900">{row.item}</span>
                                <span className="ml-auto text-right text-[1.05rem] text-gray-400" style={caveat}>
                                    {row.note}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ 03 TWO WORLDS (demo 1) ============ */}
            <section className={sectionPad}>
                <div className={wrap}>
                    <SectionLabel number={d.worlds.number} title={d.worlds.title} />
                    <H2 pre={d.worlds.h2} />
                    <Body items={d.worlds.body} />
                    <motion.div {...fadeInUp}>
                        <WorldToggleDemo caption={d.worlds.caption} />
                    </motion.div>
                </div>
            </section>

            {/* ============ 04 THE FEEL (demos 2 & 3 + images) ============ */}
            <section className={`${sectionPad} bg-gray-50`}>
                <div className={wrapWide}>
                    <div className="mx-auto max-w-3xl">
                        <SectionLabel number={d.feel.number} title={d.feel.title} />
                        <H2 pre={d.feel.h2Pre} highlight={d.feel.h2Highlight} post={d.feel.h2Post} />
                        <Body items={[d.feel.intro]} />
                    </div>

                    {d.feel.blocks.map((b) => (
                        <div
                            key={b.label}
                            className={`mt-14 grid items-center gap-8 md:grid-cols-2 md:gap-14 ${b.reversed ? "md:[&>*:first-child]:order-2" : ""}`}
                        >
                            <motion.div {...fadeInUp}>
                                <div className="mb-2 text-[0.8rem] font-semibold uppercase tracking-[0.1em]" style={{ ...grotesk, color: WARM }}>
                                    {b.label}
                                </div>
                                <h3 className="mb-2 text-xl font-medium text-gray-900">{b.h3}</h3>
                                <p className="max-w-md text-[1rem] leading-relaxed text-gray-600">{b.body}</p>
                                <span className="mt-4 inline-block text-lg font-semibold" style={{ ...caveat, color: ORANGE }}>
                                    {b.annotation}
                                </span>
                            </motion.div>

                            <motion.div {...fadeIn} className="flex justify-center">
                                {b.demo === "swipe" && <SwipeCardDemo cards={d.swipeCards} />}
                                {b.demo === "felt" && <FeltBurstDemo />}
                                {b.image && (
                                    <div
                                        className="w-full max-w-[230px] overflow-hidden rounded-[28px]"
                                        style={{ boxShadow: "0 24px 60px rgba(59,51,43,.16)", border: "1px solid #e5e7eb" }}
                                    >
                                        <Image src={b.image} alt={b.imageAlt ?? ""} width={1020} height={1910} className="h-auto w-full" />
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ 05 SAFETY ============ */}
            <section className={sectionPad}>
                <div className={wrap}>
                    <SectionLabel number={d.safety.number} title={d.safety.title} />
                    <H2 pre={d.safety.h2} />
                    <Body items={d.safety.body} />
                    <PullQuote>{d.safety.pullQuote}</PullQuote>
                    <motion.div {...fadeInUp} className="flex flex-wrap gap-2">
                        {d.safety.chips.map((c) => (
                            <span key={c} className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-600">
                                {c}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ============ 06 SAMPLE SPILLS (dark) ============ */}
            <section className={sectionPad} style={{ background: THRESHOLD, color: CREAM }}>
                <div className={wrap}>
                    <SectionLabel number={d.register.number} title={d.register.title} dark />
                    <motion.h2 {...fadeInUp} className="mb-6 max-w-3xl text-2xl font-medium leading-tight tracking-tight md:text-[2.1rem]" style={{ color: CREAM }}>
                        {d.register.h2}
                    </motion.h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {d.register.cards.map((c, i) => (
                            <motion.div
                                key={c.role}
                                initial={fadeInUp.initial}
                                whileInView={fadeInUp.whileInView}
                                viewport={fadeInUp.viewport}
                                transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                                className="rounded-[22px] p-6"
                                style={{ background: "linear-gradient(150deg,#2b2723,#211d1a)", boxShadow: "0 16px 40px rgba(0,0,0,.18)" }}
                            >
                                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                                    <span className="rounded-full px-3 py-1 text-[0.75rem] font-semibold" style={{ background: "rgba(241,233,223,0.14)" }}>
                                        {c.role}
                                    </span>
                                    <span className="rounded-full px-3 py-1 text-[0.75rem]" style={{ background: "rgba(137,126,146,0.28)" }}>
                                        {c.mood}
                                    </span>
                                </div>
                                <p className="mb-4 text-[1.1rem] leading-snug" style={serif}>
                                    {c.body}
                                </p>
                                <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: CREAM_SOFT }}>
                                    🤍 {c.felt}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                    <motion.p {...fadeInUp} className="mt-6 text-center text-lg" style={{ ...caveat, color: CREAM_FAINT }}>
                        {d.register.caption}
                    </motion.p>
                </div>
            </section>

            {/* ============ 07 HOW IT WAS MADE ============ */}
            <section className={sectionPad}>
                <div className={wrap}>
                    <SectionLabel number={d.made.number} title={d.made.title} />
                    <H2 pre={d.made.h2Pre} highlight={d.made.h2Highlight} post={d.made.h2Post} color={HL_ORANGE} />
                    <Body items={d.made.body} />
                    <motion.div {...fadeInUp} className="mt-6 flex flex-wrap gap-2">
                        {d.made.tags.map((t) => (
                            <span key={t} className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-600">
                                {t}
                            </span>
                        ))}
                    </motion.div>
                    <motion.p {...fadeInUp} className="mt-6 text-lg font-semibold" style={{ ...caveat, color: ORANGE }}>
                        {d.made.annotation}
                    </motion.p>
                </div>
            </section>

            {/* ============ 08 CLOSER ============ */}
            <section className={`${sectionPad} bg-gray-50`}>
                <div className={`${wrap} text-center`}>
                    <motion.div {...fadeInUp} className="mb-6 flex items-center justify-center gap-3">
                        <span style={{ ...caveat, color: ORANGE }} className="text-2xl font-bold leading-none">
                            {d.closer.number}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">{d.closer.title}</span>
                    </motion.div>
                    <motion.h2 {...fadeInUp} className="mx-auto mb-6 max-w-3xl text-2xl font-medium leading-tight tracking-tight text-gray-900 md:text-[2.1rem]">
                        {d.closer.h2}
                    </motion.h2>
                    <motion.div {...fadeInUp} className="mx-auto max-w-3xl text-[1.05rem] leading-relaxed text-gray-600">
                        {d.closer.body.map((p, i) => (
                            <p key={i} className="mb-4 last:mb-0">
                                {p}
                            </p>
                        ))}
                    </motion.div>
                    <motion.p {...fadeIn} className="my-8 text-3xl italic" style={{ ...serif, color: WARM_DEEP }}>
                        {d.closer.finalLine}
                    </motion.p>
                    <Link href={d.closer.liveHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 underline underline-offset-4">
                        {d.closer.liveLabel}
                    </Link>
                </div>
            </section>
        </article>
    );
}
