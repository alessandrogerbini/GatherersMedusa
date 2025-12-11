# Detailed Test Fix Plan - 56 Failing Tests

**Date**: December 8, 2025  
**Status**: Planning systematic fixes

---

## Test Failure Analysis

### Error Patterns

1. **400 Errors - "A valid publishable key is required"**
   - Products API tests (8 tests)
   - Cart tests (some)
   - Collections tests
   - **Root Cause**: API key not being created/used correctly

2. **404 Errors - Customer Auth Endpoints**
   - `/store/auth/emailpass/register` - 404
   - `/store/auth/emailpass/token` - 400
   - **Root Cause**: Endpoints may not exist or use different path

3. **400 Errors - Custom Routes**
   - `/store/contact` - 400
   - `/store/newsletter` - 400
   - `/store/wholesale` - 400
   - **Root Cause**: Routes may need different request format or don't exist

---

## Fix Plan by Category

### Category 1: API Key Issues (Priority 1) - ~20 tests

**Problem**: API key not being created or passed correctly

**Tests Affected**:
- Products API: 8 tests
- Cart API: Some tests
- Collections: 2 tests

**Fix Steps**:
1. ✅ Enhanced seed-test-data.ts with products
2. ⏳ Fix API key creation - ensure token is returned correctly
3. ⏳ Verify API key is linked to sales channel
4. ⏳ Test API key is passed in headers

**Status**: In Progress

---

### Category 2: Customer Auth Endpoints (Priority 2) - 13 tests

**Problem**: Endpoints return 404 or 400

**Tests Affected**:
- Customer registration: 4 tests
- Customer login: 3 tests
- Customer profile: 3 tests
- Password reset: 1 test
- Customer orders: 1 test

**Fix Steps**:
1. ⏳ Check if auth endpoints exist in Medusa V2
2. ⏳ Verify endpoint paths match Medusa V2 structure
3. ⏳ Update tests to use correct endpoints
4. ⏳ Or create custom auth routes if needed

**Status**: Pending

---

### Category 3: Custom Routes (Priority 3) - 13 tests

**Problem**: Custom routes return 400 errors

**Tests Affected**:
- `/store/contact`: 2 tests
- `/store/newsletter`: 2 tests
- `/store/wholesale`: 2 tests
- `/store/contract-manufacturing`: 1 test
- `/admin/custom`: 1 test
- `/admin/wholesale`: 3 tests
- `/admin/product-prices`: 1 test

**Fix Steps**:
1. ⏳ Check if routes exist
2. ⏳ Verify request format
3. ⏳ Fix route implementations or update tests

**Status**: Pending

---

### Category 4: Cart/Checkout Tests (Priority 4) - ~16 tests

**Problem**: Tests need products to exist

**Tests Affected**:
- Cart tests: ~9 tests
- Checkout tests: ~7 tests

**Fix Steps**:
1. ⏳ Ensure products are seeded (in progress)
2. ⏳ Link products to sales channels
3. ⏳ Add inventory levels
4. ⏳ Test cart creation with products

**Status**: Pending (depends on Category 1)

---

### Category 5: Service Tests (Priority 5) - 14 tests

**Problem**: Service initialization or module issues

**Tests Affected**:
- New Client Promotions: 4 tests
- NYBS Products Seed: 10 tests

**Fix Steps**:
1. ⏳ Fix container resolution
2. ⏳ Fix service initialization
3. ⏳ Fix module dependencies

**Status**: Pending

---

## Execution Order

1. **Fix API Key Issues** (Category 1) - Blocks many tests
2. **Fix Customer Auth** (Category 2) - 13 tests
3. **Fix Custom Routes** (Category 3) - 13 tests
4. **Fix Cart/Checkout** (Category 4) - Depends on #1
5. **Fix Service Tests** (Category 5) - 14 tests

---

## Progress Tracking

- [x] Create detailed plan
- [ ] Fix API key creation (Category 1)
- [ ] Fix customer auth endpoints (Category 2)
- [ ] Fix custom routes (Category 3)
- [ ] Fix cart/checkout tests (Category 4)
- [ ] Fix service tests (Category 5)

---

## Next Action

**Current Focus**: Fix API key creation in seed-test-data.ts

**Issue**: API key token not being returned correctly or not valid

**Solution**: 
1. Check how seed.ts creates API keys
2. Ensure token format is correct
3. Verify API key is properly linked to sales channel
4. Test API key works with a simple request







