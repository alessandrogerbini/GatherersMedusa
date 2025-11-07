const SourcingSection = () => {
  const sourcingPrinciples = [
    {
      title: "Direct Farm Partnerships",
      description: "We work directly with certified organic farms, building long-term relationships based on trust, fair pricing, and shared values.",
    },
    {
      title: "Regenerative Agriculture",
      description: "Our partner farms use regenerative practices that restore soil health, increase biodiversity, and sequester carbon.",
    },
    {
      title: "Quality First",
      description: "Every batch is carefully inspected to ensure only the finest organic nuts make it into our products.",
    },
    {
      title: "Transparent Supply Chain",
      description: "From farm to shelf, we maintain full traceability so you know exactly where your food comes from.",
    },
  ]

  return (
    <section className="section-container bg-white">
      <div className="content-container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="orgin-heading-section">Sourcing & Sustainability</h2>
            <p className="text-xl text-orgin-earth-brown max-w-3xl mx-auto">
              Our commitment to organic goes beyond certification. We&apos;re dedicated to 
              sustainable practices that benefit farmers, communities, and the planet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {sourcingPrinciples.map((principle, index) => (
              <div
                key={index}
                className="bg-orgin-earth rounded-xl p-8 hover:shadow-xl transition-shadow border-l-4 border-orgin-green"
              >
                <h3 className="text-xl font-bold text-orgin-green-dark mb-3" style={{fontFamily: 'var(--font-playfair)'}}>
                  {principle.title}
                </h3>
                <p className="text-orgin-earth-brown leading-relaxed" style={{fontFamily: 'var(--font-bree)'}}>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          {/* Environmental impact */}
          <div className="bg-gradient-to-r from-orgin-green to-orgin-green-light rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold">
                Our Environmental Commitment
              </h3>
              <p className="text-lg text-white/90 leading-relaxed">
                We&apos;re actively working to minimize our carbon footprint through sustainable 
                packaging, efficient transportation, and support for carbon offset programs. 
                Every purchase helps support organic farming practices that are better for 
                the earth.
              </p>
              <div className="flex flex-wrap justify-center gap-8 pt-6">
                <div className="text-center bg-white/10 px-6 py-4 rounded-lg">
                  <div className="text-4xl font-bold">100%</div>
                  <div className="text-sm text-white/80">Organic Certified</div>
                </div>
                <div className="text-center bg-white/10 px-6 py-4 rounded-lg">
                  <div className="text-4xl font-bold">0</div>
                  <div className="text-sm text-white/80">Synthetic Pesticides</div>
                </div>
                <div className="text-center bg-white/10 px-6 py-4 rounded-lg">
                  <div className="text-sm font-bold text-white">Eco-Friendly</div>
                  <div className="text-sm text-white/80">Packaging</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SourcingSection

