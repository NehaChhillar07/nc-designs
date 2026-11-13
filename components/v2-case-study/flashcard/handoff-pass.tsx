"use client";

// Chapter 01. One course card is passed down the desk, hand to hand:
// Graphics → Marketing → Customer Success → Client sign-off → Assigned.
// Each hop takes longer than the last, because the slowness is the point.
// Plays once on arrival; "pass it again" replays it. Reduced motion: the card
// is already at the end, and the trail is a plain ordered list either way.

import { LayoutGroup, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { fcV2 } from "@/data/v2-flashcard-data";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

import { springT, useTempo } from "./deck";

const { handoffTrail: stops, handoffLabel, passCard, passAgain, hopLabel } = fcV2.startingPoint;
const HOPS = stops.length - 1;

export function HandoffPass() {
    const t = useTempo();
    // Hydration-safe: it decides where the card sits in the markup.
    const reduce = useReducedMotionSafe();
    const ref = useRef<HTMLOListElement>(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
    const [at, setAt] = useState(0);
    const [run, setRun] = useState(0);
    // No motion: the card is already at the end.
    const shown = reduce ? HOPS : at;

    useEffect(() => {
        if (!inView || reduce) return;
        const timers: number[] = [];
        let when = 400;
        for (let i = 1; i <= HOPS; i++) {
            when += (550 + i * 320) * t; // every hop slower than the last
            timers.push(window.setTimeout(() => setAt(i), when));
        }
        return () => timers.forEach((id) => window.clearTimeout(id));
    }, [inView, reduce, run, t]);

    return (
        <div className="bg-[#f7f3ec] p-5 shadow-[0_22px_36px_-26px_rgba(60,10,12,0.55)] md:p-7">
            <LayoutGroup id="handoff">
                <ol ref={ref} aria-label={handoffLabel} className="grid gap-3 md:grid-cols-5 md:gap-2">
                    {stops.map((s, i) => (
                        <li key={s} className="flex items-center gap-4 md:flex-col md:items-stretch md:gap-3">
                            <span className={cn("v2-mono w-36 shrink-0 text-[12px] md:w-auto", i <= shown ? "text-[var(--v2-ink)]" : "text-[var(--v2-muted)]")}>
                                <span className="text-[var(--v2-oxblood)]">{String(i + 1).padStart(2, "0")}</span> {s.toLowerCase()}
                            </span>
                            {/* the hand that holds it */}
                            <span className="relative grid h-16 flex-1 place-items-center border border-dashed border-[var(--v2-rule)] md:h-24">
                                {shown === i && (
                                    <motion.span
                                        layoutId="handoff-card"
                                        transition={springT(t, 140, 20)}
                                        className={cn(
                                            "v2-mono grid h-11 w-[5.5rem] place-items-center whitespace-nowrap bg-[#1a1414] text-[11px] text-[#f2ece3] shadow-[0_10px_18px_-10px_rgba(0,0,0,0.6)] md:h-12 md:w-[5.5rem]",
                                            i % 2 ? "rotate-[4deg]" : "-rotate-[3deg]",
                                        )}
                                    >
                                        {passCard}
                                    </motion.span>
                                )}
                            </span>
                        </li>
                    ))}
                </ol>
            </LayoutGroup>
            <div className="mt-4 flex items-center justify-between gap-4">
                <p className="v2-mono text-[12px] text-[var(--v2-muted)]" aria-live="polite">
                    {hopLabel} {shown} / {HOPS}
                </p>
                <button
                    type="button"
                    disabled={shown < HOPS}
                    onClick={() => {
                        setAt(0);
                        setRun((r) => r + 1);
                    }}
                    className="v2-mono min-h-11 text-[12px] text-[var(--v2-oxblood)] underline decoration-[var(--v2-rule)] underline-offset-4 disabled:opacity-0"
                >
                    ↺ {passAgain}
                </button>
            </div>
        </div>
    );
}
