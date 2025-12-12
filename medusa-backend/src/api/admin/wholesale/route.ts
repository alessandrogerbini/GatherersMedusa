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

    // Get all customers - try different methods with proper error handling
    let customers: any[] = []
    
    try {
      // Try listAndCountCustomers first (preferred method for pagination)
      if (typeof (customerModuleService as any).listAndCountCustomers === "function") {
        const result = await (customerModuleService as any).listAndCountCustomers({}, {
          take: 1000,
        })
        // listAndCountCustomers returns [entities, count]
        customers = Array.isArray(result) && Array.isArray(result[0]) ? result[0] : []
      } 
      // Try listCustomers with pagination options as second parameter
      else if (typeof customerModuleService.listCustomers === "function") {
        // Try with pagination options
        try {
          const result = await (customerModuleService as any).listCustomers(
            {}, // empty filter
            { take: 1000 } // pagination options
          )
          customers = Array.isArray(result) ? result : []
        } catch (paginationError) {
          // Try without pagination options
          try {
            const result = await customerModuleService.listCustomers({})
            customers = Array.isArray(result) ? result : []
          } catch (emptyFilterError) {
            console.warn("listCustomers failed with both pagination and empty filter")
            customers = []
          }
        }
      }
      // Fallback to list method
      else if (typeof (customerModuleService as any).list === "function") {
        const result = await (customerModuleService as any).list({}, {
          take: 1000,
        })
        customers = Array.isArray(result) ? result : []
      } else {
        console.warn("No suitable method found to list customers")
        customers = []
      }
    } catch (listError: any) {
      console.error("Error listing customers:", listError)
      // Log the full error for debugging
      console.error("Full error details:", JSON.stringify(listError, null, 2))
      // Return empty array so widget doesn't break the page
      customers = []
    }

    // Filter customers with pending wholesale applications
    const pendingApplications = customers
      .filter((customer: any) => customer?.metadata?.wholesale_status === "pending")
      .map((customer: any) => ({
        id: customer.id,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        wholesale_status: customer.metadata?.wholesale_status,
        wholesale_application: customer.metadata?.wholesale_application,
      }))

    return res.status(200).json({
      applications: pendingApplications,
    })
  } catch (error: any) {
    console.error("Error fetching wholesale applications:", error)
    // Return empty array instead of error to prevent widget from breaking the page
    return res.status(200).json({
      applications: [],
      error: error.message,
    })
  }
}

