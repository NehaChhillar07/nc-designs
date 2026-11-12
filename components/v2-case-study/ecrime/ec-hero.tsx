"use client";

// The opener: title, the line, the outcome and the facts on the first screen.
// No pinned runway (the live page's scroll-expansion opener is gone): the
// live site plays as a print below, muted, only while on screen.

import { GRID } from "@/components/home-v2/grid";
import { Spec } from "@/components/home-v2/spec-mode";
import { ecV2 } from "@/data/v2-ecrime-hub-data";

import { PrintFigure } from "../cs-kit";

const { hero } = ecV2;

function Line() {
    const [a, b] = hero.line.split(hero.lineHighlight);
    return (
        <>
            {a}
            <em className="italic text-[var(--v2-oxblood)]">{hero.lineHighlight}</em>
            {b}
        </>
    );
}

export function EcHero() {
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
                    className="v2-display col-span-4 text-[clamp(1.75rem,3.3vw,2.85rem)] leading-[1.12] text-[var(--v2-ink)] md:col-span-10 lg:col-span-7 lg:col-start-3"
                >
                    <Line />
                </Spec>
                {/* The outcome on the first screen, for the reader who stops here. */}
                <p className="col-span-4 mt-6 border-l-2 border-[var(--v2-oxblood)] pl-4 text-[17px] leading-snug text-[var(--v2-ink)] md:col-span-10 lg:col-span-8 lg:col-start-3">
                    {hero.impact}
                </p>
            </div>

            <div className={`${GRID} mt-10`}>
                <dl className="col-span-4 grid grid-cols-1 gap-4 border-t border-[var(--v2-rule)] pt-4 sm:grid-cols-3 md:col-span-10 lg:col-span-8 lg:col-start-3">
                    {hero.facts.map((f) => (
                        <div key={f.label}>
                            <dt className="v2-mono text-[11px] text-[var(--v2-muted)]">{f.label}</dt>
                            <dd className="mt-1 text-[15px] leading-snug text-[var(--v2-ink)]">{f.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className={`${GRID} mt-16 md:mt-24`}>
                <PrintFigure shot={hero.shot} tilt={-1.2} depth={0.4} priority sizes="(min-width: 1024px) 80vw, 100vw" className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-3" />
            </div>
        </header>
    );
}
