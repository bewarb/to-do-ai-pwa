import type { NextConfig } from "next";
import createPWA from "@ducanh2912/next-pwa";

const isDev = process.env.NODE_ENV === "development";

const withPWA = createPWA({
  dest: "public",
  disable: isDev,
  register: true,
  reloadOnOnline: true,
  cacheOnFrontEndNav: true,
  
  //offline fallback
  fallbacks: {
    document: "/offline",
  },
  
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*\/_next\/static\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "static-assets",
          expiration: { 
            maxEntries: 100, 
            maxAgeSeconds: 60 * 60 * 24 * 30 
          },
        },
      },
      {
        urlPattern: /\/icons\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "app-icons",
          expiration: { 
            maxEntries: 20, 
            maxAgeSeconds: 60 * 60 * 24 * 365
          },
        },
      },
      {
        urlPattern: /\/tasks/,
        handler: "NetworkFirst",
        options: {
          cacheName: "page-shell",
          networkTimeoutSeconds: 3,
          expiration: { 
            maxEntries: 10, 
            maxAgeSeconds: 60 * 60 * 24 * 7
          },
        },
      },
      //cache API responses
      {
        urlPattern: ({ url }) => {
          return url.origin === process.env.NEXT_PUBLIC_API_BASE_URL || 
                 url.pathname.startsWith('/api/');
        },
        handler: "NetworkFirst",
        options: {
          cacheName: "api-cache",
          networkTimeoutSeconds: 3,
          expiration: { 
            maxEntries: 50, 
            maxAgeSeconds: 60 * 60 * 24 
          },
          cacheableResponse: { 
            statuses: [0, 200] 
          },
        },
      },
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "pages-cache",
          networkTimeoutSeconds: 3,
          expiration: { 
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24
          },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: false,
  },
};

export default withPWA(nextConfig);