import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tvonenews.com',
        pathname: '/appasset/responsive/img/logo/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
