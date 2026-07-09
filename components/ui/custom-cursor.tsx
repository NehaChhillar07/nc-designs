"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useCursorOptional } from "./cursor-context";

// Elements that should turn the arrow orange on hover.
const CLICKABLE_SELECTOR =
  "a, button, [data-clickable], input[type='submit'], input[type='button'], [role='button']";

// Follow smoothing. 1 = locks to the pointer with no trail; lower = more trail.
// 0.35 keeps a light, buttery follow without reading as laggy.
const EASE = 0.35;

// The custom cursor runs only with a fine pointer and no reduced-motion
// preference. We read those via matchMedia through useSyncExternalStore so the
// value is SSR-safe and updates live if the user plugs in a mouse or toggles
// their reduced-motion setting.
function subscribeToEnvironment(onChange: () => void) {
  const queries = [
    window.matchMedia("(pointer: coarse)"),
    window.matchMedia("(prefers-reduced-motion: reduce)"),
  ];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

function getEnabledSnapshot() {
  const isTouch =
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return !isTouch && !reducedMotion;
}

// Never active during SSR — keeps the native cursor until the client decides.
function getEnabledServerSnapshot() {
  return false;
}

export function CustomCursor() {
  // The moving node is positioned via a ref + direct transform, never React
  // state, so pointer movement does not re-render the component.
  const rootRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const enabled = useSyncExternalStore(
    subscribeToEnvironment,
    getEnabledSnapshot,
    getEnabledServerSnapshot,
  );

  // Reads context when inside a CursorProvider, null otherwise.
  const cursorContext = useCursorOptional();
  const tagText = cursorContext?.tagText ?? null;
  const isTagVariant = cursorContext?.variant === "tag" && !!tagText;
  const showOrange = isHovering && !isTagVariant;

  // Hide the native cursor only while the custom one is active. Single source
  // of truth for the data-cursor attribute the CSS in globals.css keys off.
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.setAttribute("data-cursor", "none");
      return () => root.removeAttribute("data-cursor");
    }
    // Disabled (touch or reduced-motion): fully restore the native cursor,
    // including the inline styles and <style> tag the layout FOUC script may
    // have applied before this component decided the cursor should stay.
    root.removeAttribute("data-cursor");
    root.style.removeProperty("cursor");
    document.body.style.removeProperty("cursor");
    document.getElementById("cursor-hide-style")?.remove();
  }, [enabled]);

  // Pointer tracking + hover detection. All position work happens on the DOM
  // node directly inside one rAF loop — no per-frame React state.
  useEffect(() => {
    if (!enabled) return;
    const el = rootRef.current;
    if (!el) return;

    let rafId = 0;
    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;
    let focused = document.hasFocus();

    const parkOffscreen = () => {
      targetX = -100;
      targetY = -100;
    };

    const handleMove = (e: MouseEvent) => {
      if (!focused) return;
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // Hover changes only when the pointer crosses an element boundary, so this
    // is far cheaper than an elementFromPoint() probe on every mousemove.
    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setIsHovering(!!target?.closest(CLICKABLE_SELECTOR));
    };

    const handleLeave = () => {
      parkOffscreen();
      setIsHovering(false);
    };

    const handleBlur = () => {
      focused = false;
      parkOffscreen();
      currentX = -100;
      currentY = -100;
      setIsHovering(false);
    };

    const handleFocus = () => {
      focused = true;
      parkOffscreen();
    };

    const handleVisibility = () => {
      if (document.hidden) handleBlur();
    };

    const tick = () => {
      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;
      // transform + translate3d keeps this on the GPU compositor (no layout).
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);

    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  const defaultColor = "#000000";
  const hoverColor = "#C96114";

  return (
    <>
      <div
        ref={rootRef}
        className="custom-cursor-root"
        aria-hidden="true"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {isTagVariant ? (
          <div className="custom-cursor-tag">{tagText}</div>
        ) : (
          <svg
            className="custom-cursor-arrow"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 3.21V20.8C5.5 21.39 6.19 21.72 6.63 21.35L11.24 17.28L15.39 20.49C15.61 20.66 15.92 20.69 16.18 20.56L21.18 18.06C21.68 17.81 21.75 17.13 21.32 16.79L6.63 4.55C6.19 4.18 5.5 4.51 5.5 5.1V3.21Z"
              fill={showOrange ? hoverColor : defaultColor}
            />
          </svg>
        )}
      </div>

      <style jsx global>{`
        .custom-cursor-root {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
        }

        .custom-cursor-arrow {
          display: block;
          transform: translate(-2px, -2px);
        }

        .custom-cursor-tag {
          transform: translate(-50%, -50%);
          padding: 6px 14px;
          border: 1.5px solid #000;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.95);
          color: #000;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
          white-space: nowrap;
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}
