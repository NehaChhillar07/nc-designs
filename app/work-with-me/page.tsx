import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WorkWithMeContent } from "@/components/work-with-me/work-with-me-content";
import { workWithMeData } from "@/data/work-with-me-data";
import { SITE_LOCALE, SITE_NAME } from "@/lib/site";

const { meta } = workWithMeData;

export const metadata: Metadata = {
    // Absolute: the brief's title already carries the name, and the layout
    // template would append "| Neha Chhillar" a second time.
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
        canonical: meta.url,
    },
    openGraph: {
        siteName: SITE_NAME,
        locale: SITE_LOCALE,
        title: meta.title,
        description: meta.description,
        type: "website",
        url: meta.url,
        images: [{ url: meta.ogImage, width: 1200, height: 630, alt: "Work with Neha Chhillar" }],
    },
    twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.description,
        images: [meta.ogImage],
    },
};

export default function WorkWithMePage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main id="main-content" tabIndex={-1}>
                <WorkWithMeContent />
            </main>
            <Footer />
        </div>
    );
}
