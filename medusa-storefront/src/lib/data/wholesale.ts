"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export interface WholesaleApplicationData {
  business_name: string
  business_type: string
  tax_id?: string
  website?: string
  phone: string
  address?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  additional_info?: string
}

export interface WholesaleStatus {
  wholesale_status: "none" | "pending" | "approved" | "rejected"
  wholesale_application?: any
}

/**
 * Submit a wholesale account application
 */
export async function submitWholesaleApplication(
  data: WholesaleApplicationData
): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const headers = await getAuthHeaders()

    if (!headers || !("authorization" in headers)) {
      return {
        success: false,
        message: "You must be logged in to apply for a wholesale account.",
      }
    }

    const response = await sdk.client.fetch("/store/wholesale/apply", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    return {
      success: true,
      message: response.message || "Application submitted successfully!",
    }
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to submit application",
      error: error.message,
    }
  }
}

/**
 * Get the current user's wholesale status
 */
export async function getWholesaleStatus(): Promise<WholesaleStatus | null> {
  const headers = await getAuthHeaders()

  if (!headers || !("authorization" in headers)) {
    return null
  }

  return await sdk.client
    .fetch<WholesaleStatus>("/store/wholesale/status", {
      method: "GET",
      headers,
    })
    .then((response) => {
      // Check if response is valid
      if (!response || typeof response !== "object") {
        return null
      }
      return response
    })
    .catch(() => {
      // Silently handle all errors (401, 404, network errors, etc.)
      // These are expected when user is not logged in, endpoint doesn't exist, or network issues
      return null
    })
}

/**
 * Check if the current customer has an approved wholesale account
 */
export async function isWholesaleCustomer(): Promise<boolean> {
  const status = await getWholesaleStatus()
  return status?.wholesale_status === "approved"
}

