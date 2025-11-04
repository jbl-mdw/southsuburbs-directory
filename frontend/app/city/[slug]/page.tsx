import { getCityBySlug } from "@/lib/directus";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CityPage({ params }: { params: { slug: string } }) {
  try {
    const city = await getCityBySlug(params.slug);
    if (!city) {
      console.error("[city page] no city for slug", params.slug);
      return <div className="p-20 text-center">City not found</div>;
    }
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{city.name}, {city.state}</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600 mb-2">Slug: {city.slug}</p>
          <p className="text-gray-600 mb-2">County: {city.county}</p>
          {city.description && <p className="mt-4 text-lg">{city.description}</p>}
          {city.blurb && <p className="mt-4 text-gray-700">{city.blurb}</p>}
        </div>
      </main>
    );
  } catch (e) {
    console.error("[city page] render error", e);
    return <div className="p-20 text-center">Error rendering page</div>;
  }
}
