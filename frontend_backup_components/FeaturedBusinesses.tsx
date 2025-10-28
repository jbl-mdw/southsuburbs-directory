import Link from 'next/link';
import { getBusinesses } from '@/lib/directus';

export default async function FeaturedBusinesses() {
  const businesses = await getBusinesses();
  const featured = businesses.filter((b: any) => b.is_featured).slice(0, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featured.map((business: any) => (
        <Link
          key={business.id}
          href={`/business/${business.slug}`}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
        >
          <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700"></div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {business.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {business.short_description || business.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                📍 {business.city}, {business.state}
              </span>
              <span className="text-yellow-500 font-semibold">
                ⭐ {business.rating_average}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
