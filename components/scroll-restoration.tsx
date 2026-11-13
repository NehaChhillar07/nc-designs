"use client";

// Reloads must start at the top. Restoring a mid-page offset lands on lazy
// sections that are still short placeholders, so the page reflows under the
// viewport for a second or two. Set when this module loads, before hydration.
if (typeof window !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

export function ScrollRestoration() {
  return null;
}
