"use client";

// Spec mode: the page's signature. Press S (or the "redlines" toggle) and the
// page shows its own redlines, the way a Figma inspect panel would: the layout
// grid, a dashed box on every <Spec> element with its live size and type spec,
// and the measured height of every <SpecGap>. Values are read from the DOM,
// never typed, so they stay true as the layout changes.

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type ElementType,
    type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

import { GRID } from "./grid";

type SpecContextValue = { on: boolean; toggle: () => void };

const SpecContext = createContext<SpecContextValue>({ on: false, toggle: () => {} });

export function useSpecMode() {
    return useContext(SpecContext);
}

function isTypingTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return false;
    return (
        target.isContentEditable ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
    );
}

export function SpecProvider({ children }: { children: ReactNode }) {
    const [on, setOn] = useState(false);
    const toggle = useCallback(() => setOn((v) => !v), []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "s" && e.key !== "S") return;
            if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
            if (isTypingTarget(e.target)) return;
            setOn((v) => !v);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <SpecContext.Provider value={{ on, toggle }}>
            {children}
            {on && <SpecGrid />}
            {on && <div className="v2-spec-scan" aria-hidden />}
        </SpecContext.Provider>
    );
}

function SpecGrid() {
    return (
        <div className="v2-spec-grid" aria-hidden>
            <div className={cn(GRID, "h-full")}>
                {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className={i >= 4 ? "hidden md:block" : undefined} />
                ))}
            </div>
        </div>
    );
}

// next/font hashes family names ("__Instrument_Serif_5a3b2c"). Turn the first
// family back into something a designer would read.
function cleanFamily(family: string) {
    const first = family.split(",")[0].replace(/["']/g, "").trim();
    return first
        .replace(/^__/, "")
        .replace(/_[0-9a-f]{6,}$/i, "")
        .replace(/_Fallback.*$/i, "")
        .replace(/_/g, " ")
        .toLowerCase();
}

function px(value: string) {
    const n = parseFloat(value);
    return Number.isFinite(n) ? Math.round(n) : value;
}

type Measured = { w: number; h: number; top: number; type?: string };

// Re-measures on resize while spec mode is on. Off, it does nothing at all.
function useMeasure<T extends HTMLElement>(on: boolean, withType: boolean) {
    const ref = useRef<T>(null);
    const [m, setM] = useState<Measured | null>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!on || !el) return;
        const read = () => {
            const r = el.getBoundingClientRect();
            let type: string | undefined;
            if (withType) {
                const cs = getComputedStyle(el);
                const lh = cs.lineHeight === "normal" ? "auto" : px(cs.lineHeight);
                type = `${cleanFamily(cs.fontFamily)} ${px(cs.fontSize)}/${lh}`;
            }
            setM({ w: Math.round(r.width), h: Math.round(r.height), top: r.top, type });
        };
        read();
        const ro = new ResizeObserver(read);
        ro.observe(el);
        return () => ro.disconnect();
    }, [on, withType]);

    return { ref, m: on ? m : null };
}

type SpecProps = {
    /** What a designer would call this layer. */
    name: string;
    as?: ElementType;
    /** Show the live font spec next to the name. On for text, off for frames. */
    type?: boolean;
    className?: string;
    children: ReactNode;
} & Record<string, unknown>;

// The element itself, not a wrapper, so it never changes the layout.
export function Spec({ name, as: Tag = "div", type = false, className, children, ...rest }: SpecProps) {
    const { on } = useSpecMode();
    const { ref, m } = useMeasure<HTMLElement>(on, type);

    return (
        <Tag ref={ref} className={cn("relative", className)} {...rest}>
            {children}
            {m && (
                <span
                    className="v2-spec-box"
                    aria-hidden
                    // Appear just behind the scan line: later the further down the screen.
                    style={{ "--spec-delay": `${Math.round(Math.min(Math.max(m.top, 0) / window.innerHeight, 1) * 440)}ms` } as React.CSSProperties}
                >
                    <span className="v2-spec-tag">
                        {name}
                        {m.type ? ` · ${m.type}` : ""}
                    </span>
                    <span className="v2-spec-tag v2-spec-size">
                        {m.w} × {m.h}
                    </span>
                </span>
            )}
        </Tag>
    );
}

// A vertical spacer that shows its own height in spec mode.
export function SpecGap({ className }: { className: string }) {
    const { on } = useSpecMode();
    const { ref, m } = useMeasure<HTMLDivElement>(on, false);

    return (
        <div ref={ref} aria-hidden className={cn("relative", className)}>
            {m && (
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center md:left-8">
                    <div className="h-full border-l border-[var(--v2-redline)]" />
                    <span className="v2-mono ml-1.5 text-[10px] text-[var(--v2-redline)]">{m.h}</span>
                </div>
            )}
        </div>
    );
}
