"use client"

import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CompanyLogosProps = {
  cart: HttpTypes.StoreCart | null
}

// Map collection handles/titles to company logos
const getCompanyLogo = (collectionHandle?: string | null, collectionTitle?: string | null) => {
  if (!collectionHandle && !collectionTitle) return null

  const handle = collectionHandle || ""
  const title = collectionTitle?.toLowerCase() || ""

  // Check for NYBS (matching pattern from collection template)
  if (handle === "NYBS" || title === "nybs") {
    return {
      src: "/images/brand/nybs/NYBS header.png",
      alt: "NYBS - New York's Best Snacks",
      width: 200,
      height: 50,
    }
  }

  // Check for Orgin
  if (handle.toLowerCase() === "orgin" || title === "orgin" || title.includes("orgin")) {
    return {
      src: "/images/brand/orgin/Orgin Logo Green.png",
      alt: "Orgin",
      width: 150,
      height: 50,
    }
  }

  // Check for Gatherer's / Granola
  if (
    handle.toLowerCase() === "granola" ||
    title === "granola" ||
    title.includes("granola") ||
    handle.toLowerCase() === "gatherers" ||
    title === "gatherer's" ||
    title.includes("gatherer")
  ) {
    return {
      src: "/images/brand/Full color gg logo with cc icon.png",
      alt: "Gatherer's Gourmet Granola",
      width: 150,
      height: 50,
    }
  }

  return null
}

export default function CompanyLogos({ cart }: CompanyLogosProps) {
  if (!cart?.items || cart.items.length === 0) {
    return null
  }

  // Extract unique collections from cart items
  const uniqueCollections = new Map<
    string,
    { handle?: string | null; title?: string | null }
  >()

  cart.items.forEach((item) => {
    // Check both possible paths for collection
    const collection = item.product?.collection || item.variant?.product?.collection
    if (collection) {
      const key = collection.handle || collection.title || collection.id
      if (key && !uniqueCollections.has(key)) {
        uniqueCollections.set(key, {
          handle: collection.handle,
          title: collection.title,
        })
      }
    }
  })

  // Get logos for each unique collection
  const logos = Array.from(uniqueCollections.values())
    .map((collection) => getCompanyLogo(collection.handle, collection.title))
    .filter((logo): logo is NonNullable<typeof logo> => logo !== null)

  // If no logos found, show fallback text
  if (logos.length === 0) {
    return (
      <LocalizedClientLink
        href="/"
        className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
        data-testid="store-link"
      >
        Gatherer's
      </LocalizedClientLink>
    )
  }

  return (
    <div className="flex items-center gap-x-4">
      {logos.map((logo, index) => (
        <div key={index} className="flex items-center">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-auto object-contain"
            style={{ maxHeight: "50px" }}
          />
        </div>
      ))}
    </div>
  )
}

