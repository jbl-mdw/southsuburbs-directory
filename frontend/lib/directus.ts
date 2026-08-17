// lib/directus.ts
import { createDirectus, readItems, rest } from "@directus/sdk";

const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL!;

export const directus = createDirectus(baseUrl).with(rest());

// DIRECTORY-INVENTORY-ISOLATION-CLOSEOUT-001 - the one, canonical
// "visible on South Suburbs Best" filter fragment. South Suburbs Best
// resolves its own canonical/global inventory (directory_scope IS
// NULL) plus anything explicitly configured as shared_inventory - it
// never automatically shows another provisioned directory's private
// inventory. Every SSB business-read path merges this same fragment
// in via `_and` rather than re-deriving its own visibility rule.
export const SSB_VISIBILITY_FILTER = {
  _or: [{ directory_scope: { _null: true } }, { shared_inventory: { _eq: true } }],
};

const businessFields = [
  "id",
  "name",
  "slug",
  "description",
  "short_description",
  "address_line1",
  "city",
  "state",
  "zipcode",
  "phone",
  "email",
  "website",
  "rating_average",
  "review_count",
  "is_featured",
  "is_claimed",
  "premium_status",
  "profile_score",
  "services_json",
  "service_area_json",
  "gallery_json",
  "category_slug",
  "ai_receptionist_enabled",
  "businessVideo",
  "audioBrandMessage",
];

export async function fetchBusinessBySlug(slug: string) {
  try {
    const response = await directus.request(
      readItems("businesses", {
        filter: {
          _and: [{ slug: { _eq: slug } }, SSB_VISIBILITY_FILTER],
        },
        fields: businessFields,
        limit: 1,
      })
    );

    return response[0] || null;
  } catch (error) {
    console.error("Error fetching business:", error);
    return null;
  }
}

export async function directusGet(collection: string, params: any) {
  return directus.request(readItems(collection, params));
}
export async function fetchFeaturedBusinesses(limit = 3) {
  try {
    const response = await directus.request(
      readItems("businesses", {
        filter: {
          _and: [
            {
              _or: [
                { is_featured: { _eq: true } },
                { premium_status: { _neq: "none" } },
                { ai_receptionist_enabled: { _eq: true } },
              ],
            },
            SSB_VISIBILITY_FILTER,
          ],
        },
        fields: businessFields,
        sort: ["-ai_receptionist_enabled", "-is_featured", "-profile_score"],
        limit,
      })
    );

    return response || [];
  } catch (error) {
    console.error("Error fetching featured businesses:", error);
    return [];
  }
}
