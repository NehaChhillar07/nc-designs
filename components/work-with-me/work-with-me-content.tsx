"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Highlighter } from "@/components/ui/highlighter";
import { ConnectVideo } from "@/components/connect-video";
import { ExploreMore } from "@/components/explore-more";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CAL_LINK, VIDEO_URL, isUnreplaced, resolveToken } from "@/lib/placeholders";
import { CONTACT_EMAIL } from "@/lib/site";
import { otherProjects } from "@/data/case-study-data";
import { workWithMeData } from "@/data/work-with-me-data";
import { testimonials } from "@/data/testimonials-data";
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
    // Ordered by proof.projectIds (unsaid first), not by the source array.
    const proofProjects = data.proof.projectIds
        .map((id) => otherProjects.find((p) => p.id === id))
        .filter((p): p is (typeof otherProjects)[number] => Boolean(p));

    return (
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 pt-28 md:pt-36 pb-8 md:pb-12">
            {/* Hero */}
            <section className="max-w-3xl">
                <Eyebrow>{data.hero.eyebrow}</Eyebrow>
                <motion.h1
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.05 }}
                    className="text-[34px] sm:text-[44px] md:text-[56px] font-medium tracking-tight leading-[1.08] text-gray-900"
                >
                    {headBefore}
                    <Highlighter action="underline" color="#FF9800" isView>
                        {data.hero.highlight}
                    </Highlighter>
                    {headAfter}
                </motion.h1>
                <motion.p
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.1 }}
                    className="mt-6 text-[16px] md:text-[19px] text-gray-600 leading-relaxed"
                >
                    {data.hero.body}
                </motion.p>
                <motion.p
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.15 }}
                    className="mt-5 flex items-center gap-2 text-[13px] sm:text-sm text-muted-foreground"
                >
                    <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                    {data.hero.availability}
                </motion.p>
            </section>

            {/* Who this is for */}
            <section className="mt-20 md:mt-28 max-w-3xl">
                <Eyebrow>{data.whoFor.eyebrow}</Eyebrow>
                <motion.p {...fadeUp} className="text-[17px] md:text-[20px] text-gray-800 leading-relaxed">
                    {data.whoFor.body}
                </motion.p>
            </section>

            {/* Testimonials — one at a time, token-gated; samples render only in dev */}
            {testimonials.some((t) => resolveToken(t.token)) && (
                <section className="mt-20 md:mt-28">
                    <Eyebrow>{data.testimonials.eyebrow}</Eyebrow>
                    <TestimonialCarousel className="max-w-2xl" />
                </section>
            )}

            {/* Proof — the same cards the case studies cross-link with */}
            <section className="mt-20 md:mt-28">
                <Eyebrow>{data.proof.eyebrow}</Eyebrow>
                {/* currentProjectId={-1}: matches nothing, so all three render
                    (undefined would make ExploreMore slice to two). */}
                <ExploreMore
                    projects={proofProjects}
                    currentProjectId={-1}
                    className="mt-2"
                    gridClassName="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                />
            </section>

            {/* Video — hidden in production until {{VIDEO_URL}} is replaced */}
            {videoUrl && (
                <section className="mt-20 md:mt-28 flex flex-col gap-5">
                    <ConnectVideo url={videoUrl} title={data.video.title} />
                    <motion.p {...fadeUp} className="text-[15px] text-gray-600">
                        {data.video.line}
                    </motion.p>
                </section>
            )}

            {/* Terms + CTA */}
            <section className="mt-20 md:mt-28 max-w-3xl">
                <motion.p {...fadeUp} className="pt-5 border-t border-gray-200 text-sm text-gray-500">
                    {data.terms}
                </motion.p>
                <motion.div {...fadeUp} className="mt-8 flex flex-wrap items-center gap-5">
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
                                <a
                                    href={calLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(buttonVariants({ size: "lg" }), "rounded-2xl px-10 h-12 text-base")}
                                >
                                    {data.cta.book}
                                </a>
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
                    <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Back to the portfolio
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
