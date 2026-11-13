"use client";

// Chapter 02. The one rule, shown instead of said: a confession travels from
// your phone to the server to everyone's feed, and its author is taken off at
// the server and never sent on. Plays once as it arrives; "again" replays it.
// Reduced motion: it simply shows the end state. The rule is also in the
// prose above, for readers who never see it play.

import { LayoutGroup, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { EASE } from "@/components/home-v2/motion";
import { unV2 } from "@/data/v2-unsaid-data";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

const { flow } = unV2.rule;
const LAST = flow.stations.length - 1;

export function Redaction() {
    // Hydration-safe: it decides the markup, so it must match the server render.
    const reduce = useReducedMotionSafe();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
    const [step, setAt] = useState(0);
    const [run, setRun] = useState(0);
    // Reduced motion: no journey, just where it ends up.
    const at = reduce ? LAST : step;

    useEffect(() => {
        if (!inView || reduce) return;
        const ids = [window.setTimeout(() => setAt(1), 700), window.setTimeout(() => setAt(2), 2100)];
        return () => ids.forEach((id) => window.clearTimeout(id));
    }, [inView, reduce, run]);

    const erased = at === LAST;

    return (
        <div ref={ref} className="bg-[#f7f3ec] p-5 shadow-[0_30px_50px_-32px_rgba(60,10,12,0.55)] md:p-8">
            <LayoutGroup id="redaction">
                <ol className="grid gap-4 md:grid-cols-3">
                    {flow.stations.map((s, i) => (
                        <li key={s} className="flex flex-col gap-3">
                            <span className={cn("v2-mono text-[12px]", i <= at ? "text-[var(--v2-ink)]" : "text-[var(--v2-muted)]")}>
                                <span className="text-[var(--v2-oxblood)]">{String(i + 1).padStart(2, "0")}</span> {s}
                            </span>
                            <div className="relative min-h-[9.5rem] border border-dashed border-[var(--v2-rule)] p-3">
                                {/* the server keeps the author, and only the server */}
                                {i === 1 && erased && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: EASE }}
                                        className="v2-mono absolute bottom-3 left-3 right-3 border border-[var(--v2-oxblood)] px-2 py-1 text-[11px] text-[var(--v2-oxblood)]"
                                    >
                                        🔒 {flow.author} · {flow.kept}
                                    </motion.p>
                                )}
                                {at === i && (
                                    <motion.div layoutId="redaction-card" transition={{ type: "spring", stiffness: 160, damping: 22 }} className="bg-[#1a1412] p-3 text-[#f2ece3]">
                                        <p className="v2-display text-[17px] leading-snug">{flow.sample}</p>
                                        <p className={cn("v2-mono mt-2 text-[11px]", erased ? "text-white/45 line-through" : "text-[#e2b98a]")}>
                                            {erased ? flow.erased : flow.author}
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
            </LayoutGroup>
            <div className="mt-3 flex justify-end">
                <button
                    type="button"
                    disabled={!erased}
                    onClick={() => {
                        setAt(0);
                        setRun((r) => r + 1);
                    }}
                    className="v2-mono min-h-11 text-[12px] text-[var(--v2-oxblood)] underline decoration-[var(--v2-rule)] underline-offset-4 disabled:opacity-0"
                >
                    ↺ {flow.again}
                </button>
            </div>
        </div>
    );
}
