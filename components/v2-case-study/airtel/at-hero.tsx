"use client";

// The opener: the honest status first (a self-initiated concept, not
// launched), the title, the page's question, the status line and the facts
// on the first screen. Then two product screens, not the logo poster: the
// first tap before she flies, and the banner the moment she lands.

import { GRID } from "@/components/home-v2/grid";
import { Spec } from "@/components/home-v2/spec-mode";
import { atV2 } from "@/data/v2-airtel-travel-mode-data";

import { PhonePrint } from "../phone-print";

const { hero } = atV2;

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

export function AtHero() {
    return (
        <header>
            <div className={GRID}>
                <p className="v2-mono col-span-4 text-[12px] text-[var(--v2-muted)] md:col-span-10 lg:col-start-3">{hero.eyebrow}</p>
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
                <p className="col-span-4 mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--v2-muted)] md:col-span-8 lg:col-span-6 lg:col-start-3">{hero.lede}</p>
                {/* The status on the first screen, for the reader who stops here. */}
                <p className="col-span-4 mt-6 border-l-2 border-[var(--v2-oxblood)] pl-4 text-[17px] leading-snug text-[var(--v2-ink)] md:col-span-10 lg:col-span-8 lg:col-start-3">
                    {hero.status}{" "}
                    <a href={hero.prototype.href} target="_blank" rel="noreferrer" className="v2-link whitespace-nowrap">
                        {hero.prototype.label}
                    </a>
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
                <div className="col-span-4 grid grid-cols-2 items-start gap-4 md:col-span-10 md:col-start-2 md:gap-10 lg:col-span-6 lg:col-start-4">
                    <PhonePrint {...hero.departure} caption={hero.departure.bar} tilt={-2} priority sizes="(min-width: 768px) 300px, 45vw" />
                    <PhonePrint {...hero.landed} caption={hero.landed.bar} stamp="prototype" tilt={1.5} priority sizes="(min-width: 768px) 300px, 45vw" className="mt-10 md:mt-16" />
                </div>
            </div>
        </header>
    );
}
