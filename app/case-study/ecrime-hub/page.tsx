import { Header } from "@/components/header";
import { ECrimeHubCaseStudy } from "@/components/case-study/ecrime-hub-case-study";
import { ExploreMore } from "@/components/explore-more";
import { Footer } from "@/components/footer";
import { otherProjects } from "@/data/case-study-data";

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
