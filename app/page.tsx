import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollLink } from "@/components/scroll-link";
import { BlurText } from "@/components/ui/blur-text";
import { StickyScrollStack } from "@/components/ui/sticky-scroll-stack";
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
        <StickyScrollStack
          first={
        <div id="hero" className="flex flex-col items-center justify-center h-full text-center relative px-4">
          {/* Gradient lives inside the hero panel so it recedes with it;
              centered so it glows behind the name on short/narrow screens */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden -translate-y-36 sm:translate-y-0">
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
          {/* Giant name, letters blurring in, with the portrait overlapping its center.
              NEHA on top; CHHILLAR's block is pulled up so it slightly overlaps.
              Size + leading live on the container; the spacing pull sits on the
              block wrapper, where negative margins behave predictably. */}
          <div className="relative text-center text-[64px] sm:text-[100px] md:text-[140px] lg:text-[170px] font-bold uppercase tracking-tighter leading-none text-gray-900">
            <div className="relative">
              <BlurText
                text="NEHA"
                delay={100}
                animateBy="letters"
                direction="top"
                className="justify-center whitespace-nowrap"
              />
            </div>
            <div className="relative z-20 -mt-[0.24em]">
              <BlurText
                text="CHHILLAR"
                delay={100}
                animateBy="letters"
                direction="top"
                className="justify-center whitespace-nowrap"
              />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="w-[36px] h-[61px] sm:w-[52px] sm:h-[88px] md:w-[66px] md:h-[112px] lg:w-[76px] lg:h-[129px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110">
                <Image
                  src="/logo.jpeg"
                  alt="Neha Chhillar"
                  width={252}
                  height={426}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <h1 className="mt-8 md:mt-12 text-[18px] sm:text-[22px] md:text-[26px] font-medium tracking-tight max-w-3xl leading-snug relative break-words">
            <span className="block">
              Product Designer specialising in{" "}
              <Highlighter action="highlight" color="#FF9800" isView>security</Highlighter> and{" "}
              <Highlighter action="underline" color="#FF9800" isView>AI-native B2B SaaS</Highlighter>.
            </span>
            <span className="block mt-2 md:mt-3 text-[15px] sm:text-[17px] md:text-[19px] font-normal text-muted-foreground leading-relaxed">Currently rebuilding a 10-year-old security platform into an <Highlighter action="underline" color="#FF9800" isView>AI-driven risk intelligence system</Highlighter> used by enterprise security teams.</span>
          </h1>
          <div className="flex flex-col items-center gap-8 mt-8 md:mt-12">
            <ScrollLink targetId="work" ariaLabel="Scroll to my work" className="cursor-pointer inline-flex items-center justify-center p-3">
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
          }
          second={
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <div id="work" className="py-16 md:py-24 lg:py-32 px-4 sm:px-8 lg:px-12">
            <WorkSection />
          </div>
        </Suspense>
          }
        />

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

