import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Same origin as metadataBase in app/layout.tsx — both read lib/site.ts
const BASE_URL = SITE_URL;

type Route = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const routes: Route[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/resume", changeFrequency: "monthly", priority: 0.9 },
  { path: "/case-study/human-firewall", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/ecrime-hub", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/flashcard-training", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/unsaid", changeFrequency: "monthly", priority: 0.8 },
  // NOTE: /writing/where-is-the-deliverability exists in the working tree but is
  // not committed, so it 404s in production. Add it here in the same commit that
  // ships the post, not before, or the sitemap advertises a dead URL.
  { path: "/writing/first-designer", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
