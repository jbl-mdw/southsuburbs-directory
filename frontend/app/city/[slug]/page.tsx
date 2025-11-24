import { notFound } from 'next/navigation';
import Link from 'next/link';
import CityView from './CityView';

const DIRECTUS_URL = 'https://southsuburbsbest.com/directus';

interface City {
  id: string;
  name: string;
  slug: string;
  description?: string;
  state?: string;
}

interface Business {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  address_line1?: string;
  phone?: string;
  rating_average?: number;
  review_count?: number;
}

async function getCity(slug: string): Promise<City | null> {
  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/cities?filter[slug][_eq]=${slug}&fields=id,name,slug,description,state`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.[0] || null;
  } catch {
    return null;
  }
}

async function getBusinesses(cityName: string): Promise<Business[]> {
  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/businesses?filter[city][_eq]=${encodeURIComponent(cityName)}&fields=id,name,slug,short_description,address_line1,phone,rating_average,review_count&limit=50`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || [];
  } catch {
    return [];
  }
}

export default async function CityPage({ params }: { params: { slug: string } }) {
  const city = await getCity(params.slug);
  
  if (!city) notFound();

  const businesses = await getBusinesses(city.name);

  return <CityView city={city} businesses={businesses} />;
}
