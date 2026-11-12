"use client";

// unsaid, told in six chapters on the paper, in its own lowercase voice. The
// story is the live case study's; the copy is edited so each claim is made
// once. One rule drives the system (nobody can know it's you), and the
// hardest decision (what a stranger may say) is the moment the reader tries.

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { GRID } from "@/components/home-v2/grid";
import { Reveal } from "@/components/home-v2/motion";
import { Signature } from "@/components/home-v2/signature";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { unV2 } from "@/data/v2-unsaid-data";

import { ChapterRail } from "../chapter-rail";
import { CAVEAT, Chapter, ChapterHeading, Prose, PullQuote, StrikeList } from "../cs-kit";
import { DecisionSet } from "../decision-set";
import { SwipeDeck } from "../flashcard/deck";
import { FlowDiagram } from "../flow-diagram";
import { PhonePrint } from "../phone-print";
import { Redaction } from "./redaction";
import { SafetySorter } from "./safety-sorter";
import { UnHero } from "./un-hero";
import { WorldSwitch } from "./world-switch";

const d = unV2;
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

// Body copy keeps the live page's *asterisk* emphasis.
function Em({ text }: { text: string }) {
    return (
        <>
            {text.split(/(\*[^*]+\*)/).map((part, i) =>
                part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
            )}
        </>
    );
}

function Paras({ items }: { items: readonly string[] }) {
    return (
        <Prose>
            {items.map((p) => (
                <p key={p}>
                    <Em text={p} />
                </p>
            ))}
        </Prose>
    );
}

function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <div className={GRID}>
            <h3 className="v2-display col-span-4 text-[clamp(1.9rem,3.8vw,3.25rem)] leading-[1.05] tracking-[-0.01em] text-[var(--v2-ink)] md:col-span-10 lg:col-span-7 lg:col-start-3">
                {children}
            </h3>
        </div>
    );
}

export function UnsaidV2() {
    const { origin, rule, safety, worlds, feel, made } = d;

    return (
        <>
            <ChapterRail chapters={d.chapters} label={d.railLabel} />
            <article>
                <UnHero />
                <BigGap />

                {/* 01 · where it came from */}
                <C id="origin">
                    <ChapterHeading id="origin" before={origin.before} highlight={origin.highlight} />
                    <Gap />
                    <Paras items={origin.body} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <DecisionSet rejected={origin.decision.rejected} chosen={origin.decision.chosen} rejectedStamp="not this" chosenLabel="this" />
                        </div>
                    </div>
                </C>
                <BigGap />

                {/* 02 · one rule */}
                <C id="rule">
                    <ChapterHeading id="rule" before={rule.heading} />
                    <Gap />
                    <Paras items={rule.body.slice(0, 1)} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <Redaction />
                        </div>
                    </div>
                    <Gap />
                    <Paras items={rule.body.slice(1)} />
                    <Gap />
                    <div className={`${GRID} gap-y-10`}>
                        <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-3">
                            <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{rule.deletedLabel}</p>
                            <ul className="mt-4 space-y-3">
                                {rule.deleted.map((x) => (
                                    <li key={x.item}>
                                        <StrikeList items={[x.item]} />
                                        {x.note && (
                                            <p className="mt-1 text-[19px] leading-tight text-[var(--v2-oxblood)]" style={CAVEAT}>
                                                {x.note}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-8">
                            <p className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{rule.addedLabel}</p>
                            <ul className="mt-4 space-y-3">
                                {rule.added.map((x) => (
                                    <li key={x.item}>
                                        <p className="v2-display text-[24px] leading-tight text-[var(--v2-ink)]">{x.item}</p>
                                        <p className="mt-1 text-[19px] leading-tight text-[var(--v2-oxblood)]" style={CAVEAT}>
                                            {x.note}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Gap />
                    <PullQuote>{rule.pullQuote}</PullQuote>
                </C>
                <BigGap />

                {/* 03 · what a stranger is allowed to say: the hands-on moment */}
                <C id="safety">
                    <ChapterHeading id="safety" before={safety.heading} />
                    <Gap />
                    <Paras items={safety.body} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <SafetySorter />
                        </div>
                    </div>
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <FlowDiagram lanes={safety.layers} />
                        </div>
                    </div>
                    <SpecGap className="h-20 md:h-28" />
                    <SubHeading>{safety.registerHeading}</SubHeading>
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <p className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{safety.registerLabel}</p>
                            <ul className="mt-4 grid gap-4 md:grid-cols-2">
                                {safety.register.map((c, i) => (
                                    <Reveal as="li" key={c.role} delay={i * 0.08} className="flex flex-col bg-[#1a1412] p-5 text-[#f2ece3] shadow-[0_22px_36px_-26px_rgba(0,0,0,0.6)]">
                                        <span className="flex items-center justify-between gap-2">
                                            <span className="v2-mono rounded-full border border-white/15 px-2.5 py-1 text-[11px]">{c.role}</span>
                                            <span className="v2-mono text-[11px] text-white/60">{c.mood}</span>
                                        </span>
                                        <span className="v2-display mt-4 flex-1 text-[22px] leading-[1.25]">{c.body}</span>
                                    </Reveal>
                                ))}
                            </ul>
                            <p className="mt-4 text-[15px] leading-snug text-[var(--v2-muted)]">{safety.registerCaption}</p>
                        </div>
                    </div>
                </C>
                <BigGap />

                {/* 04 · two worlds */}
                <C id="worlds">
                    <ChapterHeading id="worlds" before={worlds.heading} />
                    <Gap />
                    <div className={`${GRID} items-center gap-y-10`}>
                        <div className="col-span-4 max-w-[64ch] space-y-5 text-[17px] leading-[1.75] text-[var(--v2-ink)] md:col-span-6 md:text-[18px] lg:col-span-5 lg:col-start-3">
                            {worlds.body.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>
                        <div className="col-span-4 md:col-span-5 md:col-start-8 lg:col-span-3 lg:col-start-9">
                            <WorldSwitch />
                        </div>
                    </div>
                </C>
                <BigGap />

                {/* 05 · the feel */}
                <C id="feel">
                    <ChapterHeading id="feel" before={feel.heading} />
                    <Gap />
                    <div className={`${GRID} items-center gap-y-10`}>
                        <div className="col-span-4 max-w-[64ch] text-[17px] leading-[1.75] text-[var(--v2-ink)] md:col-span-6 md:text-[18px] lg:col-span-5 lg:col-start-3">
                            <p>{feel.body[0]}</p>
                        </div>
                        <div className="col-span-4 bg-[#1a1412] px-6 py-8 md:col-span-6 lg:col-span-4 lg:col-start-8">
                            <SwipeDeck
                                cards={feel.deck}
                                label={feel.deckLabel}
                                controls={feel.controls}
                                complete={feel.complete}
                                restart={feel.restart}
                                swipe={feel.swipe}
                                className="mx-auto w-full max-w-[300px]"
                            />
                        </div>
                    </div>
                    <Gap />
                    <div className={`${GRID} items-center gap-y-10`}>
                        <div className="col-span-4 md:col-span-5 lg:col-span-3 lg:col-start-3">
                            <PhonePrint {...feel.yourTurn} caption={feel.yourTurn.bar} tilt={-2} />
                        </div>
                        <div className="col-span-4 max-w-[64ch] space-y-5 text-[17px] leading-[1.75] text-[var(--v2-ink)] md:col-span-6 md:col-start-7 md:text-[18px] lg:col-span-5 lg:col-start-7">
                            <p>{feel.body[1]}</p>
                            <p>{feel.body[2]}</p>
                        </div>
                    </div>
                </C>
                <BigGap />

                {/* 06 · how it was made, and what i take from it */}
                <C id="made">
                    <ChapterHeading id="made" before={made.heading} />
                    <Gap />
                    <Paras items={made.body} />
                    <Gap />
                    <div className={GRID}>
                        <div className="col-span-4 md:col-span-10 lg:col-span-7 lg:col-start-3">
                            <p className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{made.callsLabel}</p>
                            <ul className="mt-4 space-y-3 border-l-2 border-[var(--v2-oxblood)] pl-5">
                                {made.calls.map((c) => (
                                    <li key={c} className="text-[17px] leading-[1.6] text-[var(--v2-ink)]">
                                        {c}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-5">
                                <a href={made.repo.href} target="_blank" rel="noreferrer" className="v2-link text-[16px]">
                                    {made.repo.label}
                                </a>
                            </p>
                        </div>
                    </div>
                    <SpecGap className="h-20 md:h-28" />
                    <SubHeading>{made.closer}</SubHeading>
                    <Gap />
                    <div className={GRID}>
                        <ol className="col-span-4 md:col-span-10 lg:col-span-7 lg:col-start-3">
                            {made.lessons.map((l, i) => (
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
                    <div className={GRID}>
                        <div className="col-span-4 md:col-span-10 lg:col-span-7 lg:col-start-3">
                            <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{made.differentlyLabel}</p>
                            <p className="mt-2 text-[21px] leading-[1.3] text-[var(--v2-oxblood)] md:text-[23px]" style={CAVEAT}>
                                {made.differently}
                            </p>
                        </div>
                    </div>
                    <SpecGap className="h-16 md:h-24" />
                    <div className={GRID}>
                        <p className="v2-display col-span-4 text-[clamp(2.5rem,6vw,5rem)] italic leading-none text-[var(--v2-oxblood)] md:col-span-10 lg:col-start-3">{made.finalLine}</p>
                        <p className="col-span-4 mt-6 md:col-span-8 lg:col-start-3">
                            <a href={made.live.href} target="_blank" rel="noreferrer" className="v2-link text-[17px]">
                                {made.live.label}
                            </a>
                        </p>
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
