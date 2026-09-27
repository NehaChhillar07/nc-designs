"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Slider } from "@/components/ui/slider";
import { TabsContent } from "@/components/ui/tabs";
import type { Shot } from "@/data/airtel-travel-mode-data";
import { PhoneShot, STAGE_W } from "./media";
import { ChipTab, ChipTabs, ChipTabsList } from "./parts";

// The page's two scrubbable demos. Both swap between real captures of the
// prototype rather than redrawing anything: the state lives in the app, this
// only chooses which frame of it to show.

const SWAP = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } as const;

/** Days 1 to 9 of the trip dashboard on a slider. */
export function DayScrubber({
    shots,
    label,
    ariaLabel,
    initialDay = 3,
    width = STAGE_W,
}: {
    shots: readonly Shot[];
    label: string;
    ariaLabel: string;
    initialDay?: number;
    width?: string;
}) {
    const [day, setDay] = useState(initialDay);
    const shot = shots[day - 1];

    return (
        <figure className="m-0 flex flex-col items-center">
            <div className={`grid ${width} [&>*]:col-start-1 [&>*]:row-start-1`}>
                <AnimatePresence initial={false}>
                    <motion.div
                        key={shot.src}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={SWAP}
                    >
                        <PhoneShot shot={shot} showCaption={false} width="w-full" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-5 flex w-[min(320px,86vw)] items-center gap-4">
                <Slider
                    min={1}
                    max={shots.length}
                    step={1}
                    value={[day]}
                    onValueChange={([d]) => setDay(d)}
                    aria-label={ariaLabel}
                    className="flex-1"
                />
                <span className="min-w-[5.5rem] text-right text-sm tabular-nums text-gray-600">
                    {label.replace("{day}", String(day))}
                </span>
            </div>
            <figcaption aria-live="polite" className="mx-auto mt-3 min-h-[3rem] max-w-[22rem] text-center text-sm leading-relaxed text-gray-500">
                {shot.caption}
            </figcaption>
        </figure>
    );
}

/**
 * One large phone behind a row of chips: preset trips, before and after, the
 * states of one moment. Pass `value` and `onValueChange` to keep two of these
 * in step (the banner and the screen it opens).
 */
export function ShotTabs({
    items,
    ariaLabel,
    width = STAGE_W,
    value,
    onValueChange,
}: {
    items: readonly { label: string; shot: Shot }[];
    ariaLabel: string;
    width?: string;
    value?: string;
    onValueChange?: (value: string) => void;
}) {
    return (
        <ChipTabs
            defaultValue={value === undefined ? items[0].label : undefined}
            value={value}
            onValueChange={onValueChange}
            className="w-full items-center"
        >
            <ChipTabsList aria-label={ariaLabel} className="justify-center">
                {items.map((p) => (
                    <ChipTab key={p.label} value={p.label}>
                        {p.label}
                    </ChipTab>
                ))}
            </ChipTabsList>
            {items.map((p) => (
                <TabsContent key={p.label} value={p.label} className="flex justify-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={SWAP}>
                        <PhoneShot shot={p.shot} width={width} reserveCaption />
                    </motion.div>
                </TabsContent>
            ))}
        </ChipTabs>
    );
}
