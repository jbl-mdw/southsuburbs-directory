import { NextResponse } from "next/server";

const MEILI_URL = process.env.NEXT_PUBLIC_MEILISEARCH_URL!;
const MEILI_KEY = process.env.NEXT_PUBLIC_MEILISEARCH_KEY!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const index = searchParams.get("index") || "businesses";

  try {
    const res = await fetch(`${MEILI_URL}/indexes/${encodeURIComponent(index)}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MEILI_KEY}`
      },
      body: JSON.stringify({ q, limit: 20 }),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json({ error: `Meili ${res.status}`, message: text }, { status: 502 });
    }

    const json = await res.json();
    return NextResponse.json(json);
  } catch (e: any) {
    return NextResponse.json({ error: "Search failed", message: String(e) }, { status: 500 });
  }
}
