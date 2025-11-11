"use client";
import { useEffect, useState } from "react";

export default function ExplorePage() {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function runSearch(query: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&index=businesses`);
      const json = await res.json();
      setHits(json?.hits ?? []);
    } catch {
      setHits([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    runSearch("");
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Explore Businesses</h1>
      <div className="flex gap-2 mb-6">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Search businesses, categories, or cities…"
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === "Enter" && runSearch(q)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => runSearch(q)}>
          {loading ? "Searching…" : "Search"}
        </button>
      </div>
      <ul className="space-y-3">
        {hits.map((h, i) => (
          <li key={h.id ?? i} className="bg-white rounded shadow p-4">
            <div className="font-semibold">{h.name ?? h.title ?? "Untitled"}</div>
            {h.city?.slug && <a className="text-blue-600 underline" href={`/city/${h.city.slug}`}>View city</a>}
            {h.slug && !h.city?.slug && <a className="text-blue-600 underline" href={`/business/${h.slug}`}>Open</a>}
          </li>
        ))}
        {!loading && hits.length === 0 && <li>No results yet.</li>}
      </ul>
    </main>
  );
}
