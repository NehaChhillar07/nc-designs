import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EssayArticle } from "@/components/writing/essay-article";
import { whereIsTheDeliverabilityEssay } from "@/data/writing-where-is-the-deliverability-data";
import { SITE_LOCALE, SITE_NAME } from "@/lib/site";

const { meta, dateISO } = whereIsTheDeliverabilityEssay;

export const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
    alternates: {
        canonical: meta.url,
    },
    openGraph: {
        siteName: SITE_NAME,
        locale: SITE_LOCALE,
        title: meta.title,
        description: meta.description,
        type: "article",
        url: meta.url,
        publishedTime: dateISO,
        images: [{ url: meta.ogImage, width: 1200, height: 630, alt: meta.ogImageAlt }],
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
