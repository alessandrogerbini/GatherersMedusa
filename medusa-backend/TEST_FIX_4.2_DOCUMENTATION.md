# Test Fix: Test 4.2 - Duplicate Email Registration

## Test: `should reject duplicate email registration`
**File**: `integration-tests/http/customers.spec.ts`  
**Status**: ✅ **FIXED**

## Problem

The test was failing because when `createCustomers` is called with an email that already exists, it throws an error instead of returning a status code. The error was being caught in the catch block and returned as a generic 400 error.

## Root Cause

In Medusa V2, `customerModuleService.createCustomers()` throws a `MedusaError` when attempting to create a customer with an email that already exists. The error message is: "Customer with email: {email}, has_account: false, already exists."

## Solution

**File Changed**: `src/api/store/auth/emailpass/register/route.ts`

**Before**:
```typescript
const customers = await customerModuleService.createCustomers([{
  email,
}])
```

**After**:
```typescript
let customers
try {
  customers = await customerModuleService.createCustomers([{
    email,
  }])
} catch (createError: any) {
  // If customer already exists, createCustomers throws an error
  // Check if it's a duplicate email error
  if (createError.message && createError.message.includes("already exists")) {
    res.status(400).json({
      message: "Customer with this email already exists",
    })
    return
  }
  // Re-throw other errors
  throw createError
}
```

## Test Results

- **Before**: Test failing (error not properly handled)
- **After**: Test now passes ✅
- **Status**: Duplicate email detection working correctly

## Impact

This fix ensures:
- Test 4.2: ✅ Passing (duplicate email rejection)
- Proper error handling for duplicate registrations
- Consistent error messages for API consumers





