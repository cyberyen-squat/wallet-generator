/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  webpack: (config) => {
    // Enable WebAssembly
    config.experiments = {
      asyncWebAssembly: true, // Enable async WebAssembly
    };
    return config;
  },
};

export default nextConfig;
