export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';

const PRIMARY_CITIES = [
  { slug: 'flossmoor', city_name: 'Flossmoor' },
  { slug: 'glenwood', city_name: 'Glenwood' },
  { slug: 'frankfort', city_name: 'Frankfort' },
  { slug: 'orland-park', city_name: 'Orland Park' },
  { slug: 'tinley-park', city_name: 'Tinley Park' },
  { slug: 'homewood', city_name: 'Homewood' },
  { slug: 'lynwood', city_name: 'Lynwood' },
  { slug: 'country-club-hills', city_name: 'Country Club Hills' },
  { slug: 'olympia-fields', city_name: 'Olympia Fields' },
  { slug: 'hazel-crest', city_name: 'Hazel Crest' },
  { slug: 'university-park', city_name: 'University Park' },
  { slug: 'matteson', city_name: 'Matteson' }
];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const searchQuery = searchParams.get('q');

  try {
    const filteredCities = searchQuery
      ? PRIMARY_CITIES.filter(city =>
          city.city_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : PRIMARY_CITIES;

    return NextResponse.json(filteredCities);
  } catch (error) {
    console.error('API Error fetching cities:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
