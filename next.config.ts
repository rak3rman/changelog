import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Add custom MDX components here
    providerImportSource: "@mdx-js/react",
  },
});

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Configure images - allow any domain without optimization
  images: {
    unoptimized: true,
  },

  // Add webpack configuration for Lit
  webpack: (config, { isServer }) => {
    // Lit uses browser APIs that aren't available in the Node.js environment
    if (isServer) {
      // For server-side rendering, we need to polyfill some browser globals
      config.resolve.fallback = {
        ...config.resolve.fallback,
      };
    }

    return config;
  },
};

export default withMDX(nextConfig);
