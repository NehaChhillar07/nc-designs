"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Highlighter } from "@/components/ui/highlighter";
import { spaceGrotesk } from "@/components/case-study/fonts";
import { flashcardTrainingCaseStudyData } from "@/data/flashcard-training-data";
import { fadeIn, fadeInUp } from "@/components/case-study/motion";

// Lazy-mount heavy interactive components — they ship in their own chunks
// and SSR-rendered fallback keeps the static path intact.
const LiveFlashcardDemo = dynamic(
    () =>
        import("@/components/case-study/flashcard/LiveFlashcardDemo").then(
            (m) => m.LiveFlashcardDemo,
        ),
    { ssr: true },
);
const MiniCardEditor = dynamic(
    () =>
        import("@/components/case-study/flashcard/MiniCardEditor").then(
            (m) => m.MiniCardEditor,
        ),
    { ssr: true },
);
const SurfaceToggle = dynamic(
    () =>
        import("@/components/case-study/flashcard/SurfaceToggle").then(
            (m) => m.SurfaceToggle,
        ),
    { ssr: true },
);
const CircularCardDeck = dynamic(
    () =>
        import("@/components/ui/circular-card-deck").then(
            (m) => m.CircularCardDeck,
        ),
    { ssr: true },
);
const HandoffTrail = dynamic(
    () =>
        import("@/components/case-study/flashcard/HandoffTrail").then(
            (m) => m.HandoffTrail,
        ),
    { ssr: true },
);
const BeforeWantedToggle = dynamic(
    () =>
        import("@/components/case-study/flashcard/BeforeWantedToggle").then(
            (m) => m.BeforeWantedToggle,
        ),
    { ssr: true },
);
const AuthorityShift = dynamic(
    () =>
        import("@/components/case-study/flashcard/AuthorityShift").then(
            (m) => m.AuthorityShift,
        ),
    { ssr: true },
);
const DeferredBet = dynamic(
    () =>
        import("@/components/case-study/flashcard/DeferredBet").then(
            (m) => m.DeferredBet,
        ),
    { ssr: true },
);
const BackwardsToForwards = dynamic(
    () =>
        import("@/components/case-study/flashcard/BackwardsToForwards").then(
            (m) => m.BackwardsToForwards,
        ),
    { ssr: true },
);
const ThreeWayEntry = dynamic(
    () =>
        import("@/components/case-study/flashcard/ThreeWayEntry").then(
            (m) => m.ThreeWayEntry,
        ),
    { ssr: true },
);
const ApproveToPublish = dynamic(
    () =>
        import("@/components/case-study/flashcard/ApproveToPublish").then(
            (m) => m.ApproveToPublish,
        ),
    { ssr: true },
);
const StandaloneToEmbedded = dynamic(
    () =>
        import("@/components/case-study/flashcard/StandaloneToEmbedded").then(
            (m) => m.StandaloneToEmbedded,
        ),
    { ssr: true },
);

// ============================================
// ANIMATION — Slow, natural, predictable.
// Matches the Human Firewall case study so the two pages visually rhyme.
// ============================================

const data = flashcardTrainingCaseStudyData;

// ============================================
// UTILITY COMPONENTS — Mirror the HF case study so primitives stay consistent.
// ============================================

function SectionLabel({ number, title }: { number: string; title: string }) {
    return (
        <motion.p
            {...fadeInUp}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4"
        >
            {number} · {title}
        </motion.p>
    );
}

function PullQuote({ children }: { children: ReactNode }) {
    return (
        <motion.blockquote
            {...fadeInUp}
            className="border-l-[3px] border-gray-900/20 pl-6 py-2 my-10"
        >
            <p className="text-xl md:text-2xl font-light italic leading-relaxed text-gray-900/80">
                {children}
            </p>
        </motion.blockquote>
    );
}

function BuildNote() {
    return (
        <section className="pt-12 md:pt-16">
            <div className="max-w-5xl mx-auto px-6">
                <motion.p
                    {...fadeInUp}
                    className="max-w-4xl text-base leading-relaxed text-gray-600"
                >
                    {data.buildNote}
                </motion.p>
            </div>
        </section>
    );
}

// ============================================
// HERO
// ============================================

function HeroSection() {
    const { hero } = data;

    return (
        <section className="pt-24 md:pt-32 pb-20 md:pb-28">
            <div className="max-w-5xl mx-auto px-6">
                {/* Meta */}
                <motion.p
                    {...fadeInUp}
                    className="text-sm font-medium text-gray-900 tracking-wide mb-8"
                >
                    {hero.meta}
                </motion.p>

                {/* Title with Highlighter — same line the work grid card
                    promises, so arriving here confirms the click */}
                <motion.h1
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 leading-tight mb-5 max-w-4xl"
                >
                    Built in Cursor.{" "}
                    <Highlighter action="highlight" color="#FFD79A" isView>
                        Engineering shipped the code.
                    </Highlighter>
                </motion.h1>

                {/* Subtitle — the line that used to be the headline, kept as
                    the plain description of what the tool actually is */}
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.15 }}
                    className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl"
                >
                    {hero.subtitle}
                </motion.p>

                {/* Tags */}
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.2 }}
                    className="text-sm text-gray-500 tracking-wide"
                >
                    {hero.tags}
                </motion.p>

                {/* Timeline / Team / Role */}
                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.25 }}
                    className="mt-12 flex flex-wrap items-start justify-between gap-y-6 w-full"
                >
                    {[
                        ["Timeline", hero.timeline],
                        ["Team", hero.team],
                        ["Role", hero.role],
                    ].map(([label, value]) => (
                        <div key={label} className="min-w-[140px]">
                            <p className="text-sm md:text-base text-gray-500 mb-1">
                                {label}
                            </p>
                            <p className="text-lg md:text-xl font-medium text-gray-900">
                                {value}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Hero card deck — three phishing training cards auto-shuffling
                like the CircularTestimonials carousel, no manual controls */}
            <motion.div
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: 0.3 }}
                className="max-w-5xl mx-auto px-6 mt-16"
            >
                <CircularCardDeck
                    cards={hero.deckCards}
                    className="mx-auto w-full max-w-[460px]"
                    ariaLabel="Auto-cycling phishing training flashcards"
                />
                <p className="text-xs text-gray-500 text-center mt-6 tracking-wide">
                    {hero.caption}
                </p>
            </motion.div>
        </section>
    );
}

// ============================================
// SECTION 01 — The Starting Point
// ============================================

function StartingPointSection() {
    const { startingPoint } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="01" title="The Starting Point" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {startingPoint.heading}{" "}
                    <span className="text-gray-500">
                        {startingPoint.headingSuffix}
                    </span>
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-10"
                >
                    {startingPoint.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <HandoffTrail nodes={startingPoint.handoffTrail} />
            </div>
        </section>
    );
}

// ============================================
// SECTION 02 — What we were seeing
// ============================================

function WhatWeSawSection() {
    const { whatWeSaw } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="02" title="What we were seeing" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {whatWeSaw.heading}{" "}
                    <span className="text-gray-500">
                        {whatWeSaw.headingSuffix}
                    </span>
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-4"
                >
                    {whatWeSaw.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <BeforeWantedToggle
                    before={whatWeSaw.beforeState}
                    wanted={whatWeSaw.wantedState}
                />

                <PullQuote>{whatWeSaw.pullQuote}</PullQuote>
            </div>
        </section>
    );
}

// ============================================
// SECTION 03 — The shift
// ============================================

function TheShiftSection() {
    const { theShift } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="03" title="The shift" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {theShift.heading}{" "}
                    <Highlighter action="highlight" color="#FF9800" isView>
                        {theShift.headingHighlight}
                    </Highlighter>
                    {theShift.headingSuffix}
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-4"
                >
                    {theShift.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <AuthorityShift
                    from={theShift.zones.from}
                    to={theShift.zones.to}
                    token={theShift.zones.token}
                />

                <PullQuote>{theShift.pullQuote}</PullQuote>
            </div>
        </section>
    );
}

// ============================================
// SECTION 04 — The format question (deferred, NOT killed)
// ============================================

function FormatQuestionSection() {
    const { formatQuestion } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="04" title="The format question" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {formatQuestion.heading}{" "}
                    <span className="text-gray-500">
                        {formatQuestion.headingSuffix}
                    </span>
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-4"
                >
                    {formatQuestion.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <DeferredBet
                    now={formatQuestion.paths.now}
                    later={formatQuestion.paths.later}
                />
                {/* Section 04 has no pull quote — keep it clean and honest */}
            </div>
        </section>
    );
}

// ============================================
// SECTION 05 — Why flashcards (CENTERPIECE)
// ============================================

function WhyFlashcardsSection() {
    const { whyFlashcards } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="05" title="The Format Decision" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {whyFlashcards.heading}{" "}
                    <Highlighter action="highlight" color="#FFD79A" isView>
                        {whyFlashcards.headingHighlight}
                    </Highlighter>
                    {whyFlashcards.headingSuffix}
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-4"
                >
                    {whyFlashcards.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <LiveFlashcardDemo
                    cards={whyFlashcards.cards}
                    caption={whyFlashcards.demoCaption}
                />

                <PullQuote>{whyFlashcards.pullQuote}</PullQuote>
            </div>
        </section>
    );
}

// ============================================
// SECTION 06 — I built it backwards first (SENIOR-READ)
// ============================================

function BackwardsFirstSection() {
    const { backwardsFirst, whyFlashcards, freedomInside } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="06" title="I built it backwards first" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {backwardsFirst.heading}{" "}
                    <span className="text-gray-500">
                        {backwardsFirst.headingSuffix}
                    </span>
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-4"
                >
                    {backwardsFirst.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <BackwardsToForwards
                    endResultFirst={backwardsFirst.states.endResultFirst}
                    baseFirst={backwardsFirst.states.baseFirst}
                    flipCaption={backwardsFirst.flipCaption}
                    components={freedomInside.components}
                    sampleCardTitle={
                        whyFlashcards.cards[0]?.type === "learning"
                            ? whyFlashcards.cards[0].front
                            : ""
                    }
                    sampleCardBody={
                        whyFlashcards.cards[0]?.type === "learning"
                            ? whyFlashcards.cards[0].back
                            : ""
                    }
                />

                <PullQuote>{backwardsFirst.pullQuote}</PullQuote>
            </div>
        </section>
    );
}

// ============================================
// SECTION 07 — How it works
// ============================================

function HowItWorksSection() {
    const { howItWorks } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="07" title="How it works" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {howItWorks.heading}{" "}
                    <span className="text-gray-500">
                        {howItWorks.headingSuffix}
                    </span>
                </motion.h2>

                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-base leading-relaxed text-gray-600 max-w-4xl mb-4"
                >
                    {howItWorks.bodyIntro}
                </motion.p>

                <ThreeWayEntry entries={howItWorks.entries} />

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.15 }}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-5 my-8 max-w-4xl"
                >
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
                        Iteration toolbar
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600">
                        {howItWorks.toolbarNote}
                    </p>
                </motion.div>

                <PullQuote>{howItWorks.pullQuote}</PullQuote>
            </div>
        </section>
    );
}

// ============================================
// SECTION 08 — AI prepares, the admin decides
// ============================================

function AIPreparesSection() {
    const { aiPrepares } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="08" title="AI prepares, the admin decides" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {aiPrepares.heading}{" "}
                    <Highlighter action="highlight" color="#FFD79A" isView>
                        {aiPrepares.headingHighlight}
                    </Highlighter>
                    {aiPrepares.headingSuffix}
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-4"
                >
                    {aiPrepares.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <ApproveToPublish
                    steps={aiPrepares.publishSteps}
                    cta={aiPrepares.publishCta}
                    automationLabel={aiPrepares.pairedLabels.automation.label}
                    automationValue={aiPrepares.pairedLabels.automation.value}
                    authorityLabel={aiPrepares.pairedLabels.authority.label}
                    authorityValue={aiPrepares.pairedLabels.authority.value}
                />

                <PullQuote>{aiPrepares.pullQuote}</PullQuote>
            </div>
        </section>
    );
}

// ============================================
// SECTION 09 — Freedom inside the card
// ============================================

function FreedomInsideSection() {
    const { freedomInside } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="09" title="Freedom inside the card" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {freedomInside.heading}{" "}
                    <span className="text-gray-500">
                        {freedomInside.headingSuffix}
                    </span>
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-4"
                >
                    {freedomInside.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <MiniCardEditor
                    guidance={freedomInside.editorGuidance}
                    limitWithMedia={freedomInside.limitWithMedia}
                    limitWithoutMedia={freedomInside.limitWithoutMedia}
                />

                <PullQuote>{freedomInside.pullQuote}</PullQuote>
            </div>
        </section>
    );
}

// ============================================
// SECTION 10 — Two different surfaces
// ============================================

function TwoSurfacesSection() {
    const { twoSurfaces } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="10" title="Two different surfaces" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {twoSurfaces.heading}{" "}
                    <Highlighter action="highlight" color="#FBBF24" isView>
                        {twoSurfaces.headingHighlight}
                    </Highlighter>
                    {twoSurfaces.headingSuffix}
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-4"
                >
                    {twoSurfaces.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <SurfaceToggle
                    creator={twoSurfaces.surfaces.creator}
                    learner={twoSurfaces.surfaces.learner}
                />

                <PullQuote>{twoSurfaces.pullQuote}</PullQuote>
            </div>
        </section>
    );
}

// ============================================
// SECTION 11 — Where it is now
// ============================================

function WhereItIsSection() {
    const { whereItIs } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="11" title="Where it is now" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {whereItIs.heading}{" "}
                    <Highlighter action="highlight" color="#FFD79A" isView>
                        {whereItIs.headingHighlight}
                    </Highlighter>
                    {whereItIs.headingSuffix}
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-4"
                >
                    {whereItIs.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <StandaloneToEmbedded
                    crossLinkText={whereItIs.crossLinkText}
                    crossLinkHref={whereItIs.crossLinkHref}
                />

                <PullQuote>{whereItIs.pullQuote}</PullQuote>
            </div>
        </section>
    );
}

// ============================================
// SECTION 12 — What I take from it (STILLNESS, NO interaction)
// ============================================

function TakeFromItSection() {
    const { takeFromIt } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="12" title="What I take from it" />

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-8 max-w-4xl"
                >
                    {takeFromIt.heading}{" "}
                    <span className="text-gray-500">
                        {takeFromIt.headingSuffix}
                    </span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{
                        duration: 0.7,
                        delay: 0.15,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="max-w-4xl space-y-5 text-base md:text-lg leading-relaxed text-gray-600"
                >
                    {takeFromIt.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function FlashcardTrainingCaseStudy() {
    return (
        <article className={`${spaceGrotesk.variable} cs-editorial bg-white`}>
            <HeroSection />
            <BuildNote />
            <StartingPointSection />
            <WhatWeSawSection />
            <TheShiftSection />
            <FormatQuestionSection />
            <WhyFlashcardsSection />
            <BackwardsFirstSection />
            <HowItWorksSection />
            <AIPreparesSection />
            <FreedomInsideSection />
            <TwoSurfacesSection />
            <WhereItIsSection />
            <TakeFromItSection />
        </article>
    );
}
