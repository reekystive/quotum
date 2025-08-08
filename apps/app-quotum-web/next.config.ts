import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from 'next';

void initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.web.json',
  },
  transpilePackages: ['@quotum/app-quotum-server'],
  compress: true,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
