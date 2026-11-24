import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Let the homepage proxy identify Next.js prefetch and RSC requests.
    skipProxyUrlNormalize: true,
    async headers() {
        return ["/images/:path*", "/fonts/:path*"].map(source => ({
            source,
            headers: [
                { key: "Cache-Control", value: "public, max-age=86400, must-revalidate" },
            ],
        }));
    },
};

export default nextConfig;
