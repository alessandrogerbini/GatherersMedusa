# Phase 3 Research Findings - Knex Timeout Configuration

**Date**: December 12, 2025  
**Status**: ✅ **RESEARCH COMPLETE**

---

## 🔍 Research Summary

### Key Finding: `acquireConnectionTimeout` is at ROOT Level

**Source**: [Knex.js Configuration Options Documentation](https://knexjs.org/guide/#configuration-options)

**Critical Discovery**:
- `acquireConnectionTimeout` is a **root-level** Knex configuration option
- **NOT** in the `pool` object
- **Default value**: 60000ms (60 seconds) - **This explains our 60s timeouts!**
- This is the timeout when trying to **acquire a connection from the pool**

**Our Previous Mistake**:
- We were setting `acquireTimeoutMillis` in the `pool` object
- This is a **different** parameter (for pool-specific behavior)
- The root-level `acquireConnectionTimeout` was using the default 60 seconds

---

## 📚 Knex.js Timeout Parameters

### Root-Level Parameters:
1. **`acquireConnectionTimeout`** (milliseconds)
   - **Default**: 60000ms (60 seconds)
   - **Purpose**: Timeout when acquiring connection from pool
   - **Location**: Root level of Knex config
   - **This is what we need!**

### Pool-Level Parameters:
1. **`acquireTimeoutMillis`** (milliseconds)
   - **Purpose**: Pool-specific acquire timeout
   - **Location**: `pool` object
   - **Note**: Different from root-level `acquireConnectionTimeout`

2. **`createTimeoutMillis`** (milliseconds)
   - **Purpose**: Timeout when creating new connection
   - **Location**: `pool` object
   - **Note**: This is for connection creation, not acquisition

3. **`idleTimeoutMillis`** (milliseconds)
   - **Purpose**: How long connection stays idle before closing
   - **Location**: `pool` object`

---

## 🔗 References

### Knex.js Documentation:
- **Configuration Options**: https://knexjs.org/guide/#configuration-options
- **Key Section**: `acquireConnectionTimeout` (root level)

### Medusa GitHub Issue:
- **Issue #9607**: https://github.com/medusajs/medusa/issues/9607
- **Finding**: Medusa has limitations with Knex configuration options
- **Relevance**: Confirms that `databaseDriverOptions` should work, but Medusa might have limitations

### Medusa Container Resources:
- **Documentation**: https://docs.medusajs.com/resources/medusa-container-resources
- **Finding**: Knex is registered as `__pg_connection__` in Medusa container
- **Relevance**: Confirms Medusa uses Knex internally

---

## 🎯 Solution Identified

### The Fix:
Add `acquireConnectionTimeout` at the **root level** of `databaseDriverOptions`:

```typescript
databaseDriverOptions: {
  client: 'pg',
  pool: {
    min: 0,
    max: 2,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 120000,
    createTimeoutMillis: 120000,
  },
  acquireConnectionTimeout: 120000, // ⭐ ROOT LEVEL - This is what we were missing!
  connection: { /* ... */ },
}
```

**Why This Should Work**:
- `acquireConnectionTimeout` is the correct parameter name
- It's at the root level (not in pool)
- Default is 60 seconds (explains our timeouts)
- Setting it to 120000ms should fix the issue

---

## 📋 Additional Findings

### PostgreSQL Driver (`pg`) Parameters:
- The `pg` driver (node-postgres) doesn't have a `connectTimeout` parameter
- Connection timeouts are handled by Knex, not the driver directly
- SSL configuration is handled correctly (we have `rejectUnauthorized: false`)

### Medusa's Handling:
- Medusa passes `databaseDriverOptions` directly to Knex
- Based on GitHub issue #9607, Medusa should respect our config
- However, there might be limitations (as mentioned in the issue)

---

## ✅ Enhanced Logging Added

### What We Added:
1. **Full Knex config structure logging**
   - Shows exactly what we're passing to Medusa
   - Helps verify config structure is correct
   - Masks password for security

2. **Root-level timeout logging**
   - Logs `acquireConnectionTimeout` value
   - Helps verify it's being set correctly

### Expected Log Output:
```
[DB Config] Full Knex config structure being passed to Medusa:
{
  "client": "pg",
  "pool": {
    "min": 0,
    "max": 2,
    "idleTimeoutMillis": 30000,
    "acquireTimeoutMillis": 120000,
    "createTimeoutMillis": 120000
  },
  "acquireConnectionTimeout": 120000,
  "connection": {
    "host": "...",
    "port": 5432,
    "database": "...",
    "user": "...",
    "password": "***",
    "ssl": { ... }
  }
}
```

---

## 🧪 Testing Plan

### Local Test:
1. Build locally (`npm run build`)
2. Verify enhanced logging appears
3. Check that `acquireConnectionTimeout` is in the config

### Deployment Test:
1. Deploy and monitor logs
2. Check if enhanced logging shows correct config
3. Monitor timeout behavior (should be 120s, not 60s)

---

## 📊 Confidence Level

### Solution Confidence: **85%**
- ✅ Correct parameter name identified
- ✅ Correct location (root level) identified
- ✅ Default value explains our 60s timeouts
- ⚠️ Still need to verify Medusa doesn't override it

### Risk Assessment:
- **Risk**: LOW (adding a parameter, not removing anything)
- **Impact**: HIGH (should fix timeout issue)
- **Success Probability**: 85%

---

## 🎯 Next Steps

1. ✅ **Research Complete** - Found correct parameter
2. ✅ **Enhanced Logging Added** - Can verify config
3. ⏸️ **Wait for Approval** - Before committing
4. **Test Locally** - Verify build and logging
5. **Deploy** - Monitor timeout behavior

---

**Status**: ✅ **RESEARCH COMPLETE - READY FOR IMPLEMENTATION**

**Key Finding**: `acquireConnectionTimeout` at root level (not in pool) - default 60s explains our timeouts!

