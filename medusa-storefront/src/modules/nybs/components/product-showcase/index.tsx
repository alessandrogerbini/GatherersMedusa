"use client"

import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SnackCategory = "All" | "Nuts" | "Keto Granola"

interface Product {
  id: number
  name: string
  category: SnackCategory
  tagline: string
  price: string
  isNew?: boolean
  isBestseller?: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "EVERYTHING BAGEL CASHEWS",
    category: "Nuts",
    tagline: "NYC's Iconic Flavor on Premium Cashews!",
    price: "$8.99",
    isBestseller: true,
  },
  {
    id: 2,
    name: "SMOKED MIXED NUTS",
    category: "Nuts",
    tagline: "Deep Smoky Flavor, Classic NYC Style!",
    price: "$8.99",
  },
  {
    id: 3,
    name: "HONEY ROASTED CASHEWS",
    category: "Nuts",
    tagline: "Sweet Meets Savory, New York Approved!",
    price: "$8.99",
    isBestseller: true,
  },
  {
    id: 4,
    name: "RANCH CASHEWS",
    category: "Nuts",
    tagline: "Bold Ranch Flavor, NYC Attitude!",
    price: "$8.99",
  },
  {
    id: 5,
    name: "CINNAMON ALMOND KETO GRANOLA",
    category: "Keto Granola",
    tagline: "Low Carb, High Flavor, All NYC!",
    price: "$9.99",
    isNew: true,
  },
  {
    id: 6,
    name: "PEANUT BUTTER ALMOND KETO GRANOLA",
    category: "Keto Granola",
    tagline: "Keto-Friendly, Taste-Approved!",
    price: "$9.99",
    isNew: true,
  },
]

const ProductShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<SnackCategory>("All")

  const categories: SnackCategory[] = ["All", "Nuts", "Keto Granola"]

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory)

  return (
    <section className="section-container newsprint-bg">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-nybs-black text-white px-8 py-3 mb-4">
            <span className="text-sm font-bold uppercase tracking-widest">
              Classified Ads - Snack Section
            </span>
          </div>
          <h2 className="nybs-heading-section mb-4">
            WANTED:
            <br />
            SNACK LOVERS
          </h2>
          <p className="text-xl font-bold text-nybs-black-ink max-w-2xl mx-auto">
            Must Love Bold Flavors. No Boring Taste Buds Allowed.
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
          {filteredProducts.map((product) => (
            <LocalizedClientLink href="/store" key={product.id}>
              <div className="group cursor-pointer">
                <div className="newsprint-card p-6 hover:border-nybs-red transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                    {product.isNew && (
                      <span className="bg-nybs-red text-white text-xs font-bold px-3 py-1 uppercase">
                        NEW!
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-nybs-black text-white text-xs font-bold px-3 py-1 uppercase">
                        HOT!
                      </span>
                    )}
                  </div>

                  {/* Product Image Placeholder */}
                  <div className="bg-white border-4 border-nybs-black aspect-square flex items-center justify-center mb-4 group-hover:border-nybs-red transition-colors">
                    <div className="text-center p-4">
                      <span className="text-6xl block mb-2">📰</span>
                      <span className="text-xs font-bold uppercase">Product Photo</span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-black uppercase leading-tight group-hover:text-nybs-red transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="border-y-2 border-nybs-black py-2">
                      <p className="text-sm font-bold italic">{product.tagline}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-nybs-red">
                        {product.price}
                      </span>
                      <span className="text-xs font-bold uppercase bg-nybs-black text-white px-3 py-1">
                        {product.category}
                      </span>
                    </div>

                    <button className="w-full btn-nybs-primary text-sm py-2 group-hover:bg-nybs-red-dark">
                      Add to Cart
                    </button>
                  </div>

                  {/* Newspaper texture overlay on hover */}
                  <div className="absolute inset-0 bg-nybs-red opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white border-4 border-nybs-black p-8 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black uppercase mb-4">
              CAN&apos;T DECIDE?
            </h3>
            <p className="text-lg font-bold mb-6">
              Try our variety pack and taste the whole city!
            </p>
            <LocalizedClientLink href="/store">
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

