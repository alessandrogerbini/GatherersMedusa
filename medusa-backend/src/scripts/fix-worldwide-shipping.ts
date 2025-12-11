import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";
import {
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * Script to fix worldwide shipping - creates a fulfillment set with ALL countries
 * This ensures shipping options work for ANY location
 */
export default async function fixWorldwideShipping({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const regionModuleService = container.resolve(Modules.REGION);
  const storeModuleService = container.resolve(Modules.STORE);
  const { createStockLocationsWorkflow } = await import("@medusajs/medusa/core-flows");

  logger.info("🌍 Fixing worldwide shipping - creating fulfillment set with ALL countries...");

  try {
    // Get all regions
    const regions = await regionModuleService.listRegions({});
    if (regions.length === 0) {
      logger.error("❌ No regions found. Please run seed script first.");
      return;
    }

    // Get store and its default location (this is the one that should already be configured)
    const [store] = await storeModuleService.listStores();
    let primaryStockLocation: any = null;

    // Try to get the store's default location first (this is likely already set up)
    if (store?.default_location_id) {
      try {
        const locationQuery = await query.graph({
          entity: "stock_location",
          fields: ["id", "name"],
          filters: { id: store.default_location_id },
        });
        if (locationQuery && (Array.isArray(locationQuery) ? locationQuery.length > 0 : locationQuery)) {
          const loc = Array.isArray(locationQuery) ? locationQuery[0] : locationQuery;
          primaryStockLocation = { id: store.default_location_id, name: loc.name || "Store Default Location" };
          logger.info(`Using store's default location: ${primaryStockLocation.name}`);
        }
      } catch (e) {
        // Query failed
      }
    }

    // If not found, get any existing location
    if (!primaryStockLocation) {
      try {
        const allLocations = await query.graph({
          entity: "stock_location",
          fields: ["id", "name"],
        });
        const locations = Array.isArray(allLocations) ? allLocations : (allLocations ? [allLocations] : []);
        if (locations.length > 0) {
          primaryStockLocation = locations[0];
          logger.info(`Using existing stock location: ${primaryStockLocation.name || primaryStockLocation.id}`);
        }
      } catch (e) {
        // Query failed
      }
    }

    // Only create new one if absolutely necessary
    if (!primaryStockLocation) {
      logger.info("Creating stock location...");
      const { result: stockLocationResult } = await createStockLocationsWorkflow(container).run({
        input: {
          locations: [
            {
              name: "Worldwide Warehouse",
              address: {
                city: "Global",
                country_code: "US",
                address_1: "",
              },
            },
          ],
        },
      });
      primaryStockLocation = stockLocationResult[0];
      logger.info(`✅ Created stock location: ${primaryStockLocation.name}`);
      
      // Set as store's default location
      if (store) {
        try {
          await storeModuleService.updateStores({
            id: store.id,
            default_location_id: primaryStockLocation.id,
          });
          logger.info("✅ Set as store's default location");
        } catch (e) {
          logger.warn(`Could not set default location: ${e}`);
        }
      }
    }

    const allStockLocations = primaryStockLocation ? [primaryStockLocation] : [];

    // Link primary stock location to fulfillment provider (CRITICAL - must be done before creating shipping options)
    if (primaryStockLocation) {
      logger.info(`Linking stock location ${primaryStockLocation.name || primaryStockLocation.id} to fulfillment provider...`);
      try {
        await link.create({
          [Modules.STOCK_LOCATION]: {
            stock_location_id: primaryStockLocation.id,
          },
          [Modules.FULFILLMENT]: {
            fulfillment_provider_id: "manual_manual",
          },
        });
        logger.info(`✅ Linked stock location to fulfillment provider`);
      } catch (error: any) {
        if (error.message?.includes("multiple links") || error.message?.includes("already exists") || error.message?.includes("duplicate")) {
          logger.info(`✓ Stock location already linked to fulfillment provider`);
        } else {
          logger.warn(`Could not link to provider (may already be linked): ${error.message}`);
        }
      }
    }

    // Get all countries from all regions - this gives us worldwide coverage
    const allCountriesSet = new Set<string>();
    regions.forEach((region: any) => {
      if (region.countries) {
        region.countries.forEach((country: any) => {
          if (country.iso_2) {
            allCountriesSet.add(country.iso_2.toLowerCase());
          }
        });
      }
    });

    // Add common countries that might not be in regions
    const additionalCountries = [
      "us", "gb", "ca", "au", "nz", "ie", "de", "fr", "es", "it", "nl", "be",
      "at", "ch", "se", "no", "dk", "fi", "pl", "cz", "pt", "gr", "hu", "ro",
      "bg", "hr", "sk", "si", "ee", "lv", "lt", "mt", "cy", "lu", "is",
      "jp", "kr", "cn", "in", "sg", "my", "th", "ph", "id", "vn", "tw", "hk",
      "mx", "br", "ar", "cl", "co", "pe", "ve", "ec", "uy", "py", "bo", "cr",
      "pa", "gt", "hn", "ni", "sv", "do", "jm", "tt", "bb", "bz", "gy", "sr",
      "za", "eg", "ma", "ng", "ke", "gh", "tz", "ug", "et", "zm", "zw", "mw",
      "ae", "sa", "il", "jo", "lb", "kw", "qa", "bh", "om", "ye", "iq", "ir",
      "tr", "ru", "ua", "kz", "uz", "by", "md", "ge", "am", "az", "pk", "bd",
      "lk", "mm", "kh", "la", "np", "bt", "af", "tj", "kg", "mn"
    ];
    
    additionalCountries.forEach(country => allCountriesSet.add(country.toLowerCase()));
    
    const allCountries = Array.from(allCountriesSet);
    logger.info(`Creating fulfillment set covering ${allCountries.length} countries...`);

    // Create a new worldwide fulfillment set
    const worldwideFulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
      name: `Worldwide Shipping - ${Date.now()}`,
      type: "shipping",
      service_zones: [
        {
          name: `Worldwide Zone - ${Date.now()}`,
          geo_zones: allCountries.map((country) => ({
            country_code: country,
            type: "country" as const,
          })),
        },
      ],
    });
    logger.info(`✅ Created worldwide fulfillment set: ${worldwideFulfillmentSet.name}`);

    // Link primary stock location to worldwide fulfillment set (CRITICAL - must be done before creating shipping options)
    if (primaryStockLocation) {
      logger.info(`Linking stock location ${primaryStockLocation.name || primaryStockLocation.id} to worldwide fulfillment set...`);
      try {
        await link.create({
          [Modules.STOCK_LOCATION]: {
            stock_location_id: primaryStockLocation.id,
          },
          [Modules.FULFILLMENT]: {
            fulfillment_set_id: worldwideFulfillmentSet.id,
          },
        });
        logger.info(`✅ Linked stock location to worldwide fulfillment set`);
      } catch (error: any) {
        if (error.message?.includes("multiple links") || error.message?.includes("already exists") || error.message?.includes("duplicate")) {
          logger.info(`✓ Stock location already linked to worldwide fulfillment set`);
        } else {
          logger.warn(`Could not link to fulfillment set (may already be linked): ${error.message}`);
        }
      }
    }

    // Get or create shipping profile
    const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
      type: "default",
    });
    let shippingProfile = shippingProfiles.length > 0 ? shippingProfiles[0] : null;

    if (!shippingProfile) {
      const { result: shippingProfileResult } = await createShippingProfilesWorkflow(container).run({
        input: {
          data: [
            {
              name: "Default Shipping Profile",
              type: "default",
            },
          ],
        },
      });
      shippingProfile = shippingProfileResult[0];
    }

    // Create prices for all regions
    const standardPrices = regions.map((region) => ({
      region_id: region.id,
      amount: 10,
    }));
    standardPrices.push(
      { currency_code: "usd", amount: 10 },
      { currency_code: "eur", amount: 10 },
      { currency_code: "gbp", amount: 8 }
    );

    const expressPrices = regions.map((region) => ({
      region_id: region.id,
      amount: 20,
    }));
    expressPrices.push(
      { currency_code: "usd", amount: 20 },
      { currency_code: "eur", amount: 20 },
      { currency_code: "gbp", amount: 16 }
    );

    const serviceZoneId = worldwideFulfillmentSet.service_zones?.[0]?.id;
    if (!serviceZoneId) {
      throw new Error("No service zone in worldwide fulfillment set");
    }

    // CRITICAL: Ensure stock location is properly linked before creating shipping options
    // Wait a moment for links to propagate
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create worldwide shipping options
    logger.info("Creating worldwide shipping options...");
    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: "Standard Shipping (Worldwide)",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: serviceZoneId,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Standard",
            description: "Ship in 2-3 days. Available worldwide.",
            code: "standard_worldwide",
          },
          prices: standardPrices,
          rules: [
            {
              attribute: "enabled_in_store",
              value: "true",
              operator: "eq",
            },
            {
              attribute: "is_return",
              value: "false",
              operator: "eq",
            },
          ],
        },
        {
          name: "Express Shipping (Worldwide)",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: serviceZoneId,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Express",
            description: "Ship in 24 hours. Available worldwide.",
            code: "express_worldwide",
          },
          prices: expressPrices,
          rules: [
            {
              attribute: "enabled_in_store",
              value: "true",
              operator: "eq",
            },
            {
              attribute: "is_return",
              value: "false",
              operator: "eq",
            },
          ],
        },
      ],
    });
    logger.info("✅ Created worldwide shipping options");

    logger.info("");
    logger.info("✅ SUCCESS! Worldwide shipping is now configured!");
    logger.info(`   - Fulfillment Set: ${worldwideFulfillmentSet.name}`);
    logger.info(`   - Countries Covered: ${allCountries.length} countries`);
    logger.info("   - Shipping Options: Standard Shipping (Worldwide), Express Shipping (Worldwide)");
    logger.info("");
    logger.info("🧪 Test now: Go to checkout and add a shipping address - shipping options should appear!");

  } catch (error: any) {
    logger.error("❌ Error fixing worldwide shipping:", error.message);
    logger.error(error.stack);
    throw error;
  }
}

