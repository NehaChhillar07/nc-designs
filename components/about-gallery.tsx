"use client";

import { motion, type Variants } from "motion/react";
import { AboutMedia, aboutStripMedia } from "@/data/about-data";
import { PixelImage } from "@/components/ui/pixel-image";
import { LazyVideo } from "@/components/ui/lazy-video";

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

// Media item component
function MediaItem({ media }: { media: AboutMedia }) {
    if (media.type === "video") {
        return (
            <LazyVideo
                src={media.src}
                className="absolute inset-0 w-full h-full object-cover"
            />
        );
    }

    return (
        <PixelImage
            src={media.src}
            alt={media.alt}
            customGrid={{ rows: 4, cols: 6 }}
            sizes="160px"
            grayscaleAnimation
            pixelFadeInDuration={800}
            maxAnimationDelay={1000}
            colorRevealDelay={1200}
            className="absolute inset-0 w-full h-full [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:rounded-none"
        />
    );
}

// Video indicator
function VideoIndicator() {
    return (
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full p-1.5 z-10">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
        </div>
    );
}

// Horizontal strip of the moments not cast in the scroll choreography.
// Centers when it fits, scrolls horizontally when it doesn't.
export function AboutMomentsStrip() {
    return (
        <>
            <motion.div
                className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                <div className="flex gap-4 w-max mx-auto">
                    {aboutStripMedia.map((item, index) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="relative flex-shrink-0 w-36 h-48 md:w-40 md:h-56 overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-200"
                            style={{ rotate: `${index % 2 === 0 ? -2 : 2}deg` }}
                            whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
                        >
                            <MediaItem media={item} />
                            {item.type === "video" && <VideoIndicator />}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
        </>
    );
}
