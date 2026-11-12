"use client";

// Chapter 04. The two worlds over one phone: a radio switch (click, tap,
// arrow keys) swaps the live feed between personal and professional, so the
// reader sees the content change, not only the colour. Both screens are in
// the server markup; the hidden one is aria-hidden.

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { EASE } from "@/components/home-v2/motion";
import { unV2 } from "@/data/v2-unsaid-data";

import { StateSwitch } from "../state-switch";

const { shots, switchLabel } = unV2.worlds;
type World = keyof typeof shots;

export function WorldSwitch() {
    const [world, setWorld] = useState<World>("personal");
    const shot = shots[world];
    return (
        <figure className="mx-auto w-full max-w-[320px]">
            <StateSwitch
                id="unsaid-world"
                label={switchLabel}
                value={world}
                onChange={setWorld}
                options={(Object.keys(shots) as World[]).map((w) => ({ id: w, label: w }))}
                className="mb-4"
            />
            <div className="rotate-[2deg] bg-[#f7f3ec] p-2 pb-0 shadow-[0_30px_50px_-30px_rgba(60,10,12,0.6)]">
                <div className="relative overflow-hidden rounded-[18px]" style={{ aspectRatio: `${shot.w} / ${shot.h}` }}>
                    {(Object.keys(shots) as World[]).map((w) => (
                        <motion.div
                            key={w}
                            aria-hidden={w !== world}
                            initial={false}
                            animate={{ opacity: w === world ? 1 : 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="absolute inset-0"
                        >
                            <Image src={shots[w].src} alt={shots[w].alt} fill sizes="320px" className="object-cover" />
                        </motion.div>
                    ))}
                </div>
                <figcaption aria-live="polite" className="v2-mono flex min-h-9 items-center px-1 py-2 text-[11px] text-[var(--v2-ink)] md:text-[12px]">
                    {shot.bar}
                </figcaption>
            </div>
        </figure>
    );
}
