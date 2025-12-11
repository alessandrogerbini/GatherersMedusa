# NYBS Category Assignment Fix

## Issue
The NYBS products were created but are not properly assigned to the NYBS category, causing `/categories/nybs` to show no products.

## Root Cause
When the seed script runs and the category already exists, it was unable to retrieve the category properly, so products were created without category assignment.

## Solution

### Option 1: Use Admin Panel (Easiest & Recommended)
1. Go to Admin Dashboard: `http://localhost:9000/app`
2. Navigate to **Products**
3. For each NYBS product, do the following:
   - Click on the product to open it
   - Scroll to the **Categories** section
   - Click **Add Category** or select **NYBS** from the dropdown
   - Click **Save**

4. Repeat for all 4 NYBS products:
   - NYBS™ Everything Bagel Cashews, 3.5oz
   - NYBS™ Honey Roasted Cashews, 3.5oz
   - NYBS™ Ranch Cashews, 3.5oz
   - NYBS™ Smoked Mixed Nuts, 3.5oz

### Option 2: Delete and Re-seed (If Admin Panel Doesn't Work)
1. Go to Admin Dashboard: `http://localhost:9000/app`
2. Navigate to **Products**
3. Delete all 4 NYBS products
4. Re-run the seed script:

```powershell
cd medusa-backend
npx medusa exec ./src/scripts/seed-nybs-products.ts
```

The updated seed script will now properly assign categories when creating new products.

### Verify Fix
1. Go to Admin Dashboard: `http://localhost:9000/app`
2. Navigate to **Products** → **Categories**
3. Click on **NYBS** category
4. You should see all 4 products listed

Or visit: `http://localhost:8000/us/categories/nybs` - it should display all 4 NYBS products.

## Technical Details
- Category Handle: `nybs`
- Category Name: `NYBS`
- Category ID: `pcat_01KC00F9WHFTJ4A0JGRFKSWTV2` (may vary)

The issue occurs because the `updateProductsWorkflow` has compatibility issues with the current Medusa setup when trying to update existing products. Using the Admin Panel is the most reliable method.

