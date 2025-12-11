import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import BrandStory from "@modules/home/components/brand-story"
import ValuesSection from "@modules/home/components/values-section"
import Testimonials from "@modules/home/components/testimonials"
import NewsletterSection from "@modules/home/components/newsletter-section"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getBaseURL } from "@lib/util/env"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  params: Promise<{ countryCode: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const baseUrl = getBaseURL()
  const url = `${baseUrl}/${params.countryCode}`
  
  return {
    title: "Gatherer's Granola - Premium Handcrafted Artisan Granola | Family Recipes, Hand Stirred",
    description:
      "Discover premium handcrafted artisan granola made with family recipes and natural ingredients. Small-batch crafted, hand-stirred granola with 100% natural ingredients, no preservatives. Shop premium granola varieties including organic, kosher, and gluten-free options. Family recipes. Hand stirred.",
    keywords: [
      "artisan granola",
      "handcrafted granola",
      "premium granola",
      "small batch granola",
      "family recipe granola",
      "natural granola",
      "organic granola",
      "kosher granola",
      "gluten-free granola",
      "healthy granola",
      "gourmet granola",
      "homemade granola",
      "artisan food",
      "hand-stirred granola",
      "premium breakfast",
      "natural ingredients",
      "no preservatives",
      "wholesome granola",
      "premium snacks",
      "artisan snacks"
    ],
    authors: [{ name: "Gatherer's Granola" }],
    creator: "Gatherer's Granola",
    publisher: "Gatherer's Granola",
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
      title: "Gatherer's Granola - Premium Handcrafted Artisan Granola | Family Recipes",
      description:
        "Premium handcrafted artisan granola made with family recipes and natural ingredients. Small-batch crafted, hand-stirred with care. 100% natural, no preservatives.",
      url: url,
      siteName: "Gatherer's Granola",
      images: [
        {
          url: `${baseUrl}/images/hero/granola-hero.jpg`,
          width: 1200,
          height: 630,
          alt: "Handcrafted artisan granola from Gatherer's Granola",
        },
        {
          url: `${baseUrl}/images/brand/Chipmunk logo 500 x 500 px.png`,
          width: 500,
          height: 500,
          alt: "Gatherer's Granola Logo",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Gatherer's Granola - Premium Handcrafted Artisan Granola",
      description:
        "Premium handcrafted artisan granola made with family recipes. Small-batch crafted, hand-stirred with care. 100% natural ingredients.",
      images: [`${baseUrl}/images/hero/granola-hero.jpg`],
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
    verification: {
      // Add Google Search Console verification if available
      // google: "your-verification-code",
    },
  }
}

export default async function Home(props: Props) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const baseUrl = getBaseURL()
  const currentUrl = `${baseUrl}/${countryCode}`

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  // Find the granola collection (by handle "granola" or title containing "Granola")
  const granolaCollection = collections.find(
    (c) => c.handle?.toLowerCase() === "granola" || c.title?.toLowerCase().includes("granola")
  )

  // Get other collections (excluding granola)
  const otherCollections = collections.filter(
    (c) => c.id !== granolaCollection?.id
  )

  // Structured Data - Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Gatherer's Granola",
    "url": baseUrl,
    "logo": `${baseUrl}/images/brand/Chipmunk logo 500 x 500 px.png`,
    "description": "Premium handcrafted artisan granola made with family recipes and natural ingredients. Small-batch crafted, hand-stirred with care.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      // Add social media URLs when available
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": `${baseUrl}/${countryCode}/contact`
    }
  }

  // Structured Data - WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Gatherer's Granola",
    "url": baseUrl,
    "description": "Premium handcrafted artisan granola made with family recipes",
    "publisher": {
      "@type": "Organization",
      "name": "Gatherer's Granola"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/${countryCode}/store?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
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
        "item": currentUrl
      }
    ]
  }

  // Structured Data - ItemList for Featured Products (if collections exist)
  const itemListSchema = collections && collections.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Featured Granola Collections",
    "description": "Handcrafted artisan granola collections from Gatherer's Granola",
    "itemListElement": collections.slice(0, 6).map((collection, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": collection.title,
      "url": `${baseUrl}/${countryCode}/collections/${collection.handle}`
    }))
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

      <Hero />
      <BrandStory />
      <section className="py-16 bg-white" aria-labelledby="shop-heading">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 id="shop-heading" className="heading-section">Shop Our Granola</h2>
            <p className="text-body max-w-2xl mx-auto mt-4">
              Explore our collection of handcrafted granola varieties, each made with love, 
              the finest ingredients, and generations of family tradition.
            </p>
          </div>
          {granolaCollection && (
            <ul className="flex flex-col gap-x-6">
              <FeaturedProducts collections={[granolaCollection]} region={region} />
            </ul>
          )}
          
          {/* Other Collections Section */}
          {otherCollections && otherCollections.length > 0 && (
            <div className="mt-16 pt-16 border-t border-gatherers-cream-dark">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gatherers-brown mb-4">
                  Explore Our Other Products
                </h3>
                <p className="text-body text-gatherers-brown-light max-w-2xl mx-auto">
                  Discover our full range of handcrafted products beyond granola.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {otherCollections.map((collection) => (
                  <LocalizedClientLink
                    key={collection.id}
                    href={`/collections/${collection.handle}`}
                    className="px-6 py-3 bg-gatherers-cream-light hover:bg-gatherers-cream-dark text-gatherers-brown font-medium rounded-lg transition-colors"
                  >
                    {collection.title}
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <ValuesSection />
      <Testimonials />
      <NewsletterSection />
    </>
  )
}
