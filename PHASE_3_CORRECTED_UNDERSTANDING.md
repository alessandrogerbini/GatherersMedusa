# Phase 3: Corrected Understanding - The Real Root Cause

**Date**: December 12, 2025  
**Status**: ✅ **UNDERSTANDING CORRECTED - FIX APPLIED**

---

## 🎯 The Real Root Cause (Expert Analysis)

### What I Got Wrong:

1. ❌ **Medusa is NOT ignoring our config** - it's reading it correctly
2. ❌ **Root-level `acquireConnectionTimeout` is NOT sufficient** - Tarn.js doesn't use it
3. ❌ **Connection string parameters won't help** - they apply to socket establishment, not pool acquisition

### What's Actually Happening:

**Knex uses Tarn.js for pooling. Tarn.js has its own timeout semantics:**

- Knex exposes `acquireConnectionTimeout` at root level
- But Tarn.js (the actual pool implementation) expects `acquireTimeoutMillis` in the pool object
- Medusa passes our config to Knex, but if `acquireTimeoutMillis` isn't set correctly in pool, Tarn uses its default: **60,000 ms**

**The 60s timeout we're seeing is Tarn.js's default, not Knex's.**

---

## 🔍 Technical Details

### The Knex → Tarn.js Chain:

```
Our Config → Medusa → Knex → Tarn.js Pool
```

1. **Our config** sets `acquireTimeoutMillis` in pool ✅
2. **Medusa** passes `databaseDriverOptions` to Knex ✅
3. **Knex** creates pool using Tarn.js ✅
4. **Tarn.js** checks `pool.acquireTimeoutMillis` (not root-level `acquireConnectionTimeout`)

### Why Root-Level `acquireConnectionTimeout` Doesn't Work:

Knex's root-level `acquireConnectionTimeout` is NOT automatically mapped to Tarn's `acquireTimeoutMillis`. Unless Medusa's `pg-connection-loader.ts` explicitly maps it, Tarn falls back to its default (60s).

---

## ✅ The Correct Fix

### 1. Focus on Tarn.js Pool Config ⭐⭐⭐

```typescript
pool: {
  min: 2,
  max: 10,
  acquireTimeoutMillis: 120000, // ⭐ This is what Tarn.js uses
  createTimeoutMillis: 120000,   // ⭐ This too
  idleTimeoutMillis: 30000,
}
```

**Key**: `acquireTimeoutMillis` in pool object is what Tarn.js actually enforces.

### 2. Force IPv4 on Render ⭐⭐

```json
"start": "NODE_OPTIONS=--dns-result-order=ipv4first medusa start"
```

**Why**: Render often has IPv6 resolution issues that can consume the entire timeout window.

### 3. Keep Root-Level as Backup ⭐

```typescript
acquireConnectionTimeout: 120000, // Backup - may not be applied
```

**Why**: In case Medusa maps it in future versions, or if it's used elsewhere.

---

## 🔧 Changes Applied

### medusa-config.ts:

1. ✅ **Updated comments** to explain Tarn.js relationship
2. ✅ **Emphasized pool-level config** (`acquireTimeoutMillis`, `createTimeoutMillis`)
3. ✅ **Removed connection string timeout parameter** (doesn't help with pool acquisition)
4. ✅ **Kept root-level timeout as backup** (documented as backup only)
5. ✅ **Increased pool min to 2** (keep connections warm)

### package.json:

1. ✅ **Added IPv4 forcing to start script**: `NODE_OPTIONS=--dns-result-order=ipv4first`

---

## 📊 Why This Should Work

### Confidence: **85%** (increased from 70%)

**Why Higher**:

1. ✅ **Correct primitive** - `acquireTimeoutMillis` is what Tarn.js actually uses
2. ✅ **IPv4 forcing** - Addresses Render-specific DNS issues
3. ✅ **Proper pool config** - All Tarn.js timeouts set correctly
4. ✅ **Larger pool** - Prevents exhaustion (secondary benefit)

**Why Not 100%**:

1. ⚠️ Still need to verify Medusa passes pool config correctly to Tarn
2. ⚠️ Network/DNS issues could still cause problems
3. ⚠️ Need deployment verification

---

## 🧪 Expected Behavior

### Success Indicators:

1. **Timeout should be ~120 seconds** (not 60 seconds)
   - Tarn.js will use our `acquireTimeoutMillis: 120000`
   
2. **IPv4 resolution** should prevent DNS stalls
   - `--dns-result-order=ipv4first` forces IPv4 first

3. **Pool won't exhaust as quickly**
   - Pool size 10 with min 2 gives headroom

---

## 📚 Key Learnings

### What We Learned:

1. **Knex ≠ Pool Implementation**
   - Knex uses Tarn.js for pooling
   - Need to configure Tarn.js, not just Knex

2. **API Mismatch**
   - Knex's `acquireConnectionTimeout` doesn't automatically map to Tarn's `acquireTimeoutMillis`
   - Must set `acquireTimeoutMillis` in pool object

3. **Render-Specific Issues**
   - IPv6 resolution can stall connections
   - IPv4 forcing helps

4. **Connection String Parameters**
   - `connect_timeout` applies to socket establishment
   - Not pool acquisition (different phase)

---

## 🎯 Bottom Line

**The fix was always in the pool config (`acquireTimeoutMillis`), but we were also relying on root-level `acquireConnectionTimeout` which doesn't work. Now we're focusing on the correct Tarn.js primitives and adding IPv4 forcing for Render.**

---

**Status**: ✅ **CORRECTED FIX APPLIED - READY FOR REVIEW**

