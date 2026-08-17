/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  images: {
    formats: ['image/avif', 'image/webp'],
    // REAL-ESTATE-DIRECTORY-PROPERTY-FOUNDATION-001 - property media is
    // real, seller/agent-submitted, externally-hosted URLs (no CDN/
    // upload pipeline exists in this repo yet - a real, disclosed gap,
    // never fabricated). https-only remote host allowlist, real and
    // necessary for next/image to render them at all; every other image
    // on this site stays a local /public asset, untouched.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },

  reactStrictMode: true,

};

module.exports = nextConfig;
