import Link from 'next/link';
import { getCategories } from '@/lib/directus';

export default async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.slice(0, 12).map((category: any) => (
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
