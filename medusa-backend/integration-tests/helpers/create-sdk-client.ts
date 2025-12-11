/**
 * Create a Medusa JS SDK client for testing
 * Uses Medusa's official JS SDK which handles publishable key authentication automatically
 * Reference: https://docs.medusajs.com/resources/js-sdk
 */

import Medusa from "@medusajs/js-sdk"

/**
 * Create a Medusa JS SDK client configured for store API testing
 * The SDK automatically handles publishable key authentication
 */
export function createMedusaSDKClient(baseUrl: string, publishableKey: string) {
  // According to docs: https://docs.medusajs.com/resources/js-sdk
  // For storefronts, configure with publishableKey
  const sdk = new Medusa({
    baseUrl: baseUrl,
    debug: process.env.NODE_ENV === "development",
    publishableKey: publishableKey,
  })
  
  return sdk
}

/**
 * Create a wrapper that provides axios-like interface for compatibility with existing tests
 * This allows us to use Medusa SDK while maintaining test compatibility
 * 
 * The SDK automatically handles publishable key authentication per:
 * https://docs.medusajs.com/resources/js-sdk
 * 
 * Note: SDK has issues with headers when query parameters are present, so we use
 * a hybrid approach - SDK for simple requests, axios fallback for complex ones
 */
export function createSDKWrapper(sdk: any, publishableKey: string, axiosInstance?: any) {
  // Log wrapper creation for debugging
  if (process.env.DEBUG_SDK === "true") {
    console.log("Creating SDK wrapper:", {
      hasAxiosInstance: !!axiosInstance,
      axiosType: typeof axiosInstance,
      hasGetMethod: axiosInstance && typeof axiosInstance.get === 'function',
    })
  }
  
  return {
    get: async (url: string, config?: any) => {
      // Use SDK's client.fetch for GET requests
      // The SDK automatically handles publishable key headers
      // Reference: https://docs.medusajs.com/resources/js-sdk
      
      // Clean query parameters (do this outside try/catch so it's available in catch)
      const queryParams = config?.params || {}
      const cleanQueryParams: any = {}
      for (const key in queryParams) {
        if (queryParams[key] !== undefined && queryParams[key] !== null) {
          cleanQueryParams[key] = queryParams[key]
        }
      }
      
      try {
        // Always use axios if available - SDK has header issues with query parameters
        // Axios is more reliable for header handling in test environment
        if (axiosInstance && typeof axiosInstance.get === 'function') {
          // Use axios for all requests - it handles headers correctly
          const axiosResponse = await axiosInstance.get(url, {
            params: Object.keys(cleanQueryParams).length > 0 ? cleanQueryParams : undefined,
            headers: {
              "x-publishable-api-key": publishableKey,
            },
          })
          return {
            status: axiosResponse.status,
            data: axiosResponse.data,
            statusText: axiosResponse.statusText || "OK",
          }
        }
        
        // Fallback to SDK if axios not available (shouldn't happen in tests)
        // SDK has known issues with headers when query parameters are present
        const fetchOptions: any = {
          method: "GET",
          headers: {
            "x-publishable-api-key": publishableKey,
          },
        }
        
        if (Object.keys(cleanQueryParams).length > 0) {
          fetchOptions.query = cleanQueryParams
        }
        
        const response = await sdk.client.fetch(url, fetchOptions)
        
        // SDK returns data directly (e.g., { products: [...], count: 123 })
        // Based on storefront code: sdk.client.fetch returns { products, count } directly
        // We wrap it in axios-like format: { status, data, statusText }
        // Tests expect: response.data.products
        return {
          status: 200, // SDK handles errors by throwing
          data: response, // response is already { products: [...], count: 123 }
          statusText: "OK",
        }
      } catch (error: any) {
        // Handle axios errors
        if (error.response) {
          return {
            status: error.response.status,
            statusText: error.response.statusText || "Error",
            data: error.response.data,
          }
        }
        // SDK throws FetchError on errors
        // According to docs: https://docs.medusajs.com/resources/js-sdk
        // FetchError has: status, statusText properties
        // The error might have data in different properties
        
        // Log full error for debugging - always log 400 errors to understand the issue
        if (error.status === 400) {
          console.error("SDK 400 Error for GET:", {
            url,
            queryParams: cleanQueryParams,
            status: error.status,
            statusText: error.statusText,
            message: error.message,
            errorType: error.constructor?.name,
            errorKeys: Object.keys(error),
            errorData: error.data,
            errorResponse: error.response,
            errorString: String(error),
          })
        }
        
        // Extract error data - SDK might structure errors differently
        let errorData = error.data || error.message || error
        
        // If error.data is an object with a message property, use that
        if (error.data && typeof error.data === 'object' && error.data.message) {
          errorData = error.data
        } else if (error.response && error.response.data) {
          errorData = error.response.data
        }
        
        // Convert to axios-like response format
        // Tests expect a response object, not a thrown error
        const errorResponse = {
          status: error.status || 500,
          statusText: error.statusText || "Error",
          data: errorData,
        }
        
        // Return error response instead of throwing
        // This matches axios behavior where response.status indicates success/failure
        return errorResponse
      }
    },
    
    post: async (url: string, data?: any, config?: any) => {
      // Use axios if available - it handles headers correctly
      if (axiosInstance && typeof axiosInstance.post === 'function') {
        try {
          const axiosResponse = await axiosInstance.post(url, data, {
            params: config?.params,
            headers: {
              "x-publishable-api-key": publishableKey,
              ...(config?.headers || {}),
            },
          })
          return {
            status: axiosResponse.status,
            data: axiosResponse.data,
            statusText: axiosResponse.statusText || "OK",
          }
        } catch (axiosError: any) {
          // Return error response in axios format
          if (axiosError.response) {
            return {
              status: axiosError.response.status,
              statusText: axiosError.response.statusText || "Error",
              data: axiosError.response.data,
            }
          }
          return {
            status: 500,
            statusText: "Error",
            data: axiosError.message || axiosError,
          }
        }
      }
      
      // Fallback to SDK if axios not available
      try {
        const fetchOptions: any = {
          method: "POST",
          body: data,
          headers: {
            "x-publishable-api-key": publishableKey,
          },
        }
        if (config?.params) {
          fetchOptions.query = config.params
        }
        const response = await sdk.client.fetch(url, fetchOptions)
        
        return {
          status: 200,
          data: response,
          statusText: "OK",
        }
      } catch (error: any) {
        // Extract error data - SDK might structure errors differently
        let errorData = error.data || error.message || error
        if (error.data && typeof error.data === 'object' && error.data.message) {
          errorData = error.data
        } else if (error.response && error.response.data) {
          errorData = error.response.data
        }
        
        return {
          status: error.status || 500,
          statusText: error.statusText || "Error",
          data: errorData,
        }
      }
    },
    
    patch: async (url: string, data?: any, config?: any) => {
      try {
        // Clean query parameters
        const queryParams = config?.params || {}
        const cleanQueryParams: any = {}
        for (const key in queryParams) {
          if (queryParams[key] !== undefined && queryParams[key] !== null) {
            cleanQueryParams[key] = queryParams[key]
          }
        }
        
        const fetchOptions: any = {
          method: "PATCH",
          body: data,
        }
        if (Object.keys(cleanQueryParams).length > 0) {
          fetchOptions.query = cleanQueryParams
        }
        const response = await sdk.client.fetch(url, fetchOptions)
        
        return {
          status: 200,
          data: response,
          statusText: "OK",
        }
      } catch (error: any) {
        let errorData = error.data || error.message || error
        if (error.data && typeof error.data === 'object' && error.data.message) {
          errorData = error.data
        } else if (error.response && error.response.data) {
          errorData = error.response.data
        }
        
        return {
          status: error.status || 500,
          statusText: error.statusText || "Error",
          data: errorData,
        }
      }
    },
    
    delete: async (url: string, config?: any) => {
      try {
        // Clean query parameters
        const queryParams = config?.params || {}
        const cleanQueryParams: any = {}
        for (const key in queryParams) {
          if (queryParams[key] !== undefined && queryParams[key] !== null) {
            cleanQueryParams[key] = queryParams[key]
          }
        }
        
        const fetchOptions: any = {
          method: "DELETE",
        }
        if (Object.keys(cleanQueryParams).length > 0) {
          fetchOptions.query = cleanQueryParams
        }
        const response = await sdk.client.fetch(url, fetchOptions)
        
        return {
          status: 200,
          data: response,
          statusText: "OK",
        }
      } catch (error: any) {
        let errorData = error.data || error.message || error
        if (error.data && typeof error.data === 'object' && error.data.message) {
          errorData = error.data
        } else if (error.response && error.response.data) {
          errorData = error.response.data
        }
        
        return {
          status: error.status || 500,
          statusText: error.statusText || "Error",
          data: errorData,
        }
      }
    },
  }
}

