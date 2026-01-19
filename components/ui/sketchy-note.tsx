"use client";

import React from "react";
import { motion } from "framer-motion";

interface SketchyNoteProps {
    text: string;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    arrowDirection?: "left" | "right" | "up" | "down";
    className?: string;
    color?: string;
}

// SVG paths for hand-drawn style arrows
const arrowPaths = {
    left: "M 60 25 Q 35 20 15 30 Q 8 35 5 38 M 5 38 L 12 32 M 5 38 L 10 45",
    right: "M 5 25 Q 30 20 50 30 Q 57 35 60 38 M 60 38 L 53 32 M 60 38 L 55 45",
    up: "M 30 55 Q 25 35 35 15 Q 38 8 40 5 M 40 5 L 34 12 M 40 5 L 47 10",
    down: "M 30 5 Q 25 25 35 45 Q 38 52 40 55 M 40 55 L 34 48 M 40 55 L 47 50",
};

// Curvy loopy arrow like in the reference image
const loopyArrow = "M 10 40 C 5 25 25 10 40 20 C 55 30 35 50 25 45 C 15 40 20 30 35 35 L 45 50 M 45 50 L 38 45 M 45 50 L 48 42";

export function SketchyNote({
    text,
    position = "top-left",
    arrowDirection = "down",
    className = "",
    color = "#4a5568",
}: SketchyNoteProps) {
    const positionStyles = {
        "top-left": "top-0 left-0 -translate-y-full -ml-4",
        "top-right": "top-0 right-0 -translate-y-full -mr-4",
        "bottom-left": "bottom-0 left-0 translate-y-full -ml-4",
        "bottom-right": "bottom-0 right-0 translate-y-full -mr-4",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`absolute flex items-center gap-2 ${positionStyles[position]} ${className}`}
            style={{ zIndex: 10 }}
        >
            {/* Loopy SVG Arrow */}
            <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                className="flex-shrink-0"
                style={{ transform: arrowDirection === "right" ? "scaleX(-1)" : "none" }}
            >
                <motion.path
                    d={loopyArrow}
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                />
            </svg>

            {/* Hand-drawn style text */}
            <p
                className="text-sm italic max-w-[200px] leading-snug"
                style={{
                    fontFamily: "var(--font-caveat), cursive",
                    fontSize: "18px",
                    color: color,
                }}
            >
                {text}
            </p>
        </motion.div>
    );
}

// Simple arrow pointing to an element
export function SketchyArrow({
    direction = "down",
    color = "#4a5568",
    className = "",
}: {
    direction?: "left" | "right" | "up" | "down";
    color?: string;
    className?: string;
}) {
    return (
        <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            className={`flex-shrink-0 ${className}`}
        >
            <motion.path
                d={arrowPaths[direction]}
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />
        </svg>
    );
}
