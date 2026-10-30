// The page grid for homepage 2.0. Spec mode draws exactly these classes, so
// content laid out with GRID and the redline columns can never drift apart.
// Lives outside spec-mode.tsx because that file is "use client", and a server
// component importing a constant from it would get a client reference, not
// the string.
export const GRID = "grid grid-cols-4 gap-x-4 px-4 md:grid-cols-12 md:gap-x-6 md:px-8";
