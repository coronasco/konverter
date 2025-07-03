import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect old URLs to new ones if needed
      {
        source: '/api/health',
        destination: '/',
        permanent: false,
      },
      // Redirect www to non-www (or vice versa if you prefer)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'konverter-online.com',
          },
        ],
        destination: 'https://www.konverter-online.com/:path*',
        permanent: true,
      },
    ];
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
