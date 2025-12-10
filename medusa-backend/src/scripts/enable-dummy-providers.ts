import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";
import {
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createRegionsWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * Script to enable dummy/test payment and shipping providers
 * This ensures existing regions have the test providers linked
 */
export default async function enableDummyProviders({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const storeModuleService = container.resolve(Modules.STORE);
  const regionModuleService = container.resolve(Modules.REGION);
  
  // Get all regions for pricing
  const regions = await regionModuleService.listRegions({});

  logger.info("🔧 Enabling dummy payment and shipping providers...");

  try {
    // Step 1: Get or create a region with payment provider
    logger.info("Step 1: Setting up regions with payment providers...");
    const existingRegions = await regionModuleService.listRegions({});

    if (existingRegions.length > 0) {
      logger.info(`Found ${existingRegions.length} existing region(s). Updating...`);
      
      for (const region of existingRegions) {
        // Try to link payment provider - if it already exists, that's fine
        try {
          logger.info(`Adding pp_system_default to region: ${region.name} (${region.id})`);
          
          // Link payment provider to region using the correct link format
          await link.create({
            [Modules.REGION]: {
              region_id: region.id,
            },
            [Modules.PAYMENT]: {
              payment_provider_id: "pp_system_default",
            },
          });
          
          logger.info(`✅ Payment provider added to region: ${region.name}`);
        } catch (error: any) {
          // Link might already exist, that's okay
          if (error.message?.includes("already exists") || error.message?.includes("duplicate") || error.message?.includes("multiple links")) {
            logger.info(`✓ Region ${region.name} already has payment provider`);
          } else {
            logger.warn(`Could not add payment provider to region ${region.name} (may already be linked): ${error.message}`);
          }
        }
      }
    } else {
      logger.info("No existing regions found. Creating new region with payment provider...");
      const { result: regionResult } = await createRegionsWorkflow(container).run({
        input: {
          regions: [
            {
              name: "Europe",
              currency_code: "eur",
              countries: ["gb", "de", "dk", "se", "fr", "es", "it"],
              payment_providers: ["pp_system_default"],
            },
          ],
        },
      });
      logger.info(`✅ Created region: ${regionResult[0].name}`);
    }

    // Step 2: Set up stock location and fulfillment provider
    logger.info("Step 2: Setting up stock location and fulfillment provider...");
    const [store] = await storeModuleService.listStores();
    
    // Get or create stock location using query service
    let stockLocation: any = null;
    
    // Try to get from store's default location first
    if (store?.default_location_id) {
      try {
        const locationQuery = await query.graph({
          entity: "stock_location",
          fields: ["id", "name"],
          filters: { id: store.default_location_id },
        });
        if (locationQuery?.length > 0) {
          stockLocation = { id: store.default_location_id, name: locationQuery[0].name || "Store Default Location" };
        }
      } catch (e) {
        // Query failed, will try other methods
      }
    }
    
    // If not found, try to list all
    if (!stockLocation) {
      try {
        const allLocations = await query.graph({
          entity: "stock_location",
          fields: ["id", "name"],
        });
        if (allLocations?.length > 0) {
          stockLocation = allLocations[0];
        }
      } catch (e) {
        // Query failed, will create
      }
    }

    if (!stockLocation) {
      logger.info("Creating stock location...");
      const { result: stockLocationResult } = await createStockLocationsWorkflow(container).run({
        input: {
          locations: [
            {
              name: "Default Warehouse",
              address: {
                city: "Copenhagen",
                country_code: "DK",
                address_1: "",
              },
            },
          ],
        },
      });
      stockLocation = stockLocationResult[0];
      logger.info(`✅ Created stock location: ${stockLocation.name}`);
    } else {
      logger.info(`Using existing stock location: ${stockLocation.name}`);
    }

    // Link stock location to fulfillment provider (try to create, ignore if exists)
    try {
      logger.info("Linking stock location to manual_manual fulfillment provider...");
      await link.create({
        [Modules.STOCK_LOCATION]: {
          stock_location_id: stockLocation.id,
        },
        [Modules.FULFILLMENT]: {
          fulfillment_provider_id: "manual_manual",
        },
      });
      logger.info("✅ Linked stock location to fulfillment provider");
    } catch (error: any) {
      if (error.message?.includes("already exists") || error.message?.includes("duplicate") || error.message?.includes("multiple links")) {
        logger.info("✓ Stock location already linked to fulfillment provider");
      } else {
        logger.warn(`Could not link stock location to provider (may already be linked): ${error.message}`);
      }
    }

    // Step 3: Set up fulfillment set and service zone
    logger.info("Step 3: Setting up fulfillment set and service zones...");
    const fulfillmentSets = await fulfillmentModuleService.listFulfillmentSets({});
    
    // Find existing fulfillment set with service zones, or use the first one
    let fulfillmentSet = fulfillmentSets.find(
      (fs: any) => fs.service_zones && fs.service_zones.length > 0
    ) || fulfillmentSets[0];

    if (!fulfillmentSet) {
      logger.info("Creating fulfillment set with service zone...");
      // Comprehensive list of countries for worldwide coverage - covers 100+ countries
      const commonCountries = [
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

      try {
        fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
          name: `Default Fulfillment Set (Worldwide Test) - ${Date.now()}`,
          type: "shipping",
          service_zones: [
            {
              name: `Worldwide Service Zone - ${Date.now()}`,
              geo_zones: commonCountries.map((country) => ({
                country_code: country,
                type: "country" as const,
              })),
            },
          ],
        });
        logger.info(`✅ Created fulfillment set: ${fulfillmentSet.name}`);
      } catch (error: any) {
        // If creation fails, try to use existing one
        logger.warn(`Could not create fulfillment set: ${error.message}`);
        fulfillmentSet = fulfillmentSets[0];
        if (fulfillmentSet) {
          logger.info(`Using existing fulfillment set: ${fulfillmentSet.name}`);
        }
      }
    } else {
      logger.info(`Using existing fulfillment set: ${fulfillmentSet.name}`);
      
      // Retrieve with service zones if not already loaded
      if (!fulfillmentSet.service_zones || fulfillmentSet.service_zones.length === 0) {
        try {
          fulfillmentSet = await fulfillmentModuleService.retrieveFulfillmentSet(
            fulfillmentSet.id,
            { relations: ["service_zones", "service_zones.geo_zones"] }
          );
        } catch (e) {
          // If retrieve fails, continue with what we have
        }
      }
    }

    // Link stock location to fulfillment set (try to create, ignore if exists)
    if (fulfillmentSet) {
      try {
        logger.info("Linking stock location to fulfillment set...");
        await link.create({
          [Modules.STOCK_LOCATION]: {
            stock_location_id: stockLocation.id,
          },
          [Modules.FULFILLMENT]: {
            fulfillment_set_id: fulfillmentSet.id,
          },
        });
        logger.info("✅ Linked stock location to fulfillment set");
      } catch (error: any) {
        if (error.message?.includes("already exists") || error.message?.includes("duplicate") || error.message?.includes("multiple links")) {
          logger.info("✓ Stock location already linked to fulfillment set");
        } else {
          logger.warn(`Could not link stock location to fulfillment set (may already be linked): ${error.message}`);
        }
      }
    }

    // Step 4: Create shipping options
    logger.info("Step 4: Setting up shipping options...");
    const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
      type: "default",
    });
    let shippingProfile = shippingProfiles.length > 0 ? shippingProfiles[0] : null;

    if (!shippingProfile) {
      logger.info("Creating shipping profile...");
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
      logger.info(`✅ Created shipping profile: ${shippingProfile.name}`);
    } else {
      logger.info(`Using existing shipping profile: ${shippingProfile.name}`);
    }

    // Check existing shipping options - look for worldwide ones specifically
    const existingShippingOptions = await fulfillmentModuleService.listShippingOptions({});
    const hasWorldwideStandard = existingShippingOptions.some(
      (so: any) => so.name === "Standard Shipping (Worldwide)" && so.provider_id === "manual_manual"
    );
    const hasWorldwideExpress = existingShippingOptions.some(
      (so: any) => so.name === "Express Shipping (Worldwide)" && so.provider_id === "manual_manual"
    );
    
    // Also check for regular ones
    const hasStandardShipping = existingShippingOptions.some(
      (so: any) => so.name === "Standard Shipping" && so.provider_id === "manual_manual"
    );
    const hasExpressShipping = existingShippingOptions.some(
      (so: any) => so.name === "Express Shipping" && so.provider_id === "manual_manual"
    );

    // Create worldwide shipping options if they don't exist
    if (!hasWorldwideStandard || !hasWorldwideExpress) {
      logger.info("Creating worldwide shipping options...");
      
      // Get service zone - try to find one with many countries, or use the first available
      let serviceZoneId: string | undefined;
      
      if (fulfillmentSet?.service_zones && fulfillmentSet.service_zones.length > 0) {
        serviceZoneId = fulfillmentSet.service_zones[0]?.id;
      }
      
      // If no service zone, try to get from existing fulfillment sets
      if (!serviceZoneId) {
        for (const fs of fulfillmentSets) {
          if (fs.service_zones && fs.service_zones.length > 0) {
            serviceZoneId = fs.service_zones[0]?.id;
            break;
          }
        }
      }
      
      if (!serviceZoneId) {
        logger.warn("No service zone available - shipping options may not work for all locations");
        logger.info("Using existing shipping options if available");
        return;
      }

      const shippingOptionsToCreate = [];
      
      if (!hasWorldwideStandard) {
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

        shippingOptionsToCreate.push({
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
        });
      }

      if (!hasWorldwideExpress) {
        // Create prices for all regions
        const expressPrices = regions.map((region) => ({
          region_id: region.id,
          amount: 20,
        }));
        expressPrices.push(
          { currency_code: "usd", amount: 20 },
          { currency_code: "eur", amount: 20 },
          { currency_code: "gbp", amount: 16 }
        );

        shippingOptionsToCreate.push({
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
        });
      }

      if (shippingOptionsToCreate.length > 0) {
        await createShippingOptionsWorkflow(container).run({
          input: shippingOptionsToCreate,
        });
        logger.info(`✅ Created ${shippingOptionsToCreate.length} shipping option(s)`);
      }
    } else {
      logger.info("✓ Shipping options already exist");
    }

    logger.info("✅ Successfully enabled dummy payment and shipping providers!");
    logger.info("");
    logger.info("📋 Summary:");
    logger.info("  - Payment Provider: pp_system_default (Manual Payment)");
    logger.info("  - Fulfillment Provider: manual_manual (Manual Fulfillment)");
    logger.info("  - Shipping Options: Standard Shipping, Express Shipping");
    logger.info("");
    logger.info("🧪 You can now test the checkout process!");
    logger.info("   Visit: http://localhost:8000 and add items to cart");

  } catch (error: any) {
    logger.error("❌ Error enabling dummy providers:", error.message);
    logger.error(error.stack);
    throw error;
  }
}

