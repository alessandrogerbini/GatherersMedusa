# Test Fix: seedTestData Workflow Input Issue

## Problem

**Error**: `TypeError: input.map is not a function`  
**Location**: `createShippingOptionsWorkflow` in `seed-test-data.ts`  
**Impact**: Blocked multiple product and cart tests from running properly

## Root Cause

The `createShippingOptionsWorkflow` expects the input to be a **direct array**, not wrapped in an object with a property name. The workflow internally calls `.map()` on the input, expecting it to be an array.

## Solution

**File Changed**: `integration-tests/helpers/seed-test-data.ts`

**Before**:
```typescript
await createShippingOptionsWorkflow(container).run({
  input: {
    name: "Standard Shipping",
    price_type: "flat",
    // ... other fields
  },
})
```

**After**:
```typescript
await createShippingOptionsWorkflow(container).run({
  input: [  // Direct array, not wrapped in object
    {
      name: "Standard Shipping",
      price_type: "flat_rate",
      amount: 500,
      service_zone_id: region.id,
      shipping_profile_id: shippingProfile.id,
      provider_id: "manual_manual",
    },
  ],
})
```

## Key Changes

1. **Input Format**: Changed from object to array
2. **Price Format**: Changed from nested `prices` array to direct `amount` field
3. **Price Type**: Changed from `"flat"` to `"flat_rate"`

## Test Results

- **Before**: Multiple tests failing with "input.map is not a function"
- **After**: Cart creation test now passes ✅
- **Impact**: Unblocks all tests that depend on shipping options being created

## Related Files

- `src/scripts/seed.ts` - Uses same format (reference implementation)





