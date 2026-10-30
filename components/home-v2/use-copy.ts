"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Copy text to the clipboard with a short "copied" state for feedback.
// `text` can be a function, read at click time (e.g. the current URL).
// If the clipboard is unavailable (insecure context, denied permission),
// `fallback` runs instead, e.g. opening the mail app.
export function useCopy(text: string | (() => string), fallback?: () => void, holdMs = 1800) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const copy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(typeof text === "function" ? text() : text);
            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), holdMs);
        } catch {
            fallback?.();
        }
    }, [text, fallback, holdMs]);

    return { copied, copy };
}
