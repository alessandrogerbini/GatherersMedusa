import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

/**
 * GET /store/customers/me
 * Get authenticated customer profile
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    // Extract auth token from Authorization header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Unauthorized",
      })
      return
    }

    const token = authHeader.substring(7) // Remove "Bearer " prefix

    // Extract customer ID from token
    // Token format: customer_token_{customerId}_{timestamp}
    const tokenParts = token.split("_")
    if (tokenParts.length < 3 || tokenParts[0] !== "customer" || tokenParts[1] !== "token") {
      res.status(401).json({
        message: "Unauthorized",
      })
      return
    }

    // Extract customer ID - it's the part after "customer_token_"
    // Token format: customer_token_{customerId}_{timestamp}
    // Customer IDs in Medusa are like "cus_01ABC123..." so we need to handle this
    let customerId: string
    if (tokenParts.length >= 3) {
      // Join all parts from index 2 onwards except the last (timestamp)
      // But check if last is numeric (timestamp)
      const lastPart = tokenParts[tokenParts.length - 1]
      if (/^\d+$/.test(lastPart) && tokenParts.length > 3) {
        // Last part is timestamp, customer ID is everything in between
        customerId = tokenParts.slice(2, -1).join("_")
      } else {
        // No timestamp or customer ID contains the "timestamp"
        customerId = tokenParts.slice(2).join("_")
      }
    } else {
      res.status(401).json({
        message: "Unauthorized",
      })
      return
    }

    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)

    // Retrieve customer by ID
    let customer
    try {
      customer = await customerModuleService.retrieveCustomer(customerId)
    } catch (error: any) {
      res.status(404).json({
        message: "Customer not found",
      })
      return
    }

    res.status(200).json({
      customer: {
        id: customer.id,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        created_at: customer.created_at,
        updated_at: customer.updated_at,
      },
    })
  } catch (error: any) {
    console.error("Get customer profile error:", error)
    res.status(500).json({
      message: error.message || "Failed to get customer profile",
    })
  }
}

/**
 * POST /store/customers/me
 * Update authenticated customer profile
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    // Extract auth token from Authorization header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Unauthorized",
      })
      return
    }

    const token = authHeader.substring(7) // Remove "Bearer " prefix

    // Extract customer ID from token
    // Token format: customer_token_{customerId}_{timestamp}
    const tokenParts = token.split("_")
    if (tokenParts.length < 3 || tokenParts[0] !== "customer" || tokenParts[1] !== "token") {
      res.status(401).json({
        message: "Unauthorized",
      })
      return
    }

    // Extract customer ID (same logic as GET)
    const tokenMatch = token.match(/^customer_token_(.+?)_(\d+)$/)
    let customerId: string
    
    if (tokenMatch && tokenMatch.length >= 3) {
      customerId = tokenMatch[1]
    } else {
      if (tokenParts.length >= 4) {
        const lastPart = tokenParts[tokenParts.length - 1]
        if (/^\d+$/.test(lastPart)) {
          customerId = tokenParts.slice(2, -1).join("_")
        } else {
          customerId = tokenParts.slice(2).join("_")
        }
      } else if (tokenParts.length === 3) {
        customerId = tokenParts[2]
      } else {
        res.status(401).json({
          message: "Unauthorized",
        })
        return
      }
    }

    const body = (req.body as { first_name?: string; last_name?: string; phone?: string }) || {}
    const { first_name, last_name, phone } = body

    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)

    // Update customer
    const updateData: any = {}
    if (first_name !== undefined) updateData.first_name = first_name
    if (last_name !== undefined) updateData.last_name = last_name
    if (phone !== undefined) updateData.phone = phone

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({
        message: "No fields to update",
      })
      return
    }

    const updatedCustomers = await customerModuleService.updateCustomers([customerId], updateData)
    const customer = updatedCustomers[0]

    res.status(200).json({
      customer: {
        id: customer.id,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        created_at: customer.created_at,
        updated_at: customer.updated_at,
      },
    })
  } catch (error: any) {
    console.error("Update customer profile error:", error)
    res.status(500).json({
      message: error.message || "Failed to update customer profile",
    })
  }
}

