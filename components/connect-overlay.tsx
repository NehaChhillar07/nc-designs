"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { Highlighter } from "@/components/ui/highlighter";
import { CAL_LINK, isUnreplaced, resolveToken } from "@/lib/placeholders";
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";

interface ConnectOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ConnectOverlay({ isOpen, onClose }: ConnectOverlayProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);

    const getFocusable = useCallback(
        () =>
            modalRef.current
                ? Array.from(
                      modalRef.current.querySelectorAll<HTMLElement>(
                          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                      )
                  )
                : [],
        []
    );

    // Accessible dialog behaviour, part 1: lock scroll, move focus into the
    // dialog, and restore both the focus and the exact scroll position on close.
    useEffect(() => {
        if (!isOpen) return;

        previouslyFocused.current = document.activeElement as HTMLElement | null;

        // Scroll lock, in four parts. Nothing here touches a style, on purpose:
        // the lock refuses the scroll rather than removing the scroller.
        //
        // Three tempting versions are all wrong here.
        //
        // `document.body.style.overflow = "hidden"` does nothing at all. globals.css
        // sets `html { overflow-x: clip }`, and once the root element's overflow is
        // not `visible` the body's overflow stops propagating to the viewport, so
        // the page kept scrolling behind the dialog.
        //
        // `documentElement.style.overflowY = "hidden"` does lock the page, but it
        // also removes the scrollbar, and where that scrollbar takes layout space
        // the layout viewport gets a scrollbar wider. Measured on a 1440 viewport
        // with a 16px scrollbar: the header, which is `fixed left-0 right-0` and so
        // is sized by the layout viewport, grew 1424 to 1440 and threw the Connect
        // button at its right edge 16px sideways as the dialog opened. Padding the
        // body cannot reach a fixed element, and `scrollbar-gutter: stable` is
        // ignored while overflow is hidden because a hidden scroller has no
        // scrollbar to leave a gutter for. Neither compensates. Leaving the
        // scrollbar in place is the only version with no layout shift at all.
        //
        // Pinning body with position:fixed + top:-scrollY was the third candidate.
        // It locks, but it collapses the scroll range, so scrollY drops to 0 and
        // every scroll-driven effect behind the dialog recalculates: the sticky
        // stack panels unstick and the Work section's 3D tilt snaps back to its
        // entry state, visibly, through the backdrop.
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        // 1. Refuse the wheel. The dialog card is `overflow-hidden` and holds no
        //    scrollable region, so nothing inside it needs the wheel either.
        const blockWheel = (e: WheelEvent) => e.preventDefault();
        window.addEventListener("wheel", blockWheel, { passive: false });

        // 2. Refuse the keys that scroll. Space is deliberately absent: it is how a
        //    keyboard reader activates the focused close button, and a button
        //    swallows it anyway. If it does reach the page, part 3 catches it.
        const scrollKeys = new Set([
            "PageUp",
            "PageDown",
            "Home",
            "End",
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
        ]);
        const blockScrollKeys = (e: KeyboardEvent) => {
            if (scrollKeys.has(e.key)) e.preventDefault();
        };
        window.addEventListener("keydown", blockScrollKeys, { passive: false });

        // 3. The backstop for everything input handlers cannot refuse: a
        //    programmatic scroll (window.scrollTo, scrollBy, a scroll-into-view),
        //    a drag on the scrollbar itself, find-in-page. Pin the offset back the
        //    moment anything moves it. Capture phase on window runs before any
        //    bubble-phase listener, and scroll events are dispatched before the
        //    frame paints, so the page never paints at the moved position. Only a
        //    same-tick read of scrollY ever sees it.
        const pinScroll = () => {
            if (Math.abs(window.scrollY - scrollY) > 0.5 || Math.abs(window.scrollX - scrollX) > 0.5) {
                window.scrollTo(scrollX, scrollY);
            }
        };
        window.addEventListener("scroll", pinScroll, { capture: true });

        // 4. iOS Safari pans the page with touch, which fires neither wheel nor
        //    keydown. Block touch drags that start outside the dialog.
        const blockTouchMove = (e: TouchEvent) => {
            if (!modalRef.current?.contains(e.target as Node)) e.preventDefault();
        };
        document.addEventListener("touchmove", blockTouchMove, { passive: false });

        const focusFrame = requestAnimationFrame(() => getFocusable()[0]?.focus());

        return () => {
            cancelAnimationFrame(focusFrame);
            window.removeEventListener("wheel", blockWheel);
            window.removeEventListener("keydown", blockScrollKeys);
            window.removeEventListener("scroll", pinScroll, { capture: true });
            document.removeEventListener("touchmove", blockTouchMove);
            previouslyFocused.current?.focus?.();
            // Last, so the reader lands exactly where they opened the dialog even
            // if focusing the trigger scrolled it into view.
            window.scrollTo(scrollX, scrollY);
        };
    }, [isOpen, getFocusable]);

    // Part 2: trap Tab inside the dialog and close on Escape. Kept separate from
    // the lock above because `onClose` is a fresh closure on every parent render,
    // and re-running the lock would re-capture the scroll position each time.
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            if (e.key === "Tab") {
                const items = getFocusable();
                if (items.length === 0) return;
                const first = items[0];
                const last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, getFocusable]);

    const emailSubject = encodeURIComponent("Project inquiry");
    const emailBody = encodeURIComponent("Hi Neha,\n\nI came across your portfolio and would love to connect!\n\n[Your message here]\n\nBest regards");
    const emailLink = `mailto:${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
    // Unreplaced {{CAL_LINK}} hides the booking card in production.
    const calLink = resolveToken(CAL_LINK);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="connect-title"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm"
                    >
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            {/* Header */}
                            <div className="relative px-6 pt-6 pb-4">
                                <button
                                    onClick={onClose}
                                    aria-label="Close"
                                    className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                                <h2 id="connect-title" className="text-xl font-medium text-gray-900">
                                    Let&apos;s connect
                                </h2>
                            </div>

                            {/* Cards */}
                            <div className="px-6 pb-6 space-y-3">
                                {/* Book a call — hidden in production until
                                    {{CAL_LINK}} is replaced. In dev the
                                    unreplaced card is inert and shows the
                                    token (a real link would 404). */}
                                {calLink &&
                                    (isUnreplaced(calLink) ? (
                                        <div
                                            className="block p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 opacity-70"
                                            title="Replace CAL_LINK in lib/placeholders.ts"
                                        >
                                            <span className="text-xs text-gray-400 uppercase tracking-wide">Book a call</span>
                                            <p className="text-lg font-mono text-gray-500 mt-0.5">{calLink}</p>
                                        </div>
                                    ) : (
                                        <motion.a
                                            href={calLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-4 bg-gray-50 rounded-xl border border-gray-100"
                                            whileHover={{
                                                rotateX: -3,
                                                rotateY: 4,
                                                scale: 1.02,
                                                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                                        >
                                            <span className="text-xs text-gray-400 uppercase tracking-wide">Book a call</span>
                                            <p className="text-lg font-medium text-gray-900 mt-0.5">
                                                <Highlighter action="highlight" color="#FF9800">
                                                    30 minutes, free
                                                </Highlighter>
                                            </p>
                                        </motion.a>
                                    ))}

                                {/* Email Card */}
                                <motion.a
                                    href={emailLink}
                                    className="block p-4 bg-gray-50 rounded-xl border border-gray-100"
                                    whileHover={{
                                        rotateX: -3,
                                        rotateY: -4,
                                        scale: 1.02,
                                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                                >
                                    <span className="text-xs text-gray-400 uppercase tracking-wide">Email</span>
                                    <p className="text-lg font-medium text-gray-900 mt-0.5">
                                        <Highlighter action="highlight" color="#FF9800">
                                            {CONTACT_EMAIL}
                                        </Highlighter>
                                    </p>
                                </motion.a>

                                {/* LinkedIn Card */}
                                <motion.a
                                    href={LINKEDIN_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 bg-gray-50 rounded-xl border border-gray-100"
                                    whileHover={{
                                        rotateX: -3,
                                        rotateY: 4,
                                        scale: 1.02,
                                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                                >
                                    <span className="text-xs text-gray-400 uppercase tracking-wide">LinkedIn</span>
                                    <p className="text-lg font-medium text-gray-900 mt-0.5">
                                        <Highlighter action="highlight" color="#FF9800">
                                            in/neha-chhillar
                                        </Highlighter>
                                    </p>
                                </motion.a>

                                {/* Freelance page link */}
                                <div className="pt-1">
                                    <Link
                                        href="/work-with-me"
                                        onClick={onClose}
                                        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
                                        style={{ textDecorationColor: "var(--accent-warm)" }}
                                    >
                                        Freelance offer and pricing
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
