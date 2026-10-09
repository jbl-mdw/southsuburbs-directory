# South Suburbs Best Real Estate Directory Sales Page: Discovery, Analysis and Launch Readiness

Mission: ZILLOW-BUSTER-SALES-LANDING-001
Branch: `claude/tender-mendel-5pvk3u` (isolated; not merged, not deployed)
Page: `frontend/app/zillow-buster/` → route `/zillow-buster` (the slug is a placeholder pending founder decision, see §7)

## Refinement pass v4 (latest)

**Changed (sales page only)**
- **CTAs:** every solid-amber button now obtains a branded directory: "Get my branded directory" (hero, form submit), "Get my Solo Agent / Brokerage / Builder / Developer Directory" (directory sections), and "Get this directory" (pricing cards). The marketplace banner was restyled as secondary so it no longer competes.
- **Clarity:** a new "Your directory and the marketplace, side by side" comparison covers brand, web address, what's on it, what it does, where showing requests go, and cost. The hero, chooser and included-listing card now say "independently branded", "a domain you own" and "normal-rotation listing" explicitly. The FAQ answers on domain ownership, branding and lead capture were tightened. The redundant "Run by South Suburbs Best" card was folded into the included-listing card.
- **Phone:** (708) 847-4211 appears in the hero, the contact card, under the form submit button and in the email-fallback screen. It never wraps.
- **Mobile:** section padding is 56px on phones (80px on larger screens). Primary buttons are full-width on phones. Hero chips and the add-on chip are at least 40px tall. Pricing feature lists use 14px text on phones. The hero eyebrow has tighter tracking.
- **Form:** visible labels on every field (not placeholder-only), required markers, autocomplete hints (name, organization, email, tel), 16px inputs that are 48px tall on phones (so iOS doesn't zoom on focus), and a ✓/+ state on the add-on chip. The submit button reads "Get my branded directory", with "No payment now. We'll follow up with pricing and next steps." The integration is unchanged: still gated, and email fallback only.
- **Removed:** one FAQ sentence ("not shared with other agents") that couldn't be verified.

**Validation (v4):** typecheck clean; production build compiles. The rendered page body, FAQ answers included, contains no Zillow Buster, LGR, SSB abbreviation, old contact details, status labels or AI Employee promotions. Desktop 1440px and mobile 390px: 0 overflow in page content. Mobile: smallest input text 16px, smallest field 48px, no tap target under 40px. Directory CTAs preselect the form; `?directory=marketplace` falls back to Solo Agent; calculator correct; email fallback subject and body correct; **0 POST requests**.

**Open founder decisions (unchanged by this pass)**
1. **Footer credit:** the shared site footer reads "Powered by Leads Grow Revenue • AI Automation & Local Marketing", not the requested "Powered by Leads Grow Revenue." It's a shared component on every SSB page, so it's outside this sales-page scope.
2. **The email fallback** opens the prospect's mail app addressed to leadsgrowrevenue@gmail.com, which is visible to them at that point. An SSB sales inbox is needed.
3. **The URL** `/zillow-buster` is customer-visible.
4. **Prices** for the 3 directories and featured placement (all "Request pricing").
5. **The live-intake workflow key, checkout and onboarding** (see §0 table).
6. **Featured placement is not configured** for real estate listings yet.
7. **Builder / Developer** is purchasable via the form, but the product is not built. The copy says it is scoped with the builder first.
8. **Ownership FAQ** wording needs legal confirmation.

## 0. Founder refinement v3 (current state, supersedes earlier sections where they conflict)

**Brand and scope changes**
- South Suburbs Best is the only customer-facing brand. "Zillow Buster" was removed from all page copy, the metadata title, the widget page context and the intake email subject. (It survives only in internal names: the route folder, an env var name and this doc's mission ID.)
- Leads Grow Revenue was removed from page copy. The only visible reference is the **shared site footer**, which currently reads "Powered by Leads Grow Revenue • AI Automation & Local Marketing".
- The page sells **three directory subscriptions** (Solo Agent, Brokerage, Builder / Developer). The SSB Real Estate Marketplace is presented as owned and operated by South Suburbs Best and included with every directory, not as a product. **Featured placement** is the only optional paid upgrade.
- The AI Employees section was removed from the page. It is preserved, self-contained, at `frontend/app/zillow-buster/_upsell/AiEmployeesSection.tsx` (a private Next.js folder, so it is never routed) for the separate customer upsell journey.
- Sales phone is now (708) 847-4211. The old email address is no longer displayed (it carries a non-SSB name). The email fallback still sends to it.
- Development-status badges, the preview legend and "sample data / concept / live" language were removed. Example screens carry a plain "Example" tag, and the disclaimer notes they are examples with sample listings. Builder / Developer copy is consultative ("planned around", "we scope it with you", CTA "Book a builder walkthrough") so it never implies a running product. Missing prices show "Request pricing".

**Verified (v3):** typecheck clean; production build compiles; the rendered page body (FAQ answers included) contains none of: Zillow Buster, Leads Grow Revenue, LGR, SSB, the old phone, the old email, status labels, AI Employee names, "pipeline", "manufactur". The form offers 3 directories plus featured placement; `?directory=builder` preselects Builder; `?directory=marketplace` safely falls back to Solo Agent; email fallback subject reads "South Suburbs Best directory request: …"; 0 network POSTs; 0 overflow at 1440px and 390px.

**What automated checkout, intake and onboarding need (nothing built; needs authorization)**
| Stage | Exists today | Needed |
|---|---|---|
| Intake | Form + email fallback; live POST to the existing `/v1/public/directory-lead` gated behind `NEXT_PUBLIC_ZB_INTAKE_WORKFLOW_KEY` | An approved workflow key and its handler in the gateway/n8n; a CRM destination; an auto-reply to the prospect |
| Checkout | None (no payment code in this repo; `/submit` is a stub) | Approved prices; a payment provider product per directory plus featured placement; checkout links or a hosted checkout; a webhook that records the subscription |
| Onboarding | None in this repo | A post-payment onboarding form (branding, listings, agents/communities, domain); a provisioning trigger from paid subscription to a directory instance (the template/provisioning pipeline is not in this repo); domain connection steps; a verification sign-off before launch |
| Marketplace inclusion | `/real-estate` live; `shared_inventory` flag exists | A rule that a paid directory's profile is marked visible in the marketplace; featured sort applied when the upgrade is bought |

### Remaining launch blockers (v3)
1. **Pricing:** no approved price for any of the 3 directories or for featured placement (`content.ts` `price: null` everywhere). Every pricing spot shows "Request pricing".
2. **Live intake:** no approved workflow key, so requests leave by email to an inbox with a non-SSB name. An SSB-branded sales inbox is needed.
3. **No checkout or onboarding automation** (table above). Every sale is assisted today.
4. **Featured placement isn't configured for real estate:** no real estate business has `is_featured` / `premium_status` set, and the `/real-estate` agent list sorts by name, not featured status. It must work before it's sold.
5. **The shared footer text** differs from the requested "Powered by Leads Grow Revenue." Changing it affects every SSB page (shared component), so it awaits your approval.
6. **The URL still contains the old brand:** `/zillow-buster` is customer-visible. A new route needs your URL decision.
7. **Builder / Developer Directory isn't built.** It's sold as a walkthrough only.
8. **"Who owns the underlying platform?" FAQ:** it now says the platform "stays ours". Confirm the legal entity wording with counsel.
9. **The live-demo link target** `/real-estate` has a missing hero image and dead `/submit-fsbo` links (pre-existing).

---

## 1. Source discovery (Deliverable 1)

### What this repository is
`southsuburbs-directory` is the **South Suburbs Best Next.js 14 frontend** (`frontend/`) plus Caddy and docker-compose config. The directory engine it depends on is **not in this repo**:

| Dependency | Where it lives | In this repo? |
|---|---|---|
| Directory Platform gateway (`/api/directory-platform/...`, `entity-store.js`, `server.js`, `buildPropertyAttributeFilters`) | `lgr_connect_gateway:4120` container | **No**. Only the client (`frontend/lib/ssbVertical.ts`) |
| Public lead endpoint `/v1/public/directory-lead` | `automation.leads2scale.com`, routed to `lgr_connect_gateway` (`Caddyfile:97-110`) | **No** |
| Directus schema/data (businesses, `directory_scope`, `shared_inventory`) | `ssb_directus` | **No**. Only read filters |
| Receptionist widget v2 | `connect.leads2scale.com/v2/widget.js` (`frontend/app/layout.tsx:21-25`) | **No** (an old copy is in `frontend/public/widget.js`) |
| **SSB Master Directory Template** | Unknown (ZAKAPE?) | **Not found.** No file, folder or reference to a "master template" exists in the repo |

**Limitation:** the canonical SSB Master Template, the gateway, and ZAKAPE/Directus production state **could not be verified** from GitHub. No access to ZAKAPE, Directus or production services was available or used.

### Reusable assets found (exact paths)

| Asset | Path | Notes |
|---|---|---|
| Real estate directory homepage | `frontend/app/real-estate/page.tsx` | Hero search, agent sample, property grid, pro directory, monetization surfaces, cities |
| Hero search | `frontend/app/real-estate/HeroSearch.tsx` | Routes to `/category/[slug]` or `/city/[slug]` |
| Property search/filter | `frontend/app/real-estate/PropertyFilters.tsx` | city, price, beds, baths, type, sale/rent → gateway filters |
| Property detail page | `frontend/app/real-estate/property/[id]/page.tsx` | Gallery, listing agent, SEO metadata, Receptionist `data-page-*` context |
| Showing/inquiry request form | `frontend/app/real-estate/ShowingInquiryForm.tsx` | POSTs to `/v1/public/directory-lead`, `workflowKey: booking.request / listing.inquiry` |
| Vertical + scoped entity client | `frontend/lib/ssbVertical.ts` | `getVertical()`, `getScopedEntities()`, `listingAgent`, `leadDestination`, explicit `brokerage` gap |
| Directory isolation filter | `frontend/lib/directus.ts` (`SSB_VISIBILITY_FILTER`) | `directory_scope` / `shared_inventory`: evidence of multi-directory inventory scoping |
| Premium/featured fields | `frontend/lib/directus.ts` (`is_featured`, `premium_status`, `ai_receptionist_enabled`, `fetchFeaturedBusinesses`) | Featured data model exists; real estate businesses have none set (per comment in `real-estate/page.tsx:52-56`) |
| Business/agent profile | `frontend/app/business/[slug]/page.tsx` + `frontend/app/business/components/*` | Generic SSB business profile (used as agent profile) |
| Lead forms | `frontend/app/quote/page.tsx` (n8n webhook), `frontend/components/QuoteForm.tsx` | Generic quote leads |
| Listing plans page | `frontend/app/submit/page.tsx` | Generic business listing plans: Free / $10.50 / $31.50. **Not** real estate directory pricing |
| Listing intake form | `frontend/app/submit/SubmitListingForm.tsx` | **Stub**: `alert("Submitted (stub). Next step: wire to Directus + payment.")` (line 94) |
| Layout, Navbar, Footer | `frontend/app/layout.tsx`, `frontend/components/navbar/*`, `frontend/components/Footer.tsx` | Footer already says "Powered by Leads Grow Revenue" |
| Design system | Tailwind (`frontend/tailwind.config.ts`), real estate primary `#1e3a5f`, slate scale, amber badges | No shared component library; styles are inline Tailwind |
| Runtime dashboards | `frontend/app/dashboard/[dashboardKey]/page.tsx`, `frontend/lib/runtime/*` | Generic dashboard renderer, not customer-facing |
| Multi-domain routing | `Caddyfile`, `infrastructure/caddy/Caddyfile` | Caddy already serves many hostnames, so custom domains are mechanically possible but are added by hand |

**No pre-existing Zillow Buster components** exist anywhere in the repo.

---

## 2. Competitor sales-page analysis (Deliverable 2)

### Why the page could not be inspected directly
- **Exact cause:** this cloud environment's **network policy**. Every outbound request goes through the session's egress proxy, which answered `403` to `CONNECT www.easyrealestatedirectorypro.com:443` and `CONNECT easyrealestatedirectorypro.com:443` (proxy log: `connect_rejected`, "policy denial"). WebFetch failed the same way (`getaddrinfo ENOTFOUND`). It is **not** a problem with the site, which loads normally in the founder's browser.
- **Scope of the block:** the environment runs on a restricted allowlist. A control request to `www.google.com` is refused too, so general web hosts are not reachable.
- **Fix:** yes, a permitted configuration resolves it. In the cloud environment settings (environment menu in the session title bar → Edit → Network access), add `easyrealestatedirectorypro.com` and `www.easyrealestatedirectorypro.com` under **Allowed domains**, or choose a broader access level. Docs: https://code.claude.com/docs/en/cloud-environments#network-access
- **What was used instead:** 10 founder-supplied screenshots of the `?tid=1` page (hero through FAQ). The page's video content, the FAQ answers, the page footer and checkout were not visible and are not analyzed.

### Their sales sequence (from the screenshots)
1. **Nav:** Why Real Estate · Features · How It Works · Use Cases · Pricing · "Get Access Now".
2. **Hero:** "White-label real estate directory **for digital marketers**." The headline names Zillow and says every lead comes directly to the agent. Offer: **$27 for 30 days, then $47/mo, no lock-in**. CTA "Get Instant Access for $27 →". It mentions 3 done-for-you bonuses.
3. **Sales video** (~16½ min) with the founder on camera: "One afternoon to set up. $200–$500/month per client."
4. **Trust strip:** 2M+ agents · showing-request lead capture · clients don't cancel · data lives in your platform.
5. **Why this niche:** 4 numbered reasons (high-value deals, agents already pay for portal placement, under-served market, instant ROI).
6. **The Numbers:** 8 stat tiles (2M+, 97%, 73%, 90%, $1.8T, <10%, 6.7M, $9,400). No sources are shown.
7. **Frictionless ROI:** agent income bars by tier, plus "one showing request covers the fee."
8. **Problem:** two columns, ✗ "The Zillow Problem" vs ✓ "What You Give Them — Without Replacing Anything."
9. **"Zillow Plus" framework:** "Zillow is for reach. Your directory is for capture." A one-sentence pitch and "Two platforms. Two purposes. Zero conflict."
10. **Introducing / What's included:** listing management, agent profiles and linking, showing-request system.
11. **See a Real Estate Directory:** "See Live Demo" button.
12. **How it works:** 3 steps (live within the hour → demo to agents → onboard and collect).
13. **Use cases:** "One Platform. Four Ways": Solo Agents, Independent Brokerages, City-Wide Property Marketplaces, Property Developers (each with a suggested resale price).
14. **Retention:** 4 reasons clients stay (their leads live in the platform, results arrive monthly, referrals, the fee is covered by one showing).
15. **Second income stream:** FSBO lead capture with suggested plans Free / $197 / $497 per month.
16. **Bonuses:** outreach email campaign, 21-slide sales deck, 10,000 agent leads.
17. **FAQ:** 9 objections (technical skills, product differences, after the trial, what to charge, why pay when on Zillow, if it doesn't work, FSBO, "stop using Zillow?", "my broker handles marketing").

### Adopted, in our own words
| Their mechanic | On the Zillow Buster page |
|---|---|
| Reach vs capture framing | "Portals for reach. Your directory for capture." section, plus a pull-quote pitch line |
| ✗/✓ two-column problem | "Relying only on third-party portals" vs "With your own Zillow Buster directory" |
| Trust strip under hero | 4-point strip (live SSB directory, showing requests, your domain, marketplace included) |
| Commission-anchored ROI | Interactive break-even calculator on the prospect's **own** commission. No market stats, no promised leads |
| Four use cases | Four configurations, each with its own section, headline, outcomes, preview and pre-selected CTA |
| Live demo button | "Explore the live SSB Real Estate Directory" (real, running `/real-estate`) |
| Objection FAQ | Added "why own a directory if I'm on Zillow", "do I need technical skills", "my broker handles marketing" |

### Deliberately not adopted
- **Unsourced statistics** (2M agents, 97%, 73%, 90%, etc.): we can add them if they're sourced and approved.
- **Claims about how Zillow routes leads** ("to whoever paid for Premier"): this is a factual claim about a competitor and needs legal sign-off. Our copy talks about "third-party portals" generically.
- **"Clients don't cancel" / retention promises:** we have no customer history to support them.
- **Price, trial and bonuses:** not approved. The page has founder-editable slots (`content.ts`: `price`, `introOffer`, `LAUNCH_OFFER`).
- **FSBO income stream:** not an authorized launch product.

### Positioning difference that matters
They sell a **reseller tool to marketers**, who must then sell to agents. Zillow Buster sells **done-for-you directories directly to the agent, brokerage or builder**, and includes regional distribution (SSB Marketplace) that their product doesn't offer. Their "city-wide marketplace" use case is what SSB already is. Their reseller model maps to LGR's future "regional directory licensing" opportunity.

---

## 3. The landing page (Deliverable 3)

| File | Purpose |
|---|---|
| `frontend/app/zillow-buster/page.tsx` | The page |
| `frontend/app/zillow-buster/content.ts` | **All founder-editable sales facts**: configurations, pricing (`price: null` until approved), intro offers, FAQ, AI upgrades, contact |
| `frontend/app/zillow-buster/ProductPreviews.tsx` | Static product previews mirroring the live `/real-estate` component markup, with sample data and honest status badges |
| `frontend/app/zillow-buster/DirectoryIntakeForm.tsx` | Conversion form; **live submission is off by default**; preselects the configuration from `?directory=` |
| `frontend/app/zillow-buster/BreakEvenCalculator.tsx` | "One closing" ROI calculator on the prospect's own numbers |

Section order (v2, conversion-focused): Hero with "I'm a…" buyer chips → trust strip → ✗/✓ problem → "Portals for reach, your directory for capture" → four-way chooser → preview legend → Solo Agent / Brokerage / Builder sections (headline, outcomes, preview, CTA that preselects the intake form) → SSB Marketplace (how it connects, regional map, included normal rotation vs marketplace-only vs **featured placement upsell**) → break-even calculator → how it works (48h framed as a *target*) → **AI Employees add-ons** → pricing (founder-editable, plus an add-ons table) → FAQ (13 questions, all 10 required) → final CTA and intake → Zillow non-affiliation disclaimer.

**Guardrails built in**
- No prices, offers, bonuses or deadlines are shown until they're set in `content.ts`.
- Every preview frame carries a **"Preview · sample data"** ribbon plus a status badge: *Live on SSB today* (runs on southsuburbsbest.com/real-estate; not yet certified on a customer domain) / *Built from live components* / *Concept · not yet built*. A legend explains the badges before the first buyer section.
- No claim of Zillow inventory, affiliation or replacement. Problem copy talks about "third-party portals" generically.
- Previews never submit. A working showing form on a sales page would inject fake requests into live lead routing.
- **Intake form:** with no `NEXT_PUBLIC_ZB_INTAKE_WORKFLOW_KEY`, it makes **zero network calls** and hands the prospect a pre-filled email to the existing published sales inbox (from `/contact`) plus the phone number. When a founder-approved workflow key is set at build time, it POSTs to the existing canonical `/v1/public/directory-lead` with `source: "zillow_buster_sales_page"`, the same endpoint the showing form uses.

---

## 4. Four revenue configuration map (Deliverable 4)

| Configuration | What the existing codebase supports | What's missing |
|---|---|---|
| **1. SSB Real Estate Marketplace** | Live `/real-estate`: vertical config from gateway, property search/filter, detail pages, showing requests, agent sample, pro directory by category, monetization surfaces from `vertical.monetizationSurfaces` | No real estate business has `is_featured`/`premium_status` set; the paid featured placement flow and pricing don't exist; `/submit-fsbo` link is dead (route missing) |
| **2. Solo Agent Directory** | Same components; `directory_scope`/`shared_inventory` isolation (`lib/directus.ts`); `leadDestination` = listing agent or `directory_owner` (`lib/ssbVertical.ts`) implies per-directory owner routing exists in the gateway | Per-customer branding/theming, custom-domain host routing, the provisioning flow and the template all live outside this repo (unverified) |
| **3. Brokerage Directory** | `agent_lists_property` relationship, `listingAgent` resolution | `brokerage` is a **declared gap** in code: `{ resolved: false, gapReason }` (`lib/ssbVertical.ts:40-55`). No brokerage→agent roster model or brokerage-level routing |
| **4. Builder / Developer Directory** | Generic entity store could hold new types | No community/development/floor-plan entity types or pages exist. **Concept only** |

---

## 5. Monetization and conversion map (Deliverable 5)

| Touchpoint on page | Revenue stream | Connected to today |
|---|---|---|
| Hero / config CTAs → `#get-started` | Solo / Brokerage / Builder subscriptions | Intake form → email/phone (live POST once a workflow key is approved) |
| "Join the marketplace" | Marketplace participation | Same intake |
| Featured placement card + add-on chip | Featured/promoted placement | Captured as interest in the intake summary; no checkout |
| AI Employees section + add-on chips | Receptionist / Prospector / Executive Assistant | Captured as interest; Receptionist widget is live sitewide on SSB (`layout.tsx`) |
| Pricing cards "Get pricing" | All four | Intake; prices render the moment they're set in `content.ts` |
| "Explore the live SSB Real Estate Directory" | Proof → conversion | `/real-estate` (live) |
| Receptionist page context `data-page-type="sales"` | AI-assisted selling | Uses the existing widget `data-page-*` mechanism; whether the v2 widget acts on `sales` is unverified |

**Future opportunities (not launched, need authorization):** FSBO/homeowner listings (an FSBO data path exists in the gateway; `/submit-fsbo` is missing and no price is approved), property manager/investor listings, directory management services, regional directory licensing, automated follow-up sequences (n8n is present: `n8n-lead-submission-workflow.json`).

---

## 6. Gap and readiness report (Deliverable 6)

| Capability | Status | Evidence | Smallest remaining gap |
|---|---|---|---|
| Solo agent directory | **Partial** | `real-estate/*`, `lib/ssbVertical.ts` (`directory_owner` lead destination), `lib/directus.ts` (`directory_scope`) | Per-customer branding and an instance of the Master Template (not in repo) |
| Brokerage directory | **Partial** | `agent_lists_property`; `brokerage` declared gap | Brokerage entity plus brokerage→agent relationship in gateway |
| Builder/developer directory | **Missing** | No entity types or pages | Community/floor-plan entity types plus pages |
| SSB marketplace integration | **Partial** | `/real-estate` is live; `shared_inventory` flag | Confirm subscriber directories set `shared_inventory`; "normal rotation" ordering is unspecified (agent sample is sorted by name) |
| Custom domain support | **Partial** | Caddy multi-host config | Manual Caddyfile edit and reload per customer; no automated domain onboarding |
| Property search | **Working** (SSB) | `PropertyFilters.tsx` → gateway filters | Verify on a customer-scoped directory |
| Lead capture | **Working** (SSB) | `ShowingInquiryForm.tsx`, `quote/page.tsx` | None for SSB; sales intake needs an approved workflow key |
| Showing requests | **Working** (request only) | `booking.request` via directory-lead | No calendar booking (by design, per code comment) |
| Listing synchronization (MLS/IDX) | **Missing** | No MLS/IDX/RETS code; media is manually entered URLs | IDX/MLS feed integration (and the licensing decision) |
| Subscription checkout | **Missing** | No Stripe/payment code; `SubmitListingForm` is a stub | Payment provider integration (LGR's billing is not in this repo) |
| AI Receptionist integration | **Partial** | Widget live on SSB; property page context; `ai_receptionist_enabled` field | Per-customer-directory widget client IDs (unverified) |
| Automated provisioning | **Unverified** | Nothing in repo | Locate the provisioning pipeline (ZAKAPE/gateway) |
| 48-hour manufacturing readiness | **Unverified** | Depends on template plus provisioning | Certify one end-to-end manufactured directory |

### Pre-existing issues found (not changed; outside scope)
1. **🔴 Security: a Directus API token is committed in plaintext** in `DEPLOYMENT.md`. Rotate it and remove it from the file (it remains in git history).
2. `/real-estate` hero image `/placeholders/real-estate.jpg` does not exist in `frontend/public/` (broken hero image on the live page, unless it's provided outside git).
3. `/submit-fsbo` is linked from `/real-estate` (3 places) but no route exists, so it returns a 404.
4. Shared Navbar overflows at phone width (~205px horizontal scroll at 390px). The same happens on `/contact`, so it's sitewide.
5. `components/navbar/Navbar.tsx` is a client component rendering async server component `NavbarA`, which React warns about on every page.
6. `next build` fails without a reachable Directus for statically prerendered pages (`/explore`, `/quote`, `/test-widget`, `/_not-found`). It's environment-dependent and pre-existing.
7. ESLint isn't configured (`next lint` prompts for setup).
8. Repo root has stray zero-byte files (`=`, `[deps`, `^C`, `CACHED`, …) from shell accidents.

### Genuine launch blockers for the sales page
1. **Founder pricing and offer approval** (`content.ts`).
2. **Intake workflow key approval:** set `NEXT_PUBLIC_ZB_INTAKE_WORKFLOW_KEY` so requests flow into the lead pipeline/CRM instead of email.
3. **Route/slug and brand naming decision**, plus legal review of the "Zillow Buster" name (it uses a third-party trademark; a disclaimer is on the page).
4. **Checkout:** without it, every sale is assisted (walkthrough → manual billing). That's acceptable for launch as a demo-led funnel, but it isn't automated.

---

## 7. Preview, tests and founder decisions (Deliverable 7)

### Tests run (v2)
| Check | Result |
|---|---|
| `tsc --noEmit` | ✅ Clean |
| `next build` with offline env | ✅ `/zillow-buster` builds; remaining failures are pre-existing Directus-dependent static pages (§6.6) |
| Playwright desktop 1440px | ✅ All sections render; 0 overflow in page content; all anchors (`#solo-agent`, `#brokerage`, `#builder`, `#marketplace`, `#directories`, `#pricing`, `#get-started`) exist |
| Playwright mobile 390px | ✅ 0 overflow in page content after a `min-w-0` grid fix; the shared Navbar still overflows (§6.4, pre-existing) |
| Buyer CTA → intake | ✅ "Build my brokerage directory" → `?directory=brokerage#get-started`, Brokerage preselected, form scrolled into view; direct link `?directory=builder` preselects Builder |
| Break-even calculator | ✅ $12,000 × 2 closings → $24,000 / $2,000 a month |
| Intake form (preview mode) | ✅ Submit → pre-filled `mailto:`; **0 POST requests** across all tests |
| Images | ✅ Map loads; added `sizes` so phones get ~828px instead of a 3840px / 1.9 MB PNG |
| Live intake / billing / production | Not touched |

### Changed files
- `frontend/app/zillow-buster/page.tsx`
- `frontend/app/zillow-buster/content.ts`
- `frontend/app/zillow-buster/ProductPreviews.tsx`
- `frontend/app/zillow-buster/DirectoryIntakeForm.tsx`
- `frontend/app/zillow-buster/BreakEvenCalculator.tsx` (new in v2)
- `docs/zillow-buster/LAUNCH_READINESS.md`

No file outside these two folders was modified (shared navigation, layout, credentials, integrations and billing are untouched).

### Decisions requiring founder authorization
1. Prices, cadence and intro offer for each of the 4 configurations (and featured placement / AI add-ons).
2. Intake workflow key (and which CRM/pipeline receives it).
3. Public URL: `/zillow-buster` on southsuburbsbest.com, or a separate domain.
4. Product name legal review ("Zillow Buster").
5. Whether to link the page from SSB nav / `/real-estate` monetization cards.
6. Lead/data ownership terms for subscriber directories (not stated on the page).
7. Whether to surface the Builder configuration as "concept" or hold it until built.
8. Honest scarcity, if any (e.g. founding-member cap per city).
9. Whether to cite any market statistics (each needs a source).
10. Whether the page may make any specific claim about how portals route leads (legal).
