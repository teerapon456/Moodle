/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MOODLE_URL: process.env.NEXT_PUBLIC_MOODLE_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/moodle/:path*',
        destination: 'http://moodle:80/webservice/rest/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
