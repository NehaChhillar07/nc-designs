import type { Metadata } from "next";
import { Header } from "@/components/header";
import { HumanFirewallCaseStudy } from "@/components/case-study/human-firewall-case-study";
import { ExploreMore } from "@/components/explore-more";
import { Footer } from "@/components/footer";
import { otherProjects } from "@/data/case-study-data";
import { SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Human Firewall Case Study",
    description: "Evolving a legacy security platform into an AI-native risk intelligence system. End-to-end UX architecture for phishing simulations, training, and AI-assisted risk insights.",
    alternates: {
        canonical: `${SITE_URL}/case-study/human-firewall`,
    },
    openGraph: {
        siteName: SITE_NAME,
        locale: SITE_LOCALE,
        title: "Human Firewall: AI-Native Risk Intelligence System",
        description: "Evolving a legacy security platform into an AI-native risk intelligence system for enterprise cybersecurity.",
        type: "article",
        url: `${SITE_URL}/case-study/human-firewall`,
        images: [{ url: "/og/human-firewall.png", width: 1200, height: 630, alt: "Human Firewall - Neha Chhillar" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Human Firewall: Case Study",
        description: "Evolving a legacy security platform into an AI-native risk intelligence system.",
        images: ["/og/human-firewall.png"],
    },
};

export default function HumanFirewallPage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main id="main-content" tabIndex={-1} className="pt-20 md:pt-24">
                {/* Case Study Content */}
                <HumanFirewallCaseStudy />

                {/* Explore More Section */}
                <ExploreMore projects={otherProjects} currentProjectId={1} />
            </main>
            <Footer />
        </div>
    );
}
