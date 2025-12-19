"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);

    if (isTouch) return;

    let rafId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".tool-bubble") || target.closest("a") || target.closest("button")) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".tool-bubble") || target.closest("a") || target.closest("button")) {
        setIsHovering(false);
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
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      <style jsx>{`
        .custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(0, 0, 0, 0.3);
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.2s ease, opacity 0.2s ease;
          mix-blend-mode: difference;
        }

        @media (prefers-reduced-motion: reduce) {
          .custom-cursor {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
