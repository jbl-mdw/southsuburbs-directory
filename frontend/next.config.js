/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            // FIX: Added https://agent.klirtrak.com to script-src and connect-src
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://agent.klirtrak.com; connect-src 'self' https://agent.klirtrak.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://placehold.co;",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
