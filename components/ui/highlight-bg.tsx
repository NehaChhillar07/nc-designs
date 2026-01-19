"use client";

import { ReactNode } from "react";

interface HighlightBgProps {
    children: ReactNode;
    color?: string;
    rotation?: number;
    className?: string;
    paddingX?: number;
    paddingY?: number;
}

export function HighlightBg({
    children,
    color = "#000000",
    rotation = -2,
    className = "",
    paddingX = 8,
    paddingY = 4,
}: HighlightBgProps) {
    return (
        <span className={`relative inline-block ${className}`}>
            {/* Tilted rectangle background */}
            <span
                className="absolute inset-0 -z-10"
                style={{
                    backgroundColor: color,
                    transform: `rotate(${rotation}deg)`,
                    borderRadius: "0",
                    margin: `-${paddingY}px -${paddingX}px`,
                    padding: `${paddingY}px ${paddingX}px`,
                    width: `calc(100% + ${paddingX * 2}px)`,
                    height: `calc(100% + ${paddingY * 2}px)`,
                }}
            />
            {/* Text content */}
            <span className="relative z-10">{children}</span>
        </span>
    );
}
