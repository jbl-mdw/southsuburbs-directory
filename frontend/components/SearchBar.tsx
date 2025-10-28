'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="What are you looking for?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-md focus:outline-none text-gray-800"
        />
        <input
          type="text"
          placeholder="City or Zipcode"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="md:w-64 px-4 py-3 rounded-md focus:outline-none text-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
