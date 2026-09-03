"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Measures how long each page is actually visible and reports it to
// /api/t when the visitor navigates away or hides the tab. Vercel
// Analytics counts views; this covers the time-on-page half. Time only
// accumulates while the tab is visible, so a backgrounded tab adds
// nothing.
export function TimeTracker() {
  const pathname = usePathname();
  const state = useRef({ path: "", visibleSince: 0, accumulated: 0 });

  useEffect(() => {
    const s = state.current;

    const flush = () => {
      if (s.visibleSince > 0) {
        s.accumulated += performance.now() - s.visibleSince;
        s.visibleSince = document.visibilityState === "visible" ? performance.now() : 0;
      }
      const ms = Math.min(Math.round(s.accumulated), 30 * 60 * 1000);
      s.accumulated = 0;
      if (ms < 1000 || !s.path) return;
      let sid = "";
      try {
        sid = sessionStorage.getItem("t_sid") || "";
        if (!sid) {
          sid = Math.random().toString(36).slice(2, 10);
          sessionStorage.setItem("t_sid", sid);
        }
      } catch {
        sid = "anon";
      }
      const body = JSON.stringify({ p: s.path, d: ms, s: sid });
      try {
        if (!navigator.sendBeacon("/api/t", body)) {
          fetch("/api/t", { method: "POST", body, keepalive: true });
        }
      } catch {
        /* tracking must never break the page */
      }
    };

    // Route change: report the previous page, start the clock on this one.
    flush();
    s.path = pathname;
    s.accumulated = 0;
    s.visibleSince = document.visibilityState === "visible" ? performance.now() : 0;

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        // Mobile browsers kill tabs without pagehide, so report on hide.
        flush();
        s.visibleSince = 0;
      } else {
        s.visibleSince = performance.now();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
    };
  }, [pathname]);

  return null;
}
