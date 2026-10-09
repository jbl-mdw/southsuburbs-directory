# LGR Forge Template Mapping Project: Index

Read-only inventory and mapping of LGR's existing website, landing-page, ecommerce, directory, industry-overlay, Business Twin, pack and automation templates, produced so that **Forge manufacturing reuses what exists instead of rebuilding it**.

**Nothing was modified in any shared system or source repository.** All findings come from shallow, read-only clones.

## Deliverables
| # | Document | Answers |
|---|---|---|
| 1 | [`01_MASTER_TEMPLATE_INVENTORY.md`](01_MASTER_TEMPLATE_INVENTORY.md) | What templates and manufacturing engines exist, where they are, and their status |
| 2 | [`02_INDUSTRY_MAPPING_MATRIX.md`](02_INDUSTRY_MAPPING_MATRIX.md) | Which industries each template family already covers |
| 3 | [`03_TWIN_OVERLAY_PACK_MAPPING.md`](03_TWIN_OVERLAY_PACK_MAPPING.md) | How a Business Twin, overlays and packs compose into a manufactured product (worked example: the SSB directories) |
| 4 | [`04_MANUFACTURING_READINESS_REPORT.md`](04_MANUFACTURING_READINESS_REPORT.md) | What can be manufactured end to end today, what's partial, and the smallest next step for each |
| 5 | [`05_INTEGRATION_PLAN.md`](05_INTEGRATION_PLAN.md) | A phased, reuse-first plan, with ownership boundaries and the authorizations it needs |
| 6 | [`06_EXTENDED_SOURCES.md`](06_EXTENDED_SOURCES.md) | Second pass: Hermes pipeline runtime, n8n workflow backups, and seven stub repositories |

## Sources (read-only snapshots)
| Repository | Commit | Date | Role in this mapping |
|---|---|---|---|
| `jbl-mdw/agent.klirtrak` | `18ca3ed` | 2026-08-24 | **Primary.** LGR Connect gateway and every manufacturing engine (`lib/`, 55 engine directories), registries, packs, seeds, Business Twin records |
| `jbl-mdw/southsuburbs-directory` | `ebfe3568` | 2026-10-09 | SSB Next.js directory consumer site and the real estate directory sales page |
| `jbl-mdw/law-automation-suite` | `6f2d40f` | 2026-10-07 | Legal raw-material acquisition (5 upstream legal platforms, license-gated), tagged with LGR destinations incl. **`FORGE`** |
| `jbl-mdw/lgr-architecture` | `74dd075` | 2026-07-24 | Specifications: Hermes intelligence pipeline (incl. Stage 5 Business Twin Assembly), Prospector spec |
| `jbl-mdw/ops-hub-master-plan` | `db41344` | 2026-07-26 | Ops hub infrastructure plan / compose |
| `jbl-mdw/lgr-runtime-dashboard` | `4ca2881` | 2026-08-01 | LGR Command Center dashboard (runtime hierarchy, Receptionist workspace) |
| `jbl-mdw/hermes-pipeline-runtime` | `6299181` | 2026-07-26 | Hermes 10-stage pipeline kernel; per-stage certification (see `06` §2) |
| `jbl-mdw/n8n-workflow-backups` | `6e43b34` | 2025-10-27 | Nightly n8n exports; lead-intake and scraper workflows (see `06` §3) |
| `ssb-pages`, `nextjs-medusa-visual-builder`, `site-cloner`, `universal-content-engine`, `hoa-connect-directory-app`, `localrank-ai`, `firecrawl-ingestion-engine` | — | — | Empty or plan-only; no templates (see `06` §1) |

**Not inspected:** older single-purpose repositories in the account. Production servers (WordPress demo containers, Directus, n8n, Flowise) were **not reachable** from this sandbox; their contents are inferred only from configs and snapshots in git.

## Terminology
- **Forge**: the repositories don't define a "Forge" product module. The only explicit use is the destination tag `FORGE = LGR Forge` in `law-automation-suite/raw-material/canary/extraction/MANIFEST.md`, alongside `OVL` (Legal Industry Overlay), `PK` (Sub-Niche Packs), `BT` (Business Twin), `REC`, `PROS`, `CLOSE`, `EA`, `DOC` and others. This mapping treats **Forge** as the manufacturing layer that turns those raw materials and existing templates into sellable products.
- **Status vocabulary** used throughout:
  - **Certified**: the engine ships a manifest plus certification tests in git (tests **not executed** here).
  - **Live**: there's evidence in git of production use (live snapshots, production-proof commits).
  - **Partial**: exists but is missing a required link.
  - **Reference-only**: raw material not yet cleared for reuse.
  - **Unverified**: referenced but not inspectable from here.

## Coordination boundaries (OC1 / OC2)
- This mapping (CC) **only reads** other streams' repositories and writes **only** to `docs/forge-template-mapping/` on the isolated branch `claude/tender-mendel-5pvk3u`.
- **Not established from the repositories:** which of OC1 and OC2 owns which repository. Commits are authored by the founder's account with `Co-Authored-By: Claude Sonnet 5` and carry mission IDs (HM-*, CC-*, SD-*, LGR-*), not OC labels. The most recently active streams are `law-automation-suite` (legal raw-material acquisition, 2026-10-07) and gateway mission work (to 2026-08-24). See `05_INTEGRATION_PLAN.md` "Work-stream boundaries" for the proposed boundary table needing founder confirmation.
- Shared, live-hot-reloaded assets that every stream touches, and that therefore need a single owner, are listed in `04_MANUFACTURING_READINESS_REPORT.md` §4.
