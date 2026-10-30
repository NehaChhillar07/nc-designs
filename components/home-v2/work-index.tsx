"use client";

import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCursor } from "@/components/ui/cursor-context";
import { homeV2Data, type WorkRow } from "@/data/home-v2-data";
import { cn } from "@/lib/utils";

import { GRID } from "./grid";
import { WorkSlot, useWorkRef } from "./desk";
import { DUR, EASE } from "./motion";
import { Spec } from "./spec-mode";

const { work } = homeV2Data;

// A typographic index of the work. On a fine pointer, hovering a row floats
// that project's image next to the cursor, so the visuals explain the work
// without making the list itself heavy. On touch, each row carries a small
// inline thumbnail instead.
export function WorkIndex() {
    const { setCursor, resetCursor } = useCursor();
    const workRef = useWorkRef();
    const [active, setActive] = useState<WorkRow | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 380, damping: 36, mass: 0.6 });
    const sy = useSpring(y, { stiffness: 380, damping: 36, mass: 0.6 });
    // The preview leans into the direction the cursor is moving, like a card
    // dragged across a table, and settles upright when the cursor stops.
    const rotate = useSpring(useTransform(useVelocity(sx), [-2000, 0, 2000], [-9, 0, 9], { clamp: true }), {
        stiffness: 200,
        damping: 20,
    });

    // Place the preview beside the cursor. When it's just appearing, jump the
    // springs there instead of letting them glide in from wherever they last
    // were (at first, the top-left corner).
    const place = (e: React.PointerEvent, appearing: boolean) => {
        x.set(e.clientX + 28);
        y.set(e.clientY - 120);
        if (appearing) {
            sx.jump(x.get());
            sy.jump(y.get());
        }
    };
    const onMove = (e: React.PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        place(e, false);
    };

    return (
        <section aria-labelledby="v2-work">
            <div className={GRID}>
                <Spec
                    as="h2"
                    id="v2-work"
                    name="display / section"
                    type
                    className="hidden md:block v2-display col-span-4 text-[44px] italic leading-none text-[var(--v2-oxblood)] md:col-span-2 md:text-[56px]"
                >
                    {work.heading}
                </Spec>

                <ol
                    ref={(el) => {
                        workRef.current = el;
                    }}
                    className="col-span-4 border-t border-[var(--v2-rule)] md:col-span-10 md:mt-3"
                    onPointerMove={onMove}
                    onPointerLeave={() => {
                        setActive(null);
                        resetCursor();
                    }}
                >
                    {work.rows.map((row, i) => {
                        const featured = row.tier === "featured";
                        const firstMore = !featured && work.rows[i - 1]?.tier === "featured";
                        return (
                            // No scroll reveal here: the pieces flying into their
                            // slots are this list's entrance.
                            // Phones show the featured work in the deck above, so the
                            // list only carries the rest: nothing appears twice.
                            <li key={row.id} className={cn("border-b border-[var(--v2-rule)]", featured && "hidden md:block")}>
                                {firstMore && (
                                    <p className="v2-mono pb-2 text-[11px] text-[var(--v2-muted)] md:pt-14">{work.moreHeading}</p>
                                )}
                                <Link
                                    href={row.href}
                                    onPointerEnter={(e) => {
                                        if (e.pointerType !== "mouse") return;
                                        // Also fires when scrolling slides a row under a still
                                        // cursor, with no pointermove, so position here too.
                                        place(e, active === null);
                                        setActive(row);
                                        setCursor("tag", `${work.cursorPrefix} · ${row.readingTime}`);
                                    }}
                                    onFocus={() => setActive(null)}
                                    className={cn(
                                        "group grid items-center gap-x-4 lg:gap-x-6",
                                        featured
                                            ? "grid-cols-[6.5rem_1fr] py-6 lg:grid-cols-[10.5rem_2.5rem_21rem_1fr_6rem_4.5rem] lg:py-7"
                                            : "grid-cols-[3.5rem_1fr] py-3 lg:grid-cols-[4.5rem_2.5rem_21rem_1fr_6rem_4.5rem] lg:py-3",
                                        "transition-opacity duration-300",
                                        active && active.id !== row.id && "lg:opacity-35",
                                    )}
                                >
                                    {/* Where this project's print lands when the desk is tidied. */}
                                    <span className="row-span-3 self-start lg:row-span-1 lg:self-center">
                                        <WorkSlot row={row} index={i} />
                                    </span>

                                    {/* On hover the number rolls up and an arrow rolls in where it was. */}
                                    <span className="v2-mono relative hidden h-[14px] overflow-hidden text-[11px] leading-[14px] lg:block">
                                        <span className="v2-row-num block text-[var(--v2-muted)]">{String(i + 1).padStart(2, "0")}</span>
                                        <span aria-hidden className="v2-row-arrow absolute inset-0 text-[13px] text-[var(--v2-oxblood)]">
                                            →
                                        </span>
                                    </span>

                                    <Spec
                                        as="span"
                                        name={featured ? "row / featured title" : "row / title"}
                                        type={i === 0 || firstMore}
                                        className={cn(
                                            "v2-display v2-row-title leading-none text-[var(--v2-ink)] group-hover:text-[var(--v2-oxblood)]",
                                            featured ? "text-[32px] lg:whitespace-nowrap md:text-[44px]" : "whitespace-nowrap text-[24px] md:text-[28px]",
                                        )}
                                    >
                                        {row.name}
                                    </Spec>

                                    <span
                                        className={cn(
                                            "mt-1 leading-snug lg:mt-0",
                                            // Phones only list "more work": name, status and year are enough.
                                            !featured && "hidden md:block",
                                            featured ? "text-[15px] text-[var(--v2-ink)] lg:text-[17px]" : "text-[14px] text-[var(--v2-muted)] lg:text-[15px]",
                                        )}
                                    >
                                        {row.outcome}
                                        {featured && (
                                            <span className="v2-mono mt-1.5 block text-[11px] text-[var(--v2-muted)]">
                                                {row.readingTime} {work.cursorPrefix}
                                            </span>
                                        )}
                                    </span>

                                    <span className="v2-mono mt-2 text-[11px] text-[var(--v2-oxblood)] lg:mt-0">
                                        <span className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-current align-middle" />
                                        {work.statusLabels[row.status]}
                                        <span className="ml-3 text-[var(--v2-muted)] lg:hidden">{row.year}</span>
                                    </span>

                                    <span className="v2-mono hidden text-right text-[11px] text-[var(--v2-muted)] lg:block">{row.year}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ol>
            </div>

            {/* Floating preview. Fixed, so it follows the cursor in viewport
                space; decorative, so it's hidden from assistive tech.
                sizes="520px" asks for a 2x image, so the 260px preview is sharp
                on retina screens. */}
            <motion.div
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-20 hidden aspect-square w-[260px] lg:block"
                style={{ x: sx, y: sy, rotate }}
                initial={false}
                // Opens like a window from its center rather than just fading.
                animate={
                    active
                        ? { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }
                        : { opacity: 0, scale: 0.92, clipPath: "inset(14% 14% 14% 14%)" }
                }
                transition={{ duration: DUR.fast * 1.6, ease: EASE }}
            >
                {work.rows.map((row) => (
                    <Image
                        key={row.id}
                        src={row.thumb}
                        alt=""
                        width={520}
                        height={520}
                        sizes="520px"
                        loading="eager"
                        className={cn(
                            "absolute left-0 top-0 aspect-square w-full object-cover transition-opacity duration-200",
                            active?.id === row.id ? "opacity-100" : "opacity-0",
                        )}
                    />
                ))}
            </motion.div>
        </section>
    );
}
