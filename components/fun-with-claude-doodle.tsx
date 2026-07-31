"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectOverlay } from "@/components/connect-overlay";
import { funWithClaudeData } from "@/data/fun-with-claude-data";

// ============================================
// Hidden doodle layer for the Fun with Claude panel: moving the mouse drags
// a fading orange marker stroke (the site's Highlighter, in the visitor's
// hand) across the panel background. Doodle enough distance and a small
// popover slides in with a Connect invitation. Mouse/pen only — touch is
// left alone so scrolling stays native. Canvas is pointer-events-none and
// sits behind the panel content, so links stay fully clickable.
// ============================================

const MARKER_COLOR = "#FF9800"; // --accent-warm
const MARKER_ALPHA = 0.5; // highlighter translucency at full strength
const MARKER_WIDTH = 14;
const HOLD_MS = 2600; // stroke stays at full strength while you keep doodling
const FADE_MS = 2400; // then eases away from the oldest end
const LIFE_MS = HOLD_MS + FADE_MS;
const ALPHA_STEPS = 20; // opacity bands — each drawn as one continuous path
// px of drawn stroke before the popover appears. Roughly two sweeps across the
// panel — 1500 asked for so much scribbling most visitors never reached it.
const TRIGGER_DISTANCE = 450;

type Point = { x: number; y: number; t: number } | null; // null = stroke break

export function DoodleLayer() {
    const { doodle } = funWithClaudeData;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const points = useRef<Point[]>([]);
    const distance = useRef(0);
    const raf = useRef(0);
    // Once per page load, not once per browser session — a reload re-arms it.
    const shown = useRef(false);
    const [popover, setPopover] = useState(false);
    const [connectOpen, setConnectOpen] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const panel = canvas?.parentElement;
        if (!canvas || !panel) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = panel.getBoundingClientRect();
            canvas.width = Math.round(rect.width * dpr);
            canvas.height = Math.round(rect.height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(panel);

        const draw = () => {
            const now = performance.now();
            const rect = panel.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);
            ctx.strokeStyle = MARKER_COLOR;
            ctx.lineWidth = MARKER_WIDTH;

            // Drop fully-faded points (and leading stroke breaks)
            while (
                points.current.length &&
                (points.current[0] === null || now - points.current[0].t > LIFE_MS)
            ) {
                points.current.shift();
            }

            // Segments are grouped into opacity bands and each band is stroked as
            // a single path. Stroking segment-by-segment would composite the
            // round caps twice at every sample point and bead the line.
            let path: Path2D | null = null;
            let step = 0;
            const flush = () => {
                if (path) {
                    ctx.globalAlpha = (step / ALPHA_STEPS) * MARKER_ALPHA;
                    ctx.stroke(path);
                }
                path = null;
                step = 0;
            };

            for (let i = 1; i < points.current.length; i++) {
                const a = points.current[i - 1];
                const b = points.current[i];
                if (!a || !b) {
                    flush();
                    continue;
                }
                const age = now - b.t;
                const fade = age <= HOLD_MS ? 1 : 1 - (age - HOLD_MS) / FADE_MS;
                const next = Math.ceil(Math.min(1, Math.max(0, fade)) * ALPHA_STEPS);
                if (next <= 0) {
                    flush();
                    continue;
                }
                if (next !== step) {
                    flush();
                    step = next;
                    path = new Path2D();
                    path.moveTo(a.x, a.y); // start on the previous point so bands join seamlessly
                }
                path!.lineTo(b.x, b.y);
            }
            flush();
            ctx.globalAlpha = 1;

            raf.current = points.current.length ? requestAnimationFrame(draw) : 0;
        };

        const onMove = (e: PointerEvent) => {
            if (e.pointerType === "touch") return; // never fight scrolling
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const prev = points.current[points.current.length - 1];
            if (prev) {
                distance.current += Math.hypot(x - prev.x, y - prev.y);
                if (distance.current > TRIGGER_DISTANCE && !shown.current) {
                    shown.current = true;
                    setPopover(true);
                }
            }
            points.current.push({ x, y, t: performance.now() });
            // Cap comfortably above LIFE_MS worth of samples at a 120Hz pointer,
            // so the tail always ends by fading rather than by being cut off.
            if (points.current.length > 1400) points.current.shift();
            if (!raf.current) raf.current = requestAnimationFrame(draw);
        };

        const onLeave = () => {
            if (points.current[points.current.length - 1] !== null) {
                points.current.push(null);
            }
        };

        panel.addEventListener("pointermove", onMove);
        panel.addEventListener("pointerleave", onLeave);
        return () => {
            panel.removeEventListener("pointermove", onMove);
            panel.removeEventListener("pointerleave", onLeave);
            ro.disconnect();
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="absolute inset-0 -z-10 h-full w-full rounded-[28px] pointer-events-none"
            />

            {popover && (
                <motion.div
                    initial={{ opacity: 0, y: 14, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, rotate: -2 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute bottom-6 right-6 z-10 max-w-[260px] rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_16px_44px_-20px_rgba(0,0,0,0.28)]"
                >
                    <button
                        type="button"
                        aria-label={doodle.dismissAria}
                        onClick={() => setPopover(false)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <span
                        className="inline-block px-2.5 py-0.5 text-white"
                        style={{
                            fontFamily: "var(--font-caveat), cursive",
                            fontSize: "17px",
                            background: "#FF9800",
                            borderRadius: "6px",
                            transform: "rotate(-3deg)",
                        }}
                    >
                        {doodle.sticker}
                    </span>
                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">{doodle.line}</p>
                    <Button size="sm" className="mt-4" onClick={() => setConnectOpen(true)}>
                        {doodle.cta}
                    </Button>
                </motion.div>
            )}

            <ConnectOverlay isOpen={connectOpen} onClose={() => setConnectOpen(false)} />
        </>
    );
}
