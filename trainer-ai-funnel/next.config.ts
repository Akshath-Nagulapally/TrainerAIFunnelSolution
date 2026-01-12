import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use Cloudinary as the image loader
    loader: 'custom',
    loaderFile: './lib/cloudinary-loader.ts',
    // Allow Cloudinary domain for remote images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
