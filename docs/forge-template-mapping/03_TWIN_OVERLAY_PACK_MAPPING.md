# 03 · Business Twin / Overlay / Pack Mapping

How LGR's existing building blocks compose into a manufactured product, verified from code, with the SSB real estate directories as the worked example.

## 1. The composition model (as implemented)

```
Business Twin           who the business is      client-record.json businessTwin (17 sections) ── or ── Directus business_twins (Hermes Stage 5)
   + Overlays           how it behaves           industry · geography · business-model · platform · channel · ai-employee-behavior
   + Pack(s)            what is sold/activated   package-factory packs/packages (activation, trial, licensing lifecycle)
   + Platform type      what is built            commercial-platform-manufacturing: platform type → modules → adapter
   + Vertical (directories only)                 directory-platform vertical: entity types, monetization surfaces, intent families
   ─────────────────────────────────────────────
   = Provisioned product   tenant / client record + AI employee (Flowise chatflow + client policy) + deployment plan
```

| Building block | Canonical home | Instances today | Key consumer |
|---|---|---|---|
| Business Twin (file) | `lib/client-onboarding-engine` → `assets/client-onboarding/clients/<CL-id>/client-record.json` | 81 | `onboardClient()`, `provisionTenant()`, `provision-ai-employee.js` (`business_twin_key`) |
| Business Twin (Directus) | `lgr-architecture` Hermes Stage 5; `lib/runtime/business-twin/BusinessTwinRuntime.js` | Unverified (DB not reachable) | Hermes pipeline, scoring |
| Overlays | `seeds/overlay-manufacturing-runtime/registry/overlay-registry.json` | 65 (≈35 test residue) | AI employees, directory tenants |
| Packs | `package-factory/packs` (14), `packages` (19), `solutions` (1) | — | Activation runtime (RT-14), installers |
| Platform types | `lib/commercial-platform-manufacturing/platform-types.json` | 8 types, 25 modules, 2 adapters | Website/landing/directory/commerce manufacturing |
| Verticals | `assets/directory-platform/verticals` | 3 | `provisionTenant()` |

## 2. What `provisionTenant()` actually composes (verified, `lib/directory-platform/provision-tenant.js`)
1. **Twin:** creates or reuses a client record keyed `directory-platform-tenant-<tenantId>`. Business type is "Vertical directory (rented, tenant-branded)"; services, audiences and objectives come from the vertical.
2. **Overlay:** `ai-employee-behavior-tenant-<tenantId>` (`overlay-generator.js`). It **inherits `ssb-local-business-directory` + `platform-directory`** and copies the vertical's intent families and monetization surfaces inline. It does **not** inherit the vertical's industry overlay (`ssb-real-estate` etc.).
3. **AI employee:** `provisionReceptionist()` creates a Flowise chatflow, a Directus tenant and a `client-policies.json` binding.
4. **Tenant record:** owner, brand (name, logo, colors), **domain/subdomain**, market/territory, inventory scope, enabled entity types and categories, enabled AI employees, monetization surfaces, Stripe fields (product name, `subscriptionPriceRateCardKey`, trial days), lead routing, lifecycle `TRIAL`.
5. **Slots:** premium slot capacities per market (`slot-inventory.js`).
6. **On payment:** the Stripe webhook flips the tenant to `ACTIVE_PAID` (`checkout-orchestration.js`).

## 3. Worked example: the three SSB directory products

| Element | Solo Agent Directory | Brokerage Directory | Builder / Developer Directory |
|---|---|---|---|
| Platform type | `directory` | `directory` | `directory` (+ `landing-page` for community pages) |
| Vertical | `real-estate` | `real-estate` | `real-estate` |
| Entity types used | `agent`, `property` | `brokerage`, `agent`, `property` | **No `community` / `floor_plan` / `development` entity types exist** |
| Relationships | `agent_lists_property` (exists) | **brokerage→agent: declared gap** (`ssbVertical.ts` `brokerage.resolved=false`) | — |
| Business Twin | tenant twin from `provisionTenant()` | same | same |
| Overlays | tenant AI-behavior overlay ⟵ `ssb-local-business-directory` + `platform-directory`; industry `ssb-real-estate` (not inherited, see §2) | same | same |
| Packs | `directory` (+ `premium-directory` for featured) | `directory`, `premium-directory` | `directory` |
| AI employees | Receptionist (provisioned per tenant); SSB Prospector sells it (`ssb-prospector`) | same | same |
| Rate card key | `directory-platform:real-estate:rental` ($299/mo, **founder approval unconfirmed**) | none | none |
| Checkout offer (`PUBLIC_OFFERS`) | **missing** | **missing** | **missing** |
| Marketplace inclusion | `shared_inventory` / normal rotation (SSB Directus) | same | same |
| Featured placement | monetization surface `re-featured-placement` + `slot-inventory` (exists); **no offer/price** | same | same |
| Custom domain | tenant `domain` field (stored); routing is a manual Caddy edit | same | same |

## 4. Mapping gaps found
1. **Two Business Twin stores** (file client records vs Directus `business_twins`), with no verified sync. Forge needs one canonical twin id.
2. **Industry overlay not inherited** by manufactured tenants. Every tenant inherits SSB's *geography* overlay regardless of market, so a non-SSB market would inherit the wrong geography.
3. **Overlay registry polluted** with ~35 test tenants (`RE_CERT_*`, `LEGAL_CERT_*`, `PROP_DIR_*`); `client-policies.json` likewise (`CERT_*`).
4. **Builder/Developer** has no entity types; **Brokerage** lacks the brokerage→agent relationship.
5. **Pricing has three disagreeing sources:**
   - `marketplace-catalog.json`: AI Receptionist $2,997/mo + $997
   - `rate-card.json`: LGR Receptionist $497/mo
   - founder-approved directory prices: none recorded
6. **Packs ↔ platform types aren't linked, and there are two directory implementations (verified).** No pack or package under `package-factory/` (nor `lib/canonical-pack-framework`) references a platform type. The website engine's `modules/directory.js` (`commercial-platform-manufacturing`) doesn't use `lib/directory-platform`: it renders a directory section from twin evidence, while `directory-platform` owns the real tenant, entity and monetization data. Forge needs one registry row linking pack → platform type → engine.
