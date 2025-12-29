import { Header } from "@/components/header";
import { HowIThink } from "@/components/how-i-think";
import { WorkSection } from "@/components/work-section";
import { PlaygroundSection } from "@/components/playground-section";
import { SplitCTASection } from "@/components/split-cta-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import Image from "next/image";

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
          />
        </div>

        <div id="hero" className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center relative px-4">
          <p className="text-[16px] md:text-[20px] font-normal text-muted-foreground mb-4 md:mb-6">
            Hi, I'm Neha Chhillar!
          </p>
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-bold tracking-tight max-w-6xl leading-tight mb-6 md:mb-8">
            <span className="block">Product Designer at InfoSec Ventures,</span>
            <span className="font-normal text-muted-foreground">a human risk management and mitigation platform.</span>
          </h1>
          <p className="text-[16px] md:text-[20px] font-normal text-muted-foreground max-w-3xl leading-relaxed mb-8 md:mb-12 px-2">
            I design with a product mindset, using AI to speed up ideas and structured thinking to build products that feel simple and human.
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
              />
            </a>
          </div>
        </section>

        <div className="py-16 md:py-24 lg:py-32">
          <SplitCTASection />
        </div>

        <div id="how-i-think" className="py-16 md:py-24 lg:py-32">
          <HowIThink />
        </div>
        <div id="work" className="py-16 md:py-24 lg:py-32">
          <WorkSection />
        </div>
        <div id="playground" className="py-16 md:py-24 lg:py-32">
          <PlaygroundSection />
        </div>
        <div id="about" className="py-16 md:py-24 lg:py-32">
          <AboutSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
