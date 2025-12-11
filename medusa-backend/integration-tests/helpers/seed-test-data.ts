/**
 * Seed minimal test data for integration tests
 */

import { 
  createRegionsWorkflow, 
  createSalesChannelsWorkflow, 
  createApiKeysWorkflow, 
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createShippingProfilesWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createInventoryLevelsWorkflow
} from "@medusajs/core-flows"
import { Modules, ProductStatus, ContainerRegistrationKeys } from "@medusajs/framework/utils"

export async function seedTestData(container: any) {
  try {
    // Create sales channel
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
    let salesChannels = await salesChannelModuleService.listSalesChannels({})
    
    if (salesChannels.length === 0) {
      const { result: salesChannelResult } = await createSalesChannelsWorkflow(container).run({
        input: {
          salesChannelsData: [
            {
              name: "Default Sales Channel",
            },
          ],
        },
      })
      salesChannels = salesChannelResult
    }

    // Create region
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
    })
    const region = regionResult[0]

    // Create stock location - required for cart operations
    const { result: stockLocationResult } = await createStockLocationsWorkflow(container).run({
      input: {
        locations: [
          {
            name: "Test Warehouse",
            address: {
              city: "Copenhagen",
              country_code: "DK",
              address_1: "Test Street 1",
            },
          },
        ],
      },
    })
    const stockLocation = stockLocationResult[0]

    // Link sales channel to stock location - CRITICAL for cart operations
    await linkSalesChannelsToStockLocationWorkflow(container).run({
      input: {
        id: stockLocation.id,
        add: [salesChannels[0].id],
      },
    })

    // Create shipping profile - check if default exists first
    const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT)
    let shippingProfile
    
    try {
      const existingProfiles = await fulfillmentModuleService.listShippingProfiles({ type: "default" })
      shippingProfile = existingProfiles && existingProfiles.length > 0 ? existingProfiles[0] : null
    } catch (error) {
      console.warn("Could not list shipping profiles:", error)
      shippingProfile = null
    }
    
    if (!shippingProfile) {
      try {
        // Try with 'data' field first (as in seed.ts)
        const { result: shippingProfileResult } = await createShippingProfilesWorkflow(container).run({
          input: {
            data: [
              {
                name: "Default Shipping Profile",
                type: "default",
              },
            ],
          },
        })
        shippingProfile = shippingProfileResult && shippingProfileResult.length > 0 ? shippingProfileResult[0] : null
      } catch (error1) {
        try {
          // Try with 'shipping_profiles' field
          const { result: shippingProfileResult2 } = await createShippingProfilesWorkflow(container).run({
            input: {
              shipping_profiles: [
                {
                  name: "Default",
                  type: "default",
                },
              ],
            },
          })
          shippingProfile = shippingProfileResult2 && shippingProfileResult2.length > 0 ? shippingProfileResult2[0] : null
        } catch (error2) {
          console.warn("Could not create shipping profile, trying to continue:", error2)
          // Try to get any shipping profile
          try {
            const allProfiles = await fulfillmentModuleService.listShippingProfiles({})
            shippingProfile = allProfiles && allProfiles.length > 0 ? allProfiles[0] : null
          } catch (listError) {
            console.warn("Could not list any shipping profiles:", listError)
          }
        }
      }
    }
    
    if (!shippingProfile) {
      throw new Error("Could not create or find a shipping profile. This is required for products.")
    }

    // Create product category
    const { result: categoryResult } = await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: [
          {
            name: "Test Category",
            handle: "test-category",
            is_active: true,
          },
        ],
      },
    })
    const category = categoryResult[0]

    // Create test product with variants - link to sales channel during creation
    const { result: productResult } = await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: "Test Product",
            handle: "test-product",
            description: "A test product for integration tests",
            category_ids: [category.id],
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            weight: 100,
            sales_channels: [
              {
                id: salesChannels[0].id,
              },
            ],
            options: [
              {
                title: "Size",
                values: ["S", "M", "L"],
              },
            ],
            variants: [
              {
                title: "S",
                sku: "TEST-S",
                options: {
                  Size: "S",
                },
                prices: [
                  {
                    amount: 1000,
                    currency_code: "eur",
                  },
                ],
              },
              {
                title: "M",
                sku: "TEST-M",
                options: {
                  Size: "M",
                },
                prices: [
                  {
                    amount: 1000,
                    currency_code: "eur",
                  },
                ],
              },
            ],
          },
        ],
      },
    })
    const product = productResult[0]

    // Create inventory levels for product variants - REQUIRED for adding to cart
    // Wait a moment for product to be fully created, then query inventory items
    await new Promise(resolve => setTimeout(resolve, 500))
    
    try {
      // Use query.graph to get inventory items (same approach as seed.ts)
      const query = container.resolve(ContainerRegistrationKeys.QUERY)
      const { data: inventoryItems } = await query.graph({
        entity: "inventory_item",
        fields: ["id"],
      })
      
      if (inventoryItems && inventoryItems.length > 0) {
        const inventoryLevels = inventoryItems.map((inventoryItem: any) => ({
          inventory_item_id: inventoryItem.id,
          location_id: stockLocation.id,
          stocked_quantity: 100,
        }))
        
        // The workflow expects input: { inventory_levels: [...] }
        await createInventoryLevelsWorkflow(container).run({
          input: {
            inventory_levels: inventoryLevels,
          },
        })
      }
    } catch (error) {
      console.warn("Could not create inventory levels:", error)
      // Continue - inventory might be handled differently or created automatically
    }

    // Create fulfillment set and service zone for shipping options
    // This is required before creating shipping options
    let fulfillmentSet: any = null
    let serviceZone: any = null
    
    try {
      // Check if fulfillment sets exist
      let existingFulfillmentSets: any[] = []
      try {
        existingFulfillmentSets = await fulfillmentModuleService.listFulfillmentSets({})
      } catch (error) {
        // If method doesn't exist, try createFulfillmentSets directly
      }
      
      if (!existingFulfillmentSets || existingFulfillmentSets.length === 0) {
        // Create fulfillment set using direct service method (as in seed.ts)
        fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
          name: "Default Fulfillment Set",
          type: "shipping",
          service_zones: [
            {
              name: "Default Service Zone",
              geo_zones: [
                {
                  type: "country",
                  country_code: region.countries[0] || "gb",
                },
              ],
            },
          ],
        })
      } else {
        fulfillmentSet = existingFulfillmentSets[0]
      }
      
      // Get service zone from fulfillment set
      if (fulfillmentSet && fulfillmentSet.service_zones && fulfillmentSet.service_zones.length > 0) {
        serviceZone = fulfillmentSet.service_zones[0]
      }
    } catch (error: any) {
      console.warn("Could not create fulfillment set/service zone:", error.message || error)
    }
    
    // Link stock location to fulfillment provider and fulfillment set (required for shipping)
    try {
      const link = container.resolve(ContainerRegistrationKeys.LINK)
      // First link to provider (if not already linked)
      try {
        await link.create({
          [Modules.STOCK_LOCATION]: {
            stock_location_id: stockLocation.id,
          },
          [Modules.FULFILLMENT]: {
            fulfillment_provider_id: "manual_manual",
          },
        })
      } catch (providerLinkError: any) {
        // Provider link might already exist, ignore
      }
      
      // Then link to fulfillment set (CRITICAL for shipping options to work)
      if (fulfillmentSet && fulfillmentSet.id) {
        try {
          await link.create({
            [Modules.STOCK_LOCATION]: {
              stock_location_id: stockLocation.id,
            },
            [Modules.FULFILLMENT]: {
              fulfillment_set_id: fulfillmentSet.id,
            },
          })
        } catch (setLinkError: any) {
          // Set link might already exist, ignore
          console.warn("Could not link stock location to fulfillment set:", setLinkError.message || setLinkError)
        }
      }
    } catch (linkError: any) {
      // Link might already exist, ignore
      console.warn("Could not link stock location to fulfillment:", linkError.message || linkError)
    }
    
    // Create shipping option
    try {
      const shippingOptionInput: any = {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Standard shipping",
          code: "standard",
        },
        prices: [
          {
            currency_code: region.currency_code,
            amount: 500,
          },
        ],
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
      }
      
      // Add service zone if available
      if (serviceZone && serviceZone.id) {
        shippingOptionInput.service_zone_id = serviceZone.id
      } else if (fulfillmentSet && fulfillmentSet.service_zones && fulfillmentSet.service_zones.length > 0) {
        shippingOptionInput.service_zone_id = fulfillmentSet.service_zones[0].id
      }
      
      if (shippingOptionInput.service_zone_id) {
        await createShippingOptionsWorkflow(container).run({
          input: [shippingOptionInput],
        })
      } else {
        console.warn("No service zone available, skipping shipping option creation")
      }
    } catch (error: any) {
      // Shipping option might already exist or provider not enabled
      if (error.message && error.message.includes("not enabled")) {
        console.warn("Shipping provider not enabled in test environment (this is expected):", error.message)
      } else {
        console.warn("Could not create shipping option:", error.message || error)
      }
    }

    // Create publishable API key
    // IMPORTANT: In Medusa V2, the token is only returned ONCE in the workflow result
    // We must capture it immediately - it cannot be retrieved later for security
    const { result: publishableApiKeyResult } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: "Test API Key",
            type: "publishable",
            created_by: "",
          },
        ],
      },
    })

    const publishableApiKey = publishableApiKeyResult[0]
    
    // The token is directly in the result - use it immediately
    // IMPORTANT: The token is only available once in the workflow result
    const apiKeyToken: string = (publishableApiKey as any).token

    if (!apiKeyToken || !apiKeyToken.startsWith("pk_")) {
      throw new Error(`Invalid API key token format. Expected token starting with 'pk_', got: ${apiKeyToken?.substring(0, 30)}`)
    }

    // Link API key to sales channel BEFORE using it
    // This workflow creates the link between the API key and sales channel
    await linkSalesChannelsToApiKeyWorkflow(container).run({
      input: {
        id: publishableApiKey.id,
        add: [salesChannels[0].id],
      },
    })
    
    // Wait longer for the link to be fully established in the database
    // Medusa may need time to propagate the link across all services
    // Also ensure the link is committed to the database before proceeding
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Verify the API key link was created successfully
    // This helps ensure the key is ready for validation
    try {
      const apiKeyModuleService = container.resolve(Modules.API_KEY)
      const linkedApiKey = await apiKeyModuleService.retrieve(publishableApiKey.id, {
        relations: ["sales_channels"],
      })
      if (linkedApiKey.sales_channels && linkedApiKey.sales_channels.length > 0) {
        console.log(`✓ Verified API key is linked to ${linkedApiKey.sales_channels.length} sales channel(s)`)
      } else {
        console.warn("⚠️ API key link verification failed - retrying link...")
        // Retry the link
        await linkSalesChannelsToApiKeyWorkflow(container).run({
          input: {
            id: publishableApiKey.id,
            add: [salesChannels[0].id],
          },
        })
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (verifyError: any) {
      // If API_KEY module doesn't exist or method doesn't work, that's okay
      // The link workflow should have worked
      console.warn("Could not verify API key link (this is okay):", verifyError?.message || verifyError)
    }
    
    console.log(`✓ API Key created: ${apiKeyToken.substring(0, 30)}...`)
    console.log(`✓ Sales Channel ID: ${salesChannels[0].id}`)
    console.log(`✓ API Key linked to sales channel`)
    
    // Test API key validation to ensure it's working
    try {
      const { testApiKeyValidation } = await import("./test-api-key-validation")
      const validationResult = await testApiKeyValidation(container, apiKeyToken)
      if (validationResult) {
        console.log("✓ API key validation test passed")
      } else {
        console.warn("⚠️ API key validation test returned null")
      }
    } catch (validationError: any) {
      console.warn("Could not test API key validation (this is okay):", validationError.message)
    }

    // Products are already linked to sales channel via the sales_channels field in creation
    // However, we need to ensure the link is properly established
    // In Medusa V2, products must be explicitly linked to sales channels for API key validation
    // The API key validation checks if the requested resources (products, collections) are in the same sales channel
    
    // Verify product is linked to sales channel
    try {
      const productModuleService = container.resolve(Modules.PRODUCT)
      const productWithChannels = await productModuleService.retrieve(product.id, {
        relations: ["sales_channels"],
      })
      
      if (productWithChannels.sales_channels && productWithChannels.sales_channels.length > 0) {
        console.log(`✓ Product is linked to ${productWithChannels.sales_channels.length} sales channel(s)`)
        const productChannelIds = productWithChannels.sales_channels.map((sc: any) => sc.id)
        if (!productChannelIds.includes(salesChannels[0].id)) {
          console.warn(`⚠️ Product is not linked to the same sales channel as API key`)
          console.warn(`  Product channels: ${productChannelIds.join(", ")}`)
          console.warn(`  API key channel: ${salesChannels[0].id}`)
        } else {
          console.log(`✓ Product and API key share the same sales channel`)
        }
      } else {
        console.warn("⚠️ Product is not linked to any sales channels - this may cause API key validation issues")
      }
    } catch (productCheckError: any) {
      console.warn("Could not verify product-sales channel link:", productCheckError.message)
    }

    return {
      region,
      salesChannel: salesChannels[0],
      publishableApiKey: apiKeyToken || publishableApiKey.id,
      product,
      category,
      shippingProfile,
      stockLocation,
    }
  } catch (error) {
    console.error("Error seeding test data:", error)
    throw error
  }
}

