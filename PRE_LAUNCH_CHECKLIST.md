# 🚀 Pre-Launch Checklist: Remove Test/Dummy Providers

**Purpose**: Ensure all test/dummy payment and shipping providers are removed before production launch  
**Status**: ⚠️ **CRITICAL** - Must be completed before going live  
**Last Updated**: 2025-01-XX

---

## ⚠️ IMPORTANT WARNINGS

- **Never use test providers in production** - They don't process real payments or shipments
- **Test all changes in staging** before applying to production
- **Backup database** before making any changes
- **Verify end-to-end** after making changes

---

## 📋 Payment Provider Cleanup

### 1. Update Seed Script

**File**: `medusa-backend/src/scripts/seed.ts`  
**Line**: ~120

**Current (TEST)**:
```typescript
payment_providers: ["pp_system_default"],  // ⚠️ TEST/DUMMY PROVIDER
```

**Action Required**:
- [ ] Replace `pp_system_default` with production payment provider ID
- [ ] Example: `payment_providers: ["pp_stripe_stripe"]` (for Stripe)
- [ ] Or: `payment_providers: ["pp_paypal_paypal"]` (for PayPal)
- [ ] Or: Add multiple providers if needed: `["pp_stripe_stripe", "pp_paypal_paypal"]`

**Note**: This only affects new regions created by the seed script. Existing regions in the database must be updated separately (see below).

---

### 2. Update Database Regions

**Location**: Database table `region`  
**Action**: Update all existing regions to use production payment providers

**Check Current State**:
```sql
-- Check which payment providers are currently linked to regions
SELECT r.id, r.name, rp.provider_id 
FROM region r 
LEFT JOIN region_payment_provider rp ON r.id = rp.region_id;
```

**Update Required**:
- [ ] Identify all regions using `pp_system_default`
- [ ] Update via Admin Panel: **Settings** → **Regions** → Edit each region → Update payment providers
- [ ] OR update via API/database directly
- [ ] Verify no regions still use `pp_system_default`

**Admin Panel Steps**:
1. Login to admin: `http://localhost:9000/app` (or production URL)
2. Navigate to **Settings** → **Regions**
3. Click on each region
4. Under **Payment Providers**, remove `pp_system_default` if present
5. Add production payment provider(s)
6. Save changes

---

### 3. Update Storefront Payment Constants

**File**: `medusa-storefront/src/lib/constants.tsx`  
**Line**: ~29-32

**Current (TEST)**:
```typescript
// ⚠️ TEST/DUMMY PROVIDER: Remove or comment out before production launch
pp_system_default: {
  title: "Manual Payment",
  icon: <CreditCard />,
},
```

**Action Required**:
- [ ] Remove the `pp_system_default` entry entirely, OR
- [ ] Comment it out with a note explaining it's for testing only
- [ ] Verify payment selection UI no longer shows "Manual Payment" option

**After Removal**:
```typescript
// pp_system_default removed - production only
// Uncomment below for testing:
// pp_system_default: {
//   title: "Manual Payment",
//   icon: <CreditCard />,
// },
```

---

### 4. Verify Payment Providers in Admin Panel

**Location**: Admin Panel → **Settings** → **Payment Providers**

**Action Required**:
- [ ] Login to admin panel
- [ ] Navigate to **Settings** → **Payment Providers**
- [ ] Verify only production payment providers are enabled
- [ ] Disable or remove `pp_system_default` if it appears
- [ ] Ensure production providers (e.g., Stripe, PayPal) are properly configured

---

## 🚚 Shipping Provider Cleanup

### 1. Update Seed Script - Fulfillment Provider Link

**File**: `medusa-backend/src/scripts/seed.ts`  
**Line**: ~170

**Current (TEST)**:
```typescript
[Modules.FULFILLMENT]: {
  fulfillment_provider_id: "manual_manual",  // ⚠️ TEST/DUMMY PROVIDER
},
```

**Action Required**:
- [ ] Replace `manual_manual` with production fulfillment provider ID
- [ ] Example: Use a real shipping carrier integration (UPS, FedEx, DHL, etc.)
- [ ] Or: Keep manual but ensure it's properly configured for your fulfillment process

**Note**: If you handle fulfillment manually but want to track it properly, you may keep a manual provider, but ensure it's configured correctly for your workflow.

---

### 2. Update Seed Script - Shipping Options

**File**: `medusa-backend/src/scripts/seed.ts`  
**Lines**: ~249 and ~287

**Current (TEST)**:
```typescript
{
  name: "Standard Shipping",
  provider_id: "manual_manual",  // ⚠️ TEST/DUMMY PROVIDER
  // ...
}
```

**Action Required**:
- [ ] Replace `manual_manual` in all shipping options with production fulfillment provider
- [ ] Update both "Standard Shipping" and "Express Shipping" options
- [ ] Ensure shipping prices and rules are appropriate for production

---

### 3. Update Database Shipping Options

**Location**: Database table `shipping_option`  
**Action**: Update all existing shipping options to use production fulfillment providers

**Check Current State**:
```sql
-- Check which fulfillment providers are used by shipping options
SELECT so.id, so.name, so.provider_id 
FROM shipping_option so;
```

**Update Required**:
- [ ] Identify all shipping options using `manual_manual`
- [ ] Update via Admin Panel: **Settings** → **Shipping Options** → Edit each option
- [ ] OR update via API/database directly
- [ ] Verify no shipping options still use `manual_manual`

**Admin Panel Steps**:
1. Login to admin: `http://localhost:9000/app` (or production URL)
2. Navigate to **Settings** → **Shipping Options**
3. Click on each shipping option
4. Update the **Fulfillment Provider** to production provider
5. Save changes

---

### 4. Update Database Stock Location Links

**Location**: Database links table (location_fulfillment_provider)  
**Action**: Verify stock locations are linked to production fulfillment providers

**Check Current State**:
```sql
-- Check fulfillment provider links for stock locations
SELECT * FROM link WHERE type = 'location_fulfillment_provider';
```

**Update Required**:
- [ ] Verify all stock locations are linked to production fulfillment providers
- [ ] Remove any links to `manual_manual` if not needed
- [ ] Ensure fulfillment sets are properly linked

---

### 5. Verify Shipping Options in Admin Panel

**Location**: Admin Panel → **Settings** → **Shipping Options**

**Action Required**:
- [ ] Login to admin panel
- [ ] Navigate to **Settings** → **Shipping Options**
- [ ] Verify all shipping options use production fulfillment providers
- [ ] Verify shipping prices are correct for production
- [ ] Test shipping calculation with a test cart

---

## 🔐 Environment Variables

### Backend Environment Variables

**File**: `medusa-backend/.env` (production)  
**Location**: Render dashboard (for production)

**Action Required**:
- [ ] Add production payment provider API keys (if using Stripe):
  ```env
  STRIPE_API_KEY=sk_live_...
  STRIPE_WEBHOOK_SECRET=whsec_...
  ```
- [ ] Add production fulfillment provider credentials (if using carrier APIs)
- [ ] Verify all environment variables are set correctly
- [ ] **Never commit** `.env` files to Git

---

### Storefront Environment Variables

**File**: `medusa-storefront/.env.local` (production)  
**Location**: Vercel dashboard (for production)

**Action Required**:
- [ ] Add production payment provider public keys (if using Stripe):
  ```env
  NEXT_PUBLIC_STRIPE_KEY=pk_live_...
  ```
- [ ] Verify `MEDUSA_BACKEND_URL` points to production backend
- [ ] Verify `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` is production key
- [ ] **Never commit** `.env.local` files to Git

---

## 🧹 Test Data Cleanup

### Test Orders

**Action Required**:
- [ ] Identify test orders created with dummy providers
- [ ] Delete or archive test orders from production database
- [ ] Verify no test orders remain in production

**SQL Check**:
```sql
-- Find orders with test payment providers
SELECT o.id, o.display_id, pc.provider_id 
FROM order o
JOIN payment_collection pc ON o.payment_collection_id = pc.id
JOIN payment_session ps ON pc.id = ps.payment_collection_id
WHERE ps.provider_id = 'pp_system_default';
```

---

### Test Customer Accounts (Optional)

**Action Required**:
- [ ] Review test customer accounts
- [ ] Delete or archive test accounts if needed
- [ ] Keep any legitimate test accounts that should remain

---

## ✅ Verification Steps

### 1. End-to-End Order Test

**Action Required**:
- [ ] Create a test cart with real products
- [ ] Proceed through checkout flow
- [ ] Verify payment providers shown are production providers only
- [ ] Verify shipping options shown are production options only
- [ ] Complete a test order (use test mode if available)
- [ ] Verify order is created successfully
- [ ] Verify payment is processed correctly (or marked for manual processing)
- [ ] Verify shipping is calculated correctly

---

### 2. Admin Panel Verification

**Action Required**:
- [ ] Login to admin panel
- [ ] Navigate to **Settings** → **Payment Providers**
  - [ ] Verify only production providers are enabled
  - [ ] Verify `pp_system_default` is NOT enabled
- [ ] Navigate to **Settings** → **Shipping Options**
  - [ ] Verify all options use production fulfillment providers
  - [ ] Verify `manual_manual` is NOT used (unless intentionally kept)
- [ ] Navigate to **Settings** → **Regions**
  - [ ] Verify all regions use production payment providers
  - [ ] Verify no regions use `pp_system_default`

---

### 3. Database Verification

**Action Required**:
- [ ] Run SQL queries to verify no test providers in use:
  ```sql
  -- Check payment providers
  SELECT DISTINCT provider_id FROM region_payment_provider;
  SELECT DISTINCT provider_id FROM payment_session;
  
  -- Check fulfillment providers
  SELECT DISTINCT provider_id FROM shipping_option;
  SELECT DISTINCT fulfillment_provider_id FROM link WHERE type = 'location_fulfillment_provider';
  ```
- [ ] Verify results show only production provider IDs
- [ ] Document any exceptions (e.g., if keeping manual fulfillment intentionally)

---

### 4. Storefront UI Verification

**Action Required**:
- [ ] Visit storefront checkout page
- [ ] Verify payment method selection shows only production providers
- [ ] Verify "Manual Payment" option is NOT visible (unless intentionally kept)
- [ ] Verify shipping options are displayed correctly
- [ ] Test the full checkout flow

---

## 📝 Summary Checklist

Before going live, ensure:

- [ ] **Payment Providers**:
  - [ ] Seed script updated (no `pp_system_default`)
  - [ ] All regions use production payment providers
  - [ ] Storefront constants updated (removed `pp_system_default`)
  - [ ] Admin panel shows only production providers enabled
  - [ ] Environment variables set for production payment APIs

- [ ] **Shipping Providers**:
  - [ ] Seed script updated (no `manual_manual` or replaced appropriately)
  - [ ] All shipping options use production fulfillment providers
  - [ ] Stock locations linked to production providers
  - [ ] Admin panel shows only production shipping options

- [ ] **Test Data**:
  - [ ] Test orders deleted/archived
  - [ ] Test customer accounts cleaned up (if needed)

- [ ] **Verification**:
  - [ ] End-to-end order test completed successfully
  - [ ] Admin panel verified
  - [ ] Database verified (no test providers)
  - [ ] Storefront UI verified

---

## 🔄 Rollback Plan

If issues occur after removing test providers:

1. **Immediate**: Re-enable `pp_system_default` in seed script and re-run
2. **Database**: Restore from backup if needed
3. **Admin Panel**: Re-add test providers temporarily for debugging
4. **Document**: Note what went wrong and fix before retrying

---

## 📚 Additional Resources

- **Medusa Payment Provider Docs**: https://docs.medusajs.com/resources/commerce-modules/payment
- **Medusa Fulfillment Provider Docs**: https://docs.medusajs.com/resources/commerce-modules/fulfillment
- **Stripe Integration**: https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe

---

## 🎯 Quick Reference: Test Provider IDs

| Provider Type | Test/Dummy ID | Description |
|--------------|---------------|-------------|
| Payment | `pp_system_default` | Manual payment provider (no real processing) |
| Fulfillment | `manual_manual` | Manual fulfillment provider (no carrier integration) |

**⚠️ These should NOT be in production!**

---

**Last Review**: [Date]  
**Reviewed By**: [Name]  
**Status**: ⚠️ Pending - Complete before launch

