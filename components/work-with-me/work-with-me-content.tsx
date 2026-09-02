"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Highlighter } from "@/components/ui/highlighter";
import { ConnectVideo } from "@/components/connect-video";
import { ExploreMore } from "@/components/explore-more";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCursor } from "@/components/ui/cursor-context";
import { CAL_LINK, VIDEO_URL, isUnreplaced, resolveToken } from "@/lib/placeholders";
import { CONTACT_EMAIL } from "@/lib/site";
import { otherProjects } from "@/data/case-study-data";
import { workWithMeData, type PackageCard, type Testimonial } from "@/data/work-with-me-data";

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

function PriceCard({ card }: { card: PackageCard }) {
    const { setCursor, resetCursor } = useCursor();
    return (
        <motion.div
            {...fadeUp}
            whileHover={{ y: -4, boxShadow: "0 24px 60px -24px rgba(0,0,0,0.25)" }}
            onMouseEnter={() => setCursor("tag", card.duration)}
            onMouseLeave={() => resetCursor()}
            className={cn(
                "relative rounded-2xl border p-8 md:p-10 flex flex-col gap-6",
                card.dark
                    ? "bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border-white/10 text-white"
                    : "bg-white border-gray-200 text-gray-900"
            )}
        >
            {card.sticker && (
                <span
                    className="absolute -top-3 right-6 inline-block px-3 py-1 rounded-full"
                    style={{
                        fontFamily: "var(--font-caveat), cursive",
                        fontSize: "15px",
                        transform: "rotate(2deg)",
                        // deeper than the #FF9800 accent so white text clears 4.5:1
                        backgroundColor: "#B45309",
                        color: "#fff",
                    }}
                >
                    {card.sticker}
                </span>
            )}
            <div>
                <h3 className="text-[24px] md:text-[28px] font-medium tracking-tight">{card.name}</h3>
                <p className={cn("mt-2 text-[15px] md:text-[16px] leading-relaxed", card.dark ? "text-white/70" : "text-gray-600")}>
                    {card.tagline}
                </p>
            </div>
            <ul className="flex flex-col gap-2.5">
                {card.deliverables.map((line) => (
                    <li key={line} className={cn("flex gap-3 text-[15px] leading-relaxed", card.dark ? "text-white/85" : "text-gray-700")}>
                        <span
                            aria-hidden="true"
                            className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full"
                            style={{ backgroundColor: "var(--accent-warm)" }}
                        />
                        {line}
                    </li>
                ))}
            </ul>
            <div className={cn("mt-auto pt-5 border-t", card.dark ? "border-white/15" : "border-gray-200")}>
                <p className={cn("text-xs font-medium uppercase tracking-[0.18em]", card.dark ? "text-white/50" : "text-gray-400")}>
                    {card.duration}
                </p>
                <p className="mt-1 text-[26px] md:text-[30px] font-semibold tracking-tight">{card.price}</p>
            </div>
        </motion.div>
    );
}

function TestimonialCard({ item }: { item: Testimonial }) {
    // Unreplaced token: null in production (card hidden), the token string in
    // dev (sample rendered, clearly stickered). Replaced: "Quote | Name | Role".
    const resolved = resolveToken(item.token);
    if (!resolved) return null;

    const sample = isUnreplaced(resolved);
    const [quote, name, role] = sample
        ? [item.sample.quote, item.sample.name, item.sample.role]
        : resolved.split("|").map((s) => s.trim());

    return (
        <motion.figure
            {...fadeUp}
            className="relative rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8"
        >
            {sample && (
                <span
                    className="absolute -top-3 left-6 inline-block px-3 py-1 rounded-full"
                    style={{
                        fontFamily: "var(--font-caveat), cursive",
                        fontSize: "15px",
                        transform: "rotate(-2deg)",
                        backgroundColor: "#B45309",
                        color: "#fff",
                    }}
                >
                    sample, replace with a real quote
                </span>
            )}
            <blockquote className="text-[16px] md:text-[17px] text-gray-800 leading-relaxed">
                &ldquo;{quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-gray-500">
                <span className="font-medium text-gray-700">{name}</span>
                {role ? ` · ${role}` : null}
            </figcaption>
        </motion.figure>
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

            {/* Two ways to start */}
            <section className="mt-20 md:mt-28">
                <Eyebrow>{data.packages.eyebrow}</Eyebrow>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl">
                    {data.packages.cards.map((card) => (
                        <PriceCard key={card.name} card={card} />
                    ))}
                </div>
            </section>

            {/* How it works — the case-study skeleton in miniature */}
            <section className="mt-20 md:mt-28">
                <Eyebrow>{data.process.eyebrow}</Eyebrow>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-5xl">
                    {/* key precedes the spread on purpose: written after it,
                        the compiler routes key through props and React drops
                        it with a list-key warning. */}
                    {data.process.steps.map((step) => (
                        <motion.div key={step.number} {...fadeUp}>
                            <p className="text-[26px] font-semibold text-gray-300 tracking-tight">{step.number}</p>
                            <h3 className="mt-1 text-[17px] font-medium text-gray-900">{step.name}</h3>
                            <p className="mt-2 text-[15px] text-gray-600 leading-relaxed">{step.body}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials — token-gated; samples render only in dev */}
            {data.testimonials.items.some((t) => resolveToken(t.token)) && (
                <section className="mt-20 md:mt-28">
                    <Eyebrow>{data.testimonials.eyebrow}</Eyebrow>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl">
                        {data.testimonials.items.map((item) => (
                            <TestimonialCard key={item.token} item={item} />
                        ))}
                    </div>
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
                            <a
                                href={calLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(buttonVariants({ size: "lg" }), "rounded-2xl px-10 h-12 text-base")}
                            >
                                {data.cta.book}
                            </a>
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
