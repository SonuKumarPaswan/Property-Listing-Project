import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.29.7"],

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;