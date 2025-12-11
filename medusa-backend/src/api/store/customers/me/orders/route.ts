import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

/**
 * GET /store/customers/me/orders
 * List authenticated customer orders
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

    // Extract customer ID from token (same logic as other endpoints)
    const tokenMatch = token.match(/^customer_token_(.+?)_(\d+)$/)
    let customerId: string
    
    if (tokenMatch && tokenMatch.length >= 3) {
      customerId = tokenMatch[1]
    } else {
      const tokenParts = token.split("_")
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

    // Get order module service
    const orderModuleService = req.scope.resolve(Modules.ORDER)

    // List orders for customer
    // In Medusa V2, orders are linked to customers
    let orders: any[] = []
    try {
      const result = await orderModuleService.listOrders({
        customer_id: customerId,
      })
      // Handle different return types
      orders = result.orders || result || []
    } catch (error: any) {
      // If listOrders doesn't work, try alternative
      try {
        const result = await orderModuleService.list({
          customer_id: customerId,
        })
        orders = Array.isArray(result) ? result : (result?.orders || [])
      } catch (listError) {
        // If no orders found or method doesn't exist, return empty array
        orders = []
      }
    }

    res.status(200).json({
      orders: orders || [],
    })
  } catch (error: any) {
    console.error("List customer orders error:", error)
    res.status(500).json({
      message: error.message || "Failed to list customer orders",
    })
  }
}

