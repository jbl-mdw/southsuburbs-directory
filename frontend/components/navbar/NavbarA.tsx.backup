import Link from "next/link";
import LocationsMenu from "./LocationsMenu";
import CategoriesMegaMenu from "./CategoriesMegaMenu";

const headers: HeadersInit = process.env.DIRECTUS_TOKEN
  ? { Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}` }
  : {};

async function getCategories() {
  const base = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;
  const res = await fetch(
    `${base}/items/categories?limit=60&sort=name&fields=id,name,slug`,
    { cache: "no-store", headers }
  );
  const json = await res.json();
  return json.data || [];
}

// Hybrid: up to 6 featured + rotating non-featured to make 12
async function getCitiesForMenuHybrid() {
  const base = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;

  const featRes = await fetch(
    `${base}/items/cities?` +
      `filter[or][0][is_active][_eq]=true&` +
      `filter[or][1][is_active][_null]=true&` +
      `filter[is_featured][_eq]=true&` +
      `sort[]=sort_order&sort[]=name&limit=6&fields=name,slug`,
    { cache: "no-store", headers }
  );
  const featured = (await featRes.json()).data || [];

  const remaining = Math.max(12 - featured.length, 0);
  if (remaining === 0) return featured;

  const countRes = await fetch(
    `${base}/items/cities?aggregate[count]=id&` +
      `filter[or][0][is_active][_eq]=true&` +
      `filter[or][1][is_active][_null]=true&` +
      `filter[is_featured][_neq]=true`,
    { cache: "no-store", headers }
  );
  const totalNF = ((await countRes.json())?.data?.[0]?.count || 0) as number;
  if (!totalNF) return featured;

  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const offset = day % totalNF;

  const baseNF =
    `${base}/items/cities?` +
    `filter[or][0][is_active][_eq]=true&` +
    `filter[or][1][is_active][_null]=true&` +
    `filter[is_featured][_neq]=true&` +
    `sort[]=sort_order&sort[]=name&fields=name,slug`;

  async function slice(limit: number, off: number) {
    const r = await fetch(`${baseNF}&limit=${limit}&offset=${off}`, { cache: "no-store", headers });
    const j = await r.json();
    return j.data || [];
  }

  let nonFeatured: any[] = [];
  const firstChunk = Math.min(remaining, totalNF - offset);
  if (firstChunk > 0) nonFeatured = nonFeatured.concat(await slice(firstChunk, offset));
  const stillNeed = remaining - firstChunk;
  if (stillNeed > 0) nonFeatured = nonFeatured.concat(await slice(stillNeed, 0));
  return [...featured, ...nonFeatured].slice(0, 12);
}

export default async function NavbarA() {
  const [categories, cities] = await Promise.all([getCategories(), getCitiesForMenuHybrid()]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">South Suburbs Best</Link>

        <div className="flex items-center gap-6">

          {/* Categories Mega Menu */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1">
              Explore Categories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <CategoriesMegaMenu categories={categories} />
            </div>
          </div>

          {/* Locations with Autosuggest */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1">
              Explore Locations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <LocationsMenu initialCities={cities} />
            </div>
          </div>

          <Link href="/submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
            + Add Listing
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Sign In</Link>
        </div>
      </div>
    </nav>
  );
}
