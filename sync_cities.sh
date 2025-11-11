#!/bin/bash

TOKEN="YOUR_DIRECTUS_TOKEN_HERE"  # ← PUT YOUR TOKEN HERE
API="https://admin.southsuburbsbest.com/items/cities"

echo "🏙️  Starting city sync..."

# Updated Top 13 South Suburbs (removed Harvey, Dolton, Markham, Oak Lawn)
declare -A cities=(
  ["Orland Park"]="orland-park"
  ["Tinley Park"]="tinley-park"
  ["Homewood"]="homewood"
  ["Flossmoor"]="flossmoor"
  ["Matteson"]="matteson"
  ["Park Forest"]="park-forest"
  ["Country Club Hills"]="country-club-hills"
  ["Hazel Crest"]="hazel-crest"
  ["Frankfort"]="frankfort"
  ["Olympia Fields"]="olympia-fields"
  ["Glenwood"]="glenwood"
  ["Lynwood"]="lynwood"
  ["South Holland"]="south-holland"
)

for name in "${!cities[@]}"; do
  slug="${cities[$name]}"
  
  echo "→ Syncing: $name ($slug)"
  
  curl -X POST "$API" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"name\": \"$name\",
      \"slug\": \"$slug\",
      \"is_active\": true,
      \"is_featured\": true
    }" \
    -s -o /dev/null -w "  Status: %{http_code}\n"
done

echo ""
echo "🗑️  Deactivating removed cities..."

# Deactivate the removed cities
removed_cities=("Harvey" "Dolton" "Markham" "Oak Lawn")

for city in "${removed_cities[@]}"; do
  echo "→ Deactivating: $city"
  
  # Get city ID first
  city_data=$(curl -s -H "Authorization: Bearer $TOKEN" \
    "$API?filter[name][_eq]=$city&fields=id")
  
  city_id=$(echo $city_data | jq -r '.data[0].id // empty')
  
  if [ ! -z "$city_id" ]; then
    curl -X PATCH "$API/$city_id" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"is_active": false, "is_featured": false}' \
      -s -o /dev/null -w "  Status: %{http_code}\n"
  else
    echo "  Not found, skipping"
  fi
done

echo ""
echo "✅ City sync complete!"
echo ""
echo "📋 Verifying featured cities..."
curl -s -H "Authorization: Bearer $TOKEN" \
  "$API?filter[is_featured][_eq]=true&fields=name,slug&sort=name" | \
  jq -r '.data[] | "  ✓ \(.name) (\(.slug))"'

echo ""
echo "Total featured cities:"
curl -s -H "Authorization: Bearer $TOKEN" \
  "$API?filter[is_featured][_eq]=true" | jq '.data | length' | xargs echo "  "
