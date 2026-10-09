// ZILLOW-BUSTER-SALES-LANDING-001 - every founder-editable sales fact
// for /zillow-buster lives here, so pricing, offers and copy can be
// approved and changed without touching layout code.
//
// Rules this file follows (see docs/zillow-buster/LAUNCH_READINESS.md):
// - No price, intro offer, bonus or deadline is shown unless a founder
//   has approved it. `price: null` renders a "pricing at launch" state.
// - Every product preview carries an honest status label.
// - Nothing here claims Zillow inventory, affiliation or replacement.

export type ConfigKey = "marketplace" | "solo-agent" | "brokerage" | "builder";

export type PreviewStatus = "live" | "partial" | "concept";

export const PREVIEW_STATUS_LABEL: Record<PreviewStatus, string> = {
  live: "Live on South Suburbs Best today",
  partial: "Built on live components · configured per customer",
  concept: "Concept preview · in launch pipeline",
};

export type Configuration = {
  key: ConfigKey;
  name: string;
  audience: string;
  pitch: string;
  includes: string[];
  cta: string;
  // Founder-approved pricing only. null = not yet approved.
  price: string | null;
  cadence: string | null;
  introOffer: string | null;
  status: PreviewStatus;
};

export const CONFIGURATIONS: Configuration[] = [
  {
    key: "solo-agent",
    name: "Solo Agent Directory",
    audience: "Independent real estate agents",
    pitch:
      "Your own branded property directory on your own domain. Your listings, your profile, your service areas, and showing requests that come straight to you.",
    includes: [
      "Branded directory on a domain you own",
      "Property listings with photo galleries",
      "Search by city, price, beds, baths and type",
      "Showing-request and question forms on every listing",
      "Agent profile and service-area pages",
      "SSB Real Estate Marketplace listing in normal rotation",
    ],
    cta: "Build my agent directory",
    price: null,
    cadence: null,
    introOffer: null,
    status: "partial",
  },
  {
    key: "brokerage",
    name: "Brokerage Directory",
    audience: "Brokerages and real estate teams",
    pitch:
      "One branded directory for your whole office. Every agent gets a profile, every listing is linked to its listing agent, and inquiries go to the right person.",
    includes: [
      "Brokerage-branded directory on your domain",
      "Multiple agent profiles",
      "Listings linked to the listing agent",
      "Brokerage-wide property search",
      "Showing and consultation requests routed per listing",
      "SSB Real Estate Marketplace listing in normal rotation",
    ],
    cta: "Build my brokerage directory",
    price: null,
    cadence: null,
    introOffer: null,
    status: "partial",
  },
  {
    key: "builder",
    name: "Builder / Developer Directory",
    audience: "Home builders and developers",
    pitch:
      "Showcase your communities, available homes and floor plans in a directory built around how new-construction buyers shop, with tour requests captured for your sales team.",
    includes: [
      "Builder-branded directory on your domain",
      "Community and development showcases",
      "Available homes and floor plans",
      "Neighborhood and community information",
      "Tour and availability requests",
      "SSB Real Estate Marketplace listing in normal rotation",
    ],
    cta: "Plan my builder directory",
    price: null,
    cadence: null,
    introOffer: null,
    status: "concept",
  },
  {
    key: "marketplace",
    name: "SSB Real Estate Marketplace",
    audience: "Agents, brokerages, builders, property managers, investors and real estate service businesses",
    pitch:
      "Get discovered on South Suburbs Best, the regional directory for Chicago's South Suburbs. Join the marketplace on its own, or upgrade to featured placement.",
    includes: [
      "Business profile in the SSB Real Estate Marketplace",
      "Inclusion in the real estate professional directory",
      "Property listings in regional discovery",
      "Optional featured and promoted placement",
      "Optional AI Employee upgrades",
    ],
    cta: "Join the marketplace",
    price: null,
    cadence: null,
    introOffer: null,
    status: "live",
  },
];

export const AI_UPGRADES = [
  {
    name: "AI Receptionist",
    body: "Answers buyer and seller questions around the clock and captures their contact details so no inquiry sits unanswered.",
  },
  {
    name: "AI Prospector",
    body: "Helps you find and reach new sellers, buyers and referral partners in your market.",
  },
  {
    name: "AI Executive Assistant",
    body: "Takes routine follow-up, scheduling coordination and admin off your plate.",
  },
  {
    name: "Featured Marketplace Placement",
    body: "Move beyond normal rotation with featured and promoted positions in the SSB Real Estate Marketplace.",
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Can I use my own domain?",
    a: "Yes. Your directory is designed to run on a domain you own. You choose and register the domain; we connect it during setup.",
  },
  {
    q: "Is the directory independently branded?",
    a: "Yes. Buyers and sellers see your name, logo, colors and contact details. South Suburbs Best and Leads Grow Revenue run quietly in the background.",
  },
  {
    q: "Who owns the underlying platform?",
    a: "Leads Grow Revenue owns and operates the platform that powers your directory. You control your brand, your domain and your content; your subscription gives you use of the platform, hosting and updates.",
  },
  {
    q: "Is this a replacement for Zillow?",
    a: "No. Zillow Buster doesn't replace any portal and doesn't include their listings. It's an independent marketing and lead channel you own the brand of, and it works alongside everything you already use.",
  },
  {
    q: "How are leads captured?",
    a: "Every listing has a showing-request and question form. Each request is sent to that listing's agent (or to the directory owner) for follow-up. Add the AI Receptionist to answer questions and capture details around the clock.",
  },
  {
    q: "What is included in my SSB Marketplace listing?",
    a: "Every Solo Agent, Brokerage and Builder subscription includes a listing in the South Suburbs Best Real Estate Marketplace in normal rotation. Featured placement is a separate, optional upgrade.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. You can add featured marketplace placement or AI Employees at any time.",
  },
  {
    q: "Can a brokerage manage multiple agents?",
    a: "Yes. Brokerage directories present multiple agent profiles and link each listing to its listing agent so inquiries reach the right person. Routing for your team is set up with you during onboarding.",
  },
  {
    q: "Can a builder showcase multiple developments?",
    a: "That's what the Builder / Developer configuration is designed for: multiple communities, available homes and floor plans. Book a walkthrough and we'll confirm what your communities need before you commit.",
  },
  {
    q: "What happens after I sign up?",
    a: "You share your business information, branding and listings. We configure and build your directory, verify it with you, connect your domain and launch. Our build target is 48 hours from complete onboarding information; we confirm your launch date once your directory passes verification.",
  },
];

// Public contact points already published on /contact - reused, never
// a second source of truth.
export const SALES_CONTACT = {
  email: "leadsgrowrevenue@gmail.com",
  phone: "(708) 285-0679",
  phoneHref: "tel:+17082850679",
};
