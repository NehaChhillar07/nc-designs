"use client";

// A flow as lanes of steps joined by lines that draw themselves: left to
// right from md, top to bottom on phones, so labels stay readable at any
// width (an SVG would shrink its text on a phone). All text is in the
// server markup. A step can be `broken` (dashed, with a ×): where a path
// fails. Re-key the component to replay the drawing.

import { motion } from "motion/react";
import { Fragment } from "react";

import { DUR, EASE } from "@/components/home-v2/motion";
import { cn } from "@/lib/utils";

export type FlowStep = { label: string; sub?: string; tone?: "ink" | "oxblood" | "muted" | "broken" };
export type FlowLane = { id: string; label?: string; steps: FlowStep[] };

const BOX: Record<NonNullable<FlowStep["tone"]>, string> = {
    ink: "border-[var(--v2-rule)] bg-[#f7f3ec] text-[var(--v2-ink)]",
    oxblood: "border-[var(--v2-oxblood)] bg-[var(--v2-oxblood)] text-[var(--v2-paper)]",
    muted: "border-[var(--v2-rule)] bg-transparent text-[var(--v2-muted)]",
    broken: "border-dashed border-[var(--v2-redline)] bg-transparent text-[var(--v2-redline)]",
};

function Connector({ i, broken }: { i: number; broken?: boolean }) {
    return (
        <li aria-hidden className="relative flex shrink-0 items-center justify-center md:h-auto md:w-10 md:flex-1">
            {/* vertical on phones, horizontal from md */}
            <motion.span
                className={cn("block h-6 w-px origin-top md:h-px md:w-full md:origin-left", broken ? "border-l border-dashed border-[var(--v2-redline)] md:border-l-0 md:border-t" : "bg-[var(--v2-oxblood)]")}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.22 }}
            />
            {broken && <span className="v2-mono absolute text-[13px] text-[var(--v2-redline)]">×</span>}
        </li>
    );
}

export function FlowDiagram({ lanes, className }: { lanes: FlowLane[]; className?: string }) {
    return (
        <div className={cn("space-y-6", className)}>
            {lanes.map((lane) => (
                <div key={lane.id}>
                    {lane.label && <p className="v2-mono mb-2 text-[12px] text-[var(--v2-muted)]">{lane.label}</p>}
                    <ol className="flex flex-col items-stretch md:flex-row md:items-center">
                        {lane.steps.map((s, i) => (
                            <Fragment key={`${s.label}-${i}`}>
                                {i > 0 && <Connector i={i} broken={s.tone === "broken"} />}
                                <motion.li
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                                    transition={{ duration: DUR.fast * 2, ease: EASE, delay: i * 0.22 }}
                                    className={cn("border px-3 py-2 md:max-w-[12rem] md:shrink-0", BOX[s.tone ?? "ink"])}
                                >
                                    <span className="block text-[14px] leading-snug">{s.label}</span>
                                    {s.sub && <span className="v2-mono mt-0.5 block text-[11px] opacity-80">{s.sub}</span>}
                                </motion.li>
                            </Fragment>
                        ))}
                    </ol>
                </div>
            ))}
        </div>
    );
}
