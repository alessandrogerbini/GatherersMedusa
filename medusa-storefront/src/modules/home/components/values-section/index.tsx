const ValuesSection = () => {
  const values = [
    {
      icon: "🥄",
      title: "Handcrafted",
      description: "Every batch is carefully hand-stirred and monitored to ensure the perfect texture and flavor in every bite.",
    },
    {
      icon: "🌾",
      title: "Quality Ingredients",
      description: "We source premium, wholesome ingredients—no artificial flavors, no preservatives, just real food.",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Family Recipes",
      description: "Time-tested recipes passed down through generations, perfected with love and care over the years.",
    },
    {
      icon: "💚",
      title: "Made with Love",
      description: "We pour our hearts into every batch, treating each one as if we're making it for our own family.",
    },
  ]

  return (
    <section className="section-container bg-gatherers-cream">
      <div className="content-container">
        <div className="text-center mb-12">
          <h2 className="heading-section">Why Gatherer&apos;s?</h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            We&apos;re not just making granola—we&apos;re crafting a tradition of quality, 
            flavor, and wholesome goodness that you can taste in every cluster.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-gatherers-brown mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-gatherers-brown-light leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection


