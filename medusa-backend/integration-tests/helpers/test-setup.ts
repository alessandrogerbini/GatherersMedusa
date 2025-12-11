/**
 * Test setup helpers for integration tests
 */

import { Modules } from "@medusajs/framework/utils"
import { createApiKeysWorkflow, linkSalesChannelsToApiKeyWorkflow } from "@medusajs/core-flows"

/**
 * Get or create a publishable API key for testing
 * Since each test gets a fresh database, we always create a new key
 */
export async function getOrCreatePublishableApiKey(container: any): Promise<string> {
  try {
    // Get sales channels using query
    const query = container.resolve("query")
    
    // Get default sales channel
    const salesChannelsResult = await query.graph({
      entity: "sales_channel",
      fields: ["id", "name"],
    })

    let salesChannelId: string
    if (salesChannelsResult && salesChannelsResult.length > 0) {
      salesChannelId = salesChannelsResult[0].id
    } else {
      // If no sales channel exists, we need to create one or use a default
      // For now, throw an error - tests should seed data first
      throw new Error("No sales channels found. Tests require seeded data.")
    }

    // Create new publishable API key
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

    // Link to sales channel
    await linkSalesChannelsToApiKeyWorkflow(container).run({
      input: {
        id: publishableApiKey.id,
        add: [salesChannelId],
      },
    })

    // The token is in the result
    return publishableApiKey.token || publishableApiKey.id
  } catch (error) {
    console.error("Error creating publishable API key:", error)
    // Return a dummy key for now - tests will fail but at least they'll run
    return "pk_test_key"
  }
}

/**
 * Create an API client with publishable key header
 */
export function createApiClientWithKey(baseApi: any, publishableKey: string) {
  const headers = {
    "x-publishable-api-key": publishableKey,
  }

  return {
    get: (url: string, config?: any) => {
      return baseApi.get(url, {
        ...config,
        headers: {
          ...headers,
          ...config?.headers,
        },
      })
    },
    post: (url: string, data?: any, config?: any) => {
      return baseApi.post(url, data, {
        ...config,
        headers: {
          ...headers,
          ...config?.headers,
        },
      })
    },
    put: (url: string, data?: any, config?: any) => {
      return baseApi.put(url, data, {
        ...config,
        headers: {
          ...headers,
          ...config?.headers,
        },
      })
    },
    delete: (url: string, config?: any) => {
      return baseApi.delete(url, {
        ...config,
        headers: {
          ...headers,
          ...config?.headers,
        },
      })
    },
    patch: (url: string, data?: any, config?: any) => {
      return baseApi.patch(url, data, {
        ...config,
        headers: {
          ...headers,
          ...config?.headers,
        },
      })
    },
  }
}

