import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getCity(slug: string) {
  const base = process.env.DIRECTUS_URL!;
  const token = process.env.DIRECTUS_STATIC_TOKEN!;
  const url = `${base}/items/cities?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`;
  const res = await fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
  cache: "force-cache",
  next: { revalidate: 300 },
});


  if (!res.ok) return null;
  const json = await res.json();
  return json?.data?.[0] ?? null;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const city = await getCity(params.slug);
  if (!city) return notFound();
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{city.name}</h1>
      <p className="text-gray-600">Slug: {city.slug}</p>
    </main>
  );
}
