import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

/**
 * POST /admin/wholesale/:id/reject
 * Reject a wholesale account application
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
    const customerId = req.params.id
    const { reason } = req.body

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

    // Update wholesale status to rejected
    const updatedCustomer = await customerModuleService.updateCustomers(customerId, {
      metadata: {
        ...customer.metadata,
        wholesale_status: "rejected",
        wholesale_rejected_at: new Date().toISOString(),
        wholesale_rejection_reason: reason || "Application did not meet requirements",
      },
    })

    return res.status(200).json({
      message: "Wholesale application rejected.",
      customer: updatedCustomer,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to reject wholesale application.",
      error: error.message,
    })
  }
}

