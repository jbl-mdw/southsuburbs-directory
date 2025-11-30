export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';

const PRIMARY_CITIES = [
  { slug: 'flossmoor', name: 'Flossmoor' },
  { slug: 'glenwood', name: 'Glenwood' },
  { slug: 'frankfort', name: 'Frankfort' },
  { slug: 'orland-park', name: 'Orland Park' },
  { slug: 'tinley-park', name: 'Tinley Park' },
  { slug: 'homewood', name: 'Homewood' },
  { slug: 'lynwood', name: 'Lynwood' },
  { slug: 'country-club-hills', name: 'Country Club Hills' },
  { slug: 'olympia-fields', name: 'Olympia Fields' },
  { slug: 'hazel-crest', name: 'Hazel Crest' },
  { slug: 'university-park', name: 'University Park' },
  { slug: 'matteson', name: 'Matteson' }
];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const searchQuery = searchParams.get('q');
  if (!searchQuery) {
    return NextResponse.json(PRIMARY_CITIES);
  }
  try {
    const url = `https://southsuburbsbest.com/directus/items/cities?limit=-1&fields=slug,name&filter[name][_icontains]=${encodeURIComponent(searchQuery)}`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      return NextResponse.json(json?.data || []);
    }
  } catch (error) {
    console.error('Directus error:', error);
  }
  const filtered = PRIMARY_CITIES.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return NextResponse.json(filtered);
}
