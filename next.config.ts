import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["tailwindcss"],
    optimizeCss: true, // required for Tailwind v4
  },
};

export default nextConfig;
