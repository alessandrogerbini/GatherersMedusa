import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createProductsWorkflow,
  createProductCategoriesWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * NYBS Product Seed Script
 * 
 * This script creates product listings for NYBS (New York's Best Snacks) products.
 * Products are priced at $5.00 per item and belong to the NYBS/Snacks/Nuts category.
 * 
 * To run: npx medusa exec ./src/scripts/seed-nybs-products.ts
 */

// Product data with descriptions from Odoo website
const nybsProducts = [
  {
    title: "NYBS™ Everything Bagel Cashews, 3.5oz",
    handle: "nybs-everything-bagel-cashews-3-5oz",
    description: "All the crunch, all the flavor, no schmear required. Our Everything Bagel Cashews are roasted and tossed in the classic seasoning mix: garlic, onion, sesame, poppy seeds, and a hit of sea salt. Savory, nutty, and straight-up deli-worthy, they're NYC's favorite bagel… minus the bagel.",
    tagline: "NYC's Iconic Flavor on Premium Cashews!",
    imageFile: "NYBS Everything Bagel Cashews.png",
    category: "nuts",
    ingredients: ["Cashews", "Garlic", "Onion", "Sesame Seeds", "Poppy Seeds", "Sea Salt"],
    usdPrice: 500, // $5.00
    eurPrice: 450, // €4.50 (approximate conversion)
    weight: 99, // 3.5oz in grams (approximately)
  },
  {
    title: "NYBS™ Honey Roasted Cashews, 3.5oz",
    handle: "nybs-honey-roasted-cashews-3-5oz",
    description: "A sweet, salty, crunchy classic — these Honey Roasted Cashews check all the boxes. Roasted in small batches to bring out their rich flavor, glazed with honey, and balanced out with a hit of sea salt, they're the kind of snack you'll keep reaching for again and again.",
    tagline: "Sweet Meets Savory, New York Approved!",
    imageFile: "NYBS Honey Roasted Cashews.png",
    category: "nuts",
    ingredients: ["Cashews", "Honey", "Sea Salt"],
    usdPrice: 500, // $5.00
    eurPrice: 450, // €4.50
    weight: 99, // 3.5oz
  },
  {
    title: "NYBS™ Ranch Cashews, 3.5oz",
    handle: "nybs-ranch-cashews-3-5oz",
    description: "Zesty, crunchy, and seriously addictive — our Ranch Cashews are coated in a bold mix of herbs, garlic, and onion for that classic ranch flavor with a seriously satisfying crunch. Salty, tangy, and full of flavor, they're the kind of snack that disappears fast.",
    tagline: "Bold Ranch Flavor, NYC Attitude!",
    imageFile: "NYBS Ranch Cashews.png",
    category: "nuts",
    ingredients: ["Cashews", "Ranch Seasoning", "Herbs", "Garlic", "Onion", "Sea Salt"],
    usdPrice: 500, // $5.00
    eurPrice: 450, // €4.50
    weight: 99, // 3.5oz
  },
  {
    title: "NYBS™ Smoked Mixed Nuts, 3.5oz",
    handle: "nybs-smoked-mixed-nuts-3-5oz",
    description: "Wood-charred flavor with a bold crunch. This smoky mix of almonds, cashews, and pecans is slow-roasted for a deep, toasty bite that'll leave you craving more. Savory, rich, and a little rugged, it's the kind of snack that feels just as at home on a charcuterie board as it does by the backyard fire pit.",
    tagline: "Deep Smoky Flavor, Classic NYC Style!",
    imageFile: "NYBS Smoked Mixed Nuts.png",
    category: "nuts",
    ingredients: ["Almonds", "Cashews", "Pecans", "Natural Smoke", "Sea Salt"],
    usdPrice: 500, // $5.00
    eurPrice: 450, // €4.50
    weight: 99, // 3.5oz
  },
];

export default async function seedNYBSProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const regionModuleService = container.resolve(Modules.REGION);

  logger.info("Starting NYBS product seed...");

  // Get product module service early
  const productModuleService = container.resolve(Modules.PRODUCT);

  // Get default sales channel
  const defaultSalesChannels = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannels.length) {
    logger.error("No default sales channel found. Please run the main seed first.");
    return;
  }

  const defaultSalesChannel = defaultSalesChannels[0];
  logger.info(`Using sales channel: ${defaultSalesChannel.name}`);

  // Get regions
  const regions = await regionModuleService.listRegions({});
  const usRegion = regions.find((r) => r.currency_code === "usd");
  const eurRegion = regions.find((r) => r.currency_code === "eur");

  if (!usRegion || !eurRegion) {
    logger.error("Required regions (USD and EUR) not found. Please ensure regions are set up.");
    return;
  }

  // Get default shipping profile
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  });

  if (!shippingProfiles.length) {
    logger.error("No default shipping profile found. Please run the main seed first.");
    return;
  }

  const shippingProfile = shippingProfiles[0];
  logger.info(`Using shipping profile: ${shippingProfile.name}`);

  // Check if products already exist
  const allProducts = await productModuleService.listProducts({});
  const existingNYBSProducts = allProducts.filter((p: any) =>
    p.handle?.startsWith("nybs-")
  );

  // Create or get NYBS category (Snacks/Nuts)
  logger.info("Creating or retrieving NYBS product category...");
  let nybsCategory;
  
  // First try to get existing category
  let categoryResult = await productModuleService.listProductCategories({
    handle: "nybs",
  });

  if (categoryResult && categoryResult.length > 0) {
    nybsCategory = categoryResult[0];
    logger.info(`Using existing NYBS category: ${nybsCategory.name}`);
  } else {
    // Category doesn't exist, create it
    try {
      logger.info("Creating NYBS product category...");
      const { result: createdCategories } = await createProductCategoriesWorkflow(
        container
      ).run({
        input: {
          product_categories: [
            {
              name: "NYBS",
              handle: "nybs",
              description: "New York's Best Snacks - Bold flavors, authentic attitude, and 100% NYC pride.",
            },
          ],
        },
      });

      nybsCategory = createdCategories[0];
      logger.info(`Created NYBS category: ${nybsCategory.name}`);
    } catch (error: any) {
      // If category creation fails because it exists, try to get it again
      if (error.message && error.message.includes("already exists")) {
        categoryResult = await productModuleService.listProductCategories({
          handle: "nybs",
        });
        if (categoryResult && categoryResult.length > 0) {
          nybsCategory = categoryResult[0];
          logger.info(`Retrieved NYBS category: ${nybsCategory.name}`);
        } else {
          throw new Error("NYBS category exists but could not be retrieved");
        }
      } else {
        throw error;
      }
    }
  }

  // If products already exist but category isn't assigned, assign it now
  if (existingNYBSProducts.length >= 4 && nybsCategory) {
    logger.info("Found existing NYBS products. Verifying category assignment...");
    
    // Check if any products are missing category assignment
    const link = container.resolve(ContainerRegistrationKeys.LINK);
    let needsCategoryAssignment = false;
    
    for (const product of existingNYBSProducts) {
      try {
        const productCategories = await link.list(
          { 
            [Modules.PRODUCT]: { product_id: product.id },
            [Modules.PRODUCT_CATEGORY]: {}
          },
          {
            fields: ["id", "handle"],
          }
        );
        
        const hasNYBS = productCategories.some((cat: any) => 
          cat.id === nybsCategory.id || cat.handle === "nybs"
        );
        
        if (!hasNYBS) {
          needsCategoryAssignment = true;
          logger.info(`   ⚠️  Product "${product.title}" needs category assignment`);
        }
      } catch (error) {
        // If we can't check, assume we need to assign
        needsCategoryAssignment = true;
      }
    }
    
    if (needsCategoryAssignment) {
      logger.info("Assigning existing products to NYBS category...");
      logger.warn("⚠️  Products already exist. Please use Admin Panel to assign categories:");
      logger.warn("   1. Go to http://localhost:9000/app");
      logger.warn("   2. Navigate to Products");
      logger.warn("   3. For each NYBS product, add 'NYBS' category");
      logger.warn("");
      logger.warn("   OR delete existing products and re-run this script.");
      return;
    } else {
      logger.info("✅ All existing NYBS products are properly categorized!");
      return;
    }
  }

  // Prepare products for creation
  const productsToCreate = nybsProducts.map((product) => {
    // Construct image URLs - images should be in static folder
    // Medusa will serve them from /static/ path
    const baseUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
    const productImageUrl = `${baseUrl}/static/${product.imageFile}`;

    const images = [
      { url: productImageUrl },
    ];

    // Create handle from title if not provided
    const handle = product.handle || product.title.toLowerCase().replace(/\s+/g, "-");

    return {
      title: product.title,
      handle: handle,
      description: product.description,
      category_ids: [nybsCategory.id],
      weight: product.weight,
      status: ProductStatus.PUBLISHED,
      shipping_profile_id: shippingProfile.id,
      images: images,
      options: [
        {
          title: "Size",
          values: ["Default"],
        },
      ],
      metadata: {
        brand: "nybs",
        tagline: product.tagline,
        category: product.category,
        ingredients: product.ingredients.join(", "),
        size: "3.5oz",
      },
      variants: [
        {
          title: "Default",
          sku: `NYBS-${product.handle.toUpperCase().replace(/-/g, "")}`,
          options: {
            Size: "Default",
          },
          prices: [
            {
              amount: product.usdPrice,
              currency_code: "usd",
            },
            {
              amount: product.eurPrice,
              currency_code: "eur",
            },
          ],
          manage_inventory: false, // Set to true if you want to track inventory
        },
      ],
      sales_channels: [
        {
          id: defaultSalesChannel.id,
        },
      ],
    };
  });

  logger.info(`Creating ${productsToCreate.length} NYBS products...`);

  await createProductsWorkflow(container).run({
    input: {
      products: productsToCreate,
    },
  });

  logger.info("✅ Successfully seeded NYBS products!");
  logger.info(`   Created ${productsToCreate.length} products in the NYBS category`);
  logger.info("   All products priced at $5.00 USD");
}

