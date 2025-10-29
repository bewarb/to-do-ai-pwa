import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const baseConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    // Optional: configure things like resolve or minify later
  },
  experimental: {
    optimizeCss: false,
  },
};

export default withPWA({
  dest: 'public',
  disable: isDev,
  register: true,
  skipWaiting: true,
})(baseConfig);
