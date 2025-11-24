export const dynamic = 'force-dynamic'; 

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const searchQuery = searchParams.get('q');

  let filter = {};

  if (searchQuery) {
    // NOTE: Replace this mock filter with your actual Directus filter logic
    filter = { city_name: { _contains: searchQuery } };
  }

  try {
    // --- TEMPORARY MOCK DATA FOR TESTING API ROUTE SUCCESS ---
    const allCities = [
        { slug: 'palos-park', city_name: 'Palos Park' },
        { slug: 'orland-park', city_name: 'Orland Park' },
        { slug: 'lansing', city_name: 'Lansing' },
    ];

    const filteredCities = searchQuery
      ? allCities.filter(city => 
          city.city_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allCities;
    // --------------------------------------------------------

    return NextResponse.json(filteredCities); 

  } catch (error) {
    console.error('API Error fetching cities:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
