import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

/**
 * GET /admin/wholesale/applications
 * Get all pending wholesale applications
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)

    // Get all customers
    const { customers } = await customerModuleService.listCustomers({
      limit: 1000,
    })

    // Filter customers with pending wholesale applications
    const pendingApplications = customers
      .filter((customer: any) => customer.metadata?.wholesale_status === "pending")
      .map((customer: any) => ({
        id: customer.id,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        wholesale_status: customer.metadata.wholesale_status,
        wholesale_application: customer.metadata.wholesale_application,
      }))

    return res.status(200).json({
      applications: pendingApplications,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to retrieve wholesale applications.",
      error: error.message,
    })
  }
}

