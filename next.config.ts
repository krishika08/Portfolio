import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first, WebP fallback. Remote hosts must be added explicitly
    // via `remotePatterns` when real project media is introduced.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
