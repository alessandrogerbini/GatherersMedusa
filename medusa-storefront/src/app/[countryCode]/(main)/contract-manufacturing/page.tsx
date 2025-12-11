import { Metadata } from "next"
import ContractManufacturingForm from "@modules/contract-manufacturing/components/contract-manufacturing-form"
import VideoBackground from "@modules/contract-manufacturing/components/video-background"
import FeatureAccordion from "@modules/contract-manufacturing/components/feature-accordion"
import StickyCTA from "@modules/contract-manufacturing/components/sticky-cta"
import { getBaseURL } from "@lib/util/env"

type Props = {
  params: Promise<{ countryCode: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const baseUrl = getBaseURL()
  const url = `${baseUrl}/${params.countryCode}/contract-manufacturing`
  
  return {
    title: "Contract Manufacturing Services | Boutique Food Co-Packing | Gatherer's Granola",
    description:
      "Gatherer's Granola offers boutique contract manufacturing and co-packing services for emerging food brands. Lowest MOQs in the industry, fastest turnaround times, and artisan quality at scale. Kosher, Organic, HACCP certified. Custom products, packaging, and certifications available.",
    keywords: [
      "contract manufacturing",
      "food co-packing",
      "co-packer",
      "private label manufacturing",
      "white label manufacturing",
      "boutique food manufacturer",
      "low MOQ food manufacturing",
      "granola contract manufacturing",
      "organic food co-packing",
      "kosher food manufacturing",
      "custom food products",
      "food packaging services",
      "emerging brand manufacturing",
      "small batch food production",
      "artisan food manufacturing",
      "HACCP certified manufacturer",
      "USDA organic handler",
      "gluten-free food production",
      "non-GMO food manufacturing",
      "keto food manufacturing",
      "paleo food manufacturing"
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
      title: "Contract Manufacturing Services | Boutique Food Co-Packing | Gatherer's Granola",
      description:
        "Boutique contract manufacturing for emerging food brands. Lowest MOQs, fastest turnaround times, artisan quality. Kosher, Organic, HACCP certified.",
      url: url,
      siteName: "Gatherer's Granola",
      images: [
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
      title: "Contract Manufacturing Services | Gatherer's Granola",
      description:
        "Boutique contract manufacturing for emerging food brands. Lowest MOQs, fastest turnaround times, artisan quality.",
      images: [`${baseUrl}/images/brand/Chipmunk logo 500 x 500 px.png`],
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

export default async function ContractManufacturingPage(props: Props) {
  const params = await props.params
  const baseUrl = getBaseURL()
  const currentUrl = `${baseUrl}/${params.countryCode}/contract-manufacturing`

  const accordionItems = [
    {
      title: "What are the typical fees for your category of product?",
      content: "Ask specifically about \"Toll\" or \"Tolling\" fees, as that will allow you to compare apples to apples across producers.",
    },
    {
      title: "What are the packaging capabilities?",
      content: "Some private label manufacturers do not do packaging in-house, others may not be able to handle your brand's specific packaging varieties. If you don't know the answers to this topic in advance, it is difficult to arrive at a comprehensive cost estimate.",
    },
    {
      title: "Food Safety Standards?",
      content: "Contract manufacturers maintain a wide variety of food safety standards. Your brand's clients may have specific standards that must be met in order to satisfy contractual requirements. Big retailers often have rigorous standards while specialty food stores rarely do. Make sure to ask potential manufacturing partners about their food safety programs, if they undergo third party audits, and, before going to contract, be sure to review copies of any food safety certifications they claim to have.",
    },
    {
      title: "What are the Minimum Order Quantities (MOQs) or Minimum Run Volumes?",
      content: "This will tell you how large your orders need to be, at least, in order to work with a given partner. Emerging brands often don't have the financial flexibility to invest in massive production runs.",
    },
    {
      title: "What certifications are carried?",
      content: "If your products needs a specific labeling claim, such as Kosher or Non-GMO, it is critical to ask the candidate manufacturing partners right away. There is no point wasting your time and theirs on producing quotes only to discover that they process wheat on their equipment and your product needs to be certified gluten-free.",
    },
    {
      title: "Commitment to quality?",
      content: "Many white label or private label manufacturers can produce high quality product as samples, but drop in quality once they go to full scale production. Reviewing products that candidate manufacturers already produce at full production volume can help brand managers determine if they are capable of maintaining the level of quality their brand needs. It's similarly important to negotiate a contract that specifies quality parameters and holds the producer accountable for out-of-spec products.",
    },
  ]

  // Structured Data - Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Gatherer's Granola",
    "url": baseUrl,
    "logo": `${baseUrl}/images/brand/Chipmunk logo 500 x 500 px.png`,
    "description": "Boutique contract manufacturer specializing in artisan-quality food products for emerging brands.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      // Add social media URLs when available
    ]
  }

  // Structured Data - Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Contract Manufacturing",
    "provider": {
      "@type": "Organization",
      "name": "Gatherer's Granola"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Boutique contract manufacturing and co-packing services for emerging food brands. Specializing in granola, trail mix, muesli, and custom food products. Offering lowest MOQs in the industry, fastest turnaround times, and artisan quality at scale.",
    "offers": {
      "@type": "Offer",
      "description": "Contract manufacturing services with flexible minimum order quantities"
    }
  }

  // Structured Data - FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": accordionItems.map(item => ({
      "@type": "Question",
      "name": item.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.content
      }
    }))
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
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contract Manufacturing",
        "item": currentUrl
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <StickyCTA />
      
      {/* Hero Section with Video Background */}
      <header className="relative h-[60vh] min-h-[500px] w-full bg-gradient-to-br from-gatherers-orange to-gatherers-orange-dark overflow-hidden">
        <VideoBackground />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 content-container h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Boutique Contract Manufacturing
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl leading-relaxed drop-shadow-md mb-8">
            For Emerging Brands Who Demand Quality
          </p>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Gatherer&apos;s Granola delivers home-made quality at scale with the industry&apos;s lowest MOQs and fastest turnaround times.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
              <div className="text-2xl font-bold">Lowest MOQs</div>
              <div className="text-sm">In the Industry</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
              <div className="text-2xl font-bold">Fastest</div>
              <div className="text-sm">Turnaround Times</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
              <div className="text-2xl font-bold">Artisan</div>
              <div className="text-sm">Quality at Scale</div>
            </div>
          </div>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="section-container bg-white" aria-labelledby="introduction-heading">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-body text-gatherers-brown-light mb-6">
                Gatherer&apos;s opened its own production facility because no contract manufacturer could meet quality standards central to Gatherer&apos;s mission. Making a world class, artisan quality product requires attention to detail that isn&apos;t available from most co-manufacturers. Where others optimize for throughput at the expense of taste and texture, Gatherer&apos;s makes a firm commitment to always honor the product quality values of its customers. Gatherer&apos;s delivers home-made quality at scale in a way that no other partner can.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section - Moved Up */}
      <section className="section-container bg-gatherers-cream" aria-labelledby="features-heading">
        <div className="content-container">
          <div className="max-w-6xl mx-auto">
            <h2 id="features-heading" className="heading-section text-center mb-12">
              Why Choose Gatherer&apos;s?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Custom Products */}
              <article className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gatherers-orange/10 rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                  <svg className="w-6 h-6 text-gatherers-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gatherers-brown mb-4">
                  Custom Products
                </h3>
                <p className="text-gatherers-brown-light">
                  Gatherer&apos;s works with clients to produce and execute proprietary recipes or custom products that meet price and flavor requirements. Whether you&apos;re looking for a baked granola, trail mix, or a raw muesli, Gatherer&apos;s has the facility and the food industry experience to create what you need.
                </p>
              </article>

              {/* Packaging */}
              <article className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gatherers-orange/10 rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                  <svg className="w-6 h-6 text-gatherers-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gatherers-brown mb-4">
                  Packaging
                </h3>
                <p className="text-gatherers-brown-light">
                  In addition to creating unique products, Gatherer&apos;s can package in stand-up pouches, bulk bags or bins, or in custom packaging that meets clients&apos; needs. Need to develop packaging for your product? Gatherer&apos;s has relationships with a variety of domestic packaging suppliers and would be happy to help you source the right package for your product.
                </p>
              </article>

              {/* Certifications */}
              <article className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gatherers-orange/10 rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                  <svg className="w-6 h-6 text-gatherers-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gatherers-brown mb-4">
                  Certifications
                </h3>
                <p className="text-gatherers-brown-light">
                  Gatherer&apos;s Bakery is a Registered Kosher facility by the New York State Department of Agriculture & Markets, and can produce under all major Kosher Certification Organizations. Gatherer&apos;s is also a certified Organic Food Handler under the USDA&apos;s organic program. Gatherer&apos;s management team, including HACCP certified directors overseeing production, have the experience and expertise to meet the requirements of organic labeling, certified gluten-free production, Non-GMO Project compliance, and of course GMP food-safety programs.
                </p>
                <p className="text-gatherers-brown-light mt-4">
                  Gatherer&apos;s is experienced with and ready to handle products with certified Organic, low-carb, ketogenic (keto), and paleo specifications.
                </p>
              </article>

              {/* Minimums - Highlighted */}
              <article className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-2 border-gatherers-orange">
                <div className="w-12 h-12 bg-gatherers-orange rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="inline-block bg-gatherers-orange text-white text-xs font-bold px-2 py-1 rounded mb-3">
                  KEY DIFFERENTIATOR
                </div>
                <h3 className="text-xl font-bold text-gatherers-brown mb-4">
                  Minimums
                </h3>
                <p className="text-gatherers-brown-light">
                  Gatherer&apos;s is a boutique producer, servicing emerging brands. Where many other co-packers require orders of 5 or more pallets at a time, Gatherer&apos;s provides customers with the flexibility to preserve finite resources by offering some of the <strong className="text-gatherers-brown">smallest minimum order quantities (MOQs) in the industry</strong>.
                </p>
              </article>

              {/* Turn Around Times - Highlighted */}
              <article className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-2 border-gatherers-orange">
                <div className="w-12 h-12 bg-gatherers-orange rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="inline-block bg-gatherers-orange text-white text-xs font-bold px-2 py-1 rounded mb-3">
                  KEY DIFFERENTIATOR
                </div>
                <h3 className="text-xl font-bold text-gatherers-brown mb-4">
                  Turn Around Times
                </h3>
                <p className="text-gatherers-brown-light">
                  Gatherer&apos;s features some of the <strong className="text-gatherers-brown">fastest project turn around times</strong> in the food co-packing industry. From initial scope of work consultation to first production run, our on-boarding team is focused on helping you get your project up and running as quickly as possible. We are always pushing to improve on this critical dimension. Days from customer inquiry to delivery of the customer&apos;s first purchase order is a key performance indicator that our management team reviews regularly.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Badges Section */}
      <section className="section-container bg-white" aria-labelledby="certifications-heading">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 id="certifications-heading" className="heading-section text-center mb-8">
              Certifications & Standards
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gatherers-cream rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-gatherers-orange mb-2" aria-hidden="true">✓</div>
                <div className="font-semibold text-gatherers-brown">Kosher</div>
                <div className="text-sm text-gatherers-brown-light mt-1">Registered Facility</div>
              </div>
              <div className="bg-gatherers-cream rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-gatherers-orange mb-2" aria-hidden="true">✓</div>
                <div className="font-semibold text-gatherers-brown">USDA Organic</div>
                <div className="text-sm text-gatherers-brown-light mt-1">Certified Handler</div>
              </div>
              <div className="bg-gatherers-cream rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-gatherers-orange mb-2" aria-hidden="true">✓</div>
                <div className="font-semibold text-gatherers-brown">HACCP</div>
                <div className="text-sm text-gatherers-brown-light mt-1">Certified Directors</div>
              </div>
              <div className="bg-gatherers-cream rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-gatherers-orange mb-2" aria-hidden="true">✓</div>
                <div className="font-semibold text-gatherers-brown">Non-GMO</div>
                <div className="text-sm text-gatherers-brown-light mt-1">Project Compliant</div>
              </div>
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
              <div className="text-sm text-gatherers-brown-light">
                <strong className="text-gatherers-brown">Gluten-Free</strong> Production Available
              </div>
              <div className="text-sm text-gatherers-brown-light">
                <strong className="text-gatherers-brown">Keto & Paleo</strong> Specifications
              </div>
              <div className="text-sm text-gatherers-brown-light">
                <strong className="text-gatherers-brown">GMP</strong> Food-Safety Programs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Look For Section with Accordion */}
      <section className="section-container bg-gatherers-cream" aria-labelledby="what-to-look-for-heading">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 id="what-to-look-for-heading" className="heading-section text-center mb-4">
              What to look for in a manufacturer.
            </h2>
            <p className="text-body text-gatherers-brown-light mb-12 text-center">
              As finding the right supplier is often time consuming and can be expensive, knowing what information to ask for can help:
            </p>

            <FeatureAccordion items={accordionItems} />

            <div className="mt-8 p-6 bg-gatherers-orange/10 rounded-lg border-l-4 border-gatherers-orange">
              <p className="text-gatherers-brown font-semibold">
                Many brands only discover too late that they have teamed up with the wrong private label, white label, co-packing, or contract manufacturing partner, a mistake that can be difficult to recover from. Arm yourself with the right questions to ask before you make any firm commitments for your brand!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-container bg-white" aria-labelledby="testimonials-heading">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 id="testimonials-heading" className="heading-section text-center mb-12">
              Trusted by Emerging Brands
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <article className="bg-gatherers-cream rounded-lg p-6 md:p-8">
                <div className="flex items-center mb-4" aria-label="5 star rating">
                  <div className="text-gatherers-orange text-2xl mr-2">★★★★★</div>
                </div>
                <blockquote className="text-gatherers-brown-light mb-4 italic">
                  &quot;Gatherer&apos;s helped us launch our granola line with minimal upfront investment. Their low MOQs and attention to quality made all the difference for our startup.&quot;
                </blockquote>
                <footer className="text-sm font-semibold text-gatherers-brown">
                  — Startup Founder, Organic Food Brand
                </footer>
              </article>
              <article className="bg-gatherers-cream rounded-lg p-6 md:p-8">
                <div className="flex items-center mb-4" aria-label="5 star rating">
                  <div className="text-gatherers-orange text-2xl mr-2">★★★★★</div>
                </div>
                <blockquote className="text-gatherers-brown-light mb-4 italic">
                  &quot;The turnaround time was incredible. From initial consultation to first production run, Gatherer&apos;s exceeded our expectations. Their team truly understands what emerging brands need.&quot;
                </blockquote>
                <footer className="text-sm font-semibold text-gatherers-brown">
                  — Brand Manager, Specialty Food Company
                </footer>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA */}
      <section className="section-container bg-gatherers-orange/5" aria-labelledby="mid-cta-heading">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="mid-cta-heading" className="text-3xl md:text-4xl font-bold text-gatherers-brown mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gatherers-brown-light mb-8 max-w-2xl mx-auto">
              Get a personalized quote and discover how Gatherer&apos;s can help bring your product vision to life.
            </p>
            <a
              href="#contact-form"
              className="inline-block btn-primary text-lg"
              aria-label="Get your free quote"
            >
              Get Your Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* Quality Counts Section with Form - Moved After Education */}
      <section id="contact-form" className="section-container bg-gatherers-cream" aria-labelledby="quality-counts-heading">
        <div className="content-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Content */}
              <div>
                <h2 id="quality-counts-heading" className="heading-section mb-6">Quality Counts</h2>
                <p className="text-body text-gatherers-brown-light mb-8">
                  <strong>We&apos;re ready to take on your project!</strong>
                </p>
                <p className="text-body text-gatherers-brown-light mb-6">
                  Finding the right partner to produce and pack on your brand&apos;s behalf is critical. Price, turn around times, minimum order quantities, certifications carried, and quality of products produced all factor into the fit for brands. While there are many manufacturers to choose from, only a tiny minority are likely to meet your brand&apos;s specific needs.
                </p>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-gatherers-brown mb-3">What to Expect:</h3>
                  <ul className="space-y-2 text-gatherers-brown-light">
                    <li className="flex items-start">
                      <span className="text-gatherers-orange mr-2" aria-hidden="true">✓</span>
                      <span>Response within 1-2 business days</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gatherers-orange mr-2" aria-hidden="true">✓</span>
                      <span>Personalized quote tailored to your needs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gatherers-orange mr-2" aria-hidden="true">✓</span>
                      <span>No-obligation consultation</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
                <h3 className="text-2xl font-bold text-gatherers-brown mb-2">
                  Get Your Free Quote
                </h3>
                <p className="text-sm text-gatherers-brown-light mb-6">
                  Fill out the form below and we&apos;ll get back to you within 1-2 business days.
                </p>
                <ContractManufacturingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-container bg-white" aria-labelledby="final-cta-heading">
        <div className="content-container">
          <div className="max-w-4xl mx-auto bg-gatherers-cream rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h2 id="final-cta-heading" className="text-3xl md:text-4xl font-bold text-gatherers-brown mb-6">
              Ready to launch your product with Gatherer&apos;s?
            </h2>
            <p className="text-lg text-gatherers-brown-light mb-8 max-w-2xl mx-auto">
              Let&apos;s turn your vision into reality. Contact us today to set your brand on the path to contract manufacturing excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="inline-block btn-primary text-lg"
                aria-label="Get your free quote"
              >
                Get Your Free Quote
              </a>
              <a
                href="/contact"
                className="inline-block btn-secondary text-lg"
                aria-label="Contact us directly"
              >
                Contact Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}








