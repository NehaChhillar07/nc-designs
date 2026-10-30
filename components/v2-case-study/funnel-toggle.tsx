"use client";

// The hands-on moment (chapter 03). The reader flips delivery between "send to
// everyone" and "action-based delivery" and watches compromise RISE as risk
// becomes visible: the chapter's counterintuitive point, shown working.
// A two-option radio group, so it works by click, tap and keyboard (arrows).

import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { DUR, EASE } from "@/components/home-v2/motion";
import { hfV2 } from "@/data/v2-human-firewall-data";
import { cn } from "@/lib/utils";

const { funnel, improvements } = hfV2.compromise;
type Mode = "before" | "after";

function Num({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const reduce = useReducedMotion();
    const last = useRef(value);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (reduce) {
            el.textContent = `${value}%`;
            last.current = value;
            return;
        }
        const c = animate(last.current, value, {
            duration: 0.7,
            ease: EASE,
            onUpdate: (v) => (el.textContent = `${Math.round(v)}%`),
        });
        last.current = value;
        return () => c.stop();
    }, [value, reduce]);
    return (
        <span ref={ref} className="tabular-nums">
            {value}%
        </span>
    );
}

export function FunnelToggle() {
    const [mode, setMode] = useState<Mode>("before");
    const stages = funnel[mode];
    const reported = mode === "before" ? funnel.reportedBefore : funnel.counter.pct;
    const options: { id: Mode; label: string }[] = [
        { id: "before", label: funnel.toggle.before },
        { id: "after", label: funnel.toggle.after },
    ];

    const onKey = (e: React.KeyboardEvent) => {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
            e.preventDefault();
            setMode((m) => (m === "before" ? "after" : "before"));
        }
    };

    return (
        <figure className="bg-[#f7f3ec] p-5 shadow-[0_30px_50px_-32px_rgba(60,10,12,0.55)] md:p-8">
            {/* the switch */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <span id="funnel-mode" className="v2-mono text-[12px] text-[var(--v2-muted)]">
                    {funnel.toggle.label}
                </span>
                <div
                    role="radiogroup"
                    aria-labelledby="funnel-mode"
                    onKeyDown={onKey}
                    className="relative inline-flex rounded-full border border-[var(--v2-rule)] p-1"
                >
                    {options.map((o) => {
                        const on = mode === o.id;
                        return (
                            <button
                                key={o.id}
                                type="button"
                                role="radio"
                                aria-checked={on}
                                tabIndex={on ? 0 : -1}
                                onClick={() => setMode(o.id)}
                                className={cn(
                                    "v2-mono relative min-h-11 rounded-full px-4 text-[13px] transition-colors md:min-h-9",
                                    on ? "text-[var(--v2-paper)]" : "text-[var(--v2-oxblood)]",
                                )}
                            >
                                {on && (
                                    <motion.span
                                        layoutId="funnel-pill"
                                        className="absolute inset-0 rounded-full bg-[var(--v2-oxblood)]"
                                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                    />
                                )}
                                <span className="relative">{o.label}</span>
                            </button>
                        );
                    })}
                </div>
                {mode === "before" && (
                    <span aria-hidden className="text-[20px] leading-none text-[var(--v2-oxblood)]" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                        ← {funnel.toggle.hint}
                    </span>
                )}
            </div>

            {/* the funnel */}
            <dl className="mt-7 space-y-3" aria-live="polite">
                {stages.map((s) => {
                    const hot = s.label === "Compromised";
                    return (
                        <div key={s.label} className="grid grid-cols-[6.5rem_1fr_3.25rem] items-center gap-3 md:grid-cols-[8rem_1fr_3.5rem]">
                            <dt className={cn("v2-mono text-[12px]", hot ? "text-[var(--v2-oxblood)]" : "text-[var(--v2-muted)]")}>
                                {s.label.toLowerCase()}
                            </dt>
                            <div className="h-7 bg-[rgb(26_20_20/0.05)]">
                                <motion.div
                                    className={cn("h-full", hot ? "bg-[var(--v2-oxblood)]" : "bg-[rgb(26_20_20/0.22)]")}
                                    initial={false}
                                    animate={{ width: `${s.pct}%` }}
                                    transition={{ type: "spring", stiffness: 140, damping: 22 }}
                                />
                            </div>
                            <dd className={cn("v2-display text-right text-[24px] leading-none", hot ? "text-[var(--v2-oxblood)]" : "text-[var(--v2-ink)]")}>
                                <Num value={s.pct} />
                            </dd>
                        </div>
                    );
                })}

                {/* counter-metric, outside the funnel */}
                <div className="grid grid-cols-[6.5rem_1fr_3.25rem] items-center gap-3 border-t border-dashed border-[var(--v2-rule)] pt-3 md:grid-cols-[8rem_1fr_3.5rem]">
                    <dt className="v2-mono text-[12px] text-[var(--v2-muted)]">{funnel.counter.label.toLowerCase()}</dt>
                    <div className="h-3 bg-[rgb(26_20_20/0.05)]">
                        <motion.div
                            className="h-full bg-[rgb(26_20_20/0.45)]"
                            initial={false}
                            animate={{ width: `${reported}%` }}
                            transition={{ type: "spring", stiffness: 140, damping: 22 }}
                        />
                    </div>
                    <dd className="v2-display text-right text-[20px] leading-none text-[var(--v2-ink)]">
                        <Num value={reported} />
                    </dd>
                </div>
            </dl>
            <p className="v2-mono mt-2 text-[11px] text-[var(--v2-muted)]">{funnel.counter.note}</p>

            {/* the point, once the reader has flipped it */}
            <div className="mt-6 min-h-[4.5rem] border-t border-[var(--v2-rule)] pt-4">
                <AnimatePresence mode="wait" initial={false}>
                    {mode === "after" ? (
                        <motion.p
                            key="after"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: DUR.fast * 1.6, ease: EASE }}
                            className="v2-display text-[22px] italic leading-[1.25] text-[var(--v2-oxblood)] md:text-[26px]"
                        >
                            {improvements.footnote}
                        </motion.p>
                    ) : (
                        // What the switch turns on: the story's own two changes.
                        <motion.div
                            key="before"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: DUR.fast }}
                        >
                            <p className="text-[15px] text-[var(--v2-muted)]">{improvements.title}</p>
                            <ul className="mt-2 space-y-1 text-[15px] leading-snug text-[var(--v2-ink)]">
                                {improvements.items.map((it) => (
                                    <li key={it.label}>
                                        <span className="font-medium">{it.label}</span>: {it.desc}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <figcaption className="v2-mono mt-3 text-[11px] text-[var(--v2-muted)]">{funnel.caption}</figcaption>
            {/* The conclusion stays in the page for readers who never flip the
                switch (and without JS); once flipped, it's the big line above. */}
            {mode === "before" && <p className="v2-mono mt-2 text-[11px] leading-relaxed text-[var(--v2-muted)]">{improvements.footnote}</p>}
        </figure>
    );
}
