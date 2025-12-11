# Test Fix Execution Plan - 56 Tests

## Current Status
- ✅ 17 tests passing
- ❌ 56 tests failing (but running!)
- ✅ Infrastructure working

## Fix Categories & Execution Order

### Fix 1: API Key Creation (BLOCKING - ~20 tests)
**Issue**: "A valid publishable key is required" - API key not working
**Tests**: Products (8), Cart (some), Collections (2)

**Action**: Debug API key creation, ensure token is correct format

---

### Fix 2: Customer Auth Endpoints (13 tests)
**Issue**: 404/400 on `/store/auth/emailpass/*` endpoints
**Tests**: All customer auth tests

**Action**: Check if endpoints exist, update to correct paths

---

### Fix 3: Custom Routes (13 tests)
**Issue**: 400 errors on custom routes
**Tests**: Contact, newsletter, wholesale, admin routes

**Action**: Verify routes exist, fix request format

---

### Fix 4: Cart/Checkout (16 tests)
**Issue**: Need products to exist
**Tests**: Cart operations, checkout flow

**Action**: Ensure products seeded and linked to sales channels

---

### Fix 5: Service Tests (14 tests)
**Issue**: Service initialization problems
**Tests**: Promotions, NYBS seed

**Action**: Fix container resolution, service setup

---

## Execution Strategy

**One fix at a time, test after each fix**

1. Fix API key → Test products
2. Fix customer auth → Test customers
3. Fix custom routes → Test custom routes
4. Fix cart/checkout → Test cart/checkout
5. Fix services → Test services

---

## Progress

- [ ] Fix 1: API Key
- [ ] Fix 2: Customer Auth
- [ ] Fix 3: Custom Routes
- [ ] Fix 4: Cart/Checkout
- [ ] Fix 5: Services







