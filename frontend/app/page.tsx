export const dynamic = "force-dynamic";
export const revalidate = 0;



import Image from "next/image";
import Link from "next/link";

// Opacity + base styling for the blue category pills under the search bar
const CATEGORY_PILL_OPACITY = "bg-blue-600/50"; // tweak this (e.g. /40, /60) to adjust transparency
const CATEGORY_PILL_BASE =
  "inline-flex items-center gap-2 rounded-3xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 backdrop-blur-md border border-blue-300/40 transition hover:bg-blue-600/80";

// Static city data for the "South Suburbs Cities" grid
const southSuburbCities = [
  {
    slug: "orland-park",
    name: "Orland Park",
    image: "/cities/orland-park.jpg",
  },
  {
    slug: "flossmoor",
    name: "Flossmoor",
    image: "/cities/flossmoor.jpg",
  },
  {
    slug: "homewood",
    name: "Homewood",
    image: "/cities/homewood.jpg",
  },
  {
    slug: "glenwood",
    name: "Glenwood",
    image: "/cities/glenwood.jpg",
  },
  {
    slug: "tinley-park",
    name: "Tinley Park",
    image: "/cities/tinley-park.jpg",
  },
  {
    slug: "frankfort",
    name: "Frankfort",
    image: "/cities/frankfort.jpg",
  },
];

const newsPosts = [
  {
    title: "5 Weekend Ideas in the South Suburbs",
    category: "Lifestyle",
    date: "January 12, 2025",
    image: "/news/weekend.jpg",
  },
  {
    title: "How to Choose a Trusted Home Service Pro",
    category: "Home Services",
    date: "January 8, 2025",
    image: "/news/home-services.jpg",
  },
  {
    title: "Support Local: 7 Must-Try Restaurants",
    category: "Food & Drink",
    date: "January 3, 2025",
    image: "/news/restaurants.jpg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO + SEARCH */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        {/* background gradient + image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/88 to-slate-950/96" />
          <Image
            src="/hero.png"
            alt="South Suburbs Best hero"
            fill
            priority
            className="object-cover opacity-35"
          />
        </div>

        <div className="relative mx-auto flex min-h-[520px] max-w-5xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-[3.2rem]">
            Explore Your City
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium uppercase tracking-[0.25em] text-slate-300">
            Let&apos;s uncover the best local places to eat, drink, and shop in
            Chicago&apos;s Southland.
          </p>

          {/* WHAT / WHERE SEARCH BAR */}
          <div className="mt-7 w-full max-w-4xl rounded-full bg-white/95 p-2 shadow-2xl shadow-slate-950/60 backdrop-blur">
            <form
              className="flex flex-col gap-2 md:flex-row md:items-center"
              action="/explore"
              method="GET"
            >
              {/* WHAT */}
              <div className="flex-1 rounded-full bg-white px-4 py-3 text-sm">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  What
                </label>
                <div className="flex items-center gap-2 text-slate-800">
                  <input
                    name="q"
                    type="text"
                    placeholder="Ex: food, service, barber, hotel"
                    className="w-full border-0 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* WHERE */}
              <div className="flex-1 rounded-full bg-white px-4 py-3 text-sm border-y md:border-y-0 md:border-x border-slate-100">
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Where
                </label>
                <div className="flex items-center gap-2 text-slate-800">
                  <span className="text-xs text-slate-400">📍</span>
                  <input
                    name="city"
                    type="text"
                    placeholder="Your City..."
                    className="w-full border-0 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* SEARCH BUTTON */}
              <div className="flex justify-center px-1 py-1">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/50 transition hover:bg-blue-700 md:w-auto"
                >
                  🔍 Search
                </button>
              </div>
            </form>
          </div>

          <p className="mt-2 text-[11px] text-slate-300">
            Coming soon: live South Suburbs search by category, neighborhood,
            and city.
          </p>

          {/* QUICK CATEGORY LINKS */}
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:gap-4">
            {/* HOME SERVICES (dropdown) */}
            <div className="relative group">
              <Link
                href="/category/home-services"
                className={`${CATEGORY_PILL_BASE} ${CATEGORY_PILL_OPACITY} flex items-center`}
              >
                🏠 Home Services
                <span className="text-xs opacity-80">▼</span>
              </Link>

              <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden min-w-[190px] flex-col rounded-xl bg-white/95 text-left text-sm text-slate-800 shadow-xl shadow-slate-950/30 ring-1 ring-slate-200 group-hover:flex group-hover:pointer-events-auto">
                <Link
                  href="/category/hvac"
                  className="px-4 py-2 hover:bg-slate-100"
                >
                  HVAC
                </Link>
                <Link
                  href="/category/plumbing"
                  className="px-4 py-2 hover:bg-slate-100"
                >
                  Plumbing
                </Link>
                <Link
                  href="/category/roofing"
                  className="px-4 py-2 hover:bg-slate-100"
                >
                  Roofing
                </Link>
                <Link
                  href="/category/electrical"
                  className="px-4 py-2 hover:bg-slate-100"
                >
                  Electrical
                </Link>
              </div>
            </div>

            {/* RESTAURANTS */}
            <Link
              href="/category/restaurants"
              className={`${CATEGORY_PILL_BASE} ${CATEGORY_PILL_OPACITY}`}
            >
              🍽️ Restaurants
            </Link>

            {/* AUTOMOTIVE */}
            <Link
              href="/category/automotive"
              className={`${CATEGORY_PILL_BASE} ${CATEGORY_PILL_OPACITY}`}
            >
              🚗 Automotive
            </Link>

            {/* REAL ESTATE */}
            <Link
              href="/category/real-estate"
              className={`${CATEGORY_PILL_BASE} ${CATEGORY_PILL_OPACITY}`}
            >
              🏢 Real Estate
            </Link>
          </div>
        </div>
      </section>
      {/* SOUTH SUBURBS CITIES GRID */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              South Suburbs Cities
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Cities you&apos;ll explore first in the Chicago Southland.
            </p>
          </div>
          <div className="hidden md:grid gap-3 grid-cols-[1fr_1fr_1.6fr] grid-rows-[220px_220px]">
            {/* LEFT - tall (2 rows) */}
            <Link
              href={`/city/${southSuburbCities[0].slug}`}
              className="relative overflow-hidden rounded-2xl row-span-2"
            >
              <Image
                src={southSuburbCities[0].image}
                alt={southSuburbCities[0].name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/10" />
              <span className="absolute left-4 bottom-4 text-lg font-semibold text-white drop-shadow">
                {southSuburbCities[0].name}
              </span>
            </Link>
            
            {/* MIDDLE - top */}
            <Link
              href={`/city/${southSuburbCities[1].slug}`}
              className="relative overflow-hidden rounded-2xl"
            >
              <Image
                src={southSuburbCities[1].image}
                alt={southSuburbCities[1].name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/5" />
              <span className="absolute left-4 bottom-4 text-base font-semibold text-white drop-shadow">
                {southSuburbCities[1].name}
              </span>
            </Link>

            {/* RIGHT - top wide */}
            <Link
              href={`/city/${southSuburbCities[2].slug}`}
              className="relative overflow-hidden rounded-2xl"
            >
              <Image
                src={southSuburbCities[2].image}
                alt={southSuburbCities[2].name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/5" />
              <span className="absolute left-4 bottom-4 text-base font-semibold text-white drop-shadow">
                {southSuburbCities[2].name}
              </span>
            </Link>

            {/* MIDDLE - bottom */}
            <Link
              href={`/city/${southSuburbCities[3].slug}`}
              className="relative overflow-hidden rounded-2xl"
            >
              <Image
                src={southSuburbCities[3].image}
                alt={southSuburbCities[3].name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/5" />
              <span className="absolute left-4 bottom-4 text-base font-semibold text-white drop-shadow">
                {southSuburbCities[3].name}
              </span>
            </Link>

            {/* RIGHT - bottom (2 side-by-side) */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href={`/city/${southSuburbCities[4].slug}`}
                className="relative overflow-hidden rounded-2xl"
              >
                <Image
                  src={southSuburbCities[4].image}
                  alt={southSuburbCities[4].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/5" />
                <span className="absolute left-4 bottom-4 text-base font-semibold text-white drop-shadow">
                  {southSuburbCities[4].name}
                </span>
              </Link>
              <Link
                href={`/city/${southSuburbCities[5].slug}`}
                className="relative overflow-hidden rounded-2xl"
              >
                <Image
                  src={southSuburbCities[5].image}
                  alt={southSuburbCities[5].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/5" />
                <span className="absolute left-4 bottom-4 text-base font-semibold text-white drop-shadow">
                  {southSuburbCities[5].name}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* HOW IT WORKS / CLAIM & GET STARTED */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200">
            <Image
              src="/how-it-works.png"
              alt="South Suburbs Best directory preview"
              width={900}
              height={520}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight">
              Claim &amp; Get Started Today!
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Nearly 80% of consumers turn to local directories and reviews to
              find a business. South Suburbs Best makes it simple for your
              business to show up where neighbors are already looking.
            </p>

            <div className="mt-6 space-y-5">
              <div className="flex gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Claimed</h3>
                  <p className="text-sm text-slate-500">
                    Claim your listing so you can update hours, photos, offers,
                    and service areas in minutes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Promote</h3>
                  <p className="text-sm text-slate-500">
                    Promote your business with featured placement, special
                    deals, and seasonal campaigns tailored to the South Suburbs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Convert</h3>
                  <p className="text-sm text-slate-500">
                    Turn searchers into customers with reviews, coupons, and
                    easy ways to call, book, or request a quote.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/listings"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/40 transition hover:bg-blue-700"
              >
                Get Started
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Claim Your Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PEOPLE TALKING ABOUT US */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl bg-slate-900/5 shadow-lg shadow-slate-200">
            <Image
              src="/testimonials/video-thumb.jpg"
              alt="Business owners using South Suburbs Best"
              width={880}
              height={500}
              className="h-full w-full object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-blue-600 shadow-lg shadow-slate-950/30">
                ▶
              </span>
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight">
              People talking about us
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Hear from local owners who use South Suburbs Best to stay visible,
              stay booked, and stay top of mind in their neighborhoods.
            </p>

            <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200">
              <p className="text-sm text-slate-600">
                “We were looking for a way to reach more families close to home.
                Once we claimed our South Suburbs Best listing, calls and
                website visits jumped. It feels like a hub for the whole
                community, not just another ads platform.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                  <Image
                    src="/testimonials/person.jpg"
                    alt="Owner"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Richard Jones
                  </div>
                  <div className="text-xs text-slate-500">
                    Local Restaurant Owner, Homewood, IL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS & TIPS */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              News &amp; Tips
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Checkout the latest stories and ideas from our South Suburbs blog.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {newsPosts.map((post) => (
              <article
                key={post.title}
                className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-100"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">
                    {post.title}
                  </h3>
                  <div className="mt-4 text-[12px] text-blue-600">
                    Read more →
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-slate-950 py-16 text-white">
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="Local business collage"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/90" />
        </div>

        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-4 text-left md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Are you a local business in the South Suburbs?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-200">
              Join a growing community of trusted local businesses. Claim your
              listing, showcase your best offers, and let South Suburbs Best do
              the heavy lifting.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/50 transition hover:bg-blue-700"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-400/70 bg-transparent px-7 py-3 text-sm font-semibold text-slate-100 hover:bg-white/5"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
