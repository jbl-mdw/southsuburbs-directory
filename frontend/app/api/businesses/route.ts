export const dynamic = 'force-dynamic'; // Don't pre-render this route
export const revalidate = 0;

export async function GET() {
  try {
    const directusUrl = process.env.DIRECTUS_URL || "http://ssb_directus:8055";
    const url = `${directusUrl}/items/businesses?fields=id,name,slug,address_line1,city,state,zipcode,phone,latitude,longitude,isMappable&limit=50`;
    
    const r = await fetch(url, {
      method: "GET",
      headers: {},
      cache: 'no-store'
    });
    
    if (!r.ok) {
      const text = await r.text();
      console.error("Directus error:", r.status, text);
      return new Response(
        JSON.stringify({ error: "Directus query failed" }),
        { status: r.status, headers: { "Content-Type": "application/json" } }
      );
    }
    
    const data = await r.json();
    const businesses = Array.isArray(data.data) ? data.data : [];
    
    return new Response(
      JSON.stringify({ businesses }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Handler crashed:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
