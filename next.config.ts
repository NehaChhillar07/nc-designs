import type { NextConfig } from "next";

import { CUTOVER_REDIRECTS } from "./lib/cutover-redirects";

const nextConfig: NextConfig = {
  // No `output` mode on purpose. "standalone" is for containerised self-hosting
  // (see Next's deploying guide: it exists to build a minimal Docker image) and
  // it never did anything for this site, which deploys to Vercel and lets Vercel
  // produce its own output. It was previously set here labelled "static exports",
  // which it is not. From Next 16.3 it actively breaks the Vercel build:
  //   ENOENT: .next/next-server.js.nft.json
  // Do not re-add it unless this site starts shipping in a container.

  // Dev only: lets a phone on the same Wi-Fi load the dev server's scripts
  // (Next blocks other origins by default, so the page would load but never
  // respond to a tap). This Mac's address on the current network; update it
  // when the network changes. Production ignores this setting.
  allowedDevOrigins: ["10.110.5.73"],

  // Compress responses
  compress: true,

  images: {
    // Modern formats for smaller file sizes
    formats: ["image/avif", "image/webp"],

    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Allow external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],

    // Minimize image processing time
    minimumCacheTTL: 31536000, // 1 year cache
  },

  // Redirect guessed URLs to home page anchors
  // Old addresses and shared /v2 links, one hop each (lib/cutover-redirects.ts).
  async redirects() {
    return CUTOVER_REDIRECTS;
  },

  // Performance headers
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|mp4|mov)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Security headers. A strict CSP is deliberately omitted: Motion sets
          // inline styles and Next injects inline scripts, so a safe CSP here
          // would need nonce plumbing. A separate task if ever needed.
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
