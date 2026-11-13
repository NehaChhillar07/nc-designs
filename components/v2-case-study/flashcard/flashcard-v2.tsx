"use client";

// Flashcard Builder, told as a deck. The story and its order are the live
// case study's; the copy is edited down so each claim is made once. The
// gestures carry the claims: pass (the handoff problem), swipe (the format),
// stack (built in layers), deal (the admin ships). Every conclusion is in the
// text, so the page reads the same without touching a card.

import Image from "next/image";
import Link from "next/link";

import { GRID } from "@/components/home-v2/grid";
import { CountUp, Reveal } from "@/components/home-v2/motion";
import { Signature } from "@/components/home-v2/signature";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { fcV2 } from "@/data/v2-flashcard-data";

import { ChapterRail } from "../chapter-rail";
import { Chapter, ChapterHeading, Prose, PullQuote } from "../cs-kit";
import { TempoProvider } from "./deck";
import { DeferredBet } from "./deferred-bet";
import { ExplodedCard } from "./exploded-card";
import { FcHero } from "./fc-hero";
import { HandoffPass } from "./handoff-pass";
import { LearnerDeck } from "./learner-deck";
import { MiniEditor } from "./mini-editor";
import { EntryFan, PublishDeal } from "./studio-deal";

const d = fcV2;
const ch = Object.fromEntries(d.chapters.map((c) => [c.id, c])) as Record<string, (typeof d.chapters)[number]>;
const Gap = () => <SpecGap className="h-12 md:h-16" />;
const BigGap = () => <SpecGap className="h-32 md:h-48" />;
// Wide moments: the content column, a little wider than the prose.
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

// A second beat inside a chapter: the live page's own heading, one step down.
function SubHeading({ before, highlight, after, suffix }: { before: string; highlight?: string; after?: string; suffix?: string }) {
    return (
        <div className={GRID}>
            <h3 className="v2-display col-span-4 text-[clamp(1.9rem,3.8vw,3.25rem)] leading-[1.05] tracking-[-0.01em] text-[var(--v2-ink)] md:col-span-10 lg:col-span-7 lg:col-start-3">
                {before}
                {highlight && (
                    <>
                        {" "}
                        <em className="italic text-[var(--v2-oxblood)]">{highlight}</em>
                    </>
                )}
                {after}
                {suffix && <span className="block text-[var(--v2-muted)]">{suffix}</span>}
            </h3>
        </div>
    );
}

export function FlashcardV2() {
    const sp = d.startingPoint;
    const fq = d.formatQuestion;
    const bf = d.backwardsFirst;
    const hw = d.howItWorks;
    const ap = d.aiPrepares;
    const fi = d.freedomInside;
    const wi = d.whereItIs;
    const tf = d.takeFromIt;
    const o = wi.outcome;
    const am = wi.adminMetric;

    return (
        <TempoProvider>
            <ChapterRail chapters={d.chapters} label={d.railLabel} />
            <article>
                <FcHero />
                <BigGap />

                {/* 01 · two problems, then the goal */}
                <C id="starting-point">
                    <ChapterHeading id="starting-point" before={sp.heading} suffix={sp.headingSuffix} />
                    <Gap />
                    <Paras items={sp.body} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <HandoffPass />
                        </div>
                    </div>
                    <SpecGap className="h-20 md:h-28" />
                    <SubHeading before={sp.shift.heading} highlight={sp.shift.headingHighlight} after={sp.shift.headingSuffix} />
                    <Gap />
                    <Prose>
                        <p>{sp.shift.goal}</p>
                    </Prose>
                </C>
                <BigGap />

                {/* 02 · the format decision, then try it */}
                <C id="format-question">
                    <ChapterHeading id="format-question" before={fq.heading} suffix={fq.headingSuffix} />
                    <Gap />
                    <Paras items={fq.body} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <DeferredBet />
                        </div>
                    </div>
                    <SpecGap className="h-16 md:h-24" />
                    <div className={GRID}>
                        <div className="col-span-4 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4">
                            <LearnerDeck />
                        </div>
                    </div>
                    <Gap />
                    <Prose>
                        <p>{fq.afterDeck}</p>
                    </Prose>
                </C>
                <BigGap />

                {/* 03 · stack */}
                <C id="backwards">
                    <ChapterHeading id="backwards" before={bf.heading} suffix={bf.headingSuffix} />
                    <Gap />
                    <Paras items={bf.body} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <ExplodedCard />
                        </div>
                    </div>
                    <Gap />
                    <PullQuote>{bf.pullQuote}</PullQuote>
                </C>
                <BigGap />

                {/* 04 · three ways in, then the admin ships */}
                <C id="studio">
                    <ChapterHeading id="studio" before={hw.heading} suffix={hw.headingSuffix} />
                    <Gap />
                    <Prose>
                        <p>{hw.bodyIntro}</p>
                    </Prose>
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <EntryFan />
                        </div>
                    </div>
                    <Gap />
                    <Prose>
                        <p>{hw.toolbarNote}</p>
                    </Prose>
                    {/* The toolbar itself; the sentence above says what it's for. */}
                    <div className={`${GRID} mt-6`}>
                        <div aria-hidden className="col-span-4 md:col-span-10 lg:col-span-8 lg:col-start-3">
                            <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{hw.toolbarLabel.toLowerCase()}</p>
                            <div className="mt-3 inline-flex max-w-full flex-wrap gap-1 rounded-[12px] bg-[#1a1414] p-1.5">
                                {hw.toolbarTools.map((tool, i) => (
                                    <Reveal
                                        key={tool}
                                        delay={i * 0.07}
                                        className={
                                            i === hw.toolbarTools.length - 1
                                                ? "rounded-[8px] bg-[var(--v2-oxblood)] px-3 py-1.5 text-[13px] text-[#f2ece3]"
                                                : "rounded-[8px] px-3 py-1.5 text-[13px] text-white/75"
                                        }
                                    >
                                        {tool}
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                    <SpecGap className="h-20 md:h-28" />
                    <SubHeading before={ap.heading} highlight={ap.headingHighlight} after={ap.headingSuffix} />
                    <Gap />
                    <Paras items={ap.body} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <PublishDeal />
                        </div>
                    </div>
                    <Gap />
                    <PullQuote>{ap.pullQuote}</PullQuote>
                </C>
                <BigGap />

                {/* 05 · bounded freedom, and the two surfaces */}
                <C id="freedom">
                    <ChapterHeading id="freedom" before={fi.heading} suffix={fi.headingSuffix} />
                    <Gap />
                    <Paras items={fi.body} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <MiniEditor />
                        </div>
                    </div>
                    <Gap />
                    <PullQuote>{fi.pullQuote}</PullQuote>
                </C>
                <BigGap />

                {/* 06 · the outcome */}
                <C id="where-now">
                    <ChapterHeading id="where-now" before={wi.heading} highlight={wi.headingHighlight} after={wi.headingSuffix} />
                    <Gap />
                    <div className={GRID}>
                        <dl className="col-span-4 grid gap-8 md:col-span-12 md:grid-cols-[1.6fr_1fr] md:items-end lg:col-span-9 lg:col-start-3">
                            <div className="flex flex-col-reverse">
                                <dt className="mt-2">
                                    <span className="block text-[15px] text-[var(--v2-ink)]">
                                        {o.label}, from {o.from}
                                    </span>
                                    <span className="v2-mono mt-1 block max-w-[60ch] text-[11px] text-[var(--v2-muted)]">{o.source}</span>
                                </dt>
                                <dd className="v2-display text-[clamp(6rem,15vw,13rem)] leading-[0.85] text-[var(--v2-oxblood)]">
                                    <CountUp value={o.value} prefix={o.prefix} suffix={o.suffix} />
                                </dd>
                            </div>
                            {/* The admin side of the thesis, once Neha has the number. */}
                            {am && (
                                <div className="flex flex-col-reverse md:border-l md:border-[var(--v2-rule)] md:pl-6">
                                    <dt className="mt-2">
                                        <span className="block text-[15px] text-[var(--v2-ink)]">{am.label}</span>
                                        <span className="v2-mono mt-1 block text-[11px] text-[var(--v2-muted)]">{am.source}</span>
                                    </dt>
                                    <dd className="v2-display text-[clamp(3rem,5vw,4.5rem)] leading-[0.85] text-[var(--v2-oxblood)]">{am.value}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                    <Gap />
                    <Paras items={wi.body} />
                    <Gap />
                    <Prose>
                        <p>
                            <Link href={wi.crossLinkHref} className="v2-link">
                                {wi.crossLinkText} →
                            </Link>
                        </p>
                    </Prose>
                    <Gap />
                    <PullQuote>{wi.pullQuote}</PullQuote>
                </C>
                <BigGap />

                {/* 07 · what she takes from it */}
                <C id="take-from-it">
                    <ChapterHeading id="take-from-it" before={tf.heading} suffix={tf.headingSuffix} />
                    <Gap />
                    <div className={GRID}>
                        <ol className="col-span-4 md:col-span-10 lg:col-span-7 lg:col-start-3">
                            {tf.lessons.map((l, i) => (
                                <Reveal as="li" key={l} delay={i * 0.1}>
                                    <span className="flex items-baseline gap-4 border-b border-[var(--v2-rule)] py-4">
                                        <span className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{i + 1}</span>
                                        <span className="v2-display text-[clamp(1.6rem,3vw,2.5rem)] leading-tight text-[var(--v2-ink)]">{l}</span>
                                    </span>
                                </Reveal>
                            ))}
                        </ol>
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
        </TempoProvider>
    );
}
