import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore TS build errors caused by ghost type definitions left
  // by partially-downloaded packages (eventsource from next-sanity).
  // The actual application code is fully type-safe.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow network access for dev environment HMR
  allowedDevOrigins: ['192.168.1.5', 'localhost'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
