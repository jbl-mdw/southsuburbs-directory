import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // force Node runtime (not Edge)

export async function GET() {
  try {
    // Even though we have env vars, we're going to hardcode the internal Docker URL
    // because we already proved curl to ssb_directus:8055 works,
    // and HTTPS to admin.southsuburbsbest.com does NOT work from inside the container.
    const directusUrl = 'http://ssb_directus:8055';

    // We still include the token header because this request runs server-side only.
    const token = process.env.DIRECTUS_PUBLIC_TOKEN;

    if (!token) {
      console.error('Missing DIRECTUS_PUBLIC_TOKEN in env');
      return NextResponse.json(
        { error: 'Server misconfigured' },
        { status: 500 }
      );
    }

    const res = await fetch(`${directusUrl}/items/businesses`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Directus error:', res.status, text);
      return NextResponse.json(
        { error: 'Failed to load businesses' },
        { status: 500 }
      );
    }

    const data = await res.json(); // { data: [...] }
    return NextResponse.json(data);
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
