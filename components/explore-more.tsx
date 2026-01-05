"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
    // Filter out current project if provided
    const filteredProjects = currentProjectId
        ? projects.filter(p => p.id !== currentProjectId)
        : projects;

    // Take only 2 projects
    const displayProjects = filteredProjects.slice(0, 2);

    return (
        <section className="py-16 md:py-24 lg:py-32 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-[24px] md:text-[28px] font-semibold text-muted-foreground mb-4">
                        Explore More
                    </h2>
                </motion.div>

                {/* Project Cards */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
                    {displayProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={project.link} className="group block">
                                <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                                    {/* Image */}
                                    <div className="aspect-[4/3] relative overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            placeholder="blur"
                                            blurDataURL={BLUR_PLACEHOLDER}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 md:p-6">
                                        {/* Category */}
                                        <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                                            {project.category}
                                        </p>

                                        {/* Title */}
                                        <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Link Arrow */}
                                        <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                            View Case Study
                                            <svg
                                                className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* "Having an idea, let's catch up" - styled like "I am Neha Chhillar" */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-light text-gray-300 tracking-tight">
                        Having an idea,
                        <br />
                        let&apos;s catch up.
                    </h2>
                </motion.div>
            </div>
        </section>
    );
}
