// The site's redirects, applied in next.config.ts. Written for the switch to
// the v2 design: the original site's anchor URLs and the /v2 preview links.
//
// Rules: every old URL reaches its final page in one hop. The /v2 spellings
// of the old anchor URLs get their own direct rules, so /v2/about never goes
// /v2/about → /about → /. Specific rules come before the /v2/:path* catch-all,
// because Next applies the first match.

type Redirect = { source: string; destination: string; permanent: boolean };

export const CUTOVER_REDIRECTS: Redirect[] = [
    // Old anchors on the original home page. v2 has no about section.
    { source: "/about", destination: "/", permanent: true },
    { source: "/v2/about", destination: "/", permanent: true },
    { source: "/work", destination: "/#v2-work", permanent: true },
    { source: "/v2/work", destination: "/#v2-work", permanent: true },
    // Not permanent: a writing index may become its own page later.
    { source: "/writings", destination: "/#lately", permanent: false },
    { source: "/writing", destination: "/#lately", permanent: false },
    { source: "/v2/writings", destination: "/#lately", permanent: false },
    { source: "/v2/writing", destination: "/#lately", permanent: false },
    // v2 links already shared keep working.
    { source: "/v2", destination: "/", permanent: true },
    { source: "/v2/:path*", destination: "/:path*", permanent: true },
];
