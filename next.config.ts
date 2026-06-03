import dns from 'node:dns'
dns.setDefaultResultOrder('ipv4first')

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return []
  },
}

export default nextConfig
