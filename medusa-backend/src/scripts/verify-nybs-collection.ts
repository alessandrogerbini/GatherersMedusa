import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

/**
 * Verify NYBS Collection Script
 * 
 * This script checks if the NYBS collection exists and has products.
 * 
 * To run: npx medusa exec ./src/scripts/verify-nybs-collection.ts
 */

export default async function verifyNYBSCollection({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const productModuleService = container.resolve(Modules.PRODUCT);

  logger.info("🔍 Verifying NYBS collection...");
  logger.info("");

  // Get all collections
  logger.info("Step 1: Listing all collections...");
  const allCollections = await productModuleService.listProductCollections({});

  logger.info(`Found ${allCollections.length} collections:`);
  for (const collection of allCollections) {
    logger.info(`   - "${collection.title}" (handle: ${collection.handle || "no handle"})`);
  }
  logger.info("");

  // Find NYBS collection
  logger.info("Step 2: Looking for NYBS collection...");
  const nybsCollection = allCollections.find(
    (c: any) => c.handle === "nybs" || 
    c.title?.toLowerCase().includes("nybs") ||
    c.title === "NYBS"
  );

  if (!nybsCollection) {
    logger.error("❌ NYBS collection NOT found!");
    logger.info("");
    logger.info("Collections found:");
    for (const collection of allCollections) {
      logger.info(`   - "${collection.title}" (handle: ${collection.handle || "none"})`);
    }
    logger.info("");
    logger.info("To create NYBS collection:");
    logger.info("1. Go to Admin Panel: http://localhost:9000/app");
    logger.info("2. Navigate to Products → Collections");
    logger.info("3. Create a new collection with:");
    logger.info("   - Title: NYBS");
    logger.info("   - Handle: nybs");
    logger.info("4. Add all NYBS products to this collection");
    return;
  }

  logger.info(`✅ Found NYBS collection: "${nybsCollection.title}"`);
  logger.info(`   Handle: ${nybsCollection.handle || "none"}`);
  logger.info(`   ID: ${nybsCollection.id}`);
  logger.info("");

  // Check if collection has products
  logger.info("Step 3: Checking collection products...");
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  
  try {
    const collectionProducts = await link.list(
      { 
        [Modules.PRODUCT]: {},
        [Modules.PRODUCT_COLLECTION]: { collection_id: nybsCollection.id }
      },
      {
        fields: ["id", "title", "handle"],
      }
    );

    logger.info(`   Found ${collectionProducts.length} products in collection:`);
    for (const product of collectionProducts) {
      logger.info(`   - ${product.title}`);
    }

    if (collectionProducts.length === 0) {
      logger.warn("⚠️  Collection has NO products!");
      logger.info("");
      logger.info("To add products:");
      logger.info("1. Go to Admin Panel: http://localhost:9000/app");
      logger.info("2. Navigate to Products → Collections");
      logger.info("3. Click on 'NYBS' collection");
      logger.info("4. Add NYBS products to the collection");
    }
  } catch (error: any) {
    logger.warn(`   ⚠️  Could not verify products: ${error.message}`);
  }

  logger.info("");
  logger.info("📊 Summary:");
  logger.info(`   Collection exists: ✅ Yes`);
  logger.info(`   Collection handle: ${nybsCollection.handle || "❌ MISSING"}`);
  logger.info(`   Collection ID: ${nybsCollection.id}`);
  logger.info("");

  if (!nybsCollection.handle) {
    logger.error("❌ Collection has NO handle! This will cause routing issues.");
    logger.info("Please set the handle to 'nybs' in the Admin Panel.");
  } else if (nybsCollection.handle !== "nybs") {
    logger.warn(`⚠️  Collection handle is '${nybsCollection.handle}', not 'nybs'`);
    logger.info(`   Expected URL: /collections/${nybsCollection.handle}`);
  } else {
    logger.info("✅ Collection handle is correct!");
    logger.info("   Expected URL: /collections/nybs");
  }
}









