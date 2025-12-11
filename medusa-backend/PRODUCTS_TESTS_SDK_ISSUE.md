# Products API Tests - SDK Issue Summary

## Current Status
- **3/10 tests passing** (30%)
- **7/10 tests failing** with "A valid publishable key is required to proceed with the request"

## Root Cause
The Medusa JS SDK is **not automatically sending the publishable key header** when query parameters are present in `client.fetch` requests, even though:
1. SDK is configured with `publishableKey`
2. SDK is configured with `globalHeaders` containing the publishable key
3. Tests pass individually but fail when run together

## Passing Tests
- ✅ "should list all products" - Simple GET without complex query params
- ✅ "should filter products by collection" - Has query params but passes
- ✅ "should get variant details with pricing" - Path parameter request

## Failing Tests
- ❌ "should support pagination" - Has `limit` and `offset` query params
- ❌ "should support search query" - Has `q` query param
- ❌ "should get a single product by ID" - Path parameter + query params
- ❌ "should return 404 for non-existent product" - Path parameter
- ❌ "should list product variants" - Has query params
- ❌ "should list all collections" - No query params but fails
- ❌ "should get collection by handle" - Path parameter

## Attempted Fixes
1. ✅ Explicitly passing `x-publishable-api-key` header - **Overrides SDK's automatic handling**
2. ✅ Using `globalHeaders` configuration - **Still not working**
3. ✅ Removing explicit headers to let SDK handle automatically - **Works individually, fails together**

## Next Steps
1. **Use SDK's typed methods** instead of `client.fetch` (e.g., `sdk.store.product.list()`)
2. **Fall back to axios** for requests with query parameters
3. **Investigate SDK bug** - This might be a known issue with the SDK
4. **Recreate SDK client** for each test to avoid state issues

## Files Modified
- `integration-tests/helpers/create-sdk-client.ts` - SDK wrapper
- `integration-tests/helpers/test-utils.ts` - SDK client creation
- `integration-tests/http/products.spec.ts` - Using SDK

---

**Date**: 2025-12-10  
**Status**: ⚠️ SDK issue preventing 100% test pass rate



