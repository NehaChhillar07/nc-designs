import type { Metadata } from "next";
import { Header } from "@/components/header";
import { PlaygroundSection } from "@/components/playground-section";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
    title: "Playground | Neha Chhillar - Product Designer",
    description: "Creative explorations, visual experiments, and side projects by Neha Chhillar. A collection of design work beyond client projects.",
    openGraph: {
        title: "Playground | Neha Chhillar",
        description: "Creative explorations, visual experiments, and side projects.",
        type: "website",
        url: "https://nehachhillar.com/playground",
    },
    twitter: {
        card: "summary_large_image",
        title: "Playground | Neha Chhillar",
        description: "Creative explorations, visual experiments, and side projects.",
    },
};

export default function PlaygroundPage() {
    return (
        <div className="min-h-screen relative">
            <Header />
            <main className="container mx-auto px-2 sm:px-4 pt-20 sm:pt-24 py-4 sm:py-8 relative">
                <PlaygroundSection />
            </main>
            <Footer />
        </div>
    );
}
