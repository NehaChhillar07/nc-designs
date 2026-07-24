"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

// The deck-shuffle animation from Namer UI's CircularTestimonials, autoplay
// only: the active card sits front and center, neighbors tuck behind it with
// a 3D tilt, and the deck shuffles forward on a timer instead of arrows.
// Each card renders as a training flashcard: tag chip, image, title, body.

export interface DeckCard {
    image: string;
    alt: string;
    tag?: string;
    title: string;
    body: string;
}

interface CircularCardDeckProps {
    cards: DeckCard[];
    /** ms between shuffles */
    autoplayInterval?: number;
    className?: string;
    cardWidth?: string;
    cardAspectRatio?: string;
    ariaLabel?: string;
}

// How far the front card lifts above the deck, scaled to the deck's width.
function calculateGap(width: number) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + ((maxGap - minGap) * (width - minWidth)) / (maxWidth - minWidth);
}

export function CircularCardDeck({
    cards,
    autoplayInterval = 4000,
    className,
    cardWidth = "77%",
    cardAspectRatio = "3 / 4",
    ariaLabel = "Auto-cycling card carousel",
}: CircularCardDeckProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const reduce = useReducedMotion();

    const animateCards = useCallback(
        (active: number) => {
            const container = containerRef.current;
            if (!container) return;

            const gapValue = calculateGap(container.offsetWidth);
            const maxLift = gapValue * 0.8;

            cards.forEach((_, index) => {
                const card = container.querySelector<HTMLElement>(`[data-index="${index}"]`);
                if (!card) return;

                let offset = index - active;
                if (offset > cards.length / 2) offset -= cards.length;
                if (offset < -cards.length / 2) offset += cards.length;

                const isActive = offset === 0;
                // The front card rises; the faded side cards stay low so they
                // never peek above the front card's top edge.
                const lift = `-${(maxLift / card.offsetHeight) * 100}%`;

                gsap.to(card, {
                    zIndex: cards.length - Math.abs(offset),
                    opacity: isActive ? 1 : 0.7,
                    scale: isActive ? 1 : 0.85,
                    x: isActive ? "0%" : offset > 0 ? "20%" : "-20%",
                    y: isActive ? lift : "0%",
                    rotateY: isActive ? 0 : offset > 0 ? -15 : 15,
                    duration: reduce ? 0 : 0.8,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            });
        },
        [cards, reduce],
    );

    // Shuffle the deck whenever the active card changes (and on mount).
    useEffect(() => {
        animateCards(activeIndex);
    }, [activeIndex, animateCards]);

    // Autoplay; reduced-motion users get a static deck.
    useEffect(() => {
        if (reduce || cards.length < 2) return;
        const timer = setInterval(() => {
            setActiveIndex((i) => (i + 1) % cards.length);
        }, autoplayInterval);
        return () => clearInterval(timer);
    }, [reduce, cards.length, autoplayInterval]);

    // Re-place the deck on resize; clean up tweens on unmount.
    useEffect(() => {
        const handleResize = () => animateCards(activeIndex);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            gsap.killTweensOf("[data-index]");
        };
    }, [activeIndex, animateCards]);

    return (
        <div
            ref={containerRef}
            role="img"
            aria-label={ariaLabel}
            className={cn("relative", className)}
            style={{ perspective: "1000px", aspectRatio: cardAspectRatio }}
        >
            {cards.map((card, index) => (
                <div
                    key={index}
                    data-index={index}
                    className="absolute inset-0 m-auto overflow-hidden rounded-2xl flex flex-col text-white"
                    style={{
                        width: cardWidth,
                        aspectRatio: cardAspectRatio,
                        background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                        boxShadow:
                            "0 16px 50px -16px rgba(17, 24, 39, 0.55), 0 30px 70px -30px rgba(17, 24, 39, 0.35)",
                        opacity: index === activeIndex ? 1 : 0.7,
                        zIndex: cards.length - Math.abs(index - activeIndex),
                    }}
                >
                    {card.tag && (
                        <div className="px-5 pt-4 mb-2">
                            <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 tracking-wide">
                                {card.tag}
                            </span>
                        </div>
                    )}

                    <div
                        className="relative mx-5 mb-3 rounded-xl overflow-hidden"
                        style={{ aspectRatio: "16 / 9" }}
                    >
                        <Image
                            src={card.image}
                            alt={card.alt}
                            fill
                            className="object-cover"
                            sizes="400px"
                            unoptimized
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.45) 100%)",
                            }}
                        />
                    </div>

                    <div className="px-5 pb-5 flex-1 flex flex-col">
                        <p className="text-sm md:text-base font-medium leading-snug mb-2">
                            {card.title}
                        </p>
                        <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                            {card.body}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
