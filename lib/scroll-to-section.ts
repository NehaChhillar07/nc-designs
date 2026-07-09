import { useEffect } from "react";

// Height of the fixed header (h-16 = 64px). Keep in sync with components/header.tsx.
const HEADER_OFFSET = 64;

let activeRaf: number | null = null;

/**
 * Smooth-scroll to a section by id using a manual requestAnimationFrame tween.
 *
 * Why not CSS `scroll-behavior: smooth` / `scrollTo({ behavior: "smooth" })`?
 * The Work section pins its image with GSAP ScrollTrigger, and GSAP is
 * incompatible with the browser's native smooth scrolling — the pin logic
 * cancels the browser's scroll animation as it passes through the pinned range,
 * so any nav jump that travels past Work used to stall in the middle of it and
 * land in the wrong place.
 *
 * Writing scrollTop ourselves every frame is authoritative: ScrollTrigger just
 * follows along as it would for a fast manual scroll. The target is recomputed
 * each frame so it stays correct even if content reflows mid-scroll.
 */
export function scrollToSection(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const getTarget = () =>
    Math.max(0, window.scrollY + el.getBoundingClientRect().top - HEADER_OFFSET);

  if (activeRaf !== null) cancelAnimationFrame(activeRaf);

  const startY = window.scrollY;
  const startTarget = getTarget();
  const distance = Math.abs(startTarget - startY);
  // Scale duration with distance so short and long jumps both feel natural.
  const duration = Math.min(1100, Math.max(450, distance * 0.5));
  const startTime = performance.now();
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const step = (now: number) => {
    const t = Math.min(1, (now - startTime) / duration);
    const target = getTarget(); // recompute -> self-correct if layout shifts
    window.scrollTo(0, startY + (target - startY) * easeOutCubic(t));
    if (t < 1) {
      activeRaf = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, getTarget()); // exact final snap
      activeRaf = null;
    }
  };

  activeRaf = requestAnimationFrame(step);
}

/**
 * On mount, if the URL carries a section hash (e.g. arriving at "/#work" from
 * another page), scroll to that section once the DOM is painted.
 */
export function useHashScrollOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    // Wait a frame so lazily-mounted sections exist before we measure.
    const raf = window.requestAnimationFrame(() => scrollToSection(id));
    return () => window.cancelAnimationFrame(raf);
  }, []);
}
