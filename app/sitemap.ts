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
  { path: "/work-with-me", changeFrequency: "monthly", priority: 0.9 },
  { path: "/case-study/human-firewall", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/ecrime-hub", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/flashcard-training", changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-study/unsaid", changeFrequency: "monthly", priority: 0.8 },
  { path: "/writing/where-is-the-deliverability", changeFrequency: "yearly", priority: 0.6 },
  { path: "/writing/first-designer", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
