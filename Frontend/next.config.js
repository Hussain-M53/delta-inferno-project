/** @type {import('next').NextConfig} */
const nextConfig = {

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
        ],
      },
    ];
  },

  images: {
    domains: ["thumbs.dreamstime.com", "images.unsplash.com"], 
  },
}

module.exports = nextConfig
