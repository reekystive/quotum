import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from 'next';

void initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.web.json',
  },
  transpilePackages: ['@quotum/app-quotum-server'],
};

export default nextConfig;
