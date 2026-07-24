"use client";

import { useState } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    animate,
    useReducedMotion,
} from "motion/react";
import { Heart } from "lucide-react";

// Interactive demo #2 — the draggable / throwable confession card.
// Tracks the pointer, tilts from x-offset, commits past 92px or a fast flick,
// else springs back. Reduced motion → static card + a "next" button.

interface Card {
    role: string;
    mood: string;
    body: string;
}

function CardFace({ card }: { card: Card }) {
    return (
        <div
            className="w-[min(300px,80vw)] rounded-[24px] p-6"
            style={{
                background: "linear-gradient(150deg,#2b2723,#211d1a)",
                color: "#F1E9DF",
                boxShadow: "0 20px 50px rgba(0,0,0,.4)",
            }}
        >
            <div className="mb-4 flex items-center justify-between">
                <span
                    className="rounded-full px-3 py-1 text-[0.78rem] font-semibold"
                    style={{ background: "rgba(241,233,223,0.14)" }}
                >
                    {card.role}
                </span>
                <span
                    className="rounded-full px-3 py-1 text-[0.78rem]"
                    style={{ background: "rgba(137,126,146,0.3)" }}
                >
                    {card.mood}
                </span>
            </div>
            <p
                className="mb-5 text-[1.15rem] leading-snug"
                style={{ fontFamily: "var(--font-lora), serif" }}
            >
                {card.body}
            </p>
            <div className="flex gap-2">
                <span
                    className="flex-1 rounded-[14px] py-3 text-center text-sm font-semibold"
                    style={{ background: "rgba(241,233,223,0.1)" }}
                >
                    not for me
                </span>
                <span
                    className="flex-1 rounded-[14px] py-3 flex items-center justify-center gap-1.5 text-sm font-semibold"
                    style={{ background: "rgba(176,106,72,0.35)" }}
                >
                    <Heart className="h-4 w-4" strokeWidth={2} /> felt this
                </span>
            </div>
        </div>
    );
}

export function SwipeCardDemo({ cards }: { cards: readonly Card[] }) {
    const [index, setIndex] = useState(0);
    const reduce = useReducedMotion();
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-160, 0, 160], [-15, 0, 15]);
    const opacity = useTransform(x, [-260, -120, 0, 120, 260], [0, 1, 1, 1, 0]);

    const card = cards[index % cards.length];
    const next = () => setIndex((i) => (i + 1) % cards.length);

    if (reduce) {
        return (
            <div className="flex flex-col items-center gap-4">
                <CardFace card={card} />
                <button
                    type="button"
                    onClick={next}
                    className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700"
                >
                    next →
                </button>
            </div>
        );
    }

    return (
        <div className="relative flex h-[340px] items-center justify-center" style={{ touchAction: "none" }}>
            {/* faux deck behind the top card */}
            <div
                aria-hidden
                className="absolute w-[min(300px,80vw)] rounded-[24px]"
                style={{ height: 220, background: "#1d1a17", transform: "translateY(14px) scale(0.95)", boxShadow: "0 20px 40px rgba(0,0,0,.3)" }}
            />
            <div
                aria-hidden
                className="absolute w-[min(300px,80vw)] rounded-[24px]"
                style={{ height: 220, background: "#221e1b", transform: "translateY(7px) scale(0.975)" }}
            />
            <motion.div
                className="absolute cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                style={{ x, rotate, opacity }}
                onDragEnd={(_, info) => {
                    const thrown = Math.abs(info.offset.x) > 92 || Math.abs(info.velocity.x) > 450;
                    if (thrown) {
                        const dir = info.offset.x > 0 ? 1 : -1;
                        animate(x, dir * 1000, {
                            duration: 0.42,
                            ease: [0.22, 0.61, 0.36, 1],
                            onComplete: () => {
                                next();
                                x.set(0);
                            },
                        });
                    } else {
                        animate(x, 0, { type: "spring", stiffness: 300, damping: 22 });
                    }
                }}
            >
                <CardFace card={card} />
            </motion.div>
        </div>
    );
}
