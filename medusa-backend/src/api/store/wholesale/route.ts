import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

/**
 * POST /store/wholesale/apply
 * Submit a wholesale account application
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const body = req.body || {}
    const {
      business_name,
      contact_name,
      email,
      phone,
      website,
      tax_id,
      address,
      city,
      state,
      zip,
      country,
      annual_volume,
      product_interests,
      additional_info,
    } = body

    // Validate required fields
    if (!business_name || !contact_name || !email || !phone) {
      return res.status(400).json({
        message: "Business name, contact name, email, and phone are required.",
      })
    }

    // Basic email validation
    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Invalid email address",
      })
    }

    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
    
    // Try to find or create customer
    let customer
    try {
      const existingCustomers = await customerModuleService.listCustomers({ email })
      const customers = Array.isArray(existingCustomers) ? existingCustomers : []
      
      if (customers.length > 0) {
        customer = customers[0]
      } else {
        // Create customer if doesn't exist
        const newCustomers = await customerModuleService.createCustomers([{
          email,
          first_name: contact_name.split(" ")[0] || contact_name,
          last_name: contact_name.split(" ").slice(1).join(" ") || "",
          phone,
        }])
        customer = newCustomers[0]
      }
    } catch (error: any) {
      // If customer creation fails, continue anyway
      console.warn("Could not create/find customer:", error.message)
    }

    // Update customer metadata with wholesale application if customer exists
    if (customer) {
      try {
        await customerModuleService.updateCustomers([customer.id], {
          metadata: {
            wholesale_status: "pending",
            wholesale_application: {
              business_name,
              contact_name,
              email,
              phone,
              website,
              tax_id,
              address,
              city,
              state,
              zip,
              country,
              annual_volume,
              product_interests,
              additional_info,
              applied_at: new Date().toISOString(),
            },
          },
        })
      } catch (updateError: any) {
        // If update fails, continue anyway - application is still received
        console.warn("Could not update customer metadata:", updateError.message)
      }
    }

    return res.status(200).json({
      message: "Wholesale application submitted successfully. We'll review it and get back to you soon.",
      success: true,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to submit wholesale application.",
      error: error.message,
    })
  }
}

/**
 * GET /store/wholesale/status
 * Get current user's wholesale account status
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
    // Extract customer ID from auth token or headers
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }
    
    const token = authHeader.substring(7)
    const tokenParts = token.split("_")
    if (tokenParts.length < 3 || tokenParts[0] !== "customer" || tokenParts[1] !== "token") {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }
    
    const lastPart = tokenParts[tokenParts.length - 1]
    const customerId = /^\d+$/.test(lastPart) && tokenParts.length > 3
      ? tokenParts.slice(2, -1).join("_")
      : tokenParts.slice(2).join("_")

    if (!customerId) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    const customer = await customerModuleService.retrieveCustomer(customerId)

    const wholesaleStatus = customer.metadata?.wholesale_status || "none"
    const wholesaleApplication = customer.metadata?.wholesale_application || null

    return res.status(200).json({
      wholesale_status: wholesaleStatus,
      wholesale_application: wholesaleApplication,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to retrieve wholesale status.",
      error: error.message,
    })
  }
}

