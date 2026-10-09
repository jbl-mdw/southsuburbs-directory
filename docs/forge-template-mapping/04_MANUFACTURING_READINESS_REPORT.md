# 04 · Manufacturing Readiness Report

Readiness of each template family for **automated** manufacture: order → provision → deliver without human assembly.

Levels:
- **Ready**: works end to end from existing code; evidence of production use.
- **Ready-with-gaps**: works, but at least one link is manual.
- **Partial**: core exists; a required link is missing.
- **Not started.**

Certification suites were **read, not executed**; live systems were not reachable.

## 1. Summary

| Template family | Readiness | Evidence | Smallest next step |
|---|---|---|---|
| AI Receptionist (any industry) | **Ready** | Public checkout offer `lgr-receptionist`, rate card $497, `onboardClient()` on webhook, live Twilio line (+1 708-847-4211), certified overlays | Reconcile catalog vs rate-card price |
| Missed Call Text Back | **Ready** | Public offer + rate card $297 + capability entitlement | — |
| FSBO paid listing (SSB) | **Ready** | Public offer `fsbo-standard-listing` + rate card $49 + webhook activates listing | Restore the `/submit-fsbo` route on SSB (linked but missing) |
| Real estate directory tenant (Solo Agent) | **Partial** | `provisionTenant()` certified; rate card `real-estate:rental` $299; webhook flips TRIAL→ACTIVE_PAID | (1) Founder confirms price; (2) add a `PUBLIC_OFFERS` entry; (3) add a non-test caller for `provisionTenant()` from intake or the Prospector; (4) automate domain routing |
| Brokerage directory | **Partial** | Same platform; `agent_lists_property` exists | Brokerage→agent relationship (declared gap); offer + price |
| Builder / Developer directory | **Not started** (as product) | Vertical has no community/floor-plan entity types | Add entity types to the `real-estate` vertical config; offer + price |
| Featured marketplace placement | **Partial** | Monetization surface `re-featured-placement` + `slot-inventory.js` allocation exist | Offer + price; SSB `/real-estate` must sort by featured status (it sorts by name) |
| Static business website / landing page | **Ready-with-gaps** | `commercial-platform-manufacturing` (8 types) + `website-rendering/deployment/activation` runtimes certified | Hosting/domain step is manual; no Next.js adapter |
| WordPress / WooCommerce site | **Ready-with-gaps** | `wordpress-woocommerce` adapter + 7 live WP demo containers | WP themes and content weren't found in the inspected repositories; container provisioning is manual |
| Smart Website pack | **Ready-with-gaps** | Package + pack + manifest task chain | Price disagreement ($2,997 catalog, no rate-card key) |
| Home Services Growth OS (solution) | **Partial** | Solution file (5 industries, 8 packages, one-click) | Overlays and verticals exist only for HVAC; plumbing, electrical, roofing and restoration need overlays |
| Legal products (OVL/PK/DOC/PORTAL) | **Partial / in flight** | `ssb-legal` overlay, `legal` vertical, legal tenant; `law-automation-suite` raw material | License gate; only LexNebulis (Apache-2.0) and OpenLawFirm (MIT) are reusable |
| Industry genome-driven manufacturing | **Not started** | 1 real genome (NAICS 72) | Populate genomes for the 3 directory-ready industries |
| Business Twin (single source) | **Partial** | 81 file twins + Directus spec/runtime | Choose the canonical store; sync or migrate |
| Onboarding automation | **Ready** | 10-step `onboardClient()` called from the Stripe webhook | — |

## 2. SSB real estate directories: what blocks automated sale today
The order is the critical path; each step reuses existing code:
1. Founder pricing for Solo / Brokerage / Builder and featured placement (rate card is the source of truth; checkout refuses unpriced offers).
2. `PUBLIC_OFFERS` entries mapping each offer to a rate-card key, with `tenantId` and `intendedLifecycleState` in checkout metadata (the webhook already handles these).
3. A trial-tenant creation path calling `provisionTenant()` (intake form or Prospector hand-off), so checkout has a `tenantId` to activate.
4. Domain connection: today a manual Caddy edit, and blocked by the Caddy split-brain (see `../zillow-buster/INCIDENT_AND_SALES_AUTOMATION_REPORT.md` A2).
5. Prospector knowledge of the three offers (`ssb-prospector`).
The sales page already routes visitors to the Prospector and keeps the intake form as a fallback (`../zillow-buster/BLOCKED_INTEGRATIONS.md`).

## 3. Quality and hygiene risks to manufacturing
| Risk | Evidence | Effect on Forge |
|---|---|---|
| Certification tests write live registries | `client-policies.json` `CERT_*` entries; overlay registry ~35 `*_CERT_*` / `PROP_DIR_*` tenants; `test-golden-path-002` overwrites the live policy file | Manufactured artifacts mixed with test residue; lost updates |
| Hard-coded SSB inheritance | `overlay-generator.js`: every tenant inherits `ssb-local-business-directory` | Wrong geography for non-SSB markets |
| Conflicting price sources | catalog vs rate card | A wrong price can be quoted by AI employees or the catalog |
| Two directory implementations | `modules/directory.js` vs `lib/directory-platform` | Divergent directory output |
| Two twin stores | file twins vs Directus `business_twins` | Inconsistent personalization |
| Manual deploy steps | Caddy edits via `docker exec`; gateway restarts needed for backend changes | Manufacturing can't be fully automatic |

## 4. Shared, hot-reloaded assets that need one owner
These are touched by several work streams, and a change reaches production immediately:
- `agent.klirtrak/config/client-policies.json` (hot reload, deny-by-default)
- `seeds/overlay-manufacturing-runtime/registry/overlay-registry.json`
- `assets/pricing-intelligence-runtime/registry/rate-card.json`
- `ssb_caddy` live Caddyfile (diverged from git)
- `app/public/v2/widget.js` (shared by every site)
- `lgr_connect_gateway` container (single point of failure; manual restarts)

The INCIDENT report recommends the founder assign a single owner and change procedure for each.
