/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["bcryptjs"],
    instrumentationHook: true,
  },
  transpilePackages: [
    '@opentelemetry/api',
    '@opentelemetry/core',
    '@opentelemetry/resources'
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: false,
      http: false,
      https: false,
      zlib: false,
    };
    return config;
  },
  swcMinify: true,
};

export default nextConfig;