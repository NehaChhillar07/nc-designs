"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Highlighter } from "@/components/ui/highlighter";
import { ConnectVideo } from "@/components/connect-video";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CAL_LINK, VIDEO_URL, isUnreplaced, resolveToken } from "@/lib/placeholders";
import { CONTACT_EMAIL } from "@/lib/site";
import { workWithMeData } from "@/data/work-with-me-data";
import { testimonials } from "@/data/testimonials-data";
import { TestimonialStack } from "@/components/testimonial-stack";
import { TestimonialCarousel } from "@/components/testimonial-carousel";

// ============================================
// /work-with-me — the freelance offer page. Every treatment here is borrowed
// from the rest of the site (display type, Highlighter marks, Caveat stickers,
// uppercase eyebrows, numbered case-study sections, rounded-2xl cards, the
// fade-up motion budget, the cursor tag), so the page reads as another room
// of the same portfolio, not a sales template.
// ============================================

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

// Renders the data files' marker syntax with the site's Highlighter:
// __phrase__ -> warm underline, ==phrase== -> soft warm highlight. Keeps long
// paragraphs scannable without hardcoding copy in the component.
function MarkedText({ text }: { text: string }) {
    const parts = text.split(/(==[^=]+==|__[^_]+__)/g);
    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith("==") && part.endsWith("==")) {
                    return (
                        <Highlighter key={i} action="highlight" color="#FFD79A" isView>
                            {part.slice(2, -2)}
                        </Highlighter>
                    );
                }
                if (part.startsWith("__") && part.endsWith("__")) {
                    return (
                        <Highlighter key={i} action="underline" color="#FF9800" isView>
                            {part.slice(2, -2)}
                        </Highlighter>
                    );
                }
                return part;
            })}
        </>
    );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <motion.p
            {...fadeUp}
            className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500 mb-5"
        >
            {children}
        </motion.p>
    );
}


export function WorkWithMeContent() {
    const data = workWithMeData;
    const calLink = resolveToken(CAL_LINK);
    const videoUrl = resolveToken(VIDEO_URL);
    const emailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.cta.emailSubject)}`;

    const [headBefore, headAfter] = data.hero.headline.split(data.hero.highlight);

    return (
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 pt-28 md:pt-36 pb-8 md:pb-12">
            {/* Hero — copy on the left, the square testimonial carousel fills
                the right whitespace on large screens (stacks below on small). */}
            <section className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-16 items-center">
                <div className="max-w-3xl">
                    <Eyebrow>{data.hero.eyebrow}</Eyebrow>
                    <motion.h1
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.05 }}
                        className="text-[34px] sm:text-[44px] md:text-[56px] font-medium tracking-tight leading-[1.08] text-gray-900"
                    >
                        {headBefore}
                        {/* The one contrast word: the site's handwriting voice
                            at display size, in the strong warm tone. */}
                        <span
                            className="px-1 text-[1.18em] leading-none"
                            style={{
                                fontFamily: "var(--font-caveat), cursive",
                                color: "var(--accent-warm-strong)",
                            }}
                        >
                            {data.hero.highlight}
                        </span>
                        {headAfter}
                    </motion.h1>
                    <motion.p
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.1 }}
                        className="mt-6 text-[16px] md:text-[19px] text-gray-600 leading-relaxed"
                    >
                        <MarkedText text={data.hero.body} />
                    </motion.p>
                    <motion.p
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.15 }}
                        className="mt-5 flex items-center gap-2 text-[13px] sm:text-sm text-muted-foreground"
                    >
                        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                        {data.hero.availability}
                    </motion.p>
                </div>

                {/* Token-gated: production renders nothing here until the real
                    quotes exist, and the grid collapses to one column. The
                    stack needs breathing room for its skew and offsets. */}
                {testimonials.some((t) => resolveToken(t.token)) && (
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
                        {/* The skewed stack's fixed card width and offsets need
                            desktop room; phones get the slide carousel. */}
                        <div className="hidden lg:block pr-4">
                            <TestimonialStack />
                        </div>
                        <div className="lg:hidden">
                            <TestimonialCarousel />
                        </div>
                    </motion.div>
                )}
            </section>

            {/* Who this is for */}
            <section className="mt-20 md:mt-28 max-w-3xl">
                <Eyebrow>{data.whoFor.eyebrow}</Eyebrow>
                <motion.p {...fadeUp} className="text-[17px] md:text-[20px] text-gray-800 leading-relaxed">
                    <MarkedText text={data.whoFor.body} />
                </motion.p>
            </section>

            {/* Video + terms/CTA — side by side: the video left, the closing
                move right, horizontally aligned. The handwritten aside and its
                hand-drawn arrow draw themselves in on scroll and point at the
                booking button. Without a video (production until {{VIDEO_URL}}
                is replaced) the right block stands alone. */}
            <section
                className={cn(
                    "mt-20 md:mt-28 grid gap-14 items-center",
                    videoUrl && "lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16"
                )}
            >
                {videoUrl && (
                    <div className="flex flex-col gap-5">
                        <ConnectVideo url={videoUrl} title={data.video.title} />
                        <motion.p {...fadeUp} className="text-[15px] text-gray-600">
                            {data.video.line}
                        </motion.p>
                    </div>
                )}

                <div className="max-w-md">
                    <motion.p {...fadeUp} className="pt-5 border-t border-gray-200 text-sm text-gray-500 leading-relaxed">
                        {data.terms}
                    </motion.p>

                    {/* Handwritten aside + self-drawing arrow to the button */}
                    <motion.div
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.15 }}
                        className="mt-8 flex justify-end pr-2"
                    >
                        <span
                            className="text-[19px] text-gray-600"
                            style={{ fontFamily: "var(--font-caveat), cursive", transform: "rotate(-3deg)" }}
                        >
                            {data.cta.note}
                        </span>
                    </motion.div>
                    <svg
                        viewBox="0 0 140 64"
                        className="ml-auto mr-14 -mt-1 mb-1 block h-12 w-28"
                        fill="none"
                        aria-hidden="true"
                    >
                        {/* Draws in like a pen stroke: curve first, then the head. */}
                        <motion.path
                            d="M128 6 C 102 40, 62 46, 20 52"
                            stroke="#B45309"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.45 }}
                        />
                        <motion.path
                            d="M31 42 L19 52 L34 57"
                            stroke="#B45309"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                            transition={{ duration: 0.3, ease: "easeOut", delay: 1.35 }}
                        />
                    </svg>

                    <motion.div {...fadeUp} className="flex flex-wrap items-center gap-5">
                        {calLink ? (
                            <>
                                {/* Unreplaced token (dev only): inert chip showing
                                    the token — a real link would 404 on /{{CAL_LINK}}.
                                    Production hides the whole branch. */}
                                {isUnreplaced(calLink) ? (
                                    <span
                                        className={cn(
                                            buttonVariants({ size: "lg" }),
                                            "rounded-2xl px-10 h-12 text-base opacity-60 cursor-not-allowed font-mono"
                                        )}
                                        title="Replace CAL_LINK in lib/placeholders.ts"
                                    >
                                        {calLink}
                                    </span>
                                ) : (
                                    <motion.a
                                        href={calLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={cn(buttonVariants({ size: "lg" }), "rounded-2xl px-10 h-12 text-base")}
                                    >
                                        {data.cta.book}
                                    </motion.a>
                                )}
                                <a
                                    href={emailHref}
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
                                    style={{ textDecorationColor: "var(--accent-warm)" }}
                                >
                                    {data.cta.email}
                                </a>
                            </>
                        ) : (
                            // No booking link yet: email carries the CTA alone.
                            <a
                                href={emailHref}
                                className={cn(buttonVariants({ size: "lg" }), "rounded-2xl px-10 h-12 text-base")}
                            >
                                Email me
                            </a>
                        )}
                    </motion.div>
                    <motion.div {...fadeUp} className="mt-5">
                        <Link
                            href="/"
                            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Back to the portfolio
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
