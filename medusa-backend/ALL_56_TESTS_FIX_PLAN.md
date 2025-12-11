# All 56 Failing Tests - Individual Fix Plans

## Test Breakdown by File

### 1. products.spec.ts - 8 failing tests

| Test | Error | Fix Plan |
|------|-------|----------|
| should support pagination | 400 - API key | Fix API key creation/retrieval |
| should filter products by collection | 400 - API key | Fix API key creation/retrieval |
| should support search query | 400 - API key | Fix API key creation/retrieval |
| should get a single product by ID | 400 - API key | Fix API key creation/retrieval |
| should return 404 for non-existent product | 400 - API key | Fix API key creation/retrieval |
| should list product variants | 400 - API key | Fix API key creation/retrieval |
| should list all collections | 400 - API key | Fix API key creation/retrieval |
| should get collection by handle | 400 - API key | Fix API key creation/retrieval |

**Root Cause**: API key not being created/retrieved correctly
**Fix**: Debug API key creation, ensure token is in correct format

---

### 2. customers.spec.ts - 13 failing tests

| Test | Error | Fix Plan |
|------|-------|----------|
| should register a new customer | 404 | Check if `/store/auth/emailpass/register` exists |
| should reject duplicate email registration | 400 | Fix endpoint or request format |
| should validate email format | 400 | Fix endpoint or request format |
| should validate password strength | 400 | Fix endpoint or request format |
| should login with valid credentials | 400 | Check `/store/auth/emailpass/token` endpoint |
| should reject invalid credentials | 400 | Fix endpoint or request format |
| should reject non-existent user | 400 | Fix endpoint or request format |
| should get customer profile when authenticated | 400 | Fix auth token handling |
| should reject unauthenticated requests | 400 | Fix endpoint or request format |
| should update customer profile | 400 | Fix auth token handling |
| should list customer orders | 400 | Fix auth token handling |
| should request password reset | 400 | Check `/store/auth/emailpass/reset-password` endpoint |

**Root Cause**: Auth endpoints may not exist or use different paths
**Fix**: Check Medusa V2 auth endpoint structure, update tests

---

### 3. custom-routes.spec.ts - 13 failing tests

| Test | Error | Fix Plan |
|------|-------|----------|
| should handle contact form submission | 400 | Check if route exists, fix request format |
| should validate required fields | 400 | Check if route exists, fix request format |
| should subscribe email to newsletter | 400 | Check if route exists, fix request format |
| should validate email format | 400 | Check if route exists, fix request format |
| should submit wholesale application | 400 | Check if route exists, fix request format |
| should validate required fields | 400 | Check if route exists, fix request format |
| should handle contract manufacturing inquiry | 400 | Check if route exists, fix request format |
| should handle admin custom endpoint | 401/403 | Check admin auth, fix route |
| should list wholesale applications | 401/403 | Check admin auth, fix route |
| should handle wholesale approval | 401/403/404 | Check admin auth, fix route |
| should handle wholesale rejection | 401/403/404 | Check admin auth, fix route |
| should handle product prices endpoint | 401/403 | Check admin auth, fix route |

**Root Cause**: Routes may not exist or need different request format
**Fix**: Check if routes exist, verify request format, fix implementations

---

### 4. cart.spec.ts - ~9 failing tests

| Test | Error | Fix Plan |
|------|-------|----------|
| should create cart with items | Needs products | Ensure products seeded |
| should add item to cart | Needs products | Ensure products seeded |
| should update quantity when adding same variant | Needs products | Ensure products seeded |
| should update line item quantity | Needs products | Ensure products seeded |
| should remove line item from cart | Needs products | Ensure products seeded |
| should apply promotion code to cart | Needs products/promotions | Seed promotions |
| should calculate cart totals correctly | Needs products | Ensure products seeded |

**Root Cause**: Products not available
**Fix**: Ensure products are seeded and linked to sales channels

---

### 5. checkout.spec.ts - 7 failing tests

| Test | Error | Fix Plan |
|------|-------|----------|
| should set shipping method for cart | Needs products/shipping | Seed products and shipping |
| should set shipping and billing addresses | Needs products | Ensure products seeded |
| should validate required address fields | Needs products | Ensure products seeded |
| should create payment session | Needs products/payment | Seed products and payment |
| should validate cart before completion | Needs products | Ensure products seeded |
| should complete cart with all required data | Needs products | Ensure products seeded |
| should retrieve order after completion | Needs completed order | Complete checkout flow |

**Root Cause**: Products and shipping/payment setup needed
**Fix**: Seed products, shipping options, payment providers

---

### 6. new-client-promotions.spec.ts - 4 failing tests

| Test | Error | Fix Plan |
|------|-------|----------|
| should create a customer and trigger welcome promotion | Service error | Fix container resolution |
| should create promotion with correct discount percentage | Service error | Fix container resolution |
| should handle service methods correctly | Service error | Fix service initialization |
| should generate unique promotion codes | Service error | Fix service initialization |

**Root Cause**: Service initialization issues
**Fix**: Fix container resolution, service setup

---

### 7. nybs-products-seed.spec.ts - 10 failing tests

| Test | Error | Fix Plan |
|------|-------|----------|
| should successfully seed NYBS products | Service error | Fix seed script execution |
| should create the NYBS category | Service error | Fix seed script execution |
| should create all 4 NYBS products | Service error | Fix seed script execution |
| (7 more tests) | Service error | Fix seed script execution |

**Root Cause**: Seed script execution issues
**Fix**: Fix seed script, ensure it runs in test environment

---

## Execution Priority

1. **Fix API Key** (blocks 8+ tests) - HIGHEST PRIORITY
2. **Fix Customer Auth** (13 tests) - HIGH PRIORITY
3. **Fix Custom Routes** (13 tests) - MEDIUM PRIORITY
4. **Fix Cart/Checkout** (16 tests) - Depends on #1
5. **Fix Service Tests** (14 tests) - MEDIUM PRIORITY

---

## Next Steps

Starting with **Fix 1: API Key Creation** - this blocks the most tests.







