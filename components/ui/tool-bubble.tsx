"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./tool-bubble.module.css";

interface ToolBubbleProps {
  icon: ReactNode;
  label: string;
  delay?: number;
  size?: number;
  index?: number;
  waveOffset?: number;
  animationIntensity?: number;
  animationDuration?: number;
  usageNote?: string;
}

export function ToolBubble({
  icon,
  label,
  delay = 0,
  size = 96,
  index = 0,
  waveOffset = 0,
  animationIntensity = 12,
  animationDuration = 2.5,
  usageNote
}: ToolBubbleProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseEnter = () => {
    if (bubbleRef.current) {
      const rect = bubbleRef.current.getBoundingClientRect();
      // Use viewport coordinates for fixed positioning
      setTooltipPosition({
        top: rect.top - 10,
        left: rect.left + rect.width / 2,
      });
    }
    setShowTooltip(true);
  };

  return (
    <div
      ref={bubbleRef}
      className={styles.wrapper}
      style={
        {
          "--wave-offset": `${waveOffset}px`,
        } as React.CSSProperties
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={styles.bubble}
        style={
          {
            "--delay": `${delay}s`,
            "--size": `${size}px`,
            "--intensity": `${animationIntensity}px`,
            "--duration": `${animationDuration}s`,
          } as React.CSSProperties
        }
        aria-label={label}
        role="img"
      >
        <div className={styles.inner}>
          {icon}
        </div>
      </div>

      {usageNote && showTooltip && isMounted && createPortal(
        <div
          className={styles.portalTooltip}
          style={{
            position: 'fixed',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: 'translate(-50%, -100%)',
            zIndex: 99999,
          }}
        >
          <div className={styles.tooltipContent}>
            {usageNote}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
