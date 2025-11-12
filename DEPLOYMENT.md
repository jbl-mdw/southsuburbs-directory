# Deployment Configuration - South Suburbs Best

## Critical: Required Environment Variable

The file `docker-compose.override.yml` is gitignored but MUST contain:
```yaml
services:
  frontend:
    environment:
      - DIRECTUS_TOKEN=0miA29saXN5M1D72AkhL5NCAkM0N9kBf
```

Without this, cities API returns "Invalid user credentials" and breaks:
- /api/cities
- /cities page  
- /city/[slug] pages
- Dropdown search

## Working State (Nov 12, 2025)
- Chat widget: ✅
- Cities dropdown: ✅
- City pages: ✅
- Search: ✅
