/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "www.si.com"}
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/recent",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
