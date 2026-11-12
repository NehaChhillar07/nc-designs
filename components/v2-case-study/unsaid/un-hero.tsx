"use client";

// The opener: the name, the line, the status (live, solo, three weeks) and
// the facts on the first screen, then the live feed as a phone print on a
// dark table: unsaid's own night mood.

import { GRID } from "@/components/home-v2/grid";
import { Spec } from "@/components/home-v2/spec-mode";
import { unV2 } from "@/data/v2-unsaid-data";

import { GrainTable } from "../flashcard/grain-table";
import { PhonePrint } from "../phone-print";

const { hero } = unV2;

export function UnHero() {
    return (
        <header>
            <div className={GRID}>
                <p className="v2-mono col-span-4 text-[12px] text-[var(--v2-muted)] md:col-span-8 lg:col-start-3">{hero.eyebrow}</p>
                <Spec
                    name="display / case title"
                    type
                    className="v2-display col-span-4 mt-4 text-[clamp(4.5rem,14vw,13rem)] leading-[0.82] tracking-[-0.03em] text-[var(--v2-oxblood)] md:col-span-12 lg:col-span-10 lg:col-start-3"
                >
                    {/* Set, not signed: a project title isn't a signature. */}
                    <h1 aria-label={hero.title}>
                        <span aria-hidden className="v2-title block italic" style={{ "--line": 0 } as React.CSSProperties}>
                            {hero.title}
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
                    {hero.lineBefore}
                    <em className="italic text-[var(--v2-oxblood)]">{hero.lineHighlight}</em>
                </Spec>
                <p className="col-span-4 mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-[var(--v2-muted)] md:col-span-8 lg:col-span-6 lg:col-start-3">{hero.sub}</p>
                {/* The status on the first screen, for the reader who stops here. */}
                <p className="col-span-4 mt-6 border-l-2 border-[var(--v2-oxblood)] pl-4 text-[17px] leading-snug text-[var(--v2-ink)] md:col-span-10 lg:col-span-8 lg:col-start-3">
                    {hero.status}{" "}
                    <a href={hero.live.href} target="_blank" rel="noreferrer" className="v2-link whitespace-nowrap">
                        {hero.live.label}
                    </a>
                </p>
            </div>

            <div className={`${GRID} mt-10`}>
                <dl className="col-span-4 grid grid-cols-3 gap-4 border-t border-[var(--v2-rule)] pt-4 md:col-span-8 lg:col-span-6 lg:col-start-3">
                    {hero.facts.map((f) => (
                        <div key={f.label}>
                            <dt className="v2-mono text-[11px] text-[var(--v2-muted)]">{f.label}</dt>
                            <dd className="mt-1 text-[15px] leading-snug text-[var(--v2-ink)]">{f.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className={`${GRID} mt-16 md:mt-24`}>
                <GrainTable seed={3} className="col-span-4 px-6 py-12 md:col-span-12 md:py-16 lg:col-span-10 lg:col-start-3">
                    <PhonePrint {...hero.shot} caption={hero.shot.bar} stamp="live app" tilt={-2} priority className="max-w-[300px]" />
                </GrainTable>
            </div>
        </header>
    );
}
