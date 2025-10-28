import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_URL || '',
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_KEY || '',
});

export async function searchBusinesses(query: string, filters?: any) {
  const index = client.index('businesses');
  const results = await index.search(query, {
    limit: 20,
    filter: filters,
  });
  return results;
}

export default client;
