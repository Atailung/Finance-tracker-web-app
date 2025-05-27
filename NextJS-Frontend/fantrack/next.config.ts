import type { NextConfig } from "next";

// interface WatchOptions {
//   poll: number;
//   aggregateTimeout: number;
// }

// interface WebpackDevMiddlewareConfig {
//   watchOptions?: WatchOptions;
//   [key: string]: unknown;
// }

const nextConfig: NextConfig = {
  // webpackDevMiddleware: (
  //   config: WebpackDevMiddlewareConfig
  // ): WebpackDevMiddlewareConfig => {
  //   config.watchOptions = {
  //     poll: 1000, // Check for changes every 1000ms (1 second)
  //     aggregateTimeout: 300, // Delay rebuild after first change
  //   };
  //   return config;
  // },
};

export default nextConfig;
