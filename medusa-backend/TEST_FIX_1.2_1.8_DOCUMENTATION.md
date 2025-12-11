# Test Fix: Tests 1.2 and 1.8 - Collections API

## Tests Fixed
- **Test 1.2**: `should filter products by collection`
- **Test 1.8**: `should list all collections`

## Problem

Both tests were failing with error:
```
Invalid request: Unrecognized fields: 'region_id'
```

## Root Cause

The `/store/collections` endpoint in Medusa V2 does **not** accept `region_id` as a query parameter. Collections are global and not region-specific.

## Solution

**File Changed**: `integration-tests/http/products.spec.ts`

**Before**:
```typescript
const collectionsResponse = await storeApi.get(`/store/collections`, {
  params: {
    region_id: regionId,
  },
})
```

**After**:
```typescript
// Collections endpoint doesn't accept region_id parameter
const collectionsResponse = await storeApi.get(`/store/collections`)
```

## Test Results

- **Before**: Tests failing with "Unrecognized fields: 'region_id'"
- **After**: Tests now pass ✅
- **Status**: Collections API working correctly

## Impact

This fix unblocks:
- Test 1.2: ✅ Passing (filter products by collection)
- Test 1.8: ✅ Passing (list all collections)
- Test 1.9: Should now work (get collection by handle)

## Key Learning

**Collections are global in Medusa V2** - they don't require or accept region_id parameters. Products are filtered by collection, but collections themselves are not region-specific.





