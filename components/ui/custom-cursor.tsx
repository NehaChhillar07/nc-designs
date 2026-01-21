"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import { useCursor } from "./cursor-context";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true to prevent flash

  // Try to use context, but provide fallback for when not in provider
  let cursorContext: { variant: string; tagText: string | null } | null = null;
  try {
    cursorContext = useCursor();
  } catch {
    // Not wrapped in CursorProvider, use local state only
  }

  const variant = cursorContext?.variant || (isHovering ? "hover" : "default");
  const tagText = cursorContext?.tagText || null;

  // Detect touch device immediately on mount and set data attribute
  useLayoutEffect(() => {
    // Check if device is touch-enabled using multiple methods
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    setIsTouchDevice(isTouch);
    setIsMounted(true);

    // Set data-cursor attribute on html element for CSS cursor hiding
    // This is the single source of truth for cursor visibility
    if (!isTouch) {
      document.documentElement.setAttribute('data-cursor', 'none');
    } else {
      document.documentElement.removeAttribute('data-cursor');
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.removeAttribute('data-cursor');
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice || !isMounted) return;

    let rafId: number;
    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;
    let isWindowFocused = document.hasFocus();

    const isClickableElement = (element: Element | null): boolean => {
      if (!element) return false;
      return !!(
        element.closest("a") ||
        element.closest("button") ||
        element.closest("[data-clickable]") ||
        element.closest("input[type='submit']") ||
        element.closest("input[type='button']")
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isWindowFocused) return;
      targetX = e.clientX;
      targetY = e.clientY;

      // Check hover state based on element under cursor
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      const shouldHover = isClickableElement(elementUnderCursor);
      setIsHovering(shouldHover);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      // Move cursor off-screen when mouse leaves
      targetX = -100;
      targetY = -100;
    };

    // Handle window focus/blur to prevent double cursor
    const handleWindowBlur = () => {
      isWindowFocused = false;
      // Move cursor off-screen when window loses focus
      targetX = -100;
      targetY = -100;
      currentX = -100;
      currentY = -100;
      setPosition({ x: -100, y: -100 });
      setIsHovering(false);
    };

    const handleWindowFocus = () => {
      isWindowFocused = true;
      // Keep cursor hidden until mouse moves
      targetX = -100;
      targetY = -100;
    };

    // Handle visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleWindowBlur();
      }
    };

    const updateCursor = () => {
      // Smooth easing
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      setPosition({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateCursor);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(rafId);
    };
  }, [isTouchDevice, isMounted]);

  // Don't render on touch devices or before mount
  if (isTouchDevice || !isMounted) return null;

  // Colors
  const defaultColor = "#000000";
  const hoverColor = "#C96114";

  // Determine cursor style based on variant and hover state
  const isTagVariant = cursorContext?.variant === "tag" && cursorContext?.tagText;

  // Hover state (orange) should work regardless of context variant
  // Only show tag when in tag mode, otherwise show arrow (black or orange based on hover)
  const showOrangeColor = isHovering && !isTagVariant;

  return (
    <>
      {/* Default/Hover Arrow Pointer */}
      {!isTagVariant && (
        <svg
          className="custom-cursor-arrow"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 3.21V20.8C5.5 21.39 6.19 21.72 6.63 21.35L11.24 17.28L15.39 20.49C15.61 20.66 15.92 20.69 16.18 20.56L21.18 18.06C21.68 17.81 21.75 17.13 21.32 16.79L6.63 4.55C6.19 4.18 5.5 4.51 5.5 5.1V3.21Z"
            fill={showOrangeColor ? hoverColor : defaultColor}
          />
        </svg>
      )}

      {/* Tag Capsule */}
      {isTagVariant && (
        <div
          className="custom-cursor-tag"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `translate(-50%, -50%)`,
          }}
        >
          {tagText}
        </div>
      )}

      <style jsx global>{`
        .custom-cursor-arrow {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-2px, -2px);
          will-change: left, top;
        }

        .custom-cursor-tag {
          position: fixed;
          padding: 6px 14px;
          border: 1.5px solid #000;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.95);
          color: #000;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
          white-space: nowrap;
          pointer-events: none;
          z-index: 9999;
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          will-change: left, top;
        }

        @media (pointer: coarse), (hover: none) {
          .custom-cursor-arrow,
          .custom-cursor-tag {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .custom-cursor-arrow,
          .custom-cursor-tag {
            display: none;
          }
        }

        /* NUCLEAR CURSOR HIDING */
        /* Only apply when data-cursor attribute is present (non-touch devices) */
        :root[data-cursor="none"],
        :root[data-cursor="none"] body,
        :root[data-cursor="none"] * {
          cursor: none !important;
        }

        /* Specific overrides for stubborn elements */
        :root[data-cursor="none"] a,
        :root[data-cursor="none"] button,
        :root[data-cursor="none"] input,
        :root[data-cursor="none"] select,
        :root[data-cursor="none"] textarea,
        :root[data-cursor="none"] iframe,
        :root[data-cursor="none"] .cursor-pointer,
        :root[data-cursor="none"] [role="button"] {
          cursor: none !important;
        }
        
        /* Ensure specific header and fixed elements don't override */
        :root[data-cursor="none"] header,
        :root[data-cursor="none"] nav,
        :root[data-cursor="none"] .fixed,
        :root[data-cursor="none"] .sticky {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
