# Test Fix: Inventory Levels Workflow Input Format

## Problem

**Error**: `Cannot read properties of undefined (reading 'map')`  
**Location**: `createInventoryLevelsWorkflow` in `seed-test-data.ts`  
**Impact**: Blocked cart with items test and all dependent tests

## Root Cause

The `createInventoryLevelsWorkflow` expects the input in a specific format:
```typescript
{
  input: {
    inventory_levels: [...]
  }
}
```

Not:
```typescript
{
  input: [...]
}
```

Additionally, we need to query inventory items using `query.graph` rather than trying to get them from product variants directly.

## Solution

**File Changed**: `integration-tests/helpers/seed-test-data.ts`

**Before**:
```typescript
await createInventoryLevelsWorkflow(container).run({
  input: variants.map((variant: any) => ({
    inventory_item_id: variant.inventory_item_id,
    location_id: stockLocation.id,
    stocked_quantity: 100,
  })),
})
```

**After**:
```typescript
// Use query.graph to get inventory items (same approach as seed.ts)
const query = container.resolve(ContainerRegistrationKeys.QUERY)
const { data: inventoryItems } = await query.graph({
  entity: "inventory_item",
  fields: ["id"],
})

if (inventoryItems && inventoryItems.length > 0) {
  const inventoryLevels = inventoryItems.map((inventoryItem: any) => ({
    inventory_item_id: inventoryItem.id,
    location_id: stockLocation.id,
    stocked_quantity: 100,
  }))
  
  // The workflow expects input: { inventory_levels: [...] }
  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryLevels,
    },
  })
}
```

## Key Changes

1. **Input Format**: Changed from direct array to `{ inventory_levels: [...] }`
2. **Data Source**: Use `query.graph` to get inventory items instead of product variants
3. **Added Import**: `ContainerRegistrationKeys.QUERY`

## Test Results

- **Before**: Test failing with "Cannot read properties of undefined (reading 'map')"
- **After**: Inventory levels created successfully
- **Impact**: Unblocks cart with items test

## Related Files

- `src/scripts/seed.ts` - Uses same format (reference implementation)





