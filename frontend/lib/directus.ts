const DIRECTUS_URL = process.env.DIRECTUS_URL || "https://southsuburbsbest.com/directus";
const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN || "";

/** Serialize Directus params the way the API expects. */
function addParam(url: URL, key: string, val: any) {
  if (val === undefined || val === null) return;
  // Directus accepts fields[]=a&fields[]=b (most reliable)
  if (key === "fields" && Array.isArray(val)) {
    val.forEach((f) => url.searchParams.append("fields[]", String(f)));
    return;
  }
  // Everything else as string or JSON
  url.searchParams.set(key, typeof val === "string" ? val : JSON.stringify(val));
}

export async function directusGet(path: string, query?: Record<string, any>) {
  const url = new URL(`${DIRECTUS_URL}/items/${path}`);
  if (query) Object.entries(query).forEach(([k, v]) => addParam(url, k, v));

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${DIRECTUS_STATIC_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[directusGet] non-OK", res.status, res.statusText, url.toString(), body.slice(0, 400));
      return { data: [] };
    }

    const json = await res.json().catch((e) => {
      console.error("[directusGet] JSON parse error", e, url.toString());
      return null;
    });
    return json ?? { data: [] };
  } catch (e) {
    console.error("[directusGet] fetch error", e);
    return { data: [] };
  }
}

export async function getCityBySlug(slug: string) {
  const data = await directusGet("cities", {
    filter: { slug: { _eq: slug } },
    limit: 1,
    // keep it simple; pull only primitives we know exist
    fields: ["id", "name", "slug", "state", "county", "description", "main_zip", "blurb"],
  });
  return Array.isArray((data as any)?.data) && (data as any).data.length ? (data as any).data[0] : null;
}

export async function getNearbyCities() {
  const data = await directusGet("cities", { limit: 6, fields: ["name", "slug"] });
  return Array.isArray((data as any)?.data) ? (data as any).data : [];
}

// keep for compatibility with existing imports
export async function getFeaturedPostsForCity() {
  const data = await directusGet("posts", {
    limit: 3,
    sort: "-published_at",
    fields: ["title", "slug", "excerpt"],
  });
  return Array.isArray((data as any)?.data) ? (data as any).data : [];
}
// ======================
// BUSINESS HELPERS
// ======================

export type Business = {
  id: string;
  slug: string;
  name: string;
  website?: string | null;
  services_text?: string | null;
  tagline?: string | null;
  description?: string | null;
  phone?: string | null;
  email?: string | null;
  address1?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  website_root?: string | null;
};

export async function getBusinessBySlug(
  slug: string
): Promise<Business | null> {
  if (!slug) return null;

  const data = await directusGet("businesses", {
    filter: { slug: { _eq: slug } },
    limit: 1,
    fields: [
      "id",
      "slug",
      "name",
      "website",
      "services_text",
      "tagline",
      "description",
      "phone",
      "email",
      "address1",
      "city",
      "state",
      "postal_code",
      "website_root",
    ],
  });

  const rows = (data as any)?.data;
  if (!Array.isArray(rows) || rows.length === 0) return null;

  return rows[0] as Business;
}

export async function getAllBusinessSlugs(): Promise<string[]> {
  const data = await directusGet("businesses", {
    fields: ["slug"],
    limit: -1,
  });

  const rows = (data as any)?.data;
  if (!Array.isArray(rows)) return [];

  return rows
    .map(
      (row: any) => (row?.slug as string | undefined)?.trim().toLowerCase()
    )
    .filter((slug): slug is string => !!slug);
}
