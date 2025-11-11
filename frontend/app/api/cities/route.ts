import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const all = searchParams.get('all');
    
    const filter = all ? '' : '?filter[is_featured][_eq]=true&sort=name&limit=20';
    const allParams = all ? '?sort=name&limit=100' : '';
    
    const res = await fetch(
      `${process.env.DIRECTUS_URL}/items/cities${all ? allParams : filter}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
        },
        cache: 'no-store',
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Cities API error:', error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
