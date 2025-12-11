# Database Authentication Fix - Complete Instructions

**Issue**: Test runner uses user "aless" with password "1234" but authentication still fails  
**Status**: User exists and password is set correctly

---

## ✅ Current Status

- ✅ User "aless" exists in PostgreSQL
- ✅ User has CREATEDB privilege
- ✅ Password is set to "1234"
- ✅ Direct connection test works: `psql -U aless -h localhost -p 5433` (with password 1234)
- ❌ Test runner still fails authentication

---

## 🔧 Solution Options

### Option 1: Update .env File (Recommended)

The test runner may be reading from the `.env` file. Update it to use the "aless" user:

**Current** (in `.env`):
```
DATABASE_URL=postgres://postgres@localhost:5433/medusa-backend
```

**Update to**:
```
DATABASE_URL=postgres://aless:1234@localhost:5433/medusa-backend
```

**Note**: This will change your development database connection. You may want to:
- Keep the original for development
- Create a separate `.env.test` file (but it's gitignored)

### Option 2: Update All Test Files

Update all test files to pass DATABASE_URL in the `env` parameter:

```typescript
medusaIntegrationTestRunner({
  inApp: true,
  env: {
    DATABASE_URL: "postgres://aless:1234@localhost:5433/medusa-backend-test"
  },
  testSuite: ({ api }) => {
    // tests...
  },
})
```

**Files to update**:
- `integration-tests/http/health.spec.ts` ✅ (already updated)
- `integration-tests/http/products.spec.ts`
- `integration-tests/http/cart.spec.ts`
- `integration-tests/http/checkout.spec.ts`
- `integration-tests/http/customers.spec.ts`
- `integration-tests/http/custom-routes.spec.ts`
- `integration-tests/http/regions.spec.ts`
- `integration-tests/http/new-client-promotions.spec.ts`
- `integration-tests/http/nybs-products-seed.spec.ts`

### Option 3: Check PostgreSQL Authentication Method

The issue might be with PostgreSQL's authentication method. Check `pg_hba.conf`:

**Location**: `G:\FastGrams program files\Postgresql 17\data\pg_hba.conf`

**Look for**:
```
host    all             all             127.0.0.1/32            scram-sha-256
```

**May need to change to** (for local development):
```
host    all             all             127.0.0.1/32            md5
```

Or ensure the password is properly set for scram-sha-256 authentication.

---

## 🧪 Test the Fix

After applying the fix, test with:

```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
$env:TEST_TYPE="integration:http"
$env:NODE_OPTIONS="--experimental-vm-modules"
npx jest integration-tests/http/health.spec.ts --runInBand --forceExit
```

---

## 📝 Quick Fix Command

If you want to update the `.env` file temporarily for tests:

```powershell
# Backup current .env
Copy-Item .env .env.backup

# Update DATABASE_URL (you'll need to edit manually or use sed/awk)
# Change: DATABASE_URL=postgres://postgres@localhost:5433/medusa-backend
# To:     DATABASE_URL=postgres://aless:1234@localhost:5433/medusa-backend
```

---

**Note**: The test runner appears to construct connection strings internally and may not respect the DATABASE_URL passed in `env`. The most reliable solution is likely updating the `.env` file or all test files.







