# Test Fix Strategy - Most Fruitful Paths Forward

**Date**: December 9, 2025  
**Current Status**: 6 passing, 67 failing (73 total)

---

## Analysis of Most Promising Paths

### Path 1: Fix API Key Header Passing ⭐ **SELECTED - MOST PROMISING**

**Why This Is The Best Choice:**

1. **Highest Impact**: Blocks 20+ tests (products, regions, cart, checkout)
2. **We're Close**: Token is CORRECT (starts with "pk_"), some tests already pass
3. **Pattern Evidence**: 
   - Simple GET requests work (health, list products)
   - Complex requests fail (pagination, filtering, POST requests)
   - Suggests header/config issue, not fundamental problem
4. **Low Risk, High Reward**: Likely a simple fix with big impact

**Root Cause Hypothesis:**
- The `medusaIntegrationTestRunner`'s `api` object might have default headers that conflict
- Our `createApiClientWithKey` wrapper might not be merging headers correctly
- The publishable key might need to be set differently for the test runner
- There might be a timing issue where the key isn't fully active when requests are made

**Investigation Plan (45 minute limit):**

1. **Inspect API Object** (10 min)
   - Log the `api` object structure
   - Check if it has default headers
   - See if there's a built-in way to set publishable key

2. **Add Request Logging** (10 min)
   - Log actual headers sent in working vs failing requests
   - Compare what's different
   - Check if header name/format is correct

3. **Try Alternative Approaches** (15 min)
   - Set publishable key via test runner config (if supported)
   - Try different header merging strategies
   - Check if we need to use `api` differently

4. **Compare Working vs Failing** (10 min)
   - Analyze the 6 passing tests
   - See what they do differently
   - Apply same pattern to failing tests

**Success Criteria:**
- 15+ more tests passing (target: 21+ total)
- No more "A valid publishable key is required" errors
- All product/region/cart GET requests working

**If No Progress After 45 Minutes:**
- Document findings
- Move to Path 2 (SDK approach)

---

### Path 2: Use Medusa SDK in Tests (Alternative)

**Why This Could Work:**
- Storefront uses SDK and it works perfectly
- SDK handles auth automatically
- Less manual header management

**Approach:**
- Refactor tests to use `@medusajs/js-sdk` instead of direct HTTP
- Initialize SDK with publishable key once
- Use SDK methods: `sdk.store.product.list()`, `sdk.store.cart.create()`, etc.

**Pros:**
- Matches production usage
- SDK handles auth correctly
- Less error-prone

**Cons:**
- Requires refactoring all 73 tests
- Might not test HTTP layer directly
- More time-consuming (2-3 hours)

**Time Limit:** 60 minutes for proof of concept
**If No Progress:** Move to Path 3

---

### Path 3: Fix Auth Routes Implementation

**Why This Matters:**
- Blocks 13 customer auth tests
- Routes exist but return 400 errors

**Approach:**
- Research Medusa V2 auth module API
- Use proper workflows: `createAuthIdentitiesWorkflow`, etc.
- Implement proper customer registration with auth identities
- Generate proper JWT tokens for login

**Time Limit:** 45 minutes
**If No Progress:** Document requirements and move on

---

### Path 4: Fix Custom Routes

**Why This Matters:**
- Blocks 13 tests
- Routes might not exist or have wrong implementation

**Approach:**
- Identify which custom routes are failing
- Check if routes exist in `src/api/store/custom/route.ts`
- Create/fix missing routes

**Time Limit:** 30 minutes per route category

---

### Path 5: Fix Cart/Checkout Tests

**Why This Matters:**
- Blocks 16 tests
- Depends on products (which we've fixed)

**Approach:**
- Ensure products are seeded correctly
- Fix cart creation logic
- Fix checkout flow with proper payment/shipping setup

**Time Limit:** 45 minutes

---

## Selected Path: Path 1 - Fix API Key Header Passing

**Rationale:**
1. ✅ Highest impact (20+ tests)
2. ✅ Token is correct - we're very close
3. ✅ Some tests already work - proves it's possible
4. ✅ Likely a simple configuration issue
5. ✅ Will unblock other fixes (cart/checkout depend on this)

**Action Plan:**

### Phase 1: Investigation (15 minutes)
```typescript
// Add to test-utils.ts
export function debugApiObject(api: any) {
  console.log("API Object:", {
    hasGet: typeof api.get === 'function',
    hasPost: typeof api.post === 'function',
    defaultHeaders: api.defaults?.headers,
    baseURL: api.defaults?.baseURL,
  })
}
```

### Phase 2: Header Logging (15 minutes)
```typescript
// Log actual requests
const originalGet = api.get
api.get = function(url, config) {
  console.log("GET Request:", {
    url,
    headers: config?.headers,
    hasPublishableKey: !!config?.headers?.['x-publishable-api-key']
  })
  return originalGet.call(this, url, config)
}
```

### Phase 3: Try Alternatives (15 minutes)
- Check if test runner has `publishableKey` option
- Try setting via environment variable
- Try different header formats
- Check if we need to use `api` directly without wrapper

**Time Limit:** 45 minutes total
**Success Metric:** 15+ more tests passing
**If No Progress:** Document findings and try Path 2

---

## Decision Tree

```
START: Path 1 (API Key Header - 45 min)
  │
  ├─ Success (15+ tests pass) 
  │   └─ Continue Path 1 or move to Path 3 (Auth)
  │
  ├─ Partial (5-14 tests pass)
  │   └─ Continue Path 1, refine approach (15 more min)
  │
  └─ No Progress (0-4 tests pass)
      └─ Move to Path 2 (SDK - 60 min)
          │
          ├─ Success
          │   └─ Continue with SDK approach
          │
          └─ No Progress
              └─ Move to Path 3 (Auth Routes - 45 min)
                  └─ Continue sequentially
```

---

## Key Insights

1. **Token is correct** ✅ - Not a generation issue
2. **Some requests work** ✅ - Not a fundamental auth problem  
3. **Pattern suggests header/config issue** - Fixable
4. **High impact** - Fixing this unblocks many tests

---

## Next Immediate Steps

1. **Inspect test runner's `api` object** - See what it provides
2. **Add request logging** - See actual headers sent
3. **Compare working vs failing** - Find the difference
4. **Try test runner config** - See if there's a built-in way
5. **Refine header passing** - Fix the wrapper if needed

**Time Budget:** 45 minutes
**Expected Outcome:** 15+ more tests passing
**Fallback:** Path 2 (SDK approach)
