import { Header } from "@/components/header";
import { TexlaCultureCaseStudy } from "@/components/case-study/texlaculture-case-study";
import { ExploreMore } from "@/components/explore-more";
import { Footer } from "@/components/footer";
import { otherProjects } from "@/data/case-study-data";

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
