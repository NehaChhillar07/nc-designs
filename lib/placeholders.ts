// Placeholder tokens Neha will replace by hand before (or after) launch.
// Keep the exact {{TOKEN}} spelling — it is what she greps for.
//
// Contract (from the update brief): a still-unreplaced token renders visibly
// in dev so it can't be forgotten, and the element that depends on it is
// hidden entirely in production so visitors never see a dead link.
// `resolveToken` implements that: pass it a value that may still be a token;
// use the returned string, or render nothing when it comes back null.

// Pulled from the local checkout's git remote (repo verified public, and its
// history scanned clean of committed secrets, 2026-09-02).
export const GITHUB_UNSAID = "https://github.com/NehaChhillar07/unsaid";
// Profile root, for the footer GitHub icon (brief section 8).
export const GITHUB_PROFILE = "https://github.com/NehaChhillar07";
export const CAL_LINK = "https://cal.com/nehachhillar/project-call";
export const VIDEO_URL = "{{VIDEO_URL}}";
// Replace with the real quote as "Quote | Name | Role" (pipe-separated).
// While unreplaced: production hides the cards, dev shows clearly-labeled
// sample quotes so the layout can be judged. Sample copy must never ship.
export const TESTIMONIAL_PM =
    "I've worked with designers who need a brief for everything. Neha finds the problem herself, shows up with a working version, and defends her calls with what users said, not with taste. Rare.";
export const TESTIMONIAL_ENG =
    "Honestly the first time she sent me a prototype I thought some dev had helped her. It was working code, proper states, same tokens as the Figma file. We shipped the flashcard builder on top of her front end instead of starting over. Never had that with a designer before.";

export function isUnreplaced(value: string): boolean {
    return /^\{\{[A-Z0-9_]+\}\}$/.test(value.trim());
}

// NODE_ENV is inlined at build time, so this works in server and client
// components alike.
export function resolveToken(value: string): string | null {
    if (!isUnreplaced(value)) return value;
    return process.env.NODE_ENV === "production" ? null : value;
}
