"use client";

// Chapter 06, in two moments.
// 1. Three ways in: three entry cards fanned on the desk. Pick one (a radio
//    group: click, tap, arrow keys) and it turns over to its detail.
// 2. AI prepares, the admin ships: "Push to Training Cards" ticks through the
//    four steps, then deals the generated cards from the pile into the library
//    grid (shared layoutIds, so each card flies from where it really was).

import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { EASE } from "@/components/home-v2/motion";
import { fcV2 } from "@/data/v2-flashcard-data";
import { cn } from "@/lib/utils";

import { DEAL, FlipCard, springT, useTempo } from "./deck";

const { entries, pickLabel } = fcV2.howItWorks;
const ap = fcV2.aiPrepares;
const FAN = [-5, 0, 5];

// ---------- three ways in ----------

export function EntryFan() {
    const [pick, setPick] = useState(0);
    const step = (d: number) => setPick((p) => (p + d + entries.length) % entries.length);

    return (
        <div>
            <p id="entry-label" className="v2-mono text-[12px] text-[var(--v2-muted)]">
                {pickLabel}
            </p>
            <div
                role="radiogroup"
                aria-labelledby="entry-label"
                onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                        e.preventDefault();
                        step(1);
                    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                        e.preventDefault();
                        step(-1);
                    }
                }}
                className="mt-5 grid gap-4 md:grid-cols-3 md:gap-0"
            >
                {entries.map((e, i) => {
                    const on = pick === i;
                    return (
                        <button
                            key={e.label}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            tabIndex={on ? 0 : -1}
                            onClick={() => setPick(i)}
                            // Fanned on the desk from md; a straight column on phones.
                            className={cn("relative text-left transition-transform duration-500 md:-mx-1 md:[rotate:var(--fan)]", on ? "z-10 md:-translate-y-4" : "md:hover:-translate-y-1.5")}
                            style={{ "--fan": `${FAN[i]}deg` } as React.CSSProperties}
                        >
                            <FlipCard
                                flipped={on}
                                className="h-[12.5rem] md:h-[15rem]"
                                front={
                                    <div className="flex h-full flex-col bg-[#f7f3ec] p-5 shadow-[0_20px_34px_-24px_rgba(60,10,12,0.55)]">
                                        <span className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{String(i + 1).padStart(2, "0")}</span>
                                        <span className="v2-display mt-auto text-[32px] leading-none text-[var(--v2-ink)]">{e.label}</span>
                                        <span className="mt-2 text-[14px] leading-snug text-[var(--v2-muted)]">{e.tagline}</span>
                                    </div>
                                }
                                back={
                                    <div className="flex h-full flex-col bg-[#1a1414] p-5 text-[#f2ece3] shadow-[0_26px_40px_-24px_rgba(0,0,0,0.6)]">
                                        <span className="v2-mono text-[12px] text-[#e2b98a]">{e.label.toLowerCase()}</span>
                                        <span className="mt-3 text-[15px] leading-[1.5] text-white/85">{e.detail}</span>
                                    </div>
                                }
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ---------- push to training cards ----------

type Phase = "ready" | "running" | "done";

function Mini({ text, i }: { text: string; i: number }) {
    return (
        <span className="flex h-full w-full flex-col rounded-[10px] border border-white/10 bg-[#1a1414] p-3 text-left text-[#f2ece3]">
            <span className="v2-mono text-[10px] text-white/50">{String(i + 1).padStart(2, "0")}</span>
            <span className="mt-auto line-clamp-3 text-[12px] leading-snug">{text}</span>
        </span>
    );
}

export function PublishDeal() {
    const t = useTempo();
    const reduce = useReducedMotion();
    const [phase, setPhase] = useState<Phase>("ready");
    const [stepIdx, setStepIdx] = useState(0);
    const timers = useRef<number[]>([]);
    useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

    const start = () => {
        if (phase !== "ready") return;
        if (reduce) {
            setStepIdx(ap.publishSteps.length - 1);
            setPhase("done");
            return;
        }
        setPhase("running");
        setStepIdx(0);
        const ms = 800 * t;
        ap.publishSteps.forEach((_, i) => {
            if (i === 0) return;
            timers.current.push(window.setTimeout(() => setStepIdx(i), i * ms));
        });
        timers.current.push(window.setTimeout(() => setPhase("done"), ap.publishSteps.length * ms));
    };
    const reset = () => {
        timers.current.forEach((id) => window.clearTimeout(id));
        timers.current = [];
        setPhase("ready");
        setStepIdx(0);
    };

    const generated = phase === "running" && stepIdx >= 1;
    const done = phase === "done";

    return (
        <div>
            <div className="bg-[#f7f3ec] shadow-[0_30px_50px_-32px_rgba(60,10,12,0.55)]">
                <div className="flex min-h-12 items-center justify-between gap-3 border-b border-[var(--v2-rule)] px-5">
                    <p className="flex items-center gap-2 text-[14px] text-[var(--v2-ink)]">
                        <span aria-hidden className={cn("h-2 w-2 rounded-full", done ? "bg-[var(--v2-oxblood)]" : "border border-[var(--v2-oxblood)]")} />
                        {done ? ap.doneStatus : ap.draftStatus}
                    </p>
                    {done && (
                        <button type="button" onClick={reset} className="v2-mono min-h-11 text-[12px] text-[var(--v2-muted)] hover:text-[var(--v2-ink)]">
                            {ap.reset.toLowerCase()}
                        </button>
                    )}
                </div>

                <LayoutGroup id="deal">
                    <div className="grid gap-8 p-5 md:grid-cols-[1fr_minmax(0,15rem)] md:p-7">
                        <div>
                            {phase === "ready" && (
                                <div className="mb-6">
                                    <button
                                        type="button"
                                        onClick={start}
                                        className="v2-mono min-h-11 rounded-full bg-[var(--v2-oxblood)] px-5 text-[13px] text-[var(--v2-paper)] transition-transform hover:-translate-y-0.5"
                                    >
                                        {ap.publishCta} →
                                    </button>
                                </div>
                            )}
                            {/* The steps are listed before the push too, so the reader
                                sees what it will do (and they're in the server markup). */}
                            <ol className="space-y-3" aria-live="polite">
                                {ap.publishSteps.map((s, i) => {
                                    const reached = phase !== "ready" && i <= stepIdx;
                                    const ticked = reached && (done || i < stepIdx);
                                    return (
                                        <li key={s} className={cn("flex items-center gap-3 text-[15px] transition-colors", reached ? "text-[var(--v2-ink)]" : "text-[var(--v2-muted)]")}>
                                            <span className={cn("v2-mono grid h-5 w-5 place-items-center rounded-full border text-[11px]", ticked ? "border-[var(--v2-oxblood)] bg-[var(--v2-oxblood)] text-[var(--v2-paper)]" : "border-[var(--v2-rule)]")}>
                                                {ticked ? "✓" : reached ? "·" : ""}
                                            </span>
                                            {s}
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>

                        {/* the pile the cards are generated onto */}
                        <div aria-hidden className="relative hidden h-36 md:block">
                            {generated &&
                                ap.dealt.map((text, i) => (
                                    <motion.span
                                        key={text}
                                        layoutId={`deal-${i}`}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 * t, ease: EASE, delay: i * 0.12 * t }}
                                        className="absolute right-0 top-0 h-32 w-28"
                                        style={{ rotate: `${(i - 1.5) * 4}deg` }}
                                    >
                                        <Mini text={text} i={i} />
                                    </motion.span>
                                ))}
                        </div>
                    </div>

                    {/* the library */}
                    <div className="border-t border-dashed border-[var(--v2-rule)] p-5 md:p-7">
                        <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{ap.libraryLabel}</p>
                        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                            {ap.dealt.map((text, i) => (
                                <li key={text} className="relative h-32 rounded-[10px] border border-dashed border-[var(--v2-rule)]">
                                    {done && (
                                        <motion.span
                                            layoutId={`deal-${i}`}
                                            initial={reduce ? false : { opacity: 0, y: -40, rotate: (i - 1.5) * 6 }}
                                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                                            transition={{ ...springT(t, 260, 24), delay: i * DEAL.stagger * t }}
                                            className="absolute inset-0"
                                        >
                                            <Mini text={text} i={i} />
                                        </motion.span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </LayoutGroup>
            </div>
        </div>
    );
}
