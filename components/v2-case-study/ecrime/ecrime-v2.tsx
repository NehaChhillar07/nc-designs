"use client";

// eCrime Hub, told in six chapters on the paper. The story and its order are
// the live case study's; the copy is edited so each claim is made once, and
// the one decision that matters (report, don't rebuild) is the moment the
// reader tries. Every conclusion is in the text.

import Image from "next/image";
import Link from "next/link";

import { GRID } from "@/components/home-v2/grid";
import { Reveal } from "@/components/home-v2/motion";
import { Signature } from "@/components/home-v2/signature";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { ecV2 } from "@/data/v2-ecrime-hub-data";

import { ChapterRail } from "../chapter-rail";
import { Chapter, ChapterHeading, MarginNote, PrintFigure, Prose } from "../cs-kit";
import { DecisionSet } from "../decision-set";
import { Outcome } from "../outcome";
import { EcHero } from "./ec-hero";
import { ReportPath } from "./report-path";
import { SiteMap } from "./site-map";

const d = ecV2;
const ch = Object.fromEntries(d.chapters.map((c) => [c.id, c])) as Record<string, (typeof d.chapters)[number]>;
const Gap = () => <SpecGap className="h-12 md:h-16" />;
const BigGap = () => <SpecGap className="h-32 md:h-48" />;
const WIDE = "col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-3";

function C({ id, children }: { id: string; children: React.ReactNode }) {
    const c = ch[id];
    return (
        <Chapter id={c.id} n={c.n} label={c.label}>
            {children}
        </Chapter>
    );
}

function Paras({ items }: { items: readonly string[] }) {
    return (
        <Prose>
            {items.map((p) => (
                <p key={p}>{p}</p>
            ))}
        </Prose>
    );
}

export function EcrimeV2() {
    const { why, report, system, assistant, launch, learnings } = d;

    return (
        <>
            <ChapterRail chapters={d.chapters} label={d.railLabel} />
            <article>
                <EcHero />
                <BigGap />

                {/* 01 · the brief, and the benchmark we didn't copy */}
                <C id="why">
                    <ChapterHeading id="why" before={why.heading} suffix={why.headingSuffix} />
                    <Gap />
                    <Paras items={why.body} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <DecisionSet rejected={why.decision.rejected} chosen={why.decision.chosen} />
                        </div>
                    </div>
                    <Gap />
                    <div className={`${GRID} items-start`}>
                        <div className="col-span-4 max-w-[64ch] text-[17px] leading-[1.75] text-[var(--v2-ink)] md:col-span-8 md:text-[18px] lg:col-span-6 lg:col-start-3">
                            <p>{why.after}</p>
                        </div>
                        <MarginNote label={why.constraintsLabel} className="col-span-4 mt-8 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:mt-1">
                            <ul className="space-y-1 text-[17px] leading-snug md:text-[18px]">
                                {why.constraints.map((c) => (
                                    <li key={c}>{c}</li>
                                ))}
                            </ul>
                        </MarginNote>
                    </div>
                </C>
                <BigGap />

                {/* 02 · report, don't rebuild: the hands-on moment */}
                <C id="report">
                    <ChapterHeading id="report" before={report.heading} suffix={report.headingSuffix} />
                    <Gap />
                    <Paras items={report.body} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <ReportPath />
                        </div>
                    </div>
                    <Gap />
                    <div className={GRID}>
                        <PrintFigure shot={report.menuShot} tilt={0.8} className="col-span-4 md:col-span-12 lg:col-span-9 lg:col-start-3" />
                    </div>
                </C>
                <BigGap />

                {/* 03 · three templates, every page */}
                <C id="system">
                    <ChapterHeading id="system" before={system.heading} suffix={system.headingSuffix} />
                    <Gap />
                    <Paras items={system.body} />
                    <Gap />
                    <div className={GRID}>
                        <div className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2">
                            <SiteMap />
                        </div>
                    </div>
                    <Gap />
                    <div className={`${GRID} items-start`}>
                        <PrintFigure shot={system.contentShot} tilt={-1} className="col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-3" />
                        <MarginNote className="col-span-4 mt-8 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:mt-16">{system.contentNote}</MarginNote>
                    </div>
                    <Gap />
                    <div className={GRID}>
                        <PrintFigure shot={system.illustrationShot} tilt={1.2} depth={0.3} className="col-span-4 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-5" />
                    </div>
                </C>
                <BigGap />

                {/* 04 · the assistant */}
                <C id="assistant">
                    <ChapterHeading id="assistant" before={assistant.heading} />
                    <Gap />
                    <Paras items={assistant.body} />
                    <Gap />
                    <div className={GRID}>
                        <PrintFigure shot={assistant.shot} tilt={-0.8} className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-3" sizes="(min-width: 1024px) 60vw, 100vw" />
                    </div>
                </C>
                <BigGap />

                {/* 05 · launch, and the QR route back */}
                <C id="launch">
                    <ChapterHeading id="launch" before={launch.heading} />
                    <Gap />
                    <Paras items={launch.body.slice(0, 2)} />
                    <Gap />
                    <div className={GRID}>
                        <PrintFigure shot={launch.backdrop} tilt={-0.6} depth={0.3} className="col-span-4 md:col-span-12 lg:col-span-9 lg:col-start-3" />
                    </div>
                    <Gap />
                    <div className={`${GRID} items-start`}>
                        <PrintFigure shot={launch.billboard} tilt={-2} className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-3" sizes="(min-width: 768px) 40vw, 100vw" />
                        <PrintFigure shot={launch.mall} tilt={1.5} depth={0.7} className="col-span-4 mt-10 md:col-span-6 md:mt-24 lg:col-span-5 lg:col-start-8" sizes="(min-width: 768px) 45vw, 100vw" />
                    </div>
                    <Gap />
                    <Prose>
                        <p>{launch.body[2]}</p>
                    </Prose>
                    {launch.outcome && (
                        <>
                            <SpecGap className="h-16 md:h-24" />
                            <Outcome primary={launch.outcome.primary} secondary={launch.outcome.secondary} />
                        </>
                    )}
                </C>
                <BigGap />

                {/* 06 · learnings */}
                <C id="learnings">
                    <ChapterHeading id="learnings" before={learnings.heading} />
                    <Gap />
                    <div className={GRID}>
                        <ol className="col-span-4 md:col-span-10 lg:col-span-7 lg:col-start-3">
                            {learnings.lessons.map((l, i) => (
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
                        <p>{learnings.next}</p>
                    </Prose>
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
