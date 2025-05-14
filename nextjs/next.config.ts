import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    // remotePatterns: [new URL('http://localhost/**'), new URL('http://localhost:8000/**'), new URL('http://localhost:3000/**'), new URL('http://localhost:80/**')],
  },
};

export default nextConfig;
