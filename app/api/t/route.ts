import { put } from "@vercel/blob";

// Receives one time-on-page beacon from components/time-tracker.tsx.
// All the data rides in the blob's pathname ("/" becomes "|"), so the
// stats route can aggregate from list() calls alone without fetching
// blob bodies. Blobs hold a page path, a duration, and a random
// per-tab session id. No IPs, no names, nothing personal.
export async function POST(req: Request) {
  try {
    const { p, d, s } = JSON.parse(await req.text());
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
