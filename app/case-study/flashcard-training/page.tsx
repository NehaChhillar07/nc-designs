import type { Metadata } from "next";
import { Header } from "@/components/header";
import { FlashcardTrainingCaseStudy } from "@/components/case-study/flashcard-training-case-study";
import { ExploreMore } from "@/components/explore-more";
import { Footer } from "@/components/footer";
import { otherProjects } from "@/data/case-study-data";

export const metadata: Metadata = {
    title: "Flashcard Training Builder Case Study | Neha Chhillar",
    description: "Moving security training out of a service queue and into the customer's hands. Designing and building an AI-assisted flashcard training builder for InfoSec Ventures.",
    openGraph: {
        title: "Flashcard Training Builder: Micro-Training for InfoSec Ventures",
        description: "Designing and building an AI-assisted flashcard training builder that moved course authoring from Customer Success to the customer.",
        type: "article",
        url: "https://nehachhillar.com/case-study/flashcard-training",
    },
    twitter: {
        card: "summary_large_image",
        title: "Flashcard Training Builder Case Study",
        description: "Moving security training out of a service queue and into the customer's hands.",
    },
};

export default function FlashcardTrainingPage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main className="pt-20 md:pt-24">
                {/* Case Study Content */}
                <FlashcardTrainingCaseStudy />

                {/* Explore More Section */}
                <ExploreMore projects={otherProjects} currentProjectId={3} />
            </main>
            <Footer />
        </div>
    );
}
