"use client";

// The deck: the product's own gestures, used to tell its story.
// - SwipeDeck: a physics swipe. The card rotates with drag distance, a throw
//   respects flick velocity, and anything short of the threshold springs back.
//   Every gesture also has a key (← → space) and a 44px button.
// - FlipCard: rotateY with both faces in the server markup; the hidden face
//   is aria-hidden and inert.
// - Tempo: the 0.5× switch. Components read useTempo() and stretch their
//   timing, so one switch slows every card on the page.
// Phones: horizontal drags only (touch-action: pan-y), so the page still
// scrolls under a thumb. Reduced motion: MotionConfig (app/layout.tsx) drops
// the transforms, so throws and flips land in place.

import { animate, motion, motionValue, useReducedMotion, useTransform, type MotionValue, type PanInfo } from "motion/react";
import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

import { EASE } from "@/components/home-v2/motion";
import { useSpecMode } from "@/components/home-v2/spec-mode";
import { fcV2, type DeckCard } from "@/data/v2-flashcard-data";
import { cn } from "@/lib/utils";

// ---------- the numbers (also printed on the craft sheet) ----------

export const SWIPE = { offset: 90, velocity: 600, maxTilt: 14 } as const;
export const FLIP = { duration: 0.6 } as const;
export const DEAL = { stagger: 0.08, duration: 0.5 } as const;
const STACK = { offset: 14, scale: 0.05, depth: 2 } as const;
const OFF = 560; // how far a thrown card travels

// ---------- tempo ----------

const TempoContext = createContext<{ slow: boolean; toggle: () => void }>({ slow: false, toggle: () => {} });

export function TempoProvider({ children }: { children: ReactNode }) {
    const [slow, setSlow] = useState(false);
    const toggle = useCallback(() => setSlow((s) => !s), []);
    return <TempoContext.Provider value={{ slow, toggle }}>{children}</TempoContext.Provider>;
}

/** 1 at normal speed, 2 in slow-mo: multiply durations by it. */
export function useTempo() {
    return useContext(TempoContext).slow ? 2 : 1;
}

/** A spring stretched in time by t, with the same feel (damping ratio). */
export function springT(t: number, stiffness = 320, damping = 30) {
    return { type: "spring" as const, stiffness: stiffness / (t * t), damping: damping / t };
}

export function SlowMoSwitch({ label, className }: { label: string; className?: string }) {
    const { slow, toggle } = useContext(TempoContext);
    return (
        <button
            type="button"
            role="switch"
            aria-checked={slow}
            onClick={toggle}
            className={cn("v2-mono inline-flex min-h-11 items-center gap-2 text-[12px]", className)}
        >
            <span aria-hidden className={cn("relative h-4 w-7 rounded-full border transition-colors", slow ? "border-current bg-current" : "border-current")}>
                <span
                    className={cn(
                        "absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-[left,background-color] duration-200",
                        slow ? "left-[13px] bg-[var(--fc-switch-knob,#f7f3ec)]" : "left-[2px] bg-current",
                    )}
                />
            </span>
            {label}
        </button>
    );
}

// ---------- flip ----------

export function FlipCard({
    flipped,
    front,
    back,
    className,
}: {
    flipped: boolean;
    front: ReactNode;
    back: ReactNode;
    className?: string;
}) {
    const t = useTempo();
    return (
        <div className={cn("relative [perspective:1400px]", className)}>
            <motion.div
                className="relative h-full w-full [transform-style:preserve-3d]"
                initial={false}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: FLIP.duration * t, ease: EASE }}
            >
                <div aria-hidden={flipped} inert={flipped} className="absolute inset-0 [backface-visibility:hidden]">
                    {front}
                </div>
                <div aria-hidden={!flipped} inert={!flipped} className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    {back}
                </div>
            </motion.div>
        </div>
    );
}

// ---------- faces ----------

// The learner surface: dark, calm, one card at a time.
const SHELL =
    "relative flex h-full w-full select-none flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(160deg,#241a1a_0%,#120d0d_100%)] p-5 text-[#f2ece3] shadow-[0_28px_60px_-28px_rgba(10,4,4,0.85)]";

function Tag({ children }: { children: ReactNode }) {
    return <span className="v2-mono rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] uppercase tracking-[0.06em]">{children}</span>;
}

function Head({ tag, n, total }: { tag: string; n: number; total: number }) {
    return (
        <div className="flex items-center justify-between">
            <Tag>{tag}</Tag>
            <span className="v2-mono text-[11px] tabular-nums text-white/60">
                {n} / {total}
            </span>
        </div>
    );
}

// A stock photo printed in two inks, so it sits on the paper and the dark card alike.
function Riso({ src, alt, sizes, priority }: { src: string; alt: string; sizes: string; priority?: boolean }) {
    return (
        <span className="v2-riso relative block h-full w-full overflow-hidden rounded-[10px]">
            <Image src={src} alt={alt} fill sizes={sizes} priority={priority} draggable={false} className="pointer-events-none object-cover" />
        </span>
    );
}

// The real cover card, cut out of the live-product screenshot.
export function CoverFace({ className, priority }: { className?: string; priority?: boolean }) {
    const { cover } = fcV2;
    const { crop } = cover;
    return (
        <div className={cn("relative h-full w-full overflow-hidden rounded-[18px] bg-[#0b0b0b] shadow-[0_28px_60px_-28px_rgba(10,4,4,0.85)]", className)}>
            <Image
                src={cover.src}
                alt={cover.alt}
                width={cover.w}
                height={cover.h}
                sizes="(min-width: 768px) 900px, 240vw"
                priority={priority}
                draggable={false}
                className="pointer-events-none absolute max-w-none select-none"
                style={{
                    width: `${10000 / crop.w}%`,
                    height: `${10000 / crop.h}%`,
                    left: `${(-crop.x / crop.w) * 100}%`,
                    top: `${(-crop.y / crop.h) * 100}%`,
                }}
            />
        </div>
    );
}

function LearnFront({ card, n, total, priority }: { card: Extract<DeckCard, { kind: "learn" }>; n: number; total: number; priority?: boolean }) {
    return (
        <div className={SHELL}>
            <Head tag={card.tag} n={n} total={total} />
            {card.image && (
                <div className="mt-4 min-h-0 flex-1">
                    <Riso src={card.image} alt={card.alt ?? ""} sizes="360px" priority={priority} />
                </div>
            )}
            <p className={cn("mt-4 text-[19px] font-medium leading-snug", !card.image && "flex-1")}>{card.front}</p>
            <p className="v2-mono mt-3 flex items-center justify-between text-[11px] text-white/55">
                <span>{card.pack}</span>
                <span>tap to flip ↻</span>
            </p>
        </div>
    );
}

function LearnBack({ card, n, total }: { card: Extract<DeckCard, { kind: "learn" }>; n: number; total: number }) {
    return (
        <div className={SHELL}>
            <Head tag={card.tag} n={n} total={total} />
            <p className="mt-6 flex-1 text-[17px] leading-[1.55] text-white/85">{card.back}</p>
            <p className="v2-mono flex items-center justify-between text-[11px] text-white/55">
                <span>{card.pack}</span>
                <span>tap to flip back ↺</span>
            </p>
        </div>
    );
}

function QuizFace({
    card,
    n,
    total,
    picked,
    onPick,
    live,
}: {
    card: Extract<DeckCard, { kind: "quiz" }>;
    n: number;
    total: number;
    picked: number | null;
    onPick: (i: number) => void;
    live: boolean;
}) {
    const answered = picked !== null;
    return (
        <div className={SHELL}>
            <Head tag={card.tag} n={n} total={total} />
            <p className="mt-4 text-[16px] font-medium leading-snug">{card.question}</p>
            <div className="mt-3 flex-1 space-y-2">
                {card.options.map((o, i) => {
                    const mine = picked === i;
                    return (
                        <button
                            key={o.text}
                            type="button"
                            disabled={!live || answered}
                            onPointerDownCapture={(e) => e.stopPropagation()}
                            onClick={() => onPick(i)}
                            className={cn(
                                "flex min-h-11 w-full items-start gap-2 rounded-[10px] border px-3 py-2 text-left text-[14px] leading-snug transition-colors",
                                !answered && "border-white/15 bg-white/[0.04] hover:bg-white/[0.09]",
                                answered && o.correct && "border-[#e2b98a] bg-[#e2b98a]/15 text-white",
                                answered && !o.correct && mine && "border-white/30 text-white/70 line-through decoration-white/50",
                                answered && !o.correct && !mine && "border-white/10 text-white/45",
                            )}
                        >
                            <span aria-hidden className="v2-mono w-3 shrink-0 text-[12px] leading-[1.6]">
                                {answered ? (o.correct ? "✓" : mine ? "×" : "") : ""}
                            </span>
                            <span>
                                {o.text}
                                {answered && mine && <span className="sr-only">{o.correct ? " (correct)" : " (not quite)"}</span>}
                            </span>
                        </button>
                    );
                })}
            </div>
            <p aria-live="polite" className="mt-2 min-h-[2.6em] text-[12px] leading-snug text-white/70">
                {answered ? card.explanation : ""}
            </p>
        </div>
    );
}

// A confession: its label and mood, the sentence, and one warm reaction you
// can give from inside the card (a small pop, not a full-screen spray).
function NoteFace({ card, live }: { card: Extract<DeckCard, { kind: "note" }>; live: boolean }) {
    const [felt, setFelt] = useState(false);
    return (
        <div className={SHELL}>
            <div className="flex items-center justify-between gap-2">
                <Tag>{card.tag}</Tag>
                <span className="v2-mono text-[11px] text-white/60">{card.mood}</span>
            </div>
            <p className="v2-display mt-6 flex-1 text-[26px] leading-[1.2]">{card.text}</p>
            <button
                type="button"
                disabled={!live}
                aria-pressed={felt}
                onPointerDownCapture={(e) => e.stopPropagation()}
                onClick={() => setFelt((f) => !f)}
                className={cn(
                    "relative flex min-h-11 items-center justify-center gap-2 rounded-[12px] border text-[14px] transition-colors",
                    felt ? "border-[#e2b98a] bg-[#e2b98a]/15 text-white" : "border-white/15 bg-white/[0.05] text-white/85 hover:bg-white/[0.1]",
                )}
            >
                <motion.span aria-hidden animate={felt ? { scale: [1, 1.5, 1] } : { scale: 1 }} transition={{ duration: 0.4 }}>
                    {felt ? "♥" : "♡"}
                </motion.span>
                {card.reaction}
                {felt &&
                    [0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            aria-hidden
                            className="pointer-events-none absolute text-[13px] text-[#e2b98a]"
                            initial={{ opacity: 1, y: 0, x: (i - 1) * 14 }}
                            animate={{ opacity: 0, y: -46 - i * 8 }}
                            transition={{ duration: 0.9, delay: i * 0.08 }}
                        >
                            ♥
                        </motion.span>
                    ))}
            </button>
        </div>
    );
}

function Face({
    card,
    n,
    total,
    flipped,
    picked,
    onPick,
    live,
    priority,
}: {
    card: DeckCard;
    n: number;
    total: number;
    flipped: boolean;
    picked: number | null;
    onPick: (i: number) => void;
    live: boolean;
    priority?: boolean;
}) {
    if (card.kind === "cover") return <CoverFace priority={priority} />;
    if (card.kind === "quiz") return <QuizFace card={card} n={n} total={total} picked={picked} onPick={onPick} live={live} />;
    if (card.kind === "note") return <NoteFace card={card} live={live} />;
    return (
        <FlipCard
            flipped={flipped}
            className="h-full w-full"
            front={<LearnFront card={card} n={n} total={total} priority={priority} />}
            back={<LearnBack card={card} n={n} total={total} />}
        />
    );
}

// ---------- the top card ----------

function TopCard({
    x,
    enter,
    onTap,
    onRelease,
    onDragVelocity,
    children,
}: {
    x: MotionValue<number>;
    enter: "stack" | "left";
    onTap: () => void;
    onRelease: (info: PanInfo) => void;
    onDragVelocity?: (v: number) => void;
    children: ReactNode;
}) {
    const t = useTempo();
    const rotate = useTransform(x, [-260, 0, 260], [-SWIPE.maxTilt, 0, SWIPE.maxTilt]);
    const dragged = useRef(false);

    // Coming back from the left (previous card): glide in from where it went.
    useEffect(() => {
        if (enter === "left") {
            const c = animate(x, 0, springT(t));
            return () => c.stop();
        }
    }, [enter, x, t]);

    return (
        <motion.div
            className="absolute inset-0 z-10 cursor-grab touch-pan-y active:cursor-grabbing"
            style={{ x, rotate, transformOrigin: "50% 90%" }}
            initial={enter === "stack" ? { y: STACK.offset, scale: 1 - STACK.scale } : false}
            animate={{ y: 0, scale: 1 }}
            transition={springT(t)}
            drag="x"
            dragMomentum={false}
            onPointerDown={() => (dragged.current = false)}
            onDragStart={() => (dragged.current = true)}
            onDrag={(_, info) => onDragVelocity?.(info.velocity.x)}
            onDragEnd={(_, info) => onRelease(info)}
            onClick={() => !dragged.current && onTap()}
        >
            {children}
        </motion.div>
    );
}

// ---------- the deck ----------

// Each top card gets its own motion value, made when it arrives, so a thrown
// card stays where it was thrown. One coming back from the left starts there.
type DeckState = { index: number; enter: "stack" | "left"; x: MotionValue<number>; n: number };
const arrive = (index: number, enter: "stack" | "left", n: number): DeckState => ({
    index,
    enter,
    x: motionValue(enter === "left" ? -OFF : 0),
    n,
});

export function SwipeDeck({
    cards,
    label,
    priority = false,
    complete,
    restart,
    controls,
    className,
    tone = "dark",
    swipe = SWIPE,
}: {
    cards: readonly DeckCard[];
    label: string;
    priority?: boolean;
    complete?: string;
    restart?: string;
    controls: { prev: string; next: string; flip: string };
    className?: string;
    /** Colour of the controls: on the dark table, or on the paper. */
    tone?: "dark" | "paper";
    /** Throw thresholds: drag distance (px) or flick speed (px/s). */
    swipe?: { offset: number; velocity: number };
}) {
    const t = useTempo();
    const reduce = useReducedMotion();
    const { on: spec } = useSpecMode();
    const total = cards.length;
    const [state, setState] = useState<DeckState>(() => arrive(0, "stack", 0));
    const [flipped, setFlipped] = useState(false);
    const [picked, setPicked] = useState<number | null>(null);
    const [velocity, setVelocity] = useState(0);
    const busy = useRef(false);

    const { index, x } = state;
    const done = index >= total;
    const card = cards[index];

    const settle = useCallback((to: number, enter: "stack" | "left") => {
        setFlipped(false);
        setPicked(null);
        setVelocity(0);
        setState((s) => arrive(to, enter, s.n + 1));
        busy.current = false;
    }, []);

    const goNext = useCallback(
        (v = 0) => {
            if (busy.current || index >= total) return;
            busy.current = true;
            // A harder flick leaves faster.
            const speed = Math.max(Math.abs(v), 1400);
            const duration = Math.min(0.45, Math.max(0.18, OFF / speed)) * t;
            animate(x, -OFF, { duration: reduce ? 0 : duration, ease: [0.32, 0, 0.67, 0] }).then(() => settle(index + 1, "stack"));
        },
        [index, total, t, x, reduce, settle],
    );

    const goPrev = useCallback(() => {
        if (busy.current || index === 0) return;
        settle(index - 1, "left");
    }, [index, settle]);

    const flip = useCallback(() => {
        if (!card || card.kind !== "learn") return;
        setFlipped((f) => !f);
    }, [card]);

    const release = (info: PanInfo) => {
        const { offset, velocity: v } = info;
        if (offset.x < -swipe.offset || v.x < -swipe.velocity) goNext(v.x);
        else if ((offset.x > swipe.offset || v.x > swipe.velocity) && index > 0) {
            // Thrown right: this card goes back under, the previous one returns.
            settle(index - 1, "left");
        } else animate(x, 0, springT(t));
    };

    const onKey = (e: React.KeyboardEvent) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "ArrowRight") {
            e.preventDefault();
            goNext();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            goPrev();
        } else if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            flip();
        }
    };

    const behind = [1, 2].map((d) => index + d).filter((i) => i < total);
    const canFlip = cards.some((c) => c.kind === "learn");
    const ink = tone === "dark" ? "text-[#f2ece3]" : "text-[var(--v2-oxblood)]";
    const ring = tone === "dark" ? "border-white/25 hover:bg-white/10" : "border-[var(--v2-rule)] hover:bg-[rgb(107_15_18/0.06)]";

    return (
        <div className={cn("relative", className)}>
            {/* the stack */}
            <div
                role="group"
                aria-roledescription="flashcard deck"
                aria-label={`${label}. ${done ? (complete ?? "") : `Card ${index + 1} of ${total}`}`}
                tabIndex={0}
                onKeyDown={onKey}
                // The oxblood focus ring would vanish on the dark table.
                className={cn("relative mx-auto aspect-[958/1159] w-full rounded-[18px]", tone === "dark" && "focus-visible:outline-[#e2b98a]")}
            >
                {/* spec mode: the swipe threshold, live */}
                {spec && (
                    <div aria-hidden className="pointer-events-none absolute inset-y-[-12px] left-1/2 z-20">
                        {[-1, 1].map((s) => (
                            <span key={s} className="absolute inset-y-0 border-l border-dashed border-[var(--v2-redline)]" style={{ left: s * swipe.offset }} />
                        ))}
                        <span className="v2-spec-tag" style={{ left: -swipe.offset, bottom: "auto", top: -14 }}>
                            swipe at ±{swipe.offset}px or {swipe.velocity}px/s · now {Math.round(velocity)}px/s
                        </span>
                    </div>
                )}

                {[...behind].reverse().map((i) => {
                    const depth = i - index;
                    return (
                        <motion.div
                            key={`b${i}`}
                            aria-hidden
                            inert
                            initial={false}
                            animate={{ y: depth * STACK.offset, scale: 1 - depth * STACK.scale, opacity: 1 - depth * 0.18 }}
                            transition={springT(t)}
                            className="pointer-events-none absolute inset-0"
                            style={{ transformOrigin: "50% 100%" }}
                        >
                            <Face card={cards[i]} n={i + 1} total={total} flipped={false} picked={null} onPick={() => {}} live={false} />
                        </motion.div>
                    );
                })}

                {!done && card && (
                    <TopCard
                        key={state.n}
                        x={x}
                        enter={state.enter}
                        onTap={flip}
                        onRelease={release}
                        onDragVelocity={spec ? setVelocity : undefined}
                    >
                        <Face card={card} n={index + 1} total={total} flipped={flipped} picked={picked} onPick={setPicked} live priority={priority && index === 0} />
                    </TopCard>
                )}

                {done && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-[18px] border border-dashed border-white/25">
                        <motion.span
                            initial={{ opacity: 0, scale: 1.6, rotate: -14 }}
                            animate={{ opacity: 1, scale: 1, rotate: -6 }}
                            transition={springT(t, 380, 22)}
                            className="v2-mono border-2 border-[#e2b98a] px-3 py-1 text-[15px] uppercase tracking-[0.08em] text-[#e2b98a]"
                        >
                            {complete}
                        </motion.span>
                        <button
                            type="button"
                            onClick={() => settle(0, "left")}
                            className="v2-mono min-h-11 rounded-full border border-white/25 px-4 text-[12px] text-[#f2ece3] hover:bg-white/10"
                        >
                            ↺ {restart}
                        </button>
                    </div>
                )}
            </div>

            {/* buttons, so a swipe is never required */}
            <div className={cn("mt-6 flex items-center justify-between gap-3", ink)}>
                <button type="button" onClick={goPrev} disabled={index === 0} aria-label={controls.prev} className={cn("grid h-11 w-11 place-items-center rounded-full border text-[18px] transition-colors disabled:opacity-30", ring)}>
                    ←
                </button>
                <span aria-hidden className="flex items-center gap-1.5">
                    {cards.map((_, i) => (
                        <span key={i} className={cn("h-1.5 rounded-full bg-current transition-all duration-300", i === index ? "w-5" : "w-1.5 opacity-35")} />
                    ))}
                </span>
                <span className="flex gap-2">
                    {/* No flip button on a deck with nothing to flip. */}
                    {canFlip && (
                        <button
                            type="button"
                            onClick={flip}
                            disabled={done || card?.kind !== "learn"}
                            aria-label={controls.flip}
                            className={cn("grid h-11 w-11 place-items-center rounded-full border text-[17px] transition-colors disabled:opacity-30", ring)}
                        >
                            ↻
                        </button>
                    )}
                    <button type="button" onClick={() => goNext()} disabled={done} aria-label={controls.next} className={cn("grid h-11 w-11 place-items-center rounded-full border text-[18px] transition-colors disabled:opacity-30", ring)}>
                        →
                    </button>
                </span>
            </div>
        </div>
    );
}
