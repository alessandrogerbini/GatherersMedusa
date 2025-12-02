import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

// Product handles to fix
const productHandles = [
  "squirrel-bait",
  "chipmunks-choice",
  "foxs-fancy",
  "bees-knees",
  "badgers-best",
  "turtle-tracks",
];

export default async function fixGranolaPrices({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const productModuleService = container.resolve(Modules.PRODUCT);
  const pricingModuleService = container.resolve(Modules.PRICING);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("Fixing Gatherer's Granola prices to $5.49...");

  // Get all granola products
  const products = await productModuleService.listProducts(
    { handle: productHandles },
    { relations: ["variants"] }
  );

  if (products.length === 0) {
    logger.warn("No Gatherer's Granola products found!");
    return;
  }

  logger.info(`Found ${products.length} products to fix`);

  for (const product of products) {
    for (const variant of product.variants) {
      try {
        // Get existing price sets for this variant
        const { data: variantPriceData } = await query.graph({
          entity: "product_variant",
          fields: ["id", "price_set.id", "price_set.prices.*"],
          filters: { id: variant.id },
        });

        if (variantPriceData.length && variantPriceData[0].price_set) {
          const priceSet = variantPriceData[0].price_set;
          
          // Update each price to the correct amount
          for (const price of priceSet.prices || []) {
            // Update to 5.49 (Medusa v2 uses base currency units, not cents)
            await pricingModuleService.updatePrices([
              {
                id: price.id,
                amount: 5.49,
              },
            ]);
            logger.info(`Fixed ${product.title} ${price.currency_code.toUpperCase()} price to $5.49`);
          }
        } else {
          logger.warn(`No price set found for ${product.title} - ${variant.title}`);
        }
      } catch (error) {
        logger.error(`Error fixing ${product.title} - ${variant.title}: ${error}`);
      }
    }
  }

  logger.info("Price fix complete!");
}

