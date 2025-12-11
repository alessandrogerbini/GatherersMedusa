# Test 4.1 Fix Documentation

## Test: `should register a new customer`
**File**: `integration-tests/http/customers.spec.ts`  
**Status**: ✅ **FIXED - NOW PASSING**

## Problem

The test was failing with error:
```
TypeError: customerModuleService.create is not a function
```

## Root Cause

In Medusa V2, the customer module service does not have a `create()` method. The correct method is `createCustomers()` (plural), which expects an array of customer data objects.

## Solution

**File Changed**: `src/api/store/auth/emailpass/register/route.ts`

**Before**:
```typescript
const customer = await customerModuleService.create({
  email,
})
```

**After**:
```typescript
// In Medusa V2, use createCustomers (plural) method
// The method expects an array of customer data
const customers = await customerModuleService.createCustomers([{
  email,
}])

const customer = customers[0]
```

## Additional Fixes

1. **Content-Type Header**: Added explicit `Content-Type: application/json` header in `test-utils.ts` POST method to ensure request body is properly parsed.

## Test Results

- **Before**: 0/13 customer tests passing
- **After**: 1/13 customer tests passing (Test 4.1)
- **Status**: Test 4.1 now passes ✅

## Impact

This fix unblocks:
- Test 4.1: ✅ Passing
- Test 4.2: Should now work (duplicate email check)
- Test 4.3: Should now work (email validation)
- Test 4.4: Should now work (password validation)
- Test 4.5: Depends on this (login needs registered customer)

## Next Steps

Proceed to Test 4.5 (Customer Login) which has a similar body parsing issue.





