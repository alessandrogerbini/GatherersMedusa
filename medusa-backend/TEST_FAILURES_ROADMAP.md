# Test Failures Roadmap - 61 Failing Tests

## Executive Summary

**Total Tests**: 73  
**Passing**: 12 (16%)  
**Failing**: 61 (84%)  
**Status**: All tests are executing - failures are functional issues, not infrastructure problems

## Test Categories Overview

1. **Products API** (10 tests: 2 passing, 8 failing)
2. **Cart API** (10 tests: 7 passing, 3 failing)
3. **Checkout API** (7 tests: 0 passing, 7 failing)
4. **Customers API** (13 tests: 0 passing, 13 failing)
5. **Regions API** (4 tests: 1 passing, 3 failing)
6. **Custom Routes** (13 tests: 1 passing, 12 failing)
7. **New Client Promotions** (4 tests: 0 passing, 4 failing)
8. **NYBS Products Seed** (10 tests: 0 passing, 10 failing)
9. **Health** (1 test: 1 passing, 0 failing) ✅

---

## Category 1: Products API Tests (8 failures)

### Test 1.1: `should support pagination`
- **File**: `products.spec.ts`
- **Expected**: GET `/store/products` with `limit` and `offset` params returns paginated results
- **Actual**: Status 400 - "A valid publishable key is required to proceed with the request"
- **Root Cause**: API key header not being recognized for requests with query params
- **Fix Strategy**: Verify `x-publishable-api-key` header is properly merged with params in axios config
- **Priority**: HIGH (blocks multiple product tests)
- **Dependencies**: None

### Test 1.2: `should filter products by collection`
- **File**: `products.spec.ts`
- **Expected**: GET `/store/products` with `collection_id` array param filters products
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: Same as 1.1 - API key header issue with array params
- **Fix Strategy**: Same as 1.1
- **Priority**: HIGH
- **Dependencies**: Test 1.1

### Test 1.3: `should support search query`
- **File**: `products.spec.ts`
- **Expected**: GET `/store/products` with `q` param returns search results
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: Same as 1.1
- **Fix Strategy**: Same as 1.1
- **Priority**: HIGH
- **Dependencies**: Test 1.1

### Test 1.4: `should get a single product by ID`
- **File**: `products.spec.ts`
- **Expected**: GET `/store/products/:id` with `region_id` param returns product details
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: API key header not passed correctly for path parameter routes
- **Fix Strategy**: Ensure API key header is included in all GET requests, including those with path params
- **Priority**: HIGH
- **Dependencies**: Test 1.1

### Test 1.5: `should return 404 for non-existent product`
- **File**: `products.spec.ts`
- **Expected**: GET `/store/products/non-existent-id` returns 404
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: Same as 1.4
- **Fix Strategy**: Same as 1.4
- **Priority**: MEDIUM
- **Dependencies**: Test 1.4

### Test 1.6: `should list product variants`
- **File**: `products.spec.ts`
- **Expected**: Product list includes variants array
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: Same as 1.1
- **Fix Strategy**: Same as 1.1
- **Priority**: MEDIUM
- **Dependencies**: Test 1.1

### Test 1.7: `should list all collections`
- **File**: `products.spec.ts`
- **Expected**: GET `/store/collections` with `region_id` returns collections
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: Same as 1.1
- **Fix Strategy**: Same as 1.1
- **Priority**: MEDIUM
- **Dependencies**: Test 1.1

### Test 1.8: `should get collection by handle`
- **File**: `products.spec.ts`
- **Expected**: GET `/store/collections/:handle` returns collection with products
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: Same as 1.4
- **Fix Strategy**: Same as 1.4
- **Priority**: MEDIUM
- **Dependencies**: Test 1.4

---

## Category 2: Cart API Tests (3 failures)

### Test 2.1: `should create a new cart`
- **File**: `cart.spec.ts`
- **Expected**: POST `/store/carts` with `region_id` creates cart
- **Actual**: Status 400 - "Invalid request: Unrecognized fields: '{\"region_id\":...'"
- **Root Cause**: Cart creation endpoint doesn't accept `region_id` in request body, or expects different format
- **Fix Strategy**: 
  1. Check Medusa V2 cart creation API spec
  2. Update request body format to match expected schema
  3. May need to use query param instead of body param
- **Priority**: HIGH (blocks all cart operations)
- **Dependencies**: None

### Test 2.2: `should create cart with items`
- **File**: `cart.spec.ts`
- **Expected**: POST `/store/carts` with `region_id` and `items` array creates cart with items
- **Actual**: Status 400 - "Invalid request: Unrecognized fields"
- **Root Cause**: Same as 2.1 - request body format issue
- **Fix Strategy**: Same as 2.1
- **Priority**: HIGH
- **Dependencies**: Test 2.1

### Test 2.3: `should return 404 for non-existent cart`
- **File**: `cart.spec.ts`
- **Expected**: GET `/store/carts/non-existent-id` returns 404
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: API key header not passed for GET requests to cart endpoints
- **Fix Strategy**: Ensure API key header is included in all cart GET requests
- **Priority**: LOW
- **Dependencies**: Test 2.1

---

## Category 3: Checkout API Tests (7 failures)

### Test 3.1: `should set shipping method for cart`
- **File**: `checkout.spec.ts`
- **Expected**: POST `/store/carts/:id/shipping-methods` sets shipping method
- **Actual**: Status 400 - Cart creation failed (depends on Test 2.1)
- **Root Cause**: Cannot test shipping methods without a valid cart
- **Fix Strategy**: Fix cart creation first (Test 2.1), then verify shipping method endpoint
- **Priority**: HIGH
- **Dependencies**: Test 2.1

### Test 3.2: `should set shipping and billing addresses`
- **File**: `checkout.spec.ts`
- **Expected**: POST `/store/carts/:id/addresses` sets addresses
- **Actual**: Status 400 - Cart creation failed
- **Root Cause**: Same as 3.1
- **Fix Strategy**: Same as 3.1
- **Priority**: HIGH
- **Dependencies**: Test 2.1

### Test 3.3: `should validate required address fields`
- **File**: `checkout.spec.ts`
- **Expected**: POST `/store/carts/:id/addresses` with incomplete data returns 400/422
- **Actual**: Status 400 - Cart creation failed
- **Root Cause**: Same as 3.1
- **Fix Strategy**: Same as 3.1
- **Priority**: MEDIUM
- **Dependencies**: Test 2.1

### Test 3.4: `should create payment session`
- **File**: `checkout.spec.ts`
- **Expected**: POST `/store/carts/:id/payment-sessions` creates payment session
- **Actual**: Status 400 - Cart creation failed
- **Root Cause**: Same as 3.1
- **Fix Strategy**: Same as 3.1
- **Priority**: MEDIUM
- **Dependencies**: Test 2.1

### Test 3.5: `should validate cart before completion`
- **File**: `checkout.spec.ts`
- **Expected**: POST `/store/carts/:id/complete` without required data returns 400/422
- **Actual**: Status 400 - Cart creation failed
- **Root Cause**: Same as 3.1
- **Fix Strategy**: Same as 3.1
- **Priority**: MEDIUM
- **Dependencies**: Test 2.1

### Test 3.6: `should complete cart with all required data`
- **File**: `checkout.spec.ts`
- **Expected**: POST `/store/carts/:id/complete` with all data completes checkout
- **Actual**: Status 400 - Cart creation failed
- **Root Cause**: Same as 3.1
- **Fix Strategy**: Same as 3.1
- **Priority**: HIGH
- **Dependencies**: Test 2.1, 3.2, 3.1

### Test 3.7: `should retrieve order after completion`
- **File**: `checkout.spec.ts`
- **Expected**: GET `/store/orders/:id` returns order details
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: API key header not passed for orders endpoint
- **Fix Strategy**: Ensure API key header is included in orders GET requests
- **Priority**: LOW
- **Dependencies**: Test 3.6

---

## Category 4: Customers API Tests (13 failures)

### Test 4.1: `should register a new customer`
- **File**: `customers.spec.ts`
- **Expected**: POST `/store/auth/emailpass/register` creates customer
- **Actual**: Status 400 - "Email and password are required"
- **Root Cause**: Request body not being parsed correctly in route handler
- **Fix Strategy**: 
  1. Verify `req.body` parsing in `register/route.ts`
  2. Check if body parser middleware is configured
  3. Ensure Content-Type header is set correctly
- **Priority**: CRITICAL (blocks all customer auth tests)
- **Dependencies**: None

### Test 4.2: `should reject duplicate email registration`
- **File**: `customers.spec.ts`
- **Expected**: POST `/store/auth/emailpass/register` with existing email returns 400/409/422
- **Actual**: Status 400 - "Email and password are required" (registration fails first)
- **Root Cause**: Same as 4.1
- **Fix Strategy**: Same as 4.1
- **Priority**: HIGH
- **Dependencies**: Test 4.1

### Test 4.3: `should validate email format`
- **File**: `customers.spec.ts`
- **Expected**: POST `/store/auth/emailpass/register` with invalid email returns 400/422
- **Actual**: Status 400 - "Email and password are required"
- **Root Cause**: Same as 4.1
- **Fix Strategy**: Same as 4.1
- **Priority**: MEDIUM
- **Dependencies**: Test 4.1

### Test 4.4: `should validate password strength`
- **File**: `customers.spec.ts`
- **Expected**: POST `/store/auth/emailpass/register` with weak password returns 400/422 or 200
- **Actual**: Status 400 - "Email and password are required"
- **Root Cause**: Same as 4.1
- **Fix Strategy**: Same as 4.1
- **Priority**: LOW
- **Dependencies**: Test 4.1

### Test 4.5: `should login with valid credentials`
- **File**: `customers.spec.ts`
- **Expected**: POST `/store/auth/emailpass/token` with valid credentials returns access_token
- **Actual**: Status 400 - "Email and password are required"
- **Root Cause**: Same as 4.1 - body parsing issue in `token/route.ts`
- **Fix Strategy**: Same as 4.1, apply to token route
- **Priority**: CRITICAL
- **Dependencies**: Test 4.1

### Test 4.6: `should reject invalid credentials`
- **File**: `customers.spec.ts`
- **Expected**: POST `/store/auth/emailpass/token` with wrong password returns 401/400
- **Actual**: Status 400 - "Email and password are required"
- **Root Cause**: Same as 4.5
- **Fix Strategy**: Same as 4.5
- **Priority**: MEDIUM
- **Dependencies**: Test 4.5

### Test 4.7: `should reject non-existent user`
- **File**: `customers.spec.ts`
- **Expected**: POST `/store/auth/emailpass/token` with non-existent email returns 401/404
- **Actual**: Status 400 - "Email and password are required"
- **Root Cause**: Same as 4.5
- **Fix Strategy**: Same as 4.5
- **Priority**: MEDIUM
- **Dependencies**: Test 4.5

### Test 4.8: `should get customer profile when authenticated`
- **File**: `customers.spec.ts`
- **Expected**: GET `/store/customers/me` with Bearer token returns customer profile
- **Actual**: Status 400 - Registration/login failed (depends on 4.1, 4.5)
- **Root Cause**: Cannot test authenticated endpoints without working auth
- **Fix Strategy**: Fix auth routes first (4.1, 4.5), then verify JWT token validation
- **Priority**: HIGH
- **Dependencies**: Test 4.1, 4.5

### Test 4.9: `should reject unauthenticated requests`
- **File**: `customers.spec.ts`
- **Expected**: GET `/store/customers/me` without token returns 401/403
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: API key header issue, but should still return 401 for missing auth token
- **Fix Strategy**: 
  1. Fix API key header passing
  2. Verify auth middleware properly rejects requests without Bearer token
- **Priority**: MEDIUM
- **Dependencies**: Test 4.8

### Test 4.10: `should update customer profile`
- **File**: `customers.spec.ts`
- **Expected**: POST `/store/customers/me` with Bearer token updates profile
- **Actual**: Status 400 - Registration/login failed
- **Root Cause**: Same as 4.8
- **Fix Strategy**: Same as 4.8
- **Priority**: HIGH
- **Dependencies**: Test 4.1, 4.5

### Test 4.11: `should list customer orders`
- **File**: `customers.spec.ts`
- **Expected**: GET `/store/customers/me/orders` with Bearer token returns orders array
- **Actual**: Status 400 - Registration/login failed
- **Root Cause**: Same as 4.8
- **Fix Strategy**: Same as 4.8
- **Priority**: MEDIUM
- **Dependencies**: Test 4.1, 4.5

### Test 4.12: `should request password reset`
- **File**: `customers.spec.ts`
- **Expected**: POST `/store/auth/emailpass/reset-password` with email returns 200/201/404
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: API key header not passed, or body parsing issue
- **Fix Strategy**: 
  1. Fix API key header passing
  2. Verify body parsing in reset-password route
- **Priority**: LOW
- **Dependencies**: None

---

## Category 5: Regions API Tests (3 failures)

### Test 5.1: `should return region with required properties`
- **File**: `regions.spec.ts`
- **Expected**: Region object has `id`, `name`, `currency_code`, `countries` properties
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: API key header not passed for regions GET requests
- **Fix Strategy**: Ensure API key header is included in all regions GET requests
- **Priority**: MEDIUM
- **Dependencies**: None

### Test 5.2: `should get region by ID`
- **File**: `regions.spec.ts`
- **Expected**: GET `/store/regions/:id` returns region details
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: Same as 5.1
- **Fix Strategy**: Same as 5.1
- **Priority**: MEDIUM
- **Dependencies**: Test 5.1

### Test 5.3: `should return 404 for non-existent region`
- **File**: `regions.spec.ts`
- **Expected**: GET `/store/regions/non-existent-id` returns 404
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: Same as 5.1
- **Fix Strategy**: Same as 5.1
- **Priority**: LOW
- **Dependencies**: Test 5.1

---

## Category 6: Custom Routes Tests (12 failures)

### Test 6.1: `should handle contact form submission`
- **File**: `custom-routes.spec.ts`
- **Expected**: POST `/store/contact` with name, email, message returns 200/201
- **Actual**: Status 400 - "A valid publishable key is required" OR notification service error
- **Root Cause**: API key header issue OR notification service not available in test environment
- **Fix Strategy**: 
  1. Fix API key header passing
  2. Verify notification service graceful degradation (already implemented)
- **Priority**: MEDIUM
- **Dependencies**: None

### Test 6.2: `should validate required fields` (contact)
- **File**: `custom-routes.spec.ts`
- **Expected**: POST `/store/contact` without required fields returns 400/422
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: Same as 6.1
- **Fix Strategy**: Same as 6.1
- **Priority**: LOW
- **Dependencies**: Test 6.1

### Test 6.3: `should subscribe email to newsletter`
- **File**: `custom-routes.spec.ts`
- **Expected**: POST `/store/newsletter` with email returns 200/201
- **Actual**: Status 400 - "A valid publishable key is required" OR notification service error
- **Root Cause**: Same as 6.1
- **Fix Strategy**: Same as 6.1
- **Priority**: MEDIUM
- **Dependencies**: None

### Test 6.4: `should validate email format` (newsletter)
- **File**: `custom-routes.spec.ts`
- **Expected**: POST `/store/newsletter` with invalid email returns 400/422
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: Same as 6.1
- **Fix Strategy**: Same as 6.1
- **Priority**: LOW
- **Dependencies**: Test 6.3

### Test 6.5: `should submit wholesale application`
- **File**: `custom-routes.spec.ts`
- **Expected**: POST `/store/wholesale` with business info returns 200/201
- **Actual**: Status 400 - "A valid publishable key is required" OR "Unauthorized"
- **Root Cause**: API key header issue OR route requires customer authentication
- **Fix Strategy**: 
  1. Fix API key header passing
  2. Check if wholesale route requires customer auth (may need to register customer first)
- **Priority**: MEDIUM
- **Dependencies**: Test 4.1 (if auth required)

### Test 6.6: `should validate required fields` (wholesale)
- **File**: `custom-routes.spec.ts`
- **Expected**: POST `/store/wholesale` without required fields returns 400/422
- **Actual**: Status 400 - "A valid publishable key is required"
- **Root Cause**: Same as 6.5
- **Fix Strategy**: Same as 6.5
- **Priority**: LOW
- **Dependencies**: Test 6.5

### Test 6.7: `should handle contract manufacturing inquiry`
- **File**: `custom-routes.spec.ts`
- **Expected**: POST `/store/contract-manufacturing` with company info returns 200/201
- **Actual**: Status 400 - Route may not exist
- **Root Cause**: Route `/store/contract-manufacturing` may not be implemented
- **Fix Strategy**: 
  1. Check if route exists
  2. Create route if missing
  3. Fix API key header passing
- **Priority**: LOW
- **Dependencies**: None

### Test 6.8: `should handle admin custom endpoint`
- **File**: `custom-routes.spec.ts`
- **Expected**: GET `/admin/custom` returns 200 OR 401/403 (if auth required)
- **Actual**: Status 401 - Expected (admin routes require auth)
- **Root Cause**: Admin routes require authentication - test expects 401/403, which is correct
- **Fix Strategy**: Test is actually passing (401 is expected) - may need to update test expectations
- **Priority**: LOW
- **Dependencies**: None

### Test 6.9: `should list wholesale applications`
- **File**: `custom-routes.spec.ts`
- **Expected**: GET `/admin/wholesale` returns 200 OR 401/403
- **Actual**: Status 401 - Expected (admin routes require auth)
- **Root Cause**: Same as 6.8
- **Fix Strategy**: Same as 6.8
- **Priority**: LOW
- **Dependencies**: None

### Test 6.10: `should handle wholesale approval`
- **File**: `custom-routes.spec.ts`
- **Expected**: POST `/admin/wholesale/:id/approve` returns 200/201 OR 401/403/404
- **Actual**: Status 401 - Expected
- **Root Cause**: Same as 6.8
- **Fix Strategy**: Same as 6.8
- **Priority**: LOW
- **Dependencies**: None

### Test 6.11: `should handle wholesale rejection`
- **File**: `custom-routes.spec.ts`
- **Expected**: POST `/admin/wholesale/:id/reject` returns 200/201 OR 401/403/404
- **Actual**: Status 401 - Expected
- **Root Cause**: Same as 6.8
- **Fix Strategy**: Same as 6.8
- **Priority**: LOW
- **Dependencies**: None

### Test 6.12: `should handle product prices endpoint`
- **File**: `custom-routes.spec.ts`
- **Expected**: GET `/admin/product-prices` returns 200 OR 401/403
- **Actual**: Status 401 - Expected
- **Root Cause**: Same as 6.8
- **Fix Strategy**: Same as 6.8
- **Priority**: LOW
- **Dependencies**: None

---

## Category 7: New Client Promotions Tests (4 failures)

### Test 7.1: `should create a customer and trigger welcome promotion`
- **File**: `new-client-promotions.spec.ts`
- **Expected**: Registering customer triggers event that creates WELCOME5 promotion
- **Actual**: Registration fails (depends on Test 4.1)
- **Root Cause**: Customer registration not working
- **Fix Strategy**: Fix customer registration (Test 4.1), then verify event subscriber
- **Priority**: HIGH
- **Dependencies**: Test 4.1

### Test 7.2: `should create promotion with correct discount percentage`
- **File**: `new-client-promotions.spec.ts`
- **Expected**: Welcome promotion has 5% discount, type "percentage", target "order"
- **Actual**: Registration fails
- **Root Cause**: Same as 7.1
- **Fix Strategy**: Same as 7.1
- **Priority**: HIGH
- **Dependencies**: Test 4.1

### Test 7.3: `should handle service methods directly`
- **File**: `new-client-promotions.spec.ts`
- **Expected**: Direct service calls create promotion and send email
- **Actual**: May fail if service methods have issues
- **Root Cause**: Need to investigate service implementation
- **Fix Strategy**: 
  1. Verify `createWelcomePromotion` method works
  2. Verify `sendWelcomeEmail` method works
  3. Check notification service integration
- **Priority**: MEDIUM
- **Dependencies**: None (direct service test)

### Test 7.4: `should generate unique promotion codes`
- **File**: `new-client-promotions.spec.ts`
- **Expected**: Multiple calls generate unique promotion codes
- **Actual**: May fail if service methods have issues
- **Root Cause**: Same as 7.3
- **Fix Strategy**: Same as 7.3
- **Priority**: MEDIUM
- **Dependencies**: Test 7.3

---

## Category 8: NYBS Products Seed Tests (10 failures)

### Test 8.1: `should successfully seed NYBS products`
- **File**: `nybs-products-seed.spec.ts`
- **Expected**: Seed script runs without errors
- **Actual**: May fail if seed script has issues
- **Root Cause**: Need to investigate seed script execution
- **Fix Strategy**: 
  1. Run seed script manually
  2. Check for errors in script execution
  3. Verify all required data (regions, sales channels) exist
- **Priority**: MEDIUM
- **Dependencies**: None

### Test 8.2: `should create the NYBS category`
- **File**: `nybs-products-seed.spec.ts`
- **Expected**: Category with handle "nybs" is created
- **Actual**: Depends on 8.1
- **Root Cause**: Same as 8.1
- **Fix Strategy**: Same as 8.1
- **Priority**: MEDIUM
- **Dependencies**: Test 8.1

### Test 8.3: `should create all 4 NYBS products`
- **File**: `nybs-products-seed.spec.ts`
- **Expected**: 4 products with handles starting with "nybs-" are created
- **Actual**: Depends on 8.1
- **Root Cause**: Same as 8.1
- **Fix Strategy**: Same as 8.1
- **Priority**: MEDIUM
- **Dependencies**: Test 8.1

### Test 8.4: `should set correct product titles and descriptions`
- **File**: `nybs-products-seed.spec.ts`
- **Expected**: Products have correct titles and descriptions
- **Actual**: Depends on 8.1
- **Root Cause**: Same as 8.1
- **Fix Strategy**: Same as 8.1
- **Priority**: LOW
- **Dependencies**: Test 8.1

### Test 8.5: `should set all product prices to $5.00 USD via Store API`
- **File**: `nybs-products-seed.spec.ts`
- **Expected**: Products have $5.00 USD price via Store API
- **Actual**: Depends on 8.1, may also have API key header issue
- **Root Cause**: Same as 8.1, plus potential API key header issue
- **Fix Strategy**: Same as 8.1, plus fix API key header (Test 1.1)
- **Priority**: MEDIUM
- **Dependencies**: Test 8.1, 1.1

### Test 8.6: `should assign products to NYBS category via Store API`
- **File**: `nybs-products-seed.spec.ts`
- **Expected**: Products are assigned to NYBS category
- **Actual**: Depends on 8.1, may have API key header issue
- **Root Cause**: Same as 8.5
- **Fix Strategy**: Same as 8.5
- **Priority**: MEDIUM
- **Dependencies**: Test 8.1, 1.1

### Test 8.7: `should include product images via Store API`
- **File**: `nybs-products-seed.spec.ts`
- **Expected**: Products have images with URLs containing "/static/" and "NYBS"
- **Actual**: Depends on 8.1, may have API key header issue
- **Root Cause**: Same as 8.5
- **Fix Strategy**: Same as 8.5
- **Priority**: LOW
- **Dependencies**: Test 8.1, 1.1

### Test 8.8: `should include correct metadata`
- **File**: `nybs-products-seed.spec.ts`
- **Expected**: Products have metadata with brand, category, size, tagline, ingredients
- **Actual**: Depends on 8.1
- **Root Cause**: Same as 8.1
- **Fix Strategy**: Same as 8.1
- **Priority**: LOW
- **Dependencies**: Test 8.1

### Test 8.9: `should create products with published status`
- **File**: `nybs-products-seed.spec.ts`
- **Expected**: All products have status "published"
- **Actual**: Depends on 8.1
- **Root Cause**: Same as 8.1
- **Fix Strategy**: Same as 8.1
- **Priority**: LOW
- **Dependencies**: Test 8.1

### Test 8.10: `should set correct product weights (3.5oz ≈ 99g)`
- **File**: `nybs-products-seed.spec.ts`
- **Expected**: All products have weight of 99g
- **Actual**: Depends on 8.1
- **Root Cause**: Same as 8.1
- **Fix Strategy**: Same as 8.1
- **Priority**: LOW
- **Dependencies**: Test 8.1

---

## Recommended Fix Order (Priority-Based)

### Phase 1: Critical Infrastructure (Blocks 20+ tests)
1. **Test 4.1** - Fix customer registration body parsing (CRITICAL)
2. **Test 4.5** - Fix customer login body parsing (CRITICAL)
3. **Test 1.1** - Fix API key header passing for GET requests with params (HIGH)
4. **Test 2.1** - Fix cart creation request body format (HIGH)

### Phase 2: Core Functionality (Blocks 10+ tests)
5. **Test 4.8** - Fix customer profile retrieval with auth token (HIGH)
6. **Test 3.1** - Fix shipping method setting (depends on 2.1) (HIGH)
7. **Test 3.2** - Fix address setting (depends on 2.1) (HIGH)
8. **Test 3.6** - Fix cart completion (depends on 2.1, 3.1, 3.2) (HIGH)

### Phase 3: Supporting Features (Blocks 5-10 tests)
9. **Test 1.4** - Fix product detail retrieval (MEDIUM)
10. **Test 5.1** - Fix regions property validation (MEDIUM)
11. **Test 6.1** - Fix contact form submission (MEDIUM)
12. **Test 6.3** - Fix newsletter subscription (MEDIUM)
13. **Test 7.1** - Fix welcome promotion creation (depends on 4.1) (HIGH)
14. **Test 8.1** - Fix NYBS products seed script (MEDIUM)

### Phase 4: Edge Cases and Validation (Blocks <5 tests)
15. All remaining validation tests (email format, password strength, etc.)
16. All 404 tests (non-existent resources)
17. All admin route tests (may already be passing with 401)

---

## Common Root Causes Summary

1. **API Key Header Not Passed** (Affects ~30 tests)
   - Issue: `x-publishable-api-key` header not being recognized
   - Fix: Verify header merging in `test-utils.ts` `createApiClientWithKey`
   - Tests: 1.1-1.8, 2.3, 3.7, 4.9, 4.12, 5.1-5.3, 6.1-6.7, 8.5-8.7

2. **Request Body Not Parsed** (Affects ~13 tests)
   - Issue: `req.body` is empty or undefined in route handlers
   - Fix: Verify body parser middleware configuration
   - Tests: 4.1-4.7, 4.12

3. **Cart Creation Format** (Affects ~7 tests)
   - Issue: Cart creation endpoint expects different request format
   - Fix: Check Medusa V2 API spec for cart creation
   - Tests: 2.1, 2.2, 3.1-3.6

4. **Missing Routes** (Affects ~1 test)
   - Issue: Route may not exist
   - Fix: Create missing route
   - Tests: 6.7

5. **Event Subscribers** (Affects ~2 tests)
   - Issue: Customer creation event not triggering promotion creation
   - Fix: Verify event subscriber registration and execution
   - Tests: 7.1, 7.2

6. **Seed Script Issues** (Affects ~10 tests)
   - Issue: Seed script may have execution errors
   - Fix: Debug seed script execution
   - Tests: 8.1-8.10

---

## Success Metrics

- **Phase 1 Complete**: 20+ tests passing (from 12 to 32+)
- **Phase 2 Complete**: 30+ tests passing (from 32 to 42+)
- **Phase 3 Complete**: 50+ tests passing (from 42 to 52+)
- **Phase 4 Complete**: 70+ tests passing (from 52 to 70+)
- **Target**: 73/73 tests passing (100%)

---

## Notes

- Tests marked as "Expected 401" (6.8-6.12) may actually be passing - verify test expectations
- Some tests have conditional logic (if statements) that may skip execution if prerequisites fail
- Admin routes require authentication - 401 responses are expected for unauthenticated requests
- Event-driven tests (7.1, 7.2) may need longer timeouts or explicit event triggering

---

## Next Steps

1. Start with Phase 1, Test 4.1 (customer registration body parsing)
2. Work through tests in dependency order
3. After each fix, run affected test suite to verify
4. Document any additional issues discovered during fixes
5. Update this roadmap as tests are fixed





