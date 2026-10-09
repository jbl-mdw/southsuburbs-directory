# Receptionist / Prospector Visibility Incident + SSB Sales Automation Readiness

Read-only investigation, 2026-10-09. **Nothing was deployed, restarted, reconfigured or written to any shared system.**
Evidence comes from two repositories: `jbl-mdw/southsuburbs-directory` (SSB frontend and the SSB Caddyfile) and `jbl-mdw/agent.klirtrak` (the LGR Connect gateway, which serves the widget, chat, checkout, provisioning and directory APIs; attached read-only, HEAD `18ca3ed`, 2026-08-24).

**Limitation:** this environment cannot reach production (`southsuburbsbest.com`, `connect.leads2scale.com` and every other host is refused by the sandbox network policy). No live logs, container state, `docker inspect`, or browser console were available, so the **live** root cause of any specific disappearance is **not verified**. What follows are verified defects in code and configuration, each with the single check that confirms or rules it out live.

---

## A. Incident findings

### A1. How the products render (verified from code)
| Layer | Where | What decides visibility |
|---|---|---|
| Script mount | `southsuburbs-directory/frontend/app/layout.tsx:23-25` loads `https://connect.leads2scale.com/v2/widget.js?v=20260508-4` with `data-client-id="SSB_PROD"` on every page, unconditionally | Whether the script URL returns JavaScript |
| Routing | Caddy `connect.leads2scale.com` → `handle /v2/*` → `lgr_connect_gateway:4120` | Whether the **running** Caddy config contains `/v2/*`; otherwise the response is the text `connect root ok` and nothing renders |
| Script file | gateway `app/server.js:505` serves `/app/public/v2/widget.js` (`no-store`, so no caching) | Gateway container up |
| Mount | `widget.js` appends the bubble immediately (`widget.js:500`); the only pre-render call, `/runtime/resolve-agent`, is non-blocking and only runs when clientId, tenantId and agentKey are all set | A JS exception or script failure means nothing appears |
| Identity | `window.LGR_CONNECT_CONFIG` on the host page (assistantName, agentKey, quickActions, theme) | SSB sets **none**, so it always presents as the generic "AI Assistant" with Receptionist buttons |
| Chat function | gateway `POST /v1/public/chat` (`server.js:1166`): `403 widget_disabled` unless `client-policies.json[client].widgetVisibility.enabled === true` | Policy file contents at that moment |
| Agent used | `server.js:1216`: `agentKey = body.agent_key || policy.agentKey || policy.agent_key || policy.agent` | SSB sends `agent_key: null`, and `SSB_PROD` has no top-level agentKey |

**Visual vs functional:**
- **Visual disappearance** (no bubble) can only come from the script not loading: the Caddy route is missing, the gateway is down while the page loads, or a JS error.
- **Functional unavailability** (bubble visible, but it replies "I'm connected, but the assistant service did not return a reply yet") comes from a chat `403`/`5xx`: a policy-map problem, the gateway restarting, or an upstream Flowise or provider failure.

### A2. Verified defect 1: Caddy "split-brain". The live routing config has no single source of truth
- `southsuburbs-directory/Caddyfile` (bind-mounted by `docker-compose.yml:62`) **has never contained `/v2/*`** for `connect.leads2scale.com` in any commit (checked all 11 commits that touch it). If production ran this file, the widget could not load at all.
- Production snapshots captured on 2026-08-16 (`agent.klirtrak/rollback/Caddyfile-before-*-20260816T*.txt`) and 2026-08-17 (`lib/revenue-demo-runtime/demo-live-source/live-caddyfile-snapshot.txt`) **do** contain `/v2/*`, `/api/voice/*` and `/runtime/*`, plus server-only sites (`sign.leads2scale.com`, `app.leadsgrowrevenue.com`) and different CRM/chat upstreams. **The live Caddyfile and git have diverged.**
- Three separate documents record that the host file and the container's `/etc/caddy/Caddyfile` are **not the same file at runtime**, and that changes were pushed via `docker exec … cat >` or the admin API `POST :2019/load`: HM_OPS_003 (2026-08-03), the LGR-RECEPTIONIST-P0-VOICE-001 deployment note (2026-08-16), and the demo-live README (2026-08-17).
- **Consequence:** any reload from a copy that lacks `/v2/*` silently removes the widget from SSB, and any later reload from a copy that has it brings the widget back. That matches "disappeared, reappeared, disappeared". Those copies are the host file, the in-container file, an admin-API JSON load, or a container restart that remounts the host file.
- **Not established:** whether, or when, such a reload actually happened. **Live check:** `curl -s https://connect.leads2scale.com/v2/widget.js | head -c 80` (JavaScript vs `connect root ok`), and `docker exec ssb_caddy grep -n "/v2/" /etc/caddy/Caddyfile` compared with `/opt/southsuburbs/Caddyfile`.

### A3. Verified defect 2: the shared live policy file is written by tests and provisioners and hot-reloaded instantly
- One file, `agent.klirtrak/config/client-policies.json`, controls chat for every client (SSB_PROD, LGR_PROD, demos). The gateway hot-reloads it within ~50 ms of any write (`server.js:150-176`). If it's missing or unreadable, **every client is denied** (`server.js:130`, `"denying by default"`).
- Certification tests write that **same live file** through `/repo` paths:
  - `test-golden-path-002-capability-demo-adapter.js` (HEAD commit, 2026-08-24) snapshots the file, provisions fixtures, then **overwrites the file with the snapshot** in `finally`. Anything a real provisioner wrote during the test window is lost, and the restore is a non-atomic `writeFileSync`.
  - `lib/ai-employee-provisioning/certification/test-provision-ai-employee.js` writes it directly.
- Test fixtures are committed in the production policy map: `CERT_DIR_A/B/C`, `CERT_MCTB_001`, `RE_TENANT_001`, `LEGAL_TENANT_001`.
- 13 commits changed this file between 2026-08-16 and 2026-08-22. Commit `b8cd9ba` records a "concurrent live demo-provisioning write to the same file" that was left unstaged, so the live file also diverges from git. Any `git checkout`, `git pull` or `git stash` in the gateway checkout would hot-reload a different client map immediately.
- **Effect:** bubble visible, chat refuses (`403`) or loses provisioned clients. That's functional disappearance.
- **Live check:** gateway logs for `[POLICY] invalid JSON`, `client-policies.json not found`, `widget_disabled`; `md5sum` of the live file compared with git HEAD.

### A4. Verified defect 3: the gateway is a single point of failure that is restarted manually and routinely
- `lgr_connect_gateway:4120` sits behind 6 site blocks. It serves the widget script, chat, `/v1/public/directory-lead` (SSB intake), the directory-platform API (`/real-estate`), voice/telephony, checkout and demos.
- Backend changes only go live after `docker restart lgr_connect_gateway` (documented in the demo-live README, 2026-08-17; `scripts/recover-gateway.sh`). During each restart, **pages loaded at that moment get no widget**, and `/real-estate` shows "temporarily unavailable" at the same time. That's a useful correlation signal.
- The "intermittent gateway-proxy failures" seen during Forge testing fit this pattern (proxy `502` while the container restarts or is overloaded), but **no log was available to confirm it**. **Live check:** `docker inspect lgr_connect_gateway --format '{{.State.StartedAt}} {{.RestartCount}}'`, and Caddy `502` lines for `lgr_connect_gateway` compared against the disappearance times.

### A5. Prospector on SSB is configured server-side but never invoked (verified)
Gateway commit `b8cd9ba` (2026-08-18, "deploy canonical Prospector to South Suburbs Best") added `SSB_PROD.agents.ssb-prospector` and Directus `agent_instances` id 122. It was proven only with an explicit `agent_key=ssb-prospector` request. The SSB page sends `agent_key: null`, and `SSB_PROD` has no default agentKey, so live SSB visitors reach the generic SSB chatflow (`9a3efeac…`), **not** the Prospector, in the Receptionist presentation. The Prospector skin ("LGR Prospector", Money Green, sales quick actions; `e3e639d`, 2026-08-22) exists only where a host page sets `LGR_CONNECT_CONFIG`, which today is the Offers site. **"Prospector on SSB" was never visible to visitors.** That's a wiring gap, not a regression.

### A6. Did this session's Claude Code work contribute? **No (verified).**
- This session's commits (`76b1dbb0`, `b8c7b668`, `68d88fdd`, `6eed5932`) are only on `claude/tender-mendel-5pvk3u`. `origin/main` is `b5976ce8`, unchanged; nothing was merged or deployed.
- They touch only `frontend/app/zillow-buster/**` and `docs/zillow-buster/**`: no layout, widget, Caddy, gateway, policy or database change.

### A7. Other changes that touched the shared mechanisms (facts only; responsibility not established)
| Date | Repo / commit | Shared asset touched |
|---|---|---|
| 05-09 | SSB `04418fc1` | Switched the widget URL to `connect…/v2/widget.js` (no matching Caddy change in git) |
| 08-03 | gateway HM_OPS_003 | Live Caddy config loaded via admin API from inside the container |
| 08-15/16 | SSB `3c23e7e3`, `40258070`, `dc11a7e5` | SSB Caddyfile (demo routes, telephony matcher); live file edited via `docker exec` |
| 08-16–08-22 | gateway, 13 commits | `config/client-policies.json` (live, hot-reloaded) |
| 08-22 | gateway `e3e639d` | Shared `app/public/v2/widget.js` (config-gated; defaults claimed unchanged) |
| 08-24 | gateway `18ca3ed` | Test that overwrites the live policy file on exit |

The commit messages identify these as Claude Code sessions (`Co-Authored-By: Claude Sonnet 5`). Mapping them to "OC1" or "OC2" requires session records I don't have.

### A8. Security findings (pre-existing, not changed)
- `southsuburbs-directory/DEPLOYMENT.md` contains a Directus API token in plaintext.
- `southsuburbs-directory/docker-compose.yml:50` contains a Cloudflare API token in plaintext.

Both should be rotated and moved to environment files that aren't committed.

---

## B. Sales automation: working vs missing

| Journey step | Exists today | Missing connection |
|---|---|---|
| 1 Discover | Sales page (branch, not deployed) | Route/URL decision; nav links |
| 2 Prospector engages and qualifies | `ssb-prospector` agent provisioned (gateway) plus a Prospector conversational engine with Closer handoff and Cal.com booking (certified on Offers) | SSB page must pass `agentKey: "ssb-prospector"` and the Prospector presentation via `LGR_CONNECT_CONFIG`. The Prospector/Closer knowledge must cover the **three directory offers** (unverified) |
| 3 Personalized demo | Demo provisioner and signed campaign-token demos (`/v1/public/campaign-context`) for Receptionist and MCTB | No directory demo adapter. `provisionTenant()` could produce a TRIAL directory but isn't exposed as a demo |
| 4 Select subscription and upgrades | Page shows 3 directories plus featured placement | No rate-card entries (no founder prices) |
| 5 Pay | `POST /v1/public/checkout` with Stripe orchestration (webhook repaired 08-16) | `PUBLIC_OFFERS` contains only `lgr-receptionist`, `fsbo-standard-listing`, `missed-call-text-back`. **No directory or featured-placement offer.** Checkout correctly refuses any offer without a rate-card price |
| 6 Onboard and manufacture | `lib/directory-platform/provision-tenant.js` (Business Twin, overlay, tenant, slots, Receptionist binding, domain record, Stripe field, TRIAL→lifecycle) | Not invoked by checkout or the webhook (only by certification tests). Custom-domain routing is manual (Caddy) and blocked by defect A2 |
| 7 Human only when needed | Closer handoff and "talk to a human" detection (certified on Offers) | Must be enabled for SSB's agent |
| Receptionist on SSB | Widget renders on every SSB page; voice line +1 708-847-4211 routes to the Receptionist pipeline (08-16 cutover) | n/a |

---

## C. Recommended page refinements (not implemented; awaiting authorization)
1. **Primary CTA becomes an automated conversation.** Hero, directory sections and the final CTA say "Talk to our AI sales agent", "See it for your business", "Get my branded directory". Each opens the SSB Prospector with an intent-seeded message (e.g. "I'm a brokerage and want a branded directory"), using the widget's existing `data-lgr-channel="message"` + `data-lgr-send-text` mechanism. It needs a small, additive open-panel hook in shared `widget.js` (see D3); without one, the buttons can only focus the existing bubble.
2. **Configure the Prospector on this page only.** Set an inline `window.LGR_CONNECT_CONFIG` on the sales page: `agentKey: "ssb-prospector"`, `tenantId: "ssb_internal"` (both are required for the widget's runtime agent resolution), SSB-branded `assistantName`, sales `quickActions` (Ask a question · Compare directories · See pricing · Book a demo · Talk to a human), and SSB colors. Every other SSB page keeps today's Receptionist presentation.
3. **Phone becomes a secondary option.** Remove the hero "Call (708) 847-4211" line and the large "Prefer to talk now?" card. Keep one small line near the form, "Prefer to talk? (708) 847-4211". That number is itself the AI Receptionist voice line, so it's still automated.
4. **Purchase path.** When directory offers exist in checkout (D5), the pricing cards' "Get this directory" calls the existing `/v1/public/checkout`. Until then they open the Prospector with a "pricing for <directory>" message, and the form stays as the fallback.
5. **Copy.** Change "We'll walk you through…" and "Request a walkthrough" to "Get answers instantly from our AI sales agent, see your directory, choose a plan, and get started online", but **only** once steps 2, 4 and 5 are live. Until then the copy must not promise online purchase.
6. **Keep:** the three separate offers, South Suburbs Best branding, the marketplace explanation, the calculator, the FAQ, and "Powered by Leads Grow Revenue" in the footer only.

## D. Minimal corrective action plan (each step needs authorization; no rebuilds)
1. **Caddy single source of truth (fixes A2).** Capture the live container Caddyfile, commit it to `southsuburbs-directory/Caddyfile`, fix the bind-mount desync, and adopt one documented deploy path (validate → load → verify `/v2/widget.js` returns JS). Add a watchdog check that `connect.leads2scale.com/v2/widget.js` returns JavaScript.
2. **Isolate the policy file from tests (fixes A3).** Point certification tests at a temporary copy (environment variable for the policy path), never the live file. Remove `CERT_*` fixtures from the production map. Make the restore atomic (write to a temp file, then rename). On an invalid file, keep the last good map instead of denying everyone.
3. **Widget open hook (enables C1).** Add `window.LGRConnect.open(text?)` to `app/public/v2/widget.js`, additive and opt-in, with no change for existing tenants.
4. **SSB Prospector wiring (fixes A5).** Page-scoped `LGR_CONNECT_CONFIG.agentKey = "ssb-prospector"`, and load the three directory offers into the Prospector/Closer knowledge.
5. **Commerce (enables steps 4–6).** Founder-approved rate-card prices, then three directory offers plus featured placement in `PUBLIC_OFFERS`, then the Stripe webhook calls `provisionTenant()` (TRIAL → active).
6. **Gateway restarts.** Schedule them and announce them to parallel sessions; correlate with A4's live check.

## E. Founder decisions required
1. Authorize the live read-only checks in A2–A4 (from an environment with server access) to confirm the live root cause.
2. Authorize D1 and D2 (shared infrastructure; may require a coordinated Caddy reload, and affects OC tasks).
3. Authorize D3 (shared widget code).
4. Prices for the 3 directories plus featured placement (blocks checkout).
5. Whether the sales page may show the Prospector before online checkout exists (consultative mode), or must wait for D5.
6. Who owns the Caddy and policy-file deploy procedure across CC, OC1 and OC2 sessions.
7. Rotation of the two committed credentials (A8).
