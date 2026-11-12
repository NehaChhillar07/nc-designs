import { createHash, timingSafeEqual } from "node:crypto";

import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

type PageAgg = { totalMs: number; sessions: Set<string> };

// The key arrives in a header, never the URL, so it stays out of
// history and request logs. Compared in constant time (hashes first, so
// the lengths always match).
function keyMatches(given: string | null): boolean {
  const want = process.env.STATS_KEY;
  if (!want || !given) return false;
  const h = (v: string) => createHash("sha256").update(v).digest();
  return timingSafeEqual(h(given), h(want));
}

// Aggregates the beacons stored by /api/t into per-page and per-day
// numbers. Guarded by STATS_KEY so only Neha can read it.
export async function GET(req: Request) {
  if (!keyMatches(req.headers.get("x-stats-key"))) {
    return new Response("unauthorized", { status: 401, headers: { "cache-control": "no-store" } });
  }

  const pages = new Map<string, PageAgg>();
  const days = new Map<string, PageAgg>();
  const allSessions = new Set<string>();
  let totalMs = 0;

  let cursor: string | undefined;
  do {
    const page = await list({ prefix: "t/", cursor, limit: 1000 });
    for (const b of page.blobs) {
      const segs = b.pathname.split("/");
      if (segs.length !== 3) continue;
      const parts = segs[2].split("~");
      if (parts.length < 3) continue;
      const ms = parseInt(parts[1], 10);
      if (!Number.isFinite(ms) || ms <= 0) continue;
      const path = parts[0].replace(/\|/g, "/") || "/";
      const sid = parts[2];
      const day = segs[1];

      totalMs += ms;
      allSessions.add(sid);
      const pa = pages.get(path) ?? { totalMs: 0, sessions: new Set() };
      pa.totalMs += ms;
      pa.sessions.add(sid);
      pages.set(path, pa);
      const da = days.get(day) ?? { totalMs: 0, sessions: new Set() };
      da.totalMs += ms;
      da.sessions.add(sid);
      days.set(day, da);
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return Response.json(
    {
      since: "2026-09-03",
      visitors: allSessions.size,
      totalMs,
      pages: [...pages.entries()]
        .map(([path, a]) => ({
          path,
          visitors: a.sessions.size,
          totalMs: a.totalMs,
          avgMs: Math.round(a.totalMs / a.sessions.size),
        }))
        .sort((a, b) => b.totalMs - a.totalMs),
      days: [...days.entries()]
        .map(([day, a]) => ({ day, visitors: a.sessions.size, totalMs: a.totalMs }))
        .sort((a, b) => a.day.localeCompare(b.day)),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
