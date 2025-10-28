import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Disable experimental features that may cause issues on Netlify
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Ensure output is compatible with Netlify
  output: 'standalone',
};

export default nextConfig;
