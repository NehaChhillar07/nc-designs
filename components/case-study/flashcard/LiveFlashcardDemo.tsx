"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    motion,
    AnimatePresence,
    useReducedMotion,
    type PanInfo,
} from "motion/react";
import { ChevronLeft, ChevronRight, Check, X, RotateCcw, Pointer } from "lucide-react";

type LearningCard = {
    type: "learning";
    front: string;
    back: string;
    packLabel?: string;
    image?: string;
};

type QuizCard = {
    type: "quiz";
    question: string;
    options: ReadonlyArray<{ text: string; correct: boolean }>;
    explanation: string;
    packLabel?: string;
    image?: string;
};

export type DemoCard = LearningCard | QuizCard;

const SWIPE_THRESHOLD = 90;
const VELOCITY_THRESHOLD = 600;
const CARD_HEIGHT = 520;
const STACK_OFFSET = 16; // px each card behind peeks out
const STACK_SCALE = 0.05; // scale step per card behind
const STACK_DEPTH = 2; // how many cards visible behind the top one

export function LiveFlashcardDemo({
    cards,
    caption,
}: {
    cards: readonly DemoCard[];
    caption?: string;
}) {
    const reduce = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [flipped, setFlipped] = useState(false); // learning card front/back
    const [picked, setPicked] = useState<number | null>(null); // quiz answer
    const total = cards.length;
    const rootRef = useRef<HTMLDivElement>(null);

    const card = cards[index];

    const next = useCallback(() => {
        if (index >= total - 1) return;
        setDirection(1);
        setFlipped(false);
        setPicked(null);
        setIndex((i) => i + 1);
    }, [index, total]);

    const prev = useCallback(() => {
        if (index <= 0) return;
        setDirection(-1);
        setFlipped(false);
        setPicked(null);
        setIndex((i) => i - 1);
    }, [index]);

    const reset = useCallback(() => {
        setDirection(1);
        setFlipped(false);
        setPicked(null);
        setIndex(0);
    }, []);

    // Keyboard
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (!rootRef.current) return;
            // Only respond if the demo is focused or focus is inside it
            const active = document.activeElement;
            if (!active || !rootRef.current.contains(active)) return;
            if (e.key === "ArrowRight") {
                e.preventDefault();
                next();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                prev();
            }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [next, prev]);

    function onDragEnd(_: unknown, info: PanInfo) {
        const off = info.offset.x;
        const vel = info.velocity.x;
        if (off < -SWIPE_THRESHOLD || vel < -VELOCITY_THRESHOLD) next();
        else if (off > SWIPE_THRESHOLD || vel > VELOCITY_THRESHOLD) prev();
    }

    // Cards waiting behind the top one, nearest first
    const behind = [];
    for (let depth = 1; depth <= STACK_DEPTH; depth++) {
        if (index + depth < total) behind.push(index + depth);
    }

    return (
        <div ref={rootRef} className="my-10" tabIndex={-1}>
            {/* Card stack frame — extra height so cards behind peek out below */}
            <div
                className="relative mx-auto"
                style={{
                    width: "min(100%, 420px)",
                    height: CARD_HEIGHT + STACK_OFFSET * STACK_DEPTH,
                }}
            >
                {/* Stack: upcoming cards peeking out behind, farthest rendered first */}
                {[...behind].reverse().map((i) => {
                    const depth = i - index;
                    return (
                        <motion.div
                            key={i}
                            initial={false}
                            animate={{
                                y: depth * STACK_OFFSET,
                                scale: 1 - depth * STACK_SCALE,
                                opacity: 1 - depth * 0.25,
                            }}
                            transition={{
                                duration: reduce ? 0 : 0.4,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="absolute inset-x-0 top-0 pointer-events-none"
                            style={{ height: CARD_HEIGHT, transformOrigin: "bottom center" }}
                            aria-hidden
                        >
                            <CardFace
                                card={cards[i]}
                                index={i}
                                total={total}
                                flipped={false}
                                onFlip={() => {}}
                                picked={null}
                                onPick={() => {}}
                                reduce={reduce ?? false}
                                preview
                            />
                        </motion.div>
                    );
                })}

                {/* Top card — draggable */}
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={index}
                        custom={direction}
                        // None of these props may branch on `reduce`: it is false
                        // during SSR and true on the client for a reduced-motion
                        // user, so the server emitted drag's touch-action/
                        // user-select/draggable and a different initial style than
                        // the client rendered — a hydration mismatch. Dragging is
                        // direct manipulation, not auto-playing motion, so it stays
                        // enabled; the animation itself is already neutralised by
                        // MotionConfig reducedMotion="user" plus the 0s duration
                        // below.
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.6}
                        onDragEnd={onDragEnd}
                        whileDrag={{ rotate: 3, cursor: "grabbing" }}
                        initial={
                            direction === 1
                                ? {
                                    // promoted from the stack behind
                                    y: STACK_OFFSET,
                                    scale: 1 - STACK_SCALE,
                                    opacity: 0.75,
                                    x: 0,
                                    rotate: 0,
                                }
                                : { x: -440, opacity: 0, rotate: -10, y: 0, scale: 1 }
                        }
                        animate={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
                        exit={
                            direction === 1
                                ? // thrown off to the side
                                { x: -440, opacity: 0, rotate: -12 }
                                : // tucked back into the stack
                                { y: STACK_OFFSET, scale: 1 - STACK_SCALE, opacity: 0 }
                        }
                        transition={{
                            duration: reduce ? 0 : 0.4,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="absolute inset-x-0 top-0 cursor-grab active:cursor-grabbing"
                        style={{ height: CARD_HEIGHT, transformOrigin: "bottom center" }}
                        role="group"
                        aria-roledescription="flashcard"
                        aria-label={`Card ${index + 1} of ${total}`}
                    >
                        <CardFace
                            card={card}
                            index={index}
                            total={total}
                            flipped={flipped}
                            onFlip={() => setFlipped((f) => !f)}
                            picked={picked}
                            onPick={(i) => setPicked(i)}
                            reduce={reduce ?? false}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-5 flex items-center justify-between gap-4 max-w-[420px] mx-auto">
                <button
                    onClick={prev}
                    disabled={index === 0}
                    aria-label="Previous card"
                    className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                    <ChevronLeft className="w-4 h-4 text-gray-700" aria-hidden />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-1.5" aria-hidden>
                    {cards.map((_, i) => (
                        <span
                            key={i}
                            className={`h-1.5 rounded-full transition-all ${
                                i === index
                                    ? "w-6 bg-gray-900"
                                    : "w-1.5 bg-gray-300"
                            }`}
                        />
                    ))}
                </div>

                {index === total - 1 ? (
                    <button
                        onClick={reset}
                        aria-label="Reset to first card"
                        className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                        <RotateCcw className="w-4 h-4 text-gray-700" aria-hidden />
                    </button>
                ) : (
                    <button
                        onClick={next}
                        aria-label="Next card"
                        className="w-10 h-10 rounded-full bg-gray-900 text-white hover:bg-gray-800 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                        <ChevronRight className="w-4 h-4" aria-hidden />
                    </button>
                )}
            </div>

            {caption && (
                <p className="text-xs text-gray-400 mt-4 text-center italic">
                    {caption}
                </p>
            )}
        </div>
    );
}

function CardFace({
    card,
    index,
    total,
    flipped,
    onFlip,
    picked,
    onPick,
    reduce,
    preview = false,
}: {
    card: DemoCard;
    index: number;
    total: number;
    flipped: boolean;
    onFlip: () => void;
    picked: number | null;
    onPick: (i: number) => void;
    reduce: boolean;
    preview?: boolean;
}) {
    return (
        <div
            className="w-full h-full rounded-2xl p-6 pb-12 text-white relative overflow-hidden select-none flex flex-col"
            style={{
                background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                boxShadow:
                    "0 20px 60px -16px rgba(17, 24, 39, 0.6), 0 30px 80px -30px rgba(17, 24, 39, 0.35)",
            }}
        >
            <div className="flex items-center justify-between mb-4">
                <span className="inline-block text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/10 tracking-wide">
                    {card.type === "quiz" ? "Quiz" : "Learning"}
                </span>
                <span className="text-[11px] text-white/60 tabular-nums">
                    {index + 1} / {total}
                </span>
            </div>

            {card.image && (
                <div
                    className={`relative w-full rounded-xl overflow-hidden mb-4 ${
                        card.type === "learning"
                            ? "flex-1 min-h-0" // learning cards: image fills the spare height
                            : "h-32 flex-shrink-0"
                    }`}
                >
                    <Image
                        src={card.image}
                        alt=""
                        fill
                        sizes="420px"
                        className="object-cover pointer-events-none"
                        draggable={false}
                        priority={!preview && index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                </div>
            )}

            {card.type === "learning" ? (
                <button
                    type="button"
                    onClick={onFlip}
                    disabled={preview}
                    className={`w-full text-left flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg ${
                        card.image ? "" : "flex-1 min-h-0"
                    }`}
                    aria-label={flipped ? "Show front of card" : "Show back of card"}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={flipped ? "back" : "front"}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                            className={card.image ? "" : "flex-1"}
                        >
                            {flipped ? (
                                <p className="text-sm text-white/80 leading-relaxed">
                                    {card.back}
                                </p>
                            ) : (
                                <p className="text-lg font-medium leading-snug">
                                    {card.front}
                                </p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                    <motion.span
                        // `preview` is a prop, identical on server and client, so it
                        // may decide the rendered props. `reduce` may not — it is
                        // false during SSR and true on the client, and swapping
                        // animate between keyframes and undefined changed the
                        // emitted style. The keyframes stay; reduced motion kills
                        // the infinite pulse through the transition instead, which
                        // settles it on its resting 0.65 opacity immediately.
                        animate={
                            preview
                                ? undefined
                                : { opacity: [0.65, 1, 0.65], scale: [1, 1.03, 1] }
                        }
                        transition={{
                            duration: reduce ? 0 : 2,
                            repeat: reduce ? 0 : Infinity,
                            ease: "easeInOut",
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-[11px] font-medium text-white tracking-wide"
                    >
                        <Pointer className="w-3 h-3" aria-hidden />
                        {flipped ? "Tap to flip back" : "Tap to reveal"}
                    </motion.span>
                </button>
            ) : (
                <div className="flex-1 min-h-0 flex flex-col">
                    <p className="text-base font-medium leading-snug mb-4">
                        {card.question}
                    </p>
                    <div className="flex-1 space-y-2">
                        {card.options.map((opt, i) => {
                            const isPicked = picked === i;
                            const showResult = picked !== null;
                            const isCorrect = opt.correct;
                            const stateClass = !showResult
                                ? "bg-white/5 hover:bg-white/10 border-white/10"
                                : isPicked && isCorrect
                                    ? "bg-emerald-500/20 border-emerald-400/60"
                                    : isPicked && !isCorrect
                                        ? "bg-red-500/20 border-red-400/60"
                                        : !isPicked && isCorrect
                                            ? "bg-emerald-500/10 border-emerald-400/30"
                                            : "bg-white/5 border-white/10 opacity-60";
                            return (
                                <button
                                    key={i}
                                    onClick={() => picked === null && onPick(i)}
                                    disabled={preview || picked !== null}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm leading-snug transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${stateClass}`}
                                >
                                    <span className="flex items-start gap-2">
                                        {showResult && (
                                            <span className="mt-0.5 flex-shrink-0">
                                                {isCorrect ? (
                                                    <Check
                                                        className="w-3.5 h-3.5 text-emerald-300"
                                                        strokeWidth={3}
                                                        aria-hidden
                                                    />
                                                ) : isPicked ? (
                                                    <X
                                                        className="w-3.5 h-3.5 text-red-300"
                                                        strokeWidth={3}
                                                        aria-hidden
                                                    />
                                                ) : (
                                                    <span className="w-3.5 h-3.5 inline-block" />
                                                )}
                                            </span>
                                        )}
                                        <span>{opt.text}</span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    {picked !== null && (
                        <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 text-[11px] text-white/60 leading-relaxed"
                        >
                            {card.explanation}
                        </motion.p>
                    )}
                </div>
            )}

            {card.packLabel && (
                <p className="absolute bottom-4 left-6 text-[10px] text-white/40 tracking-wide">
                    {card.packLabel}
                </p>
            )}
        </div>
    );
}
