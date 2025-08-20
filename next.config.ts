import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "http://localhost:5000/api/:path*",
        destination: "https://api.indlognetwork.com/api/:path*", // proxy to backend
      },
    ];
  },
};

export default nextConfig;
