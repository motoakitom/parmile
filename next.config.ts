import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'image.uniqlo.com'
      },
      {
        protocol: 'https',
        hostname: 'static.zara.net'
      }
    ]
  },
};

export default nextConfig;
