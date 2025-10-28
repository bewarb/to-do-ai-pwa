/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    // Optional: configure things like resolve or minify later
  },
  experimental: {
    optimizeCss: false, // still valid
  },
};

export default nextConfig;
