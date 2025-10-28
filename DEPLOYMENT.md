# Deployment Guide

## Server Requirements
- Ubuntu 24.04+
- 4GB RAM minimum
- 50GB storage
- Docker & Docker Compose installed

## Fresh Server Setup
1. Clone repository
2. Copy `.env.example` to `.env`
3. Update environment variables
4. Run `docker compose up -d`
5. Access Directus at admin subdomain
6. Import database backup

## DNS Configuration
Required DNS records:
- southsuburbsbest.com → A → SERVER_IP
- www.southsuburbsbest.com → CNAME → southsuburbsbest.com
- admin.southsuburbsbest.com → A → SERVER_IP
- search.southsuburbsbest.com → A → SERVER_IP

## SSL Certificates
Automatic via Caddy (Let's Encrypt)
No manual configuration needed.
