export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, getPostCategoriesAndCities, getPostBusinesses } from "@/lib/posts";

const DIRECTUS_URL = "https://southsuburbsbest.com/directus";
const assetUrl = (fileId: string | null) => (fileId ? `${DIRECTUS_URL}/assets/${fileId}` : null);

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found | South Suburbs Best" };
  return {
    title: `${post.title} | South Suburbs Best`,
    description: post.meta_description || post.excerpt,
    alternates: { canonical: `https://southsuburbsbest.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt,
      images: assetUrl(post.social_image || post.hero_image) ? [assetUrl(post.social_image || post.hero_image)!] : [],
    },
  };
}

export default async function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const [{ categories, cities }, businesses] = await Promise.all([getPostCategoriesAndCities(post.id), getPostBusinesses(post.id)]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    datePublished: post.published_at,
    author: { "@type": "Organization", name: post.author_name || "South Suburbs Best" },
    ...(post.geography_city ? { spatialCoverage: { "@type": "Place", name: `${post.geography_city}, ${post.geography_state || ""}`.trim() } } : {}),
  };

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px" }}>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
        <Link href="/blog">Blog</Link>
        {categories[0] && (
          <>
            {" / "}
            <Link href={`/category/${categories[0].slug}`}>{categories[0].name}</Link>
          </>
        )}
        {cities[0] && (
          <>
            {" / "}
            <Link href={`/city/${cities[0].slug}`}>{cities[0].name}</Link>
          </>
        )}
      </nav>

      {post.owner_type === "PREMIUM_CLIENT" && (
        <div style={{ background: "#fff8e1", border: "1px solid #ffe08a", borderRadius: 10, padding: "8px 14px", fontSize: 13, marginBottom: 16 }}>
          Sponsored content from a Premium South Suburbs Best listing.
        </div>
      )}

      <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>{post.title}</h1>
      <p style={{ color: "#777", fontSize: 14, marginBottom: 20 }}>
        By {post.author_name || "South Suburbs Best"}
        {post.published_at ? ` · ${new Date(post.published_at).toLocaleDateString()}` : ""}
      </p>

      {assetUrl(post.hero_image) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={assetUrl(post.hero_image)!} alt={post.hero_image_alt || post.title} style={{ width: "100%", borderRadius: 14, marginBottom: 24 }} />
      )}

      {/* eslint-disable-next-line react/no-danger */}
      <div style={{ fontSize: 17, lineHeight: 1.7, color: "#222" }} dangerouslySetInnerHTML={{ __html: post.body || "" }} />

      {businesses.length > 0 && (
        <aside style={{ marginTop: 40, borderTop: "1px solid #eee", paddingTop: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Featured businesses</h2>
          <ul>
            {businesses.map((b: any) => (
              <li key={b.slug}>
                <Link href={`/business/${b.slug}`}>{b.name}</Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </main>
  );
}
