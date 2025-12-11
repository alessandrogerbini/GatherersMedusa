# Systematic Test Fix Plan

## Current Status
- **Total Tests**: 73
- **Passing**: 7 (9.6%)
- **Failing**: 66 (90.4%)

## Fixes Completed ✅

1. ✅ Test 4.1 - Customer Registration
2. ✅ Test 4.5 - Customer Login  
3. ✅ seedTestData Workflow Input Fix
4. ✅ Test 2.1 - Cart Creation
5. ✅ Test 4.2 - Duplicate Email (in progress)

## Systematic Approach

### Phase 1: Customer Tests (13 tests)
**Status**: 2/13 passing

**Remaining**:
- Test 4.2: Duplicate email (just fixed, verify)
- Test 4.3: Email format validation
- Test 4.4: Password strength validation
- Test 4.6-4.7: Login validation
- Test 4.8-4.11: Authenticated endpoints
- Test 4.12: Password reset

**Strategy**: Fix validation tests first (4.3, 4.4), then authenticated endpoints (4.8+)

### Phase 2: Product Tests (10 tests)
**Status**: 2/10 passing

**Remaining**:
- Test 1.1: Pagination (API key header issue)
- Test 1.2: Collection filtering
- Test 1.3: Search query
- Test 1.4-1.5: Product detail
- Test 1.6: Variants listing
- Test 1.7-1.8: Collections

**Strategy**: Fix API key header passing for GET requests with params

### Phase 3: Cart/Checkout Tests (17 tests)
**Status**: 1/17 passing

**Remaining**:
- Test 2.2: Cart with items
- Test 2.3: 404 for non-existent cart
- Test 3.1-3.7: All checkout tests

**Strategy**: Fix cart with items first, then checkout flow

### Phase 4: Other Tests (33 tests)
- Regions: 1/4 passing
- Custom Routes: 1/13 passing
- Promotions: 0/4 passing
- NYBS Seed: 0/10 passing

## Next Immediate Actions

1. Verify Test 4.2 fix
2. Fix Tests 4.3-4.4 (validation tests)
3. Fix Test 1.1 (API key header for params)
4. Continue systematically through each category

## Documentation Standard

For each fix:
1. Identify the test
2. Understand the failure
3. Find root cause
4. Implement fix
5. Verify fix
6. Document in `TEST_FIX_<TEST_ID>_DOCUMENTATION.md`
7. Update progress tracker





