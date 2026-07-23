"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Loader2, Sparkles } from "lucide-react";

type Phase = "ready" | "running" | "done";

export function ApproveToPublish({
    steps,
    cta,
    automationLabel,
    automationValue,
    authorityLabel,
    authorityValue,
}: {
    steps: readonly string[];
    cta: string;
    automationLabel: string;
    automationValue: string;
    authorityLabel: string;
    authorityValue: string;
}) {
    const reduce = useReducedMotion();
    const [phase, setPhase] = useState<Phase>("ready");
    const [stepIdx, setStepIdx] = useState(0);

    function start() {
        if (phase !== "ready") return;
        if (reduce) {
            // Jump straight to published state
            setStepIdx(steps.length - 1);
            setPhase("done");
            return;
        }
        setPhase("running");
        setStepIdx(0);
        // Sequence through the steps
        const total = steps.length;
        const stepDuration = 900;
        for (let i = 1; i < total; i++) {
            setTimeout(() => {
                setStepIdx(i);
                if (i === total - 1) {
                    setTimeout(() => setPhase("done"), stepDuration);
                }
            }, i * stepDuration);
        }
    }

    function reset() {
        setPhase("ready");
        setStepIdx(0);
    }

    return (
        <div className="my-10">
            {/* Automation / Authority paired label — rhymes with HF */}
            <div className="grid grid-cols-2 text-center mb-6 max-w-md">
                <div className="border border-gray-200 rounded-l-lg p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                        {automationLabel}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                        {automationValue}
                    </p>
                </div>
                <div className="border border-gray-200 border-l-0 rounded-r-lg p-4 bg-gray-900/[0.02]">
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                        {authorityLabel}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                        {authorityValue}
                    </p>
                </div>
            </div>

            {/* Draft surface */}
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/60">
                    <div className="flex items-center gap-2">
                        <span
                            className={`inline-flex w-2 h-2 rounded-full ${
                                phase === "done" ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                            aria-hidden
                        />
                        <p className="text-sm font-medium text-gray-900">
                            {phase === "done"
                                ? "Published: saved to your library"
                                : "Draft training: ready, not shipped"}
                        </p>
                    </div>
                    {phase === "done" && !reduce && (
                        <button
                            onClick={reset}
                            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                            aria-label="Reset to draft state"
                        >
                            Reset
                        </button>
                    )}
                </div>

                <div className="px-5 py-6">
                    {phase === "ready" ? (
                        <div className="flex flex-col items-start gap-4">
                            <p className="text-sm text-gray-600 max-w-md leading-relaxed">
                                Cards are reviewed and edited. Nothing goes out until the
                                admin pushes it.
                            </p>
                            <button
                                onClick={start}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                            >
                                <Sparkles className="w-4 h-4" aria-hidden />
                                {cta}
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-3" aria-live="polite">
                            {steps.map((step, i) => {
                                const reached = i <= stepIdx;
                                const active = i === stepIdx && phase === "running";
                                const completed =
                                    reached &&
                                    (phase === "done" || i < stepIdx);
                                return (
                                    <motion.li
                                        key={step}
                                        initial={reduce ? false : { opacity: 0, x: -4 }}
                                        animate={
                                            reached
                                                ? { opacity: 1, x: 0 }
                                                : { opacity: 0.4, x: 0 }
                                        }
                                        transition={{
                                            duration: 0.3,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                        className="flex items-center gap-3"
                                    >
                                        <span
                                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                completed
                                                    ? "bg-emerald-500 text-white"
                                                    : active
                                                        ? "bg-gray-900 text-white"
                                                        : "bg-gray-200 text-gray-500"
                                            }`}
                                        >
                                            {completed ? (
                                                <Check
                                                    className="w-3 h-3"
                                                    strokeWidth={3}
                                                    aria-hidden
                                                />
                                            ) : active ? (
                                                <Loader2
                                                    className="w-3 h-3 animate-spin"
                                                    aria-hidden
                                                />
                                            ) : (
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                            )}
                                        </span>
                                        <span
                                            className={`text-sm ${
                                                reached
                                                    ? "text-gray-900 font-medium"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {step}
                                        </span>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>

            <p className="text-xs text-gray-400 mt-3 italic">
                The human action is what ships it.
            </p>
        </div>
    );
}
