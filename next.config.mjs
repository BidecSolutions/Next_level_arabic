// next.config.mjs
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@popperjs/core/lib/popper-lite.js": require.resolve(
        "@popperjs/core/lib/popper.js"
      ),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trademe.datainovate.com",
        pathname: "/backend/storage/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "www.nextlevelrealestate.ae",
        pathname: "/backend/storage/**",
      },
    ],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
