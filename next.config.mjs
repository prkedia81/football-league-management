/** @type {import('next').NextConfig} */
const nextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  experimental: {
    serverComponentsExternalPackages: ["bcryptjs"],
  },
  swcMinify: true,
};

export default nextConfig;
