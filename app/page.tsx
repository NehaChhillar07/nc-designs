import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Highlighter } from "@/components/ui/highlighter";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports for below-fold sections - reduces initial bundle
const HowIThink = dynamic(() => import("@/components/how-i-think").then(mod => ({ default: mod.HowIThink })), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 rounded-lg" />,
});

const WorkSection = dynamic(() => import("@/components/work-section").then(mod => ({ default: mod.WorkSection })), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-100 rounded-lg" />,
});

const PlaygroundSection = dynamic(() => import("@/components/playground-section").then(mod => ({ default: mod.PlaygroundSection })), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 rounded-lg" />,
});

const SplitCTASection = dynamic(() => import("@/components/split-cta-section").then(mod => ({ default: mod.SplitCTASection })), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100 rounded-lg" />,
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
            src="/hero-gradeint.avif"
            alt=""
            width={1200}
            height={1200}
            className="object-contain opacity-80 scale-125 md:scale-100"
            priority
            fetchPriority="high"
          />
        </div>

        <div id="hero" className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center relative px-4">
          {/* Tilted Capsule Tag - mobile: above greeting, desktop: above "Ventures" */}
          <span
            className="sm:hidden px-4 py-1.5 text-xs font-medium bg-white text-gray-700 rounded-full border border-gray-300 shadow-sm whitespace-nowrap mb-4"
            style={{ transform: 'rotate(-5deg)' }}
          >
            Clarity · AI · Trust
          </span>
          <p className="text-[16px] md:text-[20px] font-normal text-muted-foreground mb-4 md:mb-6">
            Hi, I'm Neha Chhillar!
          </p>
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-bold tracking-tight max-w-6xl leading-tight mb-6 md:mb-8 relative">
            <span className="block relative">
              Product Designer at InfoSec Ventures,
              {/* Desktop version of the tag */}
              <span
                className="hidden sm:block absolute -top-10 right-4 md:right-8 lg:right-16 px-5 py-2 text-sm font-medium bg-white text-gray-700 rounded-full border border-gray-300 shadow-sm whitespace-nowrap"
                style={{ transform: 'rotate(-5deg)' }}
              >
                Clarity · AI · Trust
              </span>
            </span>
            <span className="font-normal text-muted-foreground">a <Highlighter action="underline" color="#FF9800" isView>human risk management</Highlighter> and mitigation platform.</span>
          </h1>
          <p className="text-[16px] md:text-[20px] font-normal text-muted-foreground max-w-3xl leading-relaxed mb-8 md:mb-12 px-2">
            I design with a product mindset, using AI to speed up ideas and structured thinking to build products that feel <Highlighter action="highlight" color="#87CEFA" isView>simple and human</Highlighter>.
          </p>
          <div className="flex flex-col items-center gap-8">
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
          </div>
        </div>

        <section id="products" className="py-8 md:py-16 relative px-4">
          <p className="text-[16px] md:text-[20px] font-normal text-muted-foreground text-center mb-6 md:mb-8">
            Products I've worked on in this journey:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto">
            <a
              href="https://kingphisher.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/Kingphisher Logo.svg"
                alt="Kingphisher"
                width={300}
                height={120}
                className="h-8 md:h-10 w-auto"
                loading="eager"
              />
            </a>

            <a
              href="https://humanfirewall.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/HF_Logo_Final.png"
                alt="Human Firewall"
                width={300}
                height={120}
                className="h-12 md:h-16 w-auto"
                loading="eager"
              />
            </a>

            <a
              href="https://smartdmarc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/SmartDMARC_Logo.svg"
                alt="SmartDMARC"
                width={300}
                height={120}
                className="h-12 md:h-16 w-auto"
                loading="eager"
              />
            </a>
          </div>
        </section>

        <Suspense fallback={<div className="min-h-[300px]" />}>
          <div className="py-16 md:py-24 lg:py-32">
            <SplitCTASection />
          </div>
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <div id="how-i-think" className="py-16 md:py-24 lg:py-32">
            <HowIThink />
          </div>
        </Suspense>

        <Suspense fallback={<div className="min-h-[600px]" />}>
          <div id="work" className="py-16 md:py-24 lg:py-32">
            <WorkSection />
          </div>
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <div id="playground" className="py-16 md:py-24 lg:py-32">
            <PlaygroundSection />
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

