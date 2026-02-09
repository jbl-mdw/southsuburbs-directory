import Link from 'next/link';

type Category = { id: string | number; name: string; slug: string };

export default async function Navbar() {
  const base =
    process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || '';

  let categories: Category[] = [];

  if (base) {
    try {
      const url = `${base}/items/categories?limit=60&sort=name&fields=id,name,slug`;
      const res = await fetch(url, { next: { revalidate: 300 } });
      const json = await res.json();
      categories = Array.isArray(json?.data) ? json.data : [];
    } catch {
      categories = [];
    }
  }

  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="font-semibold">
          SouthSuburbsBest
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/listings">Listings</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3 text-xs text-gray-600 overflow-x-auto">
          {categories.slice(0, 10).map((c) => (
            <Link key={String(c.id)} href={`/category/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
