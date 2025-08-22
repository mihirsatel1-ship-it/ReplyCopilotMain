# Database Setup Guide

This guide explains how to set up different database options for the ReplyPilot.

## 🚀 Option 1: Vercel KV (Redis) - Recommended for MVP

**Best for**: Analytics, rate limiting, caching
**Free Tier**: 30,000 commands/month

### Setup Steps:

1. **Enable Vercel KV in your project**:
   ```bash
   # In your Vercel dashboard
   # Go to Storage → Create Database → KV
   # Name: review-reply-kv
   ```

2. **Add environment variables** (automatically added by Vercel):
   ```bash
   KV_URL=your_kv_url
   KV_REST_API_URL=your_rest_api_url
   KV_REST_API_TOKEN=your_token
   KV_REST_API_READ_ONLY_TOKEN=your_readonly_token
   ```

3. **Install the package** (already done):
   ```bash
   npm install @vercel/kv
   ```

4. **Deploy** - The app will automatically use KV when these env vars are present!

---

## 🐘 Option 2: Vercel Postgres - For Complex Data

**Best for**: User accounts, complex queries, relationships
**Free Tier**: 60 hours compute/month

### Setup Steps:

1. **Enable Vercel Postgres**:
   ```bash
   # In your Vercel dashboard
   # Go to Storage → Create Database → Postgres
   # Name: review-reply-db
   ```

2. **Environment variables** (auto-added):
   ```bash
   POSTGRES_URL=your_postgres_url
   POSTGRES_PRISMA_URL=your_prisma_url
   POSTGRES_URL_NO_SSL=your_no_ssl_url
   POSTGRES_URL_NON_POOLING=your_non_pooling_url
   POSTGRES_USER=your_user
   POSTGRES_HOST=your_host
   POSTGRES_PASSWORD=your_password
   POSTGRES_DATABASE=your_database
   ```

3. **Install Prisma** (ORM):
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

---

## 🔥 Option 3: Supabase - Full Backend Solution

**Best for**: Everything - auth, real-time, storage
**Free Tier**: 500MB database, 50K monthly active users

### Setup Steps:

1. **Create Supabase project**:
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your project URL and API keys

2. **Add environment variables**:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Install Supabase**:
   ```bash
   npm install @supabase/supabase-js
   ```

4. **Run the SQL schema**:
   - Copy contents of `src/lib/supabase-schema.sql`
   - Paste in Supabase SQL editor
   - Execute to create tables

---

## 🌍 Option 4: PlanetScale - Enterprise Scale

**Best for**: High-traffic applications
**Free Tier**: 1 database, 1 billion reads/month

### Setup Steps:

1. **Create PlanetScale database**:
   - Go to [planetscale.com](https://planetscale.com)
   - Create new database
   - Get connection string

2. **Environment variables**:
   ```bash
   DATABASE_URL=your_planetscale_url
   ```

3. **Install Prisma**:
   ```bash
   npm install prisma @prisma/client
   ```

---

## 🎯 Recommended Architecture

For your ReplyPilot, I recommend this **hybrid approach**:

### **Phase 1: MVP (Current)**
- ✅ **In-memory storage** - Simple, fast, no setup
- ✅ **Perfect for testing** - No external dependencies

### **Phase 2: Production Ready**
- 🚀 **Vercel KV** for:
  - Rate limiting data
  - Real-time analytics
  - Caching templates
- 🐘 **Vercel Postgres** for:
  - User accounts (if added)
  - Saved templates
  - Historical data

### **Phase 3: Scale (1000+ users)**
- 🌍 **PlanetScale** - Global edge database
- 🔥 **Supabase** - Real-time features, auth
- 📊 **Dedicated analytics** - Time-series database

---

## 🔒 Privacy & Security Features

Your current implementation already includes:

✅ **No review storage** - Reviews are never persisted
✅ **Anonymous analytics** - No personal data tracking
✅ **IP-based rate limiting** - No user identification required
✅ **Transient processing** - All data discarded after generation

### Additional Security for Production:

- 🔐 **IP hashing** - Store hashed IPs, not raw IPs
- 🛡️ **Data encryption** - Encrypt sensitive data at rest
- ⏰ **Automatic cleanup** - Purge old data automatically
- 📝 **Audit logging** - Track all data access

---

## 💰 Cost Comparison (Free Tiers)

| Database | Storage | Requests | Best For |
|----------|---------|----------|----------|
| **Vercel KV** | 256MB | 30K/month | Analytics, Caching |
| **Vercel Postgres** | 256MB | 60h compute | User Data, Complex Queries |
| **Supabase** | 500MB | 50K users | Full Backend, Auth |
| **PlanetScale** | 5GB | 1B reads | High Traffic, Scale |

---

## 🚀 Quick Start

**For immediate production deployment**:

1. **Keep current in-memory setup** - Works perfectly for MVP
2. **Add Vercel KV** - When you need persistent analytics
3. **Add user accounts later** - When you have paying customers

Your app is already **production-ready** with the current setup! The database abstraction layer I've built allows you to easily switch between storage backends without changing your application code.
