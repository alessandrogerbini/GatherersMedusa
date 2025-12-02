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
    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
    const customerId = req.auth_context?.actor_id

    if (!customerId) {
      return res.status(401).json({
        message: "Unauthorized. Please log in to apply for a wholesale account.",
      })
    }

    const {
      business_name,
      business_type,
      tax_id,
      website,
      phone,
      address,
      city,
      state,
      postal_code,
      country,
      additional_info,
    } = req.body

    // Validate required fields
    if (!business_name || !business_type || !phone) {
      return res.status(400).json({
        message: "Business name, type, and phone are required.",
      })
    }

    // Update customer metadata with wholesale application
    const customer = await customerModuleService.updateCustomers(customerId, {
      metadata: {
        wholesale_status: "pending",
        wholesale_application: {
          business_name,
          business_type,
          tax_id,
          website,
          phone,
          address,
          city,
          state,
          postal_code,
          country,
          additional_info,
          applied_at: new Date().toISOString(),
        },
      },
    })

    return res.status(200).json({
      message: "Wholesale application submitted successfully. We'll review it and get back to you soon.",
      customer,
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
    const customerId = req.auth_context?.actor_id

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

