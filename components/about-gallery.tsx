"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { AboutMedia, allAboutMedia } from "@/data/about-data";
import { PixelImage } from "@/components/ui/pixel-image";

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
            <video
                src={media.src}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
            />
        );
    }

    return (
        <PixelImage
            src={media.src}
            alt={media.alt}
            customGrid={{ rows: 4, cols: 6 }}
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

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Get initial media (images first, then videos)
function getInitialMedia(): AboutMedia[] {
    const images = allAboutMedia.filter(m => m.type === "image");
    const videos = allAboutMedia.filter(m => m.type === "video");
    return [...images, ...videos];
}

// Frame configuration for 10 frames
const frameConfigs = [
    { width: 220, height: 300, rotate: -2 },
    { width: 220, height: 180, rotate: 2 },
    { width: 180, height: 240, rotate: 1 },
    { width: 180, height: 220, rotate: -1 },
    { width: 260, height: 340, rotate: -1 },
    { width: 260, height: 160, rotate: 2 },
    { width: 180, height: 200, rotate: -2 },
    { width: 180, height: 260, rotate: 1 },
    { width: 200, height: 280, rotate: 2 },
    { width: 200, height: 200, rotate: -1 },
];

export function AboutGallery() {
    const [displayMedia, setDisplayMedia] = useState<AboutMedia[]>(getInitialMedia);

    useEffect(() => {
        const images = allAboutMedia.filter(m => m.type === "image");
        const videos = allAboutMedia.filter(m => m.type === "video");
        const shuffledImages = shuffleArray(images);
        const shuffledVideos = shuffleArray(videos);
        setDisplayMedia([...shuffledImages, ...shuffledVideos]);
    }, []);

    const media = displayMedia.slice(0, 10);

    return (
        <>
            {/* Desktop: 5-column Masonry Collage with 10 frames */}
            <motion.div
                className="hidden md:flex gap-3 w-full max-w-6xl mx-auto justify-center items-start"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {/* Column 1 */}
                <div className="flex flex-col gap-3">
                    {media[0] && (
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gray-200"
                            style={{ width: frameConfigs[0].width, height: frameConfigs[0].height, rotate: `${frameConfigs[0].rotate}deg` }}
                            whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                        >
                            <MediaItem media={media[0]} />
                            {media[0].type === "video" && <VideoIndicator />}
                        </motion.div>
                    )}
                    {media[1] && (
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gray-200"
                            style={{ width: frameConfigs[1].width, height: frameConfigs[1].height, rotate: `${frameConfigs[1].rotate}deg` }}
                            whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                        >
                            <MediaItem media={media[1]} />
                            {media[1].type === "video" && <VideoIndicator />}
                        </motion.div>
                    )}
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-3 mt-8">
                    {media[2] && (
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gray-200"
                            style={{ width: frameConfigs[2].width, height: frameConfigs[2].height, rotate: `${frameConfigs[2].rotate}deg` }}
                            whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                        >
                            <MediaItem media={media[2]} />
                            {media[2].type === "video" && <VideoIndicator />}
                        </motion.div>
                    )}
                    {media[3] && (
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gray-200"
                            style={{ width: frameConfigs[3].width, height: frameConfigs[3].height, rotate: `${frameConfigs[3].rotate}deg` }}
                            whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                        >
                            <MediaItem media={media[3]} />
                            {media[3].type === "video" && <VideoIndicator />}
                        </motion.div>
                    )}
                </div>

                {/* Column 3 - Center (bigger frames) */}
                <div className="flex flex-col gap-3">
                    {media[4] && (
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gray-200"
                            style={{ width: frameConfigs[4].width, height: frameConfigs[4].height, rotate: `${frameConfigs[4].rotate}deg` }}
                            whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                        >
                            <MediaItem media={media[4]} />
                            {media[4].type === "video" && <VideoIndicator />}
                        </motion.div>
                    )}
                    {media[5] && (
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gray-200"
                            style={{ width: frameConfigs[5].width, height: frameConfigs[5].height, rotate: `${frameConfigs[5].rotate}deg` }}
                            whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                        >
                            <MediaItem media={media[5]} />
                            {media[5].type === "video" && <VideoIndicator />}
                        </motion.div>
                    )}
                </div>

                {/* Column 4 */}
                <div className="flex flex-col gap-3 mt-12">
                    {media[6] && (
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gray-200"
                            style={{ width: frameConfigs[6].width, height: frameConfigs[6].height, rotate: `${frameConfigs[6].rotate}deg` }}
                            whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                        >
                            <MediaItem media={media[6]} />
                            {media[6].type === "video" && <VideoIndicator />}
                        </motion.div>
                    )}
                    {media[7] && (
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gray-200"
                            style={{ width: frameConfigs[7].width, height: frameConfigs[7].height, rotate: `${frameConfigs[7].rotate}deg` }}
                            whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                        >
                            <MediaItem media={media[7]} />
                            {media[7].type === "video" && <VideoIndicator />}
                        </motion.div>
                    )}
                </div>

                {/* Column 5 */}
                <div className="flex flex-col gap-3 mt-4">
                    {media[8] && (
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gray-200"
                            style={{ width: frameConfigs[8].width, height: frameConfigs[8].height, rotate: `${frameConfigs[8].rotate}deg` }}
                            whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                        >
                            <MediaItem media={media[8]} />
                            {media[8].type === "video" && <VideoIndicator />}
                        </motion.div>
                    )}
                    {media[9] && (
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gray-200"
                            style={{ width: frameConfigs[9].width, height: frameConfigs[9].height, rotate: `${frameConfigs[9].rotate}deg` }}
                            whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                        >
                            <MediaItem media={media[9]} />
                            {media[9].type === "video" && <VideoIndicator />}
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Mobile Horizontal Scroll */}
            <motion.div
                className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {media.slice(0, 6).map((item, index) => (
                    <motion.div
                        key={`mobile-${item.id}`}
                        variants={itemVariants}
                        className="relative flex-shrink-0 w-36 h-48 overflow-hidden rounded-2xl shadow-md bg-gray-200"
                        style={{ rotate: `${(index % 2 === 0 ? -2 : 2)}deg` }}
                    >
                        <MediaItem media={item} />
                        {item.type === "video" && <VideoIndicator />}
                    </motion.div>
                ))}
            </motion.div>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
        </>
    );
}
