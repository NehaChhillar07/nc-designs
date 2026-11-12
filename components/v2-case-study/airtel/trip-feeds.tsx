"use client";

// Chapter 07: one trip object on the left, the surfaces it feeds on the
// right, joined by lines that draw in one after another. A fan-out, not a
// sequence, so it isn't a FlowDiagram lane. All text is in the server markup.

import { motion } from "motion/react";

import { DUR, EASE } from "@/components/home-v2/motion";
import { atV2 } from "@/data/v2-airtel-travel-mode-data";

const { tripLabel, trip, feedsLabel, feeds } = atV2.system;

export function TripFeeds() {
    return (
        <div className="grid items-center gap-6 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-0" data-trip-feeds>
            <div className="relative z-10 border border-[var(--v2-oxblood)] bg-[var(--v2-oxblood)] p-5 text-[var(--v2-paper)] shadow-[0_22px_36px_-26px_rgba(60,10,12,0.7)]">
                <p className="v2-mono text-[11px] opacity-80">{tripLabel.toLowerCase()}</p>
                <ul className="mt-2 space-y-1">
                    {trip.map((t) => (
                        <li key={t} className="text-[15px] leading-snug">
                            {t}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="relative md:pl-14">
                {/* one line out of the trip, to a spine that branches to each surface */}
                <motion.span
                    aria-hidden
                    className="absolute left-0 top-1/2 hidden h-px w-14 origin-left bg-[var(--v2-oxblood)] md:block"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 0.4, ease: EASE }}
                />
                <p className="v2-mono mb-3 text-[11px] text-[var(--v2-muted)] md:absolute md:left-1 md:top-1/2 md:mb-0 md:mt-2">{feedsLabel}</p>
                <ul className="space-y-2 border-l border-[var(--v2-oxblood)] pl-5">
                    {feeds.map((f, i) => (
                        <li key={f} className="relative flex items-center">
                            <motion.span
                                aria-hidden
                                className="absolute -left-5 h-px w-5 origin-left bg-[var(--v2-oxblood)]"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                                transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.14 }}
                            />
                            <motion.span
                                initial={{ opacity: 0, x: -6 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                                transition={{ duration: DUR.fast * 2, ease: EASE, delay: 0.3 + i * 0.14 }}
                                className="block w-full border border-[var(--v2-rule)] bg-[#f7f3ec] px-3 py-2 text-[15px] text-[var(--v2-ink)]"
                            >
                                {f}
                            </motion.span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
