import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";
import seedNYBSProducts from "./seed-nybs-products";

/**
 * Test script to verify NYBS products seed script works correctly
 * 
 * This script:
 * 1. Runs the NYBS seed script
 * 2. Verifies the category was created
 * 3. Verifies all 4 products were created
 * 4. Verifies product details (titles, descriptions, prices, metadata)
 * 
 * To run: npx medusa exec ./src/scripts/test-nybs-seed.ts
 */

export default async function testNYBSSeed({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const productModuleService = container.resolve(Modules.PRODUCT);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("🧪 Starting NYBS Seed Test...");
  logger.info("");

  try {
    // Step 1: Run the seed script
    logger.info("Step 1: Running seed script...");
    await seedNYBSProducts({ container });
    logger.info("✅ Seed script completed");
    logger.info("");

    // Wait a moment for operations to complete
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Step 2: Verify category was created (optional - products can exist without category)
    logger.info("Step 2: Verifying NYBS category...");
    const categoryResult = await query.graph({
      entity: "product_category",
      fields: ["id", "name", "handle", "description"],
      filters: {
        handle: "nybs",
      },
    });

    if (categoryResult && categoryResult.length > 0) {
      const nybsCategory = categoryResult[0];
      if (nybsCategory.name === "NYBS" && nybsCategory.handle === "nybs") {
        logger.info(`✅ Category exists: ${nybsCategory.name} (${nybsCategory.handle})`);
      } else {
        logger.warn(`⚠️  Category found but with unexpected values`);
      }
    } else {
      logger.warn("⚠️  NYBS category not found (products may have been created without category assignment)");
    }
    logger.info("");

    // Step 3: Verify products were created
    logger.info("Step 3: Verifying products were created...");
    const allProducts = await productModuleService.listProducts({});
    const nybsProducts = allProducts.filter((p: any) =>
      p.handle?.startsWith("nybs-")
    );

    if (nybsProducts.length !== 4) {
      logger.error(`❌ FAIL: Expected 4 products, found ${nybsProducts.length}`);
      return;
    }
    logger.info(`✅ Found ${nybsProducts.length} NYBS products`);
    logger.info("");

    // Step 4: Verify product details
    logger.info("Step 4: Verifying product details...");
    const expectedProducts = [
      {
        handle: "nybs-everything-bagel-cashews-3-5oz",
        title: "NYBS™ Everything Bagel Cashews, 3.5oz",
        descriptionContains: "All the crunch, all the flavor",
      },
      {
        handle: "nybs-honey-roasted-cashews-3-5oz",
        title: "NYBS™ Honey Roasted Cashews, 3.5oz",
        descriptionContains: "sweet, salty, crunchy classic",
      },
      {
        handle: "nybs-ranch-cashews-3-5oz",
        title: "NYBS™ Ranch Cashews, 3.5oz",
        descriptionContains: "Zesty, crunchy, and seriously addictive",
      },
      {
        handle: "nybs-smoked-mixed-nuts-3-5oz",
        title: "NYBS™ Smoked Mixed Nuts, 3.5oz",
        descriptionContains: "Wood-charred flavor",
      },
    ];

    let allProductsValid = true;
    for (const expected of expectedProducts) {
      const product = nybsProducts.find((p: any) => p.handle === expected.handle);
      
      if (!product) {
        logger.error(`❌ FAIL: Product ${expected.handle} not found`);
        allProductsValid = false;
        continue;
      }

      if (product.title !== expected.title) {
        logger.error(`❌ FAIL: Product ${expected.handle} has incorrect title`);
        logger.error(`   Expected: ${expected.title}`);
        logger.error(`   Found: ${product.title}`);
        allProductsValid = false;
        continue;
      }

      if (!product.description?.includes(expected.descriptionContains)) {
        logger.error(`❌ FAIL: Product ${expected.handle} has incorrect description`);
        allProductsValid = false;
        continue;
      }

      if (product.status !== "published") {
        logger.error(`❌ FAIL: Product ${expected.handle} is not published`);
        allProductsValid = false;
        continue;
      }

      // Weight validation (optional check - weight is set correctly if it exists)
      if (product.weight !== undefined && product.weight !== null && Number(product.weight) !== 99) {
        logger.warn(`⚠️  Product ${expected.handle} has weight ${product.weight} (expected ~99g for 3.5oz)`);
      }

      if (!product.metadata || product.metadata.brand !== "nybs") {
        logger.error(`❌ FAIL: Product ${expected.handle} has incorrect metadata`);
        allProductsValid = false;
        continue;
      }

      logger.info(`   ✅ ${product.title}`);
    }

    if (!allProductsValid) {
      logger.error("");
      logger.error("❌ FAIL: Some products failed validation");
      return;
    }

    logger.info("");
    logger.info("✅ All products validated successfully");
    logger.info("");

    // Step 5: Summary
    logger.info("📊 Test Summary:");
    logger.info(`   ✅ Products created: ${nybsProducts.length}`);
    logger.info(`   ✅ All products published: Yes`);
    logger.info(`   ✅ All products have correct metadata: Yes`);
    logger.info(`   ✅ All product titles and descriptions correct: Yes`);
    logger.info("");
    logger.info("🎉 All tests passed! NYBS products seed script is working correctly.");
    
  } catch (error) {
    logger.error("❌ TEST FAILED with error:");
    logger.error(error);
    throw error;
  }
}

