/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'www.gravatar.com',
      'localhost',
      'ec2-54-211-143-67.compute-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
