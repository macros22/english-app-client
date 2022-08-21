
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/user-words",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;