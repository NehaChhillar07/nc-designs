import type { Metadata } from "next";
import { Header } from "@/components/header";
import { ECrimeHubCaseStudy } from "@/components/case-study/ecrime-hub-case-study";
import { ExploreMore } from "@/components/explore-more";
import { Footer } from "@/components/footer";
import { otherProjects } from "@/data/case-study-data";
import { SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "eCrime Hub Case Study",
    description: "Designing a public cybersecurity platform for Dubai Police. Helping citizens report cybercrime and understand digital risks through intuitive UX.",
    alternates: {
        canonical: `${SITE_URL}/case-study/ecrime-hub`,
    },
    openGraph: {
        siteName: SITE_NAME,
        locale: SITE_LOCALE,
        title: "eCrime Hub | Dubai Police - Case Study",
        description: "Designing a public cybersecurity platform for Dubai Police. Helping citizens report cybercrime and understand digital risks.",
        type: "article",
        url: `${SITE_URL}/case-study/ecrime-hub`,
        images: [{ url: "/og/ecrime-hub.png", width: 1200, height: 630, alt: "eCrime Hub - Neha Chhillar" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "eCrime Hub | Dubai Police - Case Study",
        description: "Designing a public cybersecurity platform for Dubai Police.",
        images: ["/og/ecrime-hub.png"],
    },
};

export default function ECrimeHubPage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main id="main-content" tabIndex={-1} className="pt-20 md:pt-24">
                {/* Case Study Content */}
                <ECrimeHubCaseStudy />

                {/* Explore More Section */}
                <ExploreMore projects={otherProjects} currentProjectId={2} />
            </main>
            <Footer />
        </div>
    );
}
