// ZILLOW-BUSTER-SALES-LANDING-001 - the Zillow Buster sales landing
// page. A pure, static sales surface inside the existing SSB app (same
// root layout, Navbar, Footer and Receptionist widget); it adds no
// backend route and reads no production data. Founder-editable facts
// (pricing, offers, FAQ copy) live in ./content.ts. Readiness, gaps and
// founder decisions: docs/zillow-buster/LAUNCH_READINESS.md.

export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  ClipboardList,
  Globe,
  Hammer,
  Home,
  Inbox,
  Megaphone,
  Palette,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  User,
  Users,
} from "lucide-react";
import { AI_UPGRADES, CONFIGURATIONS, FAQ, SALES_CONTACT, type ConfigKey } from "./content";
import { DirectoryHomepagePreview, LiveDemoLink, ProductShowcase, StatusBadge } from "./ProductPreviews";
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

const PROBLEMS = [
  {
    title: "Your listings live on someone else's site",
    body: "When buyers find your homes on a third-party portal, they see the portal's brand, its layout and its other options next to yours.",
  },
  {
    title: "It's hard to stand out",
    body: "On a crowded portal, one agent's profile looks a lot like the next one. Your brand and local expertise get flattened.",
  },
  {
    title: "Inquiries slip through the cracks",
    body: "Questions arrive after hours, across too many inboxes and apps. Every slow reply is a buyer who may move on.",
  },
  {
    title: "You're renting, not building",
    body: "Without a property site of your own, the audience you attract builds someone else's platform instead of yours.",
  },
];

const SOLUTION_POINTS = [
  { icon: <Palette className="h-5 w-5" />, title: "Your brand front and center", body: "Your name, logo, colors and voice on every page." },
  { icon: <Globe className="h-5 w-5" />, title: "On your own domain", body: "A real web address you own and can put on every sign and card." },
  { icon: <Home className="h-5 w-5" />, title: "Your listings, beautifully presented", body: "Search, photo galleries and detail pages built for buyers." },
  { icon: <Inbox className="h-5 w-5" />, title: "Leads come to you", body: "Showing requests and questions go to the listing agent." },
  { icon: <Megaphone className="h-5 w-5" />, title: "Regional exposure included", body: "Listed in the SSB Real Estate Marketplace in normal rotation." },
  { icon: <Bot className="h-5 w-5" />, title: "AI that never sleeps", body: "Add an AI Receptionist to answer and capture every inquiry." },
];

const COMPARISON = [
  { label: "Brand buyers see", portal: "The portal's", ours: "Yours" },
  { label: "Web address", portal: "The portal's", ours: "Your own domain" },
  { label: "Where your listing's inquiries go", portal: "Set by the portal's rules", ours: "To your listing agent" },
  { label: "Who builds the audience", portal: "The portal", ours: "You" },
  { label: "Regional South Suburbs marketplace", portal: "—", ours: "Included, normal rotation" },
  { label: "AI Receptionist and follow-up", portal: "—", ours: "Optional upgrade" },
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

export default function ZillowBusterPage() {
  const directoryConfigs = CONFIGURATIONS.filter((c) => c.key !== "marketplace");
  const marketplace = CONFIGURATIONS.find((c) => c.key === "marketplace")!;
  const anyPricingApproved = CONFIGURATIONS.some((c) => c.price);

  return (
    <main className="min-h-screen bg-white">
      {/* Receptionist pageContext, reusing widget.js's existing
          data-page-* mechanism (same as real-estate/property/[id]). */}
      <div data-page-type="sales" data-page-category="real-estate" data-page-business="Zillow Buster" className="hidden" />

      {/* ============ A. HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2238] via-[#1e3a5f] to-[#0f2238] text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 ring-1 ring-white/15">
              <Sparkles className="h-3.5 w-3.5" /> Zillow Buster by South Suburbs Best
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Your listings. Your brand. <span className="text-amber-300">Your leads.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              We build real estate agents, brokerages and home builders their own branded property directory, on their own
              domain, where showing requests go straight to them. Plus a listing in the South Suburbs Best Real Estate
              Marketplace.
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
            <ul className="mt-8 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
              {["Independently branded", "Your own domain", "Showing requests built in", "SSB Marketplace listing included"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <DirectoryHomepagePreview />
            <p className="mt-3 text-center text-xs text-white/50">Product preview with sample data</p>
          </div>
        </div>
      </section>

      {/* ============ B. THE PROBLEM ============ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="The problem"
            title="You do the work. Someone else owns the storefront."
            body="Portals are a useful part of the mix, but if they're your only digital presence, your brand, your audience and your inquiries all depend on someone else's platform."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ C. THE SOLUTION ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="The Zillow Buster solution"
            title="A property directory that's yours from the domain up"
            body="Zillow Buster gives you a professionally built, independently branded directory to showcase your listings and capture inquiries, running alongside the portals you already use."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTION_POINTS.map((s) => (
              <div key={s.title} className="flex gap-4 rounded-2xl p-5 ring-1 ring-slate-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1e3a5f] text-white">{s.icon}</div>
                <div>
                  <h3 className="font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold sm:px-6"> </th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Portal profile alone</th>
                  <th className="bg-[#1e3a5f] px-4 py-3 font-semibold text-white sm:px-6">Your Zillow Buster directory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON.map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-3 font-semibold text-slate-800 sm:px-6">{row.label}</td>
                    <td className="px-4 py-3 text-slate-500 sm:px-6">{row.portal}</td>
                    <td className="bg-[#1e3a5f]/5 px-4 py-3 font-semibold text-[#1e3a5f] sm:px-6">{row.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ D. CHOOSE YOUR DIRECTORY ============ */}
      <section id="directories" className="scroll-mt-24 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Choose your directory"
            title="Four ways to grow with Zillow Buster"
            body="Three independently branded directories, each built for a different kind of real estate business, plus the regional marketplace that connects them."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {directoryConfigs.map((c) => (
              <article key={c.key} className="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e3a5f] text-white">{CONFIG_ICONS[c.key]}</div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{c.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{c.audience}</p>
                <p className="mt-3 text-sm text-slate-600">{c.pitch}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-700">
                  {c.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {i}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`#get-started`}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#1e3a5f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16304d]"
                >
                  {c.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <article className="mt-6 flex flex-col gap-6 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100 md:flex-row md:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-900">{CONFIG_ICONS.marketplace}</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900">{marketplace.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{marketplace.audience}</p>
              <p className="mt-2 text-sm text-slate-600">{marketplace.pitch}</p>
            </div>
            <Link
              href="#get-started"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-300"
            >
              {marketplace.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </div>
      </section>

      {/* ============ E. SHOW THE PRODUCT ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="See the product"
            title="Built on the directory already running South Suburbs Best"
            body="Zillow Buster directories are manufactured from the same platform that powers the South Suburbs Best Real Estate Directory: real property search, listing pages and showing requests. Previews below use sample data."
          />
          <ProductShowcase />
          <div className="mt-12 text-center">
            <LiveDemoLink />
          </div>
        </div>
      </section>

      {/* ============ F. HOW IT WORKS ============ */}
      <section className="bg-[#0f2238] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            light
            eyebrow="How it works"
            title="From sign-up to launch, done for you"
            body="You bring your brand and your listings. We handle the build."
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-slate-900">{i + 1}</div>
                <div>
                  <h3 className="flex items-center gap-2 font-bold">
                    {s.title}
                  </h3>
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

      {/* ============ G. SSB MARKETPLACE ADVANTAGE ============ */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">The marketplace advantage</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Your own directory, plus a seat in the regional marketplace
            </h2>
            <p className="mt-4 text-slate-600">
              South Suburbs Best is the local directory for Chicago&apos;s South Suburbs, from Orland Park and Tinley Park to
              Homewood, Flossmoor and Frankfort. Every Solo Agent, Brokerage and Builder subscription includes a listing in
              the SSB Real Estate Marketplace, so local buyers can find you there as well as on your own domain.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/real-estate" className="text-sm font-semibold text-[#1e3a5f] underline-offset-2 hover:underline">
                Visit the SSB Real Estate Directory →
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Included</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">Normal-rotation listing</h3>
              <p className="mt-2 text-sm text-slate-600">
                Your business appears in the SSB Real Estate Marketplace alongside other local real estate professionals.
              </p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Optional upgrade</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">Featured placement</h3>
              <p className="mt-2 text-sm text-slate-600">
                Want to stand out? Featured and promoted positions are available as a separate upgrade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ H. AI-POWERED GROWTH UPGRADES ============ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Growth upgrades"
            title="Add AI Employees when you're ready"
            body="Leads Grow Revenue, the company behind South Suburbs Best, offers AI Employees that help real estate professionals respond faster and follow up consistently. We'll confirm which upgrades fit your directory during your walkthrough."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AI_UPGRADES.map((u) => (
              <div key={u.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  {u.name.startsWith("Featured") ? <Megaphone className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{u.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ I. PRICING ============ */}
      <section id="pricing" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Pricing"
            title="Subscription pricing"
            body={
              anyPricingApproved
                ? "Choose the directory that fits your business. Upgrade or add AI Employees anytime."
                : "Launch pricing is being finalized. Request a walkthrough and we'll share pricing for your directory, along with any introductory offers available when you sign up."
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONFIGURATIONS.map((c) => (
              <div key={c.key} className="flex flex-col rounded-2xl p-6 ring-1 ring-slate-200">
                <h3 className="font-bold text-slate-900">{c.name}</h3>
                {c.price ? (
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {c.price}
                    {c.cadence && <span className="text-sm font-medium text-slate-500"> {c.cadence}</span>}
                  </p>
                ) : (
                  <p className="mt-3 text-lg font-semibold text-slate-500">Pricing at launch</p>
                )}
                {c.introOffer && <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">{c.introOffer}</p>}
                <div className="mt-3">
                  <StatusBadge status={c.status} />
                </div>
                <div className="flex-1" />
                <Link
                  href="#get-started"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-[#1e3a5f] transition hover:bg-slate-200"
                >
                  {c.price ? "Get started" : "Get pricing"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ J. FAQ ============ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 open:ring-slate-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                  {f.q}
                  <span className="text-xl leading-none text-slate-400 transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ K. FINAL CONVERSION ============ */}
      <section id="get-started" className="scroll-mt-24 bg-gradient-to-br from-[#0f2238] via-[#1e3a5f] to-[#0f2238] py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Get started</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Stop renting your online presence. Start owning it.</h2>
            <p className="mt-4 text-white/80">
              Tell us about your business and which directory fits. We&apos;ll walk you through your directory, confirm
              pricing, and map out your launch.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/85">
              {[
                "A walkthrough built around your business",
                "Pricing for the directory you choose",
                "A launch plan for your domain and listings",
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
          </div>
          <DirectoryIntakeForm />
        </div>
      </section>

      <p className="mx-auto max-w-4xl px-4 py-8 text-center text-xs text-slate-400">
        Zillow is a registered trademark of Zillow, Inc. Zillow Buster, South Suburbs Best and Leads Grow Revenue are not
        affiliated with, endorsed by, or sponsored by Zillow, Inc. Zillow Buster directories do not include Zillow
        listings or data.
      </p>
    </main>
  );
}
