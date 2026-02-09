export async function GET() {
  const base =
    process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || '';

  if (!base) {
    return Response.json({ data: [] }, { status: 200 });
  }

  try {
    const url =
      `${base}/items/businesses` +
      `?fields=id,name,slug,address_line1,city,state,zipcode,phone,latitude,longitude,isMappable` +
      `&limit=50`;

    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) return Response.json({ data: [] }, { status: 200 });

    const json = await res.json();
    return Response.json({ data: Array.isArray(json?.data) ? json.data : [] }, { status: 200 });
  } catch {
    return Response.json({ data: [] }, { status: 200 });
  }
}
