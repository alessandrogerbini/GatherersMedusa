import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

/**
 * Test script to check Orgin collection and products
 */
export default async function testOrginCollection({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const productModuleService = container.resolve(Modules.PRODUCT);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("Testing Orgin collection and products...");

  // Check for collections
  const { data: collections } = await query.graph({
    entity: "product_collection",
    fields: ["id", "title", "handle"],
  });

  logger.info(`\nTotal collections: ${collections.length}`);
  collections.forEach((c: any) => {
    logger.info(`  - ${c.title} (handle: ${c.handle}, id: ${c.id})`);
  });

  // Find Orgin collection
  const orginCollection = collections.find((c: any) => 
    c.handle === "orgin" || 
    c.handle === "orgin-organics" ||
    c.title?.toLowerCase().includes("orgin")
  );

  if (orginCollection) {
    logger.info(`\n✅ Found Orgin collection:`);
    logger.info(`  Title: ${orginCollection.title}`);
    logger.info(`  Handle: ${orginCollection.handle}`);
    logger.info(`  ID: ${orginCollection.id}`);

    // Get products in this collection using the link
    const { data: collectionProducts } = await query.graph({
      entity: "product",
      fields: ["id", "title", "handle", "status"],
    });

    // Filter products that are linked to this collection
    // Note: In Medusa v2, collections are linked via a many-to-many relationship
    // We need to check the link table
    logger.info(`\nChecking products linked to collection...`);
    
    // Try to get products via the product service
    const allProducts = await productModuleService.listProducts({
      collection_id: [orginCollection.id],
    });

    logger.info(`\nProducts in collection (via service): ${allProducts.length}`);
    allProducts.forEach((p: any) => {
      logger.info(`  - ${p.title} (${p.handle}) - Status: ${p.status}`);
    });
  } else {
    logger.warn("\n❌ Orgin collection not found!");
    logger.info("Available collection handles:");
    collections.forEach((c: any) => {
      logger.info(`  - ${c.handle}`);
    });
  }

  // Also check products by handle
  const { data: allProducts } = await query.graph({
    entity: "product",
    fields: ["id", "title", "handle", "status"],
  });

  const orginProducts = allProducts.filter((p: any) => 
    p.handle?.startsWith("orgin-")
  );

  logger.info(`\nProducts with handle starting with 'orgin-': ${orginProducts.length}`);
  if (orginProducts.length > 0) {
    orginProducts.forEach((p: any) => {
      logger.info(`  - ${p.title} (${p.handle}) - Status: ${p.status}`);
    });
  }

  logger.info("\n=== Test Complete ===");
}









