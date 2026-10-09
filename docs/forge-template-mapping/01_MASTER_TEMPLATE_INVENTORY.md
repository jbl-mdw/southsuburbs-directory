# 01 · Master Template Inventory

Everything LGR can already manufacture from, grouped by template family. Paths are relative to the named repository (default: `agent.klirtrak`). Status vocabulary: see README.

## 1. Master template engine: `lib/commercial-platform-manufacturing` (HM-PLATFORM-001, Certified)
This is the closest thing to a **master template system** in the codebase: a framework-independent manufacturing core, `manufacture.js`, that assembles a **platform type** from **modules** and renders it through an **output adapter**.

**Platform types** (`platform-types.json`, 8):
| Platform type | Required modules |
|---|---|
| `business-website` | design-system, navigation, hero, cta, trust-bar, testimonials, faq, forms, pricing, blog, seo, conversion, analytics, ai-workforce, business-twin, automation, security, deployment, page-content-planner |
| `landing-page` | design-system, hero, cta, trust-bar, testimonials, forms, pricing, seo, conversion, analytics, security, deployment |
| `directory` | design-system, navigation, directory, seo, analytics, ai-workforce, security, deployment |
| `woocommerce-website` | business-website set minus pricing/blog/planner, **plus commerce** |
| `affiliate` | design-system, navigation, affiliate, blog, seo, analytics, security, deployment |
| `membership` | design-system, navigation, membership, forms, seo, analytics, business-twin, security, deployment |
| `saas-marketing` | design-system, navigation, hero, cta, saas-docs, testimonials, faq, forms, seo, conversion, analytics, security, deployment |
| `media` | design-system, navigation, media, blog, seo, analytics, security, deployment |

**Modules** (`modules/`, 25): affiliate, ai-workforce, analytics, automation, blog, business-twin, commerce, conversion, cta, deployment, design-system, directory, faq, forms, hero, media, membership, navigation, page-content-planner, pricing, saas-docs, security, seo, testimonials, trust-bar.

**Output adapters** (`adapters/`, auto-discovered): `static-html`, `wordpress-woocommerce`. A Next.js adapter does **not** exist, though SSB's own frontend is Next.js.

## 2. Website and landing-page templates outside the engine
| Asset | Location | Status | Notes |
|---|---|---|---|
| WordPress industry demo sites | containers `wp_demo1_web`, `wp_wp-demo2..7_web` (live Caddy snapshot `lib/revenue-demo-runtime/demo-live-source/live-caddyfile-snapshot.txt`) | Live (per 2026-08-17 snapshot) | hvac→demo1, plumbing→demo2, electrical→demo3, roofing→demo4, legal→demo5, seniorliving→demo6, demo7 = unmapped. **Theme/content not in git** |
| Offers site (Prospector + Closer) | `offers.leadsgrowrevenue.com` (WordPress `lgr_offers_web`) | Live (commit `f5cee53`) | Prospector "Money Green" skin; page config not in git |
| Static revenue demo | `/opt/demo-live` mirrored in `lib/revenue-demo-runtime/demo-live-source/` | Live | Signed campaign-token personalized demos; `industry-config.js` covers general, mortgage_finance, real_estate_agent |
| Smart Website package | `package-factory/packages/smart-website`, `packs/smart-website`, `manifests/smart-website.manifest.json` | Certified pack | Install/configure/verify task chain |
| Service templates | `package-factory/templates/`: `website-service.json`, `core-runtime.json`, `client-success-runtime.json`, `review-management-service.json` | Present | Package scaffolds |
| SSB directory consumer site | `southsuburbs-directory/frontend/` (Next.js 14) | Live (SSB) | Home, categories, cities, business profiles, `/real-estate` property search/detail/showing requests, blog |
| SSB directory sales page | `southsuburbs-directory/frontend/app/zillow-buster/` | Branch only | Sales landing page; AI sales agent conversion |

## 3. Ecommerce, checkout and catalog
| Asset | Location | Status | Notes |
|---|---|---|---|
| WooCommerce platform type + adapter | `lib/commercial-platform-manufacturing` (`woocommerce-website`, `adapters/wordpress-woocommerce.js`, `modules/commerce.js`) | Certified | |
| Stripe checkout orchestration | `lib/integration-runtime/orchestration/checkout-orchestration.js` + `app/server.js` `POST /v1/public/checkout` | Live | Webhook calls the 10-step `onboardClient()`, grants entitlements, flips directory tenant to `ACTIVE_PAID` / activates paid listings |
| Public offers | `app/server.js` `PUBLIC_OFFERS` | Live | **Only 3:** `lgr-receptionist`, `fsbo-standard-listing`, `missed-call-text-back` |
| Rate card | `assets/pricing-intelligence-runtime/registry/rate-card.json` | Live | 4 entries incl. **`directory-platform:real-estate:rental` $299/mo** (added in `e90fc86`, "Real Estate production proof") and FSBO $49 |
| Marketplace catalog | `package-factory/marketplace-catalog.json` | Present | 11 products (AI Receptionist, Appointment Booking, CRM Automation, Customer Reactivation, Executive Assistant, Free Estimate Machine, Missed Call Text Back, Proposal Engine, Prospector, Review Management, Smart Website); most listed at $2,997/mo + $997 setup; **conflicts with the rate card** (Receptionist $497/mo) |

## 4. Directory templates
| Asset | Location | Status | Notes |
|---|---|---|---|
| Directory Product Platform | `lib/directory-platform/` (vertical-registry, tenant-registry, entity-store, overlay-generator, **provision-tenant**, slot-inventory, relationship-resolver, property-schema) | Certified, Live for SSB | `provisionTenant()` = Business Twin + overlay + tenant + slots + Receptionist + domain record + Stripe fields, TRIAL lifecycle |
| Verticals | `assets/directory-platform/verticals/` | Certified | `real-estate` (10 entity types, 9 monetization surfaces incl. featured placement and FSBO), `legal` (attorney, law_firm), `hvac-home-services` (contractor) |
| Tenants | `assets/directory-platform/tenants/` | Present | `RE_TENANT_001`, `LEGAL_TENANT_001` |
| Directory packs | `package-factory/packs/directory`, `premium-directory`, `marketplace` | Certified packs | Activation/trial/licensing lifecycle |
| SSB directory projection | `lib/directory-projection` (1 file), SSB Directus `businesses.directory_scope/shared_inventory` | Partial | |
| "SSB Master Directory Template" | — | **Not found as a named artifact** | The de-facto master is `directory-platform` (data and provisioning) + the SSB Next.js frontend (presentation) |

## 5. Industry overlays and intelligence
| Asset | Location | Status | Notes |
|---|---|---|---|
| Overlay registry | `seeds/overlay-manufacturing-runtime/registry/overlay-registry.json` | Certified | **65 overlays:** industry 3 (`ssb-real-estate`, `ssb-legal`, `ssb-hvac-home-services`), geography 1 (`ssb-local-business-directory`), business-model 1 (`solo-operator`), platform 2 (`platform-directory`, `platform-leads-grow-revenue`), channel 14, AI-employee behavior 44 (**~35 are certification-test residue**: `RE_CERT_*`, `LEGAL_CERT_*`, `PROP_DIR_*`) |
| Industry taxonomy | `lib/industry-intelligence-runtime/taxonomy`, `assets/industry-intelligence-runtime/registry` | Certified | NAICS/SIC/ISIC/GICS seeds, 63 taxonomy + 36 crosswalk records |
| Industry genomes | same, `registry/genomes` | Thin | **2 genomes** (`naics:72` + one test) |
| Legal raw material | `law-automation-suite/raw-material/{openlawfirm,coil,canary,lexnebulis,openagreements}` | Reference-only (license-gated) | Tagged for OVL / PK / BT / FORGE / REC / DOC / PORTAL; only LexNebulis (Apache-2.0) and OpenLawFirm (MIT) are permissive |

## 6. Business Twin
| Asset | Location | Status | Notes |
|---|---|---|---|
| Canonical spec | `lgr-architecture/specifications/hermes-intelligence-pipeline/stage5-business-twin-assembly.md` | Spec | `business_twins` row + domain tables (seo_audit, commercial_intelligence, competitor_intelligence), `overallScore` |
| Directus twin runtime | `lib/runtime/business-twin/BusinessTwinRuntime.js` | Present | Reads Directus `business_twins` |
| Onboarding twins | `lib/client-onboarding-engine/` + `assets/client-onboarding/clients/*/client-record.json` | Live | **81 records** (64 HVAC, mostly prospect demos); 17 twin sections (services, audiences, objectives, geography, website, revenueIntelligence, reputation, brandVoice, sellablePacks, seoIntelligence, offerIntelligence, contact, …) |
| Twin manufacturer job | `seeds/hermes-manufacturing/jobs-universal-twin-manufacturer.js` | Present | |
| **Two twin stores** | Directus `business_twins` vs file-based `client-record.json` | **Gap** | AI-employee provisioning binds to the file twin id (`business_twin_key: CL-…`) |

## 7. Packs, solutions and AI employees
| Asset | Location | Count / status |
|---|---|---|
| Packages | `package-factory/packages/` | 19: ai-receptionist, appointment-booking, asset-intelligence-runtime, business-twin-runtime, client-success-runtime, crm-automation, customer-reactivation, executive-assistant, executive-runtime, free-estimate-machine, guided-decision-runtime, missed-call-text-back, opportunity-runtime, proposal-engine, prospector, receptionist-runtime, revenue-runtime, review-management, smart-website |
| Packs | `package-factory/packs/` | 14: advertising, ai-receptionist, asset-intelligence, directory, estimates, executive-assistant, follow-up, lead-intelligence, marketplace, premium-directory, prospector, review-management, seo, smart-website |
| Solutions | `package-factory/solutions/` | 1: `home-services-growth-os` (hvac, plumbing, electrical, roofing, restoration; 8 packages; one-click provisioning) |
| Installers | `package-factory/installers/` | create-package, install-package, install-solution |
| AI-employee agents in production policy | `config/client-policies.json` | LGR: lgr-receptionist, lgr-prospector; SSB: ssb-prospector; Closer (add-on) |

## 8. Automation templates
| Asset | Location | Notes |
|---|---|---|
| 10-step onboarding pipeline | `lib/client-onboarding-engine/modules/01…10` | proposal+payment → client record → twin → provision services → deployment plan → AI workforce → activation tasks → client portal → welcome comms → deployment handoff |
| Connectors | `lib/integration-runtime/connectors/` | cal-com, flowise, google-places-reviews, imap, knowledge-source, linki, smtp, stripe, twilio (+ planned) |
| Orchestrations | `lib/integration-runtime/orchestration/` | booking, checkout, universal-provisioning |
| Runtime seeds | `seeds/` (20) | activation, asset-intelligence, client-success, commercial-intelligence, dynamic-offer, executive-assistant(-runtime), executive, governance-quality, hermes-manufacturing, market-intelligence, overlay-manufacturing, platform-registries, product-manufacturing, prospector, provider-lifecycle, revenue, solution-provisioner |
| n8n | `shared_n8n` container; `southsuburbs-directory/n8n-lead-submission-workflow.json`; repo `n8n-workflow-backups` (not inspected) | Unverified beyond the SSB workflow |
| Flowise chatflows | `rollback/lgr-template-chatflow-CERTIFIED-2026-08-16….json` | Certified template chatflow snapshot |

## 9. Full engine inventory (`agent.klirtrak/lib/`, 55 directories)
Generated from each engine's `manifest.json` (capability, version) and count of certification/test files.

### Website & landing-page manufacturing

| Engine (`lib/…`) | Version | Cert. files | Capability (from manifest) |
|---|---|---|---|
| `commercial-platform-manufacturing` | 1.0.0 | 2 | Universal Commercial Platform Manufacturing Runtime (HM-PLATFORM-001) |
| `website-rendering-runtime` | 1.0.0 | 2 | Canonical Website Rendering Runtime (HM-RENDER-001) |
| `website-deployment-runtime` | 1.0.0 | 2 | Canonical Commercial Website Deployment Runtime (HM-WEB-001) |
| `website-activation-runtime` | 1.0.0 | 2 | One-Click Commercial Website Activation Runtime (HM-LIVE-001) |
| `commercial-page-manufacturing-runtime` | 1.0.0 | 2 | Client-Branded Commercial Page Manufacturing Runtime (HM-PAGE-001) |
| `commercial-experience-composer` | 1.0.0 | 3 | Commercial Intelligence & Commercial Experience Composer (HM-CIO-001) |
| `deployment-runtime` | 1.1.0 | 2 | Zero-Configuration Commercial Deployment Runtime (HM-DEPLOY-001) |
| `content-manufacturing` | — | 1 | (no manifest) |

### Ecommerce, pricing & offers

| Engine (`lib/…`) | Version | Cert. files | Capability (from manifest) |
|---|---|---|---|
| `pricing-intelligence-runtime` | 1.1.0 | 2 | Dynamic Pricing & Proposal Intelligence Runtime (HM-PRICING-001) |
| `personalized-offer-composer` | 1.0.0 | 2 | Personalized Offer Composer (HM-PRICING-001) |
| `integration-runtime` | 1.7.0 | 8 | Universal Integration Runtime (HM-INTEGRATIONS-001+002 + HM-KM-002 knowledge_source category) |
| `revenue-event-ledger` | 1.1.0 | 2 | Revenue Event Ledger (HM-FCP-001) |
| `revenue-commercial-events` | 1.0.0 | 2 | Revenue Commercial Events (HM-RCE-001) |
| `usage-metering` | — | 5 | (no manifest) |

### Directory

| Engine (`lib/…`) | Version | Cert. files | Capability (from manifest) |
|---|---|---|---|
| `directory-platform` | 1.1.0 | 4 | Canonical Directory Product Platform (DIRECTORY-PRODUCT-SCOPE-001) - Vertical Configuration + Tenant Registry + Entity Store, composing existing overlay/Flowise/Stripe/on |
| `directory-projection` | — | 0 | (no manifest) |

### Industry, overlays & intelligence

| Engine (`lib/…`) | Version | Cert. files | Capability (from manifest) |
|---|---|---|---|
| `industry-intelligence-runtime` | 1.0.0 | 2 | Industry Intelligence Runtime (HM-IIR-001) |
| `keyword-intelligence-core` | — | 10 | (no manifest) |
| `commercial-presence-intelligence` | 1.0.0 | 2 | Commercial Presence Intelligence Runtime (HM-PRESENCE-001) |
| `commercial-intelligence-ingestion` | 1.1.0 | 3 | Continuous Commercial Intelligence Ingestion System (HM-CIK-001) |
| `commercial-knowledge-graph` | 1.0.0 | 2 | Commercial Intelligence Knowledge Graph & Recommendation Runtime (HM-CIK-003) |
| `commercial-knowledge-manufacturing` | 1.0.0 | 2 | Commercial Knowledge Manufacturing (HM-CIK-004) |
| `commercial-intelligence-audit` | 1.0.0 | 2 | Commercial Intelligence Audit Manufacturing Runtime (HM-AUDIT-001) |
| `knowledge-manufacturing-platform` | 1.7.0 | 8 | Knowledge Manufacturing Platform (HM-KMP-001+002+003+004 + HM-KM-001+002+003) |
| `universal-intelligence-engine` | 1.0.0 | 2 | Universal Intelligence Engine Foundation (HM-UIE-001) |
| `universal-reasoning-engine` | 1.0.0 | 2 | Universal Reasoning Engine (HM-URE-001) |
| `business-discovery-engine` | 1.0.0 | 3 | Universal Business Discovery Engine (HM-ONB-001) |
| `lead-data-intake` | 1.0.0 | 2 | Lead Data Intake & Intelligence Pipeline (HM-LDI-001) |

### Business Twin & onboarding

| Engine (`lib/…`) | Version | Cert. files | Capability (from manifest) |
|---|---|---|---|
| `client-onboarding-engine` | 1.1.1 | 3 | Automated Client Onboarding Engine (HM-OB-001) |
| `runtime` | — | 11 | (no manifest) |

### Packs, AI employees & capabilities

| Engine (`lib/…`) | Version | Cert. files | Capability (from manifest) |
|---|---|---|---|
| `canonical-pack-framework` | 1.3.0 | 2 | Canonical Pack Framework (HM-PACK-001) |
| `commercial-deployment-packs` | 1.0.1 | 2 | Commercial Deployment Packs (HM-PACK-004) |
| `capability-lifecycle` | 1.0.0 | 2 | Capability Lifecycle Interface (HM-PACK-002) |
| `ai-employee-framework` | 1.0.0 | 2 | Canonical AI Employee Framework (HM-PACK-003) |
| `ai-employee-provisioning` | — | 1 | (no manifest) |
| `ai-employee-training` | — | 1 | (no manifest) |
| `receptionist-skillset-framework` | 1.3.0 | 1 | Canonical Receptionist Intelligence (LGR-RECEPTIONIST-CANONICAL-INTELLIGENCE-001) - Business Twin + Behavioral Overlay + Skillsets |
| `agent-operations-portal` | 0.3.0 | 2 | Agent Operations Portal - Registry, Builder, Configuration & Operations (HM-AOP-001 P0+P1+P2) |

### Demos & revenue experiences

| Engine (`lib/…`) | Version | Cert. files | Capability (from manifest) |
|---|---|---|---|
| `demo-manufacturing-engine` | 1.0.0 | 2 | Demo Manufacturing Engine (HM-DME-001) |
| `revenue-demo-runtime` | — | 9 | (no manifest) |
| `receptionist-demo-runtime` | — | 3 | (no manifest) |
| `revenue-manufacturing` | — | 5 | (no manifest) |
| `revenue-narrative-engine` | 1.0.1 | 2 | Revenue Narrative Engine (HM-RNE-001) |
| `revenue-intelligence-engine` | 1.0.0 | 2 | Revenue Intelligence & Opportunity Engine (HM-REV-001) |
| `missed-call-recovery` | — | 1 | (no manifest) |
| `review-ai-runtime` | — | 0 | (no manifest) |
| `commercial-asset-engine` | 1.0.0 | 2 | Commercial Asset Engine (HM-CAE-001) |
| `manufacturing-engine` | — | 0 | (no manifest) |

### Founder, governance & operations

| Engine (`lib/…`) | Version | Cert. files | Capability (from manifest) |
|---|---|---|---|
| `founder-experience-layer` | 1.6.0 | 5 | Founder Experience Layer (HM-FEL-001) |
| `founder-operating-system` | 1.1.0 | 2 | Founder Operating System - I AM THE MONEY (HM-FD-001) |
| `fleet-operations-feed` | 1.0.0 | 2 | Fleet Operations Feed (HM-FEL-002) |
| `governance` | — | 17 | (no manifest) |
| `ai-provider-resilience` | 1.0.0 | 2 | AI Provider Resilience (HM-OPS-001) |
| `hm-aud-002-demo-platform-audit` | 1.0.0 | 2 | Demo Platform Provider-Independent Discovery (HM-OPS-002) |
| `security` | — | 0 | (no manifest) |
