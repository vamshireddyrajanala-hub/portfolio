import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // GitHub Pages serves from /portfolio (not root)
  basePath: isProd ? "/portfolio" : "",
  assetPrefix: isProd ? "/portfolio/" : "",

  // GitHub Pages doesn't support trailing slashes by default
  trailingSlash: true,

  // Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },

  reactStrictMode: false,
};

export default nextConfig;
