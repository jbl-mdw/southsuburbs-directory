'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Business } from '@/types';
import BusinessHero from '../components/BusinessHero';
import BusinessInfoSidebar from '../components/BusinessInfoSidebar';
import BusinessGallery from '../components/BusinessGallery';
import BusinessHours from '../components/BusinessHours';
import BusinessAmenities from '../components/BusinessAmenities';
import BusinessReviews from '../components/BusinessReviews';
import BusinessContactForm from '../components/BusinessContactForm';
import BusinessMap from '../components/BusinessMap';

export default function BusinessDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [biz, setBiz] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      if (!slug) return;

      // Build URL to fetch a single business by slug with all fields
      const fields = [
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
        'short_description',
        'is_featured',
        'rating_average',
        'review_count',
        'logo',
        'cover_image',
        'gallery',
        'hero_type',
        'hero_color',
        'hero_video_url',
        'hours',
        'amenities',
        'services',
        'social_media',
        'latitude',
        'longitude',
        'year_established',
        'tagline',
        'price_range',
        'payment_methods',
        'languages',
        'categories.categories_id.name',
      ];

      const url =
        'https://southsuburbsbest.com/directus/items/businesses' +
        '?filter[slug][_eq]=' +
        encodeURIComponent(slug) +
        '&limit=1' +
        '&fields=' +
        fields.join(',');

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
      <main className="min-h-screen">
        <div className="h-[400px] md:h-[500px] bg-gray-200 animate-pulse" />
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
            </div>
            <div>
              <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !biz) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <svg
            className="w-20 h-20 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Business Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            This listing may have been removed or is not public yet.
          </p>
          <a
            href="/explore"
            className="inline-block text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 transition"
          >
            ← Back to Explore
          </a>
        </div>
      </main>
    );
  }

  // ─────────────────────────────
  // Prepare data for components
  // ─────────────────────────────

  const fullAddress = [
    biz.address_line1,
    biz.address_line2,
    `${biz.city}, ${biz.state} ${biz.zipcode}`,
  ]
    .filter(Boolean)
    .join(', ');

  // Extract category names
  const categoryNames = biz.categories
    ? biz.categories.map((cat: any) => cat?.categories_id?.name || '').filter(Boolean)
    : [];

  // Sample reviews data (replace with actual data from Directus)
  const sampleReviews = [
    {
      id: '1',
      author: 'Sarah Johnson',
      rating: 5,
      date: 'October 15, 2024',
      comment:
        'Excellent service! Very professional and responsive. They completed the work on time and within budget. Highly recommend!',
    },
    {
      id: '2',
      author: 'Mike Thompson',
      rating: 4.5,
      date: 'September 28, 2024',
      comment:
        'Great experience overall. The team was knowledgeable and friendly. Would definitely use them again.',
    },
  ];

  // ─────────────────────────────
  // Normal render
  // ─────────────────────────────

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <BusinessHero
        name={biz.name}
        tagline={biz.tagline}
        heroType={biz.hero_type}
        heroColor={biz.hero_color}
        coverImage={biz.cover_image}
        gallery={biz.gallery}
        heroVideoUrl={biz.hero_video_url}
        rating={parseFloat(biz.rating_average || '0')}
        reviewCount={biz.review_count || 0}
        isFeatured={biz.is_featured}
        categories={categoryNames}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About {biz.name}
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {biz.description || biz.short_description || 'No description available.'}
                </p>
              </div>
            </section>

            {/* Gallery */}
            {biz.gallery && biz.gallery.length > 0 && (
              <BusinessGallery images={biz.gallery} businessName={biz.name} />
            )}

            {/* Services & Amenities */}
            <BusinessAmenities
              services={biz.services}
              amenities={biz.amenities}
              paymentMethods={biz.payment_methods}
              languages={biz.languages}
            />

            {/* Business Hours */}
            {biz.hours && <BusinessHours hours={biz.hours} />}

            {/* Reviews */}
            <BusinessReviews
              averageRating={parseFloat(biz.rating_average || '0')}
              totalReviews={biz.review_count || 0}
              reviews={sampleReviews}
              businessName={biz.name}
            />

            {/* Contact Form */}
            <BusinessContactForm
              businessName={biz.name}
              businessEmail={biz.email}
            />

            {/* Map */}
            <BusinessMap
              businessName={biz.name}
              address={fullAddress}
              latitude={biz.latitude}
              longitude={biz.longitude}
              phone={biz.phone}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <BusinessInfoSidebar business={biz} />
          </div>
        </div>

        {/* Back to Explore */}
        <div className="mt-12 text-center">
          <a
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Explore
          </a>
        </div>
      </div>
    </main>
  );
}
