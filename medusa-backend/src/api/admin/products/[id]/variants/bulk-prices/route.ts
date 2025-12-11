import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

/**
 * POST /admin/products/:id/variants/bulk-prices
 * Bulk update prices for multiple variants of a product
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const productId = req.params.id
    const { updates } = req.body as {
      updates: Array<{
        variantId: string
        prices: Array<{
          amount: number
          currency_code: string
          region_id?: string
        }>
      }>
    }

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required.",
      })
    }

    if (!updates || !Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({
        message: "Updates array is required.",
      })
    }

    const pricingModuleService = req.scope.resolve(Modules.PRICING)
    const results = []
    
    for (const update of updates) {
      try {
        // Get existing prices for this variant
        const existingPrices = await pricingModuleService.listPrices({
          variant_id: update.variantId,
        })
        
        // Delete existing prices
        if (existingPrices.length > 0) {
          await Promise.all(
            existingPrices.map(price => 
              pricingModuleService.deletePrices([price.id])
            )
          )
        }
        
        // Create new prices
        const newPrices = await pricingModuleService.createPrices(
          update.prices.map(p => ({
            amount: p.amount,
            currency_code: p.currency_code,
            variant_id: update.variantId,
            ...(p.region_id && { region_id: p.region_id })
          }))
        )

        results.push({
          variantId: update.variantId,
          success: true,
          prices: newPrices
        })
      } catch (error: any) {
        console.error(`Error updating variant ${update.variantId}:`, error)
        results.push({
          variantId: update.variantId,
          success: false,
          error: error.message
        })
      }
    }

    const allSuccessful = results.every(r => r.success)

    return res.status(allSuccessful ? 200 : 207).json({
      message: allSuccessful 
        ? "All prices updated successfully." 
        : "Some prices failed to update.",
      results
    })
  } catch (error: any) {
    console.error("Error in bulk price update:", error)
    return res.status(500).json({
      message: "Failed to update prices.",
      error: error.message,
    })
  }
}

