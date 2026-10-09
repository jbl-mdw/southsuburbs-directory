# 06 · Extended Sources: Hermes Runtime, n8n Backups, Stub Repositories

Second inspection pass over the nine repositories the first pass listed as "not inspected". All were cloned read-only; none was modified. Certification suites were **read, not executed**.

## 1. Summary

| Repository | Commit / date | What it holds | Forge relevance |
|---|---|---|---|
| `hermes-pipeline-runtime` | `6299181` · 2026-07-26 | Working 10-stage Hermes pipeline kernel (HIPR v2.0) with per-stage certification evidence | **High.** It is the Business Twin *assembly* line Forge would consume |
| `n8n-workflow-backups` | `6e43b34` · 2025-10-27 | Nightly JSON exports of the `shared_n8n` instance (2025-06-14 → 2025-10-27) | **Medium.** Lead-intake and scraping templates, not site templates |
| `nextjs-medusa-visual-builder` | plan only | README + DEV_HANDBOOK for a Next.js + Medusa + Directus "sections" storefront (outdoor furniture / sauna), n8n + Flowise planned | Low. Design reference for a future ecommerce adapter; no code |
| `hoa-connect-directory-app` | plan only | README for an HOA PWA that embeds an SSB business directory | Low. Possible future directory consumer; no code |
| `firecrawl-ingestion-engine` | plan only | README plan | None. Firecrawl is already live as Hermes UC-16 |
| `ssb-pages` | empty | `.gitignore` only | None |
| `universal-content-engine` | empty | `.gitignore` only | None |
| `site-cloner` | empty | empty README | None |
| `localrank-ai` | empty | empty README | None |

**Bottom line:** none of the stub repositories holds a template. The two substantive sources are the Hermes runtime (twin manufacture) and the n8n backups (lead-intake automations). Neither changes the readiness of the SSB directory products in `04`.

## 2. `hermes-pipeline-runtime`

### 2.1 What it is
- Standalone Node service (`src/server.js`, default port 4000; dependencies `pg` and `js-yaml`). It executes the pipeline declared in `manifests/hermes-intelligence.yaml`.
- Separate from the gateway. Specifications live in `lgr-architecture`; product runtimes such as the Receptionist live in the gateway.
- Known runtime limits, per its own README:
  - The checkpoint store is in-memory only.
  - The `PARALLEL`, `CONDITIONAL` and `OPTIONAL` execution policies are parsed but run sequentially.
- **The README is stale.** It says Stages 2–10 have no implementation, but `src/stages/` holds real code for all ten stages, and `certification/stage2…stage10` record active certification. The evidence below comes from the code and certification folders.

### 2.2 Stage status (from `certification/*/certification-result.md`)
| # | Stage | Code | Certification (own wording) | Stated scope limit |
|---|---|---|---|---|
| 1 | Discovery | 294 lines | ACTIVELY CERTIFIED, 8/8 real Firecrawl + Census checks on the production server (2026-07-25) | Website producer is single-page; GBP, Social, Review and Directory producers not built |
| 2 | Extraction | 128 | ACTIVELY CERTIFIED | — |
| 3 | Classification | 161 | ACTIVELY CERTIFIED | — |
| 4 | Intelligence Generation | 169 | ACTIVELY CERTIFIED, *Business Intelligence generator only* | SEO, commercial and market generators absent; market-competitor blocked |
| 5 | **Business Twin Assembly** | 261 | ACTIVELY CERTIFIED, *assembly logic only, no persistence* | Does not write to Postgres "by explicit architectural decision"; persistence is a future, separately approved step |
| 6 | Opportunity Scoring | 243 | Certified, all criteria PASS | Scores "not yet determinable" until domain generators exist. Reads the product catalog from `LGR_PRODUCT_CATALOG_PATH` (default `/opt/lgr-connect-gateway/seeds/lgr-products.seed.json`), a cross-repo file dependency |
| 7 | Workforce Orchestration | 469 | ACTIVELY CERTIFIED, *Prospect Mode only* | Customer Mode dormant. Notes that all 10 real `business_twins` rows have status `prospect` and a null `licenseKey` |
| 8 | Decision Engine | 331 | CERTIFIED (Prospector automatic mode; Receptionist missing-policy path) | — |
| 9 | Next Best Action / Execution | 540 | CERTIFIED, *dispatch contract only* | **Executor registry is empty.** Every real dispatch resolves to a "missing executor" block |
| 10 | Continuous Learning | 679 | CERTIFIED, 10/10 tests against real Postgres | — |

### 2.3 What this means for Forge
1. **Twin manufacture exists but stops short of storage.** Stages 1–5 can assemble a Business Twin from a domain with provenance and idempotency. Stage 5 does not persist it, so the Directus `business_twins` table (10 prospect rows) is not filled by this runtime. Choosing a canonical twin store (`05` step 2.4) has to include Stage 5 persistence.
2. **The pipeline can't act yet.** Stage 9 has no executors, so a decision such as "Prospector: send offer" never reaches the gateway. The gateway's client records say the same thing from the other side: "Prospector is a hermes-pipeline-runtime worker (Stage 9 dispatch target), a different platform."
3. **Product fit is blind today.** Stage 6 reads the gateway's product seed by file path. No twin field maps to a catalog `recommended_for` tag yet, so every product scores "Insufficient Evidence". Adding the three SSB directory offers to that catalog with `recommended_for` tags is the cheapest way to make Hermes recommend them.
4. **Not a duplicate of the gateway's `seeds/hermes-manufacturing`.** That gateway seed is a build controller and queue that manufactures *runtimes* (blueprints, build runner, Firecrawl researcher). This repo *executes* the intelligence pipeline. They share a name, not code.

## 3. `n8n-workflow-backups`

### 3.1 What it is
- `backup.sh` exports every workflow of the `shared_n8n` instance nightly into `workflows_<timestamp>.json/` directories, one JSON per workflow. There are 137 snapshot directories, the last on 2025-10-27, which is **about 10 months older** than the gateway work inspected in `01`.
- 48 distinct workflow names across all snapshots; 20 in the last one, 4 of them active.

### 3.2 Last snapshot (2025-10-27), grouped by purpose
| Group | Workflows (active = ●) | Forge relevance |
|---|---|---|
| Lead intake / CRM | ● **HS Master-Intake - Flow** (webhook → lead score → hot/warm route → GoHighLevel contact + Sheets dashboard) | **Reusable pattern** for Home Services intake; overlaps the gateway's `/v1/public/directory-lead` + Receptionist path |
| Billing events | ● **Stripe Event _Recreate** (webhook, 76 nodes; maps each Stripe status to a CRM contact tag; begins with a mock-data node) | Superseded by the gateway's Stripe webhook + `onboardClient()`; **do not run both** against the same Stripe account |
| Prospect data | ● **Master Scraper** (industry config → Maps search → classify → contact extract → Sheets), Google Maps Scraper | Overlaps Hermes Stage 1 Discovery and gateway prospecting; reference only |
| SEO / content | AI_Powered SEO Keyword Research Automation (DataForSEO + OpenAI + NocoDB) | Candidate input for the missing Stage 4 SEO generator |
| Industry ops | Assisted LIving (facility shift schedules, Postgres), HOA Pain Points (Reddit/Gmail → Sheets) | Industry research for Senior Living and HOA; not templates |
| KlirTrak (attendance / staff time) | ● KlirTrak_Staff Time Monitorv1 and 6 more | Separate product line; out of Forge scope |
| Personal / misc | AI Personal Assistant, Yahoo Email Cleaner, Money_Minder, Order_Brain, Line _Boss, Create MCP Server, KlirTrak_Duplicate Entry | None |

Removed before the last snapshot (28 names): mostly KlirTrak/ClearTrack iterations, test flows (`WF1`, `My workflow`, `SMTP Testing`), plus `LGR - Aminos AI Automation Intake` and `Short-Form Video` (both last seen 2025-09-24).

**No website, landing-page, directory or onboarding template lives in n8n.** The only SSB-specific n8n asset remains `southsuburbs-directory/n8n-lead-submission-workflow.json`, which was already in `01`.

### 3.3 Security finding (values not reproduced)
406 backup files contain an inline `Bearer` token string longer than 20 characters. Three workflows in the last snapshot carry one: *AI Personal Assistant*, *Stripe Event _Recreate* and *HS Master-Intake - Flow*. No Stripe, AWS or Slack key patterns were found. The tokens persist in git history, so treat them as exposed: **rotate them and move them into n8n credentials**. This is the same class of issue as the Directus and Cloudflare tokens already reported for this repository. The founder should decide whether the backup repo stays private and whether its history is purged.

## 4. Changes to the other deliverables
- **`01` §6 / §8**: Hermes runtime and n8n rows added.
- **`03` §4**: gap 7 added (Stage 5 does not persist; Stage 9 has no executors).
- **`04`**: Business Twin row refined; "Hermes-driven prospecting" row added.
- **`05`**: steps 2.6–2.8 added, plus one authorization line.
