import Link from "next/link";
import Image from "next/image";
import CategoriesMegaMenu from "./navbar/CategoriesMegaMenu";
import LocationsMenu from "./navbar/LocationsMenu";

const headers: HeadersInit = process.env.DIRECTUS_TOKEN
  ? { Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}` }
  : {};

async function getCategories() {
  const base = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;
  if (!base) return [];

  const url = `${base}/items/categories?limit=60&sort=name&fields=id,name,slug`;

  const res = await fetch(url, {
    next: { revalidate: 300 },
    headers,
  });

  if (!res.ok) return [];
  const json = await res.json();
  return json?.data ?? [];
}

async function getCities() {
  const base = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;
  if (!base) return [];

  const url = `${base}/items/cities?limit=12&filter[is_featured][_eq]=true&sort=name&fields=name,slug`;

  const res = await fetch(url, {
    next: { revalidate: 300 },
    headers,
  });

  if (!res.ok) return [];
  const json = await res.json();
  return json?.data ?? [];
}

export default async function Navbar() {
  const [categories, cities] = await Promise.all([getCategories(), getCities()]);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="South Suburbs Best"
            width={360}
            height={72}
            className="h-16 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1">
              Browse Categories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <CategoriesMegaMenu categories={categories} />
            </div>
          </div>

          <div className="relative group">
            <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1">
              Explore Locations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <LocationsMenu initialCities={cities} cities={cities} setIsOpen={() => {}} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
            + Add Listing
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
