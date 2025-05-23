// next.config.js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Modern alternatives to deprecated options:
  compress: true, // Replaces some minification functionality
  reactStrictMode: true,
  
  // For CORS handling (better to use middleware)
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development' 
              ? 'http://26.185.231.135:3003' 
              : 'https://your-production-domain.com'
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    domains: [], // Add allowed image domains here
  },
};

export default nextConfig;