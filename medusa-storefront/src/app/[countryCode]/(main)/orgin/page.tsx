import { Metadata } from "next"
import { getBaseURL } from "@lib/util/env"
import OrginHero from "@modules/orgin/components/hero"
import PhilosophySection from "@modules/orgin/components/philosophy-section"
import ProductShowcase from "@modules/orgin/components/product-showcase"
import SourcingSection from "@modules/orgin/components/sourcing-section"
import FlavorProfiles from "@modules/orgin/components/flavor-profiles"
import Certifications from "@modules/orgin/components/certifications"
import OrginNewsletterSection from "@modules/orgin/components/newsletter-signup"
import { listCollections } from "@lib/data/collections"

type Props = {
  params: Promise<{ countryCode: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const baseUrl = getBaseURL()
  const url = `${baseUrl}/${params.countryCode}/orgin`
  
  return {
    title: "Orgin Organics - Premium USDA Organic Nuts | Sustainably Sourced Organic Snacks",
    description:
      "Discover premium USDA-certified organic nuts from Orgin Organics. Sustainably sourced, naturally flavored organic cashews, almonds, pecans, and mixed nuts. Non-GMO, gluten-free, vegan-friendly. Organic Roots Grown In Nature. Shop organic snacks with transparent sourcing and regenerative farming practices.",
    keywords: [
      "organic nuts",
      "USDA organic nuts",
      "organic cashews",
      "organic almonds",
      "organic pecans",
      "sustainably sourced nuts",
      "non-GMO nuts",
      "organic snacks",
      "premium organic nuts",
      "organic mixed nuts",
      "gluten-free nuts",
      "vegan nuts",
      "organic food",
      "sustainable agriculture",
      "regenerative farming",
      "organic certification",
      "organic roots",
      "earth-friendly snacks",
      "organic nut snacks",
      "certified organic"
    ],
    authors: [{ name: "Orgin Organics" }],
    creator: "Orgin Organics",
    publisher: "Orgin Organics",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Orgin Organics - Premium USDA Organic Nuts | Sustainably Sourced",
      description:
        "Premium USDA-certified organic nuts from Orgin Organics. Sustainably sourced, naturally flavored organic cashews, almonds, pecans, and mixed nuts. Non-GMO, gluten-free, vegan-friendly.",
      url: url,
      siteName: "Orgin Organics",
      images: [
        {
          url: `${baseUrl}/images/brand/orgin/Orgin Logo Green.png`,
          width: 500,
          height: 500,
          alt: "Orgin Organics - Premium USDA Organic Nuts",
        },
        {
          url: `${baseUrl}/images/brand/orgin/Orgin Logo Roots Grown in Nature.png`,
          width: 1200,
          height: 630,
          alt: "Orgin Organics - Organic Roots Grown In Nature",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Orgin Organics - Premium USDA Organic Nuts",
      description:
        "Premium USDA-certified organic nuts. Sustainably sourced, naturally flavored. Non-GMO, gluten-free, vegan-friendly. Organic Roots Grown In Nature.",
      images: [`${baseUrl}/images/brand/orgin/Orgin Logo Roots Grown in Nature.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function OrginPage(props: Props) {
  const params = await props.params
  const baseUrl = getBaseURL()
  const currentUrl = `${baseUrl}/${params.countryCode}/orgin`

  // Try to fetch collections, but handle errors gracefully
  let orginCollection = null
  try {
    const { collections } = await listCollections({
      fields: "id, handle, title",
    })

    // Find Orgin collection
    orginCollection = collections?.find(
      (c) => 
        c.handle?.toLowerCase().includes("orgin") || 
        c.title?.toLowerCase().includes("orgin")
    )
  } catch (error) {
    // If collections fetch fails, continue without collection data
    console.warn("Could not fetch collections for Orgin page:", error)
  }

  // Structured Data - Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Orgin Organics",
    "url": `${baseUrl}/${params.countryCode}/orgin`,
    "logo": `${baseUrl}/images/brand/orgin/Orgin Logo Green.png`,
    "description": "Premium USDA-certified organic nuts from Orgin Organics. Sustainably sourced, naturally flavored organic cashews, almonds, pecans, and mixed nuts.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": `${baseUrl}/${params.countryCode}/contact`
    }
  }

  // Structured Data - WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Orgin Organics",
    "url": `${baseUrl}/${params.countryCode}/orgin`,
    "description": "Premium USDA-certified organic nuts from Orgin Organics",
    "publisher": {
      "@type": "Organization",
      "name": "Orgin Organics"
    }
  }

  // Structured Data - BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/${params.countryCode}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Orgin Organics",
        "item": currentUrl
      }
    ]
  }

  // Structured Data - ItemList for Products (if collection exists)
  const itemListSchema = orginCollection ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Orgin Organics Organic Nuts Collection",
    "description": "USDA-certified organic nuts from Orgin Organics",
    "url": `${baseUrl}/${params.countryCode}/orgin/store`
  } : null

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

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

