import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `bun run build` produces a fully static `out/` folder
  // that can be deployed to any static host (Netlify, Vercel, S3, GitHub Pages, FTP).
  output: "export",
  images: {
    // Required for static export — disable next/image runtime optimisation.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
