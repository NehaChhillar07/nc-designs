import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for faster serving
  output: "standalone",

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
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
    ],

    // Minimize image processing time
    minimumCacheTTL: 31536000, // 1 year cache
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
        ],
      },
    ];
  },
};

export default nextConfig;
