// /opt/southsuburbs/frontend/components/navbar/CategoriesMegaMenu.tsx

import Link from 'next/link';
import React from 'react';
// Assuming the component fetches categories here or receives them via props
// Example Category Structure (using the schema from the Handoff Document):
interface Category {
    id: string;
    name: string;
    slug: string;
    parent_category_id: string | null; // This field is key for grouping
    // ... other fields
}

interface GroupedCategory {
    parent: Category;
    children: Category[];
}

/**
 * Transforms a flat list of categories (from Directus) into a parent/child hierarchy.
 */
const groupCategories = (categories: Category[]): GroupedCategory[] => {
    // 1. Identify all parent categories (where parent_category_id is null)
    const parents = categories.filter(cat => !cat.parent_category_id);
    const children = categories.filter(cat => cat.parent_category_id);

    // 2. Group children under their respective parents
    const grouped = parents.map(parent => ({
        parent: parent,
        children: children.filter(child => child.parent_category_id === parent.id).sort((a, b) => a.name.localeCompare(b.name))
    }));

    // 3. Filter out any parents that have no children, if necessary, but keep all parents for display
    return grouped;
};

// --- Replace the existing CategoriesMegaMenu component with this ---
const CategoriesMegaMenu = ({ categories }: { categories: Category[] }) => { // Assume categories are passed in
    const groupedCategories = groupCategories(categories);

    return (
        <div className="absolute left-0 right-0 z-10 bg-white shadow-xl hidden group-hover:block p-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    
                    {groupedCategories.map((group, index) => (
                        <div key={group.parent.id} className="col-span-1">
                            {/* Parent Category Title */}
                            <Link href={`/category/${group.parent.slug}`}>
                                <h4 className="text-lg font-bold text-gray-800 mb-3 hover:text-blue-600">
                                    {group.parent.name}
                                </h4>
                            </Link>
                            
                            {/* Subcategories (Children) */}
                            <ul className="space-y-1">
                                {group.children.map(child => (
                                    <li key={child.id}>
                                        <Link href={`/category/${child.slug}`} className="text-sm text-gray-600 hover:text-blue-600 transition">
                                            {child.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* If the parent has no children, render it as a single entry */}
                            {group.children.length === 0 && (
                                <p className="text-sm text-gray-500">No subcategories</p>
                            )}
                        </div>
                    ))}
                    
                    {/* Link to All Categories Page */}
                    <div className="col-span-full border-t pt-4 mt-4">
                        <Link href="/categories" className="text-blue-600 font-semibold hover:underline">
                            Browse All Categories
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CategoriesMegaMenu;
