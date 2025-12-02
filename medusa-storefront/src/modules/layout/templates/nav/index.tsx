import { Suspense } from "react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto border-b duration-200 bg-white border-ui-border-base shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* Mobile Menu */}
          <div className="flex-1 basis-0 h-full flex items-center small:hidden">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              data-testid="nav-store-link"
            >
              <Image
                src="/images/brand/Chipmunk logo 500 x 500 px.png"
                alt="Gatherer's Granola Chipmunk"
                width={56}
                height={56}
                className="h-12 w-12 small:h-14 small:w-14"
                priority
              />
              <Image
                src="/images/brand/Full color gg logo without cc icon large.png"
                alt="Gatherer's Granola"
                width={200}
                height={60}
                className="h-14 w-auto small:h-16"
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden small:flex items-center gap-x-8 h-full absolute left-1/2 transform -translate-x-1/2 font-ibm-plex-condensed">
            <LocalizedClientLink
              className="text-xl font-normal text-gatherers-brown hover:text-gatherers-orange transition-colors"
              href="/store"
              data-testid="nav-granola-link"
            >
              Granola
            </LocalizedClientLink>
            <LocalizedClientLink
              className="text-xl font-normal text-gatherers-brown hover:text-gatherers-orange transition-colors"
              href="/orgin"
              data-testid="nav-organic-link"
            >
              Organic Products
            </LocalizedClientLink>
            <LocalizedClientLink
              className="text-xl font-normal text-gatherers-brown hover:text-gatherers-orange transition-colors"
              href="/nybs"
              data-testid="nav-nuts-link"
            >
              Nuts
            </LocalizedClientLink>
            <LocalizedClientLink
              className="text-xl font-normal text-gatherers-brown hover:text-gatherers-orange transition-colors"
              href="/about"
              data-testid="nav-about-link"
            >
              About
            </LocalizedClientLink>
            <LocalizedClientLink
              className="text-xl font-normal text-gatherers-brown hover:text-gatherers-orange transition-colors"
              href="/contact"
              data-testid="nav-contact-link"
            >
              Contact
            </LocalizedClientLink>
            <LocalizedClientLink
              className="text-xl font-normal text-gatherers-brown hover:text-gatherers-orange transition-colors"
              href="/wholesale"
              data-testid="nav-wholesale-link"
            >
              Wholesale
            </LocalizedClientLink>
          </div>
          {/* Account & Cart */}
          <div className="flex items-center gap-x-4 small:gap-x-6 h-full flex-1 basis-0 justify-end font-ibm-plex-condensed">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="text-xl font-normal text-gatherers-brown hover:text-gatherers-orange transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-base font-medium text-gatherers-brown hover:text-gatherers-orange transition-colors flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
