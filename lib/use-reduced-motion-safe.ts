"use client";

import { useSyncExternalStore } from "react";

// Reduced-motion preference that is SAFE to branch rendered markup on.
//
// motion's useReducedMotion() reads the media query during the client's first
// render, so it returns false on the server and true on the client for a user
// with the OS setting on. Anything that decides which elements exist, or what
// styles they carry, from that value is a hydration mismatch — that was the
// whole 3.1/3.2 defect class.
//
// useSyncExternalStore fixes it properly: React uses getServerSnapshot (always
// false) for both the server render and hydration, then re-renders with the
// real value once hydration is done. Same tree on both sides, correct value a
// tick later.
//
// Use motion's useReducedMotion() for TIMING (collapsing a duration to 0), and
// this hook only when the markup itself has to change — e.g. swapping a
// drag-to-reorder list for explicit up/down buttons.

function subscribe(callback: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot(): boolean {
    return false;
}

export function useReducedMotionSafe(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
