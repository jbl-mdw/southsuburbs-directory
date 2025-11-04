import React from "react";

type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  hero_image?: string;
  author_name?: string;
  published_at?: string;
};

export function NewsTipsSection({ posts }: { posts: Post[] }) {
  if (!posts?.length) return null;

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          News & Tips
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border shadow hover:shadow-md overflow-hidden transition bg-white"
            >
              {post.hero_image && (
                <div
                  className="h-32 bg-gray-200 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.hero_image})` }}
                />
              )}

              <div className="p-4">
                <div className="text-base font-semibold text-gray-900 line-clamp-2">
                  {post.title}
                </div>
                {post.excerpt && (
                  <div className="text-sm text-gray-600 line-clamp-3 mt-2">
                    {post.excerpt}
                  </div>
                )}
                <div className="text-xs text-gray-400 font-medium mt-4">
                  {post.author_name || "South Suburbs Best"} ·{" "}
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString()
                    : "Recently"}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/blog"
            className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all articles →
          </a>
        </div>
      </div>
    </section>
  );
}
