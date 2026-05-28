"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers } from "lucide-react";

export function StandaloneToEmbedded({
    crossLinkText,
    crossLinkHref,
}: {
    crossLinkText: string;
    crossLinkHref: string;
}) {
    const reduce = useReducedMotion();

    return (
        <div className="my-10">
            {/* HF3 outer shell */}
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="rounded-2xl overflow-hidden"
                style={{
                    background: "#ffffff",
                    border: "1px solid #e4e4e7",
                    boxShadow:
                        "0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 40px 100px -20px rgba(0, 0, 0, 0.06)",
                }}
            >
                {/* Browser chrome */}
                <div
                    className="flex items-center gap-2 px-4 py-3"
                    style={{ background: "#e4e4e7" }}
                >
                    <div className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: "#ff5f57" }}
                        />
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: "#febc2e" }}
                        />
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: "#28c840" }}
                        />
                    </div>
                    <span className="ml-3 text-xs text-gray-500 font-medium tracking-wide">
                        Human Firewall 3 — Training Module
                    </span>
                </div>

                {/* HF3 inner shell — simulated nav rail + flashcard module nested */}
                <div className="grid grid-cols-[56px_1fr] min-h-[260px]">
                    {/* Side rail */}
                    <div className="bg-gray-50 border-r border-gray-200 py-4 flex flex-col items-center gap-3">
                        {[0, 1, 2, 3].map((n) => (
                            <span
                                key={n}
                                className={`w-6 h-6 rounded-md ${
                                    n === 2 ? "bg-gray-900" : "bg-gray-200"
                                }`}
                                aria-hidden
                            />
                        ))}
                    </div>

                    {/* Nested flashcard module */}
                    <div className="p-5 bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Flashcard Training (module)
                            </p>
                            <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
                                <Layers className="w-3 h-3" aria-hidden />
                                Nested inside HF3
                            </span>
                        </div>

                        <motion.div
                            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                            whileInView={
                                reduce ? undefined : { opacity: 1, scale: 1 }
                            }
                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                            transition={{
                                duration: 0.6,
                                delay: reduce ? 0 : 0.3,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="rounded-xl border border-gray-200 bg-gray-50/60 p-4"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-medium text-gray-900">
                                    Data Privacy Essentials
                                </p>
                                <span className="text-[10px] text-gray-500 tabular-nums">
                                    12 cards
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[0, 1, 2].map((n) => (
                                    <div
                                        key={n}
                                        className="h-14 rounded-lg"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                                        }}
                                        aria-hidden
                                    />
                                ))}
                            </div>
                            <p className="text-[11px] text-gray-500 mt-3">
                                Personalised by role, designation, and level.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Inline cross-link */}
            <p className="mt-6 text-sm">
                <a
                    href={crossLinkHref}
                    className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
                >
                    {crossLinkText}
                    <span aria-hidden>→</span>
                </a>
            </p>
        </div>
    );
}
