"use client";

// A phone screen as a print: a cream border, the screen with rounded corners,
// a mono caption and an optional stamp, at a resting tilt. For tall
// captures (unsaid, Airtel), where PrintFigure's wide frame doesn't fit.
// A recording plays muted while on screen; reduced motion shows its poster.

import Image from "next/image";

import { cn } from "@/lib/utils";

import { PrintVideo, Stamp } from "./cs-kit";

export function PhonePrint({
    src,
    alt,
    w,
    h,
    video,
    caption,
    stamp,
    tilt = 0,
    priority,
    sizes = "(min-width: 768px) 320px, 70vw",
    className,
}: {
    src: string;
    alt: string;
    w: number;
    h: number;
    /** A recording; src is then its poster. */
    video?: string;
    caption?: string;
    stamp?: string;
    tilt?: number;
    priority?: boolean;
    sizes?: string;
    className?: string;
}) {
    return (
        <figure className={cn("relative mx-auto w-full max-w-[320px]", className)} style={{ rotate: `${tilt}deg` }}>
            <div className="bg-[#f7f3ec] p-2 pb-0 shadow-[0_30px_50px_-30px_rgba(60,10,12,0.6)]">
                {video ? (
                    <PrintVideo shot={{ src, alt, w, h, bar: "", video }} className="block h-auto w-full rounded-[18px]" />
                ) : (
                    <Image src={src} alt={alt} width={w} height={h} sizes={sizes} priority={priority} className="block h-auto w-full rounded-[18px]" />
                )}
                {caption && <figcaption className="v2-mono flex min-h-9 items-center px-1 py-2 text-[11px] text-[var(--v2-ink)] md:text-[12px]">{caption}</figcaption>}
            </div>
            {stamp && <Stamp className="absolute -top-3 right-3">{stamp}</Stamp>}
        </figure>
    );
}
