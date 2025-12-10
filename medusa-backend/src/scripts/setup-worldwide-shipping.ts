import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";
import {
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * Script to set up worldwide shipping options for testing
 * This ensures shipping options work for ANY location
 */
export default async function setupWorldwideShipping({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const storeModuleService = container.resolve(Modules.STORE);
  const regionModuleService = container.resolve(Modules.REGION);

  logger.info("🌍 Setting up worldwide shipping options for testing...");

  try {
    // Get all regions
    const regions = await regionModuleService.listRegions({});
    if (regions.length === 0) {
      logger.error("❌ No regions found. Please run seed script first.");
      return;
    }

    // Get stock location - use the store's default location or find existing one
    const [store] = await storeModuleService.listStores();
    let stockLocation: any = null;

    // Try to get from store's default location first (this is the one that's likely already configured)
    if (store?.default_location_id) {
      try {
        const locationQuery = await query.graph({
          entity: "stock_location",
          fields: ["id", "name"],
          filters: { id: store.default_location_id },
        });
        if (locationQuery?.length > 0) {
          stockLocation = { id: store.default_location_id, name: locationQuery[0].name || "Store Default Location" };
          logger.info(`Using store's default location: ${stockLocation.name}`);
        }
      } catch (e) {
        // Query failed, will try other methods
      }
    }

    // If not found, try to list all and use the first one
    if (!stockLocation) {
      try {
        const allLocations = await query.graph({
          entity: "stock_location",
          fields: ["id", "name"],
        });
        if (allLocations?.length > 0) {
          stockLocation = allLocations[0];
          logger.info(`Using existing stock location: ${stockLocation.name || stockLocation.id}`);
        }
      } catch (e) {
        // Query failed, will create
      }
    }

    // If still not found, create one
    if (!stockLocation) {
      logger.info("No stock locations found. Creating one...");
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
      
      // Set it as the store's default location
      if (store) {
        try {
          await storeModuleService.updateStores({
            id: store.id,
            default_location_id: stockLocation.id,
          });
        } catch (e) {
          // Ignore if update fails
        }
      }
    }

    // Comprehensive list of countries for worldwide coverage
    const allCountries = [
      "us", "gb", "ca", "au", "nz", "ie", "de", "fr", "es", "it", "nl", "be",
      "at", "ch", "se", "no", "dk", "fi", "pl", "cz", "pt", "gr", "hu", "ro",
      "bg", "hr", "sk", "si", "ee", "lv", "lt", "mt", "cy", "lu", "is",
      "jp", "kr", "cn", "in", "sg", "my", "th", "ph", "id", "vn", "tw", "hk",
      "mx", "br", "ar", "cl", "co", "pe", "ve", "ec", "uy", "py", "bo", "cr",
      "pa", "gt", "hn", "ni", "sv", "do", "jm", "tt", "bb", "bz", "gy", "sr",
      "za", "eg", "ma", "ng", "ke", "gh", "tz", "ug", "et", "zm", "zw", "mw",
      "mu", "re", "ae", "sa", "il", "jo", "lb", "kw", "qa", "bh", "om", "ye",
      "iq", "ir", "tr", "ru", "ua", "kz", "uz", "by", "md", "ge", "am", "az",
      "nz", "fj", "pg", "nc", "pf", "ws", "to", "vu", "sb", "ki", "nr", "tv",
      "pw", "fm", "mh", "as", "gu", "mp", "vi", "pr", "bs", "ag", "lc", "vc",
      "gd", "dm", "kn", "ai", "vg", "ky", "tc", "ms", "fk", "gs", "sh", "ac",
      "io", "cx", "cc", "nf", "hm", "aq", "tf", "pm", "wf", "yt", "bl", "mf",
      "sx", "cw", "aw", "bq", "sj", "gl", "fo", "ax", "ad", "mc", "sm", "va",
      "li", "gi", "je", "gg", "im", "mt", "cy"
    ];

    // Get or create shipping profile
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

    // Get existing fulfillment sets
    const fulfillmentSets = await fulfillmentModuleService.listFulfillmentSets({});
    
    // Find or create a worldwide fulfillment set
    let worldwideFulfillmentSet: any = fulfillmentSets.find(
      (fs: any) => fs.name?.toLowerCase().includes("worldwide") || fs.name?.toLowerCase().includes("global")
    );

    if (!worldwideFulfillmentSet) {
      logger.info("Creating worldwide fulfillment set with all countries...");
      
      // Create service zone with all countries
      const geoZones = allCountries.map((country) => ({
        country_code: country,
        type: "country" as const,
      }));

      worldwideFulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
        name: "Worldwide Shipping (Test)",
        type: "shipping",
        service_zones: [
          {
            name: "Worldwide Service Zone",
            geo_zones: geoZones,
          },
        ],
      });
      logger.info(`✅ Created worldwide fulfillment set: ${worldwideFulfillmentSet.name}`);
    } else {
      logger.info(`Using existing worldwide fulfillment set: ${worldwideFulfillmentSet.name}`);
      
      // Retrieve the fulfillment set with service zones
      try {
        worldwideFulfillmentSet = await fulfillmentModuleService.retrieveFulfillmentSet(
          worldwideFulfillmentSet.id,
          { relations: ["service_zones", "service_zones.geo_zones"] }
        );
      } catch (e) {
        // If retrieve fails, try to get service zones separately
        logger.warn("Could not retrieve fulfillment set with relations, will check service zones");
      }
      
      // Ensure service zones exist
      if (!worldwideFulfillmentSet.service_zones || worldwideFulfillmentSet.service_zones.length === 0) {
        logger.warn("Worldwide fulfillment set has no service zones. Creating new one...");
        // Create a new fulfillment set if the existing one is broken
        const geoZones = allCountries.map((country) => ({
          country_code: country,
          type: "country" as const,
        }));

        worldwideFulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
          name: "Worldwide Shipping (Test) - New",
          type: "shipping",
          service_zones: [
            {
              name: "Worldwide Service Zone",
              geo_zones: geoZones,
            },
          ],
        });
        logger.info(`✅ Created new worldwide fulfillment set: ${worldwideFulfillmentSet.name}`);
      }
    }

    // Link stock location to fulfillment provider (REQUIRED before creating shipping options)
    if (stockLocation) {
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
        // Link might already exist, that's okay
        if (error.message?.includes("already exists") || error.message?.includes("duplicate") || error.message?.includes("multiple links")) {
          logger.info("✓ Stock location already linked to fulfillment provider");
        } else {
          logger.warn(`Could not link stock location to provider (may already be linked): ${error.message}`);
        }
      }
    }

    // Link stock location to worldwide fulfillment set
    if (worldwideFulfillmentSet && stockLocation) {
      try {
        logger.info("Linking stock location to worldwide fulfillment set...");
        await link.create({
          [Modules.STOCK_LOCATION]: {
            stock_location_id: stockLocation.id,
          },
          [Modules.FULFILLMENT]: {
            fulfillment_set_id: worldwideFulfillmentSet.id,
          },
        });
        logger.info("✅ Linked stock location to worldwide fulfillment set");
      } catch (error: any) {
        // Link might already exist, that's okay
        if (error.message?.includes("already exists") || error.message?.includes("duplicate") || error.message?.includes("multiple links")) {
          logger.info("✓ Stock location already linked to worldwide fulfillment set");
        } else {
          logger.warn(`Could not link stock location (may already be linked): ${error.message}`);
        }
      }
    }

    // Check existing shipping options
    const existingShippingOptions = await fulfillmentModuleService.listShippingOptions({});
    const hasWorldwideStandard = existingShippingOptions.some(
      (so: any) => so.name === "Standard Shipping (Worldwide)" && 
                   so.service_zone?.fulfillment_set_id === worldwideFulfillmentSet?.id
    );
    const hasWorldwideExpress = existingShippingOptions.some(
      (so: any) => so.name === "Express Shipping (Worldwide)" && 
                   so.service_zone?.fulfillment_set_id === worldwideFulfillmentSet?.id
    );

    // Create worldwide shipping options if they don't exist
    if (!hasWorldwideStandard || !hasWorldwideExpress) {
      logger.info("Creating worldwide shipping options...");
      
      // Get service zone ID - handle different response formats
      let serviceZoneId: string | undefined;
      
      if (worldwideFulfillmentSet?.service_zones && worldwideFulfillmentSet.service_zones.length > 0) {
        serviceZoneId = worldwideFulfillmentSet.service_zones[0]?.id;
      }
      
      // If still no service zone, try to get from the fulfillment set directly
      if (!serviceZoneId && worldwideFulfillmentSet?.id) {
        // Try to list service zones for this fulfillment set
        try {
          const serviceZones = await fulfillmentModuleService.listServiceZones({
            fulfillment_set_id: worldwideFulfillmentSet.id,
          });
          if (serviceZones?.length > 0) {
            serviceZoneId = serviceZones[0].id;
          }
        } catch (e) {
          // Service zone listing failed
        }
      }
      
      if (!serviceZoneId) {
        throw new Error("No service zone available in worldwide fulfillment set. Please delete the existing fulfillment set and run the script again.");
      }

      const shippingOptionsToCreate = [];
      
      if (!hasWorldwideStandard) {
        // Create prices for all regions
        const prices = regions.map((region) => ({
          region_id: region.id,
          amount: 10, // €10 or equivalent
        }));

        // Also add currency-based prices
        prices.push(
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
          prices: prices,
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
        const prices = regions.map((region) => ({
          region_id: region.id,
          amount: 20, // €20 or equivalent
        }));

        prices.push(
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
          prices: prices,
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
        logger.info(`✅ Created ${shippingOptionsToCreate.length} worldwide shipping option(s)`);
      }
    } else {
      logger.info("✓ Worldwide shipping options already exist");
    }

    logger.info("✅ Successfully set up worldwide shipping options!");
    logger.info("");
    logger.info("📋 Summary:");
    logger.info(`  - Fulfillment Set: ${worldwideFulfillmentSet?.name}`);
    logger.info(`  - Countries Covered: ${allCountries.length} countries`);
    logger.info("  - Shipping Options: Standard Shipping (Worldwide), Express Shipping (Worldwide)");
    logger.info("");
    logger.info("🧪 Shipping options should now work for ANY location!");

  } catch (error: any) {
    logger.error("❌ Error setting up worldwide shipping:", error.message);
    logger.error(error.stack);
    throw error;
  }
}

