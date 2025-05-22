/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'image.uniqlo.com'
      },
      {
        protocol: 'https',
        hostname: 'static.zara.net'
      }
    ]
  },
};

module.exports = nextConfig; 