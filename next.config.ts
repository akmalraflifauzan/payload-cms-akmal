import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  images: {
    // Use remotePatterns (domains is deprecated). Allow localhost in dev and
    // allow a Supabase host when NEXT_PUBLIC_SUPABASE_HOST is set.
    remotePatterns: [
      // local dev pattern
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      // optional Supabase/public storage host (set NEXT_PUBLIC_SUPABASE_HOST in env)
      ...(process.env.NEXT_PUBLIC_SUPABASE_HOST
        ? [
            {
              protocol: 'https',
              hostname: process.env.NEXT_PUBLIC_SUPABASE_HOST as string,
              pathname: '/**',
            } as any,
          ]
        : []),
    ],
  },
  experimental: {},
};

export default withPayload(nextConfig);
