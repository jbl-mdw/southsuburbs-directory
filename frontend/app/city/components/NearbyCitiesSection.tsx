import React from "react";

type NearbyCity = { name: string; slug: string; main_zip?: string };

export function NearbyCitiesSection({ cities }: { cities: NearbyCity[] }) {
  if (!cities?.length) return null;

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-xl font-semibold mb-6">Nearby Cities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cities.map((c) => (
            <a
              key={c.slug}
              href={`/city/${c.slug}`}
              className="rounded-lg border p-4 shadow hover:shadow-md transition"
            >
              <div className="text-base font-semibold text-gray-900">
                {c.name}
              </div>
              {c.main_zip && (
                <div className="text-xs text-gray-500">{c.main_zip}</div>
              )}
              <div className="text-xs text-blue-600 font-medium mt-1">
                View local pros →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
