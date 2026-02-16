/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  reactStrictMode: true,

};

module.exports = nextConfig;
