export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | South Suburbs Best",
  description: "Local business guides, city resources, and category insights for the South Suburbs.",
};

const DIRECTUS_URL = "https://southsuburbsbest.com/directus";
const assetUrl = (fileId: string | null) => (fileId ? `${DIRECTUS_URL}/assets/${fileId}` : null);

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const featured = posts.find((p: any) => p.is_featured) || posts[0];
  const rest = posts.filter((p: any) => p.slug !== featured?.slug);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>South Suburbs Best Blog</h1>
        <p style={{ color: "#555", fontSize: 16 }}>Local guides, city resources, and category insights across the South Suburbs.</p>
      </header>

      {posts.length === 0 && <p style={{ color: "#777" }}>No articles published yet.</p>}

      {featured && (
        <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          <article style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, marginBottom: 40, border: "1px solid #eee", borderRadius: 16, overflow: "hidden" }}>
            {assetUrl(featured.hero_image) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={assetUrl(featured.hero_image)!} alt={featured.hero_image_alt || featured.title} style={{ width: "100%", height: 320, objectFit: "cover" }} />
            )}
            <div style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#0a7", textTransform: "uppercase", letterSpacing: 0.5 }}>Featured{featured.geography_city ? ` · ${featured.geography_city}` : ""}</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0" }}>{featured.title}</h2>
              <p style={{ color: "#555" }}>{featured.excerpt}</p>
            </div>
          </article>
        </Link>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
        {rest.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            <article style={{ border: "1px solid #eee", borderRadius: 14, overflow: "hidden", height: "100%" }}>
              {assetUrl(post.hero_image) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={assetUrl(post.hero_image)!} alt={post.hero_image_alt || post.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
              )}
              <div style={{ padding: 16 }}>
                {post.canonical_industry && <span style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase" }}>{post.canonical_industry}{post.geography_city ? ` · ${post.geography_city}` : ""}</span>}
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "6px 0" }}>{post.title}</h3>
                <p style={{ color: "#666", fontSize: 14 }}>{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
