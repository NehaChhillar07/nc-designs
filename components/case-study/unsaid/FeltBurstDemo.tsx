"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Heart } from "lucide-react";

// Interactive demo #3 — the "felt this" heart burst.
// On tap, hearts spray from the button across the screen. The only public
// reaction in the app is warmth — no counter, no leaderboard.
// Reduced motion → a single static heart pop.

interface Heart {
    id: number;
    x: number;
    y: number;
    dx: number;
    rise: number;
    size: number;
    dur: number;
}

export function FeltBurstDemo() {
    const [hearts, setHearts] = useState<Heart[]>([]);
    const [filled, setFilled] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const idRef = useRef(0);
    const reduce = useReducedMotion();

    const burst = () => {
        const r = btnRef.current?.getBoundingClientRect();
        if (!r) return;
        const ox = r.left + r.width / 2;
        const oy = r.top;
        const n = reduce ? 1 : 12;
        const batch: Heart[] = Array.from({ length: n }, (_, i) => ({
            id: idRef.current++,
            x: ox,
            y: oy,
            dx: reduce ? 0 : (Math.random() - 0.5) * 260,
            rise: reduce ? -40 : -(170 + i * 48),
            size: 16 + (i % 3) * 6,
            dur: reduce ? 0.5 : 1.1 + (i % 4) * 0.18,
        }));
        setHearts((h) => [...h, ...batch]);
        const ttl = (reduce ? 0.5 : 2) * 1000 + 120;
        const ids = new Set(batch.map((b) => b.id));
        window.setTimeout(() => setHearts((h) => h.filter((x) => !ids.has(x.id))), ttl);
        setFilled(true);
        window.setTimeout(() => setFilled(false), 1400);
    };

    return (
        <div className="flex min-h-[120px] flex-col items-center justify-center">
            <button
                ref={btnRef}
                type="button"
                onClick={burst}
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[1.05rem] font-semibold text-white transition-transform active:scale-95"
                style={{
                    background: "linear-gradient(140deg,#B06A48,#9C5A3C)",
                    boxShadow: "0 10px 26px rgba(176,106,72,.4)",
                }}
            >
                <Heart className="h-[1.15em] w-[1.15em]" fill={filled ? "currentColor" : "none"} strokeWidth={2} /> felt this
            </button>

            {hearts.map((h) => (
                <motion.span
                    key={h.id}
                    className="pointer-events-none fixed z-[60] select-none"
                    style={{ left: h.x, top: h.y, fontSize: h.size, marginLeft: -h.size / 2 }}
                    initial={{ x: 0, y: 0, scale: 0.4, opacity: 0 }}
                    animate={{
                        x: [0, h.dx * 0.4, h.dx],
                        y: [0, h.rise * 0.25, h.rise],
                        scale: [0.4, 1.05, 0.7],
                        opacity: [0, 1, 0],
                    }}
                    transition={{ duration: h.dur, ease: [0.2, 0.7, 0.3, 1], times: [0, 0.18, 1] }}
                >
                    <Heart fill="#B06A48" stroke="#B06A48" style={{ width: h.size, height: h.size }} />
                </motion.span>
            ))}
        </div>
    );
}
