'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FeaturedBusinesses() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/businesses?filter[is_featured][_eq]=true&limit=6`)
      .then(res => setBusinesses(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business: any) => (
        <Link
          key={business.id}
          href={`/business/${business.slug}`}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
        >
          <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700"></div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {business.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              {business.short_description || business.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {business.city}, {business.state}
              </span>
              <span className="text-yellow-500 font-semibold">
                {business.rating_average}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
