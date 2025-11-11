#!/bin/bash

TOKEN="0miA29saXN5M1D72AkhL5NCAkM0N9kBf"
API="https://admin.southsuburbsbest.com/items/cities"

echo "🏙️  Marking cities as featured..."

# Get all existing cities
all_cities=$(curl -s -H "Authorization: Bearer $TOKEN" "$API?fields=id,name,slug")

# Your 13 featured city slugs
featured=("orland-park" "tinley-park" "homewood" "flossmoor" "matteson" "park-forest" "country-club-hills" "hazel-crest" "frankfort" "olympia-fields" "glenwood" "lynwood" "south-holland")

# Cities to create if they don't exist
declare -A new_cities=(
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

# Update existing cities to featured
for slug in "${featured[@]}"; do
  city_id=$(echo "$all_cities" | jq -r ".data[] | select(.slug==\"$slug\") | .id")
  
  if [ ! -z "$city_id" ]; then
    echo "→ Updating $slug"
    curl -s -X PATCH "$API/$city_id" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"is_active": true, "is_featured": true}' > /dev/null
    echo " ✓"
  fi
done

# Create missing cities
for name in "${!new_cities[@]}"; do
  slug="${new_cities[$name]}"
  exists=$(echo "$all_cities" | jq -r ".data[] | select(.slug==\"$slug\") | .id")
  
  if [ -z "$exists" ]; then
    echo "→ Creating $name"
    curl -s -X POST "$API" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"$name\",\"slug\":\"$slug\",\"state\":\"IL\",\"is_active\":true,\"is_featured\":true}" > /dev/null
    echo " ✓"
  fi
done

echo ""
echo "✅ Done! Featured cities:"
curl -s -H "Authorization: Bearer $TOKEN" "$API?filter[is_featured][_eq]=true&fields=name&sort=name" | jq -r '.data[] | "  • " + .name'

echo ""
echo "Total featured:"
curl -s -H "Authorization: Bearer $TOKEN" "$API?filter[is_featured][_eq]=true" | jq '.data | length' | xargs echo " "
