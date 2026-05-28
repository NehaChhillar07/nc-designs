"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type StateBlock = {
    label: string;
    items: readonly string[];
};

export function BeforeWantedToggle({
    before,
    wanted,
}: {
    before: StateBlock;
    wanted: StateBlock;
}) {
    const reduce = useReducedMotion();
    const [active, setActive] = useState<"before" | "wanted">("before");

    // Reduced-motion / no-JS fallback: both side-by-side, static
    if (reduce) {
        return (
            <div className="grid md:grid-cols-2 gap-4 my-10">
                <StaticPanel block={before} dimmed />
                <StaticPanel block={wanted} />
            </div>
        );
    }

    const currentBlock = active === "before" ? before : wanted;

    return (
        <div className="my-10">
            {/* Segmented control */}
            <div
                role="tablist"
                aria-label="Compare how training got made with what clients wanted"
                className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg mb-5"
            >
                <button
                    role="tab"
                    aria-selected={active === "before"}
                    onClick={() => setActive("before")}
                    className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        active === "before"
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    {active === "before" && (
                        <motion.span
                            layoutId="beforewanted-pill"
                            className="absolute inset-0 bg-white rounded-md shadow-sm"
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                    )}
                    <span className="relative">How training got made</span>
                </button>
                <button
                    role="tab"
                    aria-selected={active === "wanted"}
                    onClick={() => setActive("wanted")}
                    className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        active === "wanted"
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    {active === "wanted" && (
                        <motion.span
                            layoutId="beforewanted-pill"
                            className="absolute inset-0 bg-white rounded-md shadow-sm"
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                    )}
                    <span className="relative">What clients wanted</span>
                </button>
            </div>

            {/* Animated card region */}
            <div
                className={`border rounded-xl p-6 ${
                    active === "before"
                        ? "border-gray-200 bg-gray-50/50"
                        : "border-gray-900 border-2 bg-gray-900/[0.02]"
                }`}
                style={{ minHeight: 240 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <p
                            className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                                active === "before" ? "text-gray-400" : "text-gray-900"
                            }`}
                        >
                            {currentBlock.label}
                        </p>
                        <ul className="space-y-3">
                            {currentBlock.items.map((item) => (
                                <li
                                    key={item}
                                    className={`flex items-start gap-3 ${
                                        active === "before"
                                            ? "text-sm text-gray-500"
                                            : "text-sm font-medium text-gray-900"
                                    }`}
                                >
                                    <span
                                        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            active === "before"
                                                ? "bg-gray-200"
                                                : "bg-gray-900"
                                        }`}
                                    >
                                        <span
                                            className={`text-xs ${
                                                active === "before"
                                                    ? "text-gray-400"
                                                    : "text-white"
                                            }`}
                                        >
                                            {active === "before" ? "✕" : "✓"}
                                        </span>
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function StaticPanel({ block, dimmed }: { block: StateBlock; dimmed?: boolean }) {
    return (
        <div
            className={`rounded-xl p-6 ${
                dimmed
                    ? "border border-gray-200 bg-gray-50/50"
                    : "border-2 border-gray-900 bg-gray-900/[0.02]"
            }`}
        >
            <p
                className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                    dimmed ? "text-gray-400" : "text-gray-900"
                }`}
            >
                {block.label}
            </p>
            <ul className="space-y-3">
                {block.items.map((item) => (
                    <li
                        key={item}
                        className={
                            dimmed
                                ? "text-sm text-gray-500"
                                : "text-sm font-medium text-gray-900"
                        }
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
