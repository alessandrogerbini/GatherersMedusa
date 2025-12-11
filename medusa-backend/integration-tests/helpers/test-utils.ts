/**
 * Test utilities for making tests more resilient
 */

/**
 * Debug: Inspect the API object structure
 */
export function debugApiObject(api: any) {
  console.log("=== API Object Debug ===")
  console.log("Type:", typeof api)
  console.log("Has get:", typeof api?.get === 'function')
  console.log("Has post:", typeof api?.post === 'function')
  console.log("Has defaults:", !!api?.defaults)
  console.log("Default headers:", api?.defaults?.headers)
  console.log("Base URL:", api?.defaults?.baseURL)
  console.log("Interceptor:", !!api?.interceptors)
  console.log("========================")
}

/**
 * Create an API client with publishable key header
 * 
 * This function can use either:
 * 1. Medusa JS SDK (recommended) - automatically handles publishable key authentication
 * 2. Axios wrapper (fallback) - manually sets headers
 * 
 * Reference: https://docs.medusajs.com/resources/js-sdk
 */
export function createApiClientWithKey(baseApi: any, publishableKey: string, useSDK: boolean = false) {
  // Try using Medusa JS SDK first if available and requested
  // The SDK automatically handles publishable key authentication
  // Reference: https://docs.medusajs.com/resources/js-sdk
  if (useSDK) {
    try {
      const Medusa = require("@medusajs/js-sdk").default
      const { createSDKWrapper } = require("./create-sdk-client")
      
      // Get base URL from the api object
      const baseUrl = baseApi.defaults?.baseURL || baseApi.defaults?.baseUrl || "http://localhost:9000"
      
      // Create SDK client with publishable key
      // According to docs: https://docs.medusajs.com/resources/js-sdk
      // For storefronts, configure with publishableKey - this automatically handles authentication
      // Also set globalHeaders to ensure the publishable key is always included
      // Reference: https://docs.medusajs.com/resources/js-sdk
      const sdk = new Medusa({
        baseUrl: baseUrl,
        debug: false,
        publishableKey: publishableKey,
        globalHeaders: {
          "x-publishable-api-key": publishableKey,
        },
      })
      
      console.log("✓ Using Medusa JS SDK wrapper with axios fallback (SDK has header issues with query params)")
      console.log(`  Base URL: ${baseUrl}`)
      console.log(`  Publishable Key: ${publishableKey.substring(0, 30)}...`)
      // Pass axios instance - we'll use it for all requests since SDK has header issues
      return createSDKWrapper(sdk, publishableKey, baseApi)
    } catch (sdkError: any) {
      console.warn("⚠️ Could not use Medusa JS SDK, falling back to axios wrapper:", sdkError.message)
      // Fall through to axios wrapper
    }
  }
  
  // Fallback to axios wrapper (original implementation)
  // Ensure we have a valid key
  if (!publishableKey || !publishableKey.startsWith("pk_")) {
    console.warn(`Invalid API key format: ${publishableKey?.substring(0, 20)}...`)
  }

  // Set the API key as a default header on the baseApi instance
  // This ensures it's always included, even if request config doesn't explicitly set it
  if (baseApi.defaults && baseApi.defaults.headers) {
    if (!baseApi.defaults.headers.common) {
      baseApi.defaults.headers.common = {}
    }
    baseApi.defaults.headers.common["x-publishable-api-key"] = publishableKey
    
    // Also set it for GET requests specifically
    if (!baseApi.defaults.headers.get) {
      baseApi.defaults.headers.get = {}
    }
    baseApi.defaults.headers.get["x-publishable-api-key"] = publishableKey
  }

  // Debug: Log the baseApi structure on first use
  if (!(baseApi as any)._debugged) {
    debugApiObject(baseApi)
    ;(baseApi as any)._debugged = true
  }

  // Create a wrapper that logs requests and errors
  const logRequest = (method: string, url: string, config?: any) => {
    const headers = config?.headers || {}
    const hasKey = !!(headers['x-publishable-api-key'] || headers['X-Publishable-Api-Key'])
    const keyValue = headers['x-publishable-api-key'] || headers['X-Publishable-Api-Key'] || 'none'
    console.log(`[${method}] ${url}`)
    console.log(`  Key present: ${hasKey}, Key: ${keyValue.substring(0, 30)}...`)
  }
  
  const logError = (method: string, url: string, error: any) => {
    if (error.response) {
      const status = error.response.status
      const data = error.response.data
      console.error(`\n❌ [${method}] ${url}`)
      console.error(`   Status: ${status}`)
      console.error(`   Error Data:`, JSON.stringify(data, null, 2))
      if (data?.message) {
        console.error(`   Message: ${data.message}`)
      }
      if (data?.errors) {
        console.error(`   Errors:`, JSON.stringify(data.errors, null, 2))
      }
    } else {
      console.error(`[${method}] ${url} - Error:`, error.message)
    }
  }

  // Use axios interceptor to ensure API key is always included
  // Track if interceptor has been added to avoid duplicates
  const interceptorKey = `_api_key_interceptor_${publishableKey.substring(0, 10)}`
  if (!(baseApi as any)[interceptorKey]) {
    baseApi.interceptors.request.use(
      (config: any) => {
        // Always set the publishable API key header
        if (!config.headers) {
          config.headers = {}
        }
        config.headers["x-publishable-api-key"] = publishableKey
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )
    ;(baseApi as any)[interceptorKey] = true
  }

  return {
    get: async (url: string, config?: any) => {
      // Ensure header is set directly in config - this is the primary method
      // The interceptor is a backup, but we rely on direct setting for reliability
      const requestConfig: any = {
        ...config,
        headers: {
          ...(config?.headers || {}),
          "x-publishable-api-key": publishableKey,
        },
      }
      
      // Preserve params if they exist
      if (config?.params) {
        requestConfig.params = config.params
      }
      
      logRequest("GET", url, { headers: requestConfig.headers, params: requestConfig?.params })
      
      // Debug: Log the actual config being sent with full details
      const apiKeyValue = requestConfig.headers["x-publishable-api-key"]
      console.log("  Request config:", JSON.stringify({
        url,
        method: "GET",
        headers: Object.keys(requestConfig.headers || {}),
        headerValues: {
          "x-publishable-api-key": apiKeyValue ? `${apiKeyValue.substring(0, 20)}...` : "MISSING",
          "Content-Type": requestConfig.headers["Content-Type"] || "not set",
        },
        params: requestConfig.params,
        hasApiKey: !!apiKeyValue,
        apiKeyLength: apiKeyValue?.length || 0,
      }, null, 2))
      
      // Also log the raw axios config to see what axios will actually send
      console.log("  Axios config keys:", Object.keys(requestConfig))
      if (requestConfig.params) {
        console.log("  Params type:", typeof requestConfig.params, "Keys:", Object.keys(requestConfig.params))
      }
      
      try {
        // Make request with explicit headers and params
        const response = await baseApi.get(url, requestConfig)
        return response
      } catch (error: any) {
        logError("GET", url, error)
        // Re-throw to let test handle it
        throw error
      }
    },
    post: async (url: string, data?: any, config?: any) => {
      // Ensure Content-Type and API key are set for POST requests
      if (!config) {
        config = {}
      }
      if (!config.headers) {
        config.headers = {}
      }
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json"
      }
      config.headers["x-publishable-api-key"] = publishableKey
      
      logRequest("POST", url, { headers: config.headers })
      
      try {
        // Both interceptor and direct header setting ensure the key is included
        const response = await baseApi.post(url, data, config)
        return response
      } catch (error: any) {
        logError("POST", url, error)
        throw error
      }
    },
    put: (url: string, data?: any, config?: any) => {
      const mergedHeaders = {
        ...(config?.headers || {}),
        "x-publishable-api-key": publishableKey,
      }
      
      return baseApi.put(url, data, {
        ...config,
        headers: mergedHeaders,
      })
    },
    delete: (url: string, config?: any) => {
      const mergedHeaders = {
        ...(config?.headers || {}),
        "x-publishable-api-key": publishableKey,
      }
      
      return baseApi.delete(url, {
        ...config,
        headers: mergedHeaders,
      })
    },
    patch: async (url: string, data?: any, config?: any) => {
      // Ensure Content-Type and API key are set for PATCH requests
      if (!config) {
        config = {}
      }
      if (!config.headers) {
        config.headers = {}
      }
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json"
      }
      config.headers["x-publishable-api-key"] = publishableKey
      
      logRequest("PATCH", url, { headers: config.headers }, data)
      
      try {
        // Both interceptor and direct header setting ensure the key is included
        const response = await baseApi.patch(url, data, config)
        return response
      } catch (error: any) {
        logError("PATCH", url, error)
        throw error
      }
    },
  }
}

/**
 * Get publishable API key from container - uses seedTestData
 */
export async function getPublishableApiKey(container: any): Promise<string> {
  try {
    const { seedTestData } = await import("./seed-test-data")
    const testData = await seedTestData(container)
    const apiKey = testData.publishableApiKey
    
    // Log for debugging
    if (!apiKey || (!apiKey.startsWith("pk_") && apiKey.length < 20)) {
      console.warn(`API key format may be incorrect: ${apiKey?.substring(0, 20)}...`)
    }
    
    return apiKey
  } catch (error) {
    console.error("Could not seed test data:", error)
    // Return a dummy key so tests at least run (they'll fail but we can see the error)
    return "pk_test_dummy_key"
  }
}

