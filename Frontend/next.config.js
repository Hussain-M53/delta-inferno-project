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
    domains: ["images.unsplash.com",'cdn.sanity.io'], 
  },
}

module.exports = nextConfig
