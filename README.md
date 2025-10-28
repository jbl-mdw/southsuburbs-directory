# South Suburbs Best - Business Directory

## Tech Stack
- Next.js 14 (Frontend)
- Directus 10 (Headless CMS)
- PostgreSQL 15 + PostGIS (Database)
- MeiliSearch (Search Engine)
- n8n (Automation)
- Caddy (Reverse Proxy + SSL)
- Docker & Docker Compose

## Quick Start
```bash
docker compose up -d
```
Access at: https://southsuburbsbest.com

## Services
- Frontend: https://southsuburbsbest.com
- Admin: https://admin.southsuburbsbest.com
- Search: https://search.southsuburbsbest.com
- Automation: https://automation.leads2scale.com

## Environment Variables
See `.env.example` for all required variables.

## Database Backups
Automated daily backups to `/backups`
Manual: `./scripts/backup-db.sh`

## Deployment
1. SSH into server
2. `cd /opt/southsuburbs`
3. `git pull`
4. `docker compose build`
5. `docker compose up -d`

## Support
All credentials in `/docs/CREDENTIALS.md`
