"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { LazyVideo } from "@/components/ui/lazy-video";
import { SHOT_SIZE, type Clip, type Shot } from "@/data/airtel-travel-mode-data";
import { withEmphasis } from "./parts";

// Every phone here is a real capture of the prototype, so the frame stays out
// of the way: a rounded screen, a hairline and a soft shadow, the way unsaid
// shows its screenshots. No drawn bezel, no fake status bar.

const FRAME = "overflow-hidden rounded-[34px] ring-1 ring-gray-900/10 shadow-2xl shadow-gray-900/15";
const FRAME_DARK = "overflow-hidden rounded-[34px] ring-1 ring-cream/10 shadow-2xl shadow-black/50";

/** Default phone width: readable, and two fit side by side from `sm`. */
export const PHONE_W = "w-[min(280px,74vw)]";

/**
 * The one large phone on the right of a section (see `Split`): about as tall
 * as the copy beside it, like holding the phone next to the page.
 */
export const STAGE_W = "w-[min(300px,76vw)] xl:w-[320px]";

function Caption({ text, dark = false, reserve = false }: { text?: string; dark?: boolean; reserve?: boolean }) {
    if (!text) return null;
    return (
        <figcaption
            className={cn(
                "mx-auto mt-4 max-w-[22rem] text-center text-sm leading-relaxed",
                // Screens behind a switch keep the same caption height, so
                // swapping one never moves the copy beside it.
                reserve && "min-h-[4.25rem]",
                dark ? "text-cream-soft" : "text-gray-500",
            )}
        >
            {withEmphasis(text, dark)}
        </figcaption>
    );
}

export function PhoneShot({
    shot,
    size = SHOT_SIZE,
    width = PHONE_W,
    dark = false,
    preload = false,
    showCaption = true,
    reserveCaption = false,
    annotations,
}: {
    shot: Shot;
    size?: { width: number; height: number };
    width?: string;
    dark?: boolean;
    preload?: boolean;
    showCaption?: boolean;
    /** Hold the caption's height steady (for screens behind a switch). */
    reserveCaption?: boolean;
    /** Positioned against the screen itself (not the caption), e.g. <HandNotes />. */
    annotations?: ReactNode;
}) {
    return (
        <figure className="m-0 flex flex-col items-center">
            <div className="relative">
                <div className={cn(width, dark ? FRAME_DARK : FRAME)}>
                    <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={size.width}
                        height={size.height}
                        sizes="(min-width: 640px) 320px, 78vw"
                        preload={preload}
                        className="block h-auto w-full"
                    />
                </div>
                {annotations}
            </div>
            {showCaption && <Caption text={shot.caption} dark={dark} reserve={reserveCaption} />}
        </figure>
    );
}

/* ------------------------------------------------------------ hand notes */

// One handwritten note in the white space to the right of a phone, with a
// single pen-stroke arrow into the screen. The lines write on together, then
// the curve draws, then the head, as on the Work with me page. The arrow sits
// in an 84x100 box to the left of the note: it leaves beside the first line
// and ends about 40px inside the frame, on the "Please wait" line of the
// loading screen.
//
// The caller leaves 16rem free to the right of the phone from `xl` up. Below
// that there is no room beside it, so the note sits under the screen with a
// small arrow pointing up at it.

const STROKE = { stroke: "currentColor", strokeWidth: 2.25, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;

export function HandNotes({ notes }: { notes: readonly string[] }) {
    // Timing only: the markup is identical either way, so this is hydration safe.
    const still = useReducedMotion();
    const at = (duration: number, delay: number) =>
        still ? { duration: 0 } : { duration, delay, ease: [0.25, 0.1, 0.25, 1] as const };
    const draw = (duration: number, delay: number) => ({
        hidden: { pathLength: 0, opacity: 0 },
        shown: { pathLength: 1, opacity: 1, transition: at(duration, delay) },
    });

    return (
        <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="mt-5 flex flex-col items-center gap-1 text-accent-warm-deep xl:pointer-events-none xl:absolute xl:left-full xl:top-[46%] xl:ml-8 xl:mt-0 xl:block xl:w-56"
        >
            {/* Phone: a short arrow up at the screen above. */}
            <svg viewBox="0 0 20 24" aria-hidden="true" className="h-6 w-5 xl:hidden">
                <motion.path d="M10 22 C 7 16, 7 9, 10 3" {...STROKE} variants={draw(0.35, 0.6)} />
                <motion.path d="M5.5 7.5 L10 3 L13.5 8" {...STROKE} variants={draw(0.2, 0.95)} />
            </svg>

            {/* From xl up: one curve from beside the first line into the frame. */}
            <svg
                viewBox="0 0 84 100"
                aria-hidden="true"
                className="absolute right-full top-0 mr-1 hidden h-[100px] w-[84px] overflow-visible xl:block"
            >
                <motion.path d="M82 12 C 58 8, 30 30, 6 84" {...STROKE} variants={draw(0.5, 0.6)} />
                <motion.path d="M14.1 78.1 L6 84 L5 74.1" {...STROKE} variants={draw(0.2, 1.1)} />
            </svg>

            {/* Caveat's strokes overhang their box, so the mask ends a little
                outside it rather than on the edge. */}
            <motion.ul
                variants={{
                    hidden: { clipPath: "inset(0% 100% 0% 0%)" },
                    shown: { clipPath: "inset(-10% -6% -10% -6%)", transition: at(0.7, 0) },
                }}
                className="text-center font-(family-name:--font-caveat) text-[1.3rem] font-semibold leading-[1.3] xl:text-left"
            >
                {notes.map((line) => (
                    <li key={line}>{line}</li>
                ))}
            </motion.ul>
        </motion.div>
    );
}

export function PhoneClip({
    clip,
    width = PHONE_W,
    dark = false,
    eager = false,
    showCaption = true,
}: {
    clip: Clip;
    width?: string;
    dark?: boolean;
    eager?: boolean;
    showCaption?: boolean;
}) {
    return (
        <figure className="m-0 flex flex-col items-center">
            <div className={cn(width, "aspect-[393/852] bg-gray-100", dark ? FRAME_DARK : FRAME)}>
                <LazyVideo
                    src={clip.src}
                    poster={clip.poster}
                    label={clip.label}
                    eager={eager}
                    stillForReducedMotion
                    className="block h-full w-full object-cover"
                />
            </div>
            {showCaption && <Caption text={clip.caption} dark={dark} />}
        </figure>
    );
}

/**
 * Two or three phones side by side. On a phone they become one swipeable row
 * instead of a stack, so a pair of screens costs one screen of scroll, not two.
 * The row is a labelled, focusable region so it can be scrolled by keyboard.
 */
export function ShotRow({
    children,
    label,
    hint,
    gridFrom = "sm",
    cols = 2,
}: {
    children: ReactNode;
    label: string;
    hint?: string;
    gridFrom?: "sm" | "lg";
    cols?: 2 | 3;
}) {
    const grid =
        gridFrom === "sm"
            ? cn("sm:mx-0 sm:grid sm:gap-12 sm:overflow-visible sm:px-0 sm:pb-0", cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")
            : cn("lg:mx-0 lg:grid lg:gap-10 lg:overflow-visible lg:px-0 lg:pb-0", cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2");
    return (
        <div>
            <div
                role="region"
                aria-label={label}
                tabIndex={0}
                className={cn(
                    "-mx-6 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto px-6 pb-3 outline-none",
                    "focus-visible:ring-2 focus-visible:ring-ring",
                    "[&>*]:shrink-0 [&>*]:snap-center",
                    grid,
                )}
            >
                {children}
            </div>
            {hint && (
                <p className={cn("mt-2 text-center text-xs text-gray-500", gridFrom === "sm" ? "sm:hidden" : "lg:hidden")}>
                    {hint}
                </p>
            )}
        </div>
    );
}
