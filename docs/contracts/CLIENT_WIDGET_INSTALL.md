# CLIENT_WIDGET_INSTALL — CONTRACT v1

## Purpose
Install the KlirTrak widget on any client site **without rebuilding containers**.

## Authoritative Loader
Widget is loaded via external script.  
No application rebuilds required.

## Required Client Snippet
```html
<script>
  window.__KLIRTRAK_SITE__ = "southsuburbsbest.com";
</script>

<script src="/widget.js" defer></script>
## Load Order (MUST)
1. `window.__KLIRTRAK_SITE__` must be defined **before** `/widget.js` loads.

## Same-Origin Requirement (MUST)
- `/widget.js` must be served from the **same origin** as the website where it runs.
- Do not load the widget from another domain (prevents cache/CORS/CSP failures).

## No-Rebuild Rule (MUST)
- Installing or updating the widget snippet **must not** require rebuilding the frontend container.
- Any change that forces rebuilds is a deployment bug and must be removed.

## Versioning
- Contract changes require a version bump (v1 → v2) and a repo commit.
