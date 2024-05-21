/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: Change in production
  typescript: {
    ignoreBuildErrors: true,
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  experimental: {
    serverComponentsExternalPackages: ["bcryptjs"],
  },
  swcMinify: true,
};

export default nextConfig;
