"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
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
    // Overrides the section's own padding when the caller places it inside an
    // already-padded layout (e.g. the Proof section on /work-with-me).
    className?: string;
    // Overrides the card grid (default: 2 columns). /work-with-me shows three.
    gridClassName?: string;
    // "minimal": clean white cards with a quiet border and a hover arrow —
    // used by /work-with-me's Proof section. Default keeps the warm gradient
    // cards the case-study pages use.
    variant?: "default" | "minimal";
}

const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITETQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgARIUH/2gAMAwEAAhEDEQA/AKNzu1wvN2dc8r7kVtxQ2NKBSnaCQDnPOcnPFKUpSlKXAWMnZ//Z";

export function ExploreMore({ projects, currentProjectId, className, gridClassName, variant = "default" }: ExploreMoreProps) {
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

    // Minimal variant: white surface, hairline border, strong type contrast,
    // an arrow that nudges on hover. Content-first, no decoration.
    const MinimalCardContent = ({ project }: { project: Project }) => (
        <div className="flex h-full min-h-[240px] flex-col rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 group-hover:border-gray-900 group-hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)]">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-400">
                {project.category}
            </p>
            <h3 className="mt-3 text-[20px] md:text-[22px] font-semibold leading-snug tracking-tight text-gray-900">
                {project.title}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-gray-500">
                {project.description}
            </p>
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500">
                <span>{project.readingTime}</span>
                <span className="flex items-center gap-1.5 font-medium text-gray-900">
                    Read
                    <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </div>
        </div>
    );

    // Project card content - shared between Link and div
    const ProjectCardContent = ({ project }: { project: Project }) =>
        variant === "minimal" ? (
            <MinimalCardContent project={project} />
        ) : (
        <div
            className="relative rounded-2xl overflow-hidden p-8 md:p-10 h-full"
            style={{
                background: "linear-gradient(135deg, #FAF6F0 0%, #F1E9DF 100%)",
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
            className={className ?? "py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16"}
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-full">
                {/* Project Cards - Simple 2 column grid, no carousel */}
                <div className={gridClassName ?? "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"}>
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="w-full h-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => handleMouseEnter(project)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {project.link ? (
                                <Link href={project.link} className="block group h-full">
                                    <ProjectCardContent project={project} />
                                </Link>
                            ) : (
                                <div className="block group h-full">
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
