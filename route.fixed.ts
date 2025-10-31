import { NextResponse } from 'next/server';

// Force Node runtime so we can use Node features
export const runtime = 'nodejs';

// Tell Node to ignore TLS verification inside this container
// because we're calling our own HTTPS host from inside Docker.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET() {
  try {
    // We'll hit Directus over the public HTTPS domain instead of the internal Docker hostname,
    // because the containers are currently not on the same network.
    // We are going straight to the admin domain (Directus) for cleanest path.
    const directusUrl = 'https://admin.southsuburbsbest.com/items/businesses';

    // We REQUIRE the token now.
    const token = process.env.DIRECTUS_PUBLIC_TOKEN;

    if (!token) {
      console.error('Missing DIRECTUS_PUBLIC_TOKEN in env');
      return NextResponse.json(
        { error: 'Server misconfigured (no token)' },
        { status: 500 }
      );
    }

    const r = await fetch(directusUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!r.ok) {
      const text = await r.text();
      console.error('Directus error:', r.status, text);
      return NextResponse.json(
        { error: 'Directus query failed' },
        { status: r.status }
      );
    }

    const data = await r.json(); // { data: [...] }
    const businesses = Array.isArray(data.data) ? data.data : [];

    return NextResponse.json({ businesses }, { status: 200 });
  } catch (err) {
    console.error('Handler crashed:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
