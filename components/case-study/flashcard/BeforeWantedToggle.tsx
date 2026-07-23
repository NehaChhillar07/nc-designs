"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";

type StateBlock = {
    label: string;
    items: readonly string[];
};

// Side-by-side transformation grid. Each row pairs a "before" item with its
// "wanted" counterpart, connected by an arrow so the reader sees the contrast
// — and the resolution — without clicking anything.
export function BeforeWantedToggle({
    before,
    wanted,
}: {
    before: StateBlock;
    wanted: StateBlock;
}) {
    const reduce = useReducedMotion();
    const rowCount = Math.min(before.items.length, wanted.items.length);
    const pairs = Array.from({ length: rowCount }, (_, i) => ({
        before: before.items[i],
        wanted: wanted.items[i],
    }));

    return (
        <div className="my-10">
            {/* Column headers — left muted, right emphasized */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-6 mb-6 items-end">
                <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
                        Before
                    </span>
                    <p className="text-base md:text-lg font-medium text-gray-500">
                        {before.label}
                    </p>
                </div>
                <div className="hidden md:block w-12" aria-hidden />
                <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-600">
                        Wanted
                    </span>
                    <p className="text-base md:text-lg font-medium text-gray-900">
                        {wanted.label}
                    </p>
                </div>
            </div>

            {/* Paired rows */}
            <div className="space-y-3 md:space-y-4">
                {pairs.map((pair, i) => (
                    <motion.div
                        key={i}
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                        transition={{
                            duration: 0.5,
                            delay: i * 0.08,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="group grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 md:gap-6 items-center"
                    >
                        {/* Before pill */}
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/60 transition-colors duration-300 group-hover:bg-gray-100/80">
                            <span
                                aria-hidden
                                className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                                <span className="w-2.5 h-px bg-gray-400" />
                            </span>
                            <span className="text-sm md:text-[15px] text-gray-500 leading-snug">
                                {pair.before}
                            </span>
                        </div>

                        {/* Connector — horizontal on desktop, downward on mobile */}
                        <div className="flex items-center justify-center md:w-12 my-1 md:my-0">
                            <motion.div
                                initial={
                                    reduce ? false : { opacity: 0, x: -8 }
                                }
                                whileInView={
                                    reduce ? undefined : { opacity: 1, x: 0 }
                                }
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: i * 0.08 + 0.2,
                                }}
                                className="text-emerald-500"
                                aria-hidden
                            >
                                <ArrowRight
                                    className="hidden md:block w-5 h-5"
                                    strokeWidth={2.25}
                                />
                                <ArrowDown
                                    className="md:hidden w-4 h-4"
                                    strokeWidth={2.25}
                                />
                            </motion.div>
                        </div>

                        {/* Wanted pill */}
                        <div
                            className="relative flex items-center gap-3 px-4 py-3 rounded-xl bg-white transition-shadow duration-300 group-hover:shadow-[0_10px_30px_-12px_rgba(16,185,129,0.25)]"
                            style={{
                                border: "1.5px solid rgba(16, 185, 129, 0.35)",
                                boxShadow:
                                    "inset 3px 0 0 0 rgba(16, 185, 129, 0.7)",
                            }}
                        >
                            <span
                                aria-hidden
                                className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                            >
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </span>
                            <span className="text-sm md:text-[15px] font-medium text-gray-900 leading-snug">
                                {pair.wanted}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Subtle caption underneath */}
            <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-gray-400 text-center md:text-left">
                Every row · A handoff replaced with a self-serve action
            </p>
        </div>
    );
}
