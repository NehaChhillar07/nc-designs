"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import { cn } from "@/lib/utils";

export interface MagicTextProps {
    /** One paragraph, or several that reveal as one continuous top-to-bottom sequence */
    text: string | string[];
    /** Classes for the outer container (the scroll target, e.g. space-y-*) */
    className?: string;
    /** Classes for each paragraph (layout, padding, alignment) */
    paragraphClassName?: string;
    /** Classes for each word — overrides the default text-3xl font-semibold */
    wordClassName?: string;
}

interface WordProps {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
    className?: string;
}

const Word: React.FC<WordProps> = ({ children, progress, range, className }) => {
    const opacity = useTransform(progress, range, [0, 1]);

    return (
        <span className={cn("relative mt-[12px] mr-1 text-3xl font-semibold", className)}>
            <span className="absolute opacity-20">{children}</span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    );
};

export const MagicText: React.FC<MagicTextProps> = ({
    text,
    className,
    paragraphClassName,
    wordClassName,
}) => {
    const container = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        // End on the container's bottom edge so the last words of a tall
        // multi-paragraph block still reveal while they are on screen.
        offset: ["start 0.9", "end 0.6"],
    });

    const paragraphs = (Array.isArray(text) ? text : [text]).map((p) => p.split(" "));
    const totalWords = paragraphs.reduce((count, words) => count + words.length, 0);
    // How many words precede each paragraph, so ranges run continuously across all of them
    const paragraphStarts = paragraphs.map((_, i) =>
        paragraphs.slice(0, i).reduce((count, words) => count + words.length, 0)
    );

    return (
        <div ref={container} className={className}>
            {paragraphs.map((words, pIndex) => (
                <p key={pIndex} className={cn("flex flex-wrap leading-[0.5] p-4", paragraphClassName)}>
                    {words.map((word, wIndex) => {
                        const start = (paragraphStarts[pIndex] + wIndex) / totalWords;
                        const end = start + 1 / totalWords;

                        return (
                            <Word
                                key={wIndex}
                                progress={scrollYProgress}
                                range={[start, end]}
                                className={wordClassName}
                            >
                                {word}
                            </Word>
                        );
                    })}
                </p>
            ))}
        </div>
    );
};
