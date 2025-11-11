import Link from 'next/link';

interface City {
  id: string;
  name: string;
  slug: string;
  state?: string;
}

async function getCities(): Promise<City[]> {
  try {
    const res = await fetch(
      `${process.env.DIRECTUS_URL}/items/cities?sort=name&limit=100`,
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
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

export default async function CitiesPage() {
  const cities = await getCities();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Cities</h1>
      
      {cities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/city/${city.slug}`}
              className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-xl text-gray-800">
                📍 {city.name}
              </h3>
              {city.state && (
                <p className="text-gray-600 text-sm mt-1">{city.state}</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">
          No cities available at this time.
        </p>
      )}
    </div>
  );
}
