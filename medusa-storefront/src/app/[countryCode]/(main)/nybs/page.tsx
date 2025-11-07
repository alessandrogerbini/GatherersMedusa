import { Metadata } from "next"
import NYBSHero from "@modules/nybs/components/hero"
import StorySection from "@modules/nybs/components/story-section"
import ProductShowcase from "@modules/nybs/components/product-showcase"
import FlavorProfiles from "@modules/nybs/components/flavor-profiles"
import NYCSpirit from "@modules/nybs/components/nyc-spirit"
import Testimonials from "@modules/nybs/components/testimonials"
import NYBSNewsletterSection from "@modules/nybs/components/newsletter-signup"

export const metadata: Metadata = {
  title: "NYBS - New York's Best Snacks | Authentic NYC Flavors",
  description:
    "Bold, unapologetic snacks straight from NYC. Experience the authentic taste of New York with NYBS - snacks so good, you can't fuhgeddaboudit!",
}

export default async function NYBSPage() {
  return (
    <>
      <NYBSHero />
      <StorySection />
      <ProductShowcase />
      <FlavorProfiles />
      <NYCSpirit />
      <Testimonials />
      <NYBSNewsletterSection />
    </>
  )
}

