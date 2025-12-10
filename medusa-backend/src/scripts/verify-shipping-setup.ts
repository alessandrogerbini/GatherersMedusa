import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";

/**
 * Script to verify shipping setup and diagnose issues
 */
export default async function verifyShippingSetup({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const storeModuleService = container.resolve(Modules.STORE);

  logger.info("🔍 Verifying shipping setup...");

  try {
    // Check stock locations
    const stockLocationResult = await query.graph({
      entity: "stock_location",
      fields: ["id", "name"],
    });
    const stockLocations = Array.isArray(stockLocationResult) ? stockLocationResult : (stockLocationResult ? [stockLocationResult] : []);
    logger.info(`\n📦 Stock Locations: ${stockLocations.length}`);
    stockLocations.forEach((loc: any) => {
      logger.info(`   - ${loc.name} (${loc.id})`);
    });

    // Check fulfillment sets
    const fulfillmentSets = await fulfillmentModuleService.listFulfillmentSets({});
    logger.info(`\n🚚 Fulfillment Sets: ${fulfillmentSets.length}`);
    for (const fs of fulfillmentSets) {
      logger.info(`   - ${fs.name} (${fs.id})`);
      if (fs.service_zones && fs.service_zones.length > 0) {
        const totalCountries = fs.service_zones.reduce((sum: number, sz: any) => {
          return sum + (sz.geo_zones?.length || 0);
        }, 0);
        logger.info(`     Service Zones: ${fs.service_zones.length}, Total Countries: ${totalCountries}`);
      } else {
        logger.info(`     ⚠️ No service zones!`);
      }
    }

    // Check shipping options
    const shippingOptions = await fulfillmentModuleService.listShippingOptions({});
    logger.info(`\n📮 Shipping Options: ${shippingOptions.length}`);
    for (const so of shippingOptions) {
      logger.info(`   - ${so.name} (${so.id})`);
      logger.info(`     Provider: ${so.provider_id}`);
      logger.info(`     Service Zone: ${so.service_zone?.name || 'N/A'}`);
      logger.info(`     Fulfillment Set: ${so.service_zone?.fulfillment_set?.name || 'N/A'}`);
    }

    // Check store default location
    const [store] = await storeModuleService.listStores();
    logger.info(`\n🏪 Store Default Location: ${store?.default_location_id || 'NOT SET'}`);

    logger.info("\n✅ Verification complete!");
    logger.info("\n💡 If shipping options don't appear:");
    logger.info("   1. Make sure cart has items");
    logger.info("   2. Add a shipping address to the cart first");
    logger.info("   3. Check browser console for errors");
    logger.info("   4. Try clearing browser cache");

  } catch (error: any) {
    logger.error("❌ Error verifying setup:", error.message);
    throw error;
  }
}

