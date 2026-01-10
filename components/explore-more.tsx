"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    link: string;
}

interface ExploreMoreProps {
    projects: Project[];
    currentProjectId?: number;
}

const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITETQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgARIUH/2gAMAwEAAhEDEQA/AKNzu1wvN2dc8r7kVtxQ2NKBSnaCQDnPOcnPFKUpSlKXAWMnZ//Z";

export function ExploreMore({ projects, currentProjectId }: ExploreMoreProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter out current project if provided
    const filteredProjects = currentProjectId
        ? projects.filter(p => p.id !== currentProjectId)
        : projects;

    // Get current visible projects (2 at a time)
    const getVisibleProjects = () => {
        const first = filteredProjects[currentIndex % filteredProjects.length];
        const second = filteredProjects[(currentIndex + 1) % filteredProjects.length];
        return [first, second].filter(Boolean);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    };

    const displayProjects = getVisibleProjects();

    return (
        <section className="py-16 md:py-24 lg:py-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Project Cards with Carousel Navigation */}
                <div className="relative">
                    <div className="flex gap-6 items-stretch">
                        {displayProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="flex-1"
                                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link href={project.link} className="block group">
                                    {/* Image with Title Overlay */}
                                    <div
                                        className="relative rounded-2xl overflow-hidden mb-4"
                                        style={{ aspectRatio: "4/3", background: "#E5E7EB" }}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            placeholder="blur"
                                            blurDataURL={BLUR_PLACEHOLDER}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        {/* Title Overlay on Image */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3
                                                className="text-2xl md:text-3xl font-medium"
                                                style={{ color: "#212B36" }}
                                            >
                                                {project.title}
                                            </h3>
                                        </div>
                                        {/* Play button indicator (optional) */}
                                        <motion.div
                                            className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{ background: "rgba(255,255,255,0.9)" }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <svg className="w-4 h-4 ml-0.5" fill="#212B36" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    {/* Content Below Image */}
                                    <div className="space-y-2">
                                        <h4
                                            className="text-base font-semibold"
                                            style={{ color: "#212B36" }}
                                        >
                                            {project.category}
                                        </h4>
                                        <p
                                            className="text-sm leading-relaxed"
                                            style={{ color: "#637381" }}
                                        >
                                            {project.description}
                                        </p>
                                        <div className="flex items-center gap-1 text-sm font-medium pt-1 group-hover:gap-2 transition-all" style={{ color: "#212B36" }}>
                                            <span>View case</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Carousel Navigation - Between Cards */}
                    {filteredProjects.length > 2 && (
                        <div
                            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
                            style={{ bottom: "180px" }}
                        >
                            <button
                                onClick={handlePrev}
                                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition-colors"
                                style={{ borderColor: "#E5E7EB", background: "white" }}
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-5 h-5" style={{ color: "#637381" }} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition-colors"
                                style={{ borderColor: "#E5E7EB", background: "white" }}
                                aria-label="Next"
                            >
                                <ChevronRight className="w-5 h-5" style={{ color: "#637381" }} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
