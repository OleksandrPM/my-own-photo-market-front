const nextConfig = {
  experimental: {
    optimizePackageImports: ["tailwindcss"],
    optimizeCss: true, // required for Tailwind v4
  },
};

export default nextConfig;
