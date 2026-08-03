import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Same origin as metadataBase in app/layout.tsx — both read lib/site.ts
const BASE_URL = SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
