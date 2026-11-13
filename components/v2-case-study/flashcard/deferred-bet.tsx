"use client";

// Chapter 03. Sequenced, not killed. The conversational card is taped to the
// roadmap note for later; the flashcard card is dealt forward, circled, now.

import { motion } from "motion/react";

import { EASE } from "@/components/home-v2/motion";
import { fcV2 } from "@/data/v2-flashcard-data";

import { CAVEAT, Stamp } from "../cs-kit";
import { springT, useTempo } from "./deck";

const { now, later } = fcV2.formatQuestion.paths;
const { roadmapNote } = fcV2.formatQuestion;

export function DeferredBet() {
    const t = useTempo();
    return (
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
            {/* later: taped to the roadmap */}
            <motion.div
                initial={{ opacity: 0, y: 20, rotate: -6 }}
                whileInView={{ opacity: 1, y: 0, rotate: -2.5 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={springT(t, 160, 22)}
                className="relative bg-[#ead3c2] px-6 pb-6 pt-9 shadow-[0_22px_36px_-26px_rgba(60,10,12,0.6)]"
            >
                <span aria-hidden className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2 bg-[var(--v2-oxblood)] opacity-90" />
                <p className="text-[20px] leading-none text-[var(--v2-oxblood)]" style={CAVEAT}>
                    {roadmapNote}
                </p>
                <div className="mt-4 bg-[#f7f3ec] p-5 opacity-90">
                    <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{later.state.toLowerCase()}</p>
                    <p className="v2-display mt-2 text-[30px] leading-none text-[var(--v2-muted)]">{later.label}</p>
                    <p className="mt-3 text-[15px] leading-snug text-[var(--v2-muted)]">{later.desc}</p>
                </div>
                <Stamp className="absolute -right-2 bottom-4 rotate-[-8deg]">{later.state}</Stamp>
            </motion.div>

            {/* now: dealt forward */}
            <motion.div
                initial={{ opacity: 0, y: 60, x: -40, rotate: 8 }}
                whileInView={{ opacity: 1, y: 0, x: 0, rotate: 1.5 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ ...springT(t, 200, 20), delay: 0.25 * t }}
                className="relative self-center bg-[#1a1414] p-6 text-[#f2ece3] shadow-[0_34px_50px_-26px_rgba(0,0,0,0.65)] md:p-8"
            >
                <p className="v2-mono text-[12px] text-[#e2b98a]">{now.state.toLowerCase()}</p>
                <p className="v2-display mt-2 text-[40px] leading-none">{now.label}</p>
                <p className="mt-3 text-[16px] leading-snug text-white/80">{now.desc}</p>
                {/* the choice, circled by hand */}
                <svg aria-hidden viewBox="0 0 300 160" preserveAspectRatio="none" className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]">
                    <motion.path
                        d="M18 92 C 8 30, 120 6, 210 14 C 290 22, 300 110, 240 140 C 170 168, 40 158, 14 104 C 6 84, 30 56, 60 44"
                        fill="none"
                        stroke="var(--v2-oxblood)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                        transition={{ duration: 1.1 * t, ease: EASE, delay: 0.8 * t }}
                    />
                </svg>
            </motion.div>
        </div>
    );
}
