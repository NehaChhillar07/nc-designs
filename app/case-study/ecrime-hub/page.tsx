import type { Metadata } from "next";
import { Header } from "@/components/header";
import { ECrimeHubCaseStudy } from "@/components/case-study/ecrime-hub-case-study";
import { ExploreMore } from "@/components/explore-more";
import { Footer } from "@/components/footer";
import { otherProjects } from "@/data/case-study-data";

export const metadata: Metadata = {
    title: "eCrime Hub Case Study | Neha Chhillar",
    description: "Designing a public cybersecurity platform for Dubai Police. Helping citizens report cybercrime and understand digital risks through intuitive UX.",
    openGraph: {
        title: "eCrime Hub | Dubai Police - Case Study",
        description: "Designing a public cybersecurity platform for Dubai Police. Helping citizens report cybercrime and understand digital risks.",
        type: "article",
        url: "https://nehachhillar.com/case-study/ecrime-hub",
    },
    twitter: {
        card: "summary_large_image",
        title: "eCrime Hub | Dubai Police - Case Study",
        description: "Designing a public cybersecurity platform for Dubai Police.",
    },
};

export default function ECrimeHubPage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main className="pt-20 md:pt-24">
                {/* Case Study Content */}
                <ECrimeHubCaseStudy />

                {/* Explore More Section */}
                <ExploreMore projects={otherProjects} currentProjectId={2} />
            </main>
            <Footer />
        </div>
    );
}
