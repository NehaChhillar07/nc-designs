"use client";

import { ToolBubble } from "@/components/ui/tool-bubble";
import { HighlightBg } from "@/components/ui/highlight-bg";
import { Highlighter } from "@/components/ui/highlighter";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HowIThink() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setOffset(scrollProgress * 20 - 10);
      }
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const tools = [
    {
      name: "Pen & Paper",
      icon: "/how-i-think-logos/notepad.png",
      delay: 0,
      usageNote: "My first space for raw ideas, sketches and early hypothesis thinking."
    },
    {
      name: "Perplexity",
      icon: "/how-i-think-logos/perplexity.png",
      delay: 0.1,
      usageNote: "My go-to for fast research, market updates and seeing what competitors are doing."
    },
    {
      name: "NotebookLM",
      icon: "/how-i-think-logos/notebooklm.png",
      delay: 0.2,
      usageNote: "Where I break down long documents and complex topics into clear, simple insights."
    },
    {
      name: "Notion",
      icon: "/how-i-think-logos/notion-logo.png",
      delay: 0.3,
      usageNote: "My place to record research, documents and everything happening in the process."
    },
    {
      name: "Figma",
      icon: "/how-i-think-logos/figma.png",
      delay: 0.4,
      usageNote: "Where I maintain my design system and keep all components consistent and clean."
    },
    {
      name: "Lovable",
      icon: "/how-i-think-logos/lovable-logo-icon.png",
      delay: 0.5,
      usageNote: "I use it when I need fresh UI ideas or interactive concepts to unblock my thinking."
    },
    {
      name: "Cursor",
      icon: "/how-i-think-logos/cursor.png",
      delay: 0.6,
      usageNote: "My source of truth for features, flows and how the product should actually work."
    },
    {
      name: "Firebase",
      icon: "/how-i-think-logos/firebase.png",
      delay: 0.7,
      usageNote: "My quick tool to build agentic flows and test features with real behaviour."
    },
    {
      name: "Jira",
      icon: "/how-i-think-logos/jira_5968875.png",
      delay: 0.8,
      usageNote: "Where I document tasks and move product work forward with the team."
    },
  ];

  return (
    <section ref={containerRef} className="py-8 md:py-16 relative">
      {/* Content Section */}
      <div className="max-w-4xl text-left mb-6 md:mb-8">
        <p className="text-[16px] font-normal text-muted-foreground mb-6 md:mb-8">
          How I think
        </p>

        <h2 className="text-[32px] sm:text-[36px] md:text-[40px] font-normal tracking-tight leading-tight mb-6 md:mb-8">
          Design progresses fastest when ideas meet reality early. <Highlighter action="underline" color="#FF9800" isView>AI built prototypes</Highlighter> turn hypotheses into working versions quickly, making it easier to <HighlightBg color="#000000" rotation={-0.85}><span className="text-white">observe real behaviour</span></HighlightBg> and refine solutions.
        </h2>

        <p className="text-[16px] md:text-[20px] font-normal text-muted-foreground leading-relaxed">
          This shifts the process from long cycles of polished mockups to <Highlighter action="highlight" color="#A8D08D" isView>rapid, grounded learning</Highlighter> keeping clarity, usefulness, and human understanding at the center.
        </p>
      </div>

      {/* Tools Section - wrapper with explicit height for tooltip space */}
      <div className="relative" style={{ height: '280px' }}>
        {/* Scrollable bubble container - positioned to allow tooltip overflow */}
        <div
          className="absolute inset-x-0 bottom-0 top-0"
          style={{
            overflow: 'visible',
          }}
        >
          <div
            className="flex flex-nowrap items-end justify-start gap-4 md:gap-6 lg:gap-8 h-full pr-8 md:pr-16 pb-8"
            style={{
              transform: `translateY(${offset}px)`,
              transition: "transform 0.1s ease-out",
              overflowX: "scroll",
              overflowY: "visible",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {tools.map((tool, index) => {
              // Create a smooth wave pattern - bubbles rise and fall like ocean waves
              const wavePhase = (index / (tools.length - 1)) * Math.PI * 2;
              // Wave offset: negative = higher position (up), positive = lower position (down)
              const waveOffset = Math.round(Math.sin(wavePhase) * -30);

              // Calculate height factor (0 = lowest, 1 = highest)
              const heightFactor = (waveOffset + 30) / 60; // normalize to 0-1 range

              // ALL bubbles move - upper ones more intense and faster
              // First 3 bubbles: faster animation (1.2s)
              // Upper bubbles: 50px movement, 1.5s duration (faster)
              // Lower bubbles: 15px movement, 3.0s duration (slower)
              const baseIntensity = 15 + (heightFactor * 35); // Range: 15px to 50px
              const animationIntensity = index < 3 ? 25 : baseIntensity; // First 3: more up/down distance
              const baseAnimationDuration = 3.0 - (heightFactor * 1.5); // Range: 3.0s to 1.5s
              const animationDuration = index < 3 ? 3.0 : baseAnimationDuration; // First 3: slightly faster bob

              // Increase icon size for NotebookLM and Perplexity
              const iconSize = (tool.name === "NotebookLM" || tool.name === "Perplexity") ? 56 : 48;
              const iconClass = (tool.name === "NotebookLM" || tool.name === "Perplexity")
                ? "w-12 h-12 md:w-14 md:h-14"
                : "w-10 h-10 md:w-12 md:h-12";

              return (
                <ToolBubble
                  key={tool.name}
                  label={tool.name}
                  delay={tool.delay}
                  index={index}
                  size={120}
                  waveOffset={waveOffset}
                  animationIntensity={animationIntensity}
                  animationDuration={animationDuration}
                  usageNote={tool.usageNote}
                  icon={
                    <Image
                      src={tool.icon}
                      alt=""
                      width={iconSize}
                      height={iconSize}
                      className={iconClass}
                    />
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
