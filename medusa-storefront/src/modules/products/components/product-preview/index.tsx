import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import ProductCardWrapper from "./product-card-wrapper"

export type BadgeType = "bestseller" | "new" | "limited" | "sale" | null

export default async function ProductPreview({
  product,
  isFeatured,
  region,
  badge,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  badge?: BadgeType
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
      <ProductCardWrapper badge={badge}>
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex txt-compact-medium mt-4 justify-between items-start">
          <Text 
            className="text-gatherers-brown font-dm-sans font-medium group-hover:text-gatherers-orange transition-colors duration-200" 
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </ProductCardWrapper>
    </LocalizedClientLink>
  )
}
