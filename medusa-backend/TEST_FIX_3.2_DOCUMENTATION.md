# Test Fix 3.2 Documentation

## Test: "should set shipping and billing addresses"

**File**: `medusa-backend/integration-tests/http/checkout.spec.ts`  
**Test ID**: 3.2  
**Status**: ✅ **PASSING**

---

## Problem

The test was failing with a 404 error when trying to set shipping and billing addresses on a cart. The test was attempting endpoints in the wrong order.

## Root Cause

The test was trying endpoints in this order:
1. `POST /store/carts/:id/addresses` (doesn't exist - 404)
2. `PATCH /store/carts/:id` (might not be supported)
3. `POST /store/carts/:id` (correct endpoint, but tried last)

In Medusa V2, cart addresses are set via `POST /store/carts/:id` with the address data in the request body, which is what the storefront uses (`sdk.store.cart.update()`).

## Solution

**File**: `medusa-backend/integration-tests/http/checkout.spec.ts`

Changed the endpoint attempt order to try the correct Medusa V2 endpoint first:

```typescript
// In Medusa V2, addresses are set via POST /store/carts/:id with address data in body
// The storefront uses sdk.store.cart.update() which maps to this endpoint
let response
try {
  // Try POST /store/carts/:id first (standard Medusa V2 approach)
  response = await storeApi.post(`/store/carts/${testCartId}`, {
    shipping_address: address,
    billing_address: address,
  })
} catch (error: any) {
  // If POST doesn't work, try PATCH /store/carts/:id (alternative REST approach)
  if (error.response?.status === 404 || error.response?.status === 405) {
    try {
      response = await storeApi.patch(`/store/carts/${testCartId}`, {
        shipping_address: address,
        billing_address: address,
      })
    } catch (patchError: any) {
      // If PATCH also fails, try the addresses endpoint (if it exists)
      try {
        response = await storeApi.post(`/store/carts/${testCartId}/addresses`, {
          shipping_address: address,
          billing_address: address,
        })
      } catch (addressesError: any) {
        throw new Error(`Failed to set addresses. POST: ${error.response?.data?.message || error.message}. PATCH: ${patchError.response?.data?.message || patchError.message}. Addresses endpoint: ${addressesError.response?.data?.message || addressesError.message}`)
      }
    }
  } else {
    // Re-throw if it's not a 404/405
    throw error
  }
}
```

## Key Learnings

1. **Medusa V2 Cart Update Endpoint**: In Medusa V2, cart updates (including addresses) use `POST /store/carts/:id` with the update data in the request body.

2. **Storefront SDK Mapping**: The storefront's `sdk.store.cart.update()` method maps to `POST /store/carts/:id`, not a separate addresses endpoint.

3. **Endpoint Priority**: When testing, try the standard Medusa V2 endpoints first before falling back to alternative approaches.

## Test Result

✅ **PASSING** - Test now correctly uses `POST /store/carts/:id` to set shipping and billing addresses.

---

**Date**: 2025-12-09  
**Related Files**:
- `medusa-backend/integration-tests/http/checkout.spec.ts`





