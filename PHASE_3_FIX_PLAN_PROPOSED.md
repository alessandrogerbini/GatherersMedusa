# Phase 3 Fix Plan - Proposed (NOT COMMITTED)

**Date**: December 12, 2025  
**Status**: ⏸️ PROPOSED - Awaiting Approval

---

## 📋 Summary of Issues

### Issue 1: TypeScript Build Errors (6 files)
- Build completes with errors (allowed by `|| true`)
- Errors prevent clean builds
- **Impact**: Medium (build succeeds but with warnings)

### Issue 2: Database Connection Timeout (CRITICAL)
- Connections timeout at ~60 seconds (not 120 seconds as configured)
- Pool gets exhausted with failed connections
- Service never starts
- **Impact**: CRITICAL (blocks deployment)

---

## 🔧 Proposed Fixes

### Fix 1: Complete TypeScript Error Fixes

**Files to Fix**:

1. **`src/api/admin/wholesale/route.ts`** (Line 40)
   ```typescript
   // Current (WRONG):
   customers = result?.customers || (Array.isArray(result) ? result : [])
   
   // Fix:
   customers = Array.isArray(result) ? result : []
   ```

2. **`src/api/store/auth/emailpass/register/route.ts`** (Line 15)
   ```typescript
   // Current (WRONG):
   const body = req.body || {}
   const { email, password } = body
   
   // Fix:
   const body = (req.body as { email?: string; password?: string }) || {}
   const { email, password } = body
   ```

3. **`src/api/store/auth/emailpass/reset-password/route.ts`** (Line 15)
   ```typescript
   // Current (WRONG):
   const body = req.body || {}
   const { email } = body
   
   // Fix:
   const body = (req.body as { email?: string }) || {}
   const { email } = body
   ```

4. **`src/api/store/auth/emailpass/token/route.ts`** (Line 16)
   ```typescript
   // Current (WRONG):
   const body = req.body || {}
   const { email, password } = body
   
   // Fix:
   const body = (req.body as { email?: string; password?: string }) || {}
   const { email, password } = body
   ```

5. **`src/api/store/customers/me/route.ts`** (Line 143)
   ```typescript
   // Current (WRONG):
   const body = req.body || {}
   const { first_name, last_name, phone } = body
   
   // Fix:
   const body = (req.body as { first_name?: string; last_name?: string; phone?: string }) || {}
   const { first_name, last_name, phone } = body
   ```

6. **`src/api/store/wholesale/route.ts`** (Lines 13-28)
   ```typescript
   // Current (WRONG):
   const body = req.body || {}
   const {
     business_name,
     contact_name,
     email,
     // ... etc
   } = body
   
   // Fix:
   const body = (req.body as {
     business_name?: string;
     contact_name?: string;
     email?: string;
     phone?: string;
     website?: string;
     tax_id?: string;
     address?: string;
     city?: string;
     state?: string;
     zip?: string;
     country?: string;
     annual_volume?: string;
     product_interests?: string;
     additional_info?: string;
   }) || {}
   const {
     business_name,
     contact_name,
     email,
     // ... etc
   } = body
   ```

**Expected Result**: Clean TypeScript build with no errors

---

### Fix 2: Database Timeout Configuration

**Problem**: `connectionTimeoutMillis` in `connection` object is not being applied. Timeouts occur at ~60 seconds instead of 120 seconds.

**Current Configuration** (in `medusa-config.ts`):
```typescript
databaseDriverOptions: {
  client: 'pg',
  pool: {
    min: 0,
    max: 2,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 120000, // 2 minutes
    createTimeoutMillis: 120000, // 2 minutes
  },
  connection: {
    host: url.hostname,
    port: parseInt(url.port || '5432', 10),
    database: url.pathname.slice(1),
    user: url.username,
    password: url.password,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 120000, // ⚠️ NOT WORKING
  },
}
```

**Proposed Solution**: Try multiple approaches (in order of likelihood):

#### Option A: Remove `connectionTimeoutMillis` from `connection`, rely on `createTimeoutMillis`
**Rationale**: `createTimeoutMillis` in pool might be the correct setting for connection creation timeout.

**Change**:
```typescript
connection: {
  host: url.hostname,
  port: parseInt(url.port || '5432', 10),
  database: url.pathname.slice(1),
  user: url.username,
  password: url.password,
  ssl: { rejectUnauthorized: false },
  // Remove connectionTimeoutMillis - rely on createTimeoutMillis
},
```

#### Option B: Add `connectTimeout` parameter (PostgreSQL-specific)
**Rationale**: PostgreSQL driver might use `connectTimeout` instead of `connectionTimeoutMillis`.

**Change**:
```typescript
connection: {
  host: url.hostname,
  port: parseInt(url.port || '5432', 10),
  database: url.pathname.slice(1),
  user: url.username,
  password: url.password,
  ssl: { rejectUnauthorized: false },
  connectTimeout: 120, // seconds (PostgreSQL driver parameter)
},
```

#### Option C: Use `connectionString` with timeout in URL
**Rationale**: Some drivers respect timeout parameters in connection string.

**Change**:
```typescript
// Add connect_timeout to DATABASE_URL
const databaseUrl = process.env.DATABASE_URL
const urlWithTimeout = databaseUrl.includes('?') 
  ? `${databaseUrl}&connect_timeout=120`
  : `${databaseUrl}?connect_timeout=120`

databaseDriverOptions: {
  client: 'pg',
  pool: { /* ... */ },
  connection: {
    connectionString: urlWithTimeout,
    ssl: { rejectUnauthorized: false },
  },
}
```

**Recommended**: Try Option A first (simplest), then Option B, then Option C.

---

## 🧪 Testing Plan

### Step 1: Fix TypeScript Errors
1. Apply all 6 TypeScript fixes
2. Run `npm run build` locally
3. Verify no TypeScript errors
4. **Expected**: Clean build

### Step 2: Fix Database Timeout (Option A)
1. Apply Option A fix
2. Test build locally
3. **If build succeeds**: Deploy and monitor
4. **If timeout still occurs**: Try Option B

### Step 3: Fix Database Timeout (Option B - if A fails)
1. Apply Option B fix
2. Test build locally
3. Deploy and monitor

### Step 4: Fix Database Timeout (Option C - if B fails)
1. Apply Option C fix
2. Test build locally
3. Deploy and monitor

---

## 📊 Risk Assessment

### TypeScript Fixes
- **Risk**: LOW
- **Success Probability**: 95%
- **Impact**: Medium (enables clean builds)
- **Time**: ~15 minutes

### Database Timeout Fix (Option A)
- **Risk**: LOW
- **Success Probability**: 60%
- **Impact**: CRITICAL (might fix timeout)
- **Time**: ~20 minutes

### Database Timeout Fix (Option B)
- **Risk**: LOW
- **Success Probability**: 40%
- **Impact**: CRITICAL (might fix timeout)
- **Time**: ~20 minutes

### Database Timeout Fix (Option C)
- **Risk**: MEDIUM (changes connection string format)
- **Success Probability**: 30%
- **Impact**: CRITICAL (might fix timeout)
- **Time**: ~20 minutes

---

## 💰 Cost Estimate

### TypeScript Fixes + Option A
- **Pipeline Minutes**: ~17-25 minutes (one deployment)
- **Success Probability**: 60% (TypeScript: 95%, Timeout: 60%)
- **Worth It**: YES (if Option A works)

### If Option A Fails, Try Option B
- **Additional Pipeline Minutes**: ~17-25 minutes
- **Total Cost**: 34-50 minutes
- **Success Probability**: 40% (if Option A fails)

### If Option B Fails, Try Option C
- **Additional Pipeline Minutes**: ~17-25 minutes
- **Total Cost**: 51-75 minutes
- **Success Probability**: 30% (if Options A & B fail)

---

## ✅ Recommended Approach

1. **Fix all TypeScript errors** (6 files)
2. **Test locally** (`npm run build`)
3. **Apply Option A** (remove `connectionTimeoutMillis`, rely on `createTimeoutMillis`)
4. **Test locally** (if possible)
5. **Deploy and monitor**
6. **If timeout persists**: Try Option B
7. **If timeout persists**: Try Option C

---

## 📝 Files to Modify

### TypeScript Fixes:
1. `medusa-backend/src/api/admin/wholesale/route.ts`
2. `medusa-backend/src/api/store/auth/emailpass/register/route.ts`
3. `medusa-backend/src/api/store/auth/emailpass/reset-password/route.ts`
4. `medusa-backend/src/api/store/auth/emailpass/token/route.ts`
5. `medusa-backend/src/api/store/customers/me/route.ts`
6. `medusa-backend/src/api/store/wholesale/route.ts`

### Database Config:
1. `medusa-backend/medusa-config.ts` (Option A, B, or C)

---

## ⚠️ Important Notes

1. **DO NOT COMMIT** until all fixes are tested locally
2. **DO NOT PUSH** until user approves
3. Test build locally after each fix
4. Monitor deployment logs carefully
5. If timeout persists after all options, may need to investigate Medusa's internal connection handling

---

**Status**: ⏸️ **PROPOSED - AWAITING APPROVAL**

**Next Step**: Wait for user approval before implementing fixes

