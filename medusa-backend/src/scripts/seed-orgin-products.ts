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
import * as fs from "fs";
import * as path from "path";

/**
 * Orgin Organics Product Seed Script
 * 
 * This script creates product listings for Orgin Organics products.
 * Update the pricing in the products array below with actual prices from the scraped website.
 * 
 * To run: npx medusa db:seed --seed-file=src/scripts/seed-orgin-products.ts
 */

// Product data with descriptions from flavor profiles
// TODO: Update prices with actual values from scraped website
const orginProducts = [
  {
    title: "BBQ Cashew",
    handle: "orgin-bbq-cashew",
    description: "Our signature BBQ blend combines organic spices with a hint of sweetness for that perfect backyard barbecue taste. Smoky, savory perfection in every bite.",
    tagline: "Smoky & Savory",
    imageFile: "Orgin BBQ Cashew.jpg",
    nutritionFile: null, // Auto-matched from Product Photography folder
    category: "cashews",
    ingredients: ["Organic Cashews", "Organic Cane Sugar", "Sea Salt", "Paprika", "Garlic", "Onion"],
    // TODO: Update with actual prices (amounts in cents)
    usdPrice: 2499, // $24.99 - placeholder, update with actual price
    eurPrice: 2299, // €22.99 - placeholder, update with actual price
    weight: 226, // 8oz in grams (approximate)
  },
  {
    title: "Everything Bagel Cashew",
    handle: "orgin-everything-bagel-cashew",
    description: "Inspired by the classic everything bagel, this blend features sesame, poppy seeds, and savory spices. Bold and flavorful in every bite.",
    tagline: "Bold & Flavorful",
    imageFile: "Orgin Everything Bagel Cashew.jpg",
    nutritionFile: null, // Auto-matched from Product Photography folder
    category: "cashews",
    ingredients: ["Organic Cashews", "Sesame Seeds", "Poppy Seeds", "Garlic", "Onion", "Sea Salt"],
    usdPrice: 2499,
    eurPrice: 2299,
    weight: 226,
  },
  {
    title: "Honey Roasted Cashew",
    handle: "orgin-honey-roasted-cashew",
    description: "Pure organic honey coats premium cashews for a naturally sweet, irresistibly crunchy snack. Sweet and crunchy perfection.",
    tagline: "Sweet & Crunchy",
    imageFile: "Orgin Honey Roasted Cashew.jpg",
    nutritionFile: null, // Auto-matched from Product Photography folder
    category: "cashews",
    ingredients: ["Organic Cashews", "Organic Honey", "Sea Salt"],
    usdPrice: 2499,
    eurPrice: 2299,
    weight: 226,
  },
  {
    title: "Maple Masala Cashew",
    handle: "orgin-maple-masala-cashew",
    description: "A unique fusion of Canadian maple and Indian masala spices creates an unforgettable flavor journey. Mildly spicy, tangy, earthy, and fragrant, with a hint of sweetness.",
    tagline: "Sweet Meets Spice",
    imageFile: "Orgin Maple Masala Cashews.jpg",
    nutritionFile: null, // Auto-matched from Product Photography folder
    category: "cashews",
    ingredients: ["Organic Cashews", "Organic Maple Syrup", "Masala Spice Blend", "Sea Salt"],
    usdPrice: 2499,
    eurPrice: 2299,
    weight: 226,
  },
  {
    title: "Za'atar Cashew",
    handle: "orgin-zaatar-cashew",
    description: "Traditional za'atar spice blend brings herbal, tangy notes to premium roasted cashews. Middle Eastern magic in every bite.",
    tagline: "Middle Eastern Magic",
    imageFile: "Orgin Zaatar Cashew.jpg",
    nutritionFile: null, // Auto-matched from Product Photography folder
    category: "cashews",
    ingredients: ["Organic Cashews", "Za'atar", "Sumac", "Sesame", "Thyme", "Olive Oil"],
    usdPrice: 2499,
    eurPrice: 2299,
    weight: 226,
  },
  {
    title: "Provincial Pecan",
    handle: "orgin-provincial-pecan",
    description: "Inspired by French herbs de Provence, these pecans offer a sophisticated savory experience. Traditional provincial herbs on a maple-glazed roasted pecan transport you to a sun-drenched café in Nice, France.",
    tagline: "Herb-Infused Elegance",
    imageFile: "Orgin Provincial Pecan.jpg",
    nutritionFile: null, // Auto-matched from Product Photography folder
    category: "pecans",
    ingredients: ["Organic Pecans", "Rosemary", "Thyme", "Lavender", "Sea Salt"],
    usdPrice: 2699,
    eurPrice: 2499,
    weight: 226,
  },
  {
    title: "Smoked Almonds",
    handle: "orgin-smoked-almonds",
    description: "Slowly smoked to perfection, these almonds deliver authentic smokehouse flavor in every bite. Rich smoky depth that satisfies.",
    tagline: "Rich Smoky Depth",
    imageFile: "Orgin Smoked Almonds.jpg",
    nutritionFile: null, // Auto-matched from Product Photography folder
    category: "almonds",
    ingredients: ["Organic Almonds", "Smoked Sea Salt", "Natural Smoke"],
    usdPrice: 2299,
    eurPrice: 2099,
    weight: 226,
  },
  {
    title: "Mixed Nuts",
    handle: "orgin-mixed-nuts",
    description: "A premium mix of organic cashews, almonds, and pecans for the ultimate snacking experience. Best of all worlds in one delicious blend.",
    tagline: "The Ultimate Blend",
    imageFile: "Orgin Mixed Nuts.jpg",
    nutritionFile: null, // Auto-matched from Product Photography folder
    category: "mixed",
    ingredients: ["Organic Cashews", "Organic Almonds", "Organic Pecans", "Sea Salt"],
    usdPrice: 2499,
    eurPrice: 2299,
    weight: 226,
  },
  {
    title: "Smoked Mixed Nuts",
    handle: "orgin-smoked-mixed-nuts",
    description: "A premium blend of smoked organic cashews, almonds, and pecans. Rich, smoky flavor in every bite.",
    tagline: "Smoky Blend",
    imageFile: "Orgin Smoked Mixed Nuts.jpg",
    nutritionFile: null, // Auto-matched from Product Photography folder
    category: "mixed",
    ingredients: ["Organic Cashews", "Organic Almonds", "Organic Pecans", "Smoked Sea Salt"],
    usdPrice: 2499,
    eurPrice: 2299,
    weight: 226,
  },
  {
    title: "Ranch Cashews",
    handle: "orgin-ranch-cashews",
    description: "Classic ranch flavor meets premium organic cashews. Creamy, tangy, and perfectly seasoned for a satisfying snack.",
    tagline: "Classic Ranch Flavor",
    imageFile: "Orgin Ranch Cashews.jpg",
    nutritionFile: null, // Auto-matched from Product Photography folder
    category: "cashews",
    ingredients: ["Organic Cashews", "Ranch Seasoning", "Garlic", "Onion", "Dill", "Sea Salt"],
    usdPrice: 2499,
    eurPrice: 2299,
    weight: 226,
  },
];

/**
 * Match nutrition label files to products using loose name matching
 * Looks for files containing key product terms (e.g., "bbq", "cashew", "pecan", etc.)
 */
function findNutritionLabel(productTitle: string, productImageFile: string, availableFiles: string[]): string | null {
  // Very loose matching - extract ANY words from product title
  const titleLower = productTitle.toLowerCase();
  const words = titleLower
    .replace(/[^a-z0-9\s]/g, " ") // Replace special chars with spaces
    .split(/\s+/)
    .filter(w => w.length > 2); // Only words longer than 2 chars
  
  // Also extract key flavor/nut terms
  const keyTerms: string[] = [];
  
  // Extract main product type (very loose)
  if (titleLower.includes("cashew")) keyTerms.push("cashew", "cashews");
  if (titleLower.includes("pecan")) keyTerms.push("pecan", "pecans");
  if (titleLower.includes("almond")) keyTerms.push("almond", "almonds");
  if (titleLower.includes("mixed")) keyTerms.push("mixed", "mix");
  if (titleLower.includes("nut")) keyTerms.push("nut", "nuts");
  
  // Extract flavor/type (very loose)
  if (titleLower.includes("bbq") || titleLower.includes("barbecue")) keyTerms.push("bbq", "barbecue", "barbeque");
  if (titleLower.includes("everything")) keyTerms.push("everything", "bagel", "eb");
  if (titleLower.includes("honey")) keyTerms.push("honey", "hny");
  if (titleLower.includes("maple")) keyTerms.push("maple", "map");
  if (titleLower.includes("masala")) keyTerms.push("masala", "mas");
  if (titleLower.includes("zaatar") || titleLower.includes("za'atar") || titleLower.includes("za atar")) {
    keyTerms.push("zaatar", "za'atar", "za", "atar");
  }
  if (titleLower.includes("provincial")) keyTerms.push("provincial", "prov");
  if (titleLower.includes("smoked")) keyTerms.push("smoked", "smoke", "smk");
  if (titleLower.includes("ranch")) keyTerms.push("ranch", "rnch");
  
  // Combine all search terms
  const allSearchTerms = [...words, ...keyTerms].filter(t => t.length > 1);
  
  // Very loose matching - look for files that contain ANY of the search terms
  const nutritionFiles = availableFiles.filter(file => {
    const fileLower = file.toLowerCase();
    
    // Exclude the main product image
    if (fileLower === productImageFile.toLowerCase()) return false;
    
    // If file has "nutrition" or "label" in name, it's likely a nutrition label
    if (fileLower.includes("nutrition") || fileLower.includes("label") || 
        fileLower.includes("nutritional") || fileLower.includes("info") ||
        fileLower.includes("panel")) {
      // If it has nutrition-related terms, match if it contains ANY search term
      return allSearchTerms.length === 0 || allSearchTerms.some(term => fileLower.includes(term));
    }
    
    // For PNG files, match if they contain ANY search term (very loose)
    if (file.endsWith(".png") || file.endsWith(".PNG")) {
      return allSearchTerms.length === 0 || allSearchTerms.some(term => fileLower.includes(term));
    }
    
    // For other files, be more strict - need at least one search term match
    return allSearchTerms.some(term => fileLower.includes(term));
  });
  
  if (nutritionFiles.length > 0) {
    // Score matches - prefer files with more matching terms
    const scored = nutritionFiles.map(file => {
      const fileLower = file.toLowerCase();
      const score = allSearchTerms.filter(term => fileLower.includes(term)).length;
      // Bonus for nutrition-related terms
      const bonus = (fileLower.includes("nutrition") || fileLower.includes("label")) ? 10 : 0;
      return { file, score: score + bonus };
    });
    
    // Return highest scoring match
    scored.sort((a, b) => b.score - a.score);
    return scored[0].file;
  }
  
  return null;
}

export default async function seedOrginProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const regionModuleService = container.resolve(Modules.REGION);

  logger.info("Starting Orgin Organics product seed...");

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

  // Get or create Orgin Organics category
  logger.info("Getting or creating Orgin Organics product category...");
  const productModuleService = container.resolve(Modules.PRODUCT);
  
  let orginCategory = await productModuleService.listProductCategories({
    handle: "orgin-organics",
  });

  if (!orginCategory || orginCategory.length === 0) {
    logger.info("Creating Orgin Organics product category...");
    const { result: categoryResult } = await createProductCategoriesWorkflow(
      container
    ).run({
      input: {
        product_categories: [
          {
            name: "Orgin Organics",
            handle: "orgin-organics",
            description: "USDA-certified organic nuts, sustainably sourced and carefully roasted.",
          },
        ],
      },
    });
    orginCategory = categoryResult[0];
  } else {
    orginCategory = orginCategory[0];
    logger.info(`Using existing category: ${orginCategory.name}`);
  }

  // Get list of all files in the Product Photography folder and Nutrition Labels folder
  // Try multiple possible paths
  const possiblePhotographyPaths = [
    path.join(process.cwd(), "..", "Brand Assets", "Orgin", "Product Photography"),
    path.join(process.cwd(), "Brand Assets", "Orgin", "Product Photography"),
    path.resolve(__dirname, "..", "..", "..", "..", "Brand Assets", "Orgin", "Product Photography"),
  ];
  
  const possibleNutritionPaths = [
    path.join(process.cwd(), "..", "Brand Assets", "Orgin", "Orgin Product Nutrition Labels"),
    path.join(process.cwd(), "Brand Assets", "Orgin", "Orgin Product Nutrition Labels"),
    path.resolve(__dirname, "..", "..", "..", "..", "Brand Assets", "Orgin", "Orgin Product Nutrition Labels"),
    // Also try variations of the folder name
    path.join(process.cwd(), "..", "Brand Assets", "Orgin", "Product Nutrition Labels"),
    path.join(process.cwd(), "Brand Assets", "Orgin", "Product Nutrition Labels"),
  ];
  
  let availableFiles: string[] = [];
  let photographyPath: string | null = null;
  
  // First, check Product Photography folder (for any nutrition labels that might be there)
  for (const tryPath of possiblePhotographyPaths) {
    try {
      if (fs.existsSync(tryPath)) {
        photographyPath = tryPath;
        const files = fs.readdirSync(tryPath);
        // Include ALL files except the main product JPG images
        // Very loose matching - include any PNG or files that might be nutrition labels
        const photoFiles = files.filter(file => {
          const fileLower = file.toLowerCase();
          
          // Exclude only the main product JPG images (exact matches)
          const isMainProductImage = orginProducts.some(p => 
            p.imageFile.toLowerCase() === fileLower
          );
          
          if (isMainProductImage) return false;
          
          // Include everything else - PNG files, JPG files that aren't main products, etc.
          // Very loose - include any image file or file with nutrition-related terms
          return file.endsWith(".png") || 
                 file.endsWith(".PNG") || 
                 file.endsWith(".jpg") || 
                 file.endsWith(".JPG") ||
                 file.endsWith(".jpeg") ||
                 file.endsWith(".JPEG") ||
                 fileLower.includes("nutrition") || 
                 fileLower.includes("label") ||
                 fileLower.includes("nutritional") ||
                 fileLower.includes("info") ||
                 fileLower.includes("panel");
        });
        availableFiles = [...availableFiles, ...photoFiles];
        if (photoFiles.length > 0) {
          logger.info(`Found ${photoFiles.length} potential nutrition label files in ${tryPath}`);
        }
        break;
      }
    } catch (error) {
      // Try next path
    }
  }
  
  // Now check the Nutrition Labels folder (this is where they actually are!)
  for (const tryPath of possibleNutritionPaths) {
    try {
      if (fs.existsSync(tryPath)) {
        const files = fs.readdirSync(tryPath);
        // Include ALL files from nutrition labels folder - they're all nutrition labels
        const nutritionFiles = files.filter(file => {
          // Include all image files
          return file.endsWith(".png") || 
                 file.endsWith(".PNG") || 
                 file.endsWith(".jpg") || 
                 file.endsWith(".JPG") ||
                 file.endsWith(".jpeg") ||
                 file.endsWith(".JPEG");
        });
        availableFiles = [...availableFiles, ...nutritionFiles];
        logger.info(`Found ${nutritionFiles.length} nutrition label files in ${tryPath}`);
        break;
      }
    } catch (error) {
      // Try next path
    }
  }

  // Also check static folder for nutrition labels that may have been copied
  const staticPath = path.join(process.cwd(), "static");
  let staticFiles: string[] = [];
  try {
    if (fs.existsSync(staticPath)) {
      staticFiles = fs.readdirSync(staticPath).filter(file => {
        const fileLower = file.toLowerCase();

        // Exclude only the main product JPG images (exact matches)
        const isMainProductImage = orginProducts.some(p => 
          p.imageFile.toLowerCase() === fileLower
        );

        if (isMainProductImage) return false;

        // Very loose matching - include any PNG or files that might be Orgin nutrition labels
        return (file.endsWith(".png") || file.endsWith(".PNG") || 
                file.endsWith(".jpg") || file.endsWith(".JPG") ||
                file.endsWith(".jpeg") || file.endsWith(".JPEG")) && 
               (fileLower.includes("orgin") || 
                fileLower.includes("nutrition") || 
                fileLower.includes("label") || 
                fileLower.includes("nutritional") ||
                fileLower.includes("info") ||
                fileLower.includes("panel") ||
                // Include any PNG that might be a nutrition label
                (file.endsWith(".png") && !fileLower.includes("badger") && 
                 !fileLower.includes("bee") && !fileLower.includes("chipmunk") &&
                 !fileLower.includes("fox") && !fileLower.includes("squirrel") &&
                 !fileLower.includes("turtle") && !fileLower.startsWith("176")));
      });
      availableFiles = [...availableFiles, ...staticFiles];
      logger.info(`Found ${staticFiles.length} nutrition label files in static folder`);
    }
  } catch (error) {
    logger.warn(`Could not read static folder: ${error}`);
  }

  // Copy nutrition label files to static folder if found
  // Check both Product Photography and Nutrition Labels folders
  
  if (availableFiles.length > 0) {
    try {
      if (!fs.existsSync(staticPath)) {
        fs.mkdirSync(staticPath, { recursive: true });
      }
      
      // Try to find source paths for each file
      const allSourcePaths = [...possiblePhotographyPaths, ...possibleNutritionPaths];
      
      for (const file of availableFiles) {
        let copied = false;
        for (const sourcePath of allSourcePaths) {
          try {
            if (fs.existsSync(sourcePath)) {
              const fullSourcePath = path.join(sourcePath, file);
              const destPath = path.join(staticPath, file);
              if (fs.existsSync(fullSourcePath) && !fs.existsSync(destPath)) {
                fs.copyFileSync(fullSourcePath, destPath);
                logger.info(`Copied nutrition label: ${file} to static folder`);
                copied = true;
                break;
              }
            }
          } catch (error) {
            // Try next path
          }
        }
        if (!copied) {
          logger.warn(`Could not find source for nutrition label: ${file}`);
        }
      }
    } catch (error) {
      logger.warn(`Could not copy nutrition labels to static folder: ${error}`);
    }
  }

  // Prepare products for creation
  const productsToCreate = orginProducts.map((product) => {
    // Try to find nutrition label using loose matching
    let nutritionFile = product.nutritionFile;
    
    // If no nutrition file specified or if specified file doesn't exist, try to match
    if (!nutritionFile) {
      const matchedFile = findNutritionLabel(product.title, product.imageFile, availableFiles);
      if (matchedFile) {
        nutritionFile = matchedFile;
        logger.info(`✅ Matched nutrition label "${matchedFile}" to product "${product.title}"`);
      } else {
        logger.warn(`⚠️  No nutrition label found for "${product.title}"`);
      }
    } else {
      // Check if specified file exists
      const fileExists = availableFiles.some(f => 
        f.toLowerCase() === nutritionFile!.toLowerCase() ||
        f.toLowerCase().includes(nutritionFile!.toLowerCase().replace(/\.(png|jpg)$/i, ""))
      );
      if (!fileExists) {
        // Try to match if specified file doesn't exist
        const matchedFile = findNutritionLabel(product.title, product.imageFile, availableFiles);
        if (matchedFile) {
          nutritionFile = matchedFile;
          logger.info(`✅ Matched nutrition label "${matchedFile}" to product "${product.title}" (specified file not found)`);
        }
      }
    }
    
    // Construct image URLs - images should be in static folder
    // Medusa will serve them from /static/ path
    const baseUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
    const productImageUrl = `${baseUrl}/static/${product.imageFile}`;
    const nutritionImageUrl = nutritionFile
      ? `${baseUrl}/static/${nutritionFile}`
      : null;

    const images = [
      { url: productImageUrl },
      ...(nutritionImageUrl ? [{ url: nutritionImageUrl }] : []),
    ];

    // Create handle from title if not provided
    const handle = product.handle || product.title.toLowerCase().replace(/\s+/g, "-");

    return {
      title: product.title,
      handle: handle,
      description: product.description,
      category_ids: [orginCategory.id || (orginCategory as any).id],
      weight: product.weight,
      status: ProductStatus.PUBLISHED,
      shipping_profile_id: shippingProfile.id,
      images: images,
      metadata: {
        brand: "orgin",
        tagline: product.tagline,
        category: product.category,
        ingredients: product.ingredients.join(", "),
        organic_certified: true,
        usda_organic: true,
        non_gmo: true,
        gluten_free: true,
        vegan: product.title.toLowerCase().includes("honey") ? false : true,
      },
      options: [
        {
          title: "Size",
          values: ["Default"],
        },
      ],
      variants: [
        {
          title: "Default",
          sku: `ORGIN-${product.handle.toUpperCase().replace(/-/g, "")}`,
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

  logger.info(`Creating ${productsToCreate.length} Orgin Organics products...`);

  await createProductsWorkflow(container).run({
    input: {
      products: productsToCreate,
    },
  });

  logger.info("✅ Successfully seeded Orgin Organics products!");
  logger.info("⚠️  Remember to:");
  logger.info("   1. Update prices with actual values from the scraped website");
  logger.info("   2. Ensure nutrition label images are in Brand Assets/Orgin/Product Photography/ or medusa-backend/static/");
  logger.info("   3. Nutrition labels are automatically matched using loose name matching");
}

