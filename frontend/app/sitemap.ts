import type { MetadataRoute } from "next";

export const revalidate = 3600; // rebuild sitemap every hour

async function getCities() {
  const base = process.env.DIRECTUS_URL!;
  const token = process.env.DIRECTUS_STATIC_TOKEN!;
  const url = `${base}/items/cities?fields=slug,updated_at&limit=-1&sort=slug`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://southsuburbsbest.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/submit`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/login`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const cities = await getCities();
  const cityRoutes: MetadataRoute.Sitemap = cities.map((c: any) => ({
    url: `${base}/city/${c.slug}`,
    lastModified: c.updated_at ?? new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...cityRoutes];
}
