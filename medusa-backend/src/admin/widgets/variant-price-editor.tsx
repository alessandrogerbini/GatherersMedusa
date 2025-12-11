import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Heading, Button, Input, Table, Text } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

interface VariantPrice {
  currency_code: string
  amount: number
  region_id?: string
}

interface VariantOption {
  option_id: string
  value: string
}

interface Variant {
  id: string
  title: string
  sku: string | null
  prices: VariantPrice[]
  options?: VariantOption[]
  created_at?: string
  updated_at?: string
}

interface Product {
  id: string
  title: string
  variants: Variant[]
}

/**
 * Inline Variant Price Editor Widget
 * 
 * This widget displays all product variants with their prices in an editable table format.
 * Prices can be edited directly without clicking through to individual variant pages.
 */
const VariantPriceEditor = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editedPrices, setEditedPrices] = useState<Record<string, Record<string, string>>>({})
  const [currencies, setCurrencies] = useState<string[]>([])

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/admin/products/${id}?expand[]=variants&expand[]=variants.prices&expand[]=variants.options`, {
        credentials: "include",
      })
      const data = await response.json()
      
      if (data.product) {
        setProduct(data.product)
        
        // Extract unique currencies from all variant prices
        const allCurrencies = new Set<string>()
        data.product.variants?.forEach((variant: Variant) => {
          variant.prices?.forEach((price: VariantPrice) => {
            allCurrencies.add(price.currency_code)
          })
        })
        setCurrencies(Array.from(allCurrencies))
        
        // Initialize edited prices with current values
        const initialPrices: Record<string, Record<string, string>> = {}
        data.product.variants?.forEach((variant: Variant) => {
          initialPrices[variant.id] = {}
          variant.prices?.forEach((price: VariantPrice) => {
            initialPrices[variant.id][price.currency_code] = (price.amount / 100).toFixed(2)
          })
        })
        setEditedPrices(initialPrices)
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePriceChange = (variantId: string, currencyCode: string, value: string) => {
    setEditedPrices(prev => ({
      ...prev,
      [variantId]: {
        ...prev[variantId],
        [currencyCode]: value
      }
    }))
  }

  const handleSaveVariant = async (variantId: string) => {
    if (!product) return

    setSaving(true)
    try {
      const variant = product.variants?.find(v => v.id === variantId)
      if (!variant) return

      const variantPrices: VariantPrice[] = []
      
      currencies.forEach((currencyCode) => {
        const newPrice = editedPrices[variantId]?.[currencyCode]
        if (newPrice !== undefined && newPrice !== "") {
          const amount = Math.round(parseFloat(newPrice) * 100)
          if (!isNaN(amount)) {
            // Find existing price to preserve region_id if it exists
            const existingPrice = variant.prices?.find(p => p.currency_code === currencyCode)
            variantPrices.push({
              currency_code: currencyCode,
              amount: amount,
              region_id: existingPrice?.region_id
            })
          }
        }
      })

      if (variantPrices.length === 0) return

      // Update single variant
      const response = await fetch(`/admin/products/${id}/variants/bulk-prices`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updates: [{
            variantId: variantId,
            prices: variantPrices
          }]
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update prices")
      }

      // Refresh product data
      await fetchProduct()
    } catch (error) {
      console.error("Error updating prices:", error)
      alert("Failed to update prices. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAll = async () => {
    if (!product) return

    setSaving(true)
    try {
      // Collect all price updates
      const updates: Array<{ variantId: string; prices: VariantPrice[] }> = []

      product.variants?.forEach((variant) => {
        const variantPrices: VariantPrice[] = []
        
        currencies.forEach((currencyCode) => {
          const newPrice = editedPrices[variant.id]?.[currencyCode]
          if (newPrice !== undefined && newPrice !== "") {
            const amount = Math.round(parseFloat(newPrice) * 100)
            if (!isNaN(amount)) {
              // Find existing price to preserve region_id if it exists
              const existingPrice = variant.prices?.find(p => p.currency_code === currencyCode)
              variantPrices.push({
                currency_code: currencyCode,
                amount: amount,
                region_id: existingPrice?.region_id
              })
            }
          }
        })

        if (variantPrices.length > 0) {
          updates.push({
            variantId: variant.id,
            prices: variantPrices
          })
        }
      })

      // Bulk update all variants at once
      const response = await fetch(`/admin/products/${id}/variants/bulk-prices`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updates
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update prices")
      }

      const result = await response.json()
      
      // Check if any updates failed
      const failedUpdates = result.results?.filter((r: any) => !r.success)
      if (failedUpdates && failedUpdates.length > 0) {
        throw new Error(`Some price updates failed: ${failedUpdates.map((r: any) => r.error).join(", ")}`)
      }

      // Refresh product data
      await fetchProduct()
    } catch (error) {
      console.error("Error updating prices:", error)
      alert("Failed to update prices. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const getCurrentPrice = (variant: Variant, currencyCode: string): string => {
    const price = variant.prices?.find(p => p.currency_code === currencyCode)
    if (!price) return ""
    return editedPrices[variant.id]?.[currencyCode] ?? (price.amount / 100).toFixed(2)
  }

  const getVariantOptionValue = (variant: Variant): string => {
    if (!variant.options || variant.options.length === 0) return "Default"
    return variant.options.map(opt => opt.value).join(", ")
  }

  const hasVariantChanges = (variantId: string): boolean => {
    if (!product) return false
    const variant = product.variants?.find(v => v.id === variantId)
    if (!variant) return false
    
    return currencies.some((currencyCode) => {
      const currentPrice = variant.prices?.find(p => p.currency_code === currencyCode)
      const editedPrice = editedPrices[variantId]?.[currencyCode]
      
      if (currentPrice && editedPrice) {
        return (currentPrice.amount / 100).toFixed(2) !== editedPrice
      }
      return false
    })
  }

  const hasChanges = (): boolean => {
    if (!product) return false
    
    return product.variants?.some((variant) => {
      return currencies.some((currencyCode) => {
        const currentPrice = variant.prices?.find(p => p.currency_code === currencyCode)
        const editedPrice = editedPrices[variant.id]?.[currencyCode]
        
        if (currentPrice && editedPrice) {
          return (currentPrice.amount / 100).toFixed(2) !== editedPrice
        }
        return false
      })
    }) ?? false
  }

  if (loading) {
    return null
  }

  if (!product || !product.variants || product.variants.length === 0) {
    return null
  }

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heading level="h2" className="text-ui-fg-base">
            Variant Pricing
          </Heading>
          <span className="text-ui-fg-subtle text-sm" title="Edit variant prices directly in the table below">
            ℹ️
          </span>
        </div>
        {hasChanges() && (
          <Button
            onClick={handleSaveAll}
            disabled={saving}
            variant="primary"
            size="small"
          >
            {saving ? "Saving..." : "Save All Changes"}
          </Button>
        )}
      </div>

      <div className="border border-ui-border-base rounded-lg overflow-hidden">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>SKU</Table.HeaderCell>
              <Table.HeaderCell>Size</Table.HeaderCell>
              {currencies.map((currency) => (
                <Table.HeaderCell key={currency} className="text-right">
                  Price ({currency.toUpperCase()})
                </Table.HeaderCell>
              ))}
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {product.variants.map((variant) => (
              <Table.Row key={variant.id}>
                <Table.Cell>
                  <Text size="small" weight="plus" className="text-ui-fg-base">
                    {variant.title || "Untitled"}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="small" className="text-ui-fg-subtle">
                    {variant.sku || "-"}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-ui-bg-subtle border border-ui-border-base">
                    <Text size="xsmall" className="text-ui-fg-subtle">
                      {getVariantOptionValue(variant)}
                    </Text>
                  </div>
                </Table.Cell>
                {currencies.map((currency) => (
                  <Table.Cell key={`${variant.id}-${currency}`}>
                    <div className="flex items-center justify-end gap-2">
                      <Text size="xsmall" className="text-ui-fg-muted">
                        {currency.toUpperCase()}
                      </Text>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={getCurrentPrice(variant, currency)}
                        onChange={(e) => handlePriceChange(variant.id, currency, e.target.value)}
                        className="w-28 text-right"
                        placeholder="0.00"
                        size="small"
                      />
                    </div>
                  </Table.Cell>
                ))}
                <Table.Cell>
                  {hasVariantChanges(variant.id) && (
                    <Button
                      onClick={() => handleSaveVariant(variant.id)}
                      disabled={saving}
                      variant="secondary"
                      size="small"
                    >
                      Save
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className="mt-3 text-xs text-ui-fg-subtle">
        <Text size="xsmall" className="text-ui-fg-muted">
          ℹ️ Edit prices directly in the table above. Changes are saved per variant or click "Save All Changes" to update all variants at once.
        </Text>
      </div>
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default VariantPriceEditor

