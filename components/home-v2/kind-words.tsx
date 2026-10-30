import Image from "next/image";

import { homeV2Data } from "@/data/home-v2-data";
import { resolveToken } from "@/lib/placeholders";

import { GRID } from "./grid";
import { Reveal } from "./motion";
import { PersonCard } from "./person-card";
import { Spec } from "./spec-mode";

const { kindWords } = homeV2Data;

export function KindWords() {
    // Same contract as the rest of the site: a quote whose token is still
    // unreplaced never ships to production.
    const items = kindWords.items.filter((q) => resolveToken(q.token) !== null);
    if (items.length === 0) return null;

    return (
        <section aria-labelledby="v2-kind" className={GRID}>
            <h2 id="v2-kind" className="v2-mono col-span-4 text-[11px] text-[var(--v2-muted)] md:col-span-2 md:col-start-2 md:pt-3">
                {kindWords.heading}
            </h2>
            <div className="col-span-4 mt-4 space-y-12 md:col-span-8 md:col-start-4 md:mt-0">
                {items.map((q, i) => (
                    // Phones: only the first quote, which is the thesis.
                    <Reveal key={q.name} delay={i * 0.1} className={i > 0 ? "hidden md:block" : undefined}>
                        <Spec
                            as="figure"
                            name="quote"
                            className={i % 2 === 1 ? "md:ml-[16.666%]" : undefined}
                        >
                            <blockquote className="v2-display text-[28px] leading-[1.15] text-[var(--v2-oxblood)] md:text-[38px]">
                                “{q.excerpt}”
                                {/* Phones, YC-style: the face sits in the sentence. */}
                                <Image
                                    src={q.avatar}
                                    alt=""
                                    width={56}
                                    height={56}
                                    className="ml-2 inline-block h-7 w-7 -translate-y-1 rounded-full align-middle ring-1 ring-[var(--v2-rule)] md:hidden"
                                />
                            </blockquote>
                            <figcaption className="mt-4">
                                <span className="v2-mono text-[12px] text-[var(--v2-muted)] md:hidden">
                                    <span className="text-[var(--v2-ink)]">{q.name}</span> · {q.role}
                                </span>
                                <span className="hidden md:block">
                                    <PersonCard person={{ ...q, fullQuote: resolveToken(q.token) ?? q.excerpt }} />
                                </span>
                            </figcaption>
                        </Spec>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
