"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Sparkles, FileText, PenLine, ChevronDown } from "lucide-react";

type Entry = {
    label: string;
    tagline: string;
    detail: string;
};

const ICONS = [Sparkles, FileText, PenLine];

export function ThreeWayEntry({ entries }: { entries: readonly Entry[] }) {
    const reduce = useReducedMotion();
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <div className="my-10 grid md:grid-cols-3 gap-4">
            {entries.map((entry, i) => {
                const Icon = ICONS[i] ?? Sparkles;
                const isOpen = expanded === i;
                return (
                    <motion.button
                        key={entry.label}
                        onClick={() => setExpanded(isOpen ? null : i)}
                        onMouseEnter={() => !reduce && setExpanded(i)}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        transition={{
                            duration: 0.5,
                            delay: reduce ? 0 : i * 0.08,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        aria-expanded={isOpen}
                        className={`group text-left rounded-xl border p-5 transition-colors ${
                            isOpen
                                ? "border-gray-900 bg-gray-900/[0.02]"
                                : "border-gray-200 bg-white hover:border-gray-400"
                        }`}
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <span
                                className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isOpen
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                <Icon className="w-4 h-4" aria-hidden />
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 mb-1">
                                    {entry.label}
                                </p>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {entry.tagline}
                                </p>
                            </div>
                            <ChevronDown
                                className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                                aria-hidden
                            />
                        </div>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    key="detail"
                                    // animate/exit were identical on both branches;
                                    // only `initial` differed, and branching it on
                                    // useReducedMotion() mismatches SSR. One tree
                                    // now, with the duration collapsed instead.
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{
                                        duration: reduce ? 0 : 0.3,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-sm text-gray-700 leading-relaxed pt-2 border-t border-gray-200 mt-2">
                                        {entry.detail}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                );
            })}
        </div>
    );
}
