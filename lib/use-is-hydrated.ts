"use client";

import { useSyncExternalStore } from "react";

// "Has this component hydrated yet?" — the gate you need before rendering a
// React portal, since document does not exist on the server.
//
// The usual version of this is a useState(false) flipped to true inside a
// useEffect, which trips react-hooks/set-state-in-effect and costs an extra
// render pass. useSyncExternalStore expresses the same thing directly: React
// uses getServerSnapshot (false) for the server render AND for hydration, then
// re-renders with getSnapshot (true) once hydration finishes. No mismatch, no
// setState in an effect.
//
// The store never changes after mount, so subscribe is a no-op unsubscribe.

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useIsHydrated(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
