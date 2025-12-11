# Test Fix: Test 2.2 - Cart Creation with Items

## Test: `should create cart with items`
**File**: `integration-tests/http/cart.spec.ts`  
**Status**: ✅ **FIXED**

## Problem

The test was failing with error:
```
Sales channel sc_... is not associated with any stock location for variant variant_...
```

## Root Cause

When creating a cart with items, Medusa V2 requires:
1. A stock location to exist
2. The sales channel to be linked to the stock location
3. Inventory levels to be set for the variants

The `seedTestData` helper was missing these critical setup steps.

## Solution

**File Changed**: `integration-tests/helpers/seed-test-data.ts`

**Added**:
1. **Stock Location Creation**:
```typescript
const { result: stockLocationResult } = await createStockLocationsWorkflow(container).run({
  input: {
    locations: [
      {
        name: "Test Warehouse",
        address: {
          city: "Copenhagen",
          country_code: "DK",
          address_1: "Test Street 1",
        },
      },
    ],
  },
})
const stockLocation = stockLocationResult[0]
```

2. **Link Sales Channel to Stock Location**:
```typescript
await linkSalesChannelsToStockLocationWorkflow(container).run({
  input: {
    id: stockLocation.id,
    add: [salesChannels[0].id],
  },
})
```

3. **Create Inventory Levels for Variants**:
```typescript
const variants = product.variants || []
if (variants.length > 0) {
  await createInventoryLevelsWorkflow(container).run({
    input: variants.map((variant: any) => ({
      inventory_item_id: variant.inventory_item_id,
      location_id: stockLocation.id,
      stocked_quantity: 100,
    })),
  })
}
```

4. **Added Imports**:
```typescript
import {
  // ... existing imports
  linkSalesChannelsToStockLocationWorkflow,
  createStockLocationsWorkflow,
  createInventoryLevelsWorkflow
} from "@medusajs/core-flows"
```

## Test Results

- **Before**: Test failing with "Sales channel not associated with stock location"
- **After**: Test now passes ✅
- **Status**: Cart creation with items working correctly

## Impact

This fix unblocks:
- Test 2.2: ✅ Passing (cart with items)
- Test 2.4: Should now work (add line item)
- Test 2.5: Should now work (update line item)
- Test 2.6: Should now work (remove line item)
- Test 3.1-3.7: Checkout tests (depend on cart with items)

## Key Learnings

1. **Stock Location is Required**: Medusa V2 requires stock locations for cart operations
2. **Sales Channel Linking**: Sales channels must be linked to stock locations
3. **Inventory Levels**: Variants need inventory levels at stock locations to be added to carts





