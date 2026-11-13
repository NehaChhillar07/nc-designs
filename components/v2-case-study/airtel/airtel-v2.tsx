"use client";

// Airtel Travel Mode, told from inside one traveller's trip on the paper.
// The story is the live case study's; the copy is edited so each claim is
// made once. Each chapter is headed by the question she asks at that point;
// the answer follows in oxblood, then the reasoning. The hands-on moment is
// the arrival (chapter 05): the banner and the screen it opens, connected or
// not, switched together.

import Image from "next/image";
import Link from "next/link";

import { GRID } from "@/components/home-v2/grid";
import { HandArrow } from "@/components/home-v2/hand-arrow";
import { Reveal } from "@/components/home-v2/motion";
import { Signature } from "@/components/home-v2/signature";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { atV2 } from "@/data/v2-airtel-travel-mode-data";

import { ChapterRail } from "../chapter-rail";
import { CAVEAT, Chapter, ChapterHeading, MarginNote, Prose, PullQuote } from "../cs-kit";
import { DecisionSet } from "../decision-set";
import { PhonePrint } from "../phone-print";
import { PhoneSwitch } from "../phone-switch";
import { AtHero } from "./at-hero";
import { DayScrub } from "./day-scrub";
import { TripFeeds } from "./trip-feeds";
import { TripRoute } from "./trip-route";

const d = atV2;
const ch = Object.fromEntries(d.chapters.map((c) => [c.id, c])) as Record<string, (typeof d.chapters)[number]>;
const Gap = () => <SpecGap className="h-12 md:h-16" />;
const BigGap = () => <SpecGap className="h-32 md:h-48" />;
const WIDE = "col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-3";
const H3 = "v2-display !mb-6 text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.05] tracking-[-0.01em] text-[var(--v2-ink)]";
const TEXT = "col-span-4 max-w-[64ch] space-y-5 text-[17px] leading-[1.75] text-[var(--v2-ink)] md:text-[18px]";

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

// The answer to the chapter's question, right under it.
function Answer({ children }: { children: React.ReactNode }) {
    return (
        <div className={GRID}>
            <p className="v2-display col-span-4 mt-6 text-[clamp(1.4rem,2.4vw,2rem)] italic leading-[1.2] text-[var(--v2-oxblood)] md:col-span-10 lg:col-span-7 lg:col-start-3">{children}</p>
        </div>
    );
}

function SubHeading({ id, children }: { id?: string; children: React.ReactNode }) {
    return (
        <div className={GRID}>
            <h3 id={id} className="v2-display col-span-4 scroll-mt-24 text-[clamp(1.9rem,3.8vw,3.25rem)] leading-[1.05] tracking-[-0.01em] text-[var(--v2-ink)] md:col-span-10 lg:col-span-7 lg:col-start-3">
                {children}
            </h3>
        </div>
    );
}

function Label({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "oxblood" }) {
    return <p className={`v2-mono text-[12px] ${tone === "oxblood" ? "text-[var(--v2-oxblood)]" : "text-[var(--v2-muted)]"}`}>{children}</p>;
}

export function AirtelV2() {
    const { problem, placement, trip, money, landing, days, system, measure, learned } = d;

    return (
        <>
            <ChapterRail chapters={d.chapters} label={d.railLabel} />
            <article>
                <AtHero />
                <BigGap />

                {/* 01 · the problem, and the seven questions */}
                <C id="problem">
                    <ChapterHeading id="problem" before={problem.heading} />
                    <Gap />
                    <div className="space-y-12 md:space-y-16">
                        {problem.steps.map((s, i) => (
                            <div key={s.shot.src} className={`${GRID} items-center gap-y-8`}>
                                <div className={`${TEXT} md:col-span-6 lg:col-span-5 ${i % 2 ? "md:order-2 md:col-start-7 lg:col-start-7" : "lg:col-start-3"}`}>
                                    <p>{s.body}</p>
                                </div>
                                <div className={`col-span-4 md:col-span-5 lg:col-span-3 ${i % 2 ? "md:order-1 md:col-start-1 lg:col-start-3" : "md:col-start-8 lg:col-start-9"}`}>
                                    <PhonePrint {...s.shot} caption={s.shot.bar} tilt={i % 2 ? 1.5 : -1.5} className="max-w-[240px]" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Gap />
                    <Paras items={[problem.reframe]} />
                    <Gap />
                    <PullQuote>{problem.pullQuote}</PullQuote>
                    <SpecGap className="h-20 md:h-28" />
                    <SubHeading>{problem.researchHeading}</SubHeading>
                    <Gap />
                    <Paras items={[problem.researchLede]} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <TripRoute />
                        </div>
                    </div>
                </C>
                <BigGap />

                {/* 02 · before you fly: where is roaming, which pack, is it charging me */}
                <C id={d.chapters[1].id}>
                    <ChapterHeading id={d.chapters[1].id} before={placement.heading} />
                    <Answer>{placement.answer}</Answer>
                    <Gap />
                    <Paras items={[placement.lede]} />
                    <Gap />
                    <div className={`${GRID} items-center gap-y-12`}>
                        <div className="col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-3">
                            <DecisionSet rejected={placement.rejected} chosen={placement.chosen} className="lg:grid-cols-2" />
                        </div>
                        <div className="col-span-4 md:col-span-6 md:col-start-4 lg:col-span-3 lg:col-start-10">
                            <PhoneSwitch id="at-home" label={placement.homeLabel} states={placement.home} />
                        </div>
                    </div>

                    <SpecGap className="h-20 md:h-28" />
                    <SubHeading id={trip.id}>{trip.heading}</SubHeading>
                    <Answer>{trip.answer}</Answer>
                    <Gap />
                    <div className={`${GRID} items-center gap-y-10`}>
                        <div className={`${TEXT} md:col-span-6 lg:col-span-5 lg:col-start-3`}>
                            {trip.body.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>
                        <div className="col-span-4 md:col-span-5 md:col-start-8 lg:col-span-3 lg:col-start-9">
                            <PhonePrint {...trip.form} caption={trip.form.bar} tilt={-1.5} className="max-w-[260px]" />
                        </div>
                    </div>
                    <Gap />
                    <div className={`${GRID} items-start gap-y-10`}>
                        <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-3">
                            <PhoneSwitch id="at-trip" label={trip.presetsLabel} states={trip.presets} />
                        </div>
                        {/* The scoring rules, out of the small print. */}
                        <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-8 md:mt-16">
                            <Reveal className="bg-[#f7f3ec] p-6 shadow-[0_22px_36px_-26px_rgba(60,10,12,0.55)]">
                                <Label tone="oxblood">{trip.scoringLabel}</Label>
                                <ul className="mt-4 divide-y divide-[var(--v2-rule)]" data-scoring>
                                    {trip.scoring.map((s) => (
                                        <li key={s.rule} className="flex items-baseline justify-between gap-4 py-2.5 text-[16px] leading-snug text-[var(--v2-ink)]">
                                            {s.rule}
                                            {s.score && <span className="v2-mono shrink-0 text-[13px] text-[var(--v2-oxblood)]">{s.score}</span>}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-3 text-[19px] leading-tight text-[var(--v2-oxblood)]" style={CAVEAT}>
                                    {trip.scoringNote}
                                </p>
                            </Reveal>
                        </div>
                    </div>

                    <SpecGap className="h-20 md:h-28" />
                    <SubHeading id={money.id}>{money.heading}</SubHeading>
                    <Answer>{money.answer}</Answer>
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <p className="max-w-[64ch] text-[17px] leading-[1.75] text-[var(--v2-ink)] md:text-[18px]">{money.body}</p>
                            <div className="mt-8">
                                <Label>{money.buttonLabel}</Label>
                                <DecisionSet rejected={money.rejected} chosen={money.chosen} className="mt-4" />
                            </div>
                        </div>
                    </div>
                    <Gap />
                    <div className={`${GRID} items-center gap-y-10`}>
                        <div className={`${TEXT} md:col-span-12 lg:col-span-4 lg:col-start-3`}>
                            <p>{money.confirm}</p>
                        </div>
                        <div className="col-span-4 grid grid-cols-2 items-start gap-4 md:col-span-8 md:col-start-3 md:gap-8 lg:col-span-5 lg:col-start-8">
                            <PhonePrint {...money.review} caption={money.review.bar} tilt={-1.5} sizes="(min-width: 768px) 280px, 45vw" />
                            <PhonePrint {...money.confirmation} caption={money.confirmation.bar} stamp="recording" tilt={1.5} sizes="(min-width: 768px) 280px, 45vw" className="mt-10 md:mt-16" />
                        </div>
                    </div>
                </C>
                <BigGap />

                {/* 03 · is my phone working? The hands-on moment. */}
                <C id={d.chapters[2].id}>
                    <ChapterHeading id={d.chapters[2].id} before={landing.heading} />
                    <Answer>{landing.answer}</Answer>
                    <Gap />
                    <Paras items={[landing.body]} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <PhoneSwitch id="at-arrival" label={landing.switchLabel} states={landing.states} />
                        </div>
                    </div>
                    <Gap />
                    <Paras items={[landing.after]} />
                    <Gap />
                    <PullQuote>{landing.pullQuote}</PullQuote>
                </C>
                <BigGap />

                {/* 04 · every day after: how much is left, why was I charged, when it runs out */}
                <C id={d.chapters[3].id}>
                    <ChapterHeading id={d.chapters[3].id} before={days.heading} />
                    <Answer>{days.answer}</Answer>
                    <Gap />
                    <div className={`${GRID} items-center gap-y-10`}>
                        <div className={`${TEXT} md:col-span-6 lg:col-span-4 lg:col-start-3`}>
                            <p>{days.body}</p>
                            <MarginNote className="pt-4">
                                {days.redZone.lead} {days.redZone.body}
                            </MarginNote>
                        </div>
                        <div className="col-span-4 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-8">
                            <DayScrub />
                        </div>
                    </div>

                    <SpecGap className="h-20 md:h-28" />
                    <div className={`${GRID} items-center gap-y-10`}>
                        <div className={`${TEXT} md:col-span-12 lg:col-span-4 lg:col-start-3`}>
                            <h3 id={days.charged.id} className={`${H3} scroll-mt-24`}>
                                {days.charged.heading}
                            </h3>
                            {days.charged.body.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>
                        <div className="col-span-4 grid grid-cols-2 items-start gap-4 md:col-span-8 md:col-start-3 md:gap-8 lg:col-span-5 lg:col-start-8">
                            <PhonePrint {...days.charged.banner} caption={days.charged.banner.bar} tilt={-1.5} sizes="(min-width: 768px) 280px, 45vw" />
                            <PhonePrint {...days.charged.ledger} caption={days.charged.ledger.bar} tilt={1.5} sizes="(min-width: 768px) 280px, 45vw" className="mt-10 md:mt-16" />
                        </div>
                    </div>
                    <Gap />
                    <PullQuote>{days.charged.pullQuote}</PullQuote>

                    <SpecGap className="h-20 md:h-28" />
                    <SubHeading id={days.runsOut.id}>{days.runsOut.heading}</SubHeading>
                    <Gap />
                    <Paras items={[days.runsOut.body]} />
                    <Gap />
                    <div className={GRID}>
                        <div className="col-span-4 grid grid-cols-3 items-start gap-3 md:col-span-10 md:col-start-2 md:gap-8 lg:col-span-8 lg:col-start-3">
                            {days.runsOut.shots.map((s, i) => (
                                <PhonePrint key={s.src} {...s} caption={s.bar} tilt={[-1.5, 1, -1][i]} sizes="(min-width: 768px) 280px, 31vw" className={i === 1 ? "mt-8" : ""} />
                            ))}
                        </div>
                        <p className="col-span-4 mt-4 flex items-end gap-1.5 text-[var(--v2-oxblood)] md:col-span-8 lg:col-start-3">
                            <HandArrow direction="up" className="h-8 w-8" />
                            <span className="pb-0.5 text-[19px] leading-tight" style={CAVEAT}>
                                {days.runsOut.autoAdd}
                            </span>
                        </p>
                    </div>
                </C>
                <BigGap />

                {/* 05 · one trip, every surface, built in code */}
                <C id="system">
                    <ChapterHeading id="system" before={system.heading} />
                    <Gap />
                    <Paras items={system.body.slice(0, 1)} />
                    <Gap />
                    <div className={GRID}>
                        <div className={WIDE}>
                            <TripFeeds />
                        </div>
                    </div>
                    <Gap />
                    <div className={`${GRID} items-center gap-y-10`}>
                        <div className="col-span-4 md:col-span-5 lg:col-span-3 lg:col-start-3">
                            <PhonePrint {...system.liveActivity} caption={system.liveActivity.bar} tilt={-1.5} className="max-w-[280px]" />
                        </div>
                        <div className={`${TEXT} md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-7`}>
                            <p>{system.liveBody}</p>
                            <p>{system.body[1]}</p>
                            <ul className="space-y-3 border-l-2 border-[var(--v2-oxblood)] pl-5" aria-label={system.caughtLabel}>
                                {system.caught.map((c) => (
                                    <li key={c.lead} className="text-[16px] leading-[1.55]">
                                        <span className="font-medium">{c.lead}</span> {c.body}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Gap />
                    <div className={GRID}>
                        <dl className="col-span-4 grid gap-6 border-t border-[var(--v2-rule)] pt-6 md:col-span-12 md:grid-cols-3 lg:col-span-8 lg:col-start-3">
                            {system.stats.map((s) => (
                                <div key={s.value} className="flex flex-col-reverse">
                                    <dt className="mt-2 text-[15px] leading-snug text-[var(--v2-ink)]">{s.label}</dt>
                                    <dd className="v2-display text-[clamp(2.75rem,5vw,4rem)] leading-none text-[var(--v2-oxblood)]">{s.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </C>
                <BigGap />

                {/* 06 · what I'd measure, and what it cost */}
                <C id="measure">
                    <ChapterHeading id="measure" before={measure.heading} />
                    <Gap />
                    <div className={GRID}>
                        <ul className="col-span-4 grid gap-5 md:col-span-12 md:grid-cols-3 lg:col-span-8 lg:col-start-3">
                            {measure.items.map((m, i) => (
                                <Reveal as="li" key={m.h3} delay={i * 0.08} className="bg-[#f7f3ec] p-6 shadow-[0_22px_36px_-26px_rgba(60,10,12,0.55)]">
                                    <Label tone="oxblood">{m.tag.toLowerCase()}</Label>
                                    <p className="v2-display mt-2 text-[24px] leading-tight text-[var(--v2-ink)]">{m.h3}</p>
                                    <p className="mt-2 text-[15px] leading-snug text-[var(--v2-ink)]">{m.body}</p>
                                </Reveal>
                            ))}
                        </ul>
                    </div>
                    <Gap />
                    <Prose>
                        <p>
                            <span className="font-medium">{measure.firstTest.lead}</span> {measure.firstTest.body}
                        </p>
                    </Prose>
                    <SpecGap className="h-20 md:h-28" />
                    <SubHeading>{measure.tradeoffsHeading}</SubHeading>
                    <Gap />
                    <div className={GRID}>
                        <ol className="col-span-4 md:col-span-10 lg:col-span-7 lg:col-start-3">
                            {measure.tradeoffs.map((t, i) => (
                                <li key={t.title} className="grid grid-cols-[1.75rem_1fr] border-b border-[var(--v2-rule)] py-5">
                                    <span className="v2-mono pt-1.5 text-[12px] text-[var(--v2-oxblood)]">{i + 1}</span>
                                    <span>
                                        <span className="v2-display block text-[24px] leading-tight text-[var(--v2-ink)]">{t.title}</span>
                                        <span className="mt-2 block text-[16px] leading-[1.6] text-[var(--v2-ink)]">{t.body}</span>
                                        <span className="mt-2 block text-[15px] leading-snug text-[var(--v2-muted)]">
                                            <span className="v2-mono text-[11px] text-[var(--v2-oxblood)]">{measure.costLabel.toLowerCase()}:</span> {t.cost}
                                        </span>
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <SpecGap className="h-20 md:h-28" />
                    <SubHeading>{measure.unresolvedHeading}</SubHeading>
                    <Gap />
                    <div className={GRID}>
                        <ol className="col-span-4 space-y-6 border-l-2 border-[var(--v2-oxblood)] pl-5 md:col-span-10 lg:col-span-6 lg:col-start-3" data-unresolved>
                            {measure.unresolved.map((u) => (
                                <li key={u.lead} className="text-[17px] leading-[1.7] text-[var(--v2-ink)] md:text-[18px]">
                                    <span className="v2-display block text-[24px] leading-tight">{u.lead}</span>
                                    <span className="mt-2 block">{u.body}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </C>
                <BigGap />

                {/* 07 · what this changed in me */}
                <C id="learned">
                    <ChapterHeading id="learned" before={learned.before} highlight={learned.highlight} />
                    <Gap />
                    <div className={GRID}>
                        <ol className="col-span-4 md:col-span-10 lg:col-span-7 lg:col-start-3">
                            {learned.lessons.map((l, i) => (
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
                            <Label>{learned.differentlyLabel}</Label>
                            <p className="mt-2 text-[21px] leading-[1.3] text-[var(--v2-oxblood)] md:text-[23px]" style={CAVEAT}>
                                {learned.differently}
                            </p>
                            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                                <a href={learned.prototype.href} target="_blank" rel="noreferrer" className="v2-link text-[17px]">
                                    {learned.prototype.label}
                                </a>
                                <a href={learned.repo.href} target="_blank" rel="noreferrer" className="v2-link text-[17px]">
                                    {learned.repo.label}
                                </a>
                            </p>
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
