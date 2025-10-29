import Link from 'next/link';

export default function CategoryGrid() {
  const categories = [
    { name: 'HVAC', slug: 'hvac', icon: '🔥' },
    { name: 'Plumber', slug: 'plumber', icon: '🚰' },
    { name: 'Electrician', slug: 'electrician', icon: '⚡' },
    { name: 'Roofer', slug: 'roofer', icon: '🏠' },
    { name: 'Automotive', slug: 'automotive', icon: '🚗' },
    { name: 'Restaurants', slug: 'restaurants', icon: '🍽️' },
    { name: 'Real Estate', slug: 'real-estate', icon: '🏡' },
    { name: 'Landscaper', slug: 'landscaper', icon: '🌿' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center"
        >
          <div className="text-4xl mb-2">{category.icon}</div>
          <h3 className="font-semibold text-gray-800">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
}
