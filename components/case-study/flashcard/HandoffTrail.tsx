"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function HandoffTrail({ nodes }: { nodes: readonly string[] }) {
    const reduce = useReducedMotion();

    return (
        <div className="my-10">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 flex-wrap text-sm"
                aria-label="The handoff trail for one course"
            >
                {nodes.map((node, i) => {
                    const isLast = i === nodes.length - 1;
                    return (
                        <span key={node} className="flex items-center gap-2">
                            <motion.span
                                initial={reduce ? false : { opacity: 0, y: 4 }}
                                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    // Deliberately slow stagger — slowness IS the point
                                    delay: reduce ? 0 : 0.4 + i * 0.4,
                                }}
                                className="bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg font-medium text-gray-700"
                            >
                                {node}
                            </motion.span>
                            {!isLast && (
                                <motion.span
                                    initial={reduce ? false : { opacity: 0 }}
                                    whileInView={reduce ? undefined : { opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.3,
                                        delay: reduce ? 0 : 0.4 + i * 0.4 + 0.2,
                                    }}
                                    aria-hidden
                                >
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                </motion.span>
                            )}
                        </span>
                    );
                })}
            </motion.div>
            <p className="text-xs text-gray-400 mt-3 tracking-wide">
                Handoffs for a single course.
            </p>
        </div>
    );
}
