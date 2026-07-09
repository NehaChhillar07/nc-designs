import type { Metadata } from "next";
import { Header } from "@/components/header";
import { HumanFirewallCaseStudy } from "@/components/case-study/human-firewall-case-study";
import { ExploreMore } from "@/components/explore-more";
import { Footer } from "@/components/footer";
import { otherProjects } from "@/data/case-study-data";

export const metadata: Metadata = {
    title: "Human Firewall Case Study | Neha Chhillar",
    description: "Evolving a legacy security platform into an AI-native risk intelligence system. End-to-end UX architecture for phishing simulations, training, and AI-assisted risk insights.",
    openGraph: {
        title: "Human Firewall: AI-Native Risk Intelligence System",
        description: "Evolving a legacy security platform into an AI-native risk intelligence system for enterprise cybersecurity.",
        type: "article",
        url: "https://nehachhillar.com/case-study/human-firewall",
    },
    twitter: {
        card: "summary_large_image",
        title: "Human Firewall: Case Study",
        description: "Evolving a legacy security platform into an AI-native risk intelligence system.",
    },
};

export default function HumanFirewallPage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main className="pt-20 md:pt-24">
                {/* Case Study Content */}
                <HumanFirewallCaseStudy />

                {/* Explore More Section */}
                <ExploreMore projects={otherProjects} currentProjectId={1} />
            </main>
            <Footer />
        </div>
    );
}
