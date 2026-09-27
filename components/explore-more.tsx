"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCursor } from "@/components/ui/cursor-context";

interface Project {
    id: number;
    title: string;
    category: string;
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

    // Every case study except the one being read
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

    // Project card content - shared between Link and div.
    // The card is the project's cover, square and full bleed, so the space
    // shows the work rather than an empty panel. The title and reading time
    // sit at the bottom, the category at the top, each on its own fade.
    const ProjectCardContent = ({ project }: { project: Project }) => (
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-900">
            <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            {/* Near-solid under the title, so a cover's own caption dims away
                instead of reading through it; a lighter fade under the category. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-black/95 from-30% via-black/70 via-55% to-transparent to-80%"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-b from-black/55 to-transparent to-35%"
            />

            {/* Coming Soon Badge */}
            {project.comingSoon && (
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium text-white">Coming Soon</span>
                </div>
            )}

            {/* Category Label */}
            <p className="absolute inset-x-5 top-5 md:inset-x-6 md:top-6 line-clamp-2 text-[11px] md:text-[12px] font-medium uppercase tracking-wide text-white/70">
                {project.category}
            </p>

            <div className="absolute inset-x-5 bottom-5 md:inset-x-6 md:bottom-6">
                {/* Title */}
                <h3 className="text-[20px] md:text-[22px] xl:text-[19px] font-semibold leading-snug text-white">
                    {project.title}
                </h3>

                {/* Reading Time / View Indicator */}
                {project.readingTime && !project.comingSoon && (
                    <div className="mt-3 flex items-center gap-2 text-white/70 transition-colors group-hover:text-white">
                        <span className="text-sm font-medium">{project.readingTime}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <section
            className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16"
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-full">
                {/* Square cards: one across on a phone, two until there is room for four */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
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
