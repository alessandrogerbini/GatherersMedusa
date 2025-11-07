import Image from "next/image"

const PhilosophySection = () => {
  return (
    <section className="section-container bg-white">
      <div className="content-container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="orgin-heading-section">Our Philosophy</h2>
            <p className="text-xl text-orgin-earth-brown max-w-3xl mx-auto">
              At Orgin, we believe that organic isn&apos;t just a certification—it&apos;s a commitment 
              to the earth, to farmers, and to you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div className="order-2 md:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-orgin-green/20"></div>
                <Image
                  src="/images/brand/orgin/Orgin Logo Green.png"
                  alt="Organic farming"
                  fill
                  className="object-contain p-12 bg-orgin-earth"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 md:order-2 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-orgin-green mb-4">
                  Rooted in Organic Principles
                </h3>
                <p className="orgin-text-body">
                  Every nut we source comes from certified organic farms that prioritize 
                  soil health, biodiversity, and natural growing practices. No synthetic pesticides, 
                  no artificial fertilizers—just pure, earth-grown goodness.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-orgin-green mb-4">
                  Sustainable from Farm to Table
                </h3>
                <p className="orgin-text-body">
                  We partner directly with organic farmers who share our vision of sustainable 
                  agriculture. By supporting regenerative farming practices, we&apos;re not just 
                  creating delicious snacks—we&apos;re nurturing the planet for future generations.
                </p>
              </div>
            </div>
          </div>

          {/* Value cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-orgin-earth rounded-xl p-6 hover:shadow-lg transition-shadow border-l-4 border-orgin-green">
              <h4 className="font-bold text-orgin-green-dark mb-2 text-lg" style={{fontFamily: 'var(--font-playfair)'}}>Certified Organic</h4>
              <p className="text-sm text-orgin-earth-brown" style={{fontFamily: 'var(--font-bree)'}}>
                USDA certified organic ingredients in every product
              </p>
            </div>

            <div className="bg-orgin-earth rounded-xl p-6 hover:shadow-lg transition-shadow border-l-4 border-orgin-green">
              <h4 className="font-bold text-orgin-green-dark mb-2 text-lg" style={{fontFamily: 'var(--font-playfair)'}}>Direct Partnerships</h4>
              <p className="text-sm text-orgin-earth-brown" style={{fontFamily: 'var(--font-bree)'}}>
                Working directly with organic farmers worldwide
              </p>
            </div>

            <div className="bg-orgin-earth rounded-xl p-6 hover:shadow-lg transition-shadow border-l-4 border-orgin-green">
              <h4 className="font-bold text-orgin-green-dark mb-2 text-lg" style={{fontFamily: 'var(--font-playfair)'}}>Earth Conscious</h4>
              <p className="text-sm text-orgin-earth-brown" style={{fontFamily: 'var(--font-bree)'}}>
                Committed to reducing our environmental impact
              </p>
            </div>

            <div className="bg-orgin-earth rounded-xl p-6 hover:shadow-lg transition-shadow border-l-4 border-orgin-green">
              <h4 className="font-bold text-orgin-green-dark mb-2 text-lg" style={{fontFamily: 'var(--font-playfair)'}}>Pure & Simple</h4>
              <p className="text-sm text-orgin-earth-brown" style={{fontFamily: 'var(--font-bree)'}}>
                Minimal processing to preserve natural nutrients
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhilosophySection

