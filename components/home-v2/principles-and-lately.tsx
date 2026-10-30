import Link from "next/link";

import { homeV2Data } from "@/data/home-v2-data";

import { GRID } from "./grid";
import { Reveal } from "./motion";
import { Spec } from "./spec-mode";

const { principles, lately } = homeV2Data;

// Two columns set on uneven starts (2 and 8), so the page keeps its
// off-grid rhythm instead of settling into a centered two-up.
export function PrinciplesAndLately() {
    return (
        <section aria-label={`${principles.heading} and ${lately.heading}`} className={GRID}>
            <div className="col-span-4 md:col-span-6 md:col-start-2">
                <div className="flex items-start justify-between gap-4">
                    <h2 className="v2-mono text-[11px] text-[var(--v2-muted)]">{principles.heading}</h2>
                </div>
                <Spec as="ol" name="manifesto" className="group/list mt-4 space-y-5">
                    {principles.items.map((item, i) => (
                        // Hovering one line quiets the others, so each reads on its own.
                        // The dim sits on the inner span: Reveal owns the li's opacity.
                        <Reveal as="li" key={item.line} delay={i * 0.1}>
                            <span className="grid grid-cols-[1.25rem_1fr] items-baseline transition-opacity duration-300 [@media(hover:hover)]:group-hover/list:opacity-30 [@media(hover:hover)]:hover:!opacity-100">
                                <span className="v2-mono text-[11px] text-[var(--v2-oxblood)]">{i + 1}</span>
                                <span className="v2-display text-[28px] leading-[1.15] text-[var(--v2-ink)] md:text-[34px]">
                                    {item.line}
                                </span>
                                {/* The receipt: where this principle shows up in the work. */}
                                {/* Desktop only: phones keep just the principle. */}
                                <span className="v2-mono col-start-2 mt-1.5 hidden text-[11px] text-[var(--v2-muted)] md:block">
                                    {"href" in item && item.href ? (
                                        <Link href={item.href} className="v2-link inline-block py-2 md:py-0">
                                            {item.receipt} →
                                        </Link>
                                    ) : (
                                        item.receipt
                                    )}
                                </span>
                            </span>
                        </Reveal>
                    ))}
                </Spec>
            </div>

            {/* Desktop only: on phones the "now" line in the hero covers it. */}
            <div className="col-span-4 mt-16 hidden md:col-span-4 md:col-start-9 md:mt-0 md:block">
                <h2 className="v2-mono text-[11px] text-[var(--v2-muted)]">{lately.heading}</h2>
                <Spec as="ul" name="log" className="mt-4 border-t border-[var(--v2-rule)]">
                    {lately.items.map((item, i) => {
                        const row = (
                            <>
                                <span className="v2-mono w-16 shrink-0 text-[11px] text-[var(--v2-muted)]">{item.date}</span>
                                <span className="text-[var(--v2-ink)] transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-[var(--v2-oxblood)]">
                                    {item.text}
                                    {/* The first entry is what's happening right now. */}
                                    {i === 0 && (
                                        <span className="v2-mono ml-2 inline-flex translate-y-[-1px] items-center gap-1 text-[10px] text-[var(--v2-oxblood)]">
                                            <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                                            {lately.nowLabel}
                                        </span>
                                    )}
                                </span>
                            </>
                        );
                        const cls = "group flex items-baseline gap-4 py-3 text-[15px] leading-snug";
                        return (
                            <Reveal as="li" key={item.text} delay={i * 0.08} className="border-b border-[var(--v2-rule)]">
                                {"href" in item && item.href ? (
                                    <Link href={item.href} className={cls}>
                                        {row}
                                    </Link>
                                ) : (
                                    <div className={cls}>{row}</div>
                                )}
                            </Reveal>
                        );
                    })}
                </Spec>
            </div>
        </section>
    );
}
