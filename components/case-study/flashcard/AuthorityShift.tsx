"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";

export function AuthorityShift({
    from,
    to,
    token,
}: {
    from: string;
    to: string;
    token: string;
}) {
    const reduce = useReducedMotion();
    const [replayKey, setReplayKey] = useState(0);

    return (
        <div className="my-10">
            <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-4">
                {/* From zone (CS) */}
                <motion.div
                    key={`from-${replayKey}`}
                    initial={reduce ? false : { opacity: 1 }}
                    animate={reduce ? undefined : { opacity: [1, 1, 0.4] }}
                    transition={{ duration: 1.4, times: [0, 0.5, 1], ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative rounded-xl border border-gray-200 bg-gray-50/50 p-6 flex flex-col items-center justify-center min-h-[140px]"
                >
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                        {from}
                    </p>
                    {/* Token in starting position (reduced-motion: hidden / arrow only) */}
                    {!reduce && (
                        <motion.div
                            key={`token-${replayKey}`}
                            initial={{ x: 0, opacity: 1 }}
                            animate={{
                                x: ["0%", "0%", "120%"],
                                opacity: [1, 1, 0],
                            }}
                            transition={{
                                duration: 1.4,
                                times: [0, 0.3, 1],
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-2 px-3 py-1.5 rounded-md bg-gray-900 text-white text-xs font-medium shadow-sm"
                        >
                            {token}
                        </motion.div>
                    )}
                    {reduce && (
                        <p className="text-sm text-gray-400">(was here)</p>
                    )}
                </motion.div>

                {/* Arrow */}
                <div className="flex items-center justify-center px-2">
                    <ArrowRight className="w-5 h-5 text-gray-400" aria-hidden />
                </div>

                {/* To zone (Client) */}
                <motion.div
                    key={`to-${replayKey}`}
                    initial={reduce ? false : { opacity: 0.4 }}
                    animate={reduce ? undefined : { opacity: [0.4, 0.4, 1] }}
                    transition={{ duration: 1.4, times: [0, 0.5, 1], ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative rounded-xl border-2 border-gray-900 bg-gray-900/[0.02] p-6 flex flex-col items-center justify-center min-h-[140px]"
                >
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-3">
                        {to}
                    </p>
                    {/* Token arrives (or static for reduced motion) */}
                    {!reduce ? (
                        <motion.div
                            key={`landed-${replayKey}`}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: [0, 0, 1], scale: [0.92, 0.92, 1] }}
                            transition={{
                                duration: 1.4,
                                times: [0, 0.7, 1],
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-xs font-medium shadow-sm"
                        >
                            {token}
                        </motion.div>
                    ) : (
                        <div className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-xs font-medium shadow-sm">
                            {token}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Replay control */}
            {!reduce && (
                <button
                    onClick={() => setReplayKey((k) => k + 1)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
                    aria-label="Replay the shift animation"
                >
                    <RotateCcw className="w-3 h-3" aria-hidden />
                    Replay
                </button>
            )}
        </div>
    );
}
