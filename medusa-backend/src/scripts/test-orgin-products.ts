import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

/**
 * Test script to check Orgin products and their metadata
 */
export default async function testOrginProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const productModuleService = container.resolve(Modules.PRODUCT);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("Testing Orgin products...");

  // Get all products
  const { data: allProducts } = await query.graph({
    entity: "product",
    fields: [
      "id",
      "title",
      "handle",
      "metadata",
      "category_id",
      "status",
    ],
  });

  logger.info(`Total products in database: ${allProducts.length}`);

  // Check for Orgin products by handle
  const orginProducts = allProducts.filter((p: any) => 
    p.handle?.startsWith("orgin-")
  );

  logger.info(`Products with handle starting with 'orgin-': ${orginProducts.length}`);

  if (orginProducts.length > 0) {
    logger.info("\n=== Orgin Products Found ===");
    orginProducts.forEach((p: any) => {
      logger.info(`\nProduct: ${p.title}`);
      logger.info(`  Handle: ${p.handle}`);
      logger.info(`  Status: ${p.status}`);
      logger.info(`  Category ID: ${p.category_id || "None"}`);
      logger.info(`  Metadata: ${JSON.stringify(p.metadata, null, 2)}`);
    });
  } else {
    logger.warn("No Orgin products found by handle!");
  }

  // Check category
  const { data: categories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle"],
  });

  const orginCategory = categories.find((c: any) => 
    c.handle === "orgin-organics"
  );

  if (orginCategory) {
    logger.info(`\n✅ Orgin Organics category found:`);
    logger.info(`  ID: ${orginCategory.id}`);
    logger.info(`  Name: ${orginCategory.name}`);
    logger.info(`  Handle: ${orginCategory.handle}`);

    // Get products in this category
    const { data: categoryProducts } = await query.graph({
      entity: "product",
      fields: ["id", "title", "handle"],
      filters: {
        category_id: orginCategory.id,
      },
    });

    logger.info(`\nProducts in category: ${categoryProducts.length}`);
    categoryProducts.forEach((p: any) => {
      logger.info(`  - ${p.title} (${p.handle})`);
    });
  } else {
    logger.warn("\n❌ Orgin Organics category not found!");
  }

  // Check products by metadata
  const productsWithBrand = allProducts.filter((p: any) => {
    const metadata = p.metadata || {};
    return metadata.brand === "orgin" || metadata.brand === "Orgin Organics";
  });

  logger.info(`\nProducts with brand metadata 'orgin': ${productsWithBrand.length}`);
  if (productsWithBrand.length > 0) {
    productsWithBrand.forEach((p: any) => {
      logger.info(`  - ${p.title} (brand: ${p.metadata?.brand})`);
    });
  }

  logger.info("\n=== Test Complete ===");
}









