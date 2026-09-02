// Testimonials shared by /work-with-me and the About section.
//
// Names and roles are real (both worked with Neha on Human Firewall). The
// QUOTES are not written yet: until the token in lib/placeholders.ts is
// replaced with the person's actual words, production hides the card and dev
// shows it with clearly-stickered sample text. Real names never ship above
// words they didn't say.
//
// To go live: replace {{TESTIMONIAL_PM}} / {{TESTIMONIAL_ENG}} in
// lib/placeholders.ts with the exact quote text (just the quote — name and
// role below are used automatically; "Quote | Name | Role" also works if a
// different attribution is ever needed).

import { TESTIMONIAL_ENG, TESTIMONIAL_PM } from "@/lib/placeholders";

export type Testimonial = {
    token: string;
    name: string;
    role: string;
    sampleQuote: string;
    // Path under /public (e.g. "/testimonials/kumar.jpg"). Falls back to a
    // styled initials circle while unset.
    avatar?: string;
};

export const testimonials: Testimonial[] = [
    {
        token: TESTIMONIAL_PM,
        name: "Kumar Deepam",
        role: "Product Manager · Human Firewall",
        sampleQuote:
            "Sample quote. Kumar's real words go here when Neha collects them.",
    },
    {
        token: TESTIMONIAL_ENG,
        name: "Deepanshu Sharma",
        role: "Senior Full Stack Engineer · Human Firewall",
        sampleQuote:
            "Sample quote. Deepanshu's real words go here when Neha collects them.",
    },
];
