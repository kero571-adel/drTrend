// app/sitemap.ts
// Next.js auto-serves this at /sitemap.xml — submit to Google Search Console

import type { MetadataRoute } from "next";

const SITE_URL = "https://dr-trend.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages ──────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0, // Home = highest priority
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/cart`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.2,
    },
  ];

  // ── Dynamic product pages ─────────────────────────────────────────────────
  // TODO: Replace with your actual product slugs from your data source.
  // Example using a static list — swap this for a DB/CMS call if needed:
  //
  // import { getAllProducts } from "@/data/products";
  // const products = getAllProducts();
  // const productPages = products.map((p) => ({
  //   url: `${SITE_URL}/shop/${p.slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: "weekly" as const,
  //   priority: 0.8,
  // }));

  const productSlugs: string[] = [
    // Add your real product slugs here, e.g.:
    // "classic-navy-scrub-set",
    // "premium-surgeon-coat-white",
    // "nurse-scrub-pink",
  ];

  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${SITE_URL}/shop/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}