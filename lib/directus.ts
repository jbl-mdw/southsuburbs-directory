import axios from 'axios';

const directusApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DIRECTUS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getBusinesses() {
  const { data } = await directusApi.get('/items/businesses?filter[status][_eq]=published&fields=*,categories.categories_id.*');
  return data.data;
}

export async function getBusinessBySlug(slug: string) {
  const { data } = await directusApi.get(`/items/businesses?filter[slug][_eq]=${slug}&filter[status][_eq]=published&fields=*,categories.categories_id.*`);
  return data.data[0];
}

export async function getCategories() {
  const { data } = await directusApi.get('/items/categories?sort=name');
  return data.data;
}

export default directusApi;
