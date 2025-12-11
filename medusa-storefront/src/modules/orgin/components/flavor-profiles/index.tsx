"use client"

import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const FlavorProfiles = () => {
  const [activeFlavor, setActiveFlavor] = useState(0)

  const flavors = [
    {
      name: "BBQ Cashew",
      tagline: "Smoky & Savory",
      description: "Our signature BBQ blend combines organic spices with a hint of sweetness for that perfect backyard barbecue taste.",
      ingredients: ["Organic Cashews", "Organic Cane Sugar", "Sea Salt", "Paprika", "Garlic", "Onion"],
      color: "from-red-700 to-red-900",
    },
    {
      name: "Everything Bagel Cashew",
      tagline: "Bold & Flavorful",
      description: "Inspired by the classic everything bagel, this blend features sesame, poppy seeds, and savory spices.",
      ingredients: ["Organic Cashews", "Sesame Seeds", "Poppy Seeds", "Garlic", "Onion", "Sea Salt"],
      color: "from-yellow-700 to-amber-800",
    },
    {
      name: "Honey Roasted Cashew",
      tagline: "Sweet & Crunchy",
      description: "Pure organic honey coats premium cashews for a naturally sweet, irresistibly crunchy snack.",
      ingredients: ["Organic Cashews", "Organic Honey", "Sea Salt"],
      color: "from-amber-600 to-orange-700",
    },
    {
      name: "Maple Masala Cashew",
      tagline: "Sweet Meets Spice",
      description: "A unique fusion of Canadian maple and Indian masala spices creates an unforgettable flavor journey.",
      ingredients: ["Organic Cashews", "Organic Maple Syrup", "Masala Spice Blend", "Sea Salt"],
      color: "from-orange-800 to-red-800",
    },
    {
      name: "Za'atar Cashew",
      tagline: "Middle Eastern Magic",
      description: "Traditional za'atar spice blend brings herbal, tangy notes to premium roasted cashews.",
      ingredients: ["Organic Cashews", "Za'atar", "Sumac", "Sesame", "Thyme", "Olive Oil"],
      color: "from-green-700 to-teal-800",
    },
    {
      name: "Provincial Pecan",
      tagline: "Herb-Infused Elegance",
      description: "Inspired by French herbs de Provence, these pecans offer a sophisticated savory experience.",
      ingredients: ["Organic Pecans", "Rosemary", "Thyme", "Lavender", "Sea Salt"],
      color: "from-purple-700 to-indigo-800",
    },
    {
      name: "Smoked Almonds",
      tagline: "Rich Smoky Depth",
      description: "Slowly smoked to perfection, these almonds deliver authentic smokehouse flavor in every bite.",
      ingredients: ["Organic Almonds", "Smoked Sea Salt", "Natural Smoke"],
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "Smoked Mixed Nuts",
      tagline: "The Ultimate Blend",
      description: "A premium mix of smoked cashews, almonds, and pecans for the ultimate snacking experience.",
      ingredients: ["Organic Cashews", "Organic Almonds", "Organic Pecans", "Smoked Sea Salt"],
      color: "from-stone-700 to-zinc-800",
    },
  ]

  const currentFlavor = flavors[activeFlavor]

  return (
    <section className="section-container bg-orgin-earth-cream">
      <div className="content-container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="orgin-heading-section">Flavor Profiles</h2>
            <p className="text-xl text-orgin-earth-brown max-w-3xl mx-auto">
              Each flavor is carefully crafted using organic spices and natural ingredients. 
              No artificial flavors, ever.
            </p>
          </div>

          {/* Flavor selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {flavors.map((flavor, index) => (
              <button
                key={index}
                onClick={() => setActiveFlavor(index)}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                  activeFlavor === index
                    ? "bg-orgin-green text-white shadow-lg scale-105"
                    : "bg-white text-orgin-green-dark hover:bg-orgin-green-lighter/30"
                }`}
              >
                {flavor.name}
              </button>
            ))}
          </div>

          {/* Active flavor card */}
          <div className={`bg-gradient-to-br ${currentFlavor.color} rounded-3xl p-8 md:p-12 text-white shadow-2xl transform transition-all duration-500`}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-4xl md:text-5xl font-bold mb-3">
                  {currentFlavor.name}
                </h3>
                <p className="text-2xl font-light italic text-white/90">
                  {currentFlavor.tagline}
                </p>
              </div>

              <p className="text-lg text-white/90 leading-relaxed mb-8 text-center max-w-2xl mx-auto">
                {currentFlavor.description}
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-xl font-semibold mb-4 text-center">
                  Organic Ingredients
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {currentFlavor.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <LocalizedClientLink href="/orgin/store">
                  <button className="px-8 py-3 bg-white text-orgin-green font-bold rounded-lg hover:bg-orgin-earth-cream transition-colors shadow-lg">
                    Try This Flavor
                  </button>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlavorProfiles

