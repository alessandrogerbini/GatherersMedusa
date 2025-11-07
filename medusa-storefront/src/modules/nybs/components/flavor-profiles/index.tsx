"use client"

import { useState } from "react"

interface Flavor {
  id: number
  name: string
  headline: string
  story: string
  ingredients: string[]
  borough: string
  spiceLevel: number
}

const flavors: Flavor[] = [
  {
    id: 1,
    name: "Everything Bagel Cashews",
    headline: "EVERYTHING BAGEL CRAZE HITS CASHEWS!",
    story: "In a shocking turn of events, NYC's iconic bagel flavor has transformed premium cashews into the city's most talked-about snack. Witnesses report feelings of intense satisfaction and an irresistible urge to buy more. Experts say it's the perfect blend of sesame, poppy seeds, and pure New York magic on the finest cashews money can buy.",
    ingredients: ["Premium Cashews", "Sesame Seeds", "Poppy Seeds", "Garlic", "Onion", "Sea Salt"],
    borough: "Manhattan",
    spiceLevel: 1,
  },
  {
    id: 2,
    name: "Smoked Mixed Nuts",
    headline: "SMOKE SIGNALS FROM NYC: MIXED NUTS GET BOLD!",
    story: "Local snack artisans have captured the essence of NYC smokehouse tradition in every handful. This classic combination has been declared 'impossibly good' by the Daily Snacker. Deep smoky flavor meets premium mixed nuts in the ultimate New York union.",
    ingredients: ["Mixed Nuts", "Natural Smoke", "Sea Salt", "Spices"],
    borough: "Brooklyn",
    spiceLevel: 1,
  },
  {
    id: 3,
    name: "Honey Roasted Cashews",
    headline: "SWEET SENSATION SWEEPS THE CITY!",
    story: "The perfect balance of sweet honey and roasted perfection has taken Manhattan by storm. Food critics are calling this the 'gold standard' of honey roasted nuts. Sources close to the development team report this flavor 'hits different' and may cause spontaneous snacking.",
    ingredients: ["Premium Cashews", "Pure Honey", "Brown Sugar", "Sea Salt"],
    borough: "Manhattan",
    spiceLevel: 1,
  },
  {
    id: 4,
    name: "Ranch Cashews",
    headline: "RANCH REVOLUTION ROCKS NYC SNACK SCENE!",
    story: "Who says New Yorkers don't do ranch? We took this classic flavor and gave it the NYC treatment on premium cashews. Bold, tangy, and unapologetically delicious. Warning: May cause intense cravings and endless compliments.",
    ingredients: ["Premium Cashews", "Ranch Seasoning", "Buttermilk Powder", "Herbs", "Garlic"],
    borough: "Queens",
    spiceLevel: 1,
  },
  {
    id: 5,
    name: "Cinnamon Almond Keto",
    headline: "KETO CRAZE HITS NYC: LOW CARB NEVER TASTED SO GOOD!",
    story: "Breaking news from the health food scene: NYC has created a keto granola that actually tastes incredible. Sweet cinnamon meets crunchy almonds in this guilt-free masterpiece. Nutritionists are shocked. New Yorkers are thrilled.",
    ingredients: ["Almonds", "Cinnamon", "Monk Fruit", "Coconut", "Seeds"],
    borough: "Manhattan",
    spiceLevel: 0,
  },
  {
    id: 6,
    name: "Peanut Butter Almond Keto",
    headline: "PEANUT BUTTER BREAKTHROUGH: KETO-FRIENDLY FLAVOR BOMB!",
    story: "In an unprecedented move, NYC snack innovators have combined the irresistible taste of peanut butter with keto-friendly ingredients. The result? A granola so good, you'll forget it's healthy. Fitness enthusiasts and food lovers unite!",
    ingredients: ["Almonds", "Peanut Butter", "Monk Fruit", "Protein", "Seeds"],
    borough: "Brooklyn",
    spiceLevel: 0,
  },
]

const FlavorProfiles = () => {
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor>(flavors[0])

  return (
    <section className="section-container bg-white">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="bg-nybs-black text-white inline-block px-6 py-2 mb-4">
            <span className="text-sm font-bold uppercase tracking-widest">
              Feature Stories
            </span>
          </div>
          <h2 className="nybs-heading-section mb-4">
            FLAVOR PROFILES:
            <br />
            THE INSIDE SCOOP
          </h2>
          <p className="text-xl font-bold text-nybs-black-ink">
            Exclusive Reports on NYC&apos;s Most Talked-About Tastes
          </p>
        </div>

        {/* Flavor Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {flavors.map((flavor) => (
            <button
              key={flavor.id}
              onClick={() => setSelectedFlavor(flavor)}
              className={`p-4 border-4 font-black uppercase text-xs transition-all ${
                selectedFlavor.id === flavor.id
                  ? "bg-nybs-red text-white border-nybs-red"
                  : "bg-nybs-newsprint text-nybs-black border-nybs-black hover:border-nybs-red"
              }`}
            >
              {flavor.name}
            </button>
          ))}
        </div>

        {/* Main Feature Article */}
        <div className="newsprint-card p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Headline */}
            <div className="border-y-4 border-nybs-black py-6 mb-6">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  {selectedFlavor.borough} Edition
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  Breaking News
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight text-nybs-black">
                {selectedFlavor.headline}
              </h3>
            </div>

            {/* Feature Story Content */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Story - 2 columns */}
              <div className="md:col-span-2 space-y-4">
                <p className="text-lg md:text-xl font-bold text-nybs-black-ink leading-relaxed first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-nybs-red">
                  {selectedFlavor.story}
                </p>

                {/* Spice Level Indicator */}
                {selectedFlavor.spiceLevel > 0 && (
                  <div className="bg-white border-2 border-nybs-black p-4">
                    <h4 className="font-black uppercase text-sm mb-2">Heat Index:</h4>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <span
                          key={level}
                          className={`text-2xl font-black text-nybs-red ${
                            level <= selectedFlavor.spiceLevel
                              ? "opacity-100"
                              : "opacity-20"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 font-bold text-sm">
                        {selectedFlavor.spiceLevel === 1 && "Mild"}
                        {selectedFlavor.spiceLevel === 2 && "Medium"}
                        {selectedFlavor.spiceLevel === 3 && "Hot"}
                        {selectedFlavor.spiceLevel === 4 && "Extra Hot"}
                        {selectedFlavor.spiceLevel === 5 && "Inferno"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Investigative Details */}
                <div className="bg-nybs-newsprint border-l-4 border-nybs-red p-4">
                  <h4 className="font-black uppercase text-sm mb-2">
                    Investigative Report - Key Ingredients:
                  </h4>
                  <ul className="space-y-1">
                    {selectedFlavor.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm font-bold flex items-center gap-2">
                        <span className="text-nybs-red">▪</span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-6">
                {/* Borough Badge */}
                <div className="bg-nybs-black text-white p-6 text-center">
                  <span className="text-xs font-bold uppercase block mb-2">
                    Proudly From
                  </span>
                  <span className="text-2xl font-black uppercase block">
                    {selectedFlavor.borough}
                  </span>
                  <span className="text-5xl font-black block mt-2 text-nybs-red">★</span>
                </div>

                {/* Quote Box */}
                <div className="border-4 border-nybs-black p-4 bg-white">
                  <span className="text-xs font-bold uppercase tracking-wider block mb-2">
                    What They&apos;re Saying:
                  </span>
                  <blockquote className="text-sm italic mb-2">
                    &quot;I can&apos;t stop eating these. Send help.&quot;
                  </blockquote>
                  <cite className="text-xs font-bold not-italic">
                    - Every New Yorker
                  </cite>
                </div>

                {/* Try It Box */}
                <div className="bg-nybs-red text-white p-6 text-center">
                  <h4 className="font-black uppercase text-lg mb-3">
                    Try This Flavor!
                  </h4>
                  <button className="bg-white text-nybs-red font-bold px-6 py-3 uppercase text-sm hover:bg-nybs-black hover:text-white transition-colors w-full">
                    Add to Cart
                  </button>
                </div>

                {/* More Coverage */}
                <div className="border-2 border-nybs-black p-4 bg-nybs-newsprint-light text-center">
                  <span className="text-xs font-bold uppercase block">
                    More Coverage on Page 2
                  </span>
                  <span className="text-xs">→ See Full Flavor Lineup →</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-nybs-black text-white p-8 border-4 border-nybs-red max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-4">
              READ ALL ABOUT IT!
            </h3>
            <p className="text-lg mb-6">
              Every flavor tells a New York story. Which one is yours?
            </p>
            <button className="bg-nybs-red text-white font-bold px-8 py-3 uppercase hover:bg-white hover:text-nybs-red transition-colors border-2 border-white">
              Shop All Flavors
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlavorProfiles

