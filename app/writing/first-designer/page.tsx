import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EssayArticle } from "@/components/writing/essay-article";
import { firstDesignerEssay } from "@/data/writing-first-designer-data";

const { meta, dateISO } = firstDesignerEssay;

export const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
    alternates: {
        canonical: meta.url,
    },
    openGraph: {
        title: meta.title,
        description: meta.description,
        type: "article",
        url: meta.url,
        publishedTime: dateISO,
        images: [{ url: meta.ogImage, width: 2400, height: 1120 }],
    },
    twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.description,
        images: [meta.ogImage],
    },
};

export default function FirstDesignerPage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main className="pt-28 md:pt-32 pb-16 md:pb-24">
                <EssayArticle essay={firstDesignerEssay} />
            </main>
            <Footer />
        </div>
    );
}
