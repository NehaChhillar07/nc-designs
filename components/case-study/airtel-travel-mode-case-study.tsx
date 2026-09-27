"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { airtelData as d, EVIDENCE_SIZE, QUESTION_COUNT } from "@/data/airtel-travel-mode-data";
import { lora, spaceGrotesk } from "@/components/case-study/fonts";
import { fadeIn, fadeInUp } from "@/components/case-study/motion";
import {
    Body,
    Callout,
    Card,
    ChipTab,
    ChipTabs,
    ChipTabsList,
    FindingsList,
    H2,
    HandDrawnStrike,
    Lede,
    MovesStrip,
    PullQuote,
    QuestionHeader,
    QuestionMap,
    RejectedCard,
    SectionLabel,
    SpecTable,
    Split,
    withEmphasis,
} from "@/components/case-study/airtel/parts";
import { HandNotes, PhoneClip, PhoneShot, ShotRow, STAGE_W } from "@/components/case-study/airtel/media";
import { DayScrubber, ShotTabs } from "@/components/case-study/airtel/interactive";

// Wider than the other studies: every section pairs its copy with a large
// phone, and both need the room.
const wrap = "mx-auto max-w-6xl px-6";
/** Space between the two halves of a section that pairs two screens with two beats. */
const nextBeat = "mt-20 lg:mt-28";
const pad = "py-16 md:py-24";
const subLabel = "mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500";
const serif = "font-(family-name:--font-lora)";
const caveat = "font-(family-name:--font-caveat)";
const swap = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };

const stagger = (delay: number) => ({ ...fadeInUp, transition: { ...fadeInUp.transition, delay } });

// A mobile case study, so it opens differently from the others: its own dark
// band (the shared editorial-dark tokens, the same treatment unsaid runs) with
// the real prototype playing inside the first screen.
//
// After the hero the page follows one postpaid traveller's trip. The ending
// comes first (three moves), then today's app lived as her, then her seven
// questions in the order she asks them, each chapter opening on the question
// and answering it with real captures. Only after the trip does the page turn
// to the system, the build, the evidence and the trade-offs.
export function AirtelTravelModeCaseStudy() {
    return (
        <article className={`${lora.variable} ${spaceGrotesk.variable} cs-editorial bg-white`}>
            <Hero />
            <Moves />
            <Scene />
            <Questions />
            {/* Before you fly */}
            <Placement />
            <Trip />
            <Money />
            {/* The moment she lands */}
            <Landing />
            {/* Every day after */}
            <Days />
            <Charged />
            <RunsOut />
            {/* Back at the desk */}
            <System />
            <MotionAndBuild />
            <Measures />
            <TradeOffs />
            <Closer />
        </article>
    );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
    const h = d.hero;
    return (
        <header className="overflow-hidden bg-(image:--editorial-dark-gradient) pb-20 pt-28 text-cream md:pb-24 md:pt-36">
            <div className={`${wrap} grid items-start gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_1fr] xl:gap-x-24`}>
                <div className="lg:col-start-1 lg:row-start-1">
                    <motion.p {...fadeInUp} className="mb-6 text-sm font-medium tracking-wide text-cream md:mb-8">
                        {h.metaLine}
                    </motion.p>
                    <motion.h1
                        {...stagger(0.1)}
                        className="max-w-3xl text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:text-5xl"
                    >
                        {h.h1Pre}
                        <Highlighter action="underline" color="var(--accent-warm)" isView>
                            {h.h1Highlight}
                        </Highlighter>
                        {h.h1Post}
                    </motion.h1>
                </div>

                {/* On a phone this sits straight under the headline, so the
                    first screen already shows the thing the study is about. */}
                <motion.div
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.2 }}
                    className="justify-self-center lg:col-start-2 lg:row-span-2 lg:row-start-1"
                >
                    <PhoneClip clip={h.clip} dark eager showCaption={false} width="w-[min(240px,62vw)] lg:w-[300px] xl:w-[320px]" />
                    <p className={`${caveat} mx-auto mt-5 max-w-[16rem] -rotate-2 text-center text-xl font-semibold leading-tight text-accent-warm`}>
                        {h.annotation}
                    </p>
                </motion.div>

                <div className="lg:col-start-1 lg:row-start-2">
                    <motion.p {...stagger(0.15)} className="mb-6 max-w-2xl text-lg leading-relaxed text-cream-soft md:text-xl">
                        {h.lede}
                    </motion.p>
                    <motion.p {...stagger(0.2)} className="text-sm tracking-wide text-cream-faint">
                        {h.disciplines}
                    </motion.p>
                    <motion.dl {...stagger(0.25)} className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                        {h.metaRow.map((m) => (
                            <div key={m.label}>
                                <dt className="mb-1 text-sm text-cream-faint md:text-base">{m.label}</dt>
                                <dd className="text-lg font-medium text-cream md:text-xl">{m.value}</dd>
                            </div>
                        ))}
                    </motion.dl>
                    <motion.div {...stagger(0.3)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                        <Button
                            asChild
                            variant="outline"
                            className="h-auto rounded-full border-cream-faint bg-transparent px-6 py-3 text-[0.95rem] font-medium text-cream shadow-none hover:bg-cream/10 hover:text-cream"
                        >
                            <Link href={h.prototypeHref} target="_blank" rel="noopener noreferrer">
                                {h.prototypeLabel}
                                <ArrowUpRight aria-hidden="true" />
                            </Link>
                        </Button>
                        <p className="max-w-sm text-sm leading-relaxed text-cream-soft">{h.note}</p>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}

/* ------------------------------------------------------- the short version */

function Moves() {
    const m = d.moves;
    return (
        <section className="border-b border-gray-200 py-12 md:py-16">
            <div className={wrap}>
                <SectionLabel>{m.label}</SectionLabel>
                <MovesStrip items={m.items} linkLabel={m.linkLabel} />
            </div>
        </section>
    );
}

/* ------------------------------------------ the problem, lived as her */

function Scene() {
    const s = d.scene;
    return (
        <section className={pad}>
            <div className={wrap}>
                {/* The story is set in the serif, the reasoning everywhere else
                    in the sans, so the two voices never blur. Each step sits
                    beside the real screen it happens on. From xl both phones
                    keep 16rem free on their right, where the notes on the
                    first one sit, so the two line up. */}
                {s.steps.map((step, i) => (
                    <Split
                        key={step.shot.src}
                        wide
                        className={i > 0 ? nextBeat : undefined}
                        visual={
                            <div className="xl:pr-64">
                                <PhoneShot
                                    shot={step.shot}
                                    size={EVIDENCE_SIZE}
                                    width={STAGE_W}
                                    annotations={step.notes && <HandNotes notes={step.notes} />}
                                />
                            </div>
                        }
                    >
                        {i === 0 && (
                            <>
                                <SectionLabel>{s.label}</SectionLabel>
                                <H2 className="mb-8">{s.h2}</H2>
                            </>
                        )}
                        <motion.div {...fadeInUp} className="space-y-6">
                            {step.paragraphs.map((text) => (
                                <p key={text} className={`${serif} text-xl leading-relaxed text-gray-900 md:text-[1.3rem]`}>
                                    {text}
                                </p>
                            ))}
                        </motion.div>
                    </Split>
                ))}

                <Body items={[s.brief]} className="mt-20" />
                <PullQuote>{s.pullQuote}</PullQuote>
                <motion.p
                    {...fadeInUp}
                    className="flex max-w-3xl items-start gap-3 text-xl font-medium leading-snug text-gray-900"
                >
                    <ArrowDown aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent-warm-deep" />
                    {s.turn}
                </motion.p>
            </div>
        </section>
    );
}

/* ------------------------------------ her questions, and where I found them */

function Questions() {
    const r = d.questions;
    return (
        <section className={`${pad} bg-gray-50`}>
            <div className={wrap}>
                <SectionLabel>{r.label}</SectionLabel>
                <H2>{r.h2}</H2>
                <Lede>{r.lede}</Lede>
                <QuestionMap acts={r.acts} />

                <motion.p {...fadeInUp} className="mb-6 mt-16 max-w-3xl text-xl font-medium leading-snug text-gray-900">
                    {r.segmentsH3}
                </motion.p>
                <motion.div {...fadeInUp} className="grid gap-5 md:grid-cols-2">
                    {r.segments.map((s) => (
                        <div key={s.tag} className="rounded-lg border border-gray-200 bg-white p-5">
                            <p className="mb-2 text-xs font-semibold tracking-wide text-accent-warm-deep">{s.tag}</p>
                            <p className="mb-2 font-medium leading-snug text-gray-900">{s.h3}</p>
                            <p className="text-sm leading-relaxed text-gray-600">{s.body}</p>
                        </div>
                    ))}
                </motion.div>
                <motion.p {...fadeInUp} className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600">
                    {r.spine}
                </motion.p>
                <PullQuote cite={r.segmentQuoteCite}>{r.segmentQuote}</PullQuote>
            </div>
        </section>
    );
}

/* ================================================= before you fly */

function Placement() {
    const p = d.placement;
    const chosen = p.options.find((o) => o.chosen)!;
    return (
        <section id={p.id} className={pad}>
            <div className={wrap}>
                <Split visual={<ShotTabs items={p.shots} ariaLabel={p.shotsLabel} />}>
                    <QuestionHeader q={p} total={QUESTION_COUNT} answer={p.answer} />
                    <Body items={[p.lede]} className="mb-8" />

                    <motion.div {...fadeInUp}>
                        <ChipTabs defaultValue={chosen.label}>
                            <ChipTabsList aria-label="Where Travel Mode could live">
                                {p.options.map((o) => (
                                    <ChipTab key={o.label} value={o.label}>
                                        {o.label}
                                        {o.chosen ? <Check aria-label={p.chosenLabel} /> : <span className="sr-only">{p.rejectedLabel}</span>}
                                        {!o.chosen && <HandDrawnStrike />}
                                    </ChipTab>
                                ))}
                            </ChipTabsList>
                            {p.options.map((o) => (
                                <TabsContent key={o.label} value={o.label}>
                                    <motion.div {...swap} className="min-h-[9rem] max-w-3xl">
                                        <p className={`${caveat} mb-1 text-[1.6rem] font-semibold leading-none ${o.chosen ? "text-gray-900" : "text-accent-warm-deep"}`}>
                                            {o.chosen ? p.chosenLabel : p.rejectedLabel}
                                        </p>
                                        <p className="text-base leading-relaxed text-gray-600">{o.body}</p>
                                    </motion.div>
                                </TabsContent>
                            ))}
                        </ChipTabs>
                    </motion.div>

                    <Callout lead={p.callout.lead}>{p.callout.body}</Callout>
                </Split>
            </div>
        </section>
    );
}

function Trip() {
    const t = d.trip;
    return (
        <section id={t.id} className={`${pad} bg-gray-50`}>
            <div className={wrap}>
                <Split visual={<ShotTabs items={t.presets} ariaLabel={t.presetsLabel} />}>
                    <QuestionHeader q={t} total={QUESTION_COUNT} answer={t.answer} />
                    <Body items={t.body} />
                    <motion.p {...fadeInUp} className="mt-6 max-w-xl text-sm leading-relaxed text-gray-500">
                        {t.scoring}
                    </motion.p>
                    <motion.p {...fadeInUp} className="mt-4 text-sm text-gray-600">
                        <Link
                            href={d.hero.prototypeHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-accent-warm-strong"
                        >
                            {t.prototypeLine}
                            <ArrowUpRight className="size-4" aria-hidden="true" />
                        </Link>
                    </motion.p>
                </Split>
            </div>
        </section>
    );
}

function Money() {
    const m = d.money;
    return (
        <section id={m.id} className={pad}>
            <div className={wrap}>
                {/* Review, then confirmation: what she is told before she
                    commits, and how quietly it lands after, each beside the
                    reasoning for it. */}
                <Split visual={<PhoneShot shot={m.review} width={STAGE_W} />}>
                    <QuestionHeader q={m} total={QUESTION_COUNT} answer={m.answer} />
                    <Body items={m.body} />
                    <motion.p {...fadeInUp} className={`${subLabel} mt-10`}>
                        {m.buttonLabel}
                    </motion.p>
                    <motion.div {...fadeInUp} className="grid gap-3">
                        {m.buttonRejected.map((b) => (
                            <RejectedCard key={b.label} label={b.label} body={b.body} />
                        ))}
                        <Card title={m.buttonChosen.label} chosen>
                            {m.buttonChosen.body}
                        </Card>
                    </motion.div>
                </Split>

                <Split className={nextBeat} visual={<PhoneShot shot={m.confirmation} width={STAGE_W} />}>
                    <H2>{m.confirmH2}</H2>
                    <Body items={m.confirmBody} />
                    <motion.div {...fadeInUp} className="mt-8 grid gap-3">
                        {m.stampRules.map((r) => (
                            <Card key={r.h3} title={r.h3}>
                                {r.body}
                            </Card>
                        ))}
                    </motion.div>
                </Split>
            </div>
        </section>
    );
}

/* ============================================== the moment she lands */

function Landing() {
    const l = d.landing;
    // One switch for both halves: the banner she gets, then the screen it
    // opens, always in the same state.
    const [state, setState] = useState(l.states[0].label);
    const banners = l.states.map((s) => ({ label: s.label, shot: s.shots[0] }));
    const screens = l.states.map((s) => ({ label: s.label, shot: s.shots[1] }));
    return (
        <section id={l.id} className={`${pad} bg-gray-50`}>
            <div className={wrap}>
                <Split visual={<ShotTabs items={banners} value={state} onValueChange={setState} ariaLabel={l.statesLabel} />}>
                    <QuestionHeader q={l} total={QUESTION_COUNT} answer={l.answer} />
                    <Body items={l.body} />
                </Split>

                <Split
                    className={nextBeat}
                    visual={<ShotTabs items={screens} value={state} onValueChange={setState} ariaLabel={l.screensLabel} />}
                >
                    <motion.p {...fadeInUp} className={subLabel}>
                        {l.screenLabel}
                    </motion.p>
                    <Body items={[l.after]} />
                    <PullQuote>{l.pullQuote}</PullQuote>
                </Split>
            </div>
        </section>
    );
}

/* =================================================== every day after */

function Days() {
    const x = d.days;
    return (
        <section id={x.id} className={pad}>
            <div className={wrap}>
                <Split visual={<DayScrubber shots={x.dayShots} label={x.scrubLabel} ariaLabel={x.scrubAria} />}>
                    <QuestionHeader q={x} total={QUESTION_COUNT} answer={x.answer} />
                    <Body items={x.body} />
                    <motion.div {...fadeInUp} className="mt-8">
                        <Card title={x.cards[1].h3}>{x.cards[1].body}</Card>
                    </motion.div>
                </Split>

                {/* The red-zone rule sits beside the screen where it shows. */}
                <Split className={nextBeat} visual={<ShotTabs items={x.low} ariaLabel={x.lowLabel} />}>
                    <motion.p {...fadeInUp} className="mb-6 text-xl font-medium leading-snug text-gray-900">
                        {x.lowLabel}
                    </motion.p>
                    <motion.div {...fadeInUp}>
                        <Card title={x.cards[0].h3}>{x.cards[0].body}</Card>
                    </motion.div>
                </Split>
            </div>
        </section>
    );
}

function Charged() {
    const c = d.charged;
    const [banner, ledger] = c.parts;
    return (
        <section id={c.id} className={`${pad} bg-gray-50`}>
            <div className={wrap}>
                <Split visual={<PhoneShot shot={banner.shot} width={STAGE_W} />}>
                    <QuestionHeader q={c} total={QUESTION_COUNT} answer={c.answer} />
                    <Body items={[banner.body]} />
                </Split>
                <Split className={nextBeat} visual={<PhoneShot shot={ledger.shot} width={STAGE_W} />}>
                    <Body items={[ledger.body]} />
                    <PullQuote>{c.pullQuote}</PullQuote>
                </Split>
            </div>
        </section>
    );
}

function RunsOut() {
    const r = d.runsOut;
    return (
        <section id={r.id} className={pad}>
            <div className={wrap}>
                <Split visual={<ShotTabs items={r.shots} ariaLabel={r.shotsLabel} />}>
                    <QuestionHeader q={r} total={QUESTION_COUNT} answer={r.answer} />
                    <Body items={r.body} />
                </Split>
            </div>
        </section>
    );
}

/* ------------------------------------------ behind every answer, one trip */

function System() {
    const s = d.system;
    return (
        <section className={`${pad} bg-editorial-dark text-cream`}>
            <div className={wrap}>
                <Split visual={<PhoneShot shot={s.liveActivity} dark showCaption={false} width={STAGE_W} />}>
                    <SectionLabel dark>{s.label}</SectionLabel>
                    <H2 dark>{s.h2}</H2>
                    <Lede dark>{s.lede}</Lede>

                    <motion.div {...fadeInUp}>
                        {/* The trip, and everything that reads from it. */}
                        <div className="rounded-lg border border-cream/15 p-6">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream-faint">{s.tripLabel}</p>
                            <ul className="space-y-1">
                                {s.trip.map((t) => (
                                    <li key={t} className="text-lg font-medium text-cream">
                                        {t}
                                    </li>
                                ))}
                            </ul>
                            <p className={`${caveat} my-4 flex items-center gap-2 text-[1.6rem] font-semibold leading-none text-accent-warm`}>
                                {s.feedsLabel}
                                <ArrowDown aria-hidden="true" className="size-5" />
                            </p>
                            <ul className="flex flex-wrap gap-2">
                                {s.feeds.map((f) => (
                                    <li key={f} className="rounded-full border border-cream/15 px-4 py-2 text-sm text-cream-soft">
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <p className="mb-2 mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-cream-faint">{s.liveLabel}</p>
                        <p className="max-w-xl text-base leading-relaxed text-cream-soft">{s.liveBody}</p>
                    </motion.div>
                </Split>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------ the build */

function MotionAndBuild() {
    const m = d.motion;
    return (
        <section className={pad}>
            <div className={wrap}>
                <SectionLabel>{m.label}</SectionLabel>
                <H2>{m.h2}</H2>
                <Lede>{m.lede}</Lede>

                <motion.div {...fadeInUp}>
                    <ShotRow label={d.rows.motion} hint={d.rows.hint} gridFrom="lg" cols={3}>
                        {m.pieces.map((piece) => (
                            <div key={piece.title} className="w-[min(300px,78vw)] lg:w-auto">
                                <PhoneClip clip={piece.clip} showCaption={false} width="w-[min(240px,70vw)]" />
                                <div className="mb-3 mt-6 flex items-baseline justify-between gap-4 border-b border-gray-200 pb-3">
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-900">{piece.title}</p>
                                    <p className="shrink-0 font-(family-name:--font-space-grotesk) text-sm tabular-nums text-gray-500">
                                        {piece.total}
                                    </p>
                                </div>
                                <p className="mb-2 text-sm leading-relaxed text-gray-600">{piece.clip.caption}</p>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="spec" className="border-gray-200">
                                        <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline">
                                            {m.specLabel}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <SpecTable rows={piece.spec} headers={m.specHeaders} />
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        ))}
                    </ShotRow>
                </motion.div>

                <motion.p {...fadeInUp} className={`${subLabel} mt-20`}>
                    {m.replacedLabel}
                </motion.p>
                <motion.div {...fadeInUp} className="grid gap-5 md:grid-cols-3">
                    {m.replaced.map((r) => (
                        <RejectedCard key={r.tag} label={r.tag} title={r.h3} body={r.body} />
                    ))}
                </motion.div>

                <motion.p {...fadeInUp} className="mb-8 mt-20 text-xl font-medium leading-snug text-gray-900">
                    {m.buildH3}
                </motion.p>
                <motion.div {...fadeInUp} className="grid max-w-3xl gap-8 sm:grid-cols-3">
                    {m.stats.map((s) => (
                        <div key={s.value}>
                            <p className="mb-2 text-4xl font-medium tracking-tight text-gray-900">{s.value}</p>
                            <p className="text-sm leading-relaxed text-gray-500">{s.label}</p>
                        </div>
                    ))}
                </motion.div>
                <Body items={[m.buildBody]} className="mt-10" />

                <motion.p {...fadeInUp} className={`${subLabel} mt-20`}>
                    {m.caughtLabel}
                </motion.p>
                <Body items={[m.caughtIntro]} className="mb-6" />
                <FindingsList items={m.caught} />
            </div>
        </section>
    );
}

/* ------------------------------------------------ how I'd know it worked */

function Measures() {
    const m = d.measures;
    return (
        <section className={`${pad} bg-gray-50`}>
            <div className={wrap}>
                <SectionLabel>{m.label}</SectionLabel>
                <H2>{m.h2}</H2>
                <motion.div {...fadeInUp} className="mt-10 grid gap-5 md:grid-cols-3">
                    {m.items.map((it) => (
                        <div key={it.h3} className="h-full rounded-lg border border-gray-200 bg-white p-5">
                            <p className="mb-2 text-xs font-semibold tracking-wide text-accent-warm-deep">{it.tag}</p>
                            <p className="mb-2 font-medium leading-snug text-gray-900">{it.h3}</p>
                            <p className="text-sm leading-relaxed text-gray-600">{it.body}</p>
                        </div>
                    ))}
                </motion.div>
                <Callout lead={m.firstTest.lead}>{m.firstTest.body}</Callout>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------ trade-offs */

function TradeOffs() {
    const t = d.tradeoffs;
    return (
        <section className={pad}>
            <div className={wrap}>
                <SectionLabel>{t.label}</SectionLabel>
                <H2>{t.h2}</H2>
                <motion.div {...fadeInUp}>
                    <Accordion type="multiple" className="max-w-3xl border-t border-gray-200">
                        {t.items.map((item, i) => (
                            <AccordionItem key={item.title} value={item.title} className="border-gray-200">
                                <AccordionTrigger className="grid grid-cols-[2.5rem_minmax(0,1fr)_1rem] items-baseline gap-2 text-base font-medium text-gray-900 hover:no-underline">
                                    <span className="font-(family-name:--font-space-grotesk) font-semibold tabular-nums">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span>{item.title}</span>
                                </AccordionTrigger>
                                <AccordionContent className="pl-12 text-base leading-relaxed text-gray-600">
                                    <p>{item.body}</p>
                                    <p className="mt-2">
                                        <span className="font-semibold text-accent-warm-deep">{t.costLabel}</span> {item.cost}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
                <Callout lead={t.unresolved.lead}>{t.unresolved.body}</Callout>
            </div>
        </section>
    );
}

/* --------------------------------------------------------------- closer */

function Closer() {
    const c = d.closer;
    return (
        <section className={`${pad} bg-gray-50`}>
            <div className={wrap}>
                <SectionLabel>{c.nextLabel}</SectionLabel>
                <H2>{c.nextH2}</H2>
                <FindingsList items={c.next} />

                <motion.p {...fadeInUp} className={`${subLabel} mt-20`}>
                    {c.changedLabel}
                </motion.p>
                <H2>
                    {c.changedPre}
                    <Highlighter action="highlight" color="var(--accent-warm-soft)" isView>
                        {c.changedHighlight}
                    </Highlighter>
                </H2>
                <motion.ul {...fadeInUp} className="max-w-3xl list-disc space-y-1 pl-5 leading-relaxed text-gray-600">
                    {c.lessons.map((l) => (
                        <li key={l}>{withEmphasis(l)}</li>
                    ))}
                </motion.ul>

                {/* The three moves the page opened with, fading out. */}
                <motion.div {...fadeInUp} className="mt-16 border-t border-gray-200 pt-12 text-center">
                    {c.ladder.map((line, i) => (
                        <p
                            key={line}
                            className={`text-3xl font-semibold leading-tight tracking-tight md:text-5xl ${
                                ["text-gray-900", "text-gray-900/60", "text-gray-900/30"][i]
                            }`}
                        >
                            {line}
                        </p>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
