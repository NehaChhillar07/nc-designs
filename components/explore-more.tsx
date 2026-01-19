"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCursor } from "@/components/ui/cursor-context";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    link: string | null;
    comingSoon?: boolean;
    readingTime?: string;
}

interface ExploreMoreProps {
    projects: Project[];
    currentProjectId?: number;
}

const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITETQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgARIUH/2gAMAwEAAhEDEQA/AKNzu1wvN2dc8r7kVtxQ2NKBSnaCQDnPOcnPFKUpSlKXAWMnZ//Z";

export function ExploreMore({ projects, currentProjectId }: ExploreMoreProps) {
    const { setCursor, resetCursor } = useCursor();

    // Reset cursor when component unmounts (e.g., when navigating to another page)
    useEffect(() => {
        return () => {
            resetCursor();
        };
    }, [resetCursor]);

    // Filter out current project - show only the other 2
    const filteredProjects = currentProjectId
        ? projects.filter(p => p.id !== currentProjectId)
        : projects.slice(0, 2);

    // Cursor hover handlers
    const handleMouseEnter = (project: Project) => {
        const tagText = project.readingTime || (project.comingSoon ? "Coming Soon" : "View");
        setCursor("tag", tagText);
    };

    const handleMouseLeave = () => {
        resetCursor();
    };

    // Project card content - shared between Link and div
    const ProjectCardContent = ({ project }: { project: Project }) => (
        <>
            {/* Image Container */}
            <div
                className="relative rounded-2xl overflow-hidden"
                style={{ aspectRatio: "16/9", background: "#E5E7EB" }}
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Coming Soon Badge */}
                {project.comingSoon && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-white">Coming Soon</span>
                    </div>
                )}
            </div>

            {/* Title Below Image - Left Aligned */}
            <h3 className="mt-4 text-[18px] md:text-[20px] lg:text-[22px] font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                {project.title}
            </h3>
        </>
    );

    return (
        <section
            className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16"
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-full">
                {/* Project Cards - Simple 2 column grid, no carousel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="w-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => handleMouseEnter(project)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {project.link ? (
                                <Link href={project.link} className="block group">
                                    <ProjectCardContent project={project} />
                                </Link>
                            ) : (
                                <div className="block group cursor-default">
                                    <ProjectCardContent project={project} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
