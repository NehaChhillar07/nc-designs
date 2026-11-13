"use client";

// Chapter 05. Two builds of the same card, side by side.
// - End-result first: flat, finished-looking, stamped "locked".
// - Base first: the card lifts apart into its three layers (title, body,
//   media) with redline labels, the way an exploded drawing shows a part.
// It plays by itself as it arrives; no controls. Reduced motion: it simply
// arrives already apart.

import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { EASE } from "@/components/home-v2/motion";
import { fcV2 } from "@/data/v2-flashcard-data";

import { Stamp } from "../cs-kit";
import { useTempo } from "./deck";

const { states, locked, layers, sample, mediaSlot } = fcV2.backwardsFirst;

// How far apart the plates spread.
const GAP = 104;
const CARD = "w-full rounded-[14px] border border-white/10 bg-[#1a1414] text-[#f2ece3]";

function Finished() {
    return (
        <div className={`${CARD} flex flex-col gap-3 p-4`}>
            <span className="v2-riso relative block h-28 overflow-hidden rounded-[8px]">
                <Image src={sample.image ?? ""} alt="" fill sizes="280px" className="object-cover" />
            </span>
            <p className="text-[17px] font-medium leading-snug">{sample.title}</p>
            <p className="line-clamp-3 text-[13px] leading-snug text-white/70">{sample.body}</p>
        </div>
    );
}

function Layer({ id }: { id: (typeof layers)[number] }) {
    if (id === "title") return <p className="text-[17px] font-medium leading-snug">{sample.title}</p>;
    if (id === "body") return <p className="line-clamp-4 text-[13px] leading-snug text-white/70">{sample.body}</p>;
    return (
        <span className="v2-riso relative -m-3 grid h-24 place-items-center overflow-hidden">
            <Image src={sample.image ?? ""} alt="" fill sizes="280px" className="object-cover" />
            <span className="v2-mono relative text-[11px] text-white/80">{mediaSlot.toLowerCase()}</span>
        </span>
    );
}

export function ExplodedCard() {
    const t = useTempo();
    const ref = useRef<HTMLDivElement>(null);
    const apart = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
    // Layers, top to bottom on the exploded drawing.
    const order = layers;

    return (
        <div ref={ref} className="grid gap-14 md:grid-cols-2 md:gap-10">
            {/* end-result first */}
            <figure>
                <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{states.endResultFirst.label.toLowerCase()}</p>
                <div className="relative mt-4 max-w-[17rem] opacity-80 grayscale-[0.4]">
                    <Finished />
                    <Stamp className="absolute -right-3 top-6 rotate-[10deg] text-[13px]">{locked}</Stamp>
                </div>
                <figcaption className="mt-5">
                    <p className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{states.endResultFirst.status.toLowerCase()}</p>
                    <p className="mt-1 text-[15px] leading-snug text-[var(--v2-muted)]">{states.endResultFirst.desc}</p>
                </figcaption>
            </figure>

            {/* base first: the exploded stack */}
            <figure>
                <p className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{states.baseFirst.label.toLowerCase()}</p>
                {/* Each layer is its own tilted plate; apart, they spread down the
                    drawing, and each label sits level with its plate's centre. */}
                <div className="relative mt-4 h-[20.5rem] max-w-[19rem]">
                    {order.map((id, i) => (
                        <motion.div
                            key={id}
                            initial={false}
                            animate={{ y: apart ? i * GAP : i * 6 }}
                            transition={{ duration: 0.9 * t, ease: EASE, delay: (0.2 + i * 0.12) * t }}
                            className="absolute inset-x-0 top-0 flex h-28 items-center"
                            style={{ zIndex: 3 - i }}
                        >
                            <div
                                className={`h-24 w-[13rem] overflow-hidden rounded-[14px] border border-white/10 bg-[#1a1414] p-3 text-[#f2ece3] shadow-[0_20px_30px_-18px_rgba(0,0,0,0.6)] [transform:perspective(900px)_rotateX(48deg)_rotateZ(-18deg)]`}
                            >
                                <Layer id={id} />
                            </div>
                            <motion.span
                                aria-hidden
                                initial={false}
                                animate={apart ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                                transition={{ duration: 0.4 * t, ease: EASE, delay: (0.9 + i * 0.12) * t }}
                                className="v2-mono ml-1 flex items-center gap-2 text-[11px] text-[var(--v2-redline)]"
                            >
                                <span className="h-px w-8 bg-[var(--v2-redline)]" />
                                {id}
                            </motion.span>
                        </motion.div>
                    ))}
                </div>
                <figcaption>
                    <p className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{states.baseFirst.status.toLowerCase()}</p>
                    <p className="mt-1 text-[15px] leading-snug text-[var(--v2-ink)]">{states.baseFirst.desc}</p>
                </figcaption>
            </figure>
        </div>
    );
}
