"use client";

// The outcome: one big number with its source in mono, and any secondary
// numbers smaller beside it. A figure with no value yet (waiting on a
// source) is simply not passed, so nothing unsourced ever renders.

import { CountUp } from "@/components/home-v2/motion";
import { GRID } from "@/components/home-v2/grid";
import { cn } from "@/lib/utils";

export type Figure = { value: number | string; prefix?: string; suffix?: string; decimals?: number; label: string; source: string };

function Value({ f, big }: { f: Figure; big: boolean }) {
    return (
        <dd className={cn("v2-display leading-[0.85] text-[var(--v2-oxblood)]", big ? "text-[clamp(5.5rem,14vw,12rem)]" : "text-[clamp(3rem,5vw,4.5rem)]")}>
            {typeof f.value === "number" ? <CountUp value={f.value} prefix={f.prefix} suffix={f.suffix} decimals={f.decimals} /> : `${f.prefix ?? ""}${f.value}${f.suffix ?? ""}`}
        </dd>
    );
}

export function Outcome({ primary, secondary = [] }: { primary: Figure; secondary?: Figure[] }) {
    const figures = [primary, ...secondary];
    return (
        <div className={GRID}>
            <dl className={cn("col-span-4 grid gap-8 md:col-span-12 md:items-end lg:col-span-9 lg:col-start-3", secondary.length ? "md:grid-cols-[1.6fr_repeat(var(--n),1fr)]" : "")} style={{ "--n": secondary.length } as React.CSSProperties}>
                {figures.map((f, i) => (
                    <div key={f.label} className={cn("flex flex-col-reverse", i > 0 && "md:border-l md:border-[var(--v2-rule)] md:pl-6")}>
                        <dt className="mt-2">
                            <span className="block text-[15px] text-[var(--v2-ink)]">{f.label}</span>
                            <span className="v2-mono mt-1 block max-w-[60ch] text-[11px] text-[var(--v2-muted)]">{f.source}</span>
                        </dt>
                        <Value f={f} big={i === 0} />
                    </div>
                ))}
            </dl>
        </div>
    );
}
