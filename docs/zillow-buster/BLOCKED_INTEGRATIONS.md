# SSB Real Estate Directory Sales Page: Blocked Integrations

Status as of the "AI sales agent" pass (branch `claude/tender-mendel-5pvk3u`). Everything below is outside the sales page's frontend scope, or needs founder authorization. The page is built so each one can be switched on without redesign.

## What the page does today (frontend complete, verified)
- **AI sales agent is the primary conversion path.** Every primary CTA ("Ask our AI sales agent", "Get my … Directory", "Get pricing for this directory", the starter questions in the final section) opens the site's existing LGR Connect widget and sends the visitor's question to SSB's already-provisioned agent `ssb-prospector` (tenant `ssb_internal`, client `SSB_PROD`).
- **Page-scoped:** the widget config is set inline on this page only (`content.ts` `PROSPECTOR_WIDGET_CONFIG`). Other SSB pages keep the default Receptionist presentation (verified on `/contact`).
- **Phones:** the widget is docked collapsed on arrival so the hero isn't covered. It opens on tap or from any CTA.
- **Fallback:** if the widget isn't on the page, every CTA goes to the intake form with the right directory preselected (verified with the widget blocked).
- **Phone number:** one small line under the form; it's also the AI Receptionist's voice line.
- **Verification:** run against the real `app/public/v2/widget.js` from `jbl-mdw/agent.klirtrak`, with the chat API stubbed locally. No request reached any production system. Live agent replies were **not** exercised (the sandbox can't reach production).

## Blocked integrations

| # | Integration | Blocker | Owner / authorization | Page change needed when unblocked |
|---|---|---|---|---|
| 1 | **Live AI sales agent replies** | Unverified from this environment. The widget must actually load on production (`connect.leads2scale.com/v2/*` route; see INCIDENT report A2), and `ssb-prospector` must answer about the **three directory offers** (its knowledge content for those offers is unverified) | Ops (live check) + Prospector knowledge owner | None |
| 2 | **Online checkout** | `POST /v1/public/checkout` sells only `lgr-receptionist`, `fsbo-standard-listing`, `missed-call-text-back`. No directory or featured-placement offer, and no rate-card prices | Founder prices → gateway `PUBLIC_OFFERS` + rate card | Swap "Get pricing for this directory" to call checkout with the offer key |
| 3 | **Automated onboarding and manufacturing** | `lib/directory-platform/provision-tenant.js` exists but isn't triggered by payment | Gateway owner | None (backend) |
| 4 | **Live intake records** | Form uses the email fallback until `NEXT_PUBLIC_ZB_INTAKE_WORKFLOW_KEY` (approved workflow key) is set | Founder | None; set the env var at build time |
| 5 | **Featured placement** | Not configured for real estate listings; not sellable in checkout | Founder + gateway | Same as #2 |
| 6 | **Widget "open" API** | The page drives the shared widget through its own DOM (`#lgr-chat-container`, `#lgr-input`, `#lgr-send-btn`, `#lgr-toggle`). A future widget markup change would silently drop CTAs to the form fallback | Shared widget owner (INCIDENT report D3) | Replace the DOM driver in `AskSalesAgentButton.tsx` / `SalesAgentMobileDock.tsx` with the API |
| 7 | **Client-side navigation** | The widget reads its config once. A visitor arriving from another SSB page via in-app navigation gets the Receptionist presentation; CTAs still open it. Direct and ad landings get the sales agent | Same as #6 (a re-configure API) | None |
| 8 | **Widget default on phones site-wide** | The shared widget opens expanded and is 78vh tall on phones on every SSB page. Fixed on this page only | Shared widget owner | None |
| 9 | **Footer credit text** | Shared footer reads "Powered by Leads Grow Revenue • AI Automation & Local Marketing" | Founder (shared component) | None |
| 10 | **Sales email / URL / prices** | Email fallback goes to an LGR-named inbox; the `/zillow-buster` slug; no approved prices | Founder | `content.ts` only |
| 11 | **SSB square logo** | No square SSB mark, so the widget avatar uses a generic chat icon in SSB colors | Founder / brand | Set `logoUrl` in `content.ts` |
| 12 | **Agent display name** | The widget header shows "South Suburbs Best / AI Sales Agent • Online" (no LGR or "Prospector" name, per the branding rule) | Founder | `content.ts` only |
