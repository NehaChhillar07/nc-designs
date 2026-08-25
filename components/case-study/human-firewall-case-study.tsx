"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, Check } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";
import { spaceGrotesk } from "@/components/case-study/fonts";
import { humanFirewallCaseStudyData } from "@/data/human-firewall-data";
import { fadeIn, fadeInUp } from "@/components/case-study/motion";

// Lazy-mount the scroll-expansion opener — it owns wheel/touch handling
// and only makes sense client-side.
const ScrollExpandMedia = dynamic(
    () =>
        import("@/components/ui/scroll-expansion-hero").then(
            (m) => m.ScrollExpandMedia,
        ),
    { ssr: true },
);

// ============================================
// ANIMATION — Slow, natural, predictable
// No bounce. No elastic. Motion as orientation.
// ============================================

const data = humanFirewallCaseStudyData;

// ============================================
// UTILITY COMPONENTS — Inline, file-scoped
// ============================================

function SectionLabel({ number, title }: { number: string; title: string }) {
    return (
        <motion.p
            {...fadeInUp}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4"
        >
            {number}: {title}
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

function Callout({ children }: { children: ReactNode }) {
    return (
        <motion.div
            {...fadeInUp}
            className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-5 my-8"
        >
            {children}
        </motion.div>
    );
}

// Hand-drawn cross/strike mark for rejected exploratory versions.
// Matches the existing sketchy-svg style used elsewhere on the site.
function HandDrawnStrike({ color = "#FF9800" }: { color?: string }) {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
                d="M 4 4 Q 9 8 14 14"
                stroke={color}
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M 14 4 Q 9 8 4 14"
                stroke={color}
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
}

// Deeper than the #FF9800 accent: these labels sit on white, where #FF9800
// only reaches 2.16:1.
const REJECTED_LABEL_COLOR = "#B45309";

function RejectedVersionCard({
    label,
    title,
    body,
}: {
    label: string;
    title: string;
    body: string;
}) {
    return (
        <div className="border border-gray-200 rounded-lg p-5 h-full">
            <div className="flex items-center gap-2 mb-3">
                <span
                    style={{
                        fontFamily: "var(--font-caveat), cursive",
                        fontSize: "26px",
                        color: REJECTED_LABEL_COLOR,
                        fontWeight: 600,
                        lineHeight: 1,
                    }}
                >
                    {label}
                </span>
                <HandDrawnStrike color={REJECTED_LABEL_COLOR} />
            </div>
            <p className="font-medium text-sm text-gray-900 mb-1.5 leading-snug">{title}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
        </div>
    );
}

// Customer testimonial — same blockquote treatment as PullQuote, with
// a muted attribution line below. Pass plain text or JSX (e.g. with a
// Highlighter underline on a keeper phrase) as children.
function CustomerQuote({
    children,
    attribution,
}: {
    children: ReactNode;
    attribution: string;
}) {
    return (
        <motion.blockquote
            {...fadeInUp}
            className="border-l-[3px] border-gray-900/20 pl-6 py-2 my-10 max-w-3xl"
        >
            <p className="text-xl md:text-2xl font-light italic leading-relaxed text-gray-900/80">
                {children}
            </p>
            <cite className="block not-italic mt-4 text-sm text-gray-500 font-normal">
                {attribution}
            </cite>
        </motion.blockquote>
    );
}

// ============================================
// SECTION 1: HERO
// Purpose: Orientation and authority
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
                    A risk score{" "}
                    <Highlighter action="highlight" color="#FF9800" isView>nobody trusted</Highlighter>.
                </motion.h1>

                {/* Subtitle — carries the plain description the headline drops */}
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
                    className="mt-12 flex flex-wrap items-start justify-between w-full"
                >
                    {[
                        ["Timeline", hero.timeline],
                        ["Team", hero.team],
                        ["Role", hero.role],
                    ].map(([label, value]) => (
                        <div key={label}>
                            <p className="text-sm md:text-base text-gray-500 mb-1">{label}</p>
                            <p className="text-lg md:text-xl font-medium text-gray-900">{value}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Sits with the Timeline/Team/Role block and reads at the same
                    tier as the tags line above it: meta about how the work was
                    made, not part of the narrative that starts in section 01. */}
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.3 }}
                    className="mt-8 max-w-3xl text-sm md:text-base text-gray-500 leading-relaxed"
                >
                    {hero.buildNote}
                </motion.p>
            </div>

        </section>
    );
}

// ============================================
// SECTION 2: THE STARTING POINT
// Purpose: Establish context without drama
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
                    <span className="text-gray-500">{startingPoint.headingSuffix}</span>
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

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.15 }}
                    className="grid md:grid-cols-2 gap-4 my-10"
                >
                    {/* HF2 — Legacy (faded, de-emphasized) */}
                    <div className="border border-gray-200 rounded-xl p-6 bg-gray-50/50">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                            {startingPoint.legacy.label}
                        </p>
                        <ul className="space-y-3">
                            {startingPoint.legacy.items.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <X className="h-3 w-3 text-gray-500" strokeWidth={2.5} />
                                    </span>
                                    <span className="text-sm text-gray-500 line-through decoration-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* HF3 — What Was Needed (bold, confident) */}
                    <div className="border-2 border-gray-900 rounded-xl p-6 bg-gray-900/[0.02]">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">
                            {startingPoint.needed.label}
                        </p>
                        <ul className="space-y-3">
                            {startingPoint.needed.items.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                    </span>
                                    <span className="text-sm font-medium text-gray-900">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 3: THE AI SHIFT
// Purpose: Retrofit vs Rebuild decision
// ============================================

function AIShiftSection() {
    const { aiShift } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="02" title="The AI Shift" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    <Highlighter action="highlight" color="#FBBF24" isView>Retrofit</Highlighter>{" "}
                    vs.{" "}
                    <Highlighter action="highlight" color="#FFD79A" isView>Rebuild</Highlighter>
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-10"
                >
                    {aiShift.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.15 }}
                    className="grid md:grid-cols-2 gap-4 mb-10"
                >
                    <div className="border border-gray-200 rounded-lg p-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                            {aiShift.optionA.label}
                        </p>
                        <p className="font-semibold text-gray-900 mb-1">{aiShift.optionA.title}</p>
                        <p className="text-sm text-gray-500">{aiShift.optionA.desc}</p>
                    </div>
                    <div className="border-2 border-gray-900 rounded-lg p-6 bg-gray-900/[0.02]">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-2">
                            {aiShift.optionB.label}
                        </p>
                        <p className="font-semibold text-gray-900 mb-1">{aiShift.optionB.title}</p>
                        <p className="text-sm text-gray-500">{aiShift.optionB.desc}</p>
                    </div>
                </motion.div>

                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.2 }}
                    className="text-base text-gray-600 max-w-4xl mb-10"
                >
                    {aiShift.closing}
                </motion.p>

                {/* Cross-functional collaboration moment */}
                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.25 }}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-5 my-8 max-w-4xl"
                >
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
                        Working with Engineering
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600">
                        {aiShift.collaboration}
                    </p>
                </motion.div>

                {/* Browser Frame — AI-Assisted Campaign Creation */}
                <motion.div
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.25 }}
                >
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                            background: "#ffffff",
                            border: "1px solid #e4e4e7",
                            boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 40px 100px -20px rgba(0, 0, 0, 0.06)",
                        }}
                    >
                        <div
                            className="flex items-center gap-2 px-4 py-3"
                            style={{ background: "#e4e4e7" }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                            </div>
                            <span className="ml-3 text-xs text-gray-500 font-medium tracking-wide">
                                HF 3: AI-Assisted Campaign Creation
                            </span>
                        </div>
                        <div className="overflow-y-auto" style={{ maxHeight: "50vh" }}>
                            <Image
                                src="/work/1st-case study/ai-assisted-campaigncreation.png"
                                alt="HF 3: AI-Assisted Campaign Creation flow"
                                width={3360}
                                height={3970}
                                className="w-full h-auto block"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 4: LOW COMPROMISE ≠ LOW RISK
// Purpose: Behavioral funnel + insight
// ============================================

function CompromiseInsightSection() {
    const { compromiseInsight, behavioralFunnel } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="03" title="Low Compromise ≠ Low Risk" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-4 max-w-4xl"
                >
                    {compromiseInsight.heading}{" "}
                    <Highlighter action="highlight" color="#FBBF24" isView>
                        {compromiseInsight.headingHighlight}
                    </Highlighter>
                </motion.h2>

                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-base text-gray-600 max-w-4xl mb-4"
                >
                    {compromiseInsight.body}
                </motion.p>

                {/* Behavioral Funnel
                    Four descending stages, each a subset of the one above.
                    Reported is measured against all recipients, so it is shown
                    below the rule as a counter-metric, not as a funnel stage. */}
                <figure className="my-10">
                    <div className="space-y-3">
                        {behavioralFunnel.stages.map((s, i) => (
                            <div
                                key={s.label}
                                className="flex items-center gap-4"
                            >
                                <span className="w-28 text-right text-sm font-medium text-gray-500">
                                    {s.label}
                                </span>
                                <div className="flex-1 h-9 bg-gray-100 rounded overflow-hidden">
                                    {/* The marker sits on the animated bar, not the row.
                                        On the row every entry is the same flex width, so a
                                        width check would pass even if the bar never animated. */}
                                    <motion.div
                                        data-funnel-role="stage"
                                        className="h-full rounded"
                                        style={{ backgroundColor: s.color }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${s.pct}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: "easeOut", delay: i * 0.12 }}
                                    />
                                </div>
                                <span
                                    className="w-12 text-sm font-semibold tabular-nums"
                                    style={{ color: s.color }}
                                >
                                    {s.pct}%
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Counter-metric — good news, measured against everyone who
                        received the email, so it never sits inside the funnel. */}
                    <div
                        data-funnel-role="counter-metric"
                        className="mt-6 pt-6 border-t border-gray-200"
                    >
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                            <span
                                className="w-2.5 h-2.5 rounded-full self-center flex-shrink-0"
                                style={{ backgroundColor: behavioralFunnel.counterMetric.color }}
                                aria-hidden
                            />
                            <span className="text-sm font-medium text-gray-900">
                                {behavioralFunnel.counterMetric.label}
                            </span>
                            <span className="text-lg font-semibold tabular-nums text-gray-900">
                                {behavioralFunnel.counterMetric.pct}%
                            </span>
                            <span className="text-sm text-gray-500">
                                {behavioralFunnel.counterMetric.note}
                            </span>
                        </div>
                    </div>

                    <figcaption className="mt-4 text-xs text-gray-500">
                        {behavioralFunnel.caption}
                    </figcaption>
                </figure>

                <Callout>
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                        {compromiseInsight.improvements.title}
                    </p>
                    <ul className="space-y-1 text-sm text-gray-600">
                        {compromiseInsight.improvements.items.map((item) => (
                            <li key={item.label}>
                                • <strong>{item.label}</strong>: {item.desc}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-gray-500 mt-3 italic">
                        {compromiseInsight.improvements.footnote}
                    </p>
                </Callout>

                <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.25 }}>
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                            background: "#ffffff",
                            border: "1px solid #e4e4e7",
                            boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 40px 100px -20px rgba(0, 0, 0, 0.06)",
                        }}
                    >
                        <div
                            className="flex items-center gap-2 px-4 py-3"
                            style={{ background: "#e4e4e7" }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                            </div>
                            <span className="ml-3 text-xs text-gray-500 font-medium tracking-wide">
                                Action-Based Delivery Logic
                            </span>
                        </div>
                        <div className="overflow-y-auto" style={{ maxHeight: "50vh" }}>
                            <Image
                                src="/work/1st-case study/action-based-delivery.jpeg"
                                alt="Action-Based Delivery Logic"
                                width={3360}
                                height={1922}
                                className="w-full h-auto block"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 5: AI COULD LAUNCH. WE SAID NO.
// Purpose: Automation vs Authority
// ============================================

function AILaunchSection() {
    const { aiLaunch } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="04" title="AI Could Launch. We Said No." />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {aiLaunch.heading}{" "}
                    <span className="text-gray-500">{aiLaunch.headingSuffix}</span>
                </motion.h2>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="my-10 max-w-2xl"
                >
                    <div className="grid grid-cols-2 text-center">
                        <div className="border border-gray-200 rounded-l-lg p-6">
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Automation</p>
                            <p className="text-lg font-semibold text-gray-900">AI prepares</p>
                        </div>
                        <div className="border border-gray-200 border-l-0 rounded-r-lg p-6 bg-gray-900/[0.02]">
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Authority</p>
                            <p className="text-lg font-semibold text-gray-900">Admins approve</p>
                        </div>
                    </div>
                </motion.div>

                <PullQuote>{aiLaunch.pullQuote}</PullQuote>

                <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }}>
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                            background: "#ffffff",
                            border: "1px solid #e4e4e7",
                            boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 40px 100px -20px rgba(0, 0, 0, 0.06)",
                        }}
                    >
                        <div
                            className="flex items-center gap-2 px-4 py-3"
                            style={{ background: "#e4e4e7" }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                            </div>
                            <span className="ml-3 text-xs text-gray-500 font-medium tracking-wide">
                                Campaign Review & Preview: HF 3
                            </span>
                        </div>
                        <div className="overflow-y-auto" style={{ maxHeight: "50vh" }}>
                            <Image
                                src="/work/1st-case study/review.jpeg"
                                alt="Campaign Review & Preview: HF 3"
                                width={3360}
                                height={1922}
                                className="w-full h-auto block"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 6: RISK SCORE REDESIGN
// Purpose: Structure > Number
// ============================================

function RiskScoreSection() {
    const { riskScore } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="05" title="Risk Score Redesign" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {riskScore.heading}{" "}
                    <Highlighter action="highlight" color="#FBBF24" isView>
                        {riskScore.headingHighlight}
                    </Highlighter>
                </motion.h2>

                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-base text-gray-600 max-w-4xl mb-8"
                >
                    {riskScore.body}
                </motion.p>

                {/* Rejected versions — what we tried before the radar */}
                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.12 }}
                    className="my-10"
                >
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-5">
                        {riskScore.rejectedVersions.eyebrow}
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                        {riskScore.rejectedVersions.versions.map((v) => (
                            <RejectedVersionCard
                                key={v.label}
                                label={v.label}
                                title={v.title}
                                body={v.body}
                            />
                        ))}
                    </div>
                </motion.div>

                <PullQuote>{riskScore.rejectedVersions.closingPullQuote}</PullQuote>

                {/* Three Pillars */}
                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.15 }}
                    className="grid grid-cols-3 gap-4 mb-10"
                >
                    {riskScore.pillars.map((p) => (
                        <div key={p.label} className="border border-gray-200 rounded-lg p-5 text-center">
                            <p className="font-semibold text-sm text-gray-900 mb-1">{p.label}</p>
                            <p className="text-xs text-gray-500">{p.desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Hierarchy */}
                <Callout>
                    <p className="font-semibold text-sm text-gray-900 mb-3">Hierarchy breakdown</p>
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                        {riskScore.hierarchy.map((level, i) => (
                            <span key={level} className="flex items-center gap-2">
                                <span className="bg-gray-100 px-3 py-1.5 rounded font-medium text-gray-700">
                                    {level}
                                </span>
                                {i < riskScore.hierarchy.length - 1 && (
                                    <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                                )}
                            </span>
                        ))}
                    </div>
                </Callout>

                <PullQuote>{riskScore.pullQuote}</PullQuote>

                <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.3 }}>
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                            background: "#ffffff",
                            border: "1px solid #e4e4e7",
                            boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 40px 100px -20px rgba(0, 0, 0, 0.06)",
                        }}
                    >
                        <div
                            className="flex items-center gap-2 px-4 py-3"
                            style={{ background: "#e4e4e7" }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                            </div>
                            <span className="ml-3 text-xs text-gray-500 font-medium tracking-wide">
                                vCRO: Radar Chart & Factor Breakdown
                            </span>
                        </div>
                        <Image
                            src="/work/1st-case study/vcro.jpeg"
                            alt="vCRO: Radar Chart & Factor Breakdown"
                            width={2852}
                            height={1918}
                            className="w-full h-auto block"
                        />
                    </div>
                </motion.div>

                <CustomerQuote attribution={riskScore.customerQuote.attribution}>
                    {riskScore.customerQuote.before}
                    <Highlighter action="underline" color="#FF9800" isView>
                        {riskScore.customerQuote.underlined}
                    </Highlighter>
                    {riskScore.customerQuote.after}
                </CustomerQuote>
            </div>
        </section>
    );
}

// ============================================
// SECTION 7: REPORTING WITHOUT DISTORTION
// Purpose: Ethical reporting design
// ============================================

function ReportingSection() {
    const { reporting } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="06" title="Reporting Without Distortion" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {reporting.heading}{" "}
                    <Highlighter action="highlight" color="#FBBF24" isView>
                        {reporting.headingHighlight}
                    </Highlighter>{" "}
                    {reporting.headingSuffix}
                </motion.h2>

                {/* Legend */}
                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="flex gap-6 my-8 max-w-xs"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full" style={{ background: "hsl(0 65% 58%)" }} />
                        <span className="text-sm font-medium text-gray-900">Compromised</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full" style={{ background: "hsl(140 50% 50%)" }} />
                        <span className="text-sm font-medium text-gray-900">Reported</span>
                    </div>
                </motion.div>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.15 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-10"
                >
                    {reporting.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                <PullQuote>{reporting.pullQuote}</PullQuote>

                <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.25 }}>
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                            background: "#ffffff",
                            border: "1px solid #e4e4e7",
                            boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 40px 100px -20px rgba(0, 0, 0, 0.06)",
                        }}
                    >
                        <div
                            className="flex items-center gap-2 px-4 py-3"
                            style={{ background: "#e4e4e7" }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                            </div>
                            <span className="ml-3 text-xs text-gray-500 font-medium tracking-wide">
                                Gamification Dashboard: Points & Badges
                            </span>
                        </div>
                        <Image
                            src="/work/1st-case study/gamification.jpeg"
                            alt="Gamification Dashboard: Points & Badges"
                            width={2846}
                            height={1766}
                            className="w-full h-auto block"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 8: COMPROMISE → MICRO-LEARNING
// Purpose: Intervention, not punishment
// ============================================

function MicroLearningSection() {
    const { microLearning } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="07" title="Compromise → Micro-Learning" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {microLearning.heading}{" "}
                    <Highlighter action="highlight" color="#FFD79A" isView>
                        {microLearning.headingHighlight}
                    </Highlighter>
                    {microLearning.headingSuffix}
                </motion.h2>

                {/* Step Flow */}
                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="flex items-center gap-2 flex-wrap my-8 text-sm"
                >
                    {microLearning.steps.map((step, i) => (
                        <span key={step} className="flex items-center gap-2">
                            <span className="bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg font-medium text-gray-700">
                                {step}
                            </span>
                            {i < microLearning.steps.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-gray-500" />
                            )}
                        </span>
                    ))}
                </motion.div>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.15 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-10"
                >
                    {microLearning.body.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </motion.div>

                {/* Flashcard Training visual — phishing email + reveal page stacked, image on the right */}
                <motion.div
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-4 mt-4 items-stretch"
                >
                    {/* Left column — simulated phishing email + post-click reveal stacked */}
                    <div className="grid grid-rows-2 gap-4">
                        <div
                            className="relative rounded-2xl overflow-hidden min-h-[200px]"
                            style={{
                                border: "1px solid #e4e4e7",
                                boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 40px 100px -20px rgba(0, 0, 0, 0.06)",
                            }}
                        >
                            <Image
                                src="/work/1st-case study/phishing-email-gmail.png"
                                alt="Simulated phishing email in Gmail: Apple Vision Pro Enterprise Beta lure"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div
                            className="relative rounded-2xl overflow-hidden min-h-[200px]"
                            style={{
                                border: "1px solid #e4e4e7",
                                boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 40px 100px -20px rgba(0, 0, 0, 0.06)",
                            }}
                        >
                            <Image
                                src="/work/1st-case study/simulation-reveal.jpg"
                                alt="HumanFirewall reveal page shown after clicking, “Oops! Apple wasn't real” with the warning signs breakdown"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>

                    {/* Right column — hf-cards image fills the frame */}
                    <div
                        className="relative rounded-2xl overflow-hidden min-h-[300px] md:min-h-0"
                        style={{
                            border: "1px solid #e4e4e7",
                            boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 40px 100px -20px rgba(0, 0, 0, 0.06)",
                        }}
                    >
                        <Image
                            src="/work/1st-case study/hf-cards.png"
                            alt="HF 3: Flashcard Training cover card preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                {/* Cross-link to the Flashcard Training Builder case study */}
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.3 }}
                    className="mt-6 text-sm"
                >
                    <Link
                        href="/case-study/flashcard-training"
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        See how the training builder was designed
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                    </Link>
                </motion.p>
            </div>
        </section>
    );
}

// ============================================
// SECTION 9: BUILDING HF3 WHILE HF2 LIVED
// Purpose: Migration with trust
// ============================================

function MigrationSection() {
    const { migration } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="08" title="Building HF3 While HF2 Lived" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {migration.heading}{" "}
                    <span className="text-gray-500">{migration.headingSuffix}</span>
                </motion.h2>

                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-base text-gray-600 max-w-4xl mb-8"
                >
                    {migration.body}
                </motion.p>

                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.15 }}
                    className="space-y-4 my-10 max-w-3xl"
                >
                    {migration.quotes.map((q) => (
                        <div key={q}>
                            <PullQuote>{q}</PullQuote>
                            <p className="mt-2 pl-6 text-sm text-gray-500 font-normal">
                                {migration.quotesAttribution}
                            </p>
                        </div>
                    ))}
                </motion.div>

                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.2 }}
                    className="text-base text-gray-600 max-w-4xl mb-10"
                >
                    {migration.closing}
                </motion.p>

                <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.25 }}>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* HF 2 — Legacy */}
                        <div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="hidden md:block mb-3"
                                style={{
                                    fontFamily: "var(--font-caveat), cursive",
                                    fontSize: "22px",
                                    color: "#94a3b8",
                                    fontWeight: 500,
                                }}
                            >
                                7 tabs, manual setup, CS-dependent
                            </motion.p>
                            <div
                                className="rounded-2xl overflow-hidden"
                                style={{
                                    background: "#ffffff",
                                    border: "1px solid #e4e4e7",
                                }}
                            >
                                <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#e4e4e7" }}>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                                    </div>
                                    <span className="ml-2 text-xs text-gray-500 font-medium tracking-wide">
                                        HF 2: Legacy
                                    </span>
                                </div>
                                <Image
                                    src="/work/1st-case study/hf2-legacy-campaign-scenarios.jpeg"
                                    alt="HF 2: Legacy campaign creation with 7-tab manual workflow"
                                    width={3354}
                                    height={1928}
                                    className="w-full h-auto block"
                                />
                            </div>
                        </div>

                        {/* HF 3 — Redesigned */}
                        <div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="hidden md:block mb-3"
                                style={{
                                    fontFamily: "var(--font-caveat), cursive",
                                    fontSize: "22px",
                                    color: "#475569",
                                    fontWeight: 500,
                                }}
                            >
                                AI-assisted, self-serve, clean structure
                            </motion.p>
                            <div
                                className="rounded-2xl overflow-hidden"
                                style={{
                                    background: "#ffffff",
                                    border: "1px solid #e4e4e7",
                                    boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 40px 100px -20px rgba(0, 0, 0, 0.06)",
                                }}
                            >
                                <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#e4e4e7" }}>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                                    </div>
                                    <span className="ml-2 text-xs text-gray-500 font-medium tracking-wide">
                                        HF 3: Redesigned
                                    </span>
                                </div>
                                <Image
                                    src="/work/1st-case study/campaign-wizard-4-questions.png"
                                    alt="HF 3 Redesigned campaign creation: answer 4 questions (What, Who, Then, When) wizard"
                                    width={1999}
                                    height={1078}
                                    className="w-full h-auto block"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 10: CONFIDENCE REPLACED DEPENDENCY
// Purpose: Behavioral outcomes
// ============================================

function ConfidenceSection() {
    const { confidence } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="09" title="Confidence Replaced Dependency" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-8 max-w-4xl"
                >
                    {confidence.heading}{" "}
                    <Highlighter action="highlight" color="#FF9800" isView>
                        {confidence.headingHighlight}
                    </Highlighter>
                </motion.h2>

                {/* Single metric card — the number speaks */}
                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="mb-10 max-w-xl"
                >
                    <div className="border border-gray-200 rounded-lg px-5 py-4">
                        <p className="text-sm font-medium text-gray-900">{confidence.metric.primary}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-1">{confidence.metric.footnote}</p>
                </motion.div>

                {/* Three prose paragraphs */}
                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.14 }}
                    className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-600 mb-10"
                >
                    {confidence.bodyParagraphs.map((p) => (
                        <p key={p}>{p}</p>
                    ))}
                </motion.div>

                <CustomerQuote attribution={confidence.customerQuote.attribution}>
                    {confidence.customerQuote.text}
                </CustomerQuote>
            </div>
        </section>
    );
}

// ============================================
// SECTION 11: PERSONAL REFLECTION
// Purpose: Maturity and closing
// ============================================

function ReflectionSection() {
    const { reflection } = data;

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">
                <SectionLabel number="10" title="What This Project Changed in Me" />

                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.05 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug mb-6 max-w-4xl"
                >
                    {reflection.heading}{" "}
                    <Highlighter action="highlight" color="#FFD79A" isView>
                        {reflection.headingHighlight}
                    </Highlighter>
                </motion.h2>

                <motion.ul
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="space-y-2 text-base text-gray-600 max-w-4xl mb-10"
                >
                    {reflection.lessons.map((l) => (
                        <li key={l}>{l}</li>
                    ))}
                </motion.ul>

                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.15 }}
                    className="text-base text-gray-600 max-w-4xl mb-16"
                >
                    {reflection.closing}
                </motion.p>

                {/* Closing Statement — fading opacity */}
                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.2 }}
                    className="border-t border-gray-200 pt-10 max-w-4xl mx-auto text-center"
                >
                    {reflection.statement.map((line, i) => {
                        const opacities = [1, 0.6, 0.3];
                        return (
                            <p
                                key={line}
                                className="text-3xl md:text-5xl font-semibold leading-snug tracking-tight"
                                style={{ color: `rgba(17, 24, 39, ${opacities[i]})` }}
                            >
                                {line}
                            </p>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function HumanFirewallCaseStudy() {
    const { scrollHero } = data.hero;

    return (
        <article className={`${spaceGrotesk.variable} cs-editorial bg-white`}>
            {/* Scroll-expansion opener — pins the page while the dashboard
                grows from a small card to near-fullscreen */}
            <ScrollExpandMedia
                mediaType="image"
                mediaSrc={scrollHero.media}
                mediaAlt={scrollHero.mediaAlt}
                mediaAspect={3360 / 1922}
                browserChrome
                bgImageSrc={scrollHero.background}
                title={scrollHero.title}
                eyebrow={data.hero.meta}
                subtitle={data.hero.title}
                tags={data.hero.tags}
                date={scrollHero.date}
                scrollToExpand={scrollHero.hint}
            />
            <HeroSection />
            <StartingPointSection />
            <AIShiftSection />
            <CompromiseInsightSection />
            <AILaunchSection />
            <RiskScoreSection />
            <ReportingSection />
            <MicroLearningSection />
            <MigrationSection />
            <ConfidenceSection />
            <ReflectionSection />
        </article>
    );
}
