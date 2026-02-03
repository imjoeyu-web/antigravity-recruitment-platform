import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/company',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/culture',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: '/careers',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
