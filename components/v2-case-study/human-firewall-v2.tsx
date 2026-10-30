"use client";

// Human Firewall, told in ten chapters on the paper. The story and its order
// are the live case study's; only the staging is new.

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { GRID } from "@/components/home-v2/grid";
import { CountUp, DUR, EASE, Reveal } from "@/components/home-v2/motion";
import { Signature } from "@/components/home-v2/signature";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { hfV2 } from "@/data/v2-human-firewall-data";
import { cn } from "@/lib/utils";

import { ChapterRail } from "./chapter-rail";
import { CaseHero } from "./cs-hero";
import { CAVEAT, Chapter, ChapterHeading, DrawnRoute, MarginNote, PrintFigure, Prose, PullQuote, StrikeList, TapedNote } from "./cs-kit";
import { FunnelToggle } from "./funnel-toggle";
import { RejectedDrafts, RiskRadar } from "./risk-radar";

const d = hfV2;
const ch = Object.fromEntries(d.chapters.map((c) => [c.id, c])) as Record<string, (typeof d.chapters)[number]>;
const Gap = () => <SpecGap className="h-12 md:h-16" />;
const BigGap = () => <SpecGap className="h-32 md:h-48" />;

function C({ id, children }: { id: string; children: React.ReactNode }) {
    const c = ch[id];
    return (
        <Chapter id={c.id} n={c.n} label={c.label}>
            {children}
        </Chapter>
    );
}

export function HumanFirewallV2() {
    const sp = d.startingPoint;
    const ai = d.aiShift;
    const cm = d.compromise;
    const al = d.aiLaunch;
    const rs = d.riskScore;
    const rp = d.reporting;
    const ml = d.microLearning;
    const mg = d.migration;
    const cf = d.confidence;
    const rf = d.reflection;

    return (
        <>
            <ChapterRail chapters={d.chapters} label={d.railLabel} />
            <article>
                <CaseHero />
                <BigGap />

                {/* 01 */}
                <C id="starting-point">
                    <ChapterHeading id="starting-point" before={sp.heading} suffix={sp.headingSuffix} />
                    <Gap />
                    <Prose>
                        {sp.body.map((p) => (
                            <p key={p}>{p}</p>
                        ))}
                    </Prose>
                    <Gap />
                    <div className={GRID}>
                        <div className="col-span-4 grid gap-5 md:col-span-12 md:grid-cols-2 lg:col-span-8 lg:col-start-3">
                            <Reveal className="rotate-[-1deg] bg-[#f7f3ec] p-6 shadow-[0_22px_36px_-26px_rgba(60,10,12,0.55)]">
                                <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{sp.legacy.label}</p>
                                <StrikeList items={sp.legacy.items} className="mt-4" />
                            </Reveal>
                            <Reveal delay={0.1} className="rotate-[1deg] bg-[#f7f3ec] p-6 shadow-[0_22px_36px_-26px_rgba(60,10,12,0.55)]">
                                <p className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{sp.needed.label}</p>
                                <ul className="mt-4 space-y-3">
                                    {sp.needed.items.map((it) => (
                                        <li key={it} className="v2-display text-[24px] leading-tight text-[var(--v2-ink)]">
                                            {it}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        </div>
                    </div>
                </C>
                <BigGap />

                {/* 02 */}
                <C id="ai-shift">
                    <div className={GRID}>
                        <h2 id="ai-shift-h" className="v2-display col-span-4 mt-5 text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.02em] text-[var(--v2-ink)] md:col-span-10 lg:col-start-3">
                            <span className="text-[var(--v2-muted)]">{ai.heading.a}</span>
                            {ai.heading.vs}
                            <em className="italic text-[var(--v2-oxblood)]">{ai.heading.b}</em>
                        </h2>
                    </div>
                    <Gap />
                    <Prose>
                        {ai.body.map((p) => (
                            <p key={p}>{p}</p>
                        ))}
                    </Prose>
                    <div className={`${GRID} mt-8`}>
                        <div className="col-span-4 grid gap-5 md:col-span-12 md:grid-cols-2 lg:col-span-8 lg:col-start-3">
                            <Reveal className="bg-[rgb(26_20_20/0.04)] p-6">
                                <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{ai.optionA.label}</p>
                                <p className="v2-display mt-3 text-[26px] leading-tight text-[var(--v2-muted)]">{ai.optionA.title}</p>
                                <p className="mt-2 text-[15px] text-[var(--v2-muted)]">{ai.optionA.desc}</p>
                            </Reveal>
                            <Reveal delay={0.12} className="relative bg-[#f7f3ec] p-6 shadow-[0_22px_36px_-26px_rgba(60,10,12,0.55)]">
                                <p className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{ai.optionB.label}</p>
                                <p className="v2-display mt-3 text-[26px] leading-tight text-[var(--v2-ink)]">{ai.optionB.title}</p>
                                <p className="mt-2 text-[15px] text-[var(--v2-ink)]">{ai.optionB.desc}</p>
                                {/* the choice, circled by hand */}
                                <svg aria-hidden viewBox="0 0 300 160" preserveAspectRatio="none" className="pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]">
                                    <motion.path
                                        d="M18 92 C 8 30, 120 6, 210 14 C 290 22, 300 110, 240 140 C 170 168, 40 158, 14 104 C 6 84, 30 56, 60 44"
                                        fill="none"
                                        stroke="var(--v2-oxblood)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        vectorEffect="non-scaling-stroke"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                                        transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
                                    />
                                </svg>
                            </Reveal>
                        </div>
                    </div>
                    <Gap />
                    <div className={`${GRID} items-start`}>
                        <div className="col-span-4 max-w-[64ch] text-[17px] leading-[1.75] text-[var(--v2-ink)] md:col-span-8 md:text-[18px] lg:col-span-6 lg:col-start-3">
                            <p>{ai.closing}</p>
                        </div>
                        <MarginNote label={ai.collaborationLabel.toLowerCase()} className="col-span-4 mt-8 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:mt-1">
                            {ai.collaboration}
                        </MarginNote>
                    </div>
                    <Gap />
                    <div className={GRID}>
                        <PrintFigure shot={ai.shot} tilt={1.2} className="col-span-4 md:col-span-12 lg:col-span-9 lg:col-start-3" />
                    </div>
                </C>
                <BigGap />

                {/* 03 */}
                <C id="low-compromise">
                    <ChapterHeading id="low-compromise" before={cm.heading} highlight={cm.headingHighlight} />
                    <Gap />
                    <Prose>
                        <p>{cm.body}</p>
                    </Prose>
                    <Gap />
                    <div className={GRID}>
                        <div className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-3">
                            <FunnelToggle />
                        </div>
                    </div>
                    <Gap />
                    {/* The strip is very wide: on phones it pans inside its frame. */}
                    <div className={GRID}>
                        <div className="col-span-4 -mx-4 overflow-x-auto px-4 [scrollbar-width:thin] md:col-span-12 md:mx-0 md:overflow-visible md:px-0 lg:col-span-9 lg:col-start-3">
                            <PrintFigure shot={cm.shot} tilt={-0.6} depth={0.3} className="w-[220%] md:w-full" sizes="(min-width: 768px) 75vw, 220vw" />
                        </div>
                    </div>
                </C>
                <BigGap />

                {/* 04 */}
                <C id="ai-launch">
                    <ChapterHeading id="ai-launch" before={al.heading} suffix={al.headingSuffix} />
                    <Gap />
                    <div className={GRID}>
                        <div className="col-span-4 grid grid-cols-2 md:col-span-10 lg:col-span-7 lg:col-start-3">
                            {al.split.map((s, i) => (
                                <Reveal key={s.k} delay={i * 0.12} className={cn("py-4", i === 0 ? "pr-5" : "border-l border-[var(--v2-redline)] pl-5")}>
                                    <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{s.k}</p>
                                    <p className={cn("v2-display mt-2 text-[clamp(1.9rem,4vw,3.25rem)] leading-none", i === 1 ? "text-[var(--v2-oxblood)]" : "text-[var(--v2-ink)]")}>
                                        {s.v}
                                    </p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                    <Gap />
                    <PullQuote>{al.pullQuote}</PullQuote>
                    <Gap />
                    <div className={GRID}>
                        <PrintFigure shot={al.shot} tilt={-1} className="col-span-4 md:col-span-12 lg:col-span-9 lg:col-start-3" />
                    </div>
                </C>
                <BigGap />

                {/* 05 */}
                <C id="risk-score">
                    <ChapterHeading id="risk-score" before={rs.heading} highlight={rs.headingHighlight} />
                    <Gap />
                    <Prose>
                        <p>{rs.body}</p>
                    </Prose>
                    <Gap />
                    <div className={GRID}>
                        <div className="col-span-4 md:col-span-12 lg:col-span-9 lg:col-start-3">
                            <RejectedDrafts />
                        </div>
                    </div>
                    <Gap />
                    <PullQuote>{rs.rejectedVersions.closingPullQuote}</PullQuote>
                    <Gap />
                    <div className={`${GRID} items-center`}>
                        <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-3">
                            <RiskRadar />
                        </div>
                        <div className="col-span-4 mt-10 md:col-span-6 md:mt-0 lg:col-span-4 lg:col-start-8">
                            <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{rs.hierarchyLabel.toLowerCase()}</p>
                            <DrawnRoute steps={rs.hierarchy} className="mt-4 md:flex-col md:items-start md:gap-3 [&_li]:md:flex-none" />
                            <p className="v2-display mt-8 text-[clamp(2rem,3.6vw,3rem)] italic leading-tight text-[var(--v2-oxblood)]">{rs.pullQuote}</p>
                        </div>
                    </div>
                    <Gap />
                    <div className={GRID}>
                        <PrintFigure shot={rs.shot} tilt={0.8} className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-3" />
                        <div className="col-span-4 mt-10 md:col-span-8 md:col-start-3 lg:col-span-4 lg:col-start-9 lg:-mt-24">
                            <TapedNote attribution={rs.customerQuote.attribution} tilt={1.5}>
                                {rs.customerQuote.before}
                                <span className="underline decoration-[var(--v2-oxblood)] decoration-2 underline-offset-4">{rs.customerQuote.underlined}</span>
                                {rs.customerQuote.after}
                            </TapedNote>
                        </div>
                    </div>
                </C>
                <BigGap />

                {/* 06 */}
                <C id="reporting">
                    <ChapterHeading id="reporting" before={rp.heading} highlight={rp.headingHighlight} after={` ${rp.headingSuffix}`} />
                    <Gap />
                    <Prose>
                        {rp.body.map((p) => (
                            <p key={p}>{p}</p>
                        ))}
                    </Prose>
                    <Gap />
                    <PullQuote>{rp.pullQuote}</PullQuote>
                    <Gap />
                    <div className={GRID}>
                        <PrintFigure shot={rp.shot} tilt={-1.4} className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-4" />
                    </div>
                </C>
                <BigGap />

                {/* 07 */}
                <C id="micro-learning">
                    <ChapterHeading id="micro-learning" before={ml.heading} highlight={ml.headingHighlight} after={ml.headingSuffix} />
                    <Gap />
                    <Prose>
                        <p>{ml.body[0]}</p>
                    </Prose>
                    <Gap />
                    {/* compromise → landing page → flashcard, joined by a drawn line */}
                    <div className={GRID}>
                        <ol className="relative col-span-4 grid gap-10 md:col-span-12 md:grid-cols-3 md:gap-6 lg:col-span-10 lg:col-start-3">
                            <motion.span
                                aria-hidden
                                className="absolute left-[16%] right-[16%] top-[38%] hidden h-px origin-left border-t-2 border-dashed border-[var(--v2-oxblood)] md:block"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                                transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
                            />
                            {ml.shots.map((s, i) => (
                                <li key={s.src} className="relative">
                                    <p className="v2-mono mb-3 flex items-baseline gap-2 text-[12px] text-[var(--v2-oxblood)]">
                                        <span>{String(i + 1).padStart(2, "0")}</span>
                                        <span className="text-[var(--v2-ink)]">{ml.steps[i]}</span>
                                    </p>
                                    <PrintFigure shot={s} tilt={[-2, 1.5, -1][i]} depth={0.4 + i * 0.25} sizes="(min-width: 768px) 30vw, 100vw" />
                                </li>
                            ))}
                        </ol>
                    </div>
                    <Gap />
                    <Prose>
                        <p>{ml.body[1]}</p>
                        <p>{ml.body[2]}</p>
                        <p>
                            <Link href={ml.link.href} className="v2-link">
                                {ml.link.text} →
                            </Link>
                        </p>
                    </Prose>
                </C>
                <BigGap />

                {/* 08 */}
                <C id="migration">
                    <ChapterHeading id="migration" before={mg.heading} suffix={mg.headingSuffix} />
                    <Gap />
                    <Prose>
                        <p>{mg.body}</p>
                    </Prose>
                    <Gap />
                    {/* HF2 lies under HF3 */}
                    <div className={GRID}>
                        <div className="relative col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-3">
                            <div className="md:w-[62%]">
                                <p className="mb-2 -rotate-1 text-[20px] text-[var(--v2-muted)]" style={CAVEAT}>
                                    {mg.before.note}
                                </p>
                                <PrintFigure shot={mg.before.shot} tilt={-2.5} depth={0.3} className="opacity-90" sizes="(min-width: 768px) 55vw, 100vw" />
                            </div>
                            <div className="mt-10 md:absolute md:right-0 md:top-[34%] md:mt-0 md:w-[56%]">
                                <p className="mb-2 rotate-1 text-[20px] text-[var(--v2-oxblood)] md:inline-block md:bg-[var(--v2-paper)] md:px-2" style={CAVEAT}>
                                    {mg.after.note}
                                </p>
                                <PrintFigure shot={mg.after.shot} tilt={2} depth={0.8} sizes="(min-width: 768px) 50vw, 100vw" />
                            </div>
                        </div>
                    </div>
                    <SpecGap className="h-12 md:h-[22rem] lg:h-[26rem]" />
                    <div className={GRID}>
                        <div className="col-span-4 grid gap-8 md:col-span-10 md:grid-cols-2 lg:col-span-8 lg:col-start-3">
                            {mg.quotes.map((q, i) => (
                                <TapedNote key={q} tilt={i ? 1.5 : -1.5} attribution={mg.quotesAttribution}>
                                    {q}
                                </TapedNote>
                            ))}
                        </div>
                    </div>
                    <Gap />
                    <Prose>
                        <p className="v2-display text-[26px] leading-[1.25] md:text-[30px]">{mg.closing}</p>
                    </Prose>
                </C>
                <BigGap />

                {/* 09 */}
                <C id="confidence">
                    <ChapterHeading id="confidence" before={cf.heading} highlight={cf.headingHighlight} />
                    <Gap />
                    <div className={GRID}>
                        <dl className="col-span-4 grid gap-8 md:col-span-12 md:grid-cols-[1.6fr_1fr_1fr] md:items-end lg:col-span-9 lg:col-start-3">
                            {cf.stats.map((s, i) => (
                                <div key={s.label} className={cn("flex flex-col-reverse", i === 0 ? "" : "md:border-l md:border-[var(--v2-rule)] md:pl-6")}>
                                    <dt className="mt-2">
                                        <span className="block text-[15px] text-[var(--v2-ink)]">{s.label}</span>
                                        <span className="v2-mono mt-1 block text-[11px] text-[var(--v2-muted)]">{s.note}</span>
                                    </dt>
                                    <dd className={cn("v2-display leading-[0.85] text-[var(--v2-oxblood)]", i === 0 ? "text-[clamp(6rem,15vw,13rem)]" : "text-[clamp(3rem,5vw,4.5rem)]")}>
                                        <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <p className={cn(GRID, "mt-4")}>
                        <span className="v2-mono col-span-4 text-[11px] text-[var(--v2-muted)] md:col-span-10 lg:col-start-3">
                            {cf.metric.primary} {cf.metric.footnote}
                        </span>
                    </p>
                    <Gap />
                    <Prose>
                        {cf.bodyParagraphs.map((p) => (
                            <p key={p}>{p}</p>
                        ))}
                    </Prose>
                    <Gap />
                    <div className={GRID}>
                        <div className="col-span-4 md:col-span-8 md:col-start-3 lg:col-span-5 lg:col-start-5">
                            <TapedNote attribution={cf.customerQuote.attribution}>{cf.customerQuote.text}</TapedNote>
                        </div>
                    </div>
                </C>
                <BigGap />

                {/* 10 */}
                <C id="reflection">
                    <ChapterHeading id="reflection" before={rf.heading} highlight={rf.headingHighlight} />
                    <Gap />
                    <div className={GRID}>
                        <ol className="col-span-4 md:col-span-10 lg:col-span-7 lg:col-start-3">
                            {rf.lessons.map((l, i) => (
                                <Reveal as="li" key={l} delay={i * 0.1}>
                                    <span className="flex items-baseline gap-4 border-b border-[var(--v2-rule)] py-4">
                                        <span className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{i + 1}</span>
                                        <span className="v2-display text-[clamp(1.6rem,3vw,2.5rem)] leading-tight text-[var(--v2-ink)]">{l}</span>
                                    </span>
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                    <Gap />
                    <Prose>
                        <p className="text-[19px] md:text-[21px]">{rf.closing}</p>
                    </Prose>
                    <SpecGap className="h-20 md:h-28" />
                    <div className={GRID}>
                        <div className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-3">
                            {rf.statement.map((s, i) => (
                                <motion.p
                                    key={s}
                                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                                    whileInView={{ opacity: [1, 0.6, 0.3][i], y: 0, filter: "blur(0px)" }}
                                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                                    transition={{ duration: DUR.slow, ease: EASE, delay: i * 0.35 }}
                                    className="v2-display text-[clamp(2.75rem,7vw,6.5rem)] italic leading-[1] text-[var(--v2-oxblood)]"
                                >
                                    {s}
                                </motion.p>
                            ))}
                        </div>
                    </div>
                    <SpecGap className="h-16 md:h-24" />
                    {/* The author signs her work. */}
                    <div className={GRID}>
                        <div className="col-span-4 text-[var(--v2-oxblood)] md:col-span-6 lg:col-start-3">
                            <Signature word="full" variant="signoff" className="h-12 w-auto md:h-16" />
                        </div>
                    </div>
                </C>
                <BigGap />

                {/* notes & methods */}
                <C id="notes">
                    <div className={GRID}>
                        <h2 id="notes-h" className="v2-display col-span-4 mt-5 text-[36px] leading-tight text-[var(--v2-ink)] md:col-span-8 lg:col-start-3">
                            {d.notes.heading}
                        </h2>
                        <ol className="col-span-4 mt-6 space-y-3 border-t border-[var(--v2-rule)] pt-5 md:col-span-8 lg:col-span-6 lg:col-start-3">
                            {d.notes.items.map((n, i) => (
                                <li key={n} className="grid grid-cols-[1.75rem_1fr] text-[14px] leading-relaxed text-[var(--v2-muted)]">
                                    <span className="v2-mono text-[11px] leading-[1.9] text-[var(--v2-oxblood)]">{i + 1}</span>
                                    {n}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <SpecGap className="h-24 md:h-32" />
                    <div className={GRID}>
                        <Link href={d.next.href} className="group col-span-4 flex items-center gap-6 border-t border-[var(--v2-rule)] pt-6 md:col-span-10 lg:col-span-8 lg:col-start-3">
                            <span className="relative hidden aspect-[100/70] w-40 shrink-0 rotate-[-2deg] overflow-hidden bg-[#f7f3ec] p-1.5 shadow-[0_18px_30px_-20px_rgba(60,10,12,0.55)] transition-transform duration-500 group-hover:rotate-0 sm:block">
                                <span className="relative block h-full w-full overflow-hidden">
                                    <Image src={d.next.shot.src} alt="" fill sizes="160px" className="object-cover" />
                                </span>
                            </span>
                            <span>
                                <span className="v2-mono block text-[11px] text-[var(--v2-muted)]">{d.next.label}</span>
                                <span className="v2-display mt-1 block text-[clamp(2rem,4vw,3.5rem)] leading-none text-[var(--v2-ink)] transition-colors group-hover:text-[var(--v2-oxblood)]">
                                    {d.next.title}{" "}
                                    <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>
                                <span className="mt-2 block text-[15px] text-[var(--v2-muted)]">{d.next.line}</span>
                            </span>
                        </Link>
                    </div>
                </C>
                <SpecGap className="h-32 md:h-48" />
            </article>
        </>
    );
}
