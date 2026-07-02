import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
};

export default nextConfig;