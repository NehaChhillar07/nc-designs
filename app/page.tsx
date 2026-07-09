import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollLink } from "@/components/scroll-link";
import { Highlighter } from "@/components/ui/highlighter";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports for below-fold sections - reduces initial bundle
const WorkSection = dynamic(() => import("@/components/work-section").then(mod => ({ default: mod.WorkSection })), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-100 rounded-lg" />,
});

const FunWithClaudeSection = dynamic(() => import("@/components/fun-with-claude-section").then(mod => ({ default: mod.FunWithClaudeSection })), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 rounded-lg" />,
});

const AboutSection = dynamic(() => import("@/components/about-section").then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 rounded-lg" />,
});

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="container mx-auto px-2 sm:px-4 pt-20 sm:pt-24 py-4 sm:py-8 relative">
        <div className="absolute inset-0 -top-20 -z-10 flex items-start justify-center overflow-hidden">
          <Image
            src="/hero-gradient.avif"
            alt=""
            width={1200}
            height={1200}
            className="object-contain opacity-80 scale-125 md:scale-100"
            priority
            fetchPriority="high"
          />
        </div>

        <div id="hero" className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center relative px-4">
          <p className="text-[16px] md:text-[20px] font-normal text-muted-foreground mb-4 md:mb-6">
            Hi, I'm Neha.
          </p>
          <h1 className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-bold tracking-tight max-w-6xl leading-tight mb-6 md:mb-8 relative break-words">
            <span className="block">
              Product Designer specialising in{" "}
              <Highlighter action="highlight" color="#87CEFA" isView>security</Highlighter> and{" "}
              <Highlighter action="highlight" color="#6EE7B7" isView>AI-native B2B SaaS</Highlighter>.
            </span>
            <span className="block mt-3 md:mt-4 text-[20px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-normal text-muted-foreground leading-snug">Currently rebuilding a 10-year-old security platform into an <Highlighter action="underline" color="#FF9800" isView>AI-driven risk intelligence system</Highlighter> used by enterprise security teams.</span>
          </h1>
          <div className="flex flex-col items-center gap-8 mt-8 md:mt-12">
            <ScrollLink targetId="work" ariaLabel="Scroll to my work" className="cursor-pointer">
              <svg
                className="w-6 h-6 text-muted-foreground animate-bounce"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </ScrollLink>
          </div>
        </div>

        <Suspense fallback={<div className="min-h-[600px]" />}>
          <div id="work" className="py-16 md:py-24 lg:py-32">
            <WorkSection />
          </div>
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <div id="fun-with-claude" className="py-16 md:py-24 lg:py-32">
            <FunWithClaudeSection />
          </div>
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <div id="about" className="py-16 md:py-24 lg:py-32">
            <AboutSection />
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

