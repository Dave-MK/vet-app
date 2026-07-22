import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile at D:\ makes Turbopack infer the wrong workspace root.
  turbopack: { root: __dirname },
};

export default nextConfig;
