import { Metadata } from "next"
import Image from "next/image"
import NewsletterSignup from "@modules/common/components/mailchimp-signup"

export const metadata: Metadata = {
  title: "About Orgin Organics - Organic Farming & Sustainability",
  description:
    "Learn about Orgin Organics' mission, our commitment to organic farming, sustainable practices, and the story behind our premium organic nuts.",
}

export default async function OrginAboutPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-gradient-to-br from-orgin-green to-orgin-green-dark overflow-hidden">
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
      </div>

      {/* Origin Story */}
      <section className="section-container bg-white">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="orgin-heading-section">Our Origin Story</h2>
              <p className="text-xl text-orgin-green italic">
                From Seed to Snack
              </p>
            </div>

            <div className="space-y-8 orgin-text-body">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-orgin-green">
                    Rooted in Purpose
                  </h3>
                  <p>
                    Orgin Organics was born from a simple belief: food should be good for you 
                    and good for the planet. We started with a vision to create organic snacks 
                    that honor the earth while delivering exceptional taste and nutrition.
                  </p>
                  <p>
                    Our journey began with organic farmers who shared our passion for sustainable 
                    agriculture. Together, we discovered that when you respect the land, use 
                    natural methods, and never compromise on quality, the results speak for themselves.
                  </p>
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/brand/orgin/Orgin logo with slogan.png"
                    alt="Orgin Organics"
                    fill
                    className="object-contain p-8 bg-orgin-earth"
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
                  biodiversity, and the well-being of farming communities.
                </p>
                <p>
                  Every nut we source is certified USDA organic, ensuring it meets the highest 
                  standards for purity and sustainability. We work directly with farms that use 
                  regenerative practices, building soil health while producing exceptional crops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-container bg-orgin-earth-cream">
        <div className="content-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-orgin-green">
                <h3 className="text-2xl font-bold text-orgin-green mb-4" style={{fontFamily: 'var(--font-playfair)'}}>Our Mission</h3>
                <p className="orgin-text-body">
                  To provide premium organic nuts that nourish people and planet, 
                  supporting sustainable farming practices while delivering exceptional 
                  taste and quality in every bite.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-orgin-green">
                <h3 className="text-2xl font-bold text-orgin-green mb-4" style={{fontFamily: 'var(--font-playfair)'}}>Our Vision</h3>
                <p className="orgin-text-body">
                  A world where organic agriculture is the norm, where consumers make 
                  informed choices about their food, and where every purchase supports 
                  a healthier planet for future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organic Certification Process */}
      <section className="section-container bg-white">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="orgin-heading-section text-center mb-12">
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
      <section className="section-container bg-gradient-to-br from-orgin-green to-orgin-green-light text-white">
        <div className="content-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
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
      <section className="section-container bg-white">
        <div className="content-container">
          <div className="max-w-4xl mx-auto bg-orgin-earth rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-orgin-green-dark mb-6">
              Experience the Organic Difference
            </h2>
            <p className="text-lg text-orgin-earth-brown mb-8 max-w-2xl mx-auto">
              Taste the purity of USDA-certified organic nuts. Every bite supports sustainable 
              farming and a healthier planet.
            </p>
            <a href="/store" className="inline-block btn-orgin-primary text-lg">
              Shop Organic Nuts
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-container botanical-bg">
        <div className="content-container">
          <div className="max-w-3xl mx-auto">
            <NewsletterSignup
              title="Join the Organic Movement"
              description="Get updates on sustainable farming, new flavors, and exclusive offers from Orgin Organics."
            />
          </div>
        </div>
      </section>
    </>
  )
}

