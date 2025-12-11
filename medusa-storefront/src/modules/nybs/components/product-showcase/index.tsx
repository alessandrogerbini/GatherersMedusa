"use client"

import { useState, useMemo } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import Thumbnail from "@modules/products/components/thumbnail"
import { getProductPrice } from "@lib/util/get-product-price"

type SnackCategory = "All" | "Nuts" | "Keto Granola"

interface ProductShowcaseProps {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion | null
}

// Helper function to parse product title and extract size info
const parseProductTitle = (title: string) => {
  if (!title) return { displayTitle: "", sizeInfo: "", hasTM: false }
  
  // Extract size info (e.g., ", 3.5oz", ", 5oz", etc.)
  const sizeMatch = title.match(/,\s*([\d.]+oz)/i)
  const sizeInfo = sizeMatch ? sizeMatch[1] : ""
  
  // Remove size info from title
  let displayTitle = title.replace(/,\s*[\d.]+oz/gi, "").trim()
  
  // Check for TM
  const hasTM = displayTitle.includes("TM")
  
  // Replace TM with styled version
  if (hasTM) {
    displayTitle = displayTitle.replace(/TM/g, '<sup class="text-[0.4em]">TM</sup>')
  }
  
  return { displayTitle, sizeInfo, hasTM }
}

const ProductShowcase = ({ products, region }: ProductShowcaseProps) => {
  const [selectedCategory, setSelectedCategory] = useState<SnackCategory>("All")

  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = new Set<SnackCategory>(["All"])
    products.forEach((product) => {
      // Check product title or tags for category
      const title = product.title?.toUpperCase() || ""
      if (title.includes("KETO") || title.includes("GRANOLA")) {
        cats.add("Keto Granola")
      } else if (title.includes("NUT") || title.includes("CASHEW") || title.includes("ALMOND")) {
        cats.add("Nuts")
      }
    })
    return Array.from(cats) as SnackCategory[]
  }, [products])

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products
    }
    return products.filter((product) => {
      const title = product.title?.toUpperCase() || ""
      if (selectedCategory === "Keto Granola") {
        return title.includes("KETO") || title.includes("GRANOLA")
      }
      if (selectedCategory === "Nuts") {
        return title.includes("NUT") || title.includes("CASHEW") || title.includes("ALMOND")
      }
      return true
    })
  }, [products, selectedCategory])

  return (
    <section className="section-container newsprint-bg" aria-labelledby="nybs-products-heading">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-nybs-black text-white px-8 py-3 mb-4">
            <span className="text-sm font-bold uppercase tracking-widest">
              Classified Ads - Snack Section
            </span>
          </div>
          <h2 id="nybs-products-heading" className="nybs-heading-section mb-4">
            WANTED:
            <br />
            SNACK LOVERS
          </h2>
          <p className="text-xl font-bold text-nybs-black-ink max-w-2xl mx-auto">
            Must Love Bold Flavors. No Boring Taste Buds Allowed. NYC Attitude Required.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 font-bold uppercase text-sm border-2 transition-all ${
                selectedCategory === category
                  ? "bg-nybs-red text-white border-nybs-red"
                  : "bg-white text-nybs-black border-nybs-black hover:bg-nybs-black hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              if (!product.handle) return null
              
              const { cheapestPrice } = getProductPrice({ product })
              const isNew = product.created_at ? 
                new Date(product.created_at).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000 : false
              const isBestseller = product.metadata?.bestseller === "true" || 
                                   product.tags?.some(tag => tag.value?.toLowerCase().includes("bestseller"))
              
              // Parse product title once
              const parsedTitle = parseProductTitle(product.title || "")
              
              // Determine category from title
              const title = product.title?.toUpperCase() || ""
              const category = title.includes("KETO") || title.includes("GRANOLA") 
                ? "Keto Granola" 
                : "Nuts"

              // Get flavor text (priority: subtitle > metadata.flavor_text > description excerpt)
              const flavorText = product.subtitle || 
                                product.metadata?.flavor_text || 
                                (product.description ? product.description.substring(0, 100) + (product.description.length > 100 ? '...' : '') : null)

              return (
                <LocalizedClientLink href={`/products/${product.handle}`} key={product.id}>
                  <div className="group cursor-pointer">
                    <div className="newsprint-card p-6 hover:border-nybs-red transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                      {/* Badges */}
                      <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                        {isNew && (
                          <span className="bg-nybs-red text-white text-xs font-bold px-3 py-1 uppercase">
                            NEW!
                          </span>
                        )}
                        {isBestseller && (
                          <span className="bg-nybs-black text-white text-xs font-bold px-3 py-1 uppercase">
                            HOT!
                          </span>
                        )}
                      </div>

                      {/* Product Image */}
                      <div className="bg-white border-4 border-nybs-black aspect-square mb-4 group-hover:border-nybs-red transition-colors overflow-hidden">
                        <Thumbnail
                          thumbnail={product.thumbnail}
                          images={product.images}
                          size="full"
                          className="!p-0 !rounded-none"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 
                            className="text-xl font-black uppercase leading-tight group-hover:text-nybs-red transition-colors flex-1"
                            dangerouslySetInnerHTML={{ 
                              __html: parsedTitle.displayTitle 
                            }}
                          />
                          {parsedTitle.sizeInfo && (
                            <span className="text-[0.7em] text-gray-500 font-normal whitespace-nowrap">
                              {parsedTitle.sizeInfo}
                            </span>
                          )}
                        </div>
                        
                        {/* Flavor text */}
                        {flavorText && (
                          <p className="text-sm text-gray-600 italic leading-relaxed">
                            {flavorText}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          {cheapestPrice && (
                            <div className="flex flex-col">
                              {cheapestPrice.price_type === "sale" && cheapestPrice.original_price && (
                                <span className="text-sm line-through text-gray-500">
                                  {cheapestPrice.original_price}
                                </span>
                              )}
                              <span className="text-2xl font-black text-nybs-red">
                                {cheapestPrice.calculated_price}
                              </span>
                            </div>
                          )}
                          <span className="text-xs font-bold uppercase bg-nybs-black text-white px-3 py-1">
                            {category}
                          </span>
                        </div>

                        <button className="w-full btn-nybs-primary text-sm py-2 group-hover:bg-nybs-red-dark">
                          View Product
                        </button>
                      </div>

                      {/* Newspaper texture overlay on hover */}
                      <div className="absolute inset-0 bg-nybs-red opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>
                </LocalizedClientLink>
              )
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg font-bold text-nybs-black-ink">
                No products found in this category.
              </p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white border-4 border-nybs-black p-8 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black uppercase mb-4">
              CAN&apos;T DECIDE?
            </h3>
            <p className="text-lg font-bold mb-6">
              Try our variety pack and taste the whole city! One bite and you&apos;ll understand 
              why New Yorkers are so proud of our food.
            </p>
            <LocalizedClientLink href="/collections/NYBS">
              <button className="btn-nybs-primary text-lg px-10 py-4">
                Shop All Snacks
              </button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase

