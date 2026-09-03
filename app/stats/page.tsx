import type { Metadata } from "next";
import { StatsView } from "@/components/stats-view";

// Private page: reachable only with the access key, kept out of the
// sitemap (explicit route list) and out of search engines here.
export const metadata: Metadata = {
  title: "Stats",
  robots: { index: false, follow: false },
};

export default function StatsPage() {
  return <StatsView />;
}
