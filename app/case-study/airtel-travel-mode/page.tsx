import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AirtelTravelModeCaseStudy } from "@/components/case-study/airtel-travel-mode-case-study";
import { ExploreMore } from "@/components/explore-more";
import { Footer } from "@/components/footer";
import { otherProjects } from "@/data/case-study-data";
import { airtelData } from "@/data/airtel-travel-mode-data";
import { SITE_LOCALE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
    title: airtelData.meta.title,
    description: airtelData.meta.description,
    alternates: {
        canonical: airtelData.meta.url,
    },
    openGraph: {
        siteName: SITE_NAME,
        locale: SITE_LOCALE,
        title: airtelData.meta.ogTitle,
        description: airtelData.meta.description,
        type: "article",
        url: airtelData.meta.url,
        images: [{ url: airtelData.meta.ogImage, width: 1200, height: 630, alt: "Airtel Travel Mode - Neha Chhillar" }],
    },
    twitter: {
        card: "summary_large_image",
        title: airtelData.meta.ogTitle,
        description: airtelData.meta.description,
        images: [airtelData.meta.ogImage],
    },
};

export default function AirtelTravelModePage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header theme="dark" />
            <main id="main-content" tabIndex={-1}>
                {/* The dark hero handles its own top offset for the fixed header */}
                <AirtelTravelModeCaseStudy />
                <ExploreMore projects={otherProjects} currentProjectId={7} />
            </main>
            <Footer />
        </div>
    );
}
