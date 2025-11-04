import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main className="bg-white flex flex-col w-full">
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            News & Tips
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            Smart insights for South Suburbs homeowners.
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-3 gap-8">
           {posts.map((post: any) => (

              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl border shadow hover:shadow-md overflow-hidden transition bg-white group"
              >
                {post.hero_image && (
                  <div
                    className="h-40 bg-gray-200 bg-cover bg-center group-hover:opacity-90 transition"
                    style={{ backgroundImage: `url(${post.hero_image})` }}
                  />
                )}
                <div className="p-5">
                  <div className="text-base font-semibold text-gray-900 line-clamp-2">
                    {post.title}
                  </div>
                  {post.excerpt && (
                    <div className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {post.excerpt}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 font-medium mt-4 flex flex-col">
                    <span>{post.author_name || "South Suburbs Best"}</span>
                    <span>
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString()
                        : "Recently"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
