import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // disables LightningCSS for now
  },
};

export default nextConfig;
