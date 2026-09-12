import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict Mode's dev-only double-mount interacts badly with framer-motion's
  // mount-triggered `animate` lifecycle (elements can get stuck at their
  // initial/hidden state in `next dev`). Production builds are unaffected;
  // this keeps the dev server visually consistent with production.
  reactStrictMode: false,
};

export default nextConfig;
