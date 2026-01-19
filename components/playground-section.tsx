"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// Blur placeholder for smooth image loading (prevents whitespace)
const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITETQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgARIUH/2gAMAwEAAhEDEEA/AKNzu1wvN2dc8r7kVtxQ2NKBSnaCQDnPOcnPFKUpSlKXAWMnZ//Z";

// ============================================
// PLAYGROUND DATA - Side projects & experiments
// ============================================
const playgroundItems = [
    {
        id: 1,
        title: "Generative Art Lab",
        category: "Creative Coding",
        description: "Algorithmic patterns and flowing gradients created through code. Exploring the beauty of procedural generation.",
        image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=500&fit=crop",
    },
    {
        id: 2,
        title: "Motion Playground",
        category: "Animation",
        description: "Micro-interactions, spring physics, and delightful transitions. The small details that make interfaces feel alive.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    },
    {
        id: 3,
        title: "AI Sketch Canvas",
        category: "Experimental Art",
        description: "Blending human creativity with machine intelligence. Hand-drawn concepts enhanced by AI imagination.",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=500&fit=crop",
    },
];

export function PlaygroundSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

    const checkScrollPosition = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    };

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const cardWidth = 700; // Approximate card width + gap
        const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

        container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });

        // Check scroll position after animation
        setTimeout(checkScrollPosition, 400);
    };

    const openModal = (image: string, title: string) => {
        setSelectedImage({ src: image, title });
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = "";
    };

    return (
        <>
            <section
                className="py-16 md:py-24 relative overflow-hidden bg-zinc-950 text-white"
                style={{
                    borderRadius: '24px 0 0 24px',
                    marginRight: 'calc(-50vw + 50%)'
                }}
            >
                {/* Section Header - Two Column Layout */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-12 md:mb-20 px-6 md:px-10 lg:px-12">
                    {/* Left - Title */}
                    <div className="flex-shrink-0">
                        <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-normal tracking-tight leading-tight">
                            Playground
                        </h2>
                    </div>

                    {/* Right - Description */}
                    <div className="md:max-w-md lg:max-w-lg">
                        <p className="text-[15px] md:text-[16px] text-zinc-400 leading-relaxed">
                            Personal experiments at the intersection of design, code, and curiosity.
                        </p>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScrollPosition}
                    className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth pl-6 md:pl-10 lg:pl-12"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {playgroundItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex-shrink-0 w-[90vw] md:w-[70vw] lg:w-[65vw] xl:w-[55vw] max-w-[900px] group"
                        >
                            {/* Image Card - Clickable */}
                            <button
                                onClick={() => openModal(item.image, item.title)}
                                className="block w-full text-left"
                            >
                                {/* Image Container */}
                                <div className="relative h-[55vw] md:h-[340px] lg:h-[380px] xl:h-[420px] rounded-2xl overflow-hidden bg-zinc-800 mb-4">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 90vw, 700px"
                                        priority={index < 3}
                                        placeholder="blur"
                                        blurDataURL={BLUR_PLACEHOLDER}
                                        loading={index < 3 ? "eager" : "lazy"}
                                    />

                                    {/* Title Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[20px] md:text-[24px] lg:text-[28px] font-medium text-white/90 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg">
                                            {item.title}
                                        </span>
                                    </div>

                                    {/* Expand Icon */}
                                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                                        <svg
                                            className="w-5 h-5 text-zinc-800"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Card Footer Content */}
                                <div className="space-y-2">
                                    <h3 className="text-[16px] md:text-[18px] font-medium tracking-tight text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-[14px] text-zinc-400 leading-relaxed line-clamp-3">
                                        {item.description}
                                    </p>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center transition-all duration-200 ${canScrollLeft
                            ? "hover:bg-zinc-800"
                            : "opacity-40"
                            }`}
                        aria-label="Scroll left"
                    >
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center transition-all duration-200 ${canScrollRight
                            ? "hover:bg-zinc-800"
                            : "opacity-40"
                            }`}
                        aria-label="Scroll right"
                    >
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>

                {/* CSS for hiding scrollbar */}
                <style jsx>{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </section>

            {/* Image Modal Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                        aria-label="Close modal"
                    >
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Modal Image Container */}
                    <div
                        className="relative w-[90vw] h-[80vh] max-w-[1400px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                        />

                        {/* Image Title */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                            <h3 className="text-xl md:text-2xl font-medium text-white">
                                {selectedImage.title}
                            </h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
