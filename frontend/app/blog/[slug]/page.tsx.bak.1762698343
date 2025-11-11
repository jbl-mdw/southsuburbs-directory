import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    if (!slugs?.length) return [];
    return slugs.map((slug: string) => ({ slug }));
  } catch {
    return [];
  }
}


export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <main className="container mx-auto max-w-3xl py-20 px-4 text-center text-gray-700">
        <h1 className="text-2xl font-semibold mb-4">Post not found</h1>
        <p className="text-sm text-gray-500">Check back soon.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full bg-white">
      <section className="bg-gray-900 text-white">
        <div className="relative w-full">
          {post.hero_image && (
            <div
              className="h-48 md:h-64 w-full bg-cover bg-center opacity-60"
              style={{ backgroundImage: `url(${post.hero_image})` }}
            />
          )}
          {!post.hero_image && <div className="h-32 md:h-40 w-full bg-gray-800" />}

          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="text-xs text-gray-200 font-medium flex flex-col">
                <span>{post.author_name || "South Suburbs Best"}</span>
                <span>
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString()
                    : "Recently"}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 pointer-events-none" />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <article
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body || "" }}
          />
        </div>
      </section>
    </main>
  );
}
