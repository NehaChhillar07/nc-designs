"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Monitor, Smartphone } from "lucide-react";

type Surface = {
    label: string;
    desc: string;
};

export function SurfaceToggle({
    creator,
    learner,
}: {
    creator: Surface;
    learner: Surface;
}) {
    const reduce = useReducedMotion();
    const [active, setActive] = useState<"creator" | "learner">("creator");

    return (
        <div className="my-10">
            {/* Toggle */}
            <div
                role="tablist"
                aria-label="Compare creator surface with learner surface"
                className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg mb-6"
            >
                <button
                    role="tab"
                    aria-selected={active === "creator"}
                    onClick={() => setActive("creator")}
                    className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        active === "creator"
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    {active === "creator" && (
                        <motion.span
                            layoutId="surface-pill"
                            className="absolute inset-0 bg-white rounded-md shadow-sm"
                            transition={{
                                duration: 0.3,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                        />
                    )}
                    <span className="relative flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5" aria-hidden />
                        Creator
                    </span>
                </button>
                <button
                    role="tab"
                    aria-selected={active === "learner"}
                    onClick={() => setActive("learner")}
                    className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        active === "learner"
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    {active === "learner" && (
                        <motion.span
                            layoutId="surface-pill"
                            className="absolute inset-0 bg-white rounded-md shadow-sm"
                            transition={{
                                duration: 0.3,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                        />
                    )}
                    <span className="relative flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" aria-hidden />
                        Learner
                    </span>
                </button>
            </div>

            {/* Surface */}
            <AnimatePresence mode="wait">
                {active === "creator" ? (
                    <motion.div
                        key="creator"
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={reduce ? undefined : { opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -8 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                    >
                        <CreatorSurface desc={creator.desc} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="learner"
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={reduce ? undefined : { opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -8 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                    >
                        <LearnerSurface desc={learner.desc} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function CreatorSurface({ desc }: { desc: string }) {
    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                background: "#ffffff",
                border: "1px solid #e4e4e7",
                boxShadow:
                    "0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 40px 100px -20px rgba(0, 0, 0, 0.06)",
            }}
        >
            <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: "#e4e4e7" }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                </div>
                <span className="ml-3 text-xs text-gray-500 font-medium tracking-wide">
                    Manage training content
                </span>
            </div>
            <div className="grid grid-cols-[180px_1fr] min-h-[280px]">
                {/* Side rail */}
                <div className="bg-gray-50 border-r border-gray-200 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
                        Packs
                    </p>
                    <ul className="space-y-1.5">
                        {[
                            { label: "Data Privacy", active: true },
                            { label: "AI Ethics", active: false },
                            { label: "Phishing 101", active: false },
                            { label: "PCI Basics", active: false },
                        ].map((p) => (
                            <li
                                key={p.label}
                                className={`text-xs px-2 py-1.5 rounded ${
                                    p.active
                                        ? "bg-gray-900 text-white font-medium"
                                        : "text-gray-700"
                                }`}
                            >
                                {p.label}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Main editor */}
                <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-gray-700">
                            Data Privacy Essentials · 12 cards
                        </p>
                        <span className="text-[10px] text-gray-400">Auto-saved</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {[0, 1, 2, 3, 4, 5].map((n) => (
                            <div
                                key={n}
                                className="rounded-md border border-gray-200 bg-gray-50/40 h-20 p-2"
                            >
                                <div className="h-1.5 rounded bg-gray-300 w-3/4 mb-1.5" />
                                <div className="h-1 rounded bg-gray-200 w-1/2 mb-1" />
                                <div className="h-1 rounded bg-gray-200 w-2/3" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50/60">
                <p className="text-[11px] text-gray-500">{desc}</p>
            </div>
        </div>
    );
}

function LearnerSurface({ desc }: { desc: string }) {
    return (
        <div className="flex flex-col items-center">
            {/* Phone frame */}
            <div
                className="relative rounded-[2.5rem] p-2 shadow-2xl"
                style={{
                    background:
                        "linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 100%)",
                    width: 280,
                    height: 540,
                }}
            >
                {/* Notch */}
                <div
                    className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-2xl z-10"
                    style={{ background: "#0a0a0a" }}
                />
                {/* Screen */}
                <div
                    className="w-full h-full rounded-[2rem] overflow-hidden flex flex-col p-5"
                    style={{
                        background:
                            "linear-gradient(180deg, #0f172a 0%, #020617 100%)",
                    }}
                >
                    {/* Status bar */}
                    <div className="flex items-center justify-between text-[10px] text-white/60 mb-6 mt-1 pt-2">
                        <span>9:41</span>
                        <span className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-white/60" />
                            <span className="w-1 h-1 rounded-full bg-white/60" />
                            <span className="w-1 h-1 rounded-full bg-white/60" />
                        </span>
                    </div>
                    {/* The card */}
                    <div
                        className="flex-1 rounded-2xl p-5 text-white relative"
                        style={{
                            background:
                                "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                            boxShadow:
                                "0 16px 50px -16px rgba(17, 24, 39, 0.7), 0 30px 70px -30px rgba(17, 24, 39, 0.4)",
                        }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="inline-block text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/10 tracking-wide">
                                Learning
                            </span>
                            <span className="text-[10px] text-white/60 tabular-nums">
                                1 / 4
                            </span>
                        </div>
                        <p className="text-base font-medium leading-snug pr-1">
                            Data Privacy isn&apos;t paperwork.
                        </p>
                        <p className="text-sm text-white/70 leading-relaxed mt-3">
                            It&apos;s the difference between trust and a public
                            incident.
                        </p>
                        <p className="absolute bottom-4 left-5 text-[10px] text-white/40 tracking-wide">
                            Data Privacy Essentials
                        </p>
                    </div>
                    {/* Dots */}
                    <div className="flex items-center justify-center gap-1.5 mt-5 mb-2">
                        <span className="w-6 h-1.5 rounded-full bg-white" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    </div>
                </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-4 max-w-xs text-center">
                {desc}
            </p>
        </div>
    );
}
