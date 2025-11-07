import { Metadata } from "next"
import OrginHero from "@modules/orgin/components/hero"
import PhilosophySection from "@modules/orgin/components/philosophy-section"
import ProductShowcase from "@modules/orgin/components/product-showcase"
import SourcingSection from "@modules/orgin/components/sourcing-section"
import FlavorProfiles from "@modules/orgin/components/flavor-profiles"
import Certifications from "@modules/orgin/components/certifications"
import OrginNewsletterSection from "@modules/orgin/components/newsletter-signup"

export const metadata: Metadata = {
  title: "Orgin Organics - USDA Organic Nuts | Sustainably Sourced",
  description:
    "Discover premium USDA-certified organic nuts from Orgin Organics. Sustainably sourced, naturally flavored, and earth-friendly. Organic Roots Grown In Nature.",
}

export default async function OrginPage() {
  return (
    <>
      <OrginHero />
      <PhilosophySection />
      <ProductShowcase />
      <FlavorProfiles />
      <SourcingSection />
      <Certifications />
      <OrginNewsletterSection />
    </>
  )
}

