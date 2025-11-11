"use client";

import { useEffect, useMemo, useState } from "react";

type City = { name: string; slug: string };

function useDebounced<T>(value: T, ms = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

export default function LocationsMenu({ initialCities }: { initialCities: City[] }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<City[]>([]);
  const deb = useDebounced(query, 250);

  useEffect(() => {
    let abort = false;
    async function go() {
      setLoading(true);
      try {
        const r = await fetch(`/api/cities?q=${encodeURIComponent(deb)}`);
        const j = await r.json();
        if (!abort) setResults(j.data || []);
      } catch {
        if (!abort) setResults([]);
      } finally {
        if (!abort) setLoading(false);
      }
    }
    go();
    return () => {
      abort = true;
    };
  }, [deb]);

  const list = useMemo<City[]>(() => {
    const trimmed = deb.trim();
    if (!trimmed) return initialCities;
    return results;
  }, [deb, results, initialCities]);

  return (
    <div className="w-72 p-3">
      <a href="/cities" className="block px-3 py-2 rounded bg-blue-50 text-blue-700 font-medium mb-2">
        View All Cities →
      </a>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city…"
        className="w-full border rounded px-3 py-2 mb-2 text-sm focus:outline-none focus:ring"
        autoComplete="off"
      />

      {loading ? (
        <div className="px-3 py-2 text-sm text-gray-500">Searching…</div>
      ) : list.length === 0 ? (
        <div className="px-3 py-2 text-sm text-gray-500">No matches</div>
      ) : (
        <div className="max-h-80 overflow-y-auto">
          {list.map((c) => (
            <a
              key={c.slug}
              href={`/city/${c.slug}`}
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded"
            >
              {c.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
