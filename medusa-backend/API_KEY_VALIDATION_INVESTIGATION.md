# API Key Validation Investigation

## Current Status

**Tests**: 13/76 passing (17%)
- ✅ Checkout tests: 7/7 passing
- ✅ Health test: 1/1 passing  
- ⚠️ Products tests: 2/10 passing (API key validation issue)

## Problem Summary

The API key header `x-publishable-api-key` is being sent correctly in all requests (verified via logging), but Medusa backend is still rejecting some requests with:
```
Status: 400
Message: "A valid publishable key is required to proceed with the request"
```

## What's Working

1. ✅ API key is created correctly (starts with `pk_`)
2. ✅ API key is linked to sales channel via `linkSalesChannelsToApiKeyWorkflow`
3. ✅ Header is being sent in all requests (verified via `logRequest`)
4. ✅ Some tests pass: "should list all products", "should get variant details with pricing"
5. ✅ Test isolation is working correctly

## What's Not Working

1. ❌ Tests with additional query params fail (pagination, search, collection filter)
2. ❌ Tests with path parameters fail (product by ID, collection by handle)
3. ❌ API key validation seems to fail for certain request patterns

## Observations

### Passing Tests Pattern
- `GET /store/products` with `region_id` param only
- `GET /store/variants/:id` with `region_id` param

### Failing Tests Pattern
- `GET /store/products` with `region_id` + `limit` + `offset` (pagination)
- `GET /store/products` with `region_id` + `collection_id` array (filter)
- `GET /store/products` with `region_id` + `q` (search)
- `GET /store/products/:id` with `region_id` param (path param)
- `GET /store/collections` (no region_id)
- `GET /store/collections/:handle` (path param)

## Hypothesis

1. **Query Param Serialization**: When multiple query params are present, axios might serialize them in a way that causes Medusa's validation middleware to not recognize the API key header.

2. **Request Context Validation**: Medusa might validate the API key against the request's region/sales channel context, and when certain params are present, the context might not match.

3. **Middleware Execution Order**: The API key validation middleware might execute before query params are parsed, causing validation to fail.

4. **Sales Channel Context**: The API key might need to be validated against a specific sales channel context that's determined by the request params.

## Fixes Attempted

1. ✅ Added axios interceptor to ensure API key header is always included
2. ✅ Set API key header directly in request config (fallback)
3. ✅ Increased wait time after linking API key (1000ms)
4. ✅ Added API key link verification
5. ✅ Ensured proper header merging in test-utils.ts

## Next Steps

1. **Investigate Medusa Framework**: Check how Medusa V2 validates publishable API keys
   - Look for middleware that validates API keys
   - Check if validation depends on request context (region, sales channel)
   - Verify if query params affect validation

2. **Test Different Header Formats**: Try alternative header names or formats
   - `X-Publishable-Api-Key` (capitalized)
   - `x-publishable-key` (without "api")
   - Check Medusa documentation for exact header format

3. **Verify Sales Channel Context**: Ensure the API key's sales channel matches the request context
   - Check if region needs to be linked to sales channel
   - Verify if products need to be in the same sales channel

4. **Check Request Timing**: Ensure API key link is fully committed before making requests
   - Add database transaction commit verification
   - Check if Medusa caches API key links

5. **Debug Medusa Validation**: Add logging to see what Medusa's validation middleware is checking
   - Check if header is being read correctly
   - Verify if API key lookup is successful
   - Check if sales channel validation is passing

## Code Changes Made

### test-utils.ts
- Added axios interceptor to ensure API key header is always included
- Set API key header directly in request config as fallback
- Improved header merging logic

### seed-test-data.ts
- Increased wait time after linking API key (1000ms)
- Added API key link verification using Modules.API_KEY
- Added retry logic for API key linking

## Test Results

```
Test Suites: 8 failed, 1 passed, 9 total
Tests:       63 failed, 13 passed, 76 total
```

## Files Modified

- `medusa-backend/integration-tests/helpers/test-utils.ts`
- `medusa-backend/integration-tests/helpers/seed-test-data.ts`

---

**Date**: 2025-12-10  
**Status**: ⚠️ Investigation in progress - API key header is sent correctly but validation still fails



