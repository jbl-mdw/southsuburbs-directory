// Real estate directory sales page for South Suburbs Best. A pure,
// static sales surface inside the existing SSB app (same root layout,
// Navbar, Footer and Receptionist widget); it adds no backend route and
// reads no production data. Founder-editable facts (pricing, offers, FAQ
// copy) live in ./content.ts. Readiness, gaps and founder decisions:
// docs/zillow-buster/LAUNCH_READINESS.md. The route folder name is
// internal and pending the founder's URL decision.
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Compass,
  Globe,
  Hammer,
  Inbox,
  Magnet,
  Palette,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  User,
  Users,
  XCircle,
} from "lucide-react";
import {
  DIRECTORIES,
  FAQ,
  FEATURED_PLACEMENT,
  LAUNCH_OFFER,
  MARKETPLACE,
  SALES_CONTACT,
  type DirectoryKey,
  type DirectoryProduct,
} from "./content";
import {
  BrokerageRosterPreview,
  BuilderCommunityPreview,
  DirectoryHomepagePreview,
  LiveDemoLink,
  MarketplacePreview,
  PropertyDetailPreview,
} from "./ProductPreviews";
import BreakEvenCalculator from "./BreakEvenCalculator";
import DirectoryIntakeForm from "./DirectoryIntakeForm";

export const metadata: Metadata = {
  title: "Branded Real Estate Directories | South Suburbs Best",
  description:
    "South Suburbs Best builds real estate agents, brokerages and home builders their own branded property directory on their own domain, with showing requests that go straight to them and a listing in the South Suburbs Best Real Estate Marketplace.",
};

const DIRECTORY_ICONS: Record<DirectoryKey, React.ReactNode> = {
  "solo-agent": <User className="h-6 w-6" />,
  brokerage: <Users className="h-6 w-6" />,
  builder: <Hammer className="h-6 w-6" />,
};

const DIRECTORY_PREVIEWS: Record<DirectoryKey, React.ReactNode> = {
  "solo-agent": <PropertyDetailPreview />,
  brokerage: <BrokerageRosterPreview />,
  builder: <BuilderCommunityPreview />,
};

const TRUST_POINTS = [
  { icon: <ShieldCheck className="h-5 w-5" />, text: "From the team behind the South Suburbs Best Real Estate Directory" },
  { icon: <Inbox className="h-5 w-5" />, text: "Showing requests on every listing" },
  { icon: <Globe className="h-5 w-5" />, text: "Your brand on a domain you own" },
  { icon: <Store className="h-5 w-5" />, text: "Marketplace listing included" },
];

const DIRECTORY_VS_MARKETPLACE = [
  { label: "Brand buyers see", directory: "Yours: your name, logo and colors", marketplace: "South Suburbs Best" },
  { label: "Web address", directory: "A domain you own", marketplace: "southsuburbsbest.com" },
  { label: "What's on it", directory: "Only your listings, agents or communities", marketplace: "Local real estate professionals and properties, including yours" },
  { label: "What it does for you", directory: "Converts buyers who look you up by name", marketplace: "Helps local buyers discover you" },
  { label: "Showing requests on your listings", directory: "Go to you or the listing agent", marketplace: "Go to the listing agent" },
  { label: "Cost", directory: "Your directory subscription", marketplace: "Normal-rotation listing included; featured placement optional" },
];

const WITHOUT = [
  "Your listings share the page with the portal's brand and other options",
  "The web address buyers remember belongs to the portal",
  "How inquiries are handled follows the portal's rules, not yours",
  "The audience you attract builds someone else's platform",
  "Your name gets lost in a crowded regional search",
];

const WITH = [
  "A property site where you are the only agent on the page",
  "Your own domain on every sign, card and social profile",
  "Showing requests on every listing, sent to the listing agent",
  "A web presence that grows under your name",
  "A listing in the South Suburbs Best Real Estate Marketplace",
];

const STEPS = [
  { icon: <ClipboardList className="h-5 w-5" />, title: "Choose your directory", body: "Solo Agent, Brokerage, or Builder / Developer." },
  { icon: <Building2 className="h-5 w-5" />, title: "Tell us about your business", body: "Service areas, agents or communities, and your listings." },
  { icon: <Palette className="h-5 w-5" />, title: "Set your branding", body: "Logo, colors, bio and the domain you own." },
  { icon: <Hammer className="h-5 w-5" />, title: "We build it", body: "We build your directory around your brand and content." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "We verify it with you", body: "You review pages, listings and where requests are sent." },
  { icon: <Rocket className="h-5 w-5" />, title: "Launch", body: "Your domain goes live and your marketplace listing joins rotation." },
];

function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
      <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${light ? "text-amber-300" : "text-amber-600"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${light ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {body && <p className={`mt-4 text-base ${light ? "text-white/75" : "text-slate-600"}`}>{body}</p>}
    </div>
  );
}

function intakeHref(key: DirectoryKey) {
  return `?directory=${key}#get-started`;
}

function PrimaryCta({ children, href = "#get-started" }: { children: React.ReactNode; href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-base font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 sm:w-auto"
    >
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

// No founder-approved price yet -> a customer-friendly "Request pricing".
function PriceLine({ price, cadence }: { price: string | null; cadence?: string | null }) {
  if (!price) return <span className="text-sm font-semibold text-slate-500">Request pricing</span>;
  return (
    <span className="text-2xl font-bold text-slate-900">
      {price}
      {cadence && <span className="text-sm font-medium text-slate-500"> {cadence}</span>}
    </span>
  );
}

function DirectorySection({ directory, index }: { directory: DirectoryProduct; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <section id={directory.key} className={`scroll-mt-24 py-14 sm:py-20 ${flipped ? "bg-slate-50" : "bg-white"}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div className={`min-w-0 ${flipped ? "lg:order-2" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e3a5f] text-white">{DIRECTORY_ICONS[directory.key]}</div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">{directory.name}</p>
              <p className="text-xs text-slate-500">For {directory.audience.toLowerCase()}</p>
            </div>
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{directory.headline}</h2>
          <p className="mt-4 text-slate-600">{directory.pitch}</p>
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            {directory.outcomes.map((o) => (
              <div key={o.title}>
                <dt className="flex items-center gap-2 font-bold text-slate-900">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" /> {o.title}
                </dt>
                <dd className="mt-1 pl-7 text-sm text-slate-600">{o.body}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryCta href={intakeHref(directory.key)}>{directory.cta}</PrimaryCta>
            <PriceLine price={directory.price} cadence={directory.cadence} />
          </div>
        </div>
        <div className={`min-w-0 ${flipped ? "lg:order-1" : ""}`}>{DIRECTORY_PREVIEWS[directory.key]}</div>
      </div>
    </section>
  );
}

export default function RealEstateDirectorySalesPage() {
  const anyPricingApproved = DIRECTORIES.some((d) => d.price);

  return (
    <main className="min-h-screen bg-white">
      {/* Receptionist pageContext, reusing widget.js's existing
          data-page-* mechanism (same as real-estate/property/[id]). */}
      <div
        data-page-type="sales"
        data-page-category="real-estate"
        data-page-business="South Suburbs Best Real Estate Directories"
        className="hidden"
      />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2238] via-[#1e3a5f] to-[#0f2238] text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-300 ring-1 ring-white/15 sm:text-xs sm:tracking-[0.2em]">
              <Sparkles className="h-3.5 w-3.5" /> South Suburbs Best · Real Estate Directories
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Your listings. Your brand. <span className="text-amber-300">Your leads.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Keep the portals for reach. Get your own independently branded property directory on a domain you own, where
              showing requests and questions come straight to you. Every directory also includes a listing in the South
              Suburbs Best Real Estate Marketplace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryCta>Get my branded directory</PrimaryCta>
              <Link
                href="#directories"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3.5 text-base font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20"
              >
                Compare directories
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Questions?{" "}
              <a href={SALES_CONTACT.phoneHref} className="whitespace-nowrap font-semibold text-amber-300 hover:underline">
                Call {SALES_CONTACT.phone}
              </a>
            </p>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">I&apos;m a…</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {DIRECTORIES.map((d) => (
                  <Link
                    key={d.key}
                    href={`#${d.key}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/90 ring-1 ring-white/15 transition hover:bg-white/15 sm:px-3.5 sm:py-1.5"
                  >
                    {d.shortName}
                    <ArrowDown className="h-3.5 w-3.5 text-amber-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="min-w-0">
            <DirectoryHomepagePreview />
            <p className="mt-3 text-center text-xs text-white/50">Example Solo Agent Directory with sample listings</p>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="border-b border-slate-100 bg-white">
        <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((t) => (
            <li key={t.text} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1e3a5f]/10 text-[#1e3a5f]">{t.icon}</span>
              {t.text}
            </li>
          ))}
        </ul>
      </section>

      {/* ============ PROBLEM → SOLUTION ============ */}
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="The problem"
            title="Portals give you reach. They don't give you a home base."
            body="Third-party portals are a useful part of the mix. But when they're your only digital presence, your brand, your audience and your buyers' first impression all live on someone else's platform."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-red-100">
              <h3 className="flex items-center gap-2 text-lg font-bold text-red-700">
                <XCircle className="h-5 w-5" /> Relying only on third-party portals
              </h3>
              <ul className="mt-5 space-y-3">
                {WITHOUT.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-slate-600">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-7 shadow-sm ring-2 ring-emerald-200">
              <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-700">
                <CheckCircle2 className="h-5 w-5" /> With your own branded directory
              </h3>
              <ul className="mt-5 space-y-3">
                {WITH.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm font-medium text-slate-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ REACH vs CAPTURE ============ */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            eyebrow="Keep the portals. Add your own."
            title="Portals for reach. Your directory for capture."
            body="You don't have to choose. Each channel does a different job, and they work best together."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-7 ring-1 ring-slate-100">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200 text-slate-700">
                <Compass className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Third-party portals</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Discovery</h3>
              <p className="mt-2 text-sm text-slate-600">Put your listings in front of a large audience of buyers who are browsing.</p>
            </div>
            <div className="rounded-2xl bg-[#1e3a5f] p-7 text-white shadow-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-slate-900">
                <Magnet className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Your branded directory</p>
              <h3 className="mt-1 text-xl font-bold">Conversion</h3>
              <p className="mt-2 text-sm text-white/80">
                When a buyer is ready and looks you up by name, they land on your site, see only your properties, and request a
                showing from you.
              </p>
            </div>
          </div>
          <blockquote className="mx-auto mt-10 max-w-3xl border-l-4 border-amber-400 bg-amber-50 px-6 py-5 text-lg font-semibold italic text-slate-800">
            &ldquo;The portals show your listings to the world. Your own directory makes sure that when a buyer is ready to
            act, they&apos;re talking to you.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ============ CHOOSE YOUR DIRECTORY ============ */}
      <section id="directories" className="scroll-mt-24 bg-[#0f2238] py-14 sm:py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            light
            eyebrow="Choose your directory"
            title="Three directories. One regional marketplace."
            body="Pick the independently branded directory built for your kind of real estate business. Every one includes a normal-rotation listing in the South Suburbs Best Real Estate Marketplace."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {DIRECTORIES.map((d) => (
              <Link
                key={d.key}
                href={`#${d.key}`}
                className="group flex flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-slate-900">{DIRECTORY_ICONS[d.key]}</div>
                <h3 className="mt-5 text-lg font-bold">{d.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/50">{d.audience}</p>
                <p className="mt-3 flex-1 text-sm text-white/75">{d.headline}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
                  See how it works <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="#marketplace"
            className="mt-5 flex flex-col items-start gap-3 rounded-2xl bg-white/5 p-5 text-white ring-1 ring-amber-300/50 transition hover:bg-white/10 sm:flex-row sm:items-center"
          >
            <Store className="h-6 w-6 shrink-0 text-amber-300" />
            <span className="flex-1 text-sm font-semibold">
              Included with every directory: a normal-rotation listing in the South Suburbs Best Real Estate Marketplace.
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-300">
              How it works <ArrowDown className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* ============ DIRECTORY SECTIONS ============ */}
      {DIRECTORIES.map((d, i) => (
        <DirectorySection key={d.key} directory={d} index={i} />
      ))}

      {/* ============ SOUTH SUBURBS BEST MARKETPLACE (included benefit) ============ */}
      <section id="marketplace" className="scroll-mt-24 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Included with every directory"
            title="Your own directory, plus a seat in the regional marketplace"
            body={MARKETPLACE.pitch}
          />

          {/* How the pieces connect */}
          <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="rounded-2xl bg-[#1e3a5f] p-6 text-white">
              <Globe className="h-6 w-6 text-amber-300" />
              <h3 className="mt-3 font-bold">Your directory</h3>
              <p className="mt-1 text-sm text-white/75">On your own domain, under your brand. Buyers who search for you find you.</p>
            </div>
            <div className="flex items-center justify-center text-2xl font-bold text-slate-300" aria-hidden>+</div>
            <div className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200">
              <Store className="h-6 w-6 text-amber-600" />
              <h3 className="mt-3 font-bold text-slate-900">South Suburbs Best Real Estate Marketplace</h3>
              <p className="mt-1 text-sm text-slate-600">
                Owned and operated by South Suburbs Best. Your profile appears where local buyers browse real estate professionals
                and properties.
              </p>
            </div>
            <div className="flex items-center justify-center text-slate-300" aria-hidden>
              <ArrowRight className="h-7 w-7 rotate-90 lg:rotate-0" />
            </div>
            <div className="rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-200">
              <Inbox className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-3 font-bold text-slate-900">Two ways to be found</h3>
              <p className="mt-1 text-sm text-slate-600">Your own site plus a regional directory, both pointing buyers back to you.</p>
            </div>
          </div>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200">
              <Image
                src="/hero.png"
                alt="Map of Chicago's South Suburbs served by South Suburbs Best"
                width={1920}
                height={1080}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Built for Chicago&apos;s South Suburbs</h3>
              <p className="mt-3 text-slate-600">
                South Suburbs Best covers communities across the Southland, from Orland Park and Tinley Park to Homewood,
                Flossmoor, Frankfort and beyond. Real estate has its own dedicated directory on South Suburbs Best, with listings
                and profiles for agents, brokerages, property managers, lenders, inspectors and other real estate professionals.
              </p>
              <div className="mt-6">
                <LiveDemoLink />
              </div>
            </div>
          </div>

          {/* Your directory vs. the marketplace */}
          <div className="mt-14">
            <h3 className="text-center text-2xl font-bold text-slate-900">Your directory and the marketplace, side by side</h3>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
              Your directory is yours: your brand, on your domain. The marketplace belongs to South Suburbs Best and adds regional
              exposure on top.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-slate-200">
              <div className="hidden bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid sm:grid-cols-[1fr_1.2fr_1.2fr]">
                <div className="px-5 py-3" />
                <div className="bg-[#1e3a5f] px-5 py-3 text-white">Your branded directory</div>
                <div className="px-5 py-3">South Suburbs Best Marketplace</div>
              </div>
              {DIRECTORY_VS_MARKETPLACE.map((row) => (
                <div key={row.label} className="grid grid-cols-2 border-t border-slate-100 text-sm first:border-t-0 sm:grid-cols-[1fr_1.2fr_1.2fr] sm:first:border-t">
                  <div className="col-span-2 bg-slate-50 px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-1 sm:bg-white sm:px-5 sm:py-4 sm:text-sm sm:normal-case sm:tracking-normal sm:text-slate-800">
                    {row.label}
                  </div>
                  <div className="bg-[#1e3a5f]/5 px-4 py-3 font-semibold text-[#1e3a5f] sm:px-5 sm:py-4">
                    <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:hidden">Your directory</span>
                    {row.directory}
                  </div>
                  <div className="px-4 py-3 text-slate-600 sm:px-5 sm:py-4">
                    <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:hidden">Marketplace</span>
                    {row.marketplace}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Included vs. optional upgrade */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Included</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">Normal-rotation marketplace listing</h3>
              <p className="mt-2 text-sm text-slate-600">
                Every Solo Agent, Brokerage and Builder / Developer subscription includes a listing in the South Suburbs Best Real
                Estate Marketplace, shown in normal rotation alongside other local real estate professionals. South Suburbs Best
                owns and operates the marketplace, so there&apos;s no second site for you to build or maintain.
              </p>
              <p className="mt-3 text-sm font-semibold text-emerald-700">Included in every directory subscription</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-6 ring-2 ring-amber-300">
              <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                <Star className="h-3.5 w-3.5" /> Optional upgrade
              </p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{FEATURED_PLACEMENT.name}</h3>
              <p className="mt-2 text-sm text-slate-700">{FEATURED_PLACEMENT.body}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                {FEATURED_PLACEMENT.points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-600" /> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <PriceLine price={FEATURED_PLACEMENT.price} />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <p className="mb-3 text-sm font-semibold text-slate-700">How a featured listing could stand out</p>
            <MarketplacePreview />
          </div>
        </div>
      </section>

      {/* ============ ROI ============ */}
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            eyebrow="Do the math"
            title="One closing changes the whole equation"
            body="In real estate, a single extra transaction can be worth more than a year of marketing. Put in your own numbers."
          />
          <BreakEvenCalculator />
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="bg-[#0f2238] py-14 sm:py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            light
            eyebrow="How it works"
            title="From sign-up to launch, done for you"
            body="No coding, no hosting to manage. You bring your brand and your listings. We handle the build."
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-slate-900">{i + 1}</div>
                <div>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-white/60">
            Our build target is 48 hours from complete onboarding information. We confirm your launch date once your
            directory passes verification with you.
          </p>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="scroll-mt-24 bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Pricing"
            title="Subscription pricing"
            body={
              anyPricingApproved
                ? "Choose the directory that fits your business. Add featured placement anytime."
                : "Pricing depends on the directory you choose. Request a walkthrough and we'll send pricing for your directory."
            }
          />
          {LAUNCH_OFFER && (
            <div className="mx-auto mb-10 max-w-3xl rounded-2xl bg-amber-400 p-6 text-center text-slate-900 shadow-lg">
              <p className="text-lg font-bold">{LAUNCH_OFFER.headline}</p>
              <p className="mt-1 text-sm">{LAUNCH_OFFER.body}</p>
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-3">
            {DIRECTORIES.map((d) => (
              <div key={d.key} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e3a5f] text-white">{DIRECTORY_ICONS[d.key]}</div>
                <h3 className="mt-4 font-bold text-slate-900">{d.name}</h3>
                <p className="text-xs text-slate-500">Branded directory subscription</p>
                <div className="mt-4">
                  <PriceLine price={d.price} cadence={d.cadence} />
                </div>
                {d.introOffer && <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">{d.introOffer}</p>}
                <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-600 sm:text-xs">
                  {d.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" /> {i}
                    </li>
                  ))}
                </ul>
                <Link
                  href={intakeHref(d.key)}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16304d]"
                >
                  Get this directory
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-2 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Optional upgrade</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{FEATURED_PLACEMENT.name}</p>
            </div>
            <PriceLine price={FEATURED_PLACEMENT.price} />
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 open:ring-[#1e3a5f]/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                  {f.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 text-lg leading-none text-slate-900 transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CONVERSION ============ */}
      <section id="get-started" className="scroll-mt-24 bg-gradient-to-br from-[#0f2238] via-[#1e3a5f] to-[#0f2238] py-14 sm:py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Get started</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Stop renting your online presence. Start owning it.</h2>
            <p className="mt-4 text-white/80">
              Tell us about your business and which directory fits. We&apos;ll walk you through your directory, share pricing,
              and map out your launch.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/85">
              {[
                "A walkthrough built around your business",
                "Pricing for the directory you choose",
                "A launch plan for your domain and listings",
                "No payment required to request a walkthrough",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-300" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold">Prefer to talk now?</p>
              <a href={SALES_CONTACT.phoneHref} className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-amber-300">
                <PhoneCall className="h-5 w-5" /> {SALES_CONTACT.phone}
              </a>
            </div>
            <div className="mt-6">
              <LiveDemoLink tone="dark" />
            </div>
          </div>
          <Suspense fallback={<div className="min-h-[480px] rounded-2xl bg-white/5" />}>
            <DirectoryIntakeForm />
          </Suspense>
        </div>
      </section>

      <p className="mx-auto max-w-4xl px-4 py-8 text-center text-xs text-slate-400">
        Zillow is a registered trademark of Zillow, Inc. South Suburbs Best is not affiliated with, endorsed by, or sponsored
        by Zillow, Inc. Directories do not include Zillow listings or data. Screens shown are examples with sample listings.
      </p>
    </main>
  );
}
