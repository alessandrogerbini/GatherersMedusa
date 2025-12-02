import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

// Product handles to update
const productHandles = [
  "squirrel-bait",
  "chipmunks-choice",
  "foxs-fancy",
  "bees-knees",
  "badgers-best",
  "turtle-tracks",
];

export default async function addEurPricing({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const productModuleService = container.resolve(Modules.PRODUCT);
  const pricingModuleService = container.resolve(Modules.PRICING);

  logger.info("Adding EUR pricing to Gatherer's Granola products...");

  // Get all granola products
  const products = await productModuleService.listProducts(
    { handle: productHandles },
    { relations: ["variants"] }
  );

  if (products.length === 0) {
    logger.warn("No Gatherer's Granola products found!");
    return;
  }

  logger.info(`Found ${products.length} products to update`);

  for (const product of products) {
    for (const variant of product.variants) {
      try {
        // Get existing price sets for this variant
        const query = container.resolve(ContainerRegistrationKeys.QUERY);
        
        const { data: variantPriceData } = await query.graph({
          entity: "product_variant",
          fields: ["id", "price_set.id", "price_set.prices.*"],
          filters: { id: variant.id },
        });

        if (variantPriceData.length && variantPriceData[0].price_set) {
          const priceSet = variantPriceData[0].price_set;
          
          // Check if EUR price already exists
          const hasEurPrice = priceSet.prices?.some(
            (p: any) => p.currency_code === "eur"
          );

          if (!hasEurPrice) {
            // Add EUR price to existing price set
            await pricingModuleService.addPrices({
              priceSetId: priceSet.id,
              prices: [
                {
                  amount: 549, // €5.49
                  currency_code: "eur",
                },
              ],
            });
            logger.info(`Added EUR price to ${product.title} - ${variant.title}`);
          } else {
            logger.info(`EUR price already exists for ${product.title} - ${variant.title}`);
          }
        } else {
          logger.warn(`No price set found for ${product.title} - ${variant.title}`);
        }
      } catch (error) {
        logger.error(`Error updating ${product.title} - ${variant.title}: ${error}`);
      }
    }
  }

  logger.info("EUR pricing update complete!");
}

