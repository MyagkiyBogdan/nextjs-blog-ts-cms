/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  basePath: '/nextjs-blog-ts-cms',
  assetPrefix: '/nextjs-blog-ts-cms',
};

module.exports = nextConfig;
