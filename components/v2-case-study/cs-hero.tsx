"use client";

// The opener. The first screen always carries the title and the problem: no
// loader, no pinned runway. Below it, the dashboard sits as a tilted print
// that straightens and settles as the reader scrolls (a scroll-linked
// transform, not a scroll-jack: the page scrolls normally the whole time).

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { GRID } from "@/components/home-v2/grid";
import { Spec } from "@/components/home-v2/spec-mode";
import { hfV2 } from "@/data/v2-human-firewall-data";

import { MarginNote } from "./cs-kit";

const { hero } = hfV2;

// The problem sentence with its highlighted phrase in oxblood italic.
function Problem() {
    const [a, b] = hero.problem.split(hero.problemHighlight);
    return (
        <>
            {a}
            <em className="italic text-[var(--v2-oxblood)]">{hero.problemHighlight}</em>
            {b}
        </>
    );
}

export function CaseHero() {
    const shotRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: shotRef, offset: ["start end", "center center"] });
    const rotate = useTransform(scrollYProgress, [0, 1], [-4, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

    return (
        <header>
            <div className={GRID}>
                <p className="v2-mono col-span-4 text-[12px] text-[var(--v2-muted)] md:col-span-8 lg:col-start-3">{hero.eyebrow.toLowerCase()}</p>
                <Spec
                    name="display / case title"
                    type
                    className="v2-display col-span-4 mt-4 text-[clamp(4rem,12vw,11.5rem)] leading-[0.82] tracking-[-0.03em] text-[var(--v2-oxblood)] md:col-span-12 lg:col-span-10 lg:col-start-3"
                >
                    {/* Set, not signed: a project title isn't a signature. */}
                    <h1 aria-label={hero.titleLabel}>
                        <span aria-hidden className="v2-title block" style={{ "--line": 0 } as React.CSSProperties}>
                            {hero.title[0]}
                        </span>
                        <span aria-hidden className="v2-title block pl-[0.5em] italic" style={{ "--line": 1 } as React.CSSProperties}>
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
                    <Problem />
                </Spec>
                <p className="col-span-4 mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-[var(--v2-muted)] md:col-span-8 lg:col-span-6 lg:col-start-3">
                    {hero.subtitle}
                </p>
            </div>

            <div className={`${GRID} mt-10 items-start`}>
                <dl className="col-span-4 grid grid-cols-3 gap-4 border-t border-[var(--v2-rule)] pt-4 md:col-span-7 lg:col-span-5 lg:col-start-3">
                    {hero.facts.map((f) => (
                        <div key={f.label}>
                            <dt className="v2-mono text-[11px] text-[var(--v2-muted)]">{f.label}</dt>
                            <dd className="mt-1 text-[15px] leading-snug text-[var(--v2-ink)]">{f.value}</dd>
                        </div>
                    ))}
                </dl>
                <MarginNote label={hero.buildNoteLabel.toLowerCase()} className="col-span-4 mt-8 md:col-span-5 md:mt-0 lg:col-span-3 lg:col-start-9">
                    {hero.buildNote}
                </MarginNote>
            </div>

            <div className={`${GRID} mt-16 md:mt-24`}>
                <motion.div
                    ref={shotRef}
                    style={reduce ? undefined : { rotate, scale, y }}
                    className="col-span-4 origin-top md:col-span-12 lg:col-span-10 lg:col-start-3"
                >
                    <div className="bg-[#f7f3ec] p-[1.2%] pb-0 shadow-[0_40px_70px_-40px_rgba(60,10,12,0.6)]">
                        <Image
                            src={hero.shot.src}
                            alt={hero.shot.alt}
                            width={hero.shot.w}
                            height={hero.shot.h}
                            sizes="(min-width: 1024px) 80vw, 100vw"
                            priority
                            className="block h-auto w-full"
                        />
                        <p className="v2-mono flex min-h-10 items-center justify-between px-1 py-2 text-[12px] text-[var(--v2-ink)]">
                            <span>{hero.shot.bar.toLowerCase()}</span>
                            <span className="text-[var(--v2-muted)]">{hero.facts[0].value.toLowerCase()}</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </header>
    );
}
