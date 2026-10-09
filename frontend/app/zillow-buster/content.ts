// Real estate directory sales page - every founder-editable sales fact
// lives here, so pricing, offers and copy can be approved and changed
// without touching layout code.
//
// Founder rules (see docs/zillow-buster/LAUNCH_READINESS.md):
// - South Suburbs Best is the only customer-facing brand. No product
//   brand, and no Leads Grow Revenue mention in page copy (the shared
//   site footer carries the "Powered by" attribution).
// - Three directory subscriptions only. The SSB Real Estate Marketplace
//   is owned and operated by South Suburbs Best and is an included
//   benefit, never a fourth product. Featured placement is the one
//   optional paid upgrade on this page.
// - No price or offer is shown unless a founder approved it.
//   `price: null` renders a "request pricing" state.
// - No development-status language in customer copy, and no copy that
//   implies an unverified feature is operational.

export type DirectoryKey = "solo-agent" | "brokerage" | "builder";

export type DirectoryProduct = {
  key: DirectoryKey;
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
};

export const DIRECTORIES: DirectoryProduct[] = [
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
      { title: "Local exposure included", body: "Your profile appears in the South Suburbs Best Real Estate Marketplace too." },
    ],
    includes: [
      "Branded directory on a domain you own",
      "Property listings with photo galleries",
      "Search by city, price, beds, baths and type",
      "Showing-request and question forms on every listing",
      "Agent profile and service-area pages",
      "South Suburbs Best Marketplace listing in normal rotation",
    ],
    cta: "Build my agent directory",
    price: null,
    cadence: null,
    introOffer: null,
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
      { title: "Agent profiles that recruit", body: "Each agent gets a professional profile, a showcase for the talent you want to attract." },
      { title: "Inquiries to the right agent", body: "Listings are linked to their listing agent, so requests don't sit in a shared inbox." },
      { title: "Regional presence", body: "Your brokerage appears in the South Suburbs Best Real Estate Marketplace." },
    ],
    includes: [
      "Brokerage-branded directory on your domain",
      "Multiple agent profiles",
      "Listings linked to the listing agent",
      "Brokerage-wide property search",
      "Showing and consultation requests routed per listing",
      "South Suburbs Best Marketplace listing in normal rotation",
    ],
    cta: "Build my brokerage directory",
    price: null,
    cadence: null,
    introOffer: null,
  },
  {
    key: "builder",
    name: "Builder / Developer Directory",
    shortName: "Builder / Developer",
    audience: "Home builders and developers",
    headline: "Sell the community, not just the lot.",
    // Builder directories are not built yet: copy stays consultative
    // (scoped with the builder first) and never implies a running product.
    pitch:
      "New-construction buyers shop by community, floor plan and move-in date. A Builder / Developer Directory is planned around all three, under your brand. We start with a walkthrough to scope your communities, plans and tour process with you before anything is built.",
    outcomes: [
      { title: "Every community showcased", body: "Give each development its own page with photos and neighborhood details." },
      { title: "Floor plans and availability", body: "Present your plans and which homes are ready." },
      { title: "Tour requests, not just views", body: "Let interested buyers ask for a tour from the community page." },
      { title: "Regional presence", body: "Your communities appear in the South Suburbs Best Real Estate Marketplace." },
    ],
    includes: [
      "Builder-branded directory on your domain",
      "Community and development showcases",
      "Available homes and floor plans",
      "Neighborhood and community information",
      "Tour and availability requests",
      "South Suburbs Best Marketplace listing in normal rotation",
    ],
    cta: "Book a builder walkthrough",
    price: null,
    cadence: null,
    introOffer: null,
  },
];

// The marketplace is SSB's own property, explained as a benefit of the
// three directories - not sold on its own here.
export const MARKETPLACE = {
  name: "South Suburbs Best Real Estate Marketplace",
  pitch:
    "South Suburbs Best owns and operates the Real Estate Marketplace, the regional place where local buyers, sellers and renters discover real estate professionals and properties across Chicago's South Suburbs. Every directory subscription includes a place in it.",
};

// The one optional paid upgrade on this page. Founder pricing only.
export const FEATURED_PLACEMENT = {
  name: "Featured Marketplace Placement",
  body: "Move beyond normal rotation. Featured placement puts your business and listings in front of more local buyers in the South Suburbs Best Real Estate Marketplace.",
  points: ["Priority position in marketplace results", "Featured badge on your profile", "Promoted listings in regional discovery"],
  price: null as string | null,
};

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
    a: "No. Your directory doesn't replace any portal and doesn't include portal listings. It's an independent marketing and lead channel under your own brand, and it works alongside everything you already use. Keep using the portals for reach.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes. Your directory is designed to run on a domain you own. You choose and register the domain; we connect it during setup.",
  },
  {
    q: "Is the directory independently branded?",
    a: "Yes. Buyers and sellers see your name, logo, colors and contact details.",
  },
  {
    q: "Who owns the underlying platform?",
    a: "The platform that powers your directory stays ours to host, maintain and improve; your subscription covers its use. You control your brand, your domain and your content.",
  },
  {
    q: "How are leads captured?",
    a: "Every listing has a showing-request and question form. Each request is sent to that listing's agent (or to the directory owner) for follow-up.",
  },
  {
    q: "What is included in my South Suburbs Best Marketplace listing?",
    a: "Every Solo Agent, Brokerage and Builder / Developer subscription includes a listing in the South Suburbs Best Real Estate Marketplace in normal rotation, alongside other local real estate professionals. Featured placement is a separate, optional upgrade.",
  },
  {
    q: "Do I need technical skills?",
    a: "No. Your directory is done for you. You provide your information, branding and listings; we build, verify and launch your directory.",
  },
  {
    q: "My broker already handles my marketing. Do I still need this?",
    a: "A brokerage site promotes the brokerage. A Solo Agent Directory promotes you, and it goes with you. If you run a brokerage, the Brokerage Directory gives every one of your agents a profile under your brand.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. You can add featured marketplace placement at any time.",
  },
  {
    q: "Can a brokerage manage multiple agents?",
    a: "Yes. Brokerage directories present multiple agent profiles and link each listing to its listing agent so inquiries reach the right person. Routing for your team is set up with you during onboarding.",
  },
  {
    q: "Can a builder showcase multiple developments?",
    a: "That's what the Builder / Developer Directory is designed for: multiple communities, available homes and floor plans. Book a walkthrough and we'll scope what your communities need with you before you commit.",
  },
  {
    q: "What happens after I sign up?",
    a: "You share your business information, branding and listings. We configure and build your directory, verify it with you, connect your domain and launch. Our build target is 48 hours from complete onboarding information; we confirm your launch date once your directory passes verification.",
  },
];

// Sales contact. The phone number is founder-provided. The email is the
// existing inbox the intake fallback already uses; it is not displayed
// on the page (it carries a non-SSB name) until an SSB sales inbox is
// approved.
export const SALES_CONTACT = {
  phone: "(708) 847-4211",
  phoneHref: "tel:+17088474211",
  email: "leadsgrowrevenue@gmail.com",
};
