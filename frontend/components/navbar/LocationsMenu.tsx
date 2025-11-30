'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface City {
  slug: string;
  city_name?: string;
  name?: string;
}

interface LocationsMenuProps {
  cities: City[];
  setIsOpen: (open: boolean) => void;
}

const LocationsMenu = ({ cities, setIsOpen }: LocationsMenuProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  console.log("LocationsMenu received cities:", cities);
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/cities?q=${encodeURIComponent(searchTerm)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (e) {
        console.error('Search error:', e);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const displayCities = searchTerm ? searchResults : cities;
  const citiesPerColumn = Math.ceil(displayCities.length / 3);
  const column1 = displayCities.slice(0, citiesPerColumn);
  const column2 = displayCities.slice(citiesPerColumn, citiesPerColumn * 2);
  const column3 = displayCities.slice(citiesPerColumn * 2);

  const getCityName = (city: City) => city.city_name || city.name || city.slug;

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', width: '750px', borderRadius: '8px' }}>
      <input
        type="text"
        placeholder="Type to search all cities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px 12px', marginBottom: '16px', border: '2px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', color: '#111827' }}
      />
      <Link
        href="/cities"
        onClick={() => setIsOpen(false)}
        style={{ display: 'inline-block', padding: '10px 20px', marginBottom: '16px', color: '#fff', backgroundColor: '#2563eb', fontWeight: '600', fontSize: '13px', textDecoration: 'none', borderRadius: '6px', textTransform: 'uppercase' }}
      >
        → VIEW ALL CITIES
      </Link>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div>
          {column1.map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              onClick={() => setIsOpen(false)}
              style={{ display: 'block', padding: '8px 12px', fontSize: '13px', color: '#000000', textDecoration: 'none', borderRadius: '4px', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '500' }}
            >
              {getCityName(city)}
            </Link>
          ))}
        </div>
        <div>
          {column2.map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              onClick={() => setIsOpen(false)}
              style={{ display: 'block', padding: '8px 12px', fontSize: '13px', color: '#000000', textDecoration: 'none', borderRadius: '4px', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '500' }}
            >
              {getCityName(city)}
            </Link>
          ))}
        </div>
        <div>
          {column3.map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              onClick={() => setIsOpen(false)}
              style={{ display: 'block', padding: '8px 12px', fontSize: '13px', color: '#000000', textDecoration: 'none', borderRadius: '4px', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '500' }}
            >
              {getCityName(city)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationsMenu;
