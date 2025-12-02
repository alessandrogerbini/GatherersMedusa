import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Table, Input, Button, Badge } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

interface Price {
  id: string
  amount: number
  currency_code: string
}

interface VariantPrice {
  variantId: string
  variantTitle: string
  sku: string | null
  priceSetId: string | null
  usdPrice: number | null
  usdPriceId: string | null
  eurPrice: number | null
  eurPriceId: string | null
}

/**
 * Product Price Editor Widget
 * 
 * This widget allows editing variant prices directly on the product details page.
 * It displays USD and EUR prices for each variant and allows inline editing.
 */
const ProductPriceEditor = () => {
  const { id } = useParams()
  const [variants, setVariants] = useState<VariantPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [editedPrices, setEditedPrices] = useState<Record<string, { usd?: string; eur?: string }>>({})

  useEffect(() => {
    if (id) {
      fetchProductWithPrices()
    }
  }, [id])

  const fetchProductWithPrices = async () => {
    setLoading(true)
    setError(null)
    try {
      // Use our custom API endpoint that has server-side access to pricing module
      const response = await fetch(`/admin/product-prices?product_id=${id}`, {
        credentials: "include",
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch prices")
      }
      
      const data = await response.json()
      
      if (!data.variants) {
        setVariants([])
        setLoading(false)
        return
      }

      // Map the response to our state format
      const variantPrices: VariantPrice[] = data.variants.map((variant: any) => {
        let usdPrice: number | null = null
        let eurPrice: number | null = null
        let usdPriceId: string | null = null
        let eurPriceId: string | null = null

        for (const price of variant.prices || []) {
          if (price.currency_code === "usd") {
            usdPrice = price.amount
            usdPriceId = price.id
          } else if (price.currency_code === "eur") {
            eurPrice = price.amount
            eurPriceId = price.id
          }
        }

        return {
          variantId: variant.variantId,
          variantTitle: variant.variantTitle,
          sku: variant.sku,
          priceSetId: variant.prices?.length > 0 ? "has_prices" : null,
          usdPrice,
          usdPriceId,
          eurPrice,
          eurPriceId,
        }
      })

      setVariants(variantPrices)
    } catch (err) {
      console.error("Error fetching product:", err)
      setError("Failed to load product prices. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const handlePriceChange = (variantId: string, currency: "usd" | "eur", value: string) => {
    setEditedPrices(prev => ({
      ...prev,
      [variantId]: {
        ...prev[variantId],
        [currency]: value,
      },
    }))
  }

  const savePrice = async (variantId: string, currency: "usd" | "eur") => {
    const variant = variants.find(v => v.variantId === variantId)
    if (!variant) return

    const newValue = editedPrices[variantId]?.[currency]
    if (newValue === undefined || newValue === "") return

    const amount = parseFloat(newValue)
    if (isNaN(amount)) {
      setError("Please enter a valid number")
      return
    }

    setSaving(`${variantId}-${currency}`)
    setError(null)

    try {
      const priceId = currency === "usd" ? variant.usdPriceId : variant.eurPriceId

      if (priceId) {
        // Update existing price using our custom API
        const response = await fetch(`/admin/product-prices`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price_id: priceId, amount }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || "Failed to update price")
        }
      } else {
        setError(`No ${currency.toUpperCase()} price exists for this variant. Please use a seed script to add initial prices.`)
        setSaving(null)
        return
      }

      // Refresh data
      await fetchProductWithPrices()
      
      // Clear edited value
      setEditedPrices(prev => {
        const newState = { ...prev }
        if (newState[variantId]) {
          delete newState[variantId][currency]
        }
        return newState
      })
    } catch (err: any) {
      console.error("Error saving price:", err)
      setError(err.message || `Failed to save ${currency.toUpperCase()} price`)
    } finally {
      setSaving(null)
    }
  }

  const formatPrice = (amount: number | null, currency: string): string => {
    if (amount === null) return "—"
    const symbol = currency === "usd" ? "$" : "€"
    return `${symbol}${amount.toFixed(2)}`
  }

  const getDisplayValue = (variantId: string, currency: "usd" | "eur", currentValue: number | null): string => {
    const edited = editedPrices[variantId]?.[currency]
    if (edited !== undefined) return edited
    if (currentValue === null) return ""
    return currentValue.toString()
  }

  if (loading) {
    return (
      <Container>
        <Heading level="h2" className="mb-4">💰 Variant Prices</Heading>
        <p className="text-gray-500">Loading prices...</p>
      </Container>
    )
  }

  return (
    <Container>
      <div className="mb-4">
        <Heading level="h2" className="mb-2">💰 Variant Prices</Heading>
        <p className="text-sm text-gray-600">
          Edit prices for each variant. Changes are saved individually.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      {variants.length === 0 ? (
        <p className="text-gray-500">No variants found for this product.</p>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Variant</Table.HeaderCell>
              <Table.HeaderCell>SKU</Table.HeaderCell>
              <Table.HeaderCell>USD Price</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>EUR Price</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {variants.map((variant) => (
              <Table.Row key={variant.variantId}>
                <Table.Cell>
                  <span className="font-medium">{variant.variantTitle}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-gray-500 text-sm">{variant.sku || "—"}</span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">$</span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder={variant.usdPrice?.toString() || "0.00"}
                      value={getDisplayValue(variant.variantId, "usd", variant.usdPrice)}
                      onChange={(e) => handlePriceChange(variant.variantId, "usd", e.target.value)}
                      className="w-24"
                    />
                    {variant.usdPrice !== null && (
                      <Badge color="green" className="text-xs">
                        {formatPrice(variant.usdPrice, "usd")}
                      </Badge>
                    )}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => savePrice(variant.variantId, "usd")}
                    disabled={saving === `${variant.variantId}-usd` || !editedPrices[variant.variantId]?.usd}
                  >
                    {saving === `${variant.variantId}-usd` ? "..." : "Save"}
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">€</span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder={variant.eurPrice?.toString() || "0.00"}
                      value={getDisplayValue(variant.variantId, "eur", variant.eurPrice)}
                      onChange={(e) => handlePriceChange(variant.variantId, "eur", e.target.value)}
                      className="w-24"
                    />
                    {variant.eurPrice !== null && (
                      <Badge color="blue" className="text-xs">
                        {formatPrice(variant.eurPrice, "eur")}
                      </Badge>
                    )}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => savePrice(variant.variantId, "eur")}
                    disabled={saving === `${variant.variantId}-eur` || !editedPrices[variant.variantId]?.eur}
                  >
                    {saving === `${variant.variantId}-eur` ? "..." : "Save"}
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
        <p className="font-semibold mb-1">💡 Tip:</p>
        <p>Enter a new price and click "Save" to update. The current price is shown in the badge.</p>
      </div>

      <div className="mt-4">
        <Button variant="secondary" onClick={fetchProductWithPrices} disabled={loading}>
          🔄 Refresh Prices
        </Button>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductPriceEditor

