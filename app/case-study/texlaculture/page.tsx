import type { Metadata } from "next";
import { Header } from "@/components/header";
import { TexlaCultureCaseStudy } from "@/components/case-study/texlaculture-case-study";
import { ExploreMore } from "@/components/explore-more";
import { Footer } from "@/components/footer";
import { otherProjects } from "@/data/case-study-data";

export const metadata: Metadata = {
    title: "TexlaCulture HRMS Case Study | Neha Chhillar",
    description: "End-to-end product design for a Human Resource Management System. Simplifying hiring, onboarding, and core people workflows for modern teams.",
    openGraph: {
        title: "TexlaCulture HRMS - Case Study",
        description: "End-to-end product design for a Human Resource Management System. Simplifying hiring, onboarding, and core people workflows.",
        type: "article",
        url: "https://nehachhillar.com/case-study/texlaculture",
    },
    twitter: {
        card: "summary_large_image",
        title: "TexlaCulture HRMS - Case Study",
        description: "End-to-end product design for a Human Resource Management System.",
    },
};

export default function TexlaCulturePage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main className="pt-20 md:pt-24">
                {/* Case Study Content */}
                <TexlaCultureCaseStudy />

                {/* Explore More Section */}
                <ExploreMore projects={otherProjects} currentProjectId={3} />
            </main>
            <Footer />
        </div>
    );
}
