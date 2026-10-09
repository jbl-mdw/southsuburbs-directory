// ZILLOW-BUSTER-SALES-LANDING-001 - every founder-editable sales fact
// for /zillow-buster lives here, so pricing, offers and copy can be
// approved and changed without touching layout code.
//
// Rules this file follows (see docs/zillow-buster/LAUNCH_READINESS.md):
// - No price, intro offer, bonus or deadline is shown unless a founder
//   has approved it. `price: null` renders a "pricing at launch" state.
// - Every product preview carries an honest status label.
// - Nothing here claims Zillow inventory, affiliation or replacement, or
//   makes factual claims about how any portal routes leads.

export type ConfigKey = "marketplace" | "solo-agent" | "brokerage" | "builder";

// What a preview depicts, relative to certified functionality:
// - live:    the depicted feature runs on southsuburbsbest.com/real-estate
//            today. Not yet certified on a customer-owned domain.
// - partial: assembled from live components; parts are configured per
//            customer or still being completed.
// - concept: illustrates a planned capability that is not built yet.
export type PreviewStatus = "live" | "partial" | "concept";

export const PREVIEW_STATUS_LABEL: Record<PreviewStatus, string> = {
  live: "Live on SSB today",
  partial: "Built from live components",
  concept: "Concept · not yet built",
};

export const PREVIEW_STATUS_DETAIL: Record<PreviewStatus, string> = {
  live: "This feature runs on the South Suburbs Best Real Estate Directory right now.",
  partial: "Assembled from components running on SSB today; some parts are set up per customer.",
  concept: "Shows a planned capability. It is not built yet.",
};

export type Configuration = {
  key: ConfigKey;
  name: string;
  shortName: string;
  audience: string;
  headline: string;
  pitch: string;
  outcomes: { title: string; body: string }[];
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
    shortName: "Solo Agent",
    audience: "Independent real estate agents",
    headline: "Be the agent buyers find by name.",
    pitch:
      "When a buyer sees your sign or your listing and searches your name, they land on a property site that is 100% you: your homes, your story, your contact button. No other agents competing for the same buyer on your page.",
    outcomes: [
      { title: "A site that sells you", body: "Your brand, bio, service areas and every listing in one place." },
      { title: "Showing requests on every listing", body: "Buyers ask for a showing right from the listing, and the request goes to you." },
      { title: "A web address for every sign", body: "Put your own domain on yard signs, cards and social profiles." },
      { title: "Local exposure included", body: "Your profile appears in the SSB Real Estate Marketplace too." },
    ],
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
    shortName: "Brokerage",
    audience: "Brokerages and real estate teams",
    headline: "Every agent. Every listing. One brand.",
    pitch:
      "Give your office a single branded home for every agent and every property. Buyers browse your entire inventory, each listing points to its listing agent, and inquiries reach the right person on your team.",
    outcomes: [
      { title: "Your whole inventory, your brand", body: "One searchable directory for every listing your office carries." },
      { title: "Agent profiles that recruit", body: "Each agent gets a professional profile, a showcase for talent you want to attract." },
      { title: "Inquiries to the right agent", body: "Listings are linked to their listing agent, so requests don't sit in a shared inbox." },
      { title: "Regional presence", body: "Your brokerage appears in the SSB Real Estate Marketplace." },
    ],
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
    shortName: "Builder / Developer",
    audience: "Home builders and developers",
    headline: "Sell the community, not just the lot.",
    pitch:
      "New-construction buyers shop by community, floor plan and move-in date. A builder directory organizes all three under your brand and turns interest into tour requests for your sales team.",
    outcomes: [
      { title: "Every community showcased", body: "Each development gets its own page with photos and neighborhood details." },
      { title: "Floor plans and availability", body: "Show which plans are available and which homes are ready." },
      { title: "Tour requests, not just views", body: "Interested buyers request a tour directly from the community page." },
      { title: "Regional presence", body: "Your communities appear in the SSB Real Estate Marketplace." },
    ],
    includes: [
      "Builder-branded directory on your domain",
      "Community and development showcases",
      "Available homes and floor plans",
      "Neighborhood and community information",
      "Tour and availability requests",
      "SSB Real Estate Marketplace listing in normal rotation",
    ],
    cta: "Reserve a builder walkthrough",
    price: null,
    cadence: null,
    introOffer: null,
    status: "concept",
  },
  {
    key: "marketplace",
    name: "SSB Real Estate Marketplace",
    shortName: "Marketplace",
    audience: "Agents, brokerages, builders, property managers, investors and real estate service businesses",
    headline: "Be found where the South Suburbs search locally.",
    pitch:
      "South Suburbs Best is the regional directory for Chicago's South Suburbs. The Real Estate Marketplace is where local buyers, sellers and renters discover real estate professionals and properties, and where your business can be found too.",
    outcomes: [],
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

// Upsells kept distinct from the directory subscriptions. Founder
// pricing only; null = "pricing at launch".
export const FEATURED_PLACEMENT = {
  name: "Featured Marketplace Placement",
  body: "Move beyond normal rotation. Featured and promoted positions put your business and listings in front of more local buyers in the SSB Real Estate Marketplace.",
  points: ["Priority position in marketplace results", "Featured badge on your profile", "Promoted listings in regional discovery"],
  price: null as string | null,
};

export const AI_EMPLOYEES = [
  {
    name: "AI Receptionist",
    body: "Answers buyer and seller questions day and night and captures their contact details, so an after-hours inquiry doesn't go unanswered.",
    price: null as string | null,
  },
  {
    name: "AI Prospector",
    body: "Helps you identify and reach new sellers, buyers and referral partners in your market.",
    price: null as string | null,
  },
  {
    name: "AI Executive Assistant",
    body: "Takes routine follow-up, scheduling coordination and admin off your plate so you can stay in front of clients.",
    price: null as string | null,
  },
];

// Founder-approved launch offer (e.g. founding-member pricing). null =
// nothing is shown. Never add a deadline or quantity limit that isn't real.
export const LAUNCH_OFFER: { headline: string; body: string } | null = null;

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Why would I want my own directory if I already list on Zillow?",
    a: "Portals are great for reach: they put your listings in front of a lot of browsers. Your own directory is for capture: when a buyer is ready and looks you up by name, they land on a site where you are the only agent and every request comes to you. The two work best together.",
  },
  {
    q: "Is this a replacement for Zillow?",
    a: "No. Zillow Buster doesn't replace any portal and doesn't include portal listings. It's an independent marketing and lead channel under your own brand, and it works alongside everything you already use. Keep using the portals for reach.",
  },
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
    a: "Leads Grow Revenue owns and operates the platform that powers your directory. You control your brand, your domain and your content; your subscription covers use of the platform, hosting and updates.",
  },
  {
    q: "How are leads captured?",
    a: "Every listing has a showing-request and question form. Each request is sent to that listing's agent (or to the directory owner) for follow-up. Add the AI Receptionist to answer questions and capture details around the clock.",
  },
  {
    q: "What is included in my SSB Marketplace listing?",
    a: "Every Solo Agent, Brokerage and Builder subscription includes a listing in the South Suburbs Best Real Estate Marketplace in normal rotation, alongside other local real estate professionals. Featured placement is a separate, optional upgrade.",
  },
  {
    q: "Do I need technical skills?",
    a: "No. Zillow Buster is done for you. You provide your information, branding and listings; we build, verify and launch your directory.",
  },
  {
    q: "My broker already handles my marketing. Do I still need this?",
    a: "A brokerage site promotes the brokerage. A Solo Agent Directory promotes you, and it goes with you. If you run a brokerage, the Brokerage Directory gives every one of your agents a profile under your brand.",
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
    a: "That's what the Builder / Developer configuration is designed for: multiple communities, available homes and floor plans. It's in our launch pipeline now. Book a walkthrough and we'll confirm what your communities need before you commit.",
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
