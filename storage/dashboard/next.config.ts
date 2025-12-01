import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["@mui/lab", "@mui/material-nextjs"],
  },
};

export default nextConfig;
