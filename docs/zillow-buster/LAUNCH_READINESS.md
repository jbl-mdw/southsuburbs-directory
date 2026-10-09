# Zillow Buster Sales Landing Page: Discovery, Analysis and Launch Readiness

Mission: ZILLOW-BUSTER-SALES-LANDING-001
Branch: `claude/tender-mendel-5pvk3u` (isolated; not merged, not deployed)
Page: `frontend/app/zillow-buster/` → route `/zillow-buster` (the slug is a placeholder pending founder decision, see §7)

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

### Access limitation (read first)
`https://www.easyrealestatedirectorypro.com/?tid=1` and `https://www.easyrealestatedirectorypro.com/` **could not be loaded**. This cloud environment's network policy rejects the host (proxy 403 on CONNECT). The page itself was **not read**. The only information available came from search-engine indexing of the vendor's page:

- **Positioning:** a *white-label property directory platform* that a marketer "sets up once and sells as a monthly recurring service to real estate agents and brokerages." Title: "Earn Monthly From Real Estate Agents."
- **Pain hook:** agents depend on a portal where leads go to whoever pays for premium placement; the directory is an alternative the agent controls.
- **Features named:** property listing fields, a **showing-request system on every listing**, **agent-to-property linking** for multiple agents, Google-indexed agent profile pages, buyer filters by city/price/bedrooms.
- **Trust anchor:** built on the vendor's existing EasyDirectoryPro platform "already trusted by thousands of digital marketers."
- **Market-size claim:** "2 million agents, less than 10% served" (unverified vendor figure).
- **Offer mechanics:** low-cost trial for the first 30 days, then a higher monthly fee, "no lock-in, cancel anytime." (Their prices are not reproduced or reused here.)
- **Not determinable without access:** section order, visuals/video, bonuses, guarantee, FAQ, testimonials, mobile presentation, FSBO/homeowner listing pitch.

Everything below §2 that refers to their page draws only on the points above. Nothing else about their page is inferred or invented. **To complete this analysis, allow `easyrealestatedirectorypro.com` in the environment's network settings and re-run, or paste the page text.**

### What works in their sales mechanics (from what's visible)
1. **Outcome-first headline** (money, recurring). The page sells a business result before it explains features.
2. **One sharp enemy:** pay-to-play portal leads. It's simple and emotional.
3. **Concrete feature proof** that maps to the pain: a showing request on every listing, agent-to-property linking.
4. **Borrowed trust** from a parent platform.
5. **Low-friction entry offer** (cheap trial, cancel anytime) that lowers commitment risk.

### Where Zillow Buster is structurally stronger, and how the page uses it
| Their approach | Zillow Buster advantage | Used on page |
|---|---|---|
| Sells software to *resellers* who must find agents | Sells **done-for-you** directories directly to agents/brokerages/builders; we manufacture | Hero, How It Works ("done for you") |
| One product shape | **Four distinct configurations** (Solo, Brokerage, Builder, Marketplace) | Section D, pricing, intake form |
| Directory sits alone | **Built-in regional distribution:** every subscription includes an SSB Marketplace listing | Section G, FAQ, comparison table |
| Directory only | **AI Employees upsell** (Receptionist, Prospector, Executive Assistant) | Section H, intake add-on chips |
| Generic platform trust | **Proof you can click:** the live SSB Real Estate Directory | "Explore the live SSB Real Estate Directory" CTA |

### Recommended next improvements (founder-approved only)
- Add a **founder-approved entry offer** (e.g. founding-member pricing or first-month offer). The page's `introOffer` field renders it as soon as it's set. No deadline or scarcity unless it's real (e.g. a genuine cap on founding slots per city).
- **City exclusivity** ("one featured agent per city") is the honest scarcity lever this model supports. It needs a founder decision.
- Add **testimonials/case results** once the first customers launch. None exist today, and none were fabricated.
- **Reseller/licensing track** (their whole model) as a future LGR offer: "Regional directory licensing."

---

## 3. The landing page (Deliverable 3)

| File | Purpose |
|---|---|
| `frontend/app/zillow-buster/page.tsx` | The page (sections A–K) |
| `frontend/app/zillow-buster/content.ts` | **All founder-editable sales facts**: configurations, pricing (`price: null` until approved), intro offers, FAQ, AI upgrades, contact |
| `frontend/app/zillow-buster/ProductPreviews.tsx` | Static product previews mirroring the live `/real-estate` component markup, with sample data and honest status badges |
| `frontend/app/zillow-buster/DirectoryIntakeForm.tsx` | Conversion form; **live submission is off by default** |

Sections: A Hero · B Problem · C Solution and comparison table · D Four configurations · E Product previews and live-demo link · F How it works (48h framed as a *target*) · G Marketplace advantage (normal rotation included, featured optional) · H AI upgrades · I Pricing (pending-approval state) · J FAQ (all 10 required questions) · K Final conversion and intake. There is also a Zillow trademark non-affiliation disclaimer.

**Guardrails built in**
- No prices, offers, bonuses or deadlines are shown until they're set in `content.ts`.
- Preview badges: *Live on SSB today* / *Built on live components · configured per customer* / *Concept preview · in launch pipeline*.
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

### Tests run
| Check | Result |
|---|---|
| `tsc --noEmit` (baseline and after) | ✅ Clean |
| `next build` with offline env | ✅ `/zillow-buster` compiles and builds; remaining failures are pre-existing Directus-dependent static pages (§6.6) |
| Playwright desktop 1366px | ✅ Renders all sections, 0 horizontal overflow |
| Playwright mobile 390px | ✅ Page content fits; only overflow is the pre-existing shared Navbar (§6.4) |
| Intake form (preview mode) | ✅ Brokerage selected → agent-count field appears → submit → pre-filled `mailto:` with all fields; **0 POST requests made** |
| Live intake / billing / production | Not touched (no deploy, no submission, no service restarts) |

### Changed files
- `frontend/app/zillow-buster/page.tsx` (new)
- `frontend/app/zillow-buster/content.ts` (new)
- `frontend/app/zillow-buster/ProductPreviews.tsx` (new)
- `frontend/app/zillow-buster/DirectoryIntakeForm.tsx` (new)
- `docs/zillow-buster/LAUNCH_READINESS.md` (new)

No existing file was modified.

### Decisions requiring founder authorization
1. Prices, cadence and intro offer for each of the 4 configurations (and featured placement / AI add-ons).
2. Intake workflow key (and which CRM/pipeline receives it).
3. Public URL: `/zillow-buster` on southsuburbsbest.com, or a separate domain.
4. Product name legal review ("Zillow Buster").
5. Whether to link the page from SSB nav / `/real-estate` monetization cards.
6. Lead/data ownership terms for subscriber directories (not stated on the page).
7. Whether to surface the Builder configuration as "concept" or hold it until built.
8. Honest scarcity, if any (e.g. founding-member cap per city).
