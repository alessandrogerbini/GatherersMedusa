# Test Failures Quick Reference

## Summary
- **Total**: 73 tests
- **Passing**: 12 (16%)
- **Failing**: 61 (84%)

## Quick Fix Priority

### 🔴 CRITICAL (Start Here)
1. **Test 4.1** - Customer registration body parsing
2. **Test 4.5** - Customer login body parsing
3. **Test 1.1** - API key header for GET requests with params
4. **Test 2.1** - Cart creation request format

### 🟠 HIGH Priority
5. **Test 4.8** - Customer profile with auth token
6. **Test 3.1** - Shipping method (needs cart)
7. **Test 3.2** - Address setting (needs cart)
8. **Test 3.6** - Cart completion (needs cart + shipping + address)
9. **Test 7.1** - Welcome promotion (needs registration)

### 🟡 MEDIUM Priority
- Product detail retrieval (1.4)
- Regions validation (5.1)
- Contact form (6.1)
- Newsletter (6.3)
- NYBS seed script (8.1)

### 🟢 LOW Priority
- Validation tests
- 404 tests
- Admin routes (may already be passing)

## Common Issues

| Issue | Affects | Fix Location |
|-------|---------|--------------|
| API key header not passed | ~30 tests | `test-utils.ts` |
| Request body not parsed | ~13 tests | Route handlers |
| Cart creation format | ~7 tests | Cart API spec |
| Missing routes | ~1 test | Create route |
| Event subscribers | ~2 tests | Event system |
| Seed script | ~10 tests | Seed script |

## Test File Breakdown

| File | Passing | Failing | Total |
|------|---------|---------|-------|
| `health.spec.ts` | 1 | 0 | 1 ✅ |
| `products.spec.ts` | 2 | 8 | 10 |
| `cart.spec.ts` | 7 | 3 | 10 |
| `checkout.spec.ts` | 0 | 7 | 7 |
| `customers.spec.ts` | 0 | 13 | 13 |
| `regions.spec.ts` | 1 | 3 | 4 |
| `custom-routes.spec.ts` | 1 | 12 | 13 |
| `new-client-promotions.spec.ts` | 0 | 4 | 4 |
| `nybs-products-seed.spec.ts` | 0 | 10 | 10 |

## Dependency Chain

```
Test 4.1 (Registration)
  └─> Test 4.2-4.4 (Registration validation)
  └─> Test 4.5 (Login)
      └─> Test 4.6-4.7 (Login validation)
      └─> Test 4.8 (Profile)
          └─> Test 4.9-4.11 (Profile operations)
  └─> Test 7.1-7.2 (Welcome promotions)

Test 2.1 (Cart creation)
  └─> Test 2.2 (Cart with items)
  └─> Test 3.1 (Shipping methods)
  └─> Test 3.2 (Addresses)
      └─> Test 3.3 (Address validation)
      └─> Test 3.6 (Cart completion)
          └─> Test 3.7 (Order retrieval)

Test 1.1 (API key header)
  └─> Test 1.2-1.8 (All product tests)
  └─> Test 5.1-5.3 (Region tests)
  └─> Test 6.1-6.7 (Custom routes)
  └─> Test 8.5-8.7 (NYBS API tests)
```

## Expected Progress

- **After Phase 1**: 12 → 32+ tests passing (+20)
- **After Phase 2**: 32 → 42+ tests passing (+10)
- **After Phase 3**: 42 → 52+ tests passing (+10)
- **After Phase 4**: 52 → 70+ tests passing (+18)
- **Target**: 73/73 tests passing (100%)

---

**Full Details**: See `TEST_FAILURES_ROADMAP.md`





