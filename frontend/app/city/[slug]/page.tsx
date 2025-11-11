import { notFound } from 'next/navigation';
import Link from 'next/link';

interface City {
  id: string;
  name: string;
  slug: string;
  description?: string;
  state?: string;
}

interface Business {
  id: string;
  name: string;
  slug: string;
  description?: string;
  address?: string;
}

async function getCity(slug: string): Promise<City | null> {
  const res = await fetch(
    `${process.env.DIRECTUS_URL}/items/cities?filter[slug][_eq]=${slug}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data.data?.[0] || null;
}

async function getCityBusinesses(cityId: string): Promise<Business[]> {
  const res = await fetch(
    `${process.env.DIRECTUS_URL}/items/businesses?filter[city_id][_eq]=${cityId}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}

export default async function CityPage({ params }: { params: { slug: string } }) {
  const city = await getCity(params.slug);

  if (!city) {
    notFound();
  }

  const businesses = await getCityBusinesses(city.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        {city.name}, {city.state || 'IL'}
      </h1>
      
      {city.description && (
        <p className="text-gray-600 mb-8">{city.description}</p>
      )}

      <h2 className="text-2xl font-bold mb-4">
        Businesses in {city.name} ({businesses.length})
      </h2>

      {businesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <Link
              key={business.id}
              href={`/business/${business.slug}`}
              className="border rounded-lg p-6 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-xl mb-2">{business.name}</h3>
              {business.description && (
                <p className="text-gray-600 text-sm mb-2">{business.description}</p>
              )}
              {business.address && (
                <p className="text-gray-500 text-sm">{business.address}</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No businesses found in this city yet.</p>
      )}
    </div>
  );
}
