"use client";

// The opener. The first screen carries the title, the line and the outcome:
// no loader, no pinned runway. Below it, the real cover card as a print on
// its coloured table. The deck to try waits for chapter 02, where it proves
// the format decision.

import { motion } from "motion/react";

import { GRID } from "@/components/home-v2/grid";
import { DUR, EASE } from "@/components/home-v2/motion";
import { Spec } from "@/components/home-v2/spec-mode";
import { fcV2 } from "@/data/v2-flashcard-data";

import { Stamp } from "../cs-kit";
import { CoverFace } from "./deck";
import { GrainTable } from "./grain-table";

const { hero, cover } = fcV2;

function Line() {
    const [a] = hero.line.split(hero.lineHighlight);
    return (
        <>
            {a}
            <em className="italic text-[var(--v2-oxblood)]">{hero.lineHighlight}</em>
        </>
    );
}

export function FcHero() {
    return (
        <header>
            <div className={GRID}>
                <p className="v2-mono col-span-4 text-[12px] text-[var(--v2-muted)] md:col-span-8 lg:col-start-3">{hero.eyebrow.toLowerCase()}</p>
                <Spec
                    name="display / case title"
                    type
                    className="v2-display col-span-4 mt-4 text-[clamp(3.6rem,11vw,10.5rem)] leading-[0.82] tracking-[-0.03em] text-[var(--v2-oxblood)] md:col-span-12 lg:col-span-10 lg:col-start-3"
                >
                    {/* Set, not signed: a project title isn't a signature. */}
                    <h1 aria-label={hero.titleLabel}>
                        <span aria-hidden className="v2-title block" style={{ "--line": 0 } as React.CSSProperties}>
                            {hero.title[0]}
                        </span>
                        <span aria-hidden className="v2-title block pl-[0.6em] italic" style={{ "--line": 1 } as React.CSSProperties}>
                            {hero.title[1]}
                        </span>
                    </h1>
                </Spec>
            </div>

            <div className={`${GRID} mt-10 md:mt-14`}>
                <Spec
                    as="p"
                    name="display / problem"
                    type
                    className="v2-display col-span-4 text-[clamp(1.75rem,3.3vw,2.85rem)] leading-[1.12] text-[var(--v2-ink)] md:col-span-9 lg:col-span-7 lg:col-start-3"
                >
                    <Line />
                </Spec>
                <p className="col-span-4 mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-[var(--v2-muted)] md:col-span-8 lg:col-span-6 lg:col-start-3">{hero.subtitle}</p>
                {/* The outcome on the first screen, for the reader who stops here. */}
                <p className="col-span-4 mt-6 border-l-2 border-[var(--v2-oxblood)] pl-4 text-[17px] leading-snug text-[var(--v2-ink)] md:col-span-10 lg:col-span-8 lg:col-start-3">
                    {hero.impact}
                </p>
            </div>

            <div className={`${GRID} mt-10`}>
                <dl className="col-span-4 grid grid-cols-3 gap-4 border-t border-[var(--v2-rule)] pt-4 md:col-span-7 lg:col-span-5 lg:col-start-3">
                    {hero.facts.map((f) => (
                        <div key={f.label}>
                            <dt className="v2-mono text-[11px] text-[var(--v2-muted)]">{f.label}</dt>
                            <dd className="mt-1 text-[15px] leading-snug text-[var(--v2-ink)]">{f.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            {/* the table */}
            <div className={`${GRID} mt-16 md:mt-24`}>
                <motion.figure
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={{ duration: DUR.slow, ease: EASE }}
                    className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-3"
                >
                    <GrainTable seed={1} className="px-6 py-12 md:py-16">
                        {/* the real thing, as a print */}
                        <div className="relative mx-auto w-[78%] max-w-[320px] rotate-[3deg] bg-[#f7f3ec] p-2 pb-0 shadow-[0_30px_50px_-28px_rgba(0,0,0,0.7)]">
                            <div className="aspect-[958/1159]">
                                <CoverFace className="rounded-[10px] shadow-none" priority />
                            </div>
                            <p className="v2-mono flex min-h-9 items-center px-1 py-2 text-[11px] text-[var(--v2-ink)] md:text-[12px]">{cover.bar.toLowerCase()}</p>
                            <Stamp className="absolute -top-3 right-3">{cover.stamp}</Stamp>
                        </div>
                    </GrainTable>
                    <figcaption className="v2-mono mt-3 text-[11px] text-[var(--v2-muted)] md:text-[12px]">{hero.caption}</figcaption>
                </motion.figure>
            </div>
        </header>
    );
}
