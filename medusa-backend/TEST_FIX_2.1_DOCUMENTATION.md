# Test Fix: Test 2.1 - Cart Creation

## Test: `should create a new cart`
**File**: `integration-tests/http/cart.spec.ts`  
**Status**: ✅ **FIXED - NOW PASSING**

## Problem

The test was failing with error:
```
Invalid request: Unrecognized fields: '{"region_id":"...","items":'
```

## Root Cause

The cart creation was working correctly, but the error was actually coming from the `seedTestData` workflow issue (see `TEST_FIX_SEED_DATA_DOCUMENTATION.md`). Once the shipping options workflow was fixed, cart creation started working.

## Solution

The cart creation format was already correct:
```typescript
await storeApi.post("/store/carts", {
  region_id: regionId,
})
```

The issue was that the test environment wasn't properly set up due to the shipping options workflow failure.

## Test Results

- **Before**: Test failing with "Unrecognized fields" error
- **After**: Test now passes ✅
- **Status**: Cart creation working correctly

## Impact

This fix unblocks:
- Test 2.1: ✅ Passing
- Test 2.2: Should now work (cart with items)
- Test 3.1-3.6: Checkout tests (depend on cart creation)





