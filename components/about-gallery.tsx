"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Lightbox } from "@/components/ui/lightbox";
import { AboutImage } from "@/data/about-data";

// Blur placeholder for smooth image loading (prevents whitespace)
const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITETQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgARIUH/2gAMAwEAAhEDEEA/AKNzu1wvN2dc8r7kVtxQ2NKBSnaCQDnPOcnPFKUpSlKXAWMnZ//Z";

interface AboutGalleryProps {
    images: AboutImage[];
}

// Animation variants for staggered fade-in (optimized for performance)
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06, // Reduced for faster reveal
            delayChildren: 0.05,
        },
    },
};

const imageVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 8, // Smaller movement for subtler effect
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4, // Faster animation
            ease: "easeOut",
        },
    },
};

// Get aspect ratio class based on config
function getAspectRatioClass(aspectRatio: AboutImage["aspectRatio"]): string {
    switch (aspectRatio) {
        case "3:4":
        case "4:5":
            return "aspect-[3/4]";
        case "1:1":
            return "aspect-square";
        case "4:3":
            return "aspect-[4/3]";
        case "16:10":
            return "aspect-[16/10]";
        default:
            return "aspect-square";
    }
}

// Get size classes based on config
function getSizeClasses(size: AboutImage["size"]): string {
    switch (size) {
        case "large":
            return "col-span-2 row-span-2";
        case "medium":
            return "col-span-1 row-span-1";
        case "small":
            return "col-span-1 row-span-1";
        default:
            return "col-span-1 row-span-1";
    }
}

export function AboutGallery({ images }: AboutGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<{
        src: string;
        alt: string;
    } | null>(null);

    const openLightbox = (src: string, alt: string) => {
        setSelectedImage({ src, alt });
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <>
            {/* Desktop Collage Grid */}
            <motion.div
                className="hidden md:grid grid-cols-4 auto-rows-[120px] gap-4 w-full max-w-4xl"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {images.map((image, index) => {
                    // Get row and col span based on size - using inline styles for proper dynamic support
                    const rowSpan = image.size === "large" ? 3 : image.size === "medium" ? 2 : 1;
                    const colSpan = image.size === "large" ? 2 : 1;

                    return (
                        <motion.button
                            key={image.id}
                            variants={imageVariants}
                            className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group bg-gray-100"
                            style={{
                                rotate: `${image.rotation}deg`,
                                gridRow: `span ${rowSpan} / span ${rowSpan}`,
                                gridColumn: `span ${colSpan} / span ${colSpan}`,
                            }}
                            whileHover={{
                                rotate: 0,
                                scale: 1.02,
                                transition: { duration: 0.3, ease: "easeOut" },
                            }}
                            onClick={() => openLightbox(image.src, image.alt)}
                            aria-label={`View ${image.alt}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes={image.size === "large" ? "400px" : "200px"}
                                priority={index < 4}
                                placeholder="blur"
                                blurDataURL={BLUR_PLACEHOLDER}
                                loading={index < 4 ? "eager" : "lazy"}
                            />
                            {/* Subtle overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </motion.button>
                    );
                })}
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
                {images.map((image, index) => (
                    <motion.button
                        key={image.id}
                        variants={imageVariants}
                        className="relative flex-shrink-0 w-48 h-64 overflow-hidden rounded-xl shadow-md cursor-pointer bg-gray-100"
                        style={{ rotate: `${image.rotation}deg` }}
                        onClick={() => openLightbox(image.src, image.alt)}
                        aria-label={`View ${image.alt}`}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="200px"
                            priority={index < 4}
                            placeholder="blur"
                            blurDataURL={BLUR_PLACEHOLDER}
                            loading={index < 4 ? "eager" : "lazy"}
                        />
                    </motion.button>
                ))}
            </motion.div>

            {/* Lightbox */}
            <Lightbox
                isOpen={selectedImage !== null}
                onClose={closeLightbox}
                src={selectedImage?.src || ""}
                alt={selectedImage?.alt || ""}
            />

            {/* Hide scrollbar CSS */}
            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </>
    );
}
