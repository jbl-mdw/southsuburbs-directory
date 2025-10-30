import { useState } from 'react';
import Link from 'next/link';

const MOCK_BUSINESSES = [
  {
    id: 1,
    name: "Quick Fix Plumbing",
    slug: "quick-fix-plumbing",
    rating: 4.8,
    review_count: 156,
    address: "123 Main St, Chicago Heights, IL",
    phone: "(708) 555-0123",
    city: "Chicago Heights",
    is_featured: true,
  },
  {
    id: 2,
    name: "Smith & Sons Plumbing",
    slug: "smith-sons-plumbing",
    rating: 4.5,
    review_count: 89,
    address: "456 Oak Ave, Homewood, IL",
    phone: "(708) 555-0456",
    city: "Homewood",
    is_featured: false,
  },
  {
    id: 3,
    name: "24/7 Emergency Plumbing",
    slug: "247-emergency-plumbing",
    rating: 4.9,
    review_count: 203,
    address: "789 Park Rd, Matteson, IL",
    phone: "(708) 555-0789",
    city: "Matteson",
    is_featured: false,
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isMobileMapOpen, setIsMobileMapOpen] = useState(false); // mobile best-practice: toggle map
  const categoryName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const BusinessCard = ({ business, isGrid }: { business: typeof MOCK_BUSINESSES[0]; isGrid: boolean }) => {
    const stars = [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < Math.floor(business.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));

    if (isGrid) {
      return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative">
            {business.is_featured && (
              <span className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                Featured
              </span>
            )}
            <div className="flex items-center justify-center h-full text-white text-4xl">
              🔧
            </div>
          </div>
          <div className="p-6">
            <Link href={`/business/${business.slug}`}>
              <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600">
                {business.name}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">{stars}</div>
              <span className="text-gray-600 text-sm">
                {business.rating} ({business.review_count})
              </span>
            </div>
            <div className="space-y-1 text-gray-600 text-sm mb-4">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {business.address}
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {business.phone}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href={`/business/${business.slug}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition text-center"
              >
                View Details
              </Link>
              {/* FIX: add missing <a> tag */}
              <a
                href={`tel:${business.phone}`}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-semibold transition text-center"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
        <div className="flex">
          <div className="w-64 h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0 relative">
            {business.is_featured && (
              <span className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                Featured
              </span>
            )}
            <div className="flex items-center justify-center h-full text-white text-4xl">
              🔧
            </div>
          </div>
          <div className="flex-1 p-6">
            <Link href={`/business/${business.slug}`}>
              <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600">
                {business.name}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">{stars}</div>
              <span className="text-gray-600 text-sm">
                {business.rating} ({business.review_count} reviews)
              </span>
            </div>
            <div className="space-y-1 text-gray-600 text-sm mb-4">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {business.address}
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {business.phone}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/business/${business.slug}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                View Details
              </Link>
              {/* FIX: add missing <a> tag */}
              <a
                href={`tel:${business.phone}`}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-semibold transition"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top header (kept) */}
      <div className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Results for {categoryName}
              </h1>
              <p className="text-gray-600 mt-2">{MOCK_BUSINESSES.length} businesses found</p>
            </div>

            {/* View toggle (kept) */}
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                title="Grid View"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                title="List View"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ⬆️ Moved Filters from sidebar to a top filter bar */}
      <div className="w-full border-b bg-white/90 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Left: Filter controls (reusing your sidebar fields) */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort By */}
              <label className="inline-flex items-center gap-2 rounded-full border px-2 py-1.5 text-sm">
                <span className="pl-1 text-gray-600">Sort By</span>
                <select className="bg-transparent pr-1 text-sm outline-none">
                  <option>Most Reviewed</option>
                  <option>Highest Rated</option>
                  <option>Nearest to Me</option>
                </select>
              </label>

              {/* Quick filters as chips */}
              <button className="rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50">Open Now</button>
              <button className="rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50">Credit Cards</button>
              <button className="rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50">Free Estimates</button>
              <button className="rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50">24/7 Service</button>

              {/* Location select */}
              <label className="inline-flex items-center gap-2 rounded-full border px-2 py-1.5 text-sm">
                <span className="pl-1 text-gray-600">Location</span>
                <select className="bg-transparent pr-1 text-sm outline-none">
                  <option>All Locations</option>
                  <option>Chicago Heights</option>
                  <option>Homewood</option>
                  <option>Matteson</option>
                  <option>Park Forest</option>
                </select>
              </label>

              {/* Mobile: Show/Hide Map toggle */}
              <button
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm md:hidden"
                onClick={() => setIsMobileMapOpen(s => !s)}
                aria-expanded={isMobileMapOpen}
                aria-controls="mobile-map"
              >
                {isMobileMapOpen ? 'Hide Map' : 'Show Map'}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile map (toggles open below the bar) */}
        <div id="mobile-map" className={`md:hidden ${isMobileMapOpen ? 'block' : 'hidden'}`}>
          <div className="container mx-auto px-4 pb-3">
            <div className="rounded-xl border bg-gray-100 px-4 py-10 text-center text-gray-600">
              <div className="mb-1 text-lg font-semibold">Map coming soon</div>
              <p className="text-sm text-gray-500">
                This map shows on large screens by default. On mobile, use “Show Map”.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body: 60% Listings + 40% Map placeholder on lg+ */}
      <div className="container mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-8">
          {/* LEFT: Listings */}
          <main className="min-w-0">
            {viewMode === 'list' ? (
              <div className="space-y-4">
                {MOCK_BUSINESSES.map((business) => (
                  <BusinessCard key={business.id} business={business} isGrid={false} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_BUSINESSES.map((business) => (
                  <BusinessCard key={business.id} business={business} isGrid={true} />
                ))}
              </div>
            )}
          </main>

          {/* RIGHT: Map placeholder (desktop/tablet only) */}
          <aside aria-label="Map" className="hidden lg:block">
            <div
              className="sticky top-24 h-[70vh] rounded-xl border bg-gray-100 text-gray-600"
              title="Map coming soon"
            >
              <div className="flex h-full items-center justify-center p-6 text-center">
                <div>
                  <div className="mb-1 text-lg font-semibold">Map coming soon</div>
                  <p className="text-sm text-gray-500">
                    This space will display a map once listings include location data.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
