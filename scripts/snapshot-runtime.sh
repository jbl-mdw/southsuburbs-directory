#!/usr/bin/env bash
set -euo pipefail

cd /opt/southsuburbs

TS="$(date +%F_%H%M%S)"
DIR="docs/restore-snapshots"

mkdir -p "$DIR"

cp -a Caddyfile "${DIR}/Caddyfile.${TS}"
docker compose -f docker-compose.yml config > "${DIR}/compose-resolved.${TS}.yml"

git add "${DIR}/Caddyfile.${TS}" "${DIR}/compose-resolved.${TS}.yml"

# No-op if nothing changed (should not happen, but safe)
if git diff --cached --quiet; then
  exit 0
fi

git commit -m "snapshot: runtime routing + compose resolved (${TS})"
git push
