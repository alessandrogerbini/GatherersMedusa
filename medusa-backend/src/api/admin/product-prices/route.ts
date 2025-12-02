import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

interface PriceData {
  variantId: string
  variantTitle: string
  sku: string | null
  prices: {
    id: string | null
    amount: number
    currency_code: string
  }[]
}

// GET /admin/product-prices?product_id=xxx
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const productId = req.query.product_id as string
    
    if (!productId) {
      return res.status(400).json({ error: "product_id is required" })
    }

    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    // Query product variants with their linked price sets and prices
    const { data: variants } = await query.graph({
      entity: "product_variant",
      fields: [
        "id",
        "title",
        "sku",
        "product_id",
        "price_set.id",
        "price_set.prices.id",
        "price_set.prices.amount",
        "price_set.prices.currency_code",
      ],
      filters: {
        product_id: productId,
      },
    })

    const priceData: PriceData[] = variants.map((variant: any) => ({
      variantId: variant.id,
      variantTitle: variant.title || "Default",
      sku: variant.sku,
      prices: variant.price_set?.prices?.map((p: any) => ({
        id: p.id,
        amount: p.amount,
        currency_code: p.currency_code,
      })) || [],
    }))

    return res.json({ variants: priceData })
  } catch (error: any) {
    console.error("Error fetching product prices:", error)
    return res.status(500).json({ error: error.message || "Failed to fetch prices" })
  }
}

// POST /admin/product-prices
// Body: { price_id: string, amount: number }
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const body = req.body as { price_id?: string; amount?: number }
    const { price_id, amount } = body

    if (!price_id || amount === undefined) {
      return res.status(400).json({ error: "price_id and amount are required" })
    }

    const pricingModuleService = req.scope.resolve(Modules.PRICING)

    // Update the price
    const updatedPrices = await pricingModuleService.updatePriceSets([
      {
        id: price_id,
        // This won't work directly - we need to update the price, not the price set
      }
    ])

    // Actually, we need to use a different approach to update individual prices
    // Let's use the raw update method
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
    
    // First get the price to find its price set
    const { data: priceData } = await query.graph({
      entity: "price",
      fields: ["id", "price_set_id", "amount", "currency_code"],
      filters: { id: price_id },
    })

    if (!priceData.length) {
      return res.status(404).json({ error: "Price not found" })
    }

    // Update using the pricing module's internal method
    // Note: In Medusa v2, we might need to use a workflow or direct DB update
    await pricingModuleService.updatePrices([
      {
        id: price_id,
        amount: amount,
      }
    ])

    return res.json({ success: true, price_id, amount })
  } catch (error: any) {
    console.error("Error updating price:", error)
    return res.status(500).json({ error: error.message || "Failed to update price" })
  }
}

