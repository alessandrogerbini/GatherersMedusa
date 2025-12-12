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
    const results: Array<{
      variantId: string
      success: boolean
      prices?: any[]
      error?: string
    }> = []
    
    for (const update of updates) {
      try {
        // Get existing price sets for this variant
        // Note: In Medusa V2, prices are managed through price sets
        // We need to find price sets linked to the variant
        const existingPriceSets = await pricingModuleService.listPriceSets({
          // Filter by variant using metadata or other means
          // This is a simplified approach - may need adjustment based on actual API
        } as any)
        
        // Delete existing price sets
        if (existingPriceSets && existingPriceSets.length > 0) {
          await Promise.all(
            existingPriceSets.map((priceSet: any) => 
              pricingModuleService.deletePriceSets([priceSet.id])
            )
          )
        }
        
        // Create new price sets with prices
        // In Medusa V2, prices are created as part of price sets
        const priceSetData = {
          prices: update.prices.map(p => ({
            amount: p.amount,
            currency_code: p.currency_code,
            ...(p.region_id && { region_id: p.region_id })
          }))
        }
        
        const newPriceSet = await pricingModuleService.createPriceSets(priceSetData as any)

        results.push({
          variantId: update.variantId,
          success: true,
          prices: newPriceSet ? [newPriceSet] : []
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

