#!/usr/bin/env bash
set -euo pipefail
: "${NEXT_PUBLIC_MEILISEARCH_URL:?MEILI URL missing}"
: "${MEILI_MASTER_KEY:?MEILI MASTER KEY missing}"

INDEX="businesses"

# Create index if missing
curl -sf -X POST "$NEXT_PUBLIC_MEILISEARCH_URL/indexes" \
  -H "Authorization: Bearer $MEILI_MASTER_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"uid\":\"$INDEX\",\"primaryKey\":\"id\"}" || true

# Seed a couple docs (remove later when your sync is live)
curl -sf -X POST "$NEXT_PUBLIC_MEILISEARCH_URL/indexes/$INDEX/documents" \
  -H "Authorization: Bearer $MEILI_MASTER_KEY" \
  -H "Content-Type: application/json" \
  -d '[
    {"id":"demo-1","name":"Homewood Bakery","slug":"homewood-bakery","city":{"slug":"homewood"}},
    {"id":"demo-2","name":"Matteson Auto Care","slug":"matteson-auto-care","city":{"slug":"matteson"}}
  ]' >/dev/null

echo "Seeded $INDEX."
