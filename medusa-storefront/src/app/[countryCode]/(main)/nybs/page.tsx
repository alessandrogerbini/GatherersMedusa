import { Metadata } from "next"
import NYBSHero from "@modules/nybs/components/hero"
import StorySection from "@modules/nybs/components/story-section"
import ProductShowcase from "@modules/nybs/components/product-showcase"
import FlavorProfiles from "@modules/nybs/components/flavor-profiles"
import NYCSpirit from "@modules/nybs/components/nyc-spirit"
import Testimonials from "@modules/nybs/components/testimonials"
import NYBSNewsletterSection from "@modules/nybs/components/newsletter-signup"
import { getBaseURL } from "@lib/util/env"
import { getCollectionByHandle } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

type Props = {
  params: Promise<{ countryCode: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const baseUrl = getBaseURL()
  const url = `${baseUrl}/${params.countryCode}/nybs`
  
  return {
    title: "NYBS - New York's Best Snacks™ | Bold NYC Flavors | Authentic New York Snacks",
    description:
      "Bold, unapologetic snacks straight from NYC. Experience authentic New York flavors with NYBS - Everything Bagel Cashews, Smoked Mixed Nuts, Honey Roasted Cashews, and more. Snacks so good, you can't fuhgeddaboudit! Made in NYC with real attitude.",
    keywords: [
      "NYBS",
      "New York's Best Snacks",
      "NYC snacks",
      "New York snacks",
      "Everything Bagel Cashews",
      "NYC flavored snacks",
      "bold snacks",
      "authentic NYC flavors",
      "New York City snacks",
      "premium NYC snacks",
      "Manhattan snacks",
      "Brooklyn snacks",
      "NYC food",
      "New York food",
      "artisan NYC snacks",
      "gourmet NYC snacks",
      "NYC cashews",
      "smoked mixed nuts",
      "honey roasted cashews",
      "ranch cashews",
      "NYC attitude",
      "New York pride",
      "five boroughs snacks",
      "Empire State flavors"
    ],
    authors: [{ name: "NYBS - New York's Best Snacks" }],
    creator: "NYBS",
    publisher: "NYBS - New York's Best Snacks",
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
      title: "NYBS - New York's Best Snacks™ | Bold NYC Flavors",
      description:
        "Bold, unapologetic snacks straight from NYC. Experience authentic New York flavors with NYBS - snacks so good, you can't fuhgeddaboudit! Made in NYC with real attitude.",
      url: url,
      siteName: "NYBS - New York's Best Snacks",
      images: [
        {
          url: `${baseUrl}/images/brand/nybs/NYBS header.png`,
          width: 1200,
          height: 300,
          alt: "NYBS - New York's Best Snacks Logo",
        },
        {
          url: `${baseUrl}/images/brand/nybs/NYBS Header.jpg`,
          width: 1200,
          height: 630,
          alt: "NYBS - Bold NYC Snacks with Authentic New York Attitude",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "NYBS - New York's Best Snacks™ | Bold NYC Flavors",
      description:
        "Bold, unapologetic snacks straight from NYC. Experience authentic New York flavors - snacks so good, you can't fuhgeddaboudit!",
      images: [`${baseUrl}/images/brand/nybs/NYBS Header.jpg`],
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

export default async function NYBSPage(props: Props) {
  const params = await props.params
  const baseUrl = getBaseURL()
  const url = `${baseUrl}/${params.countryCode}/nybs`

  // Fetch NYBS collection and products
  const region = await getRegion(params.countryCode)
  const nybsCollection = await getCollectionByHandle("NYBS")
  
  let nybsProducts: any[] = []
  if (nybsCollection && region) {
    const { response } = await listProducts({
      countryCode: params.countryCode,
      queryParams: {
        collection_id: [nybsCollection.id],
        limit: 100,
      },
    })
    nybsProducts = response.products || []
  }

  // Structured Data - Organization (NYBS Brand)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NYBS - New York's Best Snacks",
    "alternateName": "NYBS",
    "url": url,
    "logo": `${baseUrl}/images/brand/nybs/NYBS header.png`,
    "description": "Bold, unapologetic snacks straight from NYC. Authentic New York flavors with real attitude - snacks so good, you can't fuhgeddaboudit!",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New York City",
      "addressRegion": "NY",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "brand": {
      "@type": "Brand",
      "name": "NYBS",
      "slogan": "Snacks so good, you can't fuhgeddaboudit!"
    }
  }

  // Structured Data - WebPage
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "NYBS - New York's Best Snacks",
    "description": "Bold, unapologetic snacks straight from NYC. Experience authentic New York flavors with NYBS.",
    "url": url,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "NYBS - New York's Best Snacks",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": "New York City Snacks",
      "description": "Authentic NYC flavored snacks with bold, unapologetic attitude"
    },
    "breadcrumb": {
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
          "name": "NYBS",
          "item": url
        }
      ]
    }
  }

  // Structured Data - ItemList for Products
  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "NYBS Snack Products",
    "description": "Bold NYC flavored snacks from New York's Best Snacks",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "Everything Bagel Cashews",
          "description": "NYC's iconic Everything Bagel flavor on premium cashews",
          "brand": {
            "@type": "Brand",
            "name": "NYBS"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "Smoked Mixed Nuts",
          "description": "Deep smoky flavor, classic NYC style",
          "brand": {
            "@type": "Brand",
            "name": "NYBS"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Product",
          "name": "Honey Roasted Cashews",
          "description": "Sweet meets savory, New York approved",
          "brand": {
            "@type": "Brand",
            "name": "NYBS"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Product",
          "name": "Ranch Cashews",
          "description": "Bold ranch flavor, NYC attitude",
          "brand": {
            "@type": "Brand",
            "name": "NYBS"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }
      }
    ]
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />

      <NYBSHero />
      <StorySection />
      <ProductShowcase products={nybsProducts} region={region} />
      <FlavorProfiles />
      <NYCSpirit />
      <Testimonials />
      <NYBSNewsletterSection />
    </>
  )
}

