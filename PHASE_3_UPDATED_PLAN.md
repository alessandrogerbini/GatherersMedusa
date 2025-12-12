# Phase 3: Updated Plan - Critical Fixes Required

**Date**: December 12, 2025  
**Status**: 🔴 Still Failing - Need Different Approach  
**Issue**: Database timeout persists, TypeScript error fixed

---

## 🔴 Current Issues

### Issue 1: Database Connection Timeout (CRITICAL)
- **Error**: Still timing out at ~1 minute (not 2 minutes)
- **Root Cause**: Medusa v2 is **NOT using our `databaseDriverOptions` settings**
- **Evidence**: Timeout happens at default Knex timeout (~60 seconds), not our 120-second setting

### Issue 2: TypeScript Build Warning (FIXED ✅)
- **Error**: `NOTIFICATION_MODULE` import path was wrong
- **Fix Applied**: Changed import from `../notification` to `../modules/notification`
- **Status**: Should be resolved in next build

---

## 🎯 Root Cause Analysis

### Why `databaseDriverOptions` Isn't Working

**Hypothesis**: Medusa v2 might:
1. Ignore `databaseDriverOptions` when `databaseUrl` is provided
2. Use `databaseUrl` directly without merging options
3. Require a different configuration method entirely

**Evidence**:
- Timeout is consistently ~1 minute (default Knex)
- Our 2-minute timeout settings are never applied
- Multiple configuration attempts have failed

---

## ✅ Solution 1: Test Connection from Render Shell (CRITICAL FIRST STEP)

**This is the MOST IMPORTANT diagnostic step!**

### Why This Matters:
- If `psql` works → Connection string is correct, problem is Medusa config
- If `psql` fails → Connection string or network is the problem

### Steps:
1. Go to Render Dashboard → Web Service → Shell tab
2. Run these commands:

```bash
# Verify DATABASE_URL is set
echo $DATABASE_URL

# Test connection with psql
psql $DATABASE_URL -c "SELECT version();"
```

### Expected Results:
- ✅ **If psql works**: Connection string is correct, focus on Medusa configuration
- ❌ **If psql fails**: Fix connection string or network first

---

## ✅ Solution 2: Use DATABASE_URL with Query Parameters

If Medusa ignores `databaseDriverOptions`, try adding timeout to the URL itself:

### Update DATABASE_URL in Render Environment Variables:

**Current Format:**
```
postgresql://medusabackend_user:[PASSWORD]@dpg-d4tgtpemcj7s73bsdaig-a/medusabackend?sslmode=require
```

**New Format (with connection timeout):**
```
postgresql://medusabackend_user:[PASSWORD]@dpg-d4tgtpemcj7s73bsdaig-a/medusabackend?sslmode=require&connect_timeout=120
```

**Note**: PostgreSQL connection string parameters:
- `connect_timeout=120` - Connection timeout in seconds (2 minutes)
- `sslmode=require` - SSL required

### Steps:
1. Go to Render Dashboard → Web Service → Environment tab
2. Edit `DATABASE_URL` environment variable
3. Add `&connect_timeout=120` to the URL
4. Save and redeploy

---

## ✅ Solution 3: Simplify medusa-config.ts (Remove databaseDriverOptions)

If Medusa v2 doesn't support `databaseDriverOptions` properly, use minimal config:

### Updated Configuration:

```typescript
module.exports = defineConfig({
  projectConfig: {
    // Use only databaseUrl - let it handle everything
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "./src/modules/notification",
    },
    {
      resolve: "./src/modules/new-client-promotions",
    },
  ],
})
```

**Then rely on DATABASE_URL query parameters for timeout** (Solution 2)

---

## ✅ Solution 4: Use External Database URL Format

Render databases have two connection formats:
- **Internal**: `dpg-xxx-a` (for services in same region)
- **External**: `dpg-xxx-a.ohio-postgres.render.com:5432` (for external connections)

### Try External Format:

**In Render Environment Variables, update DATABASE_URL to:**

```
postgresql://medusabackend_user:[PASSWORD]@dpg-d4tgtpemcj7s73bsdaig-a.ohio-postgres.render.com:5432/medusabackend?sslmode=require&connect_timeout=120
```

**Note**: This is the format that worked locally. Render services might need external format.

---

## 🚨 Immediate Action Plan (Priority Order)

### Step 1: Test from Render Shell (5 minutes) ⭐⭐⭐
**DO THIS FIRST** - Most critical diagnostic

```bash
# In Render Shell
echo $DATABASE_URL
psql $DATABASE_URL -c "SELECT version();"
```

**If this works**: Proceed with Solution 2 or 3
**If this fails**: Fix connection string first (Solution 4)

### Step 2: Update DATABASE_URL with Timeout (2 minutes) ⭐⭐
1. Go to Render Dashboard → Environment tab
2. Edit `DATABASE_URL`
3. Add `&connect_timeout=120` to the URL
4. Save (triggers auto-deploy)

### Step 3: Simplify medusa-config.ts (5 minutes) ⭐⭐
1. Remove `databaseDriverOptions` entirely
2. Use only `databaseUrl`
3. Commit and push changes

### Step 4: If Still Failing, Try External URL Format (2 minutes) ⭐
1. Update `DATABASE_URL` to use external format
2. Include `connect_timeout=120` parameter
3. Save and redeploy

---

## 📊 Success Probability

### After Shell Test:
- **If psql works**: 70-80% (Medusa config issue - fixable)
- **If psql fails**: 30-40% (Network/connection issue - harder)

### After Adding connect_timeout:
- **If Medusa respects URL params**: 80-90% (Easy fix)
- **If Medusa ignores URL params**: 40-50% (Need alternative)

### After Simplifying Config:
- **If minimal config works**: 60-70% (Medusa might prefer simple config)
- **If still fails**: 30-40% (Fundamental connection issue)

---

## 🔍 Diagnostic Checklist

Before trying solutions, verify:

- [ ] DATABASE_URL format is correct in Render
- [ ] Password doesn't contain special characters needing encoding
- [ ] Database service is running on Render
- [ ] Network allows connection from Render to database
- [ ] SSL mode is correct (`sslmode=require` for production)

---

## 💡 Key Insights

1. **Timeout is ~1 minute** → Our settings aren't being applied
2. **Medusa might ignore `databaseDriverOptions`** → Need alternative approach
3. **Connection fails immediately** → Network or connection string issue
4. **Shell test is critical** → Will tell us if it's config or connection

---

## 📝 Files to Update

1. ✅ `medusa-backend/src/modules/new-client-promotions/service.ts` - Fixed import path
2. ⬜ `medusa-backend/medusa-config.ts` - Simplify (remove databaseDriverOptions)
3. ⬜ Render Environment Variables - Add `connect_timeout=120` to DATABASE_URL

---

## 🎯 Expected Outcome

After applying solutions:
- ✅ Connection should use 2-minute timeout (from URL parameter)
- ✅ Service should start successfully
- ✅ Port binding should be detected
- ✅ Health endpoint should respond

---

**Status**: Ready to execute. **Start with Step 1 (Shell test) FIRST!**

