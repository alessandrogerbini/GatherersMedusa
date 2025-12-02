import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text } from "@medusajs/ui"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-gatherers-cream border-t border-gatherers-cream-dark w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-8 py-12 md:py-16">
          {/* Top Section: Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-4 pb-8 border-b border-gatherers-cream-dark">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/brand/Chipmunk logo 500 x 500 px.png"
                alt="Gatherer's Granola"
                width={60}
                height={60}
                className="w-12 h-12"
              />
              <span className="text-2xl font-bold text-gatherers-brown font-fraunces">
                Gatherer&apos;s Granola
              </span>
            </LocalizedClientLink>
            <p className="text-base text-gatherers-brown-light italic text-center md:text-left font-dm-sans">
              Family Recipes. Hand Stirred.
            </p>
          </div>

          {/* Main Footer Content - Simplified to 4 columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Brands Section */}
            <div className="flex flex-col gap-y-3">
              <span className="text-base font-semibold text-gatherers-brown font-fraunces">
                Our Brands
              </span>
              <ul className="flex flex-col gap-2 font-dm-sans">
                <li>
                  <LocalizedClientLink
                    className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                    href="/"
                  >
                    Gatherer&apos;s Granola
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm text-orgin-green hover:text-orgin-green-light transition-colors"
                    href="/orgin"
                  >
                    Orgin Organics
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm font-bold text-nybs-red hover:text-nybs-red-dark transition-colors uppercase"
                    href="/nybs"
                  >
                    NYBS
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                    href="/store"
                  >
                    Shop All Products
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Shop Section */}
            <div className="flex flex-col gap-y-3">
              <span className="text-base font-semibold text-gatherers-brown font-fraunces">
                Shop
              </span>
              <ul className="flex flex-col gap-2 font-dm-sans">
                {collections && collections.length > 0 && (
                  <>
                    {collections?.slice(0, 4).map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                          href={`/collections/${c.handle}`}
                        >
                          {c.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </>
                )}
                {productCategories && productCategories?.slice(0, 2).map((c) => {
                  if (c.parent_category) return null
                  return (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                        href={`/categories/${c.handle}`}
                      >
                        {c.name}
                      </LocalizedClientLink>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Company Section */}
            <div className="flex flex-col gap-y-3">
              <span className="text-base font-semibold text-gatherers-brown font-fraunces">
                Company
              </span>
              <ul className="flex flex-col gap-2 font-dm-sans">
                <li>
                  <LocalizedClientLink
                    className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                    href="/about"
                  >
                    Our Story
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                    href="/contact"
                  >
                    Contact Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                    href="/wholesale"
                  >
                    Wholesale Program
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                    href="/terms"
                  >
                    Terms of Use
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                    href="/privacy"
                  >
                    Privacy Policy
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Account & Newsletter Section */}
            <div className="flex flex-col gap-y-3">
              <span className="text-base font-semibold text-gatherers-brown font-fraunces">
                Account
              </span>
              <ul className="flex flex-col gap-2 font-dm-sans">
                <li>
                  <LocalizedClientLink
                    className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                    href="/account"
                  >
                    My Account
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                    href="/account/orders"
                  >
                    Order History
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm text-gatherers-brown-light hover:text-gatherers-orange transition-colors"
                    href="/cart"
                  >
                    Shopping Cart
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-sm text-gatherers-orange hover:text-gatherers-orange-dark transition-colors font-medium"
                    href="/newsletter"
                  >
                    Join Our Newsletter
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row w-full py-6 justify-between items-center border-t border-gatherers-cream-dark gap-4">
          <Text className="text-sm text-gatherers-brown-light font-dm-sans">
            © {new Date().getFullYear()} Gatherer&apos;s Granola. All rights reserved.
          </Text>
          <Text className="text-sm text-gatherers-brown-light font-dm-sans">
            Handcrafted with care in small batches
          </Text>
        </div>
      </div>
    </footer>
  )
}
