import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: { slug: string } };

async function fetchPost(slug: string) {
  const base = process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL!;
  const filter = encodeURIComponent(JSON.stringify({ slug: { _eq: slug } }));
  const url =
    `${base}/items/posts?filter=${filter}` +
    `&limit=1&fields[]=title&fields[]=slug&fields[]=excerpt&fields[]=body` +
    `&fields[]=hero_image&fields[]=author_name&fields[]=published_at` +
    `&fields[]=is_featured&fields[]=related_cities.slug`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
  const json = await res.json();
  return json?.data?.[0] ?? null;
}

export async function generateMetadata() {
  return {
    title: 'Blog Post',
    description: 'Read our latest blog post',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await fetchPost(params.slug);
  if (!post) notFound();
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.published_at && (
        <p className="text-sm text-gray-500 mb-6">
          {new Date(post.published_at).toLocaleDateString()}
        </p>
      )}
      <article className="prose">
        {post.excerpt && <p><em>{post.excerpt}</em></p>}
        {post.body && <div dangerouslySetInnerHTML={{ __html: post.body }} />}
      </article>
    </main>
  );
}
