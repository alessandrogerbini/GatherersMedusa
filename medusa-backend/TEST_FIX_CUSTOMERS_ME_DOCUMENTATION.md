# Test Fix: Customer Profile Endpoints

## Tests Fixed
- **Test 4.8**: `should get customer profile when authenticated`
- **Test 4.9**: `should update customer profile`
- **Test 4.10**: `should reject unauthenticated requests`

## Problem

Tests were failing because the `/store/customers/me` endpoint did not exist. The tests expected:
- GET `/store/customers/me` - Get authenticated customer profile
- POST `/store/customers/me` - Update customer profile
- Both endpoints require Bearer token authentication

## Root Cause

The customer profile endpoints were not implemented in the codebase. Medusa V2 doesn't provide these endpoints by default - they need to be created as custom routes.

## Solution

**File Created**: `src/api/store/customers/me/route.ts`

### GET /store/customers/me

1. **Extract token from Authorization header**
   - Format: `Bearer customer_token_{customerId}_{timestamp}`
   - Validate token format

2. **Parse customer ID from token**
   - Token structure: `customer_token_{customerId}_{timestamp}`
   - Extract customer ID from token parts

3. **Retrieve customer from database**
   - Use `customerModuleService.retrieve(customerId)`
   - Return 404 if customer not found

4. **Return customer profile**
   - Include: id, email, first_name, last_name, phone, timestamps

### POST /store/customers/me

1. **Same authentication as GET**
   - Extract and validate Bearer token
   - Parse customer ID

2. **Extract update data from request body**
   - Accept: first_name, last_name, phone
   - Validate at least one field provided

3. **Update customer**
   - Use `customerModuleService.update(customerId, updateData)`
   - Return updated customer profile

## Implementation Details

### Token Format
The token format matches what's generated in `/store/auth/emailpass/token`:
```
customer_token_{customerId}_{timestamp}
```

### Error Handling
- **401 Unauthorized**: Missing or invalid Authorization header
- **401 Invalid token**: Token format doesn't match expected pattern
- **404 Not found**: Customer ID from token doesn't exist
- **400 Bad request**: No fields to update (POST only)
- **500 Server error**: Database or other errors

## Test Results

- **Before**: Tests failing with 404 (endpoint not found)
- **After**: Tests now pass ✅
- **Status**: Customer profile endpoints working correctly

## Impact

This fix unblocks:
- Test 4.8: ✅ Passing (get customer profile)
- Test 4.9: ✅ Passing (update customer profile)
- Test 4.10: ✅ Passing (reject unauthenticated)

## Key Learning

**Medusa V2 requires custom implementation** for customer profile endpoints. The framework provides the customer module service, but the HTTP endpoints must be created manually.





