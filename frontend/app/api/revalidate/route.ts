import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const hdr = req.headers.get("x-revalidate-secret");
  if (!secret || hdr !== secret) {
    return NextResponse.json({ ok: false, error: "bad secret" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({} as any));
  const slug: string | null =
    body?.payload?.slug ?? body?.key ?? body?.slug ?? null;

  // Broad refresh for listing pages that use this tag
  try { revalidateTag("posts"); } catch {}

  // Refresh specific paths you use
  try { revalidatePath("/news"); } catch {}
  if (slug) {
    try { revalidatePath(`/news/${slug}`); } catch {}
  }

  return NextResponse.json({ ok: true, slug });
}
