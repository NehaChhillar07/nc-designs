"use client";

// Chapter 03, the hands-on moment (The Pudding's "give it a try", Nicky
// Case's explorables): the reader moderates. Four example lines, one at a
// time; pick where each goes (posts, posts with a soft door, blocked), and
// the policy answers with why. It proves the hardest decision in the app,
// and the policy itself stays fully readable in the prose above.

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { DUR, EASE } from "@/components/home-v2/motion";
import { unV2 } from "@/data/v2-unsaid-data";
import { cn } from "@/lib/utils";

const s = unV2.safety.sorter;
type Choice = (typeof s.choices)[number]["id"];

export function SafetySorter() {
    const [i, setI] = useState(0);
    const [picked, setPicked] = useState<Choice | null>(null);
    const done = i >= s.lines.length;
    const line = s.lines[Math.min(i, s.lines.length - 1)];
    const right = picked === line.answer;

    return (
        <figure className="bg-[#1a1412] p-5 text-[#f2ece3] shadow-[0_30px_50px_-30px_rgba(0,0,0,0.7)] md:p-8">
            <div className="flex items-center justify-between gap-3">
                <figcaption className="v2-mono text-[12px] text-[#e2b98a]">{s.label}</figcaption>
                <span className="v2-mono text-[12px] tabular-nums text-white/60">
                    {Math.min(i + 1, s.lines.length)} / {s.lines.length}
                </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
                {!done ? (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: DUR.fast * 1.5, ease: EASE }}
                    >
                        <p className="v2-display mt-5 min-h-[3.6em] text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.2] md:min-h-[2.4em]">“{line.text}”</p>
                        <div role="group" aria-label={s.label} className="mt-5 grid gap-2 sm:grid-cols-3">
                            {s.choices.map((c) => {
                                const isAnswer = picked !== null && c.id === line.answer;
                                const isWrongPick = picked === c.id && c.id !== line.answer;
                                return (
                                    <button
                                        key={c.id}
                                        type="button"
                                        disabled={picked !== null}
                                        aria-pressed={picked === c.id}
                                        onClick={() => setPicked(c.id)}
                                        className={cn(
                                            "v2-mono min-h-11 rounded-[10px] border px-3 py-2 text-left text-[13px] transition-colors",
                                            picked === null && "border-white/20 hover:bg-white/10",
                                            isAnswer && "border-[#e2b98a] bg-[#e2b98a]/15 text-white",
                                            isWrongPick && "border-white/30 text-white/60 line-through",
                                            picked !== null && !isAnswer && !isWrongPick && "border-white/10 text-white/40",
                                        )}
                                    >
                                        {c.label}
                                    </button>
                                );
                            })}
                        </div>
                        <div aria-live="polite" className="mt-4 min-h-[4.5rem]">
                            {picked !== null && (
                                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                                    <p className="text-[15px] leading-snug text-white/85">
                                        <span className={cn("v2-mono mr-2 text-[12px]", right ? "text-[#e2b98a]" : "text-white/60")}>
                                            {right ? `✓ ${s.right}` : `× ${s.notQuite}`}
                                        </span>
                                        {line.why}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPicked(null);
                                            setI((n) => n + 1);
                                        }}
                                        className="v2-mono mt-3 min-h-11 rounded-full border border-white/25 px-4 text-[12px] hover:bg-white/10"
                                    >
                                        {s.next} →
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: DUR.fast * 1.5 }} className="mt-5">
                        <p className="v2-display text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.2] text-[#e2b98a]">{s.done}</p>
                        <button
                            type="button"
                            onClick={() => {
                                setPicked(null);
                                setI(0);
                            }}
                            className="v2-mono mt-4 min-h-11 rounded-full border border-white/25 px-4 text-[12px] hover:bg-white/10"
                        >
                            ↺ {s.again}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </figure>
    );
}
