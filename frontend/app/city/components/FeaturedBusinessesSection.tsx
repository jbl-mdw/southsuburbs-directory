import React from "react";

type Biz = {
  id: string;
  name: string;
  short_description?: string;
  phone?: string;
  slug?: string;
  primary_service?: string;
};

export function FeaturedBusinessesSection({ businesses }: { businesses: Biz[] }) {
  if (!businesses?.length) return null;

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Featured Local Pros
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {businesses.map((biz) => (
            <a
              key={biz.id}
              href={biz.slug ? `/business/${biz.slug}` : "#"}
              className="block rounded-xl border shadow hover:shadow-md p-5 transition"
            >
              <div className="text-lg font-semibold text-gray-900">
                {biz.name}
              </div>
              {biz.primary_service && (
                <div className="text-xs text-blue-600 font-medium">
                  {biz.primary_service}
                </div>
              )}
              {biz.short_description && (
                <div className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {biz.short_description}
                </div>
              )}
              {biz.phone && (
                <div className="text-sm text-gray-800 mt-4 font-semibold">
                  {biz.phone}
                </div>
              )}
              <div className="text-xs text-blue-600 font-medium mt-3">
                View details →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
