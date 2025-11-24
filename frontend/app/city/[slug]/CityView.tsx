"use client";

import { useState } from 'react';
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
  short_description?: string;
  address_line1?: string;
  phone?: string;
  rating_average?: number;
  review_count?: number;
}

export default function CityView({ city, businesses }: { city: City; businesses: Business[] }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const BusinessCard = ({ business, isGrid }: { business: Business; isGrid: boolean }) => {
    const rating = parseFloat(business.rating_average as any) || 0;
    const stars = Array(5).fill(0).map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));

    if (isGrid) {
      return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6">
          <Link href={`/business/${business.slug}`}>
            <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600">{business.name}</h3>
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">{stars}</div>
            <span className="text-gray-600 text-sm">{rating.toFixed(1)} ({business.review_count || 0})</span>
          </div>
          {business.short_description && <p className="text-gray-600 text-sm mb-3">{business.short_description}</p>}
          {business.address_line1 && <p className="text-gray-600 text-sm mb-2">📍 {business.address_line1}</p>}
          {business.phone && <p className="text-gray-600 text-sm mb-4">📞 {business.phone}</p>}
          <Link href={`/business/${business.slug}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm inline-block">View Details</Link>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 flex gap-6">
        <div className="flex-1">
          <Link href={`/business/${business.slug}`}>
            <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600">{business.name}</h3>
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">{stars}</div>
            <span className="text-gray-600 text-sm">{rating.toFixed(1)} ({business.review_count || 0} reviews)</span>
          </div>
          {business.short_description && <p className="text-gray-600 mb-3">{business.short_description}</p>}
          {business.address_line1 && <p className="text-gray-600 text-sm mb-1">📍 {business.address_line1}</p>}
          {business.phone && <p className="text-gray-600 text-sm">📞 {business.phone}</p>}
        </div>
        <div className="flex flex-col justify-center">
          <Link href={`/business/${business.slug}`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold whitespace-nowrap">View Details</Link>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{city.name}</h1>
              <p className="text-gray-600 mt-2">{businesses.length} businesses found</p>
            </div>
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-lg transition ${viewMode === 'list' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Link href="/cities" className="text-blue-600 hover:underline mb-6 inline-block">← Back to all cities</Link>
        {businesses.length === 0 ? (
          <p className="text-gray-600">No businesses found in {city.name}.</p>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {businesses.map((business) => <BusinessCard key={business.id} business={business} isGrid={true} />)}
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            {businesses.map((business) => <BusinessCard key={business.id} business={business} isGrid={false} />)}
          </div>
        )}
      </div>
    </main>
  );
}
