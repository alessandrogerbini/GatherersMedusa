import { Metadata } from "next"
import { notFound } from "next/navigation"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { getRegion } from "@lib/data/regions"
import { listProductsWithSort } from "@lib/data/products"
import { getCollectionByHandle } from "@lib/data/collections"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import Image from "next/image"
import { getBaseURL } from "@lib/util/env"

const PRODUCT_LIMIT = 12

type Props = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const baseUrl = getBaseURL()
  const url = `${baseUrl}/${params.countryCode}/orgin/store`
  
  return {
    title: "Shop Orgin Organics - Premium USDA Organic Nuts | Organic Cashews, Almonds, Pecans",
    description:
      "Shop our complete collection of USDA-certified organic nuts from Orgin Organics. Premium organic cashews, almonds, pecans, and mixed nuts. Non-GMO, gluten-free, vegan-friendly. Sustainably sourced organic snacks with transparent farming practices.",
    keywords: [
      "buy organic nuts",
      "organic nuts online",
      "organic cashews",
      "organic almonds",
      "organic pecans",
      "organic mixed nuts",
      "USDA organic nuts",
      "premium organic nuts",
      "organic nut snacks",
      "sustainably sourced nuts",
      "non-GMO nuts",
      "gluten-free nuts",
      "vegan nuts",
      "organic food online",
      "organic snacks",
      "certified organic nuts"
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
      title: "Shop Orgin Organics - Premium USDA Organic Nuts",
      description:
        "Shop our complete collection of USDA-certified organic nuts. Premium organic cashews, almonds, pecans, and mixed nuts. Non-GMO, gluten-free, vegan-friendly.",
      url: url,
      siteName: "Orgin Organics",
      images: [
        {
          url: `${baseUrl}/images/brand/orgin/Orgin Logo Green.png`,
          width: 500,
          height: 500,
          alt: "Orgin Organics - Premium USDA Organic Nuts",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Shop Orgin Organics - Premium USDA Organic Nuts",
      description:
        "Shop our complete collection of USDA-certified organic nuts. Premium organic cashews, almonds, pecans, and mixed nuts.",
      images: [`${baseUrl}/images/brand/orgin/Orgin Logo Green.png`],
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

export default async function OrginStorePage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page } = searchParams

  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  // Get Orgin collection - try multiple possible handles
  let orginCollection = null
  const possibleHandles = ["Orgin", "orgin", "orgin-organics", "Orgin Organics"]
  
  for (const handle of possibleHandles) {
    try {
      orginCollection = await getCollectionByHandle(handle)
      if (orginCollection) {
        break
      }
    } catch (error) {
      // Try next handle
      continue
    }
  }

  // Fetch products - use collection_id if available
  const queryParams: any = {
    limit: PRODUCT_LIMIT,
  }

  if (orginCollection?.id) {
    queryParams.collection_id = [orginCollection.id]
  } else {
    // Fallback: filter by metadata if collection not found
    // This will fetch all products and we'll filter client-side
    queryParams.limit = 100
  }

  const {
    response: { products: fetchedProducts, count: fetchedCount },
  } = await listProductsWithSort({
    page: orginCollection ? pageNumber : 0,
    queryParams,
    sortBy: sort,
    countryCode: params.countryCode,
  })

  // If no collection found, filter by metadata as fallback
  let products = fetchedProducts
  let count = fetchedCount

  if (!orginCollection) {
    products = fetchedProducts.filter(
      (p) => 
        p.metadata?.brand === "orgin" || 
        p.metadata?.brand === "Orgin Organics" ||
        p.collection?.handle === "orgin" ||
        p.collection?.handle === "orgin-organics"
    )
    count = products.length
    
    // Paginate manually if filtering client-side
    const pageParam = (pageNumber - 1) * PRODUCT_LIMIT
    products = products.slice(pageParam, pageParam + PRODUCT_LIMIT)
  }

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)
  const baseUrl = getBaseURL()
  const currentUrl = `${baseUrl}/${params.countryCode}/orgin/store`

  // Structured Data - CollectionPage
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Orgin Organics Organic Nuts",
    "description": "USDA-certified organic nuts from Orgin Organics. Premium organic cashews, almonds, pecans, and mixed nuts.",
    "url": currentUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": count,
      "itemListElement": products.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.title,
          "url": `${baseUrl}/${params.countryCode}/products/${product.handle}`,
          "image": product.thumbnail || `${baseUrl}/images/brand/orgin/Orgin Logo Green.png`,
          "description": product.description || `${product.title} - USDA-certified organic nuts from Orgin Organics`,
          "brand": {
            "@type": "Brand",
            "name": "Orgin Organics"
          },
          "offers": product.variants && product.variants.length > 0 ? {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": region.currency_code || "USD"
          } : undefined
        }
      }))
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
        "item": `${baseUrl}/${params.countryCode}/orgin`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Shop",
        "item": currentUrl
      }
    ]
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div
        className="flex flex-col small:flex-row small:items-start py-6 content-container"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} />
        <div className="w-full">
          {/* Orgin Logo Header */}
          <header className="mb-8 flex flex-col items-center text-center" role="banner">
            <div className="mb-6 max-w-xs">
              <Image
                src="/images/brand/orgin/Orgin Logo Green.png"
                alt="Orgin Organics - Premium USDA Organic Nuts"
                width={300}
                height={300}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <h1 data-testid="store-page-title" className="text-3xl md:text-4xl font-bold text-orgin-green-dark mb-3">
              Orgin Organics
            </h1>
            <p className="text-base-regular text-orgin-earth-brown max-w-2xl">
              USDA-certified organic nuts, sustainably sourced and carefully roasted.
            </p>
          </header>
        <Suspense fallback={<SkeletonProductGrid />}>
          <ul
            className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
            data-testid="products-list"
          >
            {products.map((p) => {
              return (
                <li key={p.id}>
                  <ProductPreview product={p} region={region} />
                </li>
              )
            })}
          </ul>
          {totalPages > 1 && (
            <Pagination
              data-testid="product-pagination"
              page={pageNumber}
              totalPages={totalPages}
            />
          )}
        </Suspense>
        </div>
      </div>
    </>
  )
}

