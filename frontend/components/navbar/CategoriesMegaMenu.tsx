"use client";

import Link from "next/link";

type Category = { id: string; name: string; slug: string };

export default function CategoriesMegaMenu({ categories }: { categories: Category[] }) {
  const columns = 3;
  const perCol = Math.ceil(categories.length / columns);
  const cols: Category[][] = [];
  for (let i = 0; i < columns; i++) {
    cols.push(categories.slice(i * perCol, (i + 1) * perCol));
  }

  return (
    <div className="p-4 w-[560px]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cols.map((col, i) => (
          <div key={i} className="space-y-1">
            {col.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-700 text-gray-700"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
