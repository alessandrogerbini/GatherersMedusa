# API Key Validation Investigation - Findings

## Current Status

**Tests**: 13/76 passing (17%)
- ✅ Checkout tests: 7/7 passing
- ✅ Health test: 1/1 passing  
- ⚠️ Products tests: 2/10 passing

## Key Findings

### 1. API Key Header is Being Sent Correctly ✅
- Verified via logging: `x-publishable-api-key` header is present in all requests
- Header value is correct format (starts with `pk_`)
- Both axios interceptor and direct header setting are working

### 2. API Key is Created and Linked ✅
- API key is created successfully via `createApiKeysWorkflow`
- API key is linked to sales channel via `linkSalesChannelsToApiKeyWorkflow`
- Link is verified to exist in database

### 3. Medusa Validation is Rejecting Requests ❌
- Error: "A valid publishable key is required to proceed with the request"
- This error comes from Medusa's backend validation middleware
- Some requests pass, others fail with the same setup

### 4. Pattern Analysis

**Passing Tests:**
- `GET /store/products` with `region_id` only
- `GET /store/variants/:id` with `region_id`

**Failing Tests:**
- `GET /store/products` with `region_id` + `limit` + `offset` (pagination)
- `GET /store/products` with `region_id` + `collection_id` (filter)
- `GET /store/products` with `region_id` + `q` (search)
- `GET /store/products/:id` with `region_id` (path param)
- `GET /store/collections` (no region_id)
- `GET /store/collections/:handle` (path param)

## Hypothesis

The issue appears to be related to **how Medusa validates the API key in the request context**. When certain query parameters or path parameters are present, Medusa's validation middleware might be:

1. **Checking API key against request context**: The validation might check if the API key's sales channel matches the request's region/sales channel context, and when multiple params are present, the context might not match.

2. **Middleware execution order**: The API key validation middleware might execute before query params are fully parsed, causing validation to fail.

3. **Request routing**: Different request patterns might route through different middleware stacks, some of which might not have the API key validation configured correctly.

## Next Steps

1. **Investigate Medusa Framework Source**: Check how Medusa V2's HTTP framework validates publishable API keys
   - Look for middleware that validates `x-publishable-api-key` header
   - Check if validation depends on request context (region, sales channel)
   - Verify if query params affect validation

2. **Test with Medusa SDK**: Try using Medusa's official JS SDK instead of axios to see if it handles API key validation differently

3. **Check Request Context**: Ensure the API key's sales channel matches the request's region context
   - Verify region is linked to sales channel
   - Check if products are in the correct sales channel

4. **Debug Medusa Validation**: Add logging to see what Medusa's validation middleware is checking
   - Check if header is being read correctly
   - Verify if API key lookup is successful
   - Check if sales channel validation is passing

## Code Changes Made

### test-utils.ts
- Added axios interceptor to ensure API key header is always included
- Set API key header directly in request config as fallback
- Set API key as default header on axios instance
- Improved header merging logic
- Added detailed request logging

### seed-test-data.ts
- Increased wait time after linking API key (1000ms)
- Added API key link verification using query API
- Added API key validation test

### test-api-key-validation.ts (NEW)
- Created utility to test API key validation
- Queries database to verify API key exists and is linked
- Helps debug validation issues

## Files Modified

- `medusa-backend/integration-tests/helpers/test-utils.ts`
- `medusa-backend/integration-tests/helpers/seed-test-data.ts`
- `medusa-backend/integration-tests/helpers/test-api-key-validation.ts` (NEW)

---

**Date**: 2025-12-10  
**Status**: ⚠️ Investigation in progress - API key header is sent correctly but Medusa's validation middleware is rejecting some requests



