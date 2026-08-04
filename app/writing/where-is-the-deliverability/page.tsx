import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EssayArticle } from "@/components/writing/essay-article";
import { whereIsTheDeliverabilityEssay } from "@/data/writing-where-is-the-deliverability-data";

const { meta, dateISO } = whereIsTheDeliverabilityEssay;

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

export default function WhereIsTheDeliverabilityPage() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main id="main-content" tabIndex={-1} className="pt-28 md:pt-32 pb-16 md:pb-24">
                <EssayArticle essay={whereIsTheDeliverabilityEssay} />
            </main>
            <Footer />
        </div>
    );
}
