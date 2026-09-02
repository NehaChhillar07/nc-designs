"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

// Stacked, skewed display cards with the right-edge fade (from 21st.dev's
// display-cards by @Codehagen), adapted from its dark shadcn theme to this
// site's light ground and warm palette: white card surfaces, gray hairlines,
// the fade runs to white, and back cards sit dimmed (not grayscaled to
// nothing) until hovered forward.

interface DisplayCardProps {
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    date?: string;
    titleClassName?: string;
}

function DisplayCard({
    className,
    icon = <Sparkles className="size-4" style={{ color: "#B45309" }} />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    titleClassName = "text-gray-900",
}: DisplayCardProps) {
    return (
        <div
            className={cn(
                // overflow-hidden clips long nowrap descriptions at the card
                // edge so the right-edge gradient fades them out (the source
                // component assumed short one-liners and let them spill).
                // No truncation: the description wraps and the card grows to
                // fit the whole quote (Neha: the entire comment must be
                // readable). Gentler skew keeps long text comfortable.
                "relative flex w-[26rem] -skew-y-[6deg] select-none flex-col gap-4 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.15)] transition-all duration-700 hover:border-gray-300",
                className
            )}
        >
            <div className="flex items-center gap-3">
                <span
                    className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full"
                    style={{ backgroundColor: "rgba(255, 152, 0, 0.16)" }}
                >
                    {icon}
                </span>
                <p className={cn("text-xl font-semibold", titleClassName)}>{title}</p>
            </div>
            <p className="text-[15.5px] leading-relaxed text-gray-800">{description}</p>
            <p className="text-sm text-gray-500">{date}</p>
        </div>
    );
}

interface DisplayCardsProps {
    cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
    const defaultCards: DisplayCardProps[] = [
        {
            className:
                "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[''] before:bg-white/60 before:transition-opacity before:duration-700 hover:before:opacity-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-16 translate-y-10 hover:translate-y-4",
        },
    ];

    const displayCards = cards || defaultCards;

    return (
        <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
            {displayCards.map((cardProps, index) => (
                <DisplayCard key={index} {...cardProps} />
            ))}
        </div>
    );
}
