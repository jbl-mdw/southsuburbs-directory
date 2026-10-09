# 02 · Industry Mapping Matrix

Which existing template families already cover which industries. ✅ means a real, inspectable asset exists, ◐ partial or indirect, — none found. Every cell is backed by the source listed in the legend below.

## Matrix

| Industry | Website template (WordPress demo) | Industry overlay | Directory vertical | Business Twins on file | Packs / solution | AI-employee overlay / demo | Taxonomy / genome | Raw material | Overall coverage |
|---|---|---|---|---|---|---|---|---|---|
| **Real Estate** | — | ✅ `ssb-real-estate` | ✅ `real-estate` (10 entity types, 9 monetization surfaces) + tenant `RE_TENANT_001` | ✅ 7 (6 "Real Estate Agent", 1 "Real Estate") | ✅ directory, premium-directory, marketplace packs; rate card `real-estate:rental` $299, `fsbo-standard` $49 | ✅ `ssb-receptionist`, tenant RE overlays, `ssb-prospector`; demo provisioner `real-estate`; demo-live `real_estate_agent` | ◐ taxonomy only | — | **Highest** (live on SSB) |
| **HVAC / Home Services** | ✅ demo1 (`hvac.leads2scale.com`) | ✅ `ssb-hvac-home-services` | ✅ `hvac-home-services` (contractor) | ✅ 65 | ✅ solution `home-services-growth-os` | ✅ demo provisioner `hvac`; Prospector fixtures; first HVAC keyword production run (`6c1cf12`) | ◐ taxonomy only | — | **High** |
| **Legal** | ✅ demo5 (`legal.leads2scale.com`) | ✅ `ssb-legal` | ✅ `legal` (attorney, law_firm) + tenant `LEGAL_TENANT_001` | ◐ 2 ("Personal Injury") | — | ✅ tenant LEGAL overlays | ◐ taxonomy only | ✅ `law-automation-suite`: 5 platforms → OVL, PK, BT, FORGE, DOC, PORTAL (license-gated) | **Medium**, most raw material in flight |
| **Plumbing** | ✅ demo2 | — | — | — | ◐ in solution target list | — | ◐ | — | Website only |
| **Electrical** | ✅ demo3 | — | — | — | ◐ in solution target list | — | ◐ | — | Website only |
| **Roofing** | ✅ demo4 | — | — | — | ◐ in solution target list | — | ◐ | — | Website only |
| **Restoration** | — | — | — | — | ◐ in solution target list | — | ◐ | — | Solution listing only |
| **Senior Living** | ✅ demo6 | — | — | — | — | — | ◐ | — | Website only |
| **Mortgage / Finance** | — | — | ◐ `mortgage_lender` entity type inside real-estate vertical | ◐ 1 ("Mortgage Broker") | — | ◐ demo-live `mortgage_finance` config | ◐ | — | Demo only |
| **Food service (NAICS 72)** | — | — | — | — | — | — | ✅ genome `naics:72` | — | Intelligence only |
| **Health / fitness** | ◐ `howtohealthfitness.com`, `vibrationis.com` (WordPress, owned properties) | — | — | — | — | — | ◐ | — | Owned sites, not templates |
| **Local business (SSB general)** | ✅ SSB Next.js site | ✅ geography `ssb-local-business-directory` | ◐ SSB Directus `businesses` (5,600+ records per code comment) | ◐ 1 | — | ✅ `ssb-receptionist` | ◐ | — | **Live** (SSB) |
| **Unmapped** | demo7 (`wp_wp-demo7_web`, no industry domain) | | | | | | | | Needs founder labeling |

## Cross-industry, industry-agnostic templates (apply to every row)
- `commercial-platform-manufacturing`: 8 platform types × 25 modules, static-HTML and WordPress/WooCommerce adapters
- AI-employee packages: Receptionist, Prospector, Closer, Executive Assistant, Missed Call Text Back, Review Management, Appointment Booking, Proposal Engine and others (19 packages / 14 packs)
- 14 channel overlays (website, email, SMS, voice, live chat, GBP, Facebook, Instagram, LinkedIn, YouTube, TikTok, X, marketplace, referral) and 1 business-model overlay (`solo-operator`)
- Onboarding pipeline, Stripe checkout and Cal.com booking orchestrations

## Reading the matrix
1. **Three industries are directory-ready** (overlay + vertical + tenant): Real Estate, Legal, HVAC. All three were built for the SSB directory (`ssb-*` overlays).
2. **Four industries have only a WordPress website** (Plumbing, Electrical, Roofing, Senior Living). The cheapest expansion is to copy the HVAC pattern: an industry overlay plus a `hvac-home-services`-style vertical. That reuses `home-services-growth-os`, which already targets three of them.
3. **Industry genomes are nearly empty** (1 real). Industry intelligence currently comes from overlays and twins, not from the genome registry.
4. **Legal is the active raw-material frontier.** Converting the license-cleared sources (LexNebulis Apache-2.0, OpenLawFirm MIT) into OVL/PK assets is the largest pending addition. AGPL and proprietary sources are reference-only.

## Legend: sources per column
- **Website template:** live Caddy snapshot (`agent.klirtrak/lib/revenue-demo-runtime/demo-live-source/live-caddyfile-snapshot.txt`, 2026-08-17)
- **Overlay:** `seeds/overlay-manufacturing-runtime/registry/overlay-registry.json`
- **Vertical/tenant:** `assets/directory-platform/{verticals,tenants}/`
- **Twins:** `assets/client-onboarding/clients/*/client-record.json` `industry` field
- **Packs/solution:** `package-factory/`
- **Rate card:** `assets/pricing-intelligence-runtime/registry/rate-card.json`
- **Demos:** `app/services/receptionist/prospect-demo-provisioner.js`, `lib/revenue-demo-runtime/demo-live-source/industry-config.js`
- **Genome:** `assets/industry-intelligence-runtime/registry/genomes/`
- **Raw material:** `law-automation-suite/raw-material/README.md`
