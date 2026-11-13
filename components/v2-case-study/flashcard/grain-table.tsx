"use client";

// The coloured "table" a deck sits on: a riso grain gradient in oxblood →
// amber → ink. The one place this page uses a shader, and only behind decks,
// never under reading text (design-system/.../case-study-v2.md, "Decks").
// - The CSS gradient is always there: server markup, no WebGL, reduced motion.
// - The shader loads on the client only, fades in over it, and stops
//   rendering while off-screen (ShaderMount pauses itself).
// - Reduced motion, Save-Data or a low-power device: one still frame.

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const GrainGradient = dynamic(() => import("@paper-design/shaders-react").then((m) => m.GrainGradient), { ssr: false });

const COLORS = ["#6b0f12", "#b9772e", "#3a1012", "#1a1414"];

function canRender() {
    try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") ?? c.getContext("webgl"));
    } catch {
        return false;
    }
}

function lowPower() {
    const n = navigator as Navigator & { connection?: { saveData?: boolean } };
    return n.connection?.saveData === true || (n.hardwareConcurrency ?? 8) <= 4;
}

export function GrainTable({ children, className, seed = 0 }: { children: ReactNode; className?: string; seed?: number }) {
    const reduce = useReducedMotion();
    // Decided after mount: the server and the first client render both show
    // only the CSS table.
    const [mode, setMode] = useState<"css" | "still" | "live">("css");
    useEffect(() => {
        if (!canRender()) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the device, once
        setMode(reduce || lowPower() ? "still" : "live");
    }, [reduce]);

    return (
        <div className={cn("v2-grain-table relative isolate overflow-hidden", className)}>
            {mode !== "css" && (
                <GrainGradient
                    aria-hidden
                    className="v2-grain-canvas absolute inset-0 -z-10"
                    colorBack="#1a1414"
                    colors={COLORS}
                    softness={0.75}
                    intensity={0.35}
                    noise={0.4}
                    shape="corners"
                    speed={mode === "live" ? 0.35 : 0}
                    frame={seed * 4000}
                    minPixelRatio={1}
                    maxPixelCount={1_200_000}
                />
            )}
            {children}
        </div>
    );
}
