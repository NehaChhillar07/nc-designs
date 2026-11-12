"use client";

// Chapter 01: the seven questions drawn as one trip. Three acts along a
// route that draws itself (before you fly → the moment she lands → every day
// after); each stop is a question, what the research found, and a link to
// the chapter that answers it. Left to right from md, top to bottom on
// phones. All text is in the server markup.

import { motion } from "motion/react";

import { DUR, EASE } from "@/components/home-v2/motion";
import { atV2 } from "@/data/v2-airtel-travel-mode-data";

const { acts } = atV2.problem;

export function TripRoute() {
    return (
        <div data-trip-route>
            <ol className="grid gap-10 md:grid-cols-[3fr_2fr_3fr] md:gap-6">
                {acts.map((act, a) => (
                    <li key={act.label} className="relative">
                        {/* the route: a dot for the act, then the line to the next */}
                        <div aria-hidden className="mb-5 flex items-center gap-3">
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--v2-oxblood)]" />
                            <motion.span
                                className="h-px flex-1 origin-left bg-[var(--v2-oxblood)]"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                                transition={{ duration: 0.6, ease: EASE, delay: 0.2 + a * 0.35 }}
                            />
                            {a === acts.length - 1 && <span className="v2-mono text-[13px] text-[var(--v2-oxblood)]">home</span>}
                        </div>
                        <p className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{act.label.toLowerCase()}</p>
                        <ol className="mt-3 space-y-5 border-l border-[var(--v2-rule)] pl-4 md:border-l-0 md:pl-0">
                            {act.stops.map((s, i) => (
                                <motion.li
                                    key={s.id + s.n}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                                    transition={{ duration: DUR.fast * 2, ease: EASE, delay: 0.3 + a * 0.35 + i * 0.1 }}
                                >
                                    <a href={`#${s.id}`} className="group block">
                                        <span className="v2-mono text-[11px] text-[var(--v2-muted)]">0{s.n}</span>
                                        <span className="v2-display mt-0.5 block text-[22px] leading-[1.12] text-[var(--v2-ink)] transition-colors group-hover:text-[var(--v2-oxblood)] md:text-[24px]">
                                            {s.question}
                                        </span>
                                        <span className="mt-1.5 block text-[14px] leading-snug text-[var(--v2-muted)]">{s.finding}</span>
                                    </a>
                                </motion.li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ol>
        </div>
    );
}
