import { Metadata } from "next"
import Image from "next/image"
import { getBaseURL } from "@lib/util/env"
import NewsletterSignup from "@modules/common/components/mailchimp-signup"

type Props = {
  params: Promise<{ countryCode: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const baseUrl = getBaseURL()
  const url = `${baseUrl}/${params.countryCode}/orgin/about`
  
  return {
    title: "About Orgin Organics - Our Mission, Organic Farming & Sustainability Practices",
    description:
      "Learn about Orgin Organics' mission, our commitment to organic farming, sustainable practices, and regenerative agriculture. Discover our USDA organic certification process, direct farm partnerships, and environmental initiatives. Organic Roots Grown In Nature.",
    keywords: [
      "about Orgin Organics",
      "organic farming",
      "sustainable agriculture",
      "regenerative farming",
      "USDA organic certification",
      "organic mission",
      "sustainability practices",
      "organic farming practices",
      "environmental initiatives",
      "farm partnerships",
      "organic supply chain",
      "carbon reduction",
      "eco-friendly packaging",
      "water conservation",
      "organic values",
      "sustainable food",
      "organic agriculture",
      "transparent sourcing"
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
      title: "About Orgin Organics - Organic Farming & Sustainability",
      description:
        "Learn about Orgin Organics' mission, our commitment to organic farming, sustainable practices, and regenerative agriculture. Discover our USDA organic certification process.",
      url: url,
      siteName: "Orgin Organics",
      images: [
        {
          url: `${baseUrl}/images/brand/orgin/Orgin logo with slogan.png`,
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
      title: "About Orgin Organics - Organic Farming & Sustainability",
      description:
        "Learn about Orgin Organics' mission, our commitment to organic farming, sustainable practices, and regenerative agriculture.",
      images: [`${baseUrl}/images/brand/orgin/Orgin logo with slogan.png`],
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

export default async function OrginAboutPage(props: Props) {
  const params = await props.params
  const baseUrl = getBaseURL()
  const currentUrl = `${baseUrl}/${params.countryCode}/orgin/about`

  // Structured Data - Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Orgin Organics",
    "url": `${baseUrl}/${params.countryCode}/orgin`,
    "logo": `${baseUrl}/images/brand/orgin/Orgin Logo Green.png`,
    "description": "Premium USDA-certified organic nuts from Orgin Organics. Committed to sustainable farming, regenerative agriculture, and transparent sourcing.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
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
        "name": "About",
        "item": currentUrl
      }
    ]
  }

  // Structured Data - FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes Orgin Organics organic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All our nuts come from farms certified by the USDA National Organic Program, which requires three years of chemical-free farming before certification. We maintain complete traceability from farm to package, with regular audits and testing to ensure organic integrity at every step."
        }
      },
      {
        "@type": "Question",
        "name": "Do you use synthetic pesticides or fertilizers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Our partner farms use only natural methods for pest control and soil enrichment, maintaining healthy ecosystems that support beneficial insects and wildlife."
        }
      },
      {
        "@type": "Question",
        "name": "What is your sustainability commitment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work toward carbon-neutral operations through sustainable practices and carbon offset programs. We use recyclable and compostable packaging materials, reducing plastic wherever possible. We support farms that use water-efficient irrigation and soil management techniques."
        }
      },
      {
        "@type": "Question",
        "name": "What is Orgin Organics' mission?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To provide premium organic nuts that nourish people and planet, supporting sustainable farming practices while delivering exceptional taste and quality in every bite."
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <header className="relative h-[50vh] min-h-[400px] w-full bg-gradient-to-br from-orgin-green to-orgin-green-dark overflow-hidden" role="banner">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 content-container h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Orgin Organics
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed">
            Where organic roots meet sustainable practices
          </p>
        </div>
      </header>

      {/* Origin Story */}
      <section className="section-container bg-white" aria-labelledby="origin-story-heading">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="origin-story-heading" className="orgin-heading-section">Our Origin Story</h2>
              <p className="text-xl text-orgin-green italic">
                From Seed to Snack
              </p>
            </div>

            <article className="space-y-8 orgin-text-body">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-orgin-green">
                    Rooted in Purpose
                  </h3>
                  <p>
                    Orgin Organics was born from a simple belief: food should be good for you 
                    and good for the planet. We started with a vision to create organic snacks 
                    that honor the earth while delivering exceptional taste and nutrition—proving 
                    you don&apos;t have to choose between what&apos;s good for you and what tastes amazing.
                  </p>
                  <p>
                    Our journey began with organic farmers who shared our passion for sustainable 
                    agriculture. Together, we discovered that when you respect the land, use 
                    natural methods, and never compromise on quality, the results speak for themselves: 
                    richer flavor, better nutrition, and a healthier planet.
                  </p>
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/brand/orgin/Orgin logo with slogan.png"
                    alt="Orgin Organics - Organic Roots Grown In Nature"
                    fill
                    className="object-contain p-8 bg-orgin-green-dark"
                    priority
                  />
                </div>
              </div>

              <div className="bg-orgin-earth rounded-xl p-8 space-y-4">
                <h3 className="text-2xl font-bold text-orgin-green">
                  The Organic Difference
                </h3>
                <p>
                  For us, &quot;organic&quot; means more than avoiding synthetic pesticides. 
                  It&apos;s a holistic approach that considers soil health, water conservation, 
                  biodiversity, and the well-being of farming communities—creating a system 
                  where everyone benefits.
                </p>
                <p>
                  Every nut we source is certified USDA organic, ensuring it meets the highest 
                  standards for purity and sustainability. We work directly with farms that use 
                  regenerative practices, building soil health while producing exceptional crops 
                  that deliver superior taste and nutrition.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-container bg-orgin-earth-cream" aria-labelledby="mission-vision-heading">
        <div className="content-container">
          <div className="max-w-6xl mx-auto">
            <h2 id="mission-vision-heading" className="sr-only">Mission and Vision</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <article className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-orgin-green">
                <h3 className="text-2xl font-bold text-orgin-green mb-4" style={{fontFamily: 'var(--font-playfair)'}}>Our Mission</h3>
                <p className="orgin-text-body">
                  To provide premium organic nuts that nourish people and planet, 
                  supporting sustainable farming practices while delivering exceptional 
                  taste and quality in every bite.
                </p>
              </article>

              <article className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-orgin-green">
                <h3 className="text-2xl font-bold text-orgin-green mb-4" style={{fontFamily: 'var(--font-playfair)'}}>Our Vision</h3>
                <p className="orgin-text-body">
                  A world where organic agriculture is the norm, where consumers make 
                  informed choices about their food, and where every purchase supports 
                  a healthier planet for future generations.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Organic Certification Process */}
      <section className="section-container bg-white" aria-labelledby="certification-heading">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 id="certification-heading" className="orgin-heading-section text-center mb-12">
              What Makes Us Organic?
            </h2>

            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orgin-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orgin-green mb-2">
                    Certified Organic Farms
                  </h4>
                  <p className="orgin-text-body">
                    All our nuts come from farms certified by the USDA National Organic Program, 
                    which requires three years of chemical-free farming before certification.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orgin-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orgin-green mb-2">
                    No Synthetic Pesticides or Fertilizers
                  </h4>
                  <p className="orgin-text-body">
                    Our partner farms use only natural methods for pest control and soil enrichment, 
                    maintaining healthy ecosystems that support beneficial insects and wildlife.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orgin-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orgin-green mb-2">
                    Transparent Supply Chain
                  </h4>
                  <p className="orgin-text-body">
                    We maintain complete traceability from farm to package, with regular audits 
                    and testing to ensure organic integrity at every step.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orgin-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orgin-green mb-2">
                    Minimal Processing
                  </h4>
                  <p className="orgin-text-body">
                    We roast and flavor our nuts using only organic ingredients, preserving 
                    their natural nutrients and authentic taste.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Initiatives */}
      <section className="section-container bg-gradient-to-br from-orgin-green to-orgin-green-light text-white" aria-labelledby="sustainability-heading">
        <div className="content-container">
          <div className="max-w-5xl mx-auto">
            <h2 id="sustainability-heading" className="text-4xl md:text-5xl font-bold text-center mb-12">
              Our Sustainability Commitment
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                <h3 className="text-xl font-bold mb-3" style={{fontFamily: 'var(--font-playfair)'}}>Carbon Reduction</h3>
                <p className="text-white/90" style={{fontFamily: 'var(--font-bree)'}}>
                  Working toward carbon-neutral operations through sustainable practices 
                  and carbon offset programs.
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                <h3 className="text-xl font-bold mb-3" style={{fontFamily: 'var(--font-playfair)'}}>Eco-Friendly Packaging</h3>
                <p className="text-white/90" style={{fontFamily: 'var(--font-bree)'}}>
                  Using recyclable and compostable materials, reducing plastic wherever possible.
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                <h3 className="text-xl font-bold mb-3" style={{fontFamily: 'var(--font-playfair)'}}>Water Conservation</h3>
                <p className="text-white/90" style={{fontFamily: 'var(--font-bree)'}}>
                  Supporting farms that use water-efficient irrigation and soil management techniques.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl italic">
                &quot;We don&apos;t inherit the earth from our ancestors; we borrow it from our children.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container bg-white" aria-labelledby="cta-heading">
        <div className="content-container">
          <div className="max-w-4xl mx-auto bg-orgin-earth rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-orgin-green-dark mb-6">
              Experience the Organic Difference
            </h2>
            <p className="text-lg text-orgin-earth-brown mb-8 max-w-2xl mx-auto">
              Taste the purity of USDA-certified organic nuts. Every bite supports sustainable 
              farming and a healthier planet.
            </p>
            <a href="/orgin/store" className="inline-block btn-orgin-primary text-lg">
              Shop Organic Nuts
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-container botanical-bg" aria-labelledby="newsletter-heading">
        <div className="content-container">
          <div className="max-w-3xl mx-auto">
            <h2 id="newsletter-heading" className="sr-only">Newsletter Signup</h2>
            <NewsletterSignup
              title="Join the Organic Movement"
              description="Get updates on sustainable farming, new flavors, and exclusive offers from Orgin Organics."
            />
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="section-container bg-white" aria-labelledby="social-heading">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="social-heading" className="text-3xl font-bold text-orgin-green mb-4">
              Follow Us
            </h2>
            <p className="text-lg text-orgin-earth-brown mb-8">
              Stay connected with Orgin Organics on social media
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://www.orginorganics.com/website/social/facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-orgin-green rounded-full flex items-center justify-center text-white hover:bg-orgin-green-dark transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xl font-bold">f</span>
              </a>
              <a
                href="https://www.orginorganics.com/website/social/instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-orgin-green rounded-full flex items-center justify-center text-white hover:bg-orgin-green-dark transition-colors"
                aria-label="Instagram"
              >
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

