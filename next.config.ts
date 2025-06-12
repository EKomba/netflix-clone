import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/**", // matches all paths under that domain
      },
      {
        protocol: "https",
        hostname: "rb.gy",
        pathname: "/**", // allow all paths on rb.gy
      },
    ],
  },
};

export default nextConfig;
