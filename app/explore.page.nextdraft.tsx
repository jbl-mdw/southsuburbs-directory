// explore.page.nextdraft.tsx
// This is a draft version of /explore/page.tsx that pulls live data.
// After we confirm it works, we'll push it into the container.

import React from 'react';

async function getBusinesses() {
  // We’re hitting Caddy’s /directus proxy.
  // We only request safe public fields we want to display.
  const res = await fetch(
    'https://southsuburbsbest.com/directus/items/businesses' +
      '?fields=id,name,slug,phone,address_line1,city,state,zipcode,is_featured',
    {
      method: 'GET',
      // no-store = always fresh
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    console.error('Failed to load businesses', res.status);
    return [];
  }

  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}

export default async function ExplorePage() {
  const businesses = await getBusinesses();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">
          South Suburbs: Featured & Local Businesses
        </h1>
        <p className="text-gray-600 text-sm">
          Trusted roofers, plumbers, real estate help, and more.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {businesses.map((biz: any) => (
          <article
            key={biz.id}
            className="rounded-xl border border-gray-200 p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  {biz.name || 'Unnamed Business'}
                </h2>
                <p className="text-xs text-gray-500">
                  {biz.city}, {biz.state} {biz.zipcode}
                </p>
              </div>

              {biz.is_featured ? (
                <span className="text-[10px] font-semibold text-white bg-blue-600 rounded-full px-2 py-1">
                  Featured
                </span>
              ) : null}
            </div>

            <div className="mt-3 text-sm text-gray-700 line-clamp-3">
              {biz.address_line1 ?? ''}
            </div>

            <div className="mt-4 text-sm text-gray-900 font-medium">
              {biz.phone ? (
                <a className="text-blue-600 hover:underline" href={`tel:${biz.phone}`}>
                  {biz.phone}
                </a>
              ) : (
                <span className="text-gray-400 italic text-xs">No phone listed</span>
              )}
            </div>

            <div className="mt-4">
              <a
                className="inline-block text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-lg px-3 py-2"
                href={`/business/${biz.slug}`}
              >
                View Details →
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
