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
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              data-testid="nav-store-link"
            >
              <Image
                src="/images/brand/Chipmunk logo 500 x 500 px.png"
                alt="Gatherer's Granola"
                width={50}
                height={50}
                className="w-10 h-10 small:w-12 small:h-12"
              />
              <span className="hidden md:block text-xl font-bold text-gatherers-brown">
                Gatherer&apos;s Granola
              </span>
            </LocalizedClientLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden small:flex items-center gap-x-8 h-full absolute left-1/2 transform -translate-x-1/2">
            <LocalizedClientLink
              className="text-base font-medium text-gatherers-brown hover:text-gatherers-orange transition-colors"
              href="/store"
              data-testid="nav-shop-link"
            >
              Shop
            </LocalizedClientLink>
            <LocalizedClientLink
              className="text-base font-medium text-orgin-green hover:text-orgin-green-light transition-colors"
              href="/orgin"
              data-testid="nav-orgin-link"
            >
              Orgin Organics
            </LocalizedClientLink>
            <LocalizedClientLink
              className="text-base font-bold text-nybs-red hover:text-nybs-red-dark transition-colors uppercase tracking-wide"
              href="/nybs"
              data-testid="nav-nybs-link"
            >
              NYBS
            </LocalizedClientLink>
            <LocalizedClientLink
              className="text-base font-medium text-gatherers-brown hover:text-gatherers-orange transition-colors"
              href="/about"
              data-testid="nav-about-link"
            >
              About
            </LocalizedClientLink>
            <LocalizedClientLink
              className="text-base font-medium text-gatherers-brown hover:text-gatherers-orange transition-colors"
              href="/contact"
              data-testid="nav-contact-link"
            >
              Contact
            </LocalizedClientLink>
          </div>
          {/* Account & Cart */}
          <div className="flex items-center gap-x-4 small:gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="text-base font-medium text-gatherers-brown hover:text-gatherers-orange transition-colors"
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
