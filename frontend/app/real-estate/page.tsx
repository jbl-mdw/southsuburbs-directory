export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getVertical, getScopedEntities, type SsbEntityFilters } from "@/lib/ssbVertical";
import { SSB_VISIBILITY_FILTER } from "@/lib/directus";
import HeroSearch from "./HeroSearch";
import PropertyFilters from "./PropertyFilters";

export const metadata: Metadata = {
  title: "Real Estate | South Suburbs Best",
  description:
    "Find real estate agents, brokerages, property managers, mortgage lenders, title companies, home inspectors, attorneys, and FSBO listings in Chicago's South Suburbs.",
};

const SSB_SCOPE_ID = "SSB";
const SSB_PRIMARY_COLOR = "#1e3a5f";
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://ssb_directus:8055";

// Same real city list/images the SSB homepage already uses - reused,
// never a second geography source.
const southSuburbCities = [
  { slug: "orland-park", name: "Orland Park", image: "/cities/orland-park.jpg" },
  { slug: "flossmoor", name: "Flossmoor", image: "/cities/flossmoor.jpg" },
  { slug: "homewood", name: "Homewood", image: "/cities/homewood.jpg" },
  { slug: "glenwood", name: "Glenwood", image: "/cities/glenwood.jpg" },
  { slug: "tinley-park", name: "Tinley Park", image: "/cities/tinley-park.jpg" },
  { slug: "frankfort", name: "Frankfort", image: "/cities/frankfort.jpg" },
];

type Agent = {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  phone: string | null;
};

function initialsFor(name: string): string {
  return name.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
}

function formatAttribute(attributes: Record<string, unknown>, key: string): string | null {
  const v = attributes?.[key];
  return typeof v === "string" || typeof v === "number" ? String(v) : null;
}

// SSB-REAL-ESTATE-CONSUMER-EXPERIENCE-REFINEMENT-001 - real agent
// sample, same SSB_VISIBILITY_FILTER every other SSB business-read
// path uses. No profile_score/is_featured/rating data exists on any
// real estate business today (a real, verified gap - see mission
// report), so this is a real, honest sample - never a fabricated
// "featured" ranking.
async function getAgentSample(): Promise<Agent[]> {
  try {
    const filter = encodeURIComponent(
      JSON.stringify({ _and: [{ category_slug: { _eq: "realtors" } }, SSB_VISIBILITY_FILTER] })
    );
    const res = await fetch(`${DIRECTUS_URL}/items/businesses?filter=${filter}&fields=id,name,slug,city,phone&sort=name&limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

// REAL-ESTATE-DIRECTORY-PROPERTY-FOUNDATION-001 - real search/filter
// params for the Directory's own property inventory, mapped straight
// onto the gateway's real, generic attribute-filter query contract (see
// SsbEntityFilters / buildPropertyAttributeFilters in server.js). This
// is Real Estate Directory product surface search, never the generic
// SSB /category/[slug] or /explore search.
function parsePropertyFilters(searchParams: { [key: string]: string | string[] | undefined }): SsbEntityFilters {
  const get = (k: string) => (typeof searchParams[k] === "string" ? (searchParams[k] as string) : undefined);
  const filters: SsbEntityFilters = {};
  if (get("city")) filters.city = get("city");
  if (get("propertyType")) filters.propertyType = get("propertyType");
  if (get("listingType")) filters.listingType = get("listingType");
  if (get("minPrice")) filters.minPrice = Number(get("minPrice"));
  if (get("maxPrice")) filters.maxPrice = Number(get("maxPrice"));
  if (get("bedrooms")) filters.bedrooms = Number(get("bedrooms"));
  if (get("bathrooms")) filters.bathrooms = Number(get("bathrooms"));
  return filters;
}

export default async function RealEstatePage({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const vertical = await getVertical("real-estate");
  const filters = parsePropertyFilters(searchParams);
  // Public discovery only ever shows real, reviewed/published listings
  // (status "active") - the gateway itself now enforces this (governance
  // moved server-side this mission), this filter stays as defense in depth.
  const allFsboEntities = vertical ? await getScopedEntities(SSB_SCOPE_ID, "property", filters) : [];
  const fsboEntities = allFsboEntities.filter((e) => e.status === "active");
  const agents = await getAgentSample();

  if (!vertical) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20 text-center text-slate-600">
        Real Estate directory is temporarily unavailable.
      </main>
    );
  }

  const browsableEntityTypes = vertical.entityTypes.filter(
    (e) => e.categorySlug && e.categorySlug !== "real-estate"
  );
  const heroCategoryOptions = browsableEntityTypes
    .filter((e, i, arr) => arr.findIndex((x) => x.categorySlug === e.categorySlug) === i)
    .map((e) => ({ categorySlug: e.categorySlug as string, label: e.label }));

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/placeholders/real-estate.jpg"
            alt="South Suburbs Best Real Estate"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/95" />
        </div>

        <div className="relative mx-auto flex min-h-[600px] max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            South Suburbs Best Real Estate
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find Your Next Home in Chicago&apos;s South Suburbs
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            Connect with real, local real estate agents, browse FSBO listings, and get answers instantly from
            our AI Real Estate Receptionist.
          </p>

          <HeroSearch categories={heroCategoryOptions} />

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#properties"
              className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#1e3a5f] shadow-lg transition hover:bg-slate-100"
            >
              Buy
            </Link>
            <Link
              href="#agents"
              className="rounded-full bg-white/15 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/25"
            >
              Sell
            </Link>
            <Link
              href="#agents"
              className="rounded-full bg-white/15 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/25"
            >
              Find an Agent
            </Link>
            <Link
              href="/submit-fsbo"
              className="rounded-full bg-white/15 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/25"
            >
              FSBO
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FEATURED LOCAL AGENTS ============ */}
      <section id="agents" className="bg-white py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured Local Agents</h2>
            <p className="mt-2 text-sm text-slate-500">
              Real, local real estate professionals serving the South Suburbs.
            </p>
          </div>

          {agents.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
              No agents available right now. <Link href="/category/realtors" className="font-semibold" style={{ color: SSB_PRIMARY_COLOR }}>Browse all agents →</Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => (
                <article key={agent.id} className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-100 ring-1 ring-slate-100">
                  <div className="flex h-32 items-center justify-center text-3xl font-bold text-white" style={{ backgroundColor: SSB_PRIMARY_COLOR }}>
                    {initialsFor(agent.name)}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold leading-snug text-slate-900">{agent.name}</h3>
                    {agent.city && <p className="mt-1 text-sm text-slate-500">Serving {agent.city} & surrounding areas</p>}
                    <div className="mt-4 flex gap-3">
                      <Link href={`/business/${agent.slug}`} className="text-sm font-semibold" style={{ color: SSB_PRIMARY_COLOR }}>
                        View Profile →
                      </Link>
                      <Link href={`/quote?business=${agent.slug}`} className="text-sm font-semibold text-slate-600">
                        Get a Quote →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="mt-8 text-center">
            <Link href="/category/realtors" className="text-sm font-semibold" style={{ color: SSB_PRIMARY_COLOR }}>
              View all real estate agents →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PROPERTY / FSBO DISCOVERY ============ */}
      <section id="properties" className="bg-slate-50 py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Property Listings</h2>
            <p className="mt-1 text-sm text-slate-500">
              Independent and agent-listed properties in the South Suburbs.
            </p>
          </div>

          <PropertyFilters />

          {fsboEntities.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center text-slate-500 shadow">
              No properties match right now.{" "}
              <Link href="/submit-fsbo" className="font-semibold" style={{ color: SSB_PRIMARY_COLOR }}>
                List your property →
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {fsboEntities.map((entity) => {
                const address = formatAttribute(entity.attributes, "address");
                const price = formatAttribute(entity.attributes, "askingPrice");
                const city = formatAttribute(entity.attributes, "city");
                const beds = formatAttribute(entity.attributes, "bedrooms");
                const baths = formatAttribute(entity.attributes, "bathrooms");
                const media = Array.isArray((entity.attributes as { media?: unknown }).media)
                  ? ((entity.attributes as { media: { url: string; isPrimary?: boolean }[] }).media)
                  : [];
                const heroImage = media.find((m) => m.isPrimary) || media[0] || null;
                const listingAgent = entity.listingAgent;
                return (
                  <article key={entity.entityId} className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-100">
                    {heroImage ? (
                      <div className="relative h-40 w-full">
                        <Image src={heroImage.url} alt={address || "Property photo"} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center bg-slate-100 text-4xl" aria-hidden>
                        🏠
                      </div>
                    )}
                    <div className="p-5">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                        {listingAgent ? "Agent Listed" : "FSBO"}
                      </span>
                      {price && (
                        <p className="mt-3 text-xl font-bold text-slate-900">${Number(price).toLocaleString()}</p>
                      )}
                      <h3 className="mt-1 text-sm font-semibold text-slate-700">{address || "Property listing"}</h3>
                      {city && <p className="mt-1 text-xs text-slate-500">{city}</p>}
                      {(beds || baths) && (
                        <p className="mt-2 text-xs text-slate-500">
                          {beds ? `${beds} bed` : ""}
                          {beds && baths ? " · " : ""}
                          {baths ? `${baths} bath` : ""}
                        </p>
                      )}
                      {listingAgent && (
                        <p className="mt-2 text-xs text-slate-500">
                          Listed by{" "}
                          <Link href={`/business/${listingAgent.slug}`} className="font-semibold" style={{ color: SSB_PRIMARY_COLOR }}>
                            {listingAgent.name}
                          </Link>
                        </p>
                      )}
                      <Link
                        href={`/real-estate/property/${entity.entityId}`}
                        className="mt-4 inline-block text-sm font-semibold"
                        style={{ color: SSB_PRIMARY_COLOR }}
                      >
                        View Listing →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ============ PROFESSIONAL DIRECTORY ============ */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Real Estate Professional Directory</h2>
            <p className="mt-1 text-sm text-slate-500">
              Browse the full South Suburbs Best real estate ecosystem.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {browsableEntityTypes.map((e) => (
              <Link
                key={e.entityTypeKey}
                href={`/category/${e.categorySlug}`}
                className="rounded-2xl bg-slate-50 p-6 shadow transition hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-900">{e.label}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  View {e.label.toLowerCase()} serving the South Suburbs.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold" style={{ color: SSB_PRIMARY_COLOR }}>
                  Browse {e.label} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MONETIZATION / CTA ============ */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Grow Your Real Estate Business</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {vertical.monetizationSurfaces.slice(0, 6).map((surface) => (
              <div key={surface.surfaceKey} className="rounded-2xl bg-white p-6 shadow">
                <h3 className="text-base font-bold text-slate-900">{surface.label}</h3>
                <p className="mt-2 text-sm text-slate-600">{surface.signal}</p>
                <Link
                  href={surface.surfaceKey.startsWith("re-fsbo") ? "/submit-fsbo" : "/submit-listing"}
                  className="mt-4 inline-block text-sm font-semibold"
                  style={{ color: SSB_PRIMARY_COLOR }}
                >
                  Get started →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LOCAL INTELLIGENCE: CITIES + BLOG ============ */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Browse Real Estate by City</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {southSuburbCities.map((city) => (
              <Link key={city.slug} href={`/city/${city.slug}`} className="group relative overflow-hidden rounded-xl">
                <div className="relative h-28 w-full">
                  <Image src={city.image} alt={city.name} fill className="object-cover transition group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
                </div>
                <span className="absolute bottom-2 left-3 text-sm font-semibold text-white drop-shadow">{city.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Real Estate Guides</h2>
          <p className="mt-2 text-sm text-slate-500">Local market guides and insights.</p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md"
            style={{ backgroundColor: SSB_PRIMARY_COLOR }}
          >
            Read the Blog
          </Link>
        </div>
      </section>
    </main>
  );
}
