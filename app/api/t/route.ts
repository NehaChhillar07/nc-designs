import { put } from "@vercel/blob";

// Receives one time-on-page beacon from components/time-tracker.tsx.
// All the data rides in the blob's pathname ("/" becomes "|"), so the
// stats route can aggregate from list() calls alone without fetching
// blob bodies. Blobs hold a page path, a duration, and a random
// per-tab session id. No IPs, no names, nothing personal.
//
// Guards, since anyone can POST here and each beacon writes a blob:
// - Same origin only: browsers send Origin (or Referer) on these POSTs,
//   and a beacon from another site is dropped.
// - A body over 1 KB is refused before it's parsed (a real one is ~80 B).
// - A per-visitor rate limit. It lives in this instance's memory, so it's
//   best effort; a Vercel Firewall rate-limit rule on /api/t is the
//   stronger version.

const MAX_BODY = 1024;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, { n: number; start: number }>();

function sameOrigin(req: Request): boolean {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const from = req.headers.get("origin") ?? req.headers.get("referer");
  if (!host || !from) return false;
  try {
    return new URL(from).host === host;
  } catch {
    return false;
  }
}

function limited(req: Request): boolean {
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.start > WINDOW_MS) {
    hits.set(ip, { n: 1, start: now });
    // Keep the map small: drop stale entries now and then.
    if (hits.size > 5000) for (const [k, v] of hits) if (now - v.start > WINDOW_MS) hits.delete(k);
    return false;
  }
  h.n += 1;
  return h.n > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return new Response(null, { status: 403 });
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY) return new Response(null, { status: 413 });
  if (limited(req)) return new Response(null, { status: 429 });
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) return new Response(null, { status: 413 });
    const { p, d, s } = JSON.parse(text);
    if (typeof p !== "string" || typeof d !== "number" || typeof s !== "string") {
      return new Response(null, { status: 400 });
    }
    const path = (p.startsWith("/") ? p : "/")
      .slice(0, 200)
      .replace(/[^a-zA-Z0-9\-/]/g, "")
      .replace(/\//g, "|");
    const ms = Math.min(Math.max(Math.round(d), 0), 30 * 60 * 1000);
    const sid = s.replace(/[^a-z0-9]/gi, "").slice(0, 16) || "anon";
    if (ms < 1000) return new Response(null, { status: 204 });
    const day = new Date().toISOString().slice(0, 10);
    await put(`t/${day}/${path}~${ms}~${sid}~${Date.now()}`, "1", {
      access: "public",
      addRandomSuffix: true,
      contentType: "text/plain",
    });
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
