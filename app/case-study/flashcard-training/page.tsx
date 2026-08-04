import type { Metadata } from "next";
import { Header } from "@/components/header";
import { FlashcardTrainingCaseStudy } from "@/components/case-study/flashcard-training-case-study";
import { ExploreMore } from "@/components/explore-more";
import { Footer } from "@/components/footer";
import { otherProjects } from "@/data/case-study-data";
import { SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Flashcard Training Builder Case Study",
    description: "Moving security training out of a service queue and into the customer's hands. Designing and building an AI-assisted flashcard training builder for InfoSec Ventures.",
    alternates: {
        canonical: `${SITE_URL}/case-study/flashcard-training`,
    },
    openGraph: {
        siteName: SITE_NAME,
        locale: SITE_LOCALE,
        title: "Flashcard Training Builder: Micro-Training for InfoSec Ventures",
        description: "Designing and building an AI-assisted flashcard training builder that moved course authoring from Customer Success to the customer.",
        type: "article",
        url: `${SITE_URL}/case-study/flashcard-training`,
        images: [{ url: "/og/flashcard-training.png", width: 1200, height: 630, alt: "Flashcard Training Builder - Neha Chhillar" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Flashcard Training Builder Case Study",
        description: "Moving security training out of a service queue and into the customer's hands.",
        images: ["/og/flashcard-training.png"],
    },
};

export default function FlashcardTrainingPage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main id="main-content" tabIndex={-1} className="pt-20 md:pt-24">
                {/* Case Study Content */}
                <FlashcardTrainingCaseStudy />

                {/* Explore More Section */}
                <ExploreMore projects={otherProjects} currentProjectId={3} />
            </main>
            <Footer />
        </div>
    );
}
