// ZILLOW-BUSTER-SALES-LANDING-001 - static product previews for the
// sales page. Each one mirrors the markup of the real, live component it
// represents (cited per preview) so prospects see the actual product,
// but renders SAMPLE data and never submits anything: a working showing
// form on a sales page would push fake requests into live lead routing.
// Every preview carries an honest status badge from content.ts.

import Link from "next/link";
import { Bath, BedDouble, Building2, CalendarCheck, Home, MapPin, Ruler, Search, Users } from "lucide-react";
import { PREVIEW_STATUS_LABEL, type PreviewStatus } from "./content";

const PRIMARY = "#1e3a5f";

function StatusBadge({ status }: { status: PreviewStatus }) {
  const tone =
    status === "live"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : status === "partial"
        ? "bg-sky-50 text-sky-700 ring-sky-200"
        : "bg-amber-50 text-amber-800 ring-amber-200";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${tone}`}>
      {PREVIEW_STATUS_LABEL[status]}
    </span>
  );
}

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-slate-400 ring-1 ring-slate-200">{url}</span>
      </div>
      {children}
    </div>
  );
}

const SAMPLE_PROPERTIES = [
  { price: 389000, address: "Sample listing · Maple Ct", city: "Homewood", beds: 4, baths: 2.5, tag: "Agent Listed", tone: "from-sky-200 to-sky-400" },
  { price: 274500, address: "Sample listing · Oak Ave", city: "Flossmoor", beds: 3, baths: 2, tag: "Agent Listed", tone: "from-emerald-200 to-emerald-400" },
  { price: 512000, address: "Sample listing · Prairie Ln", city: "Frankfort", beds: 5, baths: 3, tag: "New Construction", tone: "from-amber-200 to-amber-400" },
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
// app/real-estate/HeroSearch.tsx + PropertyFilters.tsx.
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
function PropertyDetailPreview() {
  return (
    <BrowserFrame url="www.youragentbrand.com/property/…">
      <div className="p-5">
        <div className="flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-sky-200 to-sky-400" aria-hidden>
          <Home className="h-12 w-12 text-white/90" />
        </div>
        <span className="mt-4 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">Agent Listed</span>
        <h3 className="mt-2 text-lg font-bold text-slate-900">Sample listing · Maple Ct</h3>
        <p className="text-xs text-slate-500">Homewood, IL</p>
        <p className="mt-2 text-xl font-bold" style={{ color: PRIMARY }}>$389,000</p>
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
          <p className="mt-2 text-[10px] text-slate-500">Goes straight to the listing agent.</p>
        </div>
      </div>
    </BrowserFrame>
  );
}

// Mirrors the agent cards in app/real-estate/page.tsx, arranged as a
// brokerage roster.
function BrokerageRosterPreview() {
  const agents = [
    { initials: "AL", name: "Agent One", area: "Orland Park", listings: 6 },
    { initials: "MR", name: "Agent Two", area: "Tinley Park", listings: 4 },
    { initials: "JS", name: "Agent Three", area: "Frankfort", listings: 9 },
    { initials: "KT", name: "Agent Four", area: "Homewood", listings: 3 },
  ];
  return (
    <BrowserFrame url="www.yourbrokerage.com/agents">
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

function BuilderCommunityPreview() {
  const plans = [
    { name: "The Aspen", beds: 3, sqft: "1,850", status: "2 homes available" },
    { name: "The Birch", beds: 4, sqft: "2,320", status: "Now selling" },
  ];
  return (
    <BrowserFrame url="www.yourbuilder.com/communities/…">
      <div className="p-5">
        <div className="flex h-24 items-end rounded-xl bg-gradient-to-br from-emerald-300 to-emerald-600 p-3" aria-hidden>
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

export function ProductShowcase() {
  const items: { title: string; body: string; status: PreviewStatus; icon: React.ReactNode; preview: React.ReactNode }[] = [
    {
      title: "Listing pages that turn browsers into showings",
      body: "Photo gallery, price, beds, baths and square footage, the listing agent, and a showing-request form on every listing.",
      status: "live",
      icon: <CalendarCheck className="h-5 w-5" />,
      preview: <PropertyDetailPreview />,
    },
    {
      title: "Brokerage rosters with agent-linked listings",
      body: "Every agent gets a profile. Every listing is tied to its listing agent, so a showing request reaches the right person.",
      status: "partial",
      icon: <Users className="h-5 w-5" />,
      preview: <BrokerageRosterPreview />,
    },
    {
      title: "Community showcases for builders",
      body: "Communities, floor plans, available homes and tour requests, organized the way new-construction buyers shop.",
      status: "concept",
      icon: <Building2 className="h-5 w-5" />,
      preview: <BuilderCommunityPreview />,
    },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="flex flex-col">
          <div className="mb-5 lg:min-h-[14rem]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: PRIMARY }}>
              {item.icon}
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.body}</p>
            <div className="mt-3">
              <StatusBadge status={item.status} />
            </div>
          </div>
          {item.preview}
        </div>
      ))}
    </div>
  );
}

export function LiveDemoLink() {
  return (
    <Link
      href="/real-estate"
      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1e3a5f] shadow ring-1 ring-slate-200 transition hover:bg-slate-50"
    >
      <MapPin className="h-4 w-4" /> Explore the live SSB Real Estate Directory
    </Link>
  );
}

export { StatusBadge };
