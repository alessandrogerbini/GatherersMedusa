import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

/**
 * POST /admin/wholesale/:id/approve
 * Approve a wholesale account application
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
    const customerId = req.params.id

    if (!customerId) {
      return res.status(400).json({
        message: "Customer ID is required.",
      })
    }

    // Get the customer
    const customer = await customerModuleService.retrieveCustomer(customerId)

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found.",
      })
    }

    // Update wholesale status to approved
    const updatedCustomer = await customerModuleService.updateCustomers(customerId, {
      metadata: {
        ...customer.metadata,
        wholesale_status: "approved",
        wholesale_approved_at: new Date().toISOString(),
      },
    })

    return res.status(200).json({
      message: "Wholesale application approved successfully.",
      customer: updatedCustomer,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to approve wholesale application.",
      error: error.message,
    })
  }
}

