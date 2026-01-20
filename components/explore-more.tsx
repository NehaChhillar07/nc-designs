"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
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
        <div
            className="relative rounded-2xl overflow-hidden p-8 md:p-10 h-full"
            style={{
                background: "linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)",
                minHeight: "280px"
            }}
        >
            {/* Coming Soon Badge */}
            {project.comingSoon && (
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/10 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium text-gray-700">Coming Soon</span>
                </div>
            )}

            {/* Category Label */}
            <p className="text-[12px] md:text-[13px] font-medium text-gray-500 uppercase tracking-wide mb-4">
                {project.category}
            </p>

            {/* Title */}
            <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-4 leading-tight">
                {project.title}
            </h3>

            {/* Description */}
            <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed">
                {project.description}
            </p>

            {/* Reading Time / View Indicator */}
            {project.readingTime && !project.comingSoon && (
                <div className="absolute bottom-6 right-6 flex items-center gap-2 text-gray-500 group-hover:text-gray-700 transition-colors">
                    <span className="text-sm font-medium">{project.readingTime}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            )}
        </div>
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
                                <div className="block group">
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
