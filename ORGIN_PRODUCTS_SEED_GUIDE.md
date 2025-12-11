# Orgin Organics Products Seed Guide

## Overview

This guide explains how to seed Orgin Organics products into your Medusa store. The seed script has been created at `medusa-backend/src/scripts/seed-orgin-products.ts`.

## What's Been Completed

✅ **Product Images Copied**: All product images from `Brand Assets/Orgin/Product Photography/` have been copied to `medusa-backend/static/`

✅ **Seed Script Created**: The seed script includes all 9 Orgin products with:
- Product titles and handles
- Descriptions from flavor profiles
- Product categories
- Ingredients lists
- Image references
- Placeholder pricing structure

## Products Included

1. **BBQ Cashew** - `orgin-bbq-cashew`
2. **Everything Bagel Cashew** - `orgin-everything-bagel-cashew`
3. **Honey Roasted Cashew** - `orgin-honey-roasted-cashew`
4. **Maple Masala Cashew** - `orgin-maple-masala-cashew`
5. **Za'atar Cashew** - `orgin-zaatar-cashew`
6. **Provincial Pecan** - `orgin-provincial-pecan`
7. **Smoked Almonds** - `orgin-smoked-almonds`
8. **Mixed Nuts** - `orgin-mixed-nuts`
9. **Smoked Mixed Nuts** - `orgin-smoked-mixed-nuts`

## Next Steps

### 1. Update Pricing

The seed script currently has placeholder prices. Update the `usdPrice` and `eurPrice` values in `seed-orgin-products.ts` with actual prices from the scraped website data.

**Current placeholder structure:**
```typescript
usdPrice: 2499, // $24.99 - placeholder, update with actual price
eurPrice: 2299, // €22.99 - placeholder, update with actual price
```

**Note:** Prices are in cents (e.g., 2499 = $24.99)

### 2. Download Nutrition Panel Images

You need to download nutrition panel images from the Orgin Organics website for each product. Once downloaded:

1. Save them to `medusa-backend/static/` with the naming convention:
   - `orgin-bbq-cashew-nutrition.png`
   - `orgin-everything-bagel-cashew-nutrition.png`
   - `orgin-honey-roasted-cashew-nutrition.png`
   - etc.

2. The seed script is already configured to include these as alternate images for each product.

### 3. Run the Seed Script

Once pricing is updated and nutrition labels are downloaded:

```bash
cd medusa-backend
npx medusa db:seed --seed-file=src/scripts/seed-orgin-products.ts
```

## Product Structure

Each product includes:

- **Title**: Product name
- **Handle**: URL-friendly slug
- **Description**: Full product description
- **Category**: Assigned to "Orgin Organics" category
- **Images**: 
  - Primary product image
  - Nutrition label (when available)
- **Metadata**:
  - Brand: "orgin"
  - Tagline
  - Category (cashews, almonds, pecans, mixed)
  - Ingredients list
  - Certifications (USDA Organic, Non-GMO, Gluten-Free, Vegan)
- **Variants**: Single variant with USD and EUR pricing
- **Weight**: 226g (8oz approximate)

## Image Files

Product images are located in:
- `medusa-backend/static/Orgin BBQ Cashew.jpg`
- `medusa-backend/static/Orgin Everything Bagel Cashew.jpg`
- `medusa-backend/static/Orgin Honey Roasted Cashew.jpg`
- `medusa-backend/static/Orgin Maple Masala Cashews.jpg`
- `medusa-backend/static/Orgin Mixed Nuts.jpg`
- `medusa-backend/static/Orgin Provincial Pecan.jpg`
- `medusa-backend/static/Orgin Smoked Almonds.jpg`
- `medusa-backend/static/Orgin Smoked Mixed Nuts.jpg`
- `medusa-backend/static/Orgin Zaatar Cashew.jpg`

## Pricing Update Example

To update pricing for a product, edit the product object in `seed-orgin-products.ts`:

```typescript
{
  title: "BBQ Cashew",
  // ... other fields ...
  usdPrice: 2999, // Update to $29.99
  eurPrice: 2799, // Update to €27.99
}
```

## Notes

- The script assumes USD and EUR regions exist in your Medusa setup
- Products are assigned to the "Orgin Organics" category
- All products are set to PUBLISHED status
- Inventory management is disabled by default (set `manage_inventory: true` in variants if needed)
- Products are assigned to the default sales channel

## Troubleshooting

**Error: "No default sales channel found"**
- Run the main seed script first: `npx medusa db:seed`

**Error: "Required regions (USD and EUR) not found"**
- Ensure you have created USD and EUR regions in your Medusa admin or seed scripts

**Images not showing**
- Verify images are in `medusa-backend/static/`
- Check that `MEDUSA_BACKEND_URL` environment variable is set correctly
- Images are served from `/static/` path by Medusa

## After Seeding

Once products are seeded:

1. Verify products appear in Medusa Admin: `http://localhost:9000/app/products`
2. Check product pages on storefront
3. Verify images load correctly
4. Test adding products to cart
5. Verify pricing displays correctly in both USD and EUR









