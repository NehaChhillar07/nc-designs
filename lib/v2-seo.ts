// Metadata and structured data for the v2 pages, in one place, so every
// page sets the same fields the same way (launch plan, Phase 3).
//
// - URLs are the final ones (no /v2): canonicals and og:url already point
//   where each page will live after the cutover.
// - Preview cards are the v2 ones in public/og/v2/, made by
//   scripts/generate-og-v2.mjs.
// - openGraph replaces the root layout's object wholesale (see lib/site.ts),
//   so site name and locale are spread back in here.

import type { Metadata } from "next";

import { GITHUB_PROFILE } from "@/lib/placeholders";
import { LINKEDIN_URL, SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site";

export const AUTHOR = "Neha Chhillar";
const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export type CardSlug =
    | "home"
    | "resume"
    | "work-with-me"
    | "human-firewall"
    | "flashcard-training"
    | "ecrime-hub"
    | "unsaid"
    | "airtel-travel-mode"
    | "writing-first-designer"
    | "writing-where-is-the-deliverability";

export const ogImage = (slug: CardSlug) => `/og/v2/${slug}.png`;

export function v2Metadata({
    title,
    description,
    path,
    card,
    cardAlt,
    type = "article",
    publishedTime,
}: {
    title: string;
    description: string;
    path: string;
    card: CardSlug;
    cardAlt: string;
    type?: "website" | "article" | "profile";
    publishedTime?: string;
}): Metadata {
    const url = abs(path);
    const image = { url: ogImage(card), width: 1200, height: 630, alt: cardAlt };
    return {
        title: { absolute: title },
        description,
        alternates: { canonical: url },
        openGraph: {
            siteName: SITE_NAME,
            locale: SITE_LOCALE,
            title,
            description,
            url,
            images: [image],
            ...(type === "article" ? { type, publishedTime, authors: [AUTHOR] } : { type }),
        },
        twitter: { card: "summary_large_image", title, description, images: [image.url] },
    };
}

// ---------- structured data (schema.org) ----------

export const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR,
    jobTitle: "Product Designer",
    url: SITE_URL,
    image: `${SITE_URL}/hero-portrait.jpg`,
    sameAs: [LINKEDIN_URL, GITHUB_PROFILE],
};

export function breadcrumbLd(trail: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
    };
}

export const caseStudyCrumbs = (name: string, slug: string) =>
    breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Work", path: "/#v2-work" },
        { name, path: `/case-study/${slug}` },
    ]);

export function articleLd({ headline, description, path, card, datePublished }: { headline: string; description: string; path: string; card: CardSlug; datePublished: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        image: [abs(ogImage(card))],
        datePublished,
        mainEntityOfPage: abs(path),
        author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
    };
}
