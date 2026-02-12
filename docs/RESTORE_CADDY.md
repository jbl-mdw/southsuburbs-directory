# Caddy Emergency Restore (SouthSuburbs)

## Restore from a known-good snapshot
1) List snapshots:
   ls -lah docs/restore-snapshots/Caddyfile.*

2) Restore:
   ./scripts/restore-caddy.sh docs/restore-snapshots/Caddyfile.<STAMP>

3) Verify:
   curl -sS -I https://southsuburbsbest.com/ | head -n 10
   curl -sS https://admin.southsuburbsbest.com/server/health | head -n 5
