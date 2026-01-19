"use client";

import { useEffect, useRef, useState } from "react";
import { ParticleBackground } from "./particle-background";
import { Highlighter } from "@/components/ui/highlighter";

export function SplitCTASection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleNavigate = (hash: string) => {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-white"
        >
            {/* Particle Background */}
            <ParticleBackground />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 max-w-5xl mx-auto">
                    {/* Left Column - Design & Execution */}
                    <div
                        className={`flex flex-col items-center md:items-start text-center md:text-left transition-all duration-700 ease-out ${isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                            }`}
                        style={{ transitionDelay: "100ms" }}
                    >
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                            Explore
                        </p>
                        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium tracking-tight mb-4">
                            Design & Execution
                        </h2>
                        <p className="text-[16px] md:text-[18px] text-muted-foreground mb-8 leading-relaxed max-w-sm">
                            From ideas to real, <Highlighter action="underline" color="#FF9800" isView>shipped interfaces</Highlighter>
                        </p>
                        <button
                            onClick={() => handleNavigate("#work")}
                            className="group inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-full font-medium text-[14px] transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg"
                        >
                            View Work
                        </button>
                    </div>

                    {/* Right Column - Product & Strategy */}
                    <div
                        className={`flex flex-col items-center md:items-start text-center md:text-left transition-all duration-700 ease-out ${isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                            }`}
                        style={{ transitionDelay: "250ms" }}
                    >
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                            Understand
                        </p>
                        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium tracking-tight mb-4">
                            Product & Strategy
                        </h2>
                        <p className="text-[16px] md:text-[18px] text-muted-foreground mb-8 leading-relaxed max-w-sm">
                            From problems to <Highlighter action="underline" color="#87CEFA" isView>decisions and outcomes</Highlighter>
                        </p>
                        <button
                            onClick={() => handleNavigate("#how-i-think")}
                            className="group inline-flex items-center justify-center px-6 py-3 border border-foreground/20 bg-transparent text-foreground rounded-full font-medium text-[14px] transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-md hover:border-foreground/40"
                        >
                            How I Think
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
