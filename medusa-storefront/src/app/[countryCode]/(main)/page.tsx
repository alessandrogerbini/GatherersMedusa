import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import BrandStory from "@modules/home/components/brand-story"
import ValuesSection from "@modules/home/components/values-section"
import Testimonials from "@modules/home/components/testimonials"
import SocialProof from "@modules/home/components/social-proof"
import NewsletterSection from "@modules/home/components/newsletter-section"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Gatherer's Granola - Handcrafted Artisan Granola | Family Recipes",
  description:
    "Discover premium handcrafted granola made with family recipes and natural ingredients. Small-batch artisan granola, hand-stirred with care.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!region) {
    // Region not found - this shouldn't happen but handle gracefully
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gatherers-brown mb-4">Loading...</h1>
          <p className="text-gatherers-brown-light">Please refresh the page</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Hero />
      <SocialProof />
      <BrandStory />
      <div className="py-16 bg-white">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="heading-section">Shop Our Granola</h2>
            <p className="text-body max-w-2xl mx-auto mt-4">
              Explore our collection of handcrafted granola varieties, each made with love and the finest ingredients.
            </p>
            <div className="mt-6">
              <LocalizedClientLink href="/store">
                <button className="btn-primary">
                  Shop All Products
                </button>
              </LocalizedClientLink>
            </div>
          </div>
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      </div>
      <ValuesSection />
      <Testimonials />
      <NewsletterSection />
    </>
  )
}
