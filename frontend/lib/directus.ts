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
