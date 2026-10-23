import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  return site ? [{ url: site.href, changeFrequency: "monthly", priority: 1 }] : [];
}
