"use client";

// REAL-ESTATE-DIRECTORY-PROPERTY-FOUNDATION-001 - a real, working filter
// bar over the Real Estate Directory's own FSBO/property inventory
// (never the generic SSB /category/[slug] search). Reads/writes real
// URL search params the server component (page.tsx) already consumes
// via getScopedEntities()'s filters argument - no client-side state that
// could drift from what's actually rendered.

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PROPERTY_TYPES = [
  { value: "", label: "Any type" },
  { value: "single_family", label: "Single Family" },
  { value: "condo", label: "Condo" },
  { value: "multi_family", label: "Multi-Family" },
  { value: "townhouse", label: "Townhouse" },
  { value: "land", label: "Land" },
];

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [city, setCity] = useState(searchParams.get("city") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [bathrooms, setBathrooms] = useState(searchParams.get("bathrooms") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "");
  const [listingType, setListingType] = useState(searchParams.get("listingType") || "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city.trim()) params.set("city", city.trim());
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (bathrooms) params.set("bathrooms", bathrooms);
    if (propertyType) params.set("propertyType", propertyType);
    if (listingType) params.set("listingType", listingType);
    const query = params.toString();
    router.push(`/real-estate${query ? `?${query}` : ""}#properties`);
  }

  function onClear() {
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setBathrooms("");
    setPropertyType("");
    setListingType("");
    router.push("/real-estate#properties");
  }

  return (
    <form onSubmit={onSubmit} className="mb-8 grid gap-3 rounded-2xl bg-white p-4 shadow sm:grid-cols-3 lg:grid-cols-7">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
      />
      <input
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        type="number"
        min="0"
        placeholder="Min price"
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
      />
      <input
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        type="number"
        min="0"
        placeholder="Max price"
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
      />
      <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
        <option value="">Beds (any)</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n}+ beds</option>
        ))}
      </select>
      <select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
        <option value="">Baths (any)</option>
        {[1, 2, 3, 4].map((n) => (
          <option key={n} value={n}>{n}+ baths</option>
        ))}
      </select>
      <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
        {PROPERTY_TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>
      <select value={listingType} onChange={(e) => setListingType(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
        <option value="">For Sale or Rent</option>
        <option value="sale">For Sale</option>
        <option value="rent">For Rent</option>
      </select>
      <div className="flex gap-2 sm:col-span-3 lg:col-span-7">
        <button type="submit" className="rounded-full bg-[#1e3a5f] px-6 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#16304d]">
          Search Properties
        </button>
        <button type="button" onClick={onClear} className="rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200">
          Clear
        </button>
      </div>
    </form>
  );
}
