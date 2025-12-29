import { Header } from "@/components/header";
import { PlaygroundSection } from "@/components/playground-section";
import { Footer } from "@/components/footer";

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
