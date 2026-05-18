const runtimeUrl = process.env.RUNTIME_DIRECTUS_URL!;
const runtimeToken = process.env.RUNTIME_DIRECTUS_TOKEN!;

export async function runtimeGet(collection: string, params: any) {
  const query = new URLSearchParams();

  if (params?.limit) {
    query.set("limit", String(params.limit));
  }

  if (params?.sort) {
    query.set(
      "sort",
      Array.isArray(params.sort) ? params.sort.join(",") : params.sort
    );
  }

  if (params?.filter) {
    query.set("filter", JSON.stringify(params.filter));
  }

  const response = await fetch(
    `${runtimeUrl}/items/${collection}?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${runtimeToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `Runtime Directus request failed: ${response.status} ${response.statusText} ${body}`
    );
  }

  const json = await response.json();

  return json.data;
}
