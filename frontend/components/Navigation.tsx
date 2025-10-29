import Link from 'next/link';

async function getCategories() {
  const res = await fetch(
    `${process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/categories?limit=20&sort=name`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data.data;
}

export default async function Navigation() {
  const categories = await getCategories();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          South Suburbs Best
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          {/* Explore Categories Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1">
              Explore Categories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown */}
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2 max-h-96 overflow-y-auto">
                {categories.slice(0, 15).map((category: any) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Explore Locations */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1">
              Explore Locations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown */}
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <Link href="/location/chicago-heights" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Chicago Heights</Link>
                <Link href="/location/homewood" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Homewood</Link>
                <Link href="/location/matteson" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Matteson</Link>
                <Link href="/location/park-forest" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Park Forest</Link>
                <Link href="/location/south-holland" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">South Holland</Link>
              </div>
            </div>
          </div>

          {/* Add Listing Button */}
          <Link
            href="/submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            + Add Listing
          </Link>

          {/* Sign In Button */}
          <Link
            href="/login"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
