"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type LazyVideoProps = {
    src: string;
    className?: string;
    poster?: string;
    /** Describes the clip for screen readers. */
    label?: string;
    /** Attach the src straight away (above-the-fold media, e.g. a hero). */
    eager?: boolean;
    /**
     * Never start playback for a reduced-motion user: they get the poster frame.
     * Off by default so existing callers keep their behaviour.
     */
    stillForReducedMotion?: boolean;
};

// autoPlay makes a browser fetch the whole file immediately, and
// preload="metadata" does not override it. For media far down a page that put
// megabytes on the critical path for things nobody had scrolled to yet. So the
// src is held back until the element is near the viewport, then attached and
// played.
//
// The reduced-motion check uses the hydration-safe hook, because it decides
// whether the src exists at all, which is markup.
//
// That hook reads false until hydration is done. For an eager clip that has to
// stay still, a src rendered in that window is already downloading and playing
// by the time the real preference arrives, and removing a src attribute does
// not stop a playing video. So such a clip attaches nothing until the client
// knows the preference.

const noSubscription = () => () => {};

/** False on the server and during hydration, true once the client has taken over. */
function useHydrated(): boolean {
    return useSyncExternalStore(
        noSubscription,
        () => true,
        () => false,
    );
}

export function LazyVideo({
    src,
    className,
    poster,
    label,
    eager = false,
    stillForReducedMotion = false,
}: LazyVideoProps) {
    const ref = useRef<HTMLVideoElement>(null);
    const [nearView, setNearView] = useState(eager);
    const reduced = useReducedMotionSafe();
    const hydrated = useHydrated();
    const preferenceKnown = !stillForReducedMotion || hydrated;
    const shouldLoad = nearView && preferenceKnown && !(stillForReducedMotion && reduced);

    useEffect(() => {
        if (eager) return;
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setNearView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "400px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [eager]);

    // autoPlay alone is unreliable when src arrives after mount. And if the
    // preference turns on while a clip is playing, stop it and go back to the
    // poster: dropping the src attribute on its own would leave it running.
    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        if (shouldLoad) {
            video.play().catch(() => {});
        } else if (video.currentSrc) {
            video.pause();
            video.removeAttribute("src");
            video.load();
        }
    }, [shouldLoad]);

    return (
        <video
            ref={ref}
            src={shouldLoad ? src : undefined}
            poster={poster}
            className={className}
            aria-label={label}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
        />
    );
}
