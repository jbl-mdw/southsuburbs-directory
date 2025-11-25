import NavbarClient from "./NavbarClient";

const DIRECTUS_BASE = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;
const headers: HeadersInit = process.env.DIRECTUS_TOKEN ? { Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}` } : {};

async function getCategories() {
  if (!DIRECTUS_BASE) return [];
  const res = await fetch(`${DIRECTUS_BASE}/items/categories?limit=60&sort=name&fields=id,name,slug,parent_category_id`, { 
    cache: "force-cache", 
    next: { revalidate: 300 }, 
    headers 
  });
  if (!res.ok) return [];
  const json = await res.json().catch(() => null);
  return json?.data || [];
}

function getPrimaryCities() {
  return [
    { name: "Flossmoor", slug: "flossmoor" },
    { name: "Glenwood", slug: "glenwood" },
    { name: "Frankfort", slug: "frankfort" },
    { name: "Orland Park", slug: "orland-park" },
    { name: "Tinley Park", slug: "tinley-park" },
    { name: "Homewood", slug: "homewood" },
    { name: "Lynwood", slug: "lynwood" },
    { name: "Country Club Hills", slug: "country-club-hills" },
    { name: "Olympia Fields", slug: "olympia-fields" },
    { name: "Hazel Crest", slug: "hazel-crest" },
    { name: "University Park", slug: "university-park" },
    { name: "Matteson", slug: "matteson" }
  ];
}

export default async function NavbarA() {
  const categories = await getCategories();
  const cities = getPrimaryCities();
  return <NavbarClient categories={categories} cities={cities} />;
}
