"use client";

// A decision, shown the way it was made: the rejected options struck through
// and stamped, beside the chosen one, circled by hand as it arrives. The
// pattern from Human Firewall ch 02 and 05, made shareable.

import { motion } from "motion/react";

import { EASE, Reveal } from "@/components/home-v2/motion";
import { cn } from "@/lib/utils";

import { Stamp } from "./cs-kit";

export type Option = { label?: string; title: string; desc?: string };

export function DecisionSet({
    rejected,
    chosen,
    rejectedStamp = "rejected",
    chosenLabel = "chosen",
    className,
}: {
    rejected: Option[];
    chosen: Option;
    rejectedStamp?: string;
    chosenLabel?: string;
    className?: string;
}) {
    const cols = rejected.length + 1;
    return (
        <div className={cn("grid gap-5", cols === 2 ? "md:grid-cols-2" : cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4", className)}>
            {rejected.map((o, i) => (
                <Reveal key={o.title} delay={i * 0.08} className="relative bg-[rgb(26_20_20/0.04)] p-6">
                    {o.label && <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{o.label}</p>}
                    <p className="v2-display mt-2 pr-16 text-[24px] leading-tight text-[var(--v2-muted)] line-through decoration-[var(--v2-oxblood)] decoration-2">{o.title}</p>
                    {o.desc && <p className="mt-2 text-[15px] leading-snug text-[var(--v2-muted)]">{o.desc}</p>}
                    <Stamp className="absolute -top-3 right-4 rotate-[-6deg]">{rejectedStamp}</Stamp>
                </Reveal>
            ))}
            <Reveal delay={rejected.length * 0.08 + 0.04} className="relative bg-[#f7f3ec] px-7 py-8 shadow-[0_22px_36px_-26px_rgba(60,10,12,0.55)]">
                <p className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{chosen.label ?? chosenLabel}</p>
                <p className="v2-display mt-2 text-[24px] leading-tight text-[var(--v2-ink)]">{chosen.title}</p>
                {chosen.desc && <p className="mt-2 text-[15px] leading-snug text-[var(--v2-ink)]">{chosen.desc}</p>}
                {/* the choice, circled by hand */}
                <svg aria-hidden viewBox="0 0 300 160" preserveAspectRatio="none" className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]">
                    <motion.path
                        d="M18 92 C 8 30, 120 6, 210 14 C 290 22, 300 110, 240 140 C 170 168, 40 158, 14 104 C 6 84, 30 56, 60 44"
                        fill="none"
                        stroke="var(--v2-oxblood)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                        transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
                    />
                </svg>
            </Reveal>
        </div>
    );
}
