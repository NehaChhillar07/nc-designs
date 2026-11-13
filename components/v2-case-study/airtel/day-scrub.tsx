"use client";

// Chapter 06: nine days of the trip dashboard on a scrubber. It swaps real
// captures of the prototype rather than redrawing anything: the state lives
// in the app, this only picks the day. A native range input (arrow keys,
// drag, tap) plus 44px previous and next buttons; the day's caption is
// announced politely.

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { atV2 } from "@/data/v2-airtel-travel-mode-data";

const { dayShots, scrubLabel, scrubOf } = atV2.days;

export function DayScrub({ initial = 3 }: { initial?: number }) {
    const [day, setDay] = useState(initial);
    const shot = dayShots[day - 1];
    const go = (d: number) => setDay(Math.min(dayShots.length, Math.max(1, d)));

    return (
        <figure className="mx-auto w-full max-w-[320px]" data-day-scrub>
            <div className="rotate-[1.5deg] bg-[#f7f3ec] p-2 pb-0 shadow-[0_30px_50px_-30px_rgba(60,10,12,0.6)]">
                <div className="relative overflow-hidden rounded-[18px]" style={{ aspectRatio: `${shot.w} / ${shot.h}` }}>
                    <AnimatePresence initial={false}>
                        <motion.div key={shot.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                            <Image src={shot.src} alt={shot.alt} fill sizes="320px" className="object-cover" />
                        </motion.div>
                    </AnimatePresence>
                </div>
                <p className="v2-mono flex min-h-9 items-center px-1 py-2 text-[11px] text-[var(--v2-ink)] md:text-[12px]">{shot.bar}</p>
            </div>

            <div className="mt-6 flex items-center gap-2">
                <button type="button" onClick={() => go(day - 1)} disabled={day === 1} aria-label="Previous day" className="v2-mono grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--v2-rule)] text-[var(--v2-oxblood)] disabled:opacity-35">
                    ←
                </button>
                <label className="flex flex-1 items-center gap-3">
                    <span className="sr-only">Day of the trip</span>
                    <input
                        type="range"
                        min={1}
                        max={dayShots.length}
                        step={1}
                        value={day}
                        onChange={(e) => go(Number(e.target.value))}
                        aria-valuetext={`${scrubLabel} ${day} ${scrubOf}`}
                        className="h-11 w-full cursor-pointer accent-[var(--v2-oxblood)]"
                    />
                </label>
                <button type="button" onClick={() => go(day + 1)} disabled={day === dayShots.length} aria-label="Next day" className="v2-mono grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--v2-rule)] text-[var(--v2-oxblood)] disabled:opacity-35">
                    →
                </button>
            </div>
            <figcaption aria-live="polite" className="mt-3 min-h-[3rem] text-center text-[15px] leading-snug text-[var(--v2-muted)]">
                <span className="v2-mono mr-2 text-[12px] text-[var(--v2-oxblood)]">
                    {scrubLabel} {day} {scrubOf}
                </span>
                {shot.caption}
            </figcaption>
        </figure>
    );
}
