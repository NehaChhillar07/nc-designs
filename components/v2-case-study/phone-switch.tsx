"use client";

// One or more phone prints switched between states by a pill radio group
// (click, tap or arrow keys). With several phones per state they flip
// together: Airtel's arrival banner and the screen it opens. Every state's
// screens are in the server markup; the hidden ones are aria-hidden, and the
// state's caption is announced politely.

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { EASE } from "@/components/home-v2/motion";
import type { Shot } from "@/data/v2-human-firewall-data";
import { cn } from "@/lib/utils";

import { StateSwitch } from "./state-switch";

export type PhoneState = { id: string; label: string; shots: Shot[]; caption?: string };

const TILTS = [-1.5, 1.5, -1];

export function PhoneSwitch({
    id,
    label,
    states,
    className,
}: {
    id: string;
    label: string;
    states: PhoneState[];
    className?: string;
}) {
    const [value, setValue] = useState(states[0].id);
    const current = states.find((s) => s.id === value) ?? states[0];
    const count = states[0].shots.length;
    // Without a state caption, the first phone's caption is what's announced.
    const hasCaption = states.some((s) => s.caption);

    return (
        <figure className={cn("w-full", className)} data-phone-switch={id}>
            <StateSwitch id={id} label={label} value={value} onChange={setValue} options={states.map((s) => ({ id: s.id, label: s.label }))} className="mb-6 justify-center" />
            <div className={cn("mx-auto grid gap-3 md:gap-8", count === 1 ? "max-w-[320px]" : "max-w-[680px] grid-cols-2")}>
                {Array.from({ length: count }, (_, i) => {
                    const shot = current.shots[i];
                    return (
                        <div key={i} className="bg-[#f7f3ec] p-1.5 pb-0 shadow-[0_30px_50px_-30px_rgba(60,10,12,0.6)] md:p-2 md:pb-0" style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}>
                            <div className="relative overflow-hidden rounded-[14px] md:rounded-[18px]" style={{ aspectRatio: `${shot.w} / ${shot.h}` }}>
                                {states.map((s) => (
                                    <motion.div
                                        key={s.id}
                                        aria-hidden={s.id !== value}
                                        initial={false}
                                        animate={{ opacity: s.id === value ? 1 : 0 }}
                                        transition={{ duration: 0.45, ease: EASE }}
                                        className="absolute inset-0"
                                    >
                                        <Image src={s.shots[i].src} alt={s.shots[i].alt} fill sizes={count === 1 ? "320px" : "(min-width: 768px) 320px, 45vw"} className="object-cover" />
                                    </motion.div>
                                ))}
                            </div>
                            <p aria-live={!hasCaption && i === 0 ? "polite" : undefined} className="v2-mono flex min-h-9 items-center px-0.5 py-2 text-[10px] leading-snug text-[var(--v2-ink)] md:px-1 md:text-[12px]">{shot.bar}</p>
                        </div>
                    );
                })}
            </div>
            {hasCaption && (
                <figcaption aria-live="polite" className="mx-auto mt-5 min-h-[3.25rem] max-w-[46ch] text-center text-[15px] leading-snug text-[var(--v2-muted)]">
                    {current.caption}
                </figcaption>
            )}
        </figure>
    );
}
