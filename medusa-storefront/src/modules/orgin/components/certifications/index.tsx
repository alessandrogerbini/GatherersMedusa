const Certifications = () => {
  const certifications = [
    {
      title: "USDA Organic Certified",
      description: "All our products are certified organic by the USDA, ensuring strict adherence to organic standards.",
    },
    {
      title: "Non-GMO Project Verified",
      description: "We never use genetically modified organisms. Every nut is naturally grown and verified non-GMO.",
    },
    {
      title: "Gluten-Free",
      description: "Our nuts are naturally gluten-free, making them safe for those with gluten sensitivities.",
    },
    {
      title: "Vegan Friendly",
      description: "Plant-based nutrition at its finest. All our products are 100% vegan.",
    },
    {
      title: "Sustainable Packaging",
      description: "We use recyclable and compostable packaging materials whenever possible.",
    },
    {
      title: "Minimal Processing",
      description: "Lightly roasted and naturally flavored to preserve nutrients and authentic taste.",
    },
  ]

  const values = [
    {
      title: "Transparency",
      description: "We believe you have the right to know exactly what's in your food and where it comes from.",
    },
    {
      title: "Quality",
      description: "We never compromise on quality. Every batch meets our rigorous standards.",
    },
    {
      title: "Sustainability",
      description: "Protecting the planet isn't optional—it's essential to everything we do.",
    },
    {
      title: "Integrity",
      description: "We do what we say, and we say what we do. Honest, authentic, always.",
    },
  ]

  return (
    <section className="section-container bg-white">
      <div className="content-container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="orgin-heading-section">Certifications & Values</h2>
            <p className="text-xl text-orgin-earth-brown max-w-3xl mx-auto">
              Our certifications aren&apos;t just badges—they&apos;re promises we keep to you, 
              to farmers, and to the earth.
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-orgin-earth rounded-xl p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 border-t-4 border-orgin-green"
              >
                <h3 className="text-lg font-bold text-orgin-green-dark mb-3" style={{fontFamily: 'var(--font-playfair)'}}>
                  {cert.title}
                </h3>
                <p className="text-sm text-orgin-earth-brown" style={{fontFamily: 'var(--font-bree)'}}>
                  {cert.description}
                </p>
              </div>
            ))}
          </div>

          {/* Values Section */}
          <div className="bg-gradient-to-br from-orgin-green to-orgin-green-dark rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Our Core Values
              </h3>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                These principles guide every decision we make, from sourcing to packaging.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                  <p className="text-white/80 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg italic text-white/90">
                &quot;We don&apos;t just follow organic standards—we set them.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certifications

