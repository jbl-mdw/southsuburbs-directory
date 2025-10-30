async function getBusinesses() {
  const baseUrl = "https://southsuburbsbest.com";

  const res = await fetch(`${baseUrl}/api/businesses`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to load /api/businesses", res.status);
    return [];
  }

  const data = await res.json();
  return data.businesses || [];
}

export default async function ExplorePage() {
  const businesses = await getBusinesses();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          South Suburbs Best – Featured Businesses
        </h1>
        <p className="text-gray-600 text-sm">
          Real local businesses in Chicago’s South Suburbs.
        </p>
      </header>

      {/* Map placeholder (we'll wire Leaflet next) */}
      <section className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm">
        Map will go here
      </section>

      {/* Business List */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Businesses ({businesses.length})
        </h2>

        {businesses.length === 0 ? (
          <div className="text-gray-500 text-sm">No businesses found.</div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {businesses.map((biz: any) => (
              <li
                key={biz.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="font-semibold text-gray-900">
                    {biz.name || "Untitled"}
                  </div>
                  {biz.phone && (
                    <a
                      href={`tel:${biz.phone}`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {biz.phone}
                    </a>
                  )}
                </div>

                <div className="text-sm text-gray-700 mt-1">
                  {biz.address_line1}
                  {biz.city ? `, ${biz.city}` : ""} {biz.state} {biz.zipcode}
                </div>

                {biz.slug && (
                  <div className="text-xs text-gray-500 mt-2">
                    slug: {biz.slug}
                  </div>
                )}

                {biz.isMappable === true &&
                  biz.latitude &&
                  biz.longitude && (
                    <div className="text-[11px] text-green-600 mt-2">
                      On map: {biz.latitude}, {biz.longitude}
                    </div>
                  )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
