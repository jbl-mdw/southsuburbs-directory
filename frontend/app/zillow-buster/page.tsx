// ZILLOW-BUSTER-SALES-LANDING-001 - the Zillow Buster sales landing
// page. A pure, static sales surface inside the existing SSB app (same
// root layout, Navbar, Footer and Receptionist widget); it adds no
// backend route and reads no production data. Founder-editable facts
// (pricing, offers, FAQ copy) live in ./content.ts. Readiness, gaps and
// founder decisions: docs/zillow-buster/LAUNCH_READINESS.md.
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
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
  AI_EMPLOYEES,
  CONFIGURATIONS,
  FAQ,
  FEATURED_PLACEMENT,
  LAUNCH_OFFER,
  SALES_CONTACT,
  type ConfigKey,
  type Configuration,
} from "./content";
import {
  BrokerageRosterPreview,
  BuilderCommunityPreview,
  DirectoryHomepagePreview,
  LiveDemoLink,
  MarketplacePreview,
  PreviewLegend,
  PropertyDetailPreview,
  StatusBadge,
} from "./ProductPreviews";
import BreakEvenCalculator from "./BreakEvenCalculator";
import DirectoryIntakeForm from "./DirectoryIntakeForm";

export const metadata: Metadata = {
  title: "Zillow Buster | Your Own Branded Real Estate Directory | South Suburbs Best",
  description:
    "Zillow Buster builds real estate agents, brokerages and home builders their own branded property directory on their own domain, with showing requests that go straight to them and a listing in the South Suburbs Best Real Estate Marketplace.",
};

const CONFIG_ICONS: Record<ConfigKey, React.ReactNode> = {
  "solo-agent": <User className="h-6 w-6" />,
  brokerage: <Users className="h-6 w-6" />,
  builder: <Hammer className="h-6 w-6" />,
  marketplace: <Store className="h-6 w-6" />,
};

const BUYER_PREVIEWS: Record<Exclude<ConfigKey, "marketplace">, React.ReactNode> = {
  "solo-agent": <PropertyDetailPreview />,
  brokerage: <BrokerageRosterPreview />,
  builder: <BuilderCommunityPreview />,
};

const TRUST_POINTS = [
  { icon: <ShieldCheck className="h-5 w-5" />, text: "Built on the live SSB Real Estate Directory" },
  { icon: <Inbox className="h-5 w-5" />, text: "Showing requests on every listing" },
  { icon: <Globe className="h-5 w-5" />, text: "Your domain, your brand" },
  { icon: <Store className="h-5 w-5" />, text: "SSB Marketplace listing included" },
];

const WITHOUT = [
  "Your listings share the page with the portal's brand and other options",
  "The web address buyers remember belongs to the portal",
  "How inquiries are handled follows the portal's rules, not yours",
  "The audience you attract builds someone else's platform",
  "After-hours questions wait until you're back at your desk",
];

const WITH = [
  "A property site where you are the only agent on the page",
  "Your own domain on every sign, card and social profile",
  "Showing requests on every listing, sent to the listing agent",
  "A web presence that grows under your name",
  "An optional AI Receptionist that answers around the clock",
];

const STEPS = [
  { icon: <ClipboardList className="h-5 w-5" />, title: "Choose your directory", body: "Solo Agent, Brokerage, Builder, or Marketplace." },
  { icon: <Building2 className="h-5 w-5" />, title: "Tell us about your business", body: "Service areas, agents or communities, and your listings." },
  { icon: <Palette className="h-5 w-5" />, title: "Set your branding", body: "Logo, colors, bio and the domain you own." },
  { icon: <Hammer className="h-5 w-5" />, title: "We build it", body: "Your directory is manufactured on the LGR platform." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "We verify it with you", body: "You review pages, listings and lead routing." },
  { icon: <Rocket className="h-5 w-5" />, title: "Launch", body: "Your domain goes live and your marketplace listing joins rotation." },
];

function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${light ? "text-amber-300" : "text-amber-600"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${light ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {body && <p className={`mt-4 text-base ${light ? "text-white/75" : "text-slate-600"}`}>{body}</p>}
    </div>
  );
}

function intakeHref(key: ConfigKey) {
  return `?directory=${key}#get-started`;
}

function PrimaryCta({ children, href = "#get-started" }: { children: React.ReactNode; href?: string }) {
  return (
    <Link
      href={href}
     
      className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-base font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
    >
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function PriceLine({ price, cadence, dark = false }: { price: string | null; cadence?: string | null; dark?: boolean }) {
  if (!price) return <span className={`text-sm font-semibold ${dark ? "text-white/60" : "text-slate-500"}`}>Pricing at launch</span>;
  return (
    <span className={`text-2xl font-bold ${dark ? "text-white" : "text-slate-900"}`}>
      {price}
      {cadence && <span className={`text-sm font-medium ${dark ? "text-white/60" : "text-slate-500"}`}> {cadence}</span>}
    </span>
  );
}

function BuyerSection({ config, index }: { config: Configuration; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <section id={config.key} className={`scroll-mt-24 py-20 ${flipped ? "bg-slate-50" : "bg-white"}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div className={`min-w-0 ${flipped ? "lg:order-2" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e3a5f] text-white">{CONFIG_ICONS[config.key]}</div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">{config.name}</p>
              <p className="text-xs text-slate-500">For {config.audience.toLowerCase()}</p>
            </div>
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{config.headline}</h2>
          <p className="mt-4 text-slate-600">{config.pitch}</p>
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            {config.outcomes.map((o) => (
              <div key={o.title}>
                <dt className="flex items-center gap-2 font-bold text-slate-900">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" /> {o.title}
                </dt>
                <dd className="mt-1 pl-7 text-sm text-slate-600">{o.body}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryCta href={intakeHref(config.key)}>{config.cta}</PrimaryCta>
            <PriceLine price={config.price} cadence={config.cadence} />
          </div>
        </div>
        <div className={`min-w-0 ${flipped ? "lg:order-1" : ""}`}>
          <div className="mb-3 flex justify-end">
            <StatusBadge status={config.status} />
          </div>
          {BUYER_PREVIEWS[config.key as Exclude<ConfigKey, "marketplace">]}
        </div>
      </div>
    </section>
  );
}

export default function ZillowBusterPage() {
  const directoryConfigs = CONFIGURATIONS.filter((c) => c.key !== "marketplace");
  const marketplace = CONFIGURATIONS.find((c) => c.key === "marketplace")!;
  const anyPricingApproved = CONFIGURATIONS.some((c) => c.price);

  return (
    <main className="min-h-screen bg-white">
      {/* Receptionist pageContext, reusing widget.js's existing
          data-page-* mechanism (same as real-estate/property/[id]). */}
      <div data-page-type="sales" data-page-category="real-estate" data-page-business="Zillow Buster" className="hidden" />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2238] via-[#1e3a5f] to-[#0f2238] text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 ring-1 ring-white/15">
              <Sparkles className="h-3.5 w-3.5" /> Zillow Buster by South Suburbs Best
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Your listings. Your brand. <span className="text-amber-300">Your leads.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Keep the portals for reach. Zillow Buster gives agents, brokerages and home builders their own branded property
              directory, on their own domain, where showing requests go straight to them. A listing in the South Suburbs Best
              Real Estate Marketplace is included.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryCta>Get my directory</PrimaryCta>
              <Link
                href="#directories"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3.5 text-base font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20"
              >
                Compare directories
              </Link>
            </div>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">I&apos;m a…</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[...directoryConfigs, marketplace].map((c) => (
                  <Link
                    key={c.key}
                    href={`#${c.key}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white/90 ring-1 ring-white/15 transition hover:bg-white/15"
                  >
                    {c.key === "marketplace" ? "Real estate business" : c.shortName}
                    <ArrowDown className="h-3.5 w-3.5 text-amber-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="min-w-0">
            <DirectoryHomepagePreview />
            <p className="mt-3 text-center text-xs text-white/50">Illustration of a Solo Agent Directory with sample data</p>
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
      <section className="bg-slate-50 py-20">
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
                <CheckCircle2 className="h-5 w-5" /> With your own Zillow Buster directory
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
      <section className="py-20">
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
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Your Zillow Buster directory</p>
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

      {/* ============ CHOOSE YOUR DIRECTORY (overview) ============ */}
      <section id="directories" className="scroll-mt-24 bg-[#0f2238] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            light
            eyebrow="Choose your directory"
            title="One platform. Four ways to grow."
            body="Three independently branded directories, each built for a different kind of real estate business, plus the regional marketplace that connects them."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...directoryConfigs, marketplace].map((c) => (
              <Link
                key={c.key}
                href={`#${c.key}`}
                className={`group flex flex-col rounded-2xl p-6 ring-1 transition ${
                  c.key === "marketplace" ? "bg-amber-400 text-slate-900 ring-amber-300 hover:bg-amber-300" : "bg-white/5 ring-white/10 hover:bg-white/10"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    c.key === "marketplace" ? "bg-slate-900 text-amber-300" : "bg-amber-400 text-slate-900"
                  }`}
                >
                  {CONFIG_ICONS[c.key]}
                </div>
                <h3 className="mt-5 text-lg font-bold">{c.name}</h3>
                <p className={`mt-1 text-xs font-semibold uppercase tracking-wide ${c.key === "marketplace" ? "text-slate-700" : "text-white/50"}`}>
                  {c.key === "marketplace" ? "Regional discovery" : "Your brand · your domain"}
                </p>
                <p className={`mt-3 flex-1 text-sm ${c.key === "marketplace" ? "text-slate-800" : "text-white/75"}`}>{c.headline}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
                  See how it works <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PER-BUYER SECTIONS ============ */}
      <div className="mx-auto max-w-6xl px-4 pt-16">
        <PreviewLegend />
      </div>
      {directoryConfigs.map((c, i) => (
        <BuyerSection key={c.key} config={c} index={i} />
      ))}

      {/* ============ SSB MARKETPLACE ============ */}
      <section id="marketplace" className="scroll-mt-24 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="The SSB Real Estate Marketplace"
            title="Your own directory, plus a seat in the regional marketplace"
            body={marketplace.pitch}
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
              <h3 className="mt-3 font-bold text-slate-900">SSB Real Estate Marketplace</h3>
              <p className="mt-1 text-sm text-slate-600">Your profile on southsuburbsbest.com, where local buyers browse real estate professionals and properties.</p>
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
                Flossmoor, Frankfort and beyond. Real estate has its own dedicated directory on SSB, with listings and profiles for agents, brokerages, property managers, lenders, inspectors and other real estate professionals.
              </p>
              <div className="mt-6">
                <LiveDemoLink />
              </div>
            </div>
          </div>

          {/* What's included vs. what's an upgrade */}
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Included with every directory</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">Normal-rotation listing</h3>
              <p className="mt-2 text-sm text-slate-600">
                Solo Agent, Brokerage and Builder subscribers get a listing in the SSB Real Estate Marketplace, shown in normal
                rotation alongside other local real estate professionals.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1e3a5f]">Marketplace only</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">Join without a directory</h3>
              <p className="mt-2 text-sm text-slate-600">
                Property managers, investors and real estate service businesses can join the marketplace on its own.
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <PriceLine price={marketplace.price} cadence={marketplace.cadence} />
                <Link href={intakeHref("marketplace")} className="text-sm font-bold text-[#1e3a5f] hover:underline">
                  {marketplace.cta} →
                </Link>
              </div>
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
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">How a featured listing could stand out</p>
              <StatusBadge status="partial" />
            </div>
            <MarketplacePreview />
            <p className="mt-3 text-center text-xs text-slate-500">
              Agent cards match the live SSB Real Estate Directory. The featured badge is a concept; featured placement is not
              yet configured for real estate listings.
            </p>
          </div>
        </div>
      </section>

      {/* ============ ROI ============ */}
      <section className="bg-slate-50 py-20">
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
      <section className="bg-[#0f2238] py-20 text-white">
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

      {/* ============ AI EMPLOYEES (upsell) ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Add-ons · AI Employees"
            title="Respond faster. Follow up every time."
            body="Leads Grow Revenue, the company behind South Suburbs Best, offers AI Employees you can add to any directory. They're separate from your directory subscription. We'll confirm which fit your business during your walkthrough."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {AI_EMPLOYEES.map((u) => (
              <div key={u.name} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e3a5f] text-white">
                    <Bot className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">Add-on</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{u.name}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{u.body}</p>
                <div className="mt-4 flex items-center justify-between">
                  <PriceLine price={u.price} />
                  <Link href={`#get-started`} className="text-sm font-bold text-[#1e3a5f] hover:underline">
                    Ask about it →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="scroll-mt-24 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Pricing"
            title="Subscription pricing"
            body={
              anyPricingApproved
                ? "Choose the directory that fits your business. Add featured placement or AI Employees anytime."
                : "Launch pricing is being finalized. Request a walkthrough and we'll share pricing for your directory, along with any introductory offer available when you sign up."
            }
          />
          {LAUNCH_OFFER && (
            <div className="mx-auto mb-10 max-w-3xl rounded-2xl bg-amber-400 p-6 text-center text-slate-900 shadow-lg">
              <p className="text-lg font-bold">{LAUNCH_OFFER.headline}</p>
              <p className="mt-1 text-sm">{LAUNCH_OFFER.body}</p>
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...directoryConfigs, marketplace].map((c) => (
              <div key={c.key} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e3a5f] text-white">{CONFIG_ICONS[c.key]}</div>
                <h3 className="mt-4 font-bold text-slate-900">{c.name}</h3>
                <p className="text-xs text-slate-500">{c.key === "marketplace" ? "Marketplace participation" : "Branded directory subscription"}</p>
                <div className="mt-4">
                  <PriceLine price={c.price} cadence={c.cadence} />
                </div>
                {c.introOffer && <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">{c.introOffer}</p>}
                <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-600">
                  {c.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" /> {i}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <StatusBadge status={c.status} />
                </div>
                <Link
                  href={intakeHref(c.key)}
                 
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16304d]"
                >
                  {c.price ? "Get started" : "Get pricing"}
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Optional add-ons</p>
            <ul className="mt-3 divide-y divide-slate-100">
              {[{ name: FEATURED_PLACEMENT.name, price: FEATURED_PLACEMENT.price }, ...AI_EMPLOYEES].map((a) => (
                <li key={a.name} className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm font-semibold text-slate-800">{a.name}</span>
                  <PriceLine price={a.price} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-20">
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
      <section id="get-started" className="scroll-mt-24 bg-gradient-to-br from-[#0f2238] via-[#1e3a5f] to-[#0f2238] py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
          <div>
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
              <p className="mt-1 text-xs text-white/60">Or email {SALES_CONTACT.email}</p>
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
        Zillow is a registered trademark of Zillow, Inc. Zillow Buster, South Suburbs Best and Leads Grow Revenue are not
        affiliated with, endorsed by, or sponsored by Zillow, Inc. Zillow Buster directories do not include Zillow
        listings or data. Product screens shown are illustrations with sample data.
      </p>
    </main>
  );
}
