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
    domains: ["thumbs.dreamstime.com"], // Add your image domain here
  },
}

module.exports = nextConfig
