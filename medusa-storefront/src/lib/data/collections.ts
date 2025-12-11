"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const retrieveCollection = async (id: string) => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  return sdk.client
    .fetch<{ collection: HttpTypes.StoreCollection }>(
      `/store/collections/${id}`,
      {
        next,
        cache: "no-store", // Allow new collections to appear
      }
    )
    .then(({ collection }) => collection)
}

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  try {
    const next = await getCacheOptions("collections").catch(() => ({}))

    queryParams.limit = queryParams.limit || "100"
    queryParams.offset = queryParams.offset || "0"

    return await sdk.client
      .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
        "/store/collections",
        {
          query: queryParams,
          next,
          cache: "no-store", // Allow new collections to appear
        }
      )
      .then(({ collections }) => ({ collections, count: collections.length }))
  } catch (error: any) {
    console.error("Error fetching collections:", {
      message: error?.message,
      cause: error?.cause,
      stack: error?.stack,
    })
    
    // Return empty array instead of throwing to allow graceful fallback
    return { collections: [], count: 0 }
  }
}

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection | null> => {
  try {
    const next = await getCacheOptions("collections").catch(() => ({}))
    
    const response = await sdk.client.fetch<HttpTypes.StoreCollectionListResponse>(
      `/store/collections`,
      {
        query: { handle, fields: "*products" },
        next,
        cache: "no-store", // Allow new collections to appear
      }
    )

    if (!response || !response.collections || response.collections.length === 0) {
      console.warn(`Collection with handle "${handle}" not found`)
      return null
    }

    return response.collections[0]
  } catch (error: any) {
    console.error(`Error fetching collection with handle "${handle}":`, {
      message: error?.message,
      cause: error?.cause,
      stack: error?.stack,
    })
    
    // Return null instead of throwing to allow graceful fallback
    return null
  }
}
