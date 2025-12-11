import { Suspense } from "react"
import Image from "next/image"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const isNYBS = collection.handle === "NYBS" || collection.title?.toLowerCase() === "nybs"

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        {/* NYBS Logo Header */}
        {isNYBS ? (
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-3xl">
              <Image
                src="/images/brand/nybs/NYBS header.png"
                alt={collection.title || "NYBS - New York's Best Snacks"}
                width={800}
                height={200}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        ) : (
          <div className="mb-8 text-2xl-semi">
            <h1>{collection.title}</h1>
          </div>
        )}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
