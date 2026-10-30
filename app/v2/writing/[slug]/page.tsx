import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EssayV2 } from "@/components/home-v2/essay-v2";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { v2Essays, type V2EssaySlug } from "@/data/v2-pages-data";

const slugs = Object.keys(v2Essays) as V2EssaySlug[];

export function generateStaticParams() {
    return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

function isSlug(s: string): s is V2EssaySlug {
    return (slugs as string[]).includes(s);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    if (!isSlug(slug)) return {};
    const essay = v2Essays[slug];
    // Canonical stays on the live essay: this is the same text in a new layout.
    return {
        title: { absolute: `${essay.title} · Neha Chhillar` },
        description: essay.meta.description,
        alternates: { canonical: essay.meta.url },
    };
}

export default async function V2EssayPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!isSlug(slug)) notFound();
    // "read next" is simply the other essay.
    const nextSlug = slugs[(slugs.indexOf(slug) + 1) % slugs.length];
    const next = nextSlug !== slug ? { slug: nextSlug, essay: v2Essays[nextSlug] } : undefined;

    return (
        <main id="main-content" tabIndex={-1} className="outline-none">
            <SpecGap className="h-14 md:h-24" />
            <EssayV2 essay={v2Essays[slug]} next={next} />
            <SpecGap className="h-32 md:h-48" />
        </main>
    );
}
