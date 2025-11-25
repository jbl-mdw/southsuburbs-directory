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
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/cities?sort=name&limit=100`,
      {
        next: { revalidate: 3600 },
      }
    );
    
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

export default async function CitiesPage() {
  const cities = await getCities();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Cities</h1>
      
      {cities.length === 0 ? (
        <p className="text-gray-600">No cities found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/city/${city.slug}`}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{city.name}</h3>
              {city.state && <p className="text-sm text-gray-600">{city.state}</p>}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
