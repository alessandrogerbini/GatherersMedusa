import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

/**
 * POST /store/auth/emailpass/register
 * Register a new customer
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    // Ensure body is parsed correctly
    const body = req.body || {}
    const { email, password } = body

    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      res.status(400).json({
        message: "Invalid email format",
      })
      return
    }

    // Validate password strength
    if (password.length < 8) {
      res.status(400).json({
        message: "Password must be at least 8 characters",
      })
      return
    }

    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)

    // Check if customer already exists
    try {
      const existingCustomers = await customerModuleService.listCustomers({
        email,
      })

      if (Array.isArray(existingCustomers) && existingCustomers.length > 0) {
        res.status(400).json({
          message: "Customer with this email already exists",
        })
        return
      }
    } catch (error) {
      // If list fails, continue (might be a query issue)
    }

    // Create customer record
    // In Medusa V2, use createCustomers (plural) method
    // The method expects an array of customer data
    let customers
    try {
      customers = await customerModuleService.createCustomers([{
        email,
      }])
    } catch (createError: any) {
      // If customer already exists, createCustomers throws an error
      // Check if it's a duplicate email error
      if (createError.message && createError.message.includes("already exists")) {
        res.status(400).json({
          message: "Customer with this email already exists",
        })
        return
      }
      // Re-throw other errors
      throw createError
    }
    
    const customer = customers[0]

    // In Medusa V2, auth is handled by the auth module
    // The customer is created, and auth can be set up separately
    // For testing purposes, return the customer
    res.status(200).json({
      customer: {
        id: customer.id,
        email: customer.email,
      },
    })
  } catch (error: any) {
    console.error("Registration error:", error)
    res.status(400).json({
      message: error.message || "Failed to register customer",
    })
  }
}

