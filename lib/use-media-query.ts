"use client";

import { useSyncExternalStore } from "react";

// A media query that is safe to branch rendered markup or styles on. Same
// approach as use-reduced-motion-safe: React renders the server snapshot for
// both the server pass and hydration, then re-renders with the real value, so
// the two trees always match.

/** True from md (768px) up. Assumed true on the server, where the desktop layout renders. */
export function useIsDesktop(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, () => true);
}

const QUERY = "(min-width: 768px)";

function subscribe(callback: () => void): () => void {
    const mq = window.matchMedia(QUERY);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
    return window.matchMedia(QUERY).matches;
}
