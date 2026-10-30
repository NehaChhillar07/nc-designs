"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { DUR, EASE, useFinePointer } from "./motion";

type Person = {
    name: string;
    role: string;
    team: string;
    avatar: string;
    fullQuote: string;
};

// The attribution under a quote: avatar + name + role. Hover (mouse), focus
// (keyboard) or tap (touch) opens a profile card: who they are, then their
// full note. The homepage shows only an excerpt.
//
// The trigger is a real button so it works by keyboard and tap; aria-expanded
// and aria-controls tie it to the card. Escape or a tap outside closes it.
export function PersonCard({ person }: { person: Person }) {
    const [open, setOpen] = useState(false);
    const fine = useFinePointer();
    const rootRef = useRef<HTMLSpanElement>(null);
    const closeTimer = useRef<number | undefined>(undefined);
    // Keyboard "clicks" (Enter/Space) have no pointer, so this resets to "" after use.
    const lastPointer = useRef("");
    const cardId = useId();

    // A short grace period on leave, so moving from the trigger onto the card
    // (to select the quote text, say) doesn't snap it shut.
    const openNow = () => {
        window.clearTimeout(closeTimer.current);
        setOpen(true);
    };
    const closeSoon = () => {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => setOpen(false), 140);
    };

    useEffect(() => () => window.clearTimeout(closeTimer.current), []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        const onDown = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("pointerdown", onDown);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("pointerdown", onDown);
        };
    }, [open]);

    return (
        <span
            ref={rootRef}
            className="relative inline-block"
            onPointerEnter={(e) => e.pointerType === "mouse" && fine && openNow()}
            onPointerLeave={(e) => e.pointerType === "mouse" && fine && closeSoon()}
        >
            <button
                type="button"
                aria-expanded={open}
                aria-controls={cardId}
                // A tap fires focus and then click, so focus only opens for the
                // keyboard (:focus-visible), and a mouse click never closes a card
                // that hover just opened. Touch and pen taps toggle.
                onPointerDown={(e) => (lastPointer.current = e.pointerType)}
                onClick={() => {
                    if (lastPointer.current === "mouse") openNow();
                    else setOpen((v) => !v);
                    lastPointer.current = "";
                }}
                onFocus={(e) => e.currentTarget.matches(":focus-visible") && openNow()}
                onBlur={(e) => {
                    if (!rootRef.current?.contains(e.relatedTarget as Node)) closeSoon();
                }}
                className="group/person flex items-center gap-2.5 rounded-full py-1 pr-2 text-left"
            >
                <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-[var(--v2-rule)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/person:scale-110 group-aria-expanded/person:scale-110">
                    <Image
                        src={person.avatar}
                        alt=""
                        fill
                        sizes="28px"
                        className="object-cover grayscale transition-[filter] duration-500 group-hover/person:grayscale-0 group-aria-expanded/person:grayscale-0"
                    />
                </span>
                <span className="v2-mono text-[11px] text-[var(--v2-muted)]">
                    <span className="text-[var(--v2-ink)] underline decoration-[var(--v2-rule)] underline-offset-[3px] transition-colors group-hover/person:decoration-[var(--v2-oxblood)]">
                        {person.name}
                    </span>{" "}
                    · {person.role}
                </span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.span
                        id={cardId}
                        role="group"
                        aria-label={person.name}
                        onPointerEnter={(e) => e.pointerType === "mouse" && openNow()}
                        onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
                        // Grows out of the avatar: the transform origin sits on it.
                        style={{ transformOrigin: "14px calc(100% + 18px)" }}
                        initial={{ opacity: 0, scale: 0.9, y: 8, filter: "blur(4px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.96, y: 4, filter: "blur(2px)", transition: { duration: DUR.fast } }}
                        transition={{ duration: DUR.fast * 1.8, ease: EASE }}
                        className={cn(
                            "absolute bottom-full left-0 z-30 mb-3 block w-[min(340px,calc(100vw-2rem))]",
                            "border border-[var(--v2-rule)] bg-[var(--v2-paper)] p-4 shadow-[0_22px_50px_-24px_rgba(60,10,12,0.45)]",
                        )}
                    >
                        <span className="flex items-center gap-3">
                            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                                <Image src={person.avatar} alt="" fill sizes="48px" className="object-cover" />
                            </span>
                            <span className="block">
                                <span className="v2-display block text-[24px] leading-none text-[var(--v2-ink)]">
                                    {person.name}
                                </span>
                                <span className="v2-mono mt-1 block text-[11px] text-[var(--v2-muted)]">
                                    {person.role} · {person.team}
                                </span>
                            </span>
                        </span>

                        {/* Who they are, then their words. Nothing in between. */}
                        <span className="mt-3 block border-t border-[var(--v2-rule)] pt-3 text-[13px] leading-[1.55] text-[var(--v2-ink)]">
                            “{person.fullQuote}”
                        </span>
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
}
