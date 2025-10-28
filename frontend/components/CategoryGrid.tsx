'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/categories?sort=name`)
      .then(res => setCategories(res.data.data.slice(0, 12)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category: any) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 text-center group"
        >
          <div className="text-4xl mb-3">
            {category.icon || '📋'}
          </div>
          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
            {category.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}
