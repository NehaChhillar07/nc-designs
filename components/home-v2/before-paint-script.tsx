"use client";

import { useIsHydrated } from "@/lib/use-is-hydrated";

// An inline script that runs before first paint, scoped to one page.
//
// A plain <script> in a component only executes when it arrives in the
// server's HTML. If React creates it in the browser (a client-side navigation
// to the page), it can't run, and React warns. So render it only in the
// server HTML and during hydration (where React adopts the existing node
// instead of creating one); on a client navigation, render nothing.
//
// Next's <Script strategy="beforeInteractive"> would also work, but it must
// live in the root layout, which /v2 doesn't touch. Callers must handle the
// navigation case themselves (the greeting skips when the script didn't run).
export function BeforePaintScript({ code }: { code: string }) {
    const hydrated = useIsHydrated();
    if (hydrated) return null;
    return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
