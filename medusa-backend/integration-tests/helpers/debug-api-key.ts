/**
 * Debug helper to check API key creation
 */

import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createApiKeysWorkflow, linkSalesChannelsToApiKeyWorkflow } from "@medusajs/core-flows"

export async function debugApiKeyCreation(container: any) {
  try {
    console.log("=== API Key Debug ===")
    
    // Create API key
    const { result: publishableApiKeyResult } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: "Debug API Key",
            type: "publishable",
            created_by: "",
          },
        ],
      },
    })
    
    const publishableApiKey = publishableApiKeyResult[0]
    console.log("API Key Result:", JSON.stringify(publishableApiKey, null, 2))
    console.log("API Key ID:", publishableApiKey.id)
    console.log("API Key Token:", publishableApiKey.token)
    console.log("API Key Keys:", Object.keys(publishableApiKey))
    
    // Try query
    const query = container.resolve(ContainerRegistrationKeys.QUERY)
    const queryResult = await query.graph({
      entity: "api_key",
      fields: ["*"],
      filters: {
        id: publishableApiKey.id,
      },
    })
    console.log("Query Result:", JSON.stringify(queryResult, null, 2))
    
    // Try module service
    const apiKeyModuleService = container.resolve(Modules.API_KEY)
    const moduleResult = await apiKeyModuleService.retrieve(publishableApiKey.id)
    console.log("Module Service Result:", JSON.stringify(moduleResult, null, 2))
    
    return publishableApiKey
  } catch (error) {
    console.error("Debug error:", error)
    throw error
  }
}





