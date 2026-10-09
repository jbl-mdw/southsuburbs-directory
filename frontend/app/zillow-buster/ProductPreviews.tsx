// ZILLOW-BUSTER-SALES-LANDING-001 - static product previews for the
// sales page. Each one mirrors the markup of the real, live component it
// represents (cited per preview) so prospects see the actual product,
// but renders SAMPLE data and never submits anything: a working showing
// form on a sales page would push fake requests into live lead routing.
// Every preview carries a "Preview · sample data" ribbon plus an honest
// status badge (content.ts PREVIEW_STATUS_*), so no illustration can be
// mistaken for certified, customer-domain functionality.

import Link from "next/link";
import { Bath, BedDouble, CalendarCheck, Home, MapPin, Ruler, Search, Star } from "lucide-react";
import { PREVIEW_STATUS_DETAIL, PREVIEW_STATUS_LABEL, type PreviewStatus } from "./content";

const PRIMARY = "#1e3a5f";

export function StatusBadge({ status }: { status: PreviewStatus }) {
  const tone =
    status === "live"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : status === "partial"
        ? "bg-sky-50 text-sky-700 ring-sky-200"
        : "bg-amber-50 text-amber-800 ring-amber-200";
  const dot = status === "live" ? "bg-emerald-500" : status === "partial" ? "bg-sky-500" : "bg-amber-500";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${tone}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden />
      {PREVIEW_STATUS_LABEL[status]}
    </span>
  );
}

export function PreviewLegend() {
  const statuses: PreviewStatus[] = ["live", "partial", "concept"];
  return (
    <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
      <p className="text-sm font-semibold text-slate-900">How to read these previews</p>
      <p className="mt-1 text-xs text-slate-500">
        Every screen on this page is an illustration with sample data, not a real listing, agent or customer. Badges show
        how far along each feature is.
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {statuses.map((s) => (
          <li key={s} className="text-xs text-slate-600">
            <StatusBadge status={s} />
            <p className="mt-1.5">{PREVIEW_STATUS_DETAIL[s]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 min-w-0 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-slate-400 ring-1 ring-slate-200">{url}</span>
        <span className="ml-auto shrink-0 rounded bg-slate-900/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
          Preview · sample data
        </span>
      </div>
      {children}
    </div>
  );
}

const SAMPLE_PROPERTIES = [
  { price: 389000, address: "Sample listing · Maple Ct", city: "Homewood", beds: 4, baths: 2.5, tag: "Agent Listed", tone: "from-sky-200 to-sky-400" },
  { price: 274500, address: "Sample listing · Oak Ave", city: "Flossmoor", beds: 3, baths: 2, tag: "Agent Listed", tone: "from-emerald-200 to-emerald-400" },
  { price: 512000, address: "Sample listing · Prairie Ln", city: "Frankfort", beds: 5, baths: 3, tag: "Agent Listed", tone: "from-amber-200 to-amber-400" },
];

// Mirrors the property card in app/real-estate/page.tsx.
function PropertyCard({ p }: { p: (typeof SAMPLE_PROPERTIES)[number] }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-100 ring-1 ring-slate-100">
      <div className={`flex h-28 items-center justify-center bg-gradient-to-br ${p.tone}`} aria-hidden>
        <Home className="h-10 w-10 text-white/90" />
      </div>
      <div className="p-4">
        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">{p.tag}</span>
        <p className="mt-2 text-lg font-bold text-slate-900">${p.price.toLocaleString()}</p>
        <h3 className="text-xs font-semibold text-slate-700">{p.address}</h3>
        <p className="mt-0.5 text-[11px] text-slate-500">{p.city}</p>
        <p className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1"><BedDouble className="h-3 w-3" /> {p.beds} bed</span>
          <span className="inline-flex items-center gap-1"><Bath className="h-3 w-3" /> {p.baths} bath</span>
        </p>
        <span className="mt-3 inline-block text-xs font-semibold" style={{ color: PRIMARY }}>View Listing →</span>
      </div>
    </article>
  );
}

// Hero visual: a solo agent's branded directory homepage. Mirrors
// app/real-estate/HeroSearch.tsx + the property grid in page.tsx.
export function DirectoryHomepagePreview() {
  return (
    <BrowserFrame url="www.youragentbrand.com">
      <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f2238] px-5 pb-6 pt-5 text-white">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold tracking-tight">Your Name · Realtor®</span>
          <span className="hidden text-[11px] text-white/70 sm:inline">Listings · About · Contact</span>
        </div>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">Homes in the South Suburbs</p>
        <p className="mt-1 text-xl font-bold leading-tight sm:text-2xl">Find your next home with a local expert</p>
        <div className="mt-4 flex flex-col gap-1.5 rounded-xl bg-white/95 p-1.5 text-slate-700 sm:flex-row">
          <div className="flex-1 rounded-lg bg-white px-3 py-2 text-[11px]">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">City</span>
            Homewood
          </div>
          <div className="flex-1 rounded-lg bg-white px-3 py-2 text-[11px]">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">Price</span>
            $250k – $550k
          </div>
          <div className="flex items-center justify-center gap-1.5 rounded-lg bg-[#1e3a5f] px-4 py-2 text-[11px] font-semibold text-white">
            <Search className="h-3 w-3" /> Search
          </div>
        </div>
      </div>
      <div className="grid gap-3 bg-slate-50 p-4 sm:grid-cols-3">
        {SAMPLE_PROPERTIES.map((p, i) => (
          <div key={p.address} className={i > 0 ? "hidden sm:block" : undefined}>
            <PropertyCard p={p} />
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

// Mirrors app/real-estate/property/[id]/page.tsx + ShowingInquiryForm.tsx.
export function PropertyDetailPreview() {
  return (
    <BrowserFrame url="www.youragentbrand.com/property/…">
      <div className="p-5">
        <div className="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-sky-200 to-sky-400" aria-hidden>
          <Home className="h-12 w-12 text-white/90" />
        </div>
        <div className="mt-4 sm:flex sm:items-start sm:justify-between sm:gap-4">
          <div>
            <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">Agent Listed</span>
            <h3 className="mt-2 text-lg font-bold text-slate-900">Sample listing · Maple Ct</h3>
            <p className="text-xs text-slate-500">Homewood, IL</p>
          </div>
          <p className="mt-2 text-xl font-bold sm:mt-6" style={{ color: PRIMARY }}>$389,000</p>
        </div>
        <div className="mt-3 flex gap-4 text-xs text-slate-700">
          <span><b>4</b> bed</span>
          <span><b>2.5</b> bath</span>
          <span className="inline-flex items-center gap-1"><Ruler className="h-3 w-3" /><b>2,140</b> sq ft</span>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: PRIMARY }}>YN</div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-400">Listing Agent</p>
            <p className="text-xs font-semibold" style={{ color: PRIMARY }}>Your Name</p>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-slate-50 p-3" aria-label="Showing request form preview">
          <div className="flex gap-1.5">
            <span className="rounded-full bg-[#1e3a5f] px-3 py-1 text-[11px] font-semibold text-white">Request a Showing</span>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">Ask a Question</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <div className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[11px] text-slate-400">Your name</div>
            <div className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[11px] text-slate-400">Email</div>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#1e3a5f] px-4 py-1.5 text-[11px] font-semibold text-white">
            <CalendarCheck className="h-3 w-3" /> Request Showing
          </div>
          <p className="mt-2 text-[10px] text-slate-500">Request goes to the listing agent for follow-up.</p>
        </div>
      </div>
    </BrowserFrame>
  );
}

// Mirrors the agent cards in app/real-estate/page.tsx, arranged as a
// brokerage roster.
export function BrokerageRosterPreview() {
  const agents = [
    { initials: "A1", name: "Agent One", area: "Orland Park", listings: 6 },
    { initials: "A2", name: "Agent Two", area: "Tinley Park", listings: 4 },
    { initials: "A3", name: "Agent Three", area: "Frankfort", listings: 9 },
    { initials: "A4", name: "Agent Four", area: "Homewood", listings: 3 },
  ];
  return (
    <BrowserFrame url="www.yourbrokerage.com/agents">
      <div className="bg-[#1e3a5f] px-5 py-4 text-white">
        <p className="text-sm font-bold">Your Brokerage</p>
        <p className="text-[11px] text-white/70">Serving the South Suburbs</p>
      </div>
      <div className="p-5">
        <p className="text-sm font-bold text-slate-900">Our Agents</p>
        <p className="text-[11px] text-slate-500">Every listing links to its listing agent.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {agents.map((a) => (
            <div key={a.name} className="overflow-hidden rounded-xl ring-1 ring-slate-100">
              <div className="flex h-12 items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: PRIMARY }}>{a.initials}</div>
              <div className="p-2.5">
                <p className="text-xs font-bold text-slate-900">{a.name}</p>
                <p className="text-[10px] text-slate-500">Serving {a.area}</p>
                <p className="mt-1 text-[10px] font-semibold" style={{ color: PRIMARY }}>{a.listings} listings →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

export function BuilderCommunityPreview() {
  const plans = [
    { name: "Plan A · Sample", beds: 3, sqft: "1,850", status: "2 homes available" },
    { name: "Plan B · Sample", beds: 4, sqft: "2,320", status: "Now selling" },
    { name: "Plan C · Sample", beds: 4, sqft: "2,640", status: "Coming soon" },
  ];
  return (
    <BrowserFrame url="www.yourbuilder.com/communities/…">
      <div className="p-5">
        <div className="flex h-28 items-end rounded-xl bg-gradient-to-br from-emerald-300 to-emerald-600 p-3" aria-hidden>
          <span className="text-sm font-bold text-white">Sample Community · Frankfort</span>
        </div>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Floor plans</p>
        <div className="mt-2 space-y-2">
          {plans.map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
              <div>
                <p className="text-xs font-bold text-slate-900">{p.name}</p>
                <p className="text-[10px] text-slate-500">{p.beds} bed · {p.sqft} sq ft</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">{p.status}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#1e3a5f] px-4 py-1.5 text-[11px] font-semibold text-white">
          <CalendarCheck className="h-3 w-3" /> Schedule a Tour
        </div>
      </div>
    </BrowserFrame>
  );
}

// Mirrors the "Featured Local Agents" cards in app/real-estate/page.tsx,
// with one card shown in its featured-upgrade state (a concept: no real
// estate business has featured placement configured today).
export function MarketplacePreview() {
  const cards = [
    { initials: "YB", name: "Your Business", area: "Homewood", featured: true },
    { initials: "LA", name: "Local Agent", area: "Flossmoor", featured: false },
    { initials: "LB", name: "Local Brokerage", area: "Orland Park", featured: false },
  ];
  return (
    <BrowserFrame url="southsuburbsbest.com/real-estate">
      <div className="p-5">
        <p className="text-center text-sm font-bold text-slate-900">Featured Local Agents</p>
        <p className="text-center text-[11px] text-slate-500">Real, local real estate professionals serving the South Suburbs.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.name}
              className={`overflow-hidden rounded-xl bg-white shadow ring-1 ${c.featured ? "ring-2 ring-amber-400" : "ring-slate-100"}`}
            >
              <div className="relative flex h-14 items-center justify-center text-lg font-bold text-white" style={{ backgroundColor: PRIMARY }}>
                {c.initials}
                {c.featured && (
                  <span className="absolute right-1.5 top-1.5 inline-flex items-center gap-0.5 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-bold text-slate-900">
                    <Star className="h-2.5 w-2.5" /> Featured
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-slate-900">{c.name}</p>
                <p className="text-[10px] text-slate-500">Serving {c.area}</p>
                <p className="mt-1.5 text-[10px] font-semibold" style={{ color: PRIMARY }}>View Profile →</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

export function LiveDemoLink({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link
      href="/real-estate"
      className={
        tone === "light"
          ? "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1e3a5f] shadow ring-1 ring-slate-200 transition hover:bg-slate-50"
          : "inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20"
      }
    >
      <MapPin className="h-4 w-4" /> Explore the live SSB Real Estate Directory
    </Link>
  );
}
