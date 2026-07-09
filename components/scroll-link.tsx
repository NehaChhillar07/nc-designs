"use client";

import { scrollToSection } from "@/lib/scroll-to-section";

/**
 * In-page anchor that scrolls to a section using the reflow-aware helper, so it
 * lands accurately even while lazy sections are still settling. Use for
 * same-page section links inside Server Components (e.g. the hero arrow).
 */
export function ScrollLink({
  targetId,
  className,
  children,
  ariaLabel,
}: {
  targetId: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={`#${targetId}`}
      aria-label={ariaLabel}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(targetId);
        window.history.replaceState(null, "", `/#${targetId}`);
      }}
    >
      {children}
    </a>
  );
}
