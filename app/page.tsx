import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollLink } from "@/components/scroll-link";
import { BlurText } from "@/components/ui/blur-text";
import { StickyScrollStack } from "@/components/ui/sticky-scroll-stack";
import { Highlighter } from "@/components/ui/highlighter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports for below-fold sections - reduces initial bundle
const WorkSection = dynamic(() => import("@/components/work-section").then(mod => ({ default: mod.WorkSection })), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-100 rounded-lg" />,
});

const WritingsSection = dynamic(() => import("@/components/writings-section").then(mod => ({ default: mod.WritingsSection })), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 rounded-lg" />,
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
      <main id="main-content" tabIndex={-1} className="container mx-auto px-2 sm:px-4 pt-20 sm:pt-24 py-4 sm:py-8 relative">
        {/* Full-bleed via margins (no transform — a transformed ancestor would
            break the GSAP pinning inside the Work section) */}
        <div className="w-screen ml-[calc(50%-50vw)]">
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
          {/* clamp: below ~375px a fixed 64px CHHILLAR is wider than the
              viewport and the letters wrap to a third line. 17vw tracks the
              old 64px at 375 exactly and shrinks below it; the cap keeps
              every screen from 375 up pixel-identical to before. */}
          <div className="relative text-center text-[clamp(44px,17vw,64px)] sm:text-[100px] md:text-[140px] lg:text-[170px] font-bold uppercase tracking-tighter leading-none text-gray-900">
            <div className="relative">
              <BlurText
                text="NEHA"
                delay={45}
                animateBy="letters"
                direction="top"
                trigger="mount"
                className="justify-center whitespace-nowrap"
              />
            </div>
            <div className="relative z-20 -mt-[0.24em]">
              <BlurText
                text="CHHILLAR"
                delay={45}
                animateBy="letters"
                direction="top"
                trigger="mount"
                className="justify-center whitespace-nowrap"
              />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="w-[36px] h-[61px] sm:w-[52px] sm:h-[88px] md:w-[66px] md:h-[112px] lg:w-[76px] lg:h-[129px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110">
                <Image
                  src="/hero-portrait.jpg"
                  alt="Neha Chhillar"
                  width={600}
                  height={1020}
                  // Mirrors the wrapper's responsive widths above. Without this the
                  // browser assumes 100vw and pulls a candidate far larger than the
                  // 36-76px this ever renders at, on the highest-priority image of
                  // the first paint.
                  sizes="(min-width: 1024px) 76px, (min-width: 768px) 66px, (min-width: 640px) 52px, 36px"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Base margins in this block run one step tighter than sm+: the
              panel is sticky h-screen, so content past one viewport on a
              320x568 phone is not scrollable — it just never appears. The
              compact rhythm keeps both CTAs inside the smallest viewports. */}
          <h1 className="mt-6 sm:mt-8 md:mt-12 text-[18px] sm:text-[22px] md:text-[26px] font-medium tracking-tight max-w-3xl leading-snug relative break-words">
            {/* The mark carries the one cool accent on the site (--accent-cool):
                a warm mark sat straight on the orange gradient blob behind it
                and had nothing to separate from. */}
            <span className="block text-balance">
              Product designer who ships{" "}
              <Highlighter action="highlight" color="#79B8FF" isView>working code</Highlighter>.
            </span>
            {/* Set as a credential strip rather than a sentence: three short
                claims, dots between them, uppercase and letterspaced. It reads
                as a different voice from the line above, which is the point —
                it stopped disappearing under it. */}
            {/* Three claims fit on one line only past lg — inside the h1's
                max-w-3xl they'd wrap mid-claim, so below lg they stack, and at
                lg+ the row goes w-max and re-centers itself past the h1's cap
                (a transform on this leaf is fine; only a transformed ancestor
                of the pinned stack breaks GSAP pinning). */}
            <span className="mt-4 sm:mt-5 md:mt-7 flex flex-col lg:flex-row items-center justify-center gap-y-1 lg:gap-x-3 lg:w-max lg:max-w-none lg:relative lg:left-1/2 lg:-translate-x-1/2 text-[11px] sm:text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.18em] text-gray-900">
              <span className="lg:whitespace-nowrap">First designer at two companies</span>
              {/* Dots only where the claims sit on one line. Left visible on
                  narrow screens the strip wrapped and stranded a dot alone at
                  the end of a line. */}
              <span aria-hidden="true" className="hidden lg:block h-1 w-1 shrink-0 rounded-full bg-gray-400" />
              <span className="lg:whitespace-nowrap">Design systems in Figma</span>
              <span aria-hidden="true" className="hidden lg:block h-1 w-1 shrink-0 rounded-full bg-gray-400" />
              <span className="lg:whitespace-nowrap">Front ends built in Claude Code</span>
            </span>
          </h1>
          {/* The footer's signature chip, promoted to the hero. Same treatment
              in both places so it reads as one line moving up, not two lines. */}
          <p className="mt-4 sm:mt-6 md:mt-8">
            <span
              className="inline-block max-w-[92vw] px-4 py-2 rounded-full border border-gray-300 bg-white/50 backdrop-blur-sm text-[16px] sm:text-[18px]"
              style={{
                fontFamily: "var(--font-caveat), cursive",
                color: "#6B7280",
                transform: "rotate(-2deg)",
              }}
            >
              Started in Claude Code. Documented in Figma. Handed over functional.
            </span>
          </p>
          <p className="mt-3 sm:mt-5 md:mt-6 flex items-center justify-center gap-2 text-[12px] sm:text-sm text-muted-foreground">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
            Open to freelance projects and full-time roles.
          </p>
          <div className="mt-4 sm:mt-6 md:mt-8 flex items-center justify-center gap-3">
            <ScrollLink
              targetId="work"
              ariaLabel="See the work"
              className={cn(buttonVariants({ size: "lg" }), "cursor-pointer")}
            >
              See the work
            </ScrollLink>
            {/* Route ships with the /work-with-me page — sections 1 through 4
                deploy together so this never points at a 404 in production. */}
            <Link
              href="/work-with-me"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-white/80 backdrop-blur-sm")}
            >
              Work with me
            </Link>
          </div>
        </div>
          }
          second={
        <Suspense fallback={<div className="min-h-[600px]" />}>
          <div id="work" className="container mx-auto py-16 md:py-24 lg:py-32 px-4 sm:px-8 lg:px-12">
            <WorkSection />
          </div>
        </Suspense>
          }
        />
        </div>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <div id="writings" className="py-16 md:py-24 lg:py-32 px-4 sm:px-8 lg:px-12">
            <WritingsSection />
          </div>
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <div id="fun-with-claude" className="py-16 md:py-24 lg:py-32">
            <FunWithClaudeSection />
          </div>
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          {/* No py-* here: AboutSection already carries py-16 md:py-24 lg:py-32,
              and stacking both gave About double the padding of its peers. */}
          <div id="about">
            <AboutSection />
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

