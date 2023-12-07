/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // ['https://img.ixintu.com', 'https://img.jianbihua.com', 'https://cdn.pixabay.com']
        hostname: 'img.ixintu.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        // ['https://img.ixintu.com', 'https://img.jianbihua.com', 'https://cdn.pixabay.com']
        hostname: 'img.jianbihua.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        // ['https://img.ixintu.com', 'https://img.jianbihua.com', 'https://cdn.pixabay.com']
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
