import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Page not found",
    // A 404 is a dead URL, not a page worth indexing, but the links on it are
    // worth following back into the real site.
    robots: {
        index: false,
        follow: true,
    },
};

// Same destinations the header and footer offer, so a visitor who lands here
// never has to reach for the back button.
const DESTINATIONS = [
    { href: "/#work", label: "Work" },
    { href: "/#writings", label: "Writings" },
    { href: "/#fun-with-claude", label: "Experiments" },
    { href: "/#about", label: "About" },
    { href: "/resume", label: "Resume" },
] as const;

export default function NotFound() {
    return (
        <div className="min-h-screen relative bg-white">
            <Header />
            <main
                id="main-content"
                tabIndex={-1}
                className="pt-28 md:pt-32 pb-16 md:pb-24"
            >
                <div className="container mx-auto px-4">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500 mb-5">
                        404
                    </p>

                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] max-w-[720px]">
                        This page does not exist
                    </h1>

                    <p className="mt-5 text-[17px] md:text-[19px] text-gray-600 leading-relaxed max-w-[560px]">
                        The link may be out of date, or the page may have moved.
                        Everything else is still where it was.
                    </p>

                    <div className="mt-10">
                        <Button asChild>
                            <Link href="/">Go to the homepage</Link>
                        </Button>
                    </div>

                    <nav
                        aria-label="Site sections"
                        className="mt-10 pt-8 border-t border-gray-200 max-w-[560px]"
                    >
                        <p className="text-sm font-medium text-gray-900 mb-4">
                            Or jump straight to a section
                        </p>
                        <ul className="flex flex-wrap gap-x-6 gap-y-3">
                            {DESTINATIONS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </main>
            <Footer />
        </div>
    );
}
