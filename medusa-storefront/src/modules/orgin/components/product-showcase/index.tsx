"use client"

import { useState } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ProductShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("all")

  const products = [
    {
      name: "BBQ Cashew",
      category: "cashews",
      image: "/images/products/orgin/Orgin BBQ Cashew.jpg",
      description: "Smoky, savory perfection",
    },
    {
      name: "Everything Bagel Cashew",
      category: "cashews",
      image: "/images/products/orgin/Orgin Everything Bagel Cashew.jpg",
      description: "Bold and flavorful",
    },
    {
      name: "Honey Roasted Cashew",
      category: "cashews",
      image: "/images/products/orgin/Orgin Honey Roasted Cashew.jpg",
      description: "Sweet and crunchy",
    },
    {
      name: "Maple Masala Cashew",
      category: "cashews",
      image: "/images/products/orgin/Orgin Maple Masala Cashews.jpg",
      description: "Sweet meets spice",
    },
    {
      name: "Za'atar Cashew",
      category: "cashews",
      image: "/images/products/orgin/Orgin Zaatar Cashew.jpg",
      description: "Middle Eastern inspired",
    },
    {
      name: "Provincial Pecan",
      category: "pecans",
      image: "/images/products/orgin/Orgin Provincial Pecan.jpg",
      description: "Herb-infused elegance",
    },
    {
      name: "Smoked Almonds",
      category: "almonds",
      image: "/images/products/orgin/Orgin Smoked Almonds.jpg",
      description: "Rich smoky flavor",
    },
    {
      name: "Mixed Nuts",
      category: "mixed",
      image: "/images/products/orgin/Orgin Mixed Nuts.jpg",
      description: "Best of all worlds",
    },
  ]

  const filters = [
    { id: "all", label: "All Products" },
    { id: "cashews", label: "Cashews" },
    { id: "almonds", label: "Almonds" },
    { id: "pecans", label: "Pecans" },
    { id: "mixed", label: "Mixed Nuts" },
  ]

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter)

  return (
    <section className="section-container bg-orgin-earth">
      <div className="content-container">
        <div className="text-center mb-12">
          <h2 className="orgin-heading-section">Our Organic Collection</h2>
          <p className="text-xl text-orgin-earth-brown max-w-3xl mx-auto">
            Explore our range of USDA-certified organic nuts, each carefully roasted 
            and flavored with premium, all-natural ingredients.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeFilter === filter.id
                  ? "bg-orgin-green text-white shadow-lg"
                  : "bg-white text-orgin-green hover:bg-orgin-green-lighter hover:text-orgin-green-dark"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative aspect-square overflow-hidden bg-orgin-earth-cream">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Organic badge */}
                <div className="absolute top-3 right-3 bg-orgin-green text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  USDA Organic
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-orgin-green-dark mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-orgin-earth-brown mb-4">
                  {product.description}
                </p>
                <LocalizedClientLink href="/store">
                  <button className="w-full btn-orgin-secondary text-sm py-2">
                    View Details
                  </button>
                </LocalizedClientLink>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <LocalizedClientLink href="/store">
            <button className="btn-orgin-primary text-lg">
              Shop All Organic Nuts
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase

