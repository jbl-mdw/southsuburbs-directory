export interface GeoResult {
  lat: number;
  lon: number;
  displayName: string;
  raw: any;
}

// Very simple wrapper around Nominatim
export async function geocodeLocation(query: string): Promise<GeoResult | null> {
  const base = process.env.NOMINATIM_BASE_URL!;
  const url =
    base +
    "/search?" +
    new URLSearchParams({
      q: query,
      format: "json",
      countrycodes: "us",
      limit: "1",
    }).toString();

  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const first = data[0];
  return {
    lat: parseFloat(first.lat),
    lon: parseFloat(first.lon),
    displayName: first.display_name,
    raw: first,
  };
}
