'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Business = {
  id: string;
  name: string;
  slug: string;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  description?: string | null;
  is_featured?: boolean;
};

export default function BusinessDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [biz, setBiz] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      if (!slug) return;

      // Build URL to fetch a single business by slug
      // filter[slug][_eq]=the-slug
      const url =
        'https://southsuburbsbest.com/directus/items/businesses' +
        '?filter[slug][_eq]=' +
        encodeURIComponent(slug) +
        '&limit=1' +
        '&fields=' +
        [
          'id',
          'name',
          'slug',
          'phone',
          'email',
          'website',
          'address_line1',
          'address_line2',
          'city',
          'state',
          'zipcode',
          'description',
          'is_featured',
        ].join(',');

      try {
        const res = await fetch(url, {
          method: 'GET',
          cache: 'no-store',
        });

        if (!res.ok) {
          console.error('Failed to load business', res.status);
          setNotFound(true);
          setLoading(false);
          return;
        }

        const data = await res.json();
        const list = Array.isArray(data.data) ? data.data : [];
        const first = list[0] || null;

        if (!first) {
          setNotFound(true);
        } else {
          setBiz(first);
        }

        setLoading(false);
      } catch (err) {
        console.error('Browser fetch failed', err);
        setNotFound(true);
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  // ─────────────────────────────
  // UI states
  // ─────────────────────────────

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-gray-500 text-sm">Loading business…</p>
      </main>
    );
  }

  if (notFound || !biz) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-xl font-semibold text-gray-900">
          Business not found
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          This listing may have been removed or is not public yet.
        </p>

        <div className="mt-6">
          <a
            href="/explore"
            className="inline-block text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-lg px-3 py-2"
          >
            ← Back to Explore
          </a>
        </div>
      </main>
    );
  }

  // ─────────────────────────────
  // Normal render
  // ─────────────────────────────

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      {/* Header / basic info */}
      <section className="space-y-2">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {biz.name}
            </h1>
            <p className="text-sm text-gray-600">
              {biz.city}, {biz.state} {biz.zipcode}
            </p>
          </div>

          {biz.is_featured ? (
            <span className="text-[10px] font-semibold text-white bg-blue-600 rounded-full px-2 py-1 h-fit">
              Featured
            </span>
          ) : null}
        </div>

        <div className="text-sm text-gray-800 mt-4 space-y-2">
          {biz.address_line1 ? (
            <div>{biz.address_line1}</div>
          ) : null}
          {biz.address_line2 ? (
            <div>{biz.address_line2}</div>
          ) : null}

          {biz.phone ? (
            <div>
              <span className="font-semibold text-gray-900">Phone: </span>
              <a
                className="text-blue-600 hover:underline"
                href={`tel:${biz.phone}`}
              >
                {biz.phone}
              </a>
            </div>
          ) : (
            <div className="text-gray-400 italic text-xs">No phone listed</div>
          )}

          {biz.email ? (
            <div>
              <span className="font-semibold text-gray-900">Email: </span>
              <a
                className="text-blue-600 hover:underline"
                href={`mailto:${biz.email}`}
              >
                {biz.email}
              </a>
            </div>
          ) : null}

          {biz.website ? (
            <div>
              <span className="font-semibold text-gray-900">Website: </span>
              <a
                className="text-blue-600 hover:underline break-all"
                href={
                  biz.website.startsWith('http')
                    ? biz.website
                    : `https://${biz.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {biz.website}
              </a>
            </div>
          ) : null}
        </div>
      </section>

      {/* Description / pitch */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          About {biz.name}
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          {biz.description
            ? biz.description
            : 'This business has not added a full description yet.'}
        </p>
      </section>

      {/* Call to action box */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-900">
          Need help right now?
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          Tell us what you need, and we’ll connect you with someone in the
          South Suburbs. Fast, local, no nonsense.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={`/quote?business=${encodeURIComponent(biz.slug)}`}
            className="inline-block text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
          >
            Request a Quote
          </a>

          <a
            href="tel:17082850679"
            className="inline-block text-xs font-semibold text-gray-900 bg-yellow-300 hover:bg-yellow-400 rounded-lg px-4 py-2"
          >
            Emergency Line
          </a>
        </div>
      </section>

      {/* Back link */}
      <div>
        <a
          href="/explore"
          className="inline-block text-xs font-semibold text-gray-700 hover:text-gray-900"
        >
          ← Back to Explore
        </a>
      </div>
    </main>
  );
}
