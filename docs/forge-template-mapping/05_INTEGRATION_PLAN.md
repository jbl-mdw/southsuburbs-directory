# 05 · Forge Integration Plan

A reuse-first plan to turn the inventoried assets into one manufacturing line. **Nothing below is implemented.** Each phase lists what it reuses, the smallest change, who must authorize it, and how it's verified. Phases are ordered so revenue comes first and shared-system risk is cleared before anything scales.

## Principles
1. **No rebuilds.** Every step extends an existing engine, registry or pack (cited).
2. **One canonical source per concept:** twin store, price, overlay registry, Caddy config, directory implementation.
3. **Tests never write live registries.**
4. **Every manufactured SKU is a registry row:** pack → platform type → engine → vertical/overlays → rate-card key → checkout offer.

## Phase 0: Production hygiene (unblocks everything; shared systems, founder authorization required)
| Step | Reuses | Change | Verify |
|---|---|---|---|
| 0.1 Caddy single source of truth | live container Caddyfile | Capture → commit to `southsuburbs-directory/Caddyfile`; one deploy procedure | `connect.leads2scale.com/v2/widget.js` returns JS after a reload |
| 0.2 Isolate tests from live registries | `client-policies.json`, overlay registry, rate card | Env-overridable registry paths for certification runs; remove `CERT_*` / `*_CERT_*` / `PROP_DIR_*` residue | Registry diff = only real tenants |
| 0.3 One price source | `rate-card.json` (canonical per `pricing-intelligence-runtime`) | Generate `marketplace-catalog.json` prices from the rate card | Catalog = rate card for every overlapping key |

## Phase 1: Sell the SSB real estate directories automatically (first revenue)
| Step | Reuses | Change | Verify |
|---|---|---|---|
| 1.1 Prices | rate card (`real-estate:rental` $299 exists) | Founder confirms/sets Solo, Brokerage, Builder, featured placement | Rate-card entries |
| 1.2 Offers | `PUBLIC_OFFERS` + `initiateCheckout()` + webhook `tenantId` handling | Add 3 directory offers + featured | Stripe test-mode checkout → tenant `ACTIVE_PAID` |
| 1.3 Trial tenant creation | `provisionTenant()` (certified) | Public, rate-limited route invoked by the intake form / Prospector | Tenant + overlay + Receptionist created in TRIAL |
| 1.4 Prospector knowledge | `ssb-prospector`, Prospector conversational engine | Load the three offers into its knowledge | Scripted conversation reaches checkout link |
| 1.5 Sales page switch | `frontend/app/zillow-buster/` (done; agent-first) | Point "Get pricing" at checkout once 1.2 is live | E2E as in `BLOCKED_INTEGRATIONS.md` |
| 1.6 Brokerage relationship / Builder entities | `real-estate` vertical config, `relationship-resolver.js` | Add brokerage→agent edge; community / floor_plan / development entity types | Vertical certification |

## Phase 2: Forge catalog (make manufacturing data-driven)
| Step | Reuses | Change |
|---|---|---|
| 2.1 SKU registry | `package-factory/registry/packages.json`, `platform-types.json`, verticals, rate card | One registry linking pack → platform type → engine → vertical/overlays → rate-card key → offer |
| 2.2 One directory implementation | `lib/directory-platform` (data/provisioning) + `modules/directory.js` (rendering) | Make the website module render from `directory-platform` data |
| 2.3 Overlay inheritance | `overlay-generator.js` | Inherit the vertical's **industry** overlay; geography from the tenant's market, not hard-coded SSB |
| 2.4 Canonical twin | Directus `business_twins` (Hermes spec) + file twins | Pick a canonical store and add a sync adapter; keep `business_twin_key` stable |
| 2.5 Next.js adapter (optional) | adapter auto-discovery in `adapters/registry.js` | Add a Next.js/static adapter so SSB-style sites can be manufactured |
| 2.6 Twin persistence | Hermes Stage 5 (certified assembly) | Persist Stage 5 output into the store chosen in 2.4 (separately approved, as Stage 5's certification requires) |
| 2.7 First Hermes executor | Stage 9 `executor-registry.js` + gateway Prospector | Register a `prospector:<action>` executor that calls the gateway; keep it behind Stage 8 authorization |
| 2.8 Product fit for directories | `seeds/lgr-products.seed.json` (Stage 6 input) | Add the three SSB directory offers with `recommended_for` tags matching twin fields; replace the file-path dependency with an API or shared package |

## Phase 3: Industry expansion (reuse the HVAC/Real Estate pattern)
| Step | Reuses | Change |
|---|---|---|
| 3.1 Plumbing, Electrical, Roofing, Restoration | `ssb-hvac-home-services` overlay + `hvac-home-services` vertical + `home-services-growth-os` + WP demos 2–4 | Clone the overlay and vertical per industry |
| 3.2 Legal products | `ssb-legal`, `legal` vertical, `law-automation-suite` raw material | Only after the license gate; start with LexNebulis (Apache-2.0) and OpenLawFirm (MIT) |
| 3.3 Industry genomes | `industry-intelligence-runtime` | Genomes for Real Estate, HVAC, Legal first |
| 3.4 Senior Living, Mortgage | WP demo6, demo-live `mortgage_finance` | Overlays when demand is proven |

## Work-stream boundaries (proposed; needs founder confirmation)
The repositories don't label work as OC1 or OC2, so this table assigns by **asset**, not by agent name.

| Asset / area | Proposed owner | Others may |
|---|---|---|
| `southsuburbs-directory` sales page + `docs/forge-template-mapping/` (this branch) | **CC** (this session) | Read |
| `law-automation-suite` legal raw material + license gate | The stream currently committing there (last 2026-10-07) | Read only |
| Gateway engines (`agent.klirtrak/lib/**`) | Gateway / manufacturing stream | Read; propose changes via the owner |
| `hermes-pipeline-runtime` (stages, certification) | Hermes stream (last commit 2026-07-26) | Read; executors and persistence via the owner |
| `shared_n8n` workflows | Founder to assign (Stripe and intake flows overlap the gateway) | Read only |
| Shared hot registries (policies, overlays, rate card), live Caddy, shared widget, gateway restarts | **One named owner** (founder to assign) | Request changes; never write directly |
| Production deploys / restarts | Founder-authorized only | — |

Coordination rule proposed: before any change to a shared hot asset, announce it in the owner's channel. Run certification against temp copies. Re-capture the live snapshot after changes (as `demo-live-source/README.md` already prescribes for Caddy).

## Authorizations required
| Phase | Requires |
|---|---|
| 0 | Founder approval (shared production systems); a named owner for the shared assets |
| 1.1 | Founder pricing decision |
| 1.2–1.4 | Founder approval to change gateway checkout/Prospector (production code) |
| 1.5 | None beyond 1.2 (frontend, this branch) |
| 2.x | Gateway owner + founder (architecture) |
| 3.2 | Legal/license review |
| n8n token rotation (`06` §3.3) | Founder: rotate inline tokens, decide on backup-repo history |
