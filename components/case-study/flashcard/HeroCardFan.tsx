"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type CardSeed =
    | {
          type: "learning";
          front: string;
          back?: string;
          packLabel?: string;
          image?: string;
      }
    | {
          type: "quiz";
          question: string;
          options?: ReadonlyArray<{ text: string; correct: boolean }>;
          explanation?: string;
          packLabel?: string;
          image?: string;
      };

const MAX_TILT_DEG = 6;
const FRONT_HOLD_MS = 900;
const BACK_HOLD_MS = 900;
const EXIT_DURATION_MS = 500;
const EXIT_DURATION_S = EXIT_DURATION_MS / 1000;
const FLIP_DURATION_S = 0.35;
const SETTLE_DURATION_S = 0.38;

type Phase = "front" | "back" | "exiting";

function getCardFrontText(card: CardSeed): string {
    return card.type === "quiz" ? card.question : card.front;
}

function getCardBackText(card: CardSeed): string {
    if (card.type === "learning") return card.back ?? "";
    const correct = card.options?.find((o) => o.correct);
    return correct?.text ?? card.explanation ?? "";
}

// Coarse-pointer detection — no tilt parallax on touch devices.
function subscribeCoarsePointer(callback: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    const mq = window.matchMedia("(pointer: coarse)");
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
}
function getCoarsePointerSnapshot(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
}
function getCoarsePointerServerSnapshot(): boolean {
    return false;
}

// Position 0 = front, 1 = middle, 2 = back. Visuals match the original fan.
const POSITION_VISUALS = [
    { z: 3, rotate: 4, x: 12, y: 0, opacity: 1 },
    { z: 2, rotate: 0, x: 0, y: 10, opacity: 0.85 },
    { z: 1, rotate: -4, x: -12, y: 20, opacity: 0.7 },
] as const;

export function HeroCardFan({ cards }: { cards: readonly CardSeed[] }) {
    const reduce = useReducedMotion();
    const wrapRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [frontIdx, setFrontIdx] = useState(0);
    const [phase, setPhase] = useState<Phase>("front");
    const [paused, setPaused] = useState(false);
    const isCoarse = useSyncExternalStore(
        subscribeCoarsePointer,
        getCoarsePointerSnapshot,
        getCoarsePointerServerSnapshot,
    );

    const disableParallax = reduce || isCoarse;
    const fanCards = cards.slice(0, 3);
    const total = fanCards.length;
    const flipped = phase === "back";
    // Other cards anticipate the upcoming index while the current front card exits.
    const visualFrontIdx = phase === "exiting" ? (frontIdx + 1) % total : frontIdx;
    const exitingCardIdx = phase === "exiting" ? frontIdx : -1;

    // Auto-cycle: front → flip to back → exit (tilt right, slide to back of deck) → next card.
    // Hover pauses; reduced-motion users see a static stack.
    useEffect(() => {
        if (reduce || paused || total === 0) return;
        const duration =
            phase === "front"
                ? FRONT_HOLD_MS
                : phase === "back"
                  ? BACK_HOLD_MS
                  : EXIT_DURATION_MS;
        const timer = window.setTimeout(() => {
            if (phase === "front") setPhase("back");
            else if (phase === "back") setPhase("exiting");
            else {
                if (total > 1) setFrontIdx((i) => (i + 1) % total);
                setPhase("front");
            }
        }, duration);
        return () => window.clearTimeout(timer);
    }, [phase, paused, reduce, total]);

    function onMove(e: React.MouseEvent<HTMLDivElement>) {
        if (disableParallax || !wrapRef.current) return;
        const rect = wrapRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: py * -MAX_TILT_DEG, y: px * MAX_TILT_DEG });
    }
    function onEnter() {
        setPaused(true);
    }
    function onLeave() {
        setTilt({ x: 0, y: 0 });
        setPaused(false);
    }

    return (
        <div
            ref={wrapRef}
            onMouseMove={onMove}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative mx-auto"
            style={{
                perspective: "1200px",
                width: "min(100%, 360px)",
                height: 320,
            }}
            aria-label="Auto-cycling flashcard preview"
            role="img"
        >
            {fanCards.map((card, i) => {
                const isExiting = i === exitingCardIdx;
                const position = (i - visualFrontIdx + total) % total;
                const visual = POSITION_VISUALS[position];
                const isFront = !isExiting && position === 0;
                // Exiting card: tilt right and slide back into the deck.
                const exitAnimate = {
                    opacity: [1, 0.95, 0.7],
                    rotate: [4, 22, -4],
                    x: [12, 95, -12],
                    y: [0, -4, 20],
                    rotateX: 0,
                    rotateY: 0,
                };
                return (
                    <motion.div
                        key={i}
                        // Unconditional initial. useReducedMotion() is false during
                        // SSR and true on the client for a user with the OS setting
                        // on, so branching this on `reduce` made the server emit
                        // opacity:0/translateY(30px) and the client opacity:1/
                        // translateX(12px) rotate(4deg) — a hydration mismatch on
                        // the homepage. Reduced motion is honoured by collapsing the
                        // transition to 0 below, so the fan lands on its resting
                        // state instantly instead of animating in.
                        initial={{
                            opacity: 0,
                            rotate: 0,
                            x: 0,
                            y: 30,
                        }}
                        animate={
                            isExiting
                                ? exitAnimate
                                : {
                                    opacity: visual.opacity,
                                    rotate: visual.rotate,
                                    x: visual.x,
                                    y: visual.y,
                                    rotateX: isFront && !disableParallax ? tilt.x : 0,
                                    rotateY: isFront && !disableParallax ? tilt.y : 0,
                                }
                        }
                        transition={
                            isExiting
                                ? {
                                    duration: reduce ? 0 : EXIT_DURATION_S,
                                    ease: [0.25, 0.1, 0.25, 1],
                                    times: [0, 0.45, 1],
                                }
                                : {
                                    duration: reduce ? 0 : SETTLE_DURATION_S,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }
                        }
                        style={{
                            position: "absolute",
                            inset: 0,
                            margin: "auto",
                            width: "calc(100% - 24px)",
                            height: 260,
                            // Exiting card drops behind the others as it slides.
                            zIndex: isExiting ? 0 : visual.z,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {isFront || isExiting ? (
                            <FlipCard card={card} flipped={flipped} reduce={reduce ?? false} />
                        ) : (
                            <StaticCardBack card={card} />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}

function FlipCard({
    card,
    flipped,
    reduce,
}: {
    card: CardSeed;
    flipped: boolean;
    reduce: boolean;
}) {
    return (
        <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{
                duration: reduce ? 0 : FLIP_DURATION_S,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                }}
            >
                <CardFace card={card} side="front" />
            </div>
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                }}
            >
                <CardFace card={card} side="back" />
            </div>
        </motion.div>
    );
}

function StaticCardBack({ card }: { card: CardSeed }) {
    return (
        <div
            className="w-full h-full rounded-2xl p-5 text-white relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                boxShadow:
                    "0 16px 50px -16px rgba(17, 24, 39, 0.55), 0 30px 70px -30px rgba(17, 24, 39, 0.35)",
                opacity: 0.85,
            }}
        >
            <div className="flex items-center justify-between mb-3">
                <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 tracking-wide">
                    {card.type === "quiz" ? "Quiz" : "Learning"}
                </span>
            </div>
            <div className="space-y-2 opacity-40">
                <div className="h-2 rounded bg-white/20 w-3/4" />
                <div className="h-2 rounded bg-white/20 w-1/2" />
            </div>
        </div>
    );
}

function CardFace({ card, side }: { card: CardSeed; side: "front" | "back" }) {
    const text = side === "front" ? getCardFrontText(card) : getCardBackText(card);
    const background =
        side === "back"
            ? "linear-gradient(135deg, #064e3b 0%, #022c22 100%)"
            : "linear-gradient(135deg, #1f2937 0%, #111827 100%)";
    const showImage = side === "front" && Boolean(card.image);
    return (
        <div
            className="w-full h-full rounded-2xl text-white relative overflow-hidden flex flex-col"
            style={{
                background,
                boxShadow:
                    "0 16px 50px -16px rgba(17, 24, 39, 0.55), 0 30px 70px -30px rgba(17, 24, 39, 0.35)",
            }}
        >
            <div className="flex items-center justify-between mb-2 px-5 pt-4">
                <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 tracking-wide">
                    {card.type === "quiz" ? "Quiz" : "Learning"}
                </span>
                <span className="text-[10px] text-white/50 tracking-[0.18em] uppercase">
                    {side}
                </span>
            </div>

            {showImage && card.image && (
                <div
                    className="relative mx-5 mb-3 rounded-xl overflow-hidden"
                    style={{ aspectRatio: "16/9" }}
                >
                    <Image
                        src={card.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="360px"
                        unoptimized
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)",
                        }}
                    />
                </div>
            )}

            <div className="px-5 pb-4 flex-1 flex flex-col justify-between">
                <p className="text-sm md:text-base font-medium leading-snug pr-2">
                    {text}
                </p>
                {card.packLabel && (
                    <p className="text-[10px] text-white/40 tracking-wide mt-2">
                        {card.packLabel}
                    </p>
                )}
            </div>
        </div>
    );
}
