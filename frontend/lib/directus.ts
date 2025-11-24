// lib/directus.ts
import { createDirectus, rest, readItems } from '@directus/sdk';

const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL!;

export const directus = createDirectus(baseUrl).with(rest());

export async function fetchBusinessBySlug(slug: string) {
  try {
    const response = await directus.request(
      readItems('businesses', {
        filter: {
          slug: { _eq: slug }
          // Removed status filter to allow draft businesses
        },
        limit: 1,
      })
    );
    
    return response[0] || null;
  } catch (error) {
    console.error('Error fetching business:', error);
    return null;
  }
}
