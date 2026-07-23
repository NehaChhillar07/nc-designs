"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// Interactive demo #1 — the personal / professional "world" toggle.
// Switching morphs the accent colour and the band background between the
// warm and cool worlds. Reduced motion → instant swap, no slide.

const WORLD = {
    personal: {
        accent: "#B06A48",
        bg: "linear-gradient(165deg,#ECE5DC,#E5DACE,#DCCFC1)",
    },
    professional: {
        accent: "#5A7388",
        bg: "linear-gradient(165deg,#E6E8EB,#DCE1E7,#D2D9E1)",
    },
} as const;

type World = keyof typeof WORLD;

export function WorldToggleDemo({ caption }: { caption: string }) {
    const [world, setWorld] = useState<World>("personal");
    const reduce = useReducedMotion();
    const { accent, bg } = WORLD[world];

    return (
        <div className="mt-10">
            <motion.div
                className="rounded-[22px] p-8 md:p-10"
                animate={{ background: bg }}
                transition={
                    reduce
                        ? { duration: 0 }
                        : { duration: 0.6, ease: [0.62, 0.02, 0.16, 1] }
                }
                style={{ background: bg }}
            >
                <div
                    className="relative inline-flex rounded-full p-1"
                    style={{
                        background: "rgba(255,255,255,0.55)",
                        border: "1px solid rgba(255,255,255,0.7)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <motion.span
                        aria-hidden
                        className="absolute top-1 bottom-1 rounded-full"
                        style={{ width: "calc(50% - 4px)", background: accent, boxShadow: "0 4px 16px rgba(0,0,0,.15)" }}
                        animate={{
                            left: world === "personal" ? 4 : "50%",
                            background: accent,
                        }}
                        transition={
                            reduce
                                ? { duration: 0 }
                                : { left: { duration: 0.5, ease: [0.34, 1.32, 0.46, 1] }, background: { duration: 0.6 } }
                        }
                    />
                    {(["personal", "professional"] as World[]).map((w) => {
                        const on = world === w;
                        return (
                            <button
                                key={w}
                                type="button"
                                onClick={() => setWorld(w)}
                                className="relative z-[2] flex items-center gap-2 px-6 py-2 text-sm font-semibold transition-colors"
                                style={{ color: on ? "#fff" : "#4b5563" }}
                            >
                                <span
                                    className="h-[7px] w-[7px] rounded-full"
                                    style={{ background: on ? "#fff" : "currentColor", opacity: on ? 1 : 0.6 }}
                                />
                                {w}
                            </button>
                        );
                    })}
                </div>

                <p
                    className="mt-4 text-lg"
                    style={{ fontFamily: "var(--font-caveat), cursive", color: "#9C5A3C", fontWeight: 600 }}
                >
                    ↑ {caption}
                </p>
            </motion.div>
        </div>
    );
}
