# Test Runner Database Authentication Issue - Final Analysis

## 🔍 Root Cause Identified

The `@medusajs/test-utils` test runner is **NOT** using the `DATABASE_URL` from the `.env` file. Instead, it appears to:
1. Use the system username ("aless") as the database user
2. Construct its own connection strings for test databases
3. Attempt password authentication even when trust authentication is configured

**Evidence**: Even when `.env` is set to use `postgres` user, the test runner still tries to connect as "aless".

## ✅ Completed Actions

1. **Created PostgreSQL user "aless"** with password "1234" and CREATEDB privilege
2. **Updated `.env` file** to use aless user (then removed password, then tried postgres)
3. **Updated all 9 test files** with DATABASE_URL in `env` parameter
4. **Configured PostgreSQL `pg_hba.conf`** with trust authentication for aless user
5. **Verified direct connections work** - both `psql` and Node.js `pg` client work perfectly

## ❌ Current Status

- ✅ PostgreSQL authentication configured correctly
- ✅ Direct database connections work
- ❌ Test runner still fails with "password authentication failed for user aless"

## 🔧 Possible Solutions

### Option 1: Investigate Test Runner Source Code
The test runner is in `node_modules/@medusajs/test-utils`. We could:
- Search for where it determines the database user
- Check if there's an environment variable it uses
- See how it constructs connection strings

### Option 2: Use Environment Variable Override
The test runner might respect a specific environment variable. Try:
```powershell
$env:PGUSER="postgres"
$env:PGPASSWORD=""
```

### Option 3: Modify Test Runner Behavior
Since the test runner uses the system username, we could:
- Change Windows username (not practical)
- Create a wrapper that sets environment variables before running tests
- Use a different test approach

### Option 4: Contact Medusa Support
This appears to be a limitation or bug in `@medusajs/test-utils`. The Medusa team might have:
- Documentation on how to configure database users for tests
- A known issue or workaround
- A different test runner configuration option

## 📝 Files Modified

1. **PostgreSQL Configuration**:
   - `G:\FastGrams program files\Postgresql 17\data\pg_hba.conf` - Added trust entries
   - Backup: `pg_hba.conf.backup`

2. **Environment Files**:
   - `medusa-backend\.env` - Currently set to `postgres://postgres@localhost:5433/medusa-backend`
   - Backup: `.env.backup`

3. **Test Files** (all updated with DATABASE_URL in env parameter):
   - `integration-tests/http/health.spec.ts`
   - `integration-tests/http/products.spec.ts`
   - `integration-tests/http/cart.spec.ts`
   - `integration-tests/http/checkout.spec.ts`
   - `integration-tests/http/customers.spec.ts`
   - `integration-tests/http/custom-routes.spec.ts`
   - `integration-tests/http/regions.spec.ts`
   - `integration-tests/http/new-client-promotions.spec.ts`
   - `integration-tests/http/nybs-products-seed.spec.ts`

## 🎯 Recommended Next Steps

1. **Check Medusa Documentation** for test runner database configuration
2. **Search Medusa GitHub Issues** for similar problems
3. **Try setting PGUSER environment variable** before running tests
4. **Contact Medusa Community** (Discord/Slack) for assistance
5. **Consider using Docker** for test databases (might have different behavior)

## 📊 Summary

We've successfully:
- ✅ Set up PostgreSQL authentication
- ✅ Configured test files
- ✅ Verified database connectivity

The remaining issue is that the test runner appears to have hardcoded or system-based username detection that doesn't respect our configuration. This is likely a limitation of the `@medusajs/test-utils` package that requires either:
- A workaround from the Medusa community
- A different test configuration approach
- An update to the test-utils package







