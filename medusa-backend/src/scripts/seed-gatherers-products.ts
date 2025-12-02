import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
} from "@medusajs/medusa/core-flows";

// Base URL for static files - in production, this should come from environment
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:9000";

// Gatherer's Granola Product Data
const gathererProducts = [
  {
    title: "Squirrel Bait®",
    handle: "squirrel-bait",
    subtitle: "Pecans, Coconut, Maple",
    description: `Our signature granola featuring a perfect blend of rolled oats, pecans, shredded coconut, cane sugar, local maple syrup, and sea salt. A customer favorite that started it all.

**Certifications:** Non-GMO Project Verified

**Ingredients:** Rolled oats, pecans, shredded coconut, cane sugar, local maple syrup, expeller pressed canola oil (non-gmo), sea salt.

**Contains:** Tree nuts (pecans, coconut).

Produced in a facility that processes peanuts, tree nuts, sesame, and soy.`,
    sku: "GG-SB-9",
    image: "squirrel-bait.png",
    nutritionImage: "squirrel-bait-nutrition.png",
  },
  {
    title: "Chipmunk's Choice®",
    handle: "chipmunks-choice",
    subtitle: "Maple, Peanut Butter, Almonds",
    description: `A delightful blend of golden rolled oats, maple syrup, and peanut butter clusters, complemented by whole toasted almonds. Irresistibly nutty and satisfying.

**Certifications:** Non-GMO Project Verified

**Ingredients:** Rolled oats, maple syrup, peanut butter (peanuts, salt), almonds, cane sugar, expeller pressed canola oil (non-gmo), sea salt.

**Contains:** Peanuts, tree nuts (almonds).

Produced in a facility that processes peanuts, tree nuts, sesame, and soy.`,
    sku: "GG-CC-9",
    image: "chipmunks-choice.png",
    nutritionImage: "chipmunks-choice-nutrition.png",
  },
  {
    title: "Fox's Fancy®",
    handle: "foxs-fancy",
    subtitle: "Apples, Honey, Cinnamon",
    description: `A fusion of spices, honey, apple, vanilla and maple syrup that makes taste buds shout "Apple Pie!" with patriotic gusto without the need for caloric guilt.

**Certifications:** Non-GMO Project Verified, Kosher Pareve

**Ingredients:** Rolled oats, maple syrup, cane sugar, expeller pressed canola oil (non-gmo), honey, rice crisps (rice, sugar, malt extract, salt, preservative (tocopherols)), apples, cinnamon, allspice, pure vanilla extract, salt.

Produced in a facility that processes peanuts, tree nuts, sesame, and soy.`,
    sku: "GG-FF-9",
    image: "foxs-fancy.png",
    nutritionImage: "foxs-fancy-nutrition.png",
  },
  {
    title: "Bee's Knees®",
    handle: "bees-knees",
    subtitle: "Honey, Walnuts, Pistachios",
    description: `A honey-lover's dream featuring gluten-free rolled oats sweetened with wildflower honey, studded with premium walnuts and pistachios. Pure, simple, delicious.

**Certifications:** Non-GMO Project Verified, Certified Gluten-Free

**Ingredients:** Gluten-free rolled oats, expeller pressed canola oil (non-gmo), wildflower honey, walnuts, pistachios, cane sugar, natural flavors, sea salt.

**Contains:** Tree nuts (walnuts, pistachios).

Produced in a facility that processes peanuts, tree nuts, sesame, and soy.`,
    sku: "GG-BK-9",
    image: "bees-knees.png",
    nutritionImage: "bees-knees-nutrition.png",
  },
  {
    title: "Badger's Best®",
    handle: "badgers-best",
    subtitle: "Dark Chocolate, Quinoa, Coconut",
    description: `A classic combination of dark chocolate and coconut, enhanced by the satisfying crunch of toasted quinoa flakes, this modern treat with an old-world twist is sure to have your mouth singing the praises of the Badger.

**Certifications:** Non-GMO Project Verified, Certified Gluten-Free, Kosher Pareve

**Ingredients:** Gluten-free rolled oats, shredded coconut, honey, dark chocolate (cane sugar, chocolate liquor, cocoa butter, soy lecithin, pure vanilla), brown rice syrup, expeller pressed canola oil (non-gmo), quinoa, sea salt.

**Contains:** Tree nuts (coconut), soy.

Produced in a facility that processes peanuts, tree nuts, sesame, and soy.`,
    sku: "GG-BB-9",
    image: "badgers-best.png",
    nutritionImage: "badgers-best-nutrition.png",
  },
  {
    title: "Turtle Tracks®",
    handle: "turtle-tracks",
    subtitle: "Chocolate, Pecans, Caramel",
    description: `Inspired by the classic turtle candy, this indulgent granola combines rich chocolate, buttery pecans, and sweet caramel notes. A decadent treat for chocolate lovers.

**Certifications:** Non-GMO Project Verified

**Ingredients:** Rolled oats, pecans, chocolate chips (sugar, chocolate liquor, cocoa butter, soy lecithin, vanilla), cane sugar, maple syrup, expeller pressed canola oil (non-gmo), brown sugar, sea salt.

**Contains:** Tree nuts (pecans), soy.

Produced in a facility that processes peanuts, tree nuts, sesame, and soy.`,
    sku: "GG-TT-9",
    image: "turtle-tracks.png",
    nutritionImage: "turtle-tracks-nutrition.png",
  },
];

export default async function seedGatherersProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const productModuleService = container.resolve(Modules.PRODUCT);

  logger.info("Starting Gatherer's Granola product seed...");

  // Get default sales channel
  const salesChannels = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!salesChannels.length) {
    logger.error("No default sales channel found. Please run the main seed first.");
    return;
  }

  const defaultSalesChannel = salesChannels[0];
  logger.info(`Using sales channel: ${defaultSalesChannel.name}`);

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

  // Check if Granola category already exists
  const existingCategories = await productModuleService.listProductCategories({
    name: "Granola",
  });

  let granolaCategory;
  
  if (existingCategories.length) {
    granolaCategory = existingCategories[0];
    logger.info(`Using existing Granola category: ${granolaCategory.id}`);
  } else {
    // Create Granola category
    logger.info("Creating Granola category...");
    const { result: categoryResult } = await createProductCategoriesWorkflow(
      container
    ).run({
      input: {
        product_categories: [
          {
            name: "Granola",
            description: "Handcrafted artisan granola made with family recipes and premium ingredients.",
            is_active: true,
          },
        ],
      },
    });
    granolaCategory = categoryResult[0];
    logger.info(`Created Granola category: ${granolaCategory.id}`);
  }

  // Check for existing products to avoid duplicates
  const existingProducts = await productModuleService.listProducts({
    handle: gathererProducts.map(p => p.handle),
  });

  const existingHandles = new Set(existingProducts.map(p => p.handle));
  const newProducts = gathererProducts.filter(p => !existingHandles.has(p.handle));

  if (newProducts.length === 0) {
    logger.info("All Gatherer's Granola products already exist. Skipping creation.");
    return;
  }

  logger.info(`Creating ${newProducts.length} new products...`);

  // Create products
  const productsToCreate = newProducts.map((product) => ({
    title: product.title,
    handle: product.handle,
    subtitle: product.subtitle,
    description: product.description,
    status: ProductStatus.PUBLISHED,
    weight: 262, // 9.25oz in grams
    shipping_profile_id: shippingProfile.id,
    category_ids: [granolaCategory.id],
    images: [
      {
        url: `${BACKEND_URL}/static/${product.image}`,
      },
      {
        url: `${BACKEND_URL}/static/${product.nutritionImage}`,
      },
    ],
    options: [
      {
        title: "Size",
        values: ["9 oz"],
      },
    ],
    variants: [
      {
        title: "9 oz Bag",
        sku: product.sku,
        manage_inventory: false,
        options: {
          Size: "9 oz",
        },
        prices: [
          {
            amount: 549, // $5.49 in cents
            currency_code: "usd",
          },
        ],
      },
    ],
    sales_channels: [
      {
        id: defaultSalesChannel.id,
      },
    ],
  }));

  await createProductsWorkflow(container).run({
    input: {
      products: productsToCreate,
    },
  });

  logger.info(`Successfully created ${newProducts.length} Gatherer's Granola products!`);
  logger.info("Products created:");
  newProducts.forEach((p) => {
    logger.info(`  - ${p.title} (${p.handle})`);
  });

  logger.info("Gatherer's Granola product seed complete!");
}

