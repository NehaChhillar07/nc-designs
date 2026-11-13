import { notFound } from "next/navigation";

// Any URL no page or route handles lands here, so the 404 renders
// app/(site)/not-found.tsx inside the site shell. Real routes (pages, /stats,
// /api, the sitemap and icons) are more specific, so they always win.
export default function Missing() {
    notFound();
}
