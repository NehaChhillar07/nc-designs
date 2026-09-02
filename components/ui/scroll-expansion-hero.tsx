"use client";

import {
    type ReactNode,
    useRef,
    useState,
    useSyncExternalStore,
} from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

// Scroll-expansion hero (from 21st.dev / Aby Arunachalam), adapted to this
// site: motion/react, next/image, and the portfolio's light palette. The
// media starts as a small card with the title split around it; scrolling is
// pinned while the card grows to near-fullscreen, then the page releases.
//
// The pin is a tall runway with a sticky child, the same pattern as
// sticky-scroll-stack and scroll-choreography. It deliberately does NOT
// intercept wheel/touch events. The original version listened on wheel and
// touchmove with preventDefault and reset window.scrollTo(0, 0) on every
// scroll event until the media had expanded, which meant expansion could only
// be driven by a mouse wheel or a swipe: PageDown, End, arrow keys, scrollbar
// drags, find-in-page and deep links were all snapped back to 0, so keyboard
// users could not reach the case study at all. Reading progress off native
// scroll keeps the identical visual and costs nothing to operate by keyboard.

// Mobile detection via useSyncExternalStore — no setState-in-effect.
function subscribeWindowResize(callback: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
}
function getIsMobileSnapshot(): boolean {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
}
function getIsMobileServerSnapshot(): boolean {
    return false;
}

interface ScrollExpandMediaProps {
    mediaType?: "video" | "image";
    mediaSrc: string;
    mediaAlt?: string;
    /** width / height of the media; the card keeps this ratio at every size
        so the full frame stays visible, never cropped */
    mediaAspect?: number;
    /** Render a Mac browser bar (traffic-light dots) above the media */
    browserChrome?: boolean;
    posterSrc?: string;
    bgImageSrc: string;
    title?: string;
    /** Small line above the title, e.g. "Human Firewall · InfoSec Ventures" */
    eyebrow?: string;
    /** One-line project summary under the title */
    subtitle?: string;
    /** Tag row under the subtitle, e.g. "Enterprise SaaS · Cybersecurity" */
    tags?: string;
    date?: string;
    scrollToExpand?: string;
    textBlend?: boolean;
    children?: ReactNode;
}

const ScrollExpandMedia = ({
    mediaType = "video",
    mediaSrc,
    mediaAlt,
    mediaAspect = 16 / 9,
    browserChrome = false,
    posterSrc,
    bgImageSrc,
    title,
    eyebrow,
    subtitle,
    tags,
    date,
    scrollToExpand,
    textBlend,
    children,
}: ScrollExpandMediaProps) => {
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const isMobileState = useSyncExternalStore(
        subscribeWindowResize,
        getIsMobileSnapshot,
        getIsMobileServerSnapshot,
    );

    const runwayRef = useRef<HTMLDivElement | null>(null);

    // The runway is 250vh and its child sticks at top-0, so the card stays put
    // for 150vh of ordinary page scroll — that distance is the expansion.
    const { scrollYProgress } = useScroll({
        target: runwayRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        setScrollProgress(value);
    });

    // Only the width animates; height follows the media's aspect ratio so
    // the full frame is always visible, never cropped. The width caps keep
    // the fully expanded card inside the viewport (44px = browser bar).
    const mediaWidth = isMobileState
        ? 340 + scrollProgress * 660
        : 720 + scrollProgress * 880;
    const cardWidth = `min(${mediaWidth}px, 95vw, calc((85vh - ${
        browserChrome ? 44 : 0
    }px) * ${mediaAspect}))`;
    const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
    // The title slides apart and shrinks while the glass clears.
    const textScale = 1 - scrollProgress * 0.45;
    const glassStrength = 1 - scrollProgress;
    // Detail lines fade out early so the image underneath gets the stage.
    const detailOpacity = Math.max(1 - scrollProgress * 2, 0);

    const firstWord = title ? title.split(" ")[0] : "";
    const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

    return (
        <div className="transition-colors duration-700 ease-in-out overflow-x-clip">
            <div ref={runwayRef} className="relative h-[250vh]">
                <section className="sticky top-0 h-[100dvh] w-full overflow-hidden">
                    <motion.div
                        className="absolute inset-0 z-0 h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 - scrollProgress }}
                        transition={{ duration: 0.1 }}
                    >
                        <Image
                            src={bgImageSrc}
                            alt=""
                            width={1920}
                            height={1080}
                            className="w-screen h-screen"
                            style={{ objectFit: "cover", objectPosition: "center" }}
                            priority
                        />
                    </motion.div>

                    <div className="container mx-auto relative z-10 h-full">
                        <div className="flex flex-col items-center justify-center w-full h-full relative">
                            <div
                                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none"
                                style={{ width: cardWidth }}
                            >
                                <div
                                    className="rounded-xl overflow-hidden flex flex-col"
                                    style={{ boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.3)" }}
                                >
                                    {browserChrome && (
                                        <div
                                            className="flex items-center gap-2 px-4 py-3 shrink-0"
                                            style={{ background: "#26262a" }}
                                        >
                                            <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                                            <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                                            <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                                        </div>
                                    )}

                                    <div
                                        className="relative w-full pointer-events-none"
                                        style={{ aspectRatio: `${mediaAspect}` }}
                                    >
                                        {mediaType === "video" ? (
                                            <video
                                                src={mediaSrc}
                                                poster={posterSrc}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                className="absolute inset-0 w-full h-full object-cover"
                                                controls={false}
                                                disablePictureInPicture
                                                disableRemotePlayback
                                            />
                                        ) : (
                                            <Image
                                                src={mediaSrc}
                                                alt={mediaAlt ?? title ?? "Media content"}
                                                fill
                                                sizes="95vw"
                                                className="object-cover"
                                            />
                                        )}
                                        {/* Frosted glass that clears as the media expands */}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundColor: `rgba(255, 255, 255, ${0.1 * glassStrength})`,
                                                backdropFilter: `blur(${6 * glassStrength}px)`,
                                                WebkitBackdropFilter: `blur(${6 * glassStrength}px)`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center relative z-10 mt-5 gap-1 transition-none">
                                    {date && (
                                        <p
                                            className="text-sm md:text-base font-medium text-gray-700"
                                            style={{ transform: `translateX(-${textTranslateX}vw)` }}
                                        >
                                            {date}
                                        </p>
                                    )}
                                    {scrollToExpand && (
                                        <p
                                            className="text-xs text-gray-400 text-center tracking-wide"
                                            style={{ transform: `translateX(${textTranslateX}vw)` }}
                                        >
                                            {scrollToExpand}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div
                                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                                    textBlend ? "mix-blend-difference" : "mix-blend-normal"
                                }`}
                            >
                                {/* Soft scrim behind the text so it stays
                                    readable over the busy product shot; it
                                    clears together with the frosted glass as
                                    the media expands. */}
                                <div
                                    aria-hidden
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[150%] max-w-none h-[220%] md:w-[120%] md:h-[240%]"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse 50% 50% at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 80%)",
                                        opacity: glassStrength,
                                    }}
                                />
                                {eyebrow && (
                                    <p
                                        className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-gray-500 transition-none"
                                        style={{
                                            transform: `translateX(-${textTranslateX}vw)`,
                                            opacity: detailOpacity,
                                        }}
                                    >
                                        {eyebrow}
                                    </p>
                                )}
                                {/* Single line — the two halves slide apart on scroll */}
                                <div className="flex items-baseline justify-center gap-3 md:gap-5 transition-none">
                                    <motion.h2
                                        className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 leading-none transition-none"
                                        style={{
                                            transform: `translateX(-${textTranslateX}vw) scale(${textScale})`,
                                        }}
                                    >
                                        {firstWord}
                                    </motion.h2>
                                    {restOfTitle && (
                                        <motion.h2
                                            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 leading-none transition-none"
                                            style={{
                                                transform: `translateX(${textTranslateX}vw) scale(${textScale})`,
                                            }}
                                        >
                                            {restOfTitle}
                                        </motion.h2>
                                    )}
                                </div>
                                {subtitle && (
                                    <p
                                        className="text-sm md:text-base font-normal text-gray-600 leading-relaxed max-w-xl px-6 mt-3 transition-none"
                                        style={{
                                            transform: `translateX(${textTranslateX}vw)`,
                                            opacity: detailOpacity,
                                        }}
                                    >
                                        {subtitle}
                                    </p>
                                )}
                                {tags && (
                                    <p
                                        className="text-[11px] md:text-xs font-normal text-gray-400 tracking-wide transition-none"
                                        style={{
                                            transform: `translateX(-${textTranslateX}vw)`,
                                            opacity: detailOpacity,
                                        }}
                                    >
                                        {tags}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Case-study body, in ordinary flow below the runway. It is no
                longer opacity-gated on expansion progress: hidden-but-present
                text is its own accessibility problem (find-in-page matches it,
                screen readers read it), and below the fold it reveals on scroll
                anyway. */}
            <section className="flex flex-col w-full">{children}</section>
        </div>
    );
};

export { ScrollExpandMedia };
export default ScrollExpandMedia;
