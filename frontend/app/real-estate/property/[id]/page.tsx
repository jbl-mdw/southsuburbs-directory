export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getScopedEntities } from "@/lib/ssbVertical";
import ShowingInquiryForm from "../../ShowingInquiryForm";

const SSB_SCOPE_ID = "SSB";
const SSB_PRIMARY_COLOR = "#1e3a5f";

// SSB-REAL-ESTATE-CONSUMER-EXPERIENCE-REFINEMENT-001 - a pure,
// read-only presentation page over the already-certified
// entity-store.js FSBO records (via the existing GET .../entities
// route - no new backend route, no runtime/revenue change).
//
// REAL-ESTATE-DIRECTORY-PROPERTY-FOUNDATION-001 - extended with the
// real canonical Property fields (media gallery, listing agent
// relationship, SEO metadata, real showing/inquiry routing) the
// gateway's entities API now resolves server-side. Still the same
// single read path, no new backend route.
function formatAttribute(attributes: Record<string, unknown>, key: string): string | null {
  const v = attributes?.[key];
  return typeof v === "string" || typeof v === "number" ? String(v) : null;
}

async function loadProperty(id: string) {
  const entities = await getScopedEntities(SSB_SCOPE_ID, "property");
  // Only a real, reviewed/published listing (status "active") is
  // publicly viewable - a draft awaiting review is not.
  return entities.find((e) => e.entityId === id && e.status === "active") || null;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const entity = await loadProperty(params.id);
  if (!entity) return { title: "Property Not Found | South Suburbs Best" };
  const address = formatAttribute(entity.attributes, "address") || "Property Listing";
  const city = formatAttribute(entity.attributes, "city");
  const price = formatAttribute(entity.attributes, "askingPrice");
  const description = `${address}${city ? `, ${city}` : ""}${price ? ` - $${Number(price).toLocaleString()}` : ""}. View this property listing on South Suburbs Best.`;
  const media = Array.isArray((entity.attributes as { media?: unknown }).media)
    ? (entity.attributes as { media: { url: string; isPrimary?: boolean }[] }).media
    : [];
  const heroImage = media.find((m) => m.isPrimary) || media[0] || null;
  return {
    title: `${address} | South Suburbs Best Real Estate`,
    description,
    openGraph: { title: address, description, images: heroImage ? [{ url: heroImage.url }] : undefined },
  };
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const entity = await loadProperty(params.id);
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
  const media = Array.isArray((entity.attributes as { media?: unknown }).media)
    ? (entity.attributes as { media: { url: string; isPrimary?: boolean; altText?: string | null }[] }).media
    : [];
  const gallery = [...media].sort((a, b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1));
  const listingAgent = entity.listingAgent;
  const leadDestination = entity.leadDestination || { type: "platform_default" as const, clientId: "SSB_PROD" };

  return (
    <>
      {/* REAL-ESTATE-DIRECTORY-PROPERTY-FOUNDATION-001 - real
          Receptionist pageContext, reusing widget.js's existing
          data-page-* attribute mechanism (resolvePageContext()) -
          zero widget.js changes needed. */}
      <div
        data-page-type="property"
        data-page-category="real-estate"
        data-page-business={address || entity.entityId}
        data-page-city={city || undefined}
        className="hidden"
      />

    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link href="/real-estate" className="text-sm font-semibold" style={{ color: SSB_PRIMARY_COLOR }}>
          ← Back to Real Estate
        </Link>

        <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow">
          {gallery.length > 0 ? (
            <div className="grid gap-1 sm:grid-cols-4">
              <div className="relative h-64 sm:col-span-4 sm:h-96">
                <Image src={gallery[0].url} alt={gallery[0].altText || address || "Property photo"} fill priority className="object-cover" />
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-1 sm:col-span-4">
                  {gallery.slice(1).map((m, i) => (
                    <div key={i} className="relative h-20 sm:h-24">
                      <Image src={m.url} alt={m.altText || `${address || "Property"} photo ${i + 2}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-56 items-center justify-center bg-slate-100 text-6xl" aria-hidden>
              🏠
            </div>
          )}
          <div className="p-8">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              {listingAgent ? "Agent Listed" : "FSBO"}
            </span>
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

            {listingAgent ? (
              <div className="mt-8 flex items-center gap-4 rounded-xl bg-slate-50 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: SSB_PRIMARY_COLOR }}>
                  {listingAgent.name.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase()}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Listing Agent</p>
                  <Link href={`/business/${listingAgent.slug}`} className="text-sm font-semibold" style={{ color: SSB_PRIMARY_COLOR }}>
                    {listingAgent.name}
                  </Link>
                  {listingAgent.phone && <p className="text-xs text-slate-500">{listingAgent.phone}</p>}
                </div>
              </div>
            ) : (
              <p className="mt-8 text-sm text-slate-600">
                For Sale By Owner{sellerName ? ` — listed by ${sellerName}` : ""}. Contact South Suburbs Best to be
                connected with the seller.
              </p>
            )}

            <ShowingInquiryForm
              scopeId={entity.tenantId}
              entityId={entity.entityId}
              propertyAddress={address || "this property"}
              leadDestination={leadDestination}
            />
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
