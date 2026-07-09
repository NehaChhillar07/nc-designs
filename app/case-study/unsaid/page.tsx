import type { Metadata } from "next";
import { Header } from "@/components/header";
import { UnsaidCaseStudy } from "@/components/case-study/unsaid-case-study";
import { ExploreMore } from "@/components/explore-more";
import { Footer } from "@/components/footer";
import { otherProjects } from "@/data/case-study-data";
import { unsaidData } from "@/data/unsaid-data";

export const metadata: Metadata = {
    title: unsaidData.meta.title,
    description: unsaidData.meta.description,
    openGraph: {
        title: unsaidData.meta.ogTitle,
        description: unsaidData.meta.description,
        type: "article",
        url: unsaidData.meta.url,
    },
    twitter: {
        card: "summary_large_image",
        title: unsaidData.meta.ogTitle,
        description: unsaidData.meta.description,
    },
};

export default function UnsaidPage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main>
                {/* Case study content — the dark hero handles its own top offset for the fixed header */}
                <UnsaidCaseStudy />

                {/* Explore More — unsaid isn't registered in otherProjects yet, so this shows the other studies */}
                <ExploreMore projects={otherProjects} currentProjectId={6} />
            </main>
            <Footer />
        </div>
    );
}
