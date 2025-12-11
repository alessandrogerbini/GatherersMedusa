/**
 * Test script to verify API key validation
 * This helps debug why API key validation is failing
 */

import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"

export async function testApiKeyValidation(container: any, apiKeyToken: string) {
  try {
    const apiKeyModuleService = container.resolve(Modules.API_KEY)
    
    // Try to authenticate the API key using Medusa's authenticate method
    // According to docs: https://docs.medusajs.com/resources/commerce-modules/api-key/concepts#token-verification
    // The authenticate method validates the token against all non-expired tokens
    console.log("Testing API key authentication using authenticate method...")
    console.log("API Key Token:", apiKeyToken.substring(0, 30) + "...")
    
    // Check if authenticate method exists
    // According to docs: https://docs.medusajs.com/resources/commerce-modules/api-key/concepts#token-verification
    // The authenticate method validates the token against all non-expired tokens
    if (typeof apiKeyModuleService.authenticate === 'function') {
      console.log("✓ authenticate method found, attempting authentication...")
      try {
        const authResult = await apiKeyModuleService.authenticate(apiKeyToken)
        
        if (authResult) {
          console.log("✓ Authentication successful - API key is valid")
          console.log("  Auth result type:", typeof authResult)
          console.log("  Auth result keys:", Object.keys(authResult || {}))
          
          // Try to get more details about the authenticated key
          // The authenticate method might return a different format
          if (authResult.id) {
            console.log("  API Key ID:", authResult.id)
            console.log("  API Key Type:", authResult.type)
            console.log("  API Key Title:", authResult.title)
          } else {
            // If authenticate returns true or a minimal object, the key is valid
            console.log("  ✓ API key token is valid (authenticate returned truthy value)")
          }
          
          return authResult
        } else {
          console.error("❌ Authentication failed - authenticate returned falsy value")
          return null
        }
      } catch (authError: any) {
        console.error("❌ Authentication failed with error:", authError.message)
        throw authError
      }
    } else {
      console.warn("⚠️ authenticate method not found on API key module service")
      console.log("Available methods:", Object.getOwnPropertyNames(apiKeyModuleService).filter(name => typeof apiKeyModuleService[name] === 'function'))
    }
    
    // Fallback: Try to use the query API to find the API key
    const query = container.resolve(ContainerRegistrationKeys.QUERY)
    
    try {
      // Query for API keys using the query API
      const { data: apiKeys } = await query.graph({
        entity: "api_key",
        fields: ["id", "type", "title", "token"],
        filters: {
          type: "publishable",
        },
      })
      
      console.log(`Found ${apiKeys?.length || 0} publishable API keys`)
      
      // Find the one matching our token
      const matchingKey = apiKeys?.find((key: any) => key.token === apiKeyToken)
      
      if (matchingKey) {
        console.log("✓ Found matching API key in database:", {
          id: matchingKey.id,
          type: matchingKey.type,
          title: matchingKey.title,
        })
        
        // Check if it's linked to sales channels
        const { data: links } = await query.graph({
          entity: "publishable_api_key_sales_channel",
          fields: ["sales_channel_id", "api_key_id"],
          filters: {
            api_key_id: matchingKey.id,
          },
        })
        
        console.log(`✓ API key is linked to ${links?.length || 0} sales channel(s)`)
        if (links && links.length > 0) {
          console.log("  Sales Channel IDs:", links.map((link: any) => link.sales_channel_id))
        }
        
        return { key: matchingKey, links }
      } else {
        console.error("❌ Could not find API key with token in database")
        console.log("Available tokens:", apiKeys?.map((k: any) => k.token?.substring(0, 20) + "...") || [])
        return null
      }
    } catch (queryError: any) {
      console.error("Error querying API keys:", queryError.message)
      throw queryError
    }
  } catch (error: any) {
    console.error("Error testing API key validation:", error.message)
    throw error
  }
}

