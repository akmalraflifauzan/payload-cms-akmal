import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  images: {
    // allow localhost for dev and allow a SUPABASE host if provided
    domains: [
      "localhost",
      ...(process.env.NEXT_PUBLIC_SUPABASE_HOST
        ? [process.env.NEXT_PUBLIC_SUPABASE_HOST]
        : []),
    ],
    // optional: allow storage path patterns
    remotePatterns: process.env.NEXT_PUBLIC_SUPABASE_HOST
      ? [
          {
            protocol: "https",
            hostname: process.env.NEXT_PUBLIC_SUPABASE_HOST,
            pathname: "/storage/**",
          },
        ]
      : [],
  },
  experimental: {},
};

export default withPayload(nextConfig);
