"use client";

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";

type CursorVariant = "default" | "hover" | "tag";

interface CursorContextType {
    variant: CursorVariant;
    tagText: string | null;
    setCursor: (variant: CursorVariant, tagText?: string | null) => void;
    resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
    const [variant, setVariant] = useState<CursorVariant>("default");
    const [tagText, setTagText] = useState<string | null>(null);

    // Stable identities: consumers keep these in effect deps (e.g. an
    // unmount-only cleanup that calls resetCursor). If they were recreated on
    // every render, each setCursor would re-run those cleanups and instantly
    // reset the cursor back to default.
    const setCursor = useCallback((newVariant: CursorVariant, newTagText: string | null = null) => {
        setVariant(newVariant);
        setTagText(newTagText);
    }, []);

    const resetCursor = useCallback(() => {
        setVariant("default");
        setTagText(null);
    }, []);

    const value = useMemo(
        () => ({ variant, tagText, setCursor, resetCursor }),
        [variant, tagText, setCursor, resetCursor]
    );

    return (
        <CursorContext.Provider value={value}>
            {children}
        </CursorContext.Provider>
    );
}

export function useCursor() {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error("useCursor must be used within a CursorProvider");
    }
    return context;
}

// Non-throwing reader for consumers (e.g. the cursor itself) that may render
// outside a CursorProvider. Returns null instead of throwing.
export function useCursorOptional() {
    return useContext(CursorContext);
}
