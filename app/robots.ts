// app/robots.ts
// Next.js auto-serves this at /robots.txt

import type { MetadataRoute } from "next";

const SITE_URL = "https://dr-trend.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        disallow: ["/cart", "/checkout", "/account", "/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
