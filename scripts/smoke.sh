#!/usr/bin/env bash
set -euo pipefail

FRONTEND_TOKEN="${FRONTEND_TOKEN:-}"

URL_HOME="https://southsuburbsbest.com/"
URL_ASSET="https://southsuburbsbest.com/_next/static/media/e4af272ccee01ff0-s.p.woff2"
URL_DIRECTUS="https://southsuburbsbest.com/directus/items/posts?limit=1"
URL_ADMIN="https://admin.southsuburbsbest.com/admin"

fail=0

code=$(curl -s -o /dev/null -w "%{http_code}" "$URL_HOME");   echo "$code  $URL_HOME";   [[ "$code" =~ ^2|3 ]] || fail=1
code=$(curl -s -o /dev/null -w "%{http_code}" "$URL_ASSET");  echo "$code  $URL_ASSET";  [[ "$code" =~ ^2|3 ]] || fail=1

# Directus check: include Authorization header explicitly
if [[ -n "$FRONTEND_TOKEN" ]]; then
  code=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $FRONTEND_TOKEN" "$URL_DIRECTUS")
else
  code=$(curl -s -o /dev/null -w "%{http_code}" "$URL_DIRECTUS")
fi
echo "$code  $URL_DIRECTUS"; [[ "$code" =~ ^2|3 ]] || fail=1

code=$(curl -s -o /dev/null -w "%{http_code}" "$URL_ADMIN");  echo "$code  $URL_ADMIN";  [[ "$code" =~ ^2|3 ]] || fail=1

exit $fail
