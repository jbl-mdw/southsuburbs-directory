import { directus, directusGet } from './directus';

// Fetch all posts for /blog listing
export async function getAllPosts() {
  const data = await directusGet("posts", {
    limit: 30,
    sort: "-published_at",
    fields: [
      "title",
      "slug",
      "excerpt",
      "body",
      "hero_image",
      "author_name",
      "published_at",
      "is_featured",
      "related_cities.slug",
    ],
  });

  return data || [];
}

// Generate static params for /blog/[slug]
export async function getAllPostSlugs() {
  const posts = await getAllPosts();
  return posts.map((p: any) => p.slug).filter(Boolean);
}

// Single post by slug
export async function getPostBySlug(slug: string) {
  const data = await directusGet("posts", {
    filter: { slug: { _eq: slug } },
    limit: 1,
    fields: [
      "title",
      "slug",
      "excerpt",
      "body",
      "hero_image",
      "author_name",
      "published_at",
      "is_featured",
      "related_cities.slug",
    ],
  });

  return data || [];
}
