"use client";

import { motion, useReducedMotion } from "motion/react";

type Path = {
    label: string;
    state: string;
    desc: string;
};

export function DeferredBet({
    now,
    later,
}: {
    now: Path;
    later: Path;
}) {
    const reduce = useReducedMotion();

    return (
        <div className="my-10 grid md:grid-cols-2 gap-4">
            {/* NOW path — lit, confident */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative rounded-xl border-2 border-gray-900 bg-gray-900/[0.02] p-6"
            >
                <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-900">
                        {now.label}
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-900 text-white text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" aria-hidden />
                        {now.state}
                    </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{now.desc}</p>
            </motion.div>

            {/* LATER path — calm, on the roadmap (NOT shelved, NOT dimmed-dead) */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{
                    duration: 0.6,
                    delay: reduce ? 0 : 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-6"
            >
                <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {later.label}
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" aria-hidden />
                        {later.state}
                    </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{later.desc}</p>
            </motion.div>
        </div>
    );
}
