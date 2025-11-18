import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["@mui/lab"],
  },
};

export default nextConfig;
