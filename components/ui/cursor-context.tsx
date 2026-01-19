"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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

    const setCursor = (newVariant: CursorVariant, newTagText: string | null = null) => {
        setVariant(newVariant);
        setTagText(newTagText);
    };

    const resetCursor = () => {
        setVariant("default");
        setTagText(null);
    };

    return (
        <CursorContext.Provider value={{ variant, tagText, setCursor, resetCursor }}>
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
