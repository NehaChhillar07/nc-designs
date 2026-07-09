"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Lock, GripVertical } from "lucide-react";

type State = {
    label: string;
    status: string;
    desc: string;
};

export function BackwardsToForwards({
    endResultFirst,
    baseFirst,
    flipCaption,
    components,
    sampleCardTitle,
    sampleCardBody,
}: {
    endResultFirst: State;
    baseFirst: State;
    flipCaption: string;
    components: readonly string[];
    sampleCardTitle: string;
    sampleCardBody: string;
}) {
    const reduce = useReducedMotion();
    const [mode, setMode] = useState<"end" | "base">("end");
    const current = mode === "end" ? endResultFirst : baseFirst;

    return (
        <div className="my-10">
            {/* Segmented control */}
            <div
                role="tablist"
                aria-label="Compare end-result-first build with base-first build"
                className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg mb-5"
            >
                <button
                    role="tab"
                    aria-selected={mode === "end"}
                    onClick={() => setMode("end")}
                    className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        mode === "end"
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    {mode === "end" && (
                        <motion.span
                            layoutId="backforward-pill"
                            className="absolute inset-0 bg-white rounded-md shadow-sm"
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                    )}
                    <span className="relative">End-result first</span>
                </button>
                <button
                    role="tab"
                    aria-selected={mode === "base"}
                    onClick={() => setMode("base")}
                    className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        mode === "base"
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    {mode === "base" && (
                        <motion.span
                            layoutId="backforward-pill"
                            className="absolute inset-0 bg-white rounded-md shadow-sm"
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                    )}
                    <span className="relative">Base first</span>
                </button>
            </div>

            <div className="grid md:grid-cols-[1fr_320px] gap-6 items-start">
                {/* Same card, two states */}
                <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 min-h-[280px]">
                    <AnimatePresence mode="wait">
                        {mode === "end" ? (
                            <motion.div
                                key="end-card"
                                initial={reduce ? false : { opacity: 0 }}
                                animate={reduce ? undefined : { opacity: 1 }}
                                exit={reduce ? undefined : { opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative"
                            >
                                {/* Polished but locked card */}
                                <div
                                    className="rounded-xl p-5 text-white relative overflow-hidden"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                                        boxShadow:
                                            "0 10px 40px -10px rgba(17, 24, 39, 0.5), 0 20px 60px -20px rgba(17, 24, 39, 0.3)",
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 tracking-wide">
                                            Learning
                                        </span>
                                        <span className="text-[10px] text-white/60 tabular-nums">
                                            1 / 4
                                        </span>
                                    </div>
                                    <p className="text-base font-medium mb-3 leading-snug">
                                        {sampleCardTitle}
                                    </p>
                                    <p className="text-sm text-white/70 leading-relaxed">
                                        {sampleCardBody}
                                    </p>
                                    <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] text-white/50">
                                        <Lock className="w-3 h-3" aria-hidden />
                                        Sealed object: not editable, not reusable
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="base-card"
                                initial={reduce ? false : { opacity: 0 }}
                                animate={reduce ? undefined : { opacity: 1 }}
                                exit={reduce ? undefined : { opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-2"
                            >
                                {/* Same card broken into editable components */}
                                {components.map((comp, i) => {
                                    const content =
                                        comp === "title"
                                            ? sampleCardTitle
                                            : comp === "body"
                                                ? sampleCardBody
                                                : "Media slot";
                                    return (
                                        <motion.div
                                            key={comp}
                                            initial={
                                                reduce ? false : { opacity: 0, y: 6 }
                                            }
                                            animate={
                                                reduce ? undefined : { opacity: 1, y: 0 }
                                            }
                                            transition={{
                                                duration: 0.3,
                                                delay: reduce ? 0 : i * 0.08,
                                            }}
                                            className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3"
                                        >
                                            <GripVertical
                                                className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0"
                                                aria-hidden
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                                                    {comp}
                                                </p>
                                                <p
                                                    className={`${
                                                        comp === "title"
                                                            ? "text-sm font-medium text-gray-900"
                                                            : "text-sm text-gray-600"
                                                    } leading-snug`}
                                                >
                                                    {content}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                                <p className="text-[11px] text-gray-400 pt-1 pl-1">
                                    Editable. Reorderable. Reusable as a module.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Side caption */}
                <div className="space-y-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                            {current.label}
                        </p>
                        <p className="text-sm font-medium text-gray-900 mb-2 leading-snug">
                            {current.status}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {current.desc}
                        </p>
                    </div>
                </div>
            </div>

            <p className="text-xs text-gray-400 mt-5 italic max-w-2xl">
                {flipCaption}
            </p>
        </div>
    );
}
