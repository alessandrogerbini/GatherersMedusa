import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"
import WholesaleBadge from "@modules/products/components/wholesale-badge"
import WholesaleInfo from "@modules/products/components/wholesale-info"

/**
 * Fetches real time pricing for a product and renders the product actions component.
 */
export default async function ProductActionsWrapper({
  id,
  region,
}: {
  id: string
  region: HttpTypes.StoreRegion
}) {
  const product = await listProducts({
    queryParams: { id: [id] },
    regionId: region.id,
  }).then(({ response }) => response.products[0])

  if (!product) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-4">
      <WholesaleBadge />
      <ProductActions product={product} region={region} />
      <WholesaleInfo />
    </div>
  )
}
