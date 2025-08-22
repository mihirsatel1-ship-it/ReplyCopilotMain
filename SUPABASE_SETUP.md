# 🔥 Supabase Setup Guide

## Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/Login** with GitHub
3. **Create New Project**:
   - **Name**: `review-reply-generator`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Plan**: Free (500MB database, 50K monthly active users)

4. **Wait for setup** (2-3 minutes)

## Step 2: Get Your Credentials

Once your project is ready:

1. **Go to Settings → API**
2. **Copy these values**:
   ```
   Project URL: https://your-project-id.supabase.co
   anon public key: eyJ... (starts with eyJ)
   service_role key: eyJ... (starts with eyJ, different from anon)
   ```

## Step 3: Add Environment Variables

**In your Vercel Dashboard** (or `.env.local` for local development):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important**: Use the `service_role` key (not the `anon` key) for server-side operations.

## Step 4: Run Database Schema

1. **In Supabase Dashboard → SQL Editor**
2. **Copy the entire contents** of `src/lib/supabase-schema.sql`
3. **Paste and Execute** the SQL
4. **Verify tables created**: Check Tables tab

## Step 5: Test Connection

Your app will automatically detect Supabase and use it when the environment variables are set!

---

## 🎉 What You Get

### **Database Tables**
- ✅ `analytics` - Aggregated metrics
- ✅ `generation_events` - Individual API calls
- ✅ `templates` - Saved response templates
- ✅ `rate_limits` - IP-based rate limiting
- ✅ `users` - Ready for user accounts

### **Built-in Features**
- 🔐 **Row Level Security** - Data protection
- 📊 **Real-time subscriptions** - Live analytics
- 🚀 **Auto-generated APIs** - REST endpoints
- 🛡️ **Built-in auth** - User management ready
- 📈 **Dashboard** - Database monitoring

### **Free Tier Limits**
- 📦 **500MB database storage**
- 👥 **50,000 monthly active users**
- 🔄 **2GB bandwidth**
- 📊 **Real-time connections**
- 🔐 **Unlimited API requests**

---

## 🚀 Next Steps

1. **Create Supabase project** (5 minutes)
2. **Add environment variables** to Vercel
3. **Run the SQL schema** in Supabase
4. **Deploy your app** - it will automatically use Supabase!

Your ReplyPilot will now have enterprise-grade data persistence! 🌟
