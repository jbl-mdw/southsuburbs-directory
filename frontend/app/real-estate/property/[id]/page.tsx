export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { notFound } from "next/navigation";
import { getScopedEntities } from "@/lib/ssbVertical";

const SSB_SCOPE_ID = "SSB";
const SSB_PRIMARY_COLOR = "#1e3a5f";

// SSB-REAL-ESTATE-CONSUMER-EXPERIENCE-REFINEMENT-001 - a pure,
// read-only presentation page over the already-certified
// entity-store.js FSBO records (via the existing GET .../entities
// route - no new backend route, no runtime/revenue change). No real
// property images exist on any submitted FSBO record today, so this
// honestly renders a neutral icon treatment rather than a fabricated
// photo.
function formatAttribute(attributes: Record<string, unknown>, key: string): string | null {
  const v = attributes?.[key];
  return typeof v === "string" || typeof v === "number" ? String(v) : null;
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const entities = await getScopedEntities(SSB_SCOPE_ID, "property");
  // Only a real, reviewed/published listing (status "active") is
  // publicly viewable - a draft awaiting review is not.
  const entity = entities.find((e) => e.entityId === params.id && e.status === "active");

  if (!entity) notFound();

  const address = formatAttribute(entity.attributes, "address");
  const price = formatAttribute(entity.attributes, "askingPrice");
  const city = formatAttribute(entity.attributes, "city");
  const state = formatAttribute(entity.attributes, "state");
  const zipcode = formatAttribute(entity.attributes, "zipcode");
  const bedrooms = formatAttribute(entity.attributes, "bedrooms");
  const bathrooms = formatAttribute(entity.attributes, "bathrooms");
  const sqft = formatAttribute(entity.attributes, "sqft");
  const description = formatAttribute(entity.attributes, "description");
  const sellerName = formatAttribute(entity.attributes, "sellerName");

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link href="/real-estate" className="text-sm font-semibold" style={{ color: SSB_PRIMARY_COLOR }}>
          ← Back to Real Estate
        </Link>

        <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow">
          <div className="flex h-56 items-center justify-center bg-slate-100 text-6xl" aria-hidden>
            🏠
          </div>
          <div className="p-8">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">FSBO</span>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">{address || "Property listing"}</h1>
            {(city || state) && (
              <p className="mt-1 text-slate-500">
                {city}
                {city && state ? ", " : ""}
                {state} {zipcode}
              </p>
            )}
            {price && (
              <p className="mt-4 text-2xl font-bold" style={{ color: SSB_PRIMARY_COLOR }}>
                ${Number(price).toLocaleString()}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-700">
              {bedrooms && <div><span className="font-semibold">{bedrooms}</span> bed</div>}
              {bathrooms && <div><span className="font-semibold">{bathrooms}</span> bath</div>}
              {sqft && <div><span className="font-semibold">{Number(sqft).toLocaleString()}</span> sq ft</div>}
            </div>

            {description && <p className="mt-6 text-sm text-slate-600">{description}</p>}

            <div className="mt-8 rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-600">
                For Sale By Owner{sellerName ? ` — listed by ${sellerName}` : ""}. Contact South Suburbs Best to be
                connected with the seller.
              </p>
              <Link
                href={`/quote?intent=sales.request`}
                className="mt-4 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: SSB_PRIMARY_COLOR }}
              >
                Request Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
