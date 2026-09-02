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
                "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.15)] transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[14rem] after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:content-[''] hover:border-gray-300 hover:bg-white [&>*]:flex [&>*]:items-center [&>*]:gap-2",
                className
            )}
        >
            <div>
                <span
                    className="relative inline-flex h-7 w-7 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(255, 152, 0, 0.16)" }}
                >
                    {icon}
                </span>
                <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
            </div>
            <p className="whitespace-nowrap text-[15px] text-gray-700">{description}</p>
            <p className="text-sm text-gray-400">{date}</p>
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
