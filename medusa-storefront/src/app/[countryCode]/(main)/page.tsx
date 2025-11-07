import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import BrandStory from "@modules/home/components/brand-story"
import ValuesSection from "@modules/home/components/values-section"
import Testimonials from "@modules/home/components/testimonials"
import NewsletterSection from "@modules/home/components/newsletter-section"
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

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <BrandStory />
      <div className="py-16 bg-white">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="heading-section">Shop Our Granola</h2>
            <p className="text-body max-w-2xl mx-auto mt-4">
              Explore our collection of handcrafted granola varieties, each made with love and the finest ingredients.
            </p>
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
