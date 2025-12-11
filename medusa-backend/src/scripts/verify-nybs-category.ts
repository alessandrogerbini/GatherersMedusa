import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

/**
 * Verify NYBS Category Script
 * 
 * This script checks if the NYBS category exists and is properly configured.
 * 
 * To run: npx medusa exec ./src/scripts/verify-nybs-category.ts
 */

export default async function verifyNYBSCategory({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const productModuleService = container.resolve(Modules.PRODUCT);

  logger.info("🔍 Verifying NYBS category...");
  logger.info("");

  // Step 1: Check if category exists
  logger.info("Step 1: Checking if NYBS category exists...");
  
  let nybsCategory;
  const categories = await productModuleService.listProductCategories({
    handle: "nybs",
  });

  if (!categories || categories.length === 0) {
    logger.error("❌ NYBS category does NOT exist!");
    logger.info("");
    logger.info("To create it, run:");
    logger.info("  npx medusa exec ./src/scripts/seed-nybs-products.ts");
    return;
  }

  nybsCategory = categories[0];
  logger.info(`✅ Category found: ${nybsCategory.name || "NYBS"}`);
  logger.info(`   Handle: ${nybsCategory.handle || "nybs"}`);
  logger.info(`   ID: ${nybsCategory.id}`);
  logger.info(`   Is Active: ${nybsCategory.is_active !== false ? "Yes" : "No"}`);
  logger.info("");

  // Step 2: Check if category is active
  if (nybsCategory.is_active === false) {
    logger.warn("⚠️  Category is INACTIVE. This may prevent it from appearing in the Store API.");
    logger.info("");
  }

  // Step 3: Find NYBS products
  logger.info("Step 2: Checking NYBS products...");
  const allProducts = await productModuleService.listProducts({});
  const nybsProducts = allProducts.filter((p: any) =>
    p.handle?.startsWith("nybs-")
  );

  logger.info(`   Found ${nybsProducts.length} NYBS products:`);
  for (const product of nybsProducts) {
    logger.info(`   - ${product.title}`);
  }
  logger.info("");

  // Step 4: Check if products are linked to category
  logger.info("Step 3: Verifying product-category links...");
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  
  let linkedCount = 0;
  for (const product of nybsProducts) {
    try {
      const productCategories = await link.list(
        { 
          [Modules.PRODUCT]: { product_id: product.id },
          [Modules.PRODUCT_CATEGORY]: {}
        },
        {
          fields: ["id", "handle"],
        }
      );
      
      const hasNYBS = productCategories.some((cat: any) => 
        cat.id === nybsCategory.id || cat.handle === "nybs"
      );
      
      if (hasNYBS) {
        logger.info(`   ✅ "${product.title}" is linked to NYBS category`);
        linkedCount++;
      } else {
        logger.warn(`   ⚠️  "${product.title}" is NOT linked to NYBS category`);
      }
    } catch (error: any) {
      logger.warn(`   ⚠️  Could not verify "${product.title}": ${error.message}`);
    }
  }

  logger.info("");
  logger.info("📊 Summary:");
  logger.info(`   Category exists: ✅ Yes`);
  logger.info(`   Category active: ${nybsCategory.is_active !== false ? "✅ Yes" : "❌ No"}`);
  logger.info(`   Total NYBS products: ${nybsProducts.length}`);
  logger.info(`   Products linked to category: ${linkedCount}/${nybsProducts.length}`);
  logger.info("");

  if (linkedCount === 0) {
    logger.warn("⚠️  NO products are linked to the NYBS category!");
    logger.info("");
    logger.info("To fix this:");
    logger.info("1. Go to Admin Panel: http://localhost:9000/app");
    logger.info("2. Navigate to Products");
    logger.info("3. For each NYBS product, add the 'NYBS' category");
    logger.info("");
  } else if (linkedCount < nybsProducts.length) {
    logger.warn(`⚠️  Only ${linkedCount} of ${nybsProducts.length} products are linked!`);
    logger.info("Please link the remaining products in the Admin Panel.");
    logger.info("");
  }

  // Step 5: Test Store API access
  logger.info("Step 4: Testing Store API access...");
  logger.info("   Category should be accessible at:");
  logger.info(`   GET /store/product-categories?handle=nybs`);
  logger.info("");
  
  if (nybsCategory.is_active === false) {
    logger.error("❌ Category is INACTIVE - it may not be visible via Store API!");
    logger.info("   Please activate it in the Admin Panel.");
  } else {
    logger.info("✅ Category should be accessible via Store API");
  }

  logger.info("");
  logger.info("🔗 Expected URL:");
  logger.info(`   http://localhost:8000/us/categories/nybs`);
  logger.info("");
  logger.info("If the page shows 'not found', the category may:");
  logger.info("1. Not be active (check is_active flag)");
  logger.info("2. Not be accessible via Store API");
  logger.info("3. Have caching issues (try rebuilding the storefront)");
}









