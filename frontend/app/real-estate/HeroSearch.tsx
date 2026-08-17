"use client";

// SSB-REAL-ESTATE-CONSUMER-EXPERIENCE-REFINEMENT-001 - a real, working
// discovery control using the EXISTING category/city page routes
// (never Meilisearch's /explore search, which is currently a stale,
// effectively-empty index - 5 of 5,621 real businesses - so routing a
// primary hero action through it would be dishonest UX). "What" maps
// to a real categorySlug already live on /category/[slug]; "Where" is
// a free-text city name normalized to the same slug pattern
// /city/[slug] already uses.

import { useState } from "react";
import { useRouter } from "next/navigation";

type CategoryOption = { categorySlug: string; label: string };

function slugifyCity(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function HeroSearch({ categories }: { categories: CategoryOption[] }) {
  const router = useRouter();
  const [category, setCategory] = useState(categories[0]?.categorySlug || "realtors");
  const [city, setCity] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const citySlug = slugifyCity(city);
    if (citySlug) {
      router.push(`/city/${citySlug}`);
    } else {
      router.push(`/category/${category}`);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 flex w-full max-w-3xl flex-col gap-2 rounded-2xl bg-white/95 p-2 shadow-2xl backdrop-blur md:flex-row md:items-center"
    >
      <div className="flex-1 rounded-xl bg-white px-4 py-3 text-sm">
        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          What
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border-0 bg-transparent text-sm text-slate-800 focus:outline-none focus:ring-0"
        >
          {categories.map((c) => (
            <option key={c.categorySlug} value={c.categorySlug}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 rounded-xl bg-white px-4 py-3 text-sm border-y md:border-y-0 md:border-x border-slate-100">
        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Where
        </label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City (e.g. Flossmoor)"
          className="w-full border-0 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-[#1e3a5f] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#16304d]"
      >
        Search
      </button>
    </form>
  );
}
