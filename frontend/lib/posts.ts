import { directusGet } from './directus';

// CC-BLOG-001 - real fields only. `related_cities.slug` (the original
// query) referenced a relation that never existed in the live Directus
// schema - confirmed via GET /relations, zero rows for `posts`. The real
// schema (extended this mission: body/SEO/provenance fields +
// posts_categories/posts_cities/posts_businesses junctions, mirroring the
// exact businesses_categories/businesses_cities convention) is queried
// here instead.
const POST_FIELDS = [
  'id',
  'title',
  'slug',
  'excerpt',
  'body',
  'hero_image',
  'hero_image_alt',
  'social_image',
  'author_name',
  'published_at',
  'is_featured',
  'meta_description',
  'source_keyword',
  'canonical_industry',
  'geography_city',
  'geography_state',
  'overlay_slug',
  'owner_type',
  'owner_business_id',
  'related_post_ids',
];

// Fetch all published posts for /blog listing
export async function getAllPosts() {
  const data = await directusGet('posts', {
    filter: { status: { _eq: 'published' } },
    limit: 30,
    sort: '-published_at',
    fields: POST_FIELDS,
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
  const data = await directusGet('posts', {
    filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
    limit: 1,
    fields: POST_FIELDS,
  });

  return (data && data[0]) || null;
}

// Real category/city relationships for a post - mirrors
// lib/directus.ts's businesses_categories/businesses_cities query pattern
// exactly (junction fetch, then a second fetch by resolved ids).
export async function getPostCategoriesAndCities(postId: number) {
  const [categoryRels, cityRels] = await Promise.all([
    directusGet('posts_categories', { filter: { post_id: { _eq: postId } }, fields: ['category_id.name', 'category_id.slug'] }),
    directusGet('posts_cities', { filter: { post_id: { _eq: postId } }, fields: ['city_id.name', 'city_id.slug'] }),
  ]);

  return {
    categories: (categoryRels || []).map((r: any) => r.category_id).filter(Boolean),
    cities: (cityRels || []).map((r: any) => r.city_id).filter(Boolean),
  };
}

// Real featured businesses linked to a post (posts_businesses junction).
export async function getPostBusinesses(postId: number) {
  const rels = await directusGet('posts_businesses', {
    filter: { post_id: { _eq: postId } },
    fields: ['business_id.name', 'business_id.slug', 'business_id.city', 'business_id.category_slug'],
  });
  return (rels || []).map((r: any) => r.business_id).filter(Boolean);
}
