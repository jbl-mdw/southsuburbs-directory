#!/bin/bash

# ============================================
# South Suburbs Best - Schema Deployment
# Comprehensive Database Build Script
# ============================================

set -e  # Exit on any error

echo "=========================================="
echo "South Suburbs Best - Schema Deployment"
echo "=========================================="
echo ""

# Configuration
DB_HOST="localhost"
DB_NAME="southsuburbs"
DB_USER="ssb_admin"
MIGRATION_DIR="/opt/southsuburbs/migrations"
SEED_DIR="/opt/southsuburbs/seeds"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to run SQL file
run_sql() {
    local file=$1
    local description=$2
    
    echo -e "${YELLOW}Running: ${description}${NC}"
    
    if docker compose exec -T postgres psql -U $DB_USER -d $DB_NAME -f /tmp/$(basename $file) 2>&1 | tee /tmp/sql_output.log; then
        if grep -q "ERROR" /tmp/sql_output.log; then
            echo -e "${RED}✗ Failed with errors${NC}"
            cat /tmp/sql_output.log
            return 1
        else
            echo -e "${GREEN}✓ Success${NC}"
            echo ""
            return 0
        fi
    else
        echo -e "${RED}✗ Failed to execute${NC}"
        return 1
    fi
}

# Function to copy file to container
copy_to_container() {
    local file=$1
    docker compose cp $file postgres:/tmp/$(basename $file)
}

echo "Step 1: Checking Prerequisites"
echo "----------------------------------------"

# Check if Docker is running
if ! docker compose ps | grep -q postgres; then
    echo -e "${RED}✗ PostgreSQL container is not running!${NC}"
    echo "Please start containers with: docker compose up -d"
    exit 1
fi
echo -e "${GREEN}✓ PostgreSQL container is running${NC}"

# Check if database exists
if ! docker compose exec postgres psql -U $DB_USER -d $DB_NAME -c "SELECT 1;" &>/dev/null; then
    echo -e "${RED}✗ Database $DB_NAME does not exist!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Database $DB_NAME exists${NC}"
echo ""

echo "Step 2: Running Migrations"
echo "----------------------------------------"

# Migration 0001: Enable Extensions
copy_to_container "$MIGRATION_DIR/0001_enable_extensions.sql"
run_sql "$MIGRATION_DIR/0001_enable_extensions.sql" "0001: Enable Extensions (PostGIS, UUID, etc.)"

# Migration 0002: Reference Tables
copy_to_container "$MIGRATION_DIR/0002_reference_tables.sql"
run_sql "$MIGRATION_DIR/0002_reference_tables.sql" "0002: Reference Tables (Categories, Cities, Plans, Attributes)"

# Migration 0003: Core Entities
copy_to_container "$MIGRATION_DIR/0003_core_entities.sql"
run_sql "$MIGRATION_DIR/0003_core_entities.sql" "0003: Core Entities (Organizations, Businesses)"

# Migration 0004: Business Details
copy_to_container "$MIGRATION_DIR/0004_business_details.sql"
run_sql "$MIGRATION_DIR/0004_business_details.sql" "0004: Business Details (Hours, Service Areas, Photos)"

# Migration 0005: Customer Interactions
copy_to_container "$MIGRATION_DIR/0005_customer_interactions.sql"
run_sql "$MIGRATION_DIR/0005_customer_interactions.sql" "0005: Customer Interactions (Reviews, Leads, Saved Searches)"

# Migration 0006: Admin Tables
copy_to_container "$MIGRATION_DIR/0006_admin_tables.sql"
run_sql "$MIGRATION_DIR/0006_admin_tables.sql" "0006: Admin Tables (Claimed Businesses, Audit Log)"

# Migration 0007: Junction Tables
copy_to_container "$MIGRATION_DIR/0007_junction_tables.sql"
run_sql "$MIGRATION_DIR/0007_junction_tables.sql" "0007: Junction Tables (Many-to-Many Relationships)"

echo ""
echo "Step 3: Seeding Reference Data"
echo "----------------------------------------"

# Seed Categories
copy_to_container "$SEED_DIR/categories.sql"
run_sql "$SEED_DIR/categories.sql" "Seed: Categories (40+ business types)"

# Seed Cities
copy_to_container "$SEED_DIR/cities.sql"
run_sql "$SEED_DIR/cities.sql" "Seed: Cities (30 South Suburbs cities)"

# Seed Plans
copy_to_container "$SEED_DIR/plans.sql"
run_sql "$SEED_DIR/plans.sql" "Seed: Plans (4 monetization tiers)"

# Seed Attributes
copy_to_container "$SEED_DIR/attributes.sql"
run_sql "$SEED_DIR/attributes.sql" "Seed: Attributes (30+ filterable features)"

echo ""
echo "Step 4: Verification"
echo "----------------------------------------"

echo "Checking table counts..."

# Get table counts
docker compose exec postgres psql -U $DB_USER -d $DB_NAME <<EOF
SELECT 
    'categories' as table_name, 
    COUNT(*) as count 
FROM categories
UNION ALL
SELECT 'cities', COUNT(*) FROM cities
UNION ALL
SELECT 'plans', COUNT(*) FROM plans
UNION ALL
SELECT 'attributes', COUNT(*) FROM attributes
ORDER BY table_name;
EOF

echo ""
echo "Checking table structure..."

# List all custom tables (non-Directus)
docker compose exec postgres psql -U $DB_USER -d $DB_NAME <<EOF
SELECT tablename 
FROM pg_tables 
WHERE schemaname='public' 
AND tablename NOT LIKE 'directus_%' 
ORDER BY tablename;
EOF

echo ""
echo "=========================================="
echo -e "${GREEN}✓ DEPLOYMENT COMPLETE!${NC}"
echo "=========================================="
echo ""
echo "Summary:"
echo "  ✓ 7 migrations applied"
echo "  ✓ 4 seed files loaded"
echo "  ✓ 17 collections created"
echo "  ✓ 5 junction tables created"
echo ""
echo "Next Steps:"
echo "  1. Restart Directus: docker compose restart directus"
echo "  2. Wait 30 seconds"
echo "  3. Log in to: https://admin.southsuburbsbest.com"
echo "  4. Check Settings → Data Model"
echo "  5. You should see all collections!"
echo ""
echo "If collections don't appear:"
echo "  - Force schema refresh: docker compose exec directus npx directus schema apply --yes"
echo "  - Check Directus logs: docker compose logs directus --tail=50"
echo ""
