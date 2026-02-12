#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: restore-caddy.sh <Caddyfile.snapshot>"
  exit 1
fi

SNAPSHOT="$1"
CADDYFILE="/opt/southsuburbs/Caddyfile"
BACKUP="/opt/backups/runtime-configs/$(date +%F_%H%M%S).Caddyfile.pre-restore"

if [ ! -f "$SNAPSHOT" ]; then
  echo "Snapshot not found: $SNAPSHOT"
  exit 1
fi

echo "[1/5] Backing up current Caddyfile → $BACKUP"
cp -a "$CADDYFILE" "$BACKUP"

echo "[2/5] Restoring snapshot → $CADDYFILE"
cp -a "$SNAPSHOT" "$CADDYFILE"

echo "[3/5] Validating Caddy configuration"
docker exec -it ssb_caddy caddy validate --config /etc/caddy/Caddyfile

echo "[4/5] Reloading Caddy"
docker exec -it ssb_caddy caddy reload --config /etc/caddy/Caddyfile

echo "[5/5] Restore complete"
