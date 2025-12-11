# API Key Validation Framework Investigation

## Key Findings from Documentation

Based on the [Medusa API Key documentation](https://docs.medusajs.com/resources/commerce-modules/api-key/concepts):

### 1. Token Verification Process
- Medusa uses the `authenticate` method of the API Key Module's main service
- The `authenticate` method validates the token against all non-expired tokens
- Reference: [Token Verification](https://docs.medusajs.com/resources/commerce-modules/api-key/concepts#token-verification)

### 2. Publishable API Keys and Sales Channels
- Publishable API keys are associated with specific sales channels
- The Medusa backend **infers the scope of a request** based on the provided key
- This means the API key validation checks if requested resources are accessible through the API key's sales channel
- Reference: [Publishable API Keys](https://docs.medusajs.com/resources/storefront-development/publishable-api-keys)

### 3. Our Test Results
- ✅ `authenticate` method works - API key is valid
- ✅ API key is linked to sales channel
- ✅ Product is linked to sales channel
- ❌ Some HTTP requests still fail with "A valid publishable key is required"

## Hypothesis

The issue is likely related to **request scoping**. When Medusa validates a publishable API key:

1. It authenticates the token (✅ working)
2. It checks if the requested resources are in the API key's sales channel
3. **For certain request patterns (pagination, search, filters), the scoping check might fail**

### Possible Causes

1. **Query Parameter Parsing**: When query params are present, Medusa might be checking scoping before the params are fully parsed, causing validation to fail

2. **Resource Scoping**: Products/collections might need to be explicitly scoped to the sales channel in the query, and when pagination/search params are present, the scoping might not be applied correctly

3. **Middleware Execution Order**: The API key validation middleware might execute at a different point in the request lifecycle for different request patterns

## What We've Verified

### ✅ Working
- API key header is sent correctly (`x-publishable-api-key`)
- API key is created and valid
- API key is linked to sales channel
- Product is linked to sales channel
- `authenticate` method confirms API key is valid

### ❌ Still Failing
- Requests with pagination params (`limit`, `offset`)
- Requests with search params (`q`)
- Requests with filter params (`collection_id`)
- Requests with path parameters

## Next Steps

### 1. Check Request Scoping
Medusa might require the sales channel to be explicitly included in the request context. Try:
- Adding sales channel ID to query params
- Checking if Medusa expects a different header format
- Verifying if the request context needs to be set differently

### 2. Investigate Medusa HTTP Framework
Since we can't easily access the framework source, try:
- Using Medusa's JS SDK instead of axios to see if it handles scoping differently
- Checking if there's a way to set request context in the test runner
- Looking for middleware configuration options

### 3. Test with Different Request Patterns
- Test if the issue is specific to certain endpoints
- Test if the issue is related to the number of query params
- Test if the issue is related to query param types (strings vs arrays)

## Code Changes Made

### test-api-key-validation.ts
- Added `authenticate` method call to verify API key validity
- Confirmed API key is valid at the module level

### seed-test-data.ts
- Added product-sales channel link verification
- Confirmed products are properly linked to sales channels

## References

- [API Key Concepts](https://docs.medusajs.com/resources/commerce-modules/api-key/concepts)
- [Token Verification](https://docs.medusajs.com/resources/commerce-modules/api-key/concepts#token-verification)
- [Publishable API Keys](https://docs.medusajs.com/resources/storefront-development/publishable-api-keys)
- [Admin API - API Keys](https://docs.medusajs.com/api/admin#api-keys_apikey_schema)

---

**Date**: 2025-12-10  
**Status**: ⚠️ API key is valid, but HTTP layer validation fails for certain request patterns - likely a scoping issue



