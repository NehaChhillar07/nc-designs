// Shared scroll-reveal presets for the case studies (and anything else that
// wants the same entrance). These were duplicated byte-for-byte in all four
// case-study files, so a timing tweak meant four edits and drift was only a
// matter of time.
//
// Spread them onto a motion element: <motion.h2 {...fadeInUp} />
//
// Reduced motion is handled globally by MotionConfig reducedMotion="user" in
// app/layout.tsx, which drops the transform half of these while leaving the
// opacity fade — so there is deliberately no `reduce` branch here. Never
// branch these objects on useReducedMotion(): it is false during SSR and true
// on the client for a user with the setting on, which is a hydration mismatch.

const EASE = [0.25, 0.1, 0.25, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -100px 0px" } as const;

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.6, ease: EASE },
};

export const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: VIEWPORT,
    transition: { duration: 0.8, ease: EASE },
};
