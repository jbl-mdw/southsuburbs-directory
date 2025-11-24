'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, MapPin, Loader2 } from 'lucide-react';
// FIX: Use named import from main lodash package to prevent runtime crash
import { debounce } from 'lodash'; 

// Define the City type
interface City {
  slug: string;
  city_name: string;
}

interface LocationsMenuProps {
  cities: City[]; // Initial list of featured cities
  setIsOpen: (open: boolean) => void; // Function to close the parent dropdown
}

// Custom hook to fetch cities based on search term
const useCitySearch = (initialCities: City[], searchTerm: string) => {
  const [searchResults, setSearchResults] = useState<City[]>(initialCities);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced API call function
  const debouncedFetch = useCallback(
    debounce(async (query: string) => {
      if (query.length === 0) {
        setSearchResults(initialCities);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // CALLING THE UPDATED API ENDPOINT
        const res = await fetch(`/api/cities?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Failed to fetch cities');
        
        const data: City[] = await res.json();
        setSearchResults(data);
      } catch (e) {
        console.error('Error fetching cities:', e);
        setSearchResults([]); // Clear results on error
      } finally {
        setIsLoading(false);
      }
    }, 300), // Debounce for 300ms
    [initialCities] // Dependency array includes initial cities
  );

  // Effect to trigger the debounced fetch whenever searchTerm changes
  useEffect(() => {
    debouncedFetch(searchTerm);
    // Cleanup function: important to cancel the debounce call on unmount or state change
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm, debouncedFetch]);

  return { searchResults, isLoading };
};


const LocationsMenu = ({ cities, setIsOpen }: LocationsMenuProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchResults, isLoading } = useCitySearch(cities, searchTerm);

  const handleCityClick = () => {
    // Close the dropdown after the user clicks a city link
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="Search city or zip..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-yellow-500 focus:border-yellow-500"
        />
        <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="animate-spin text-yellow-500" size={20} />
          <span className="text-sm ml-2 text-gray-500">Searching...</span>
        </div>
      )}

      {/* Search Results / City List */}
      {!isLoading && searchResults.length === 0 && searchTerm.length > 0 && (
        <p className="text-sm text-gray-500 text-center py-4">No cities found matching "{searchTerm}".</p>
      )}

      {!isLoading && searchResults.length > 0 && (
        <div className="max-h-60 overflow-y-auto space-y-1">
          {searchResults.map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              onClick={handleCityClick}
              className="flex items-center space-x-2 p-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <MapPin size={16} className="text-red-500" />
              <span>{city.city_name}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Default/Featured City List (if no search term is active) */}
      {!isLoading && searchTerm.length === 0 && (
        <>
          <h4 className="text-xs font-semibold uppercase text-gray-500 my-2">Featured Cities</h4>
          <div className="max-h-60 overflow-y-auto space-y-1">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                onClick={handleCityClick}
                className="flex items-center space-x-2 p-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <MapPin size={16} className="text-gray-400" />
                <span>{city.city_name}</span>
              </Link>
              // FIX: Removed duplicated closing </Link> tag here
            ))}
          </div>
        </>
      )}

      {/* Note on Data Source: Initial cities list is passed from server/parent */}
      <p className="text-xs text-gray-400 mt-4 text-center">Data loaded from the `/api/cities` endpoint.</p>
    </div>
  );
};

export default LocationsMenu;
