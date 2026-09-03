"use client";

import { useEffect, useState } from "react";

type Stats = {
  since: string;
  visitors: number;
  totalMs: number;
  pages: { path: string; visitors: number; totalMs: number; avgMs: number }[];
  days: { day: string; visitors: number; totalMs: number }[];
};

function fmt(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

function pageName(path: string): string {
  if (path === "/") return "home";
  return path.replace(/^\//, "").replace(/\//g, " / ").replace(/-/g, " ");
}

export function StatsView() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("key");
    if (!key) {
      setError("This page needs the access key in the link.");
      setLoading(false);
      return;
    }
    fetch(`/api/stats?key=${encodeURIComponent(key)}`)
      .then((r) => {
        if (r.status === 401) throw new Error("That key is not right.");
        if (!r.ok) throw new Error("Could not load the numbers. Try a refresh.");
        return r.json();
      })
      .then((d: Stats) => setStats(d))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="text-[32px] font-semibold tracking-tight">how people read this site</h1>
        <p className="mt-2 text-[16px] text-muted-foreground">
          Who visited and how long they stayed on each page. Counting started 3 September 2026.
        </p>

        {loading && <p className="mt-12 text-muted-foreground">Loading...</p>}
        {error && <p className="mt-12 text-muted-foreground">{error}</p>}

        {stats && (
          <>
            <div className="mt-12 flex gap-12">
              <div>
                <div className="text-[56px] font-semibold leading-none">{stats.visitors}</div>
                <div className="mt-2 text-[16px] text-muted-foreground">visitors</div>
              </div>
              <div>
                <div className="text-[56px] font-semibold leading-none">{fmt(stats.totalMs)}</div>
                <div className="mt-2 text-[16px] text-muted-foreground">reading time, all pages</div>
              </div>
            </div>

            <h2 className="mt-16 text-[18px] font-semibold">time spent, by page</h2>
            {stats.pages.length === 0 ? (
              <p className="mt-4 text-muted-foreground">
                Nothing yet. Numbers appear once someone spends a moment on a page.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-[16px]">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="py-2 pr-4 font-normal">page</th>
                      <th className="py-2 pr-4 text-right font-normal">visitors</th>
                      <th className="py-2 pr-4 text-right font-normal">total time</th>
                      <th className="py-2 text-right font-normal">avg per visitor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.pages.map((p) => (
                      <tr key={p.path} className="border-b border-border/50">
                        <td className="py-3 pr-4">{pageName(p.path)}</td>
                        <td className="py-3 pr-4 text-right tabular-nums">{p.visitors}</td>
                        <td className="py-3 pr-4 text-right tabular-nums">{fmt(p.totalMs)}</td>
                        <td className="py-3 text-right tabular-nums">{fmt(p.avgMs)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {stats.days.length > 0 && (
              <>
                <h2 className="mt-16 text-[18px] font-semibold">by day</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-[16px]">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="py-2 pr-4 font-normal">day</th>
                        <th className="py-2 pr-4 text-right font-normal">visitors</th>
                        <th className="py-2 text-right font-normal">total time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.days.map((d) => (
                        <tr key={d.day} className="border-b border-border/50">
                          <td className="py-3 pr-4 tabular-nums">{d.day}</td>
                          <td className="py-3 pr-4 text-right tabular-nums">{d.visitors}</td>
                          <td className="py-3 text-right tabular-nums">{fmt(d.totalMs)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <p className="mt-16 text-[14px] text-muted-foreground">
              A visitor here is one browser session. Time only counts while the tab is open and
              visible. Page view counts and referrers live in the Vercel dashboard under Analytics.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
