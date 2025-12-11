import QualityBadgeIcon from "@modules/common/icons/quality-badge"
import AuthenticityIcon from "@modules/common/icons/authenticity"
import SustainabilityIcon from "@modules/common/icons/sustainability"
import CommunityIcon from "@modules/common/icons/community"

const ValuesGrid = () => {
  const coreValues = [
    {
      Icon: QualityBadgeIcon,
      title: "Quality First",
      description: "We never compromise on ingredients or craftsmanship. Every batch meets our high standards before it reaches your table.",
    },
    {
      Icon: AuthenticityIcon,
      title: "Authenticity",
      description: "Real recipes, real ingredients, real people. We believe in being genuine in everything we do.",
    },
    {
      Icon: SustainabilityIcon,
      title: "Sustainability",
      description: "We care about our planet and work to minimize our environmental impact through responsible sourcing and packaging.",
    },
    {
      Icon: CommunityIcon,
      title: "Community",
      description: "We're more than a granola company—we're a community of people who care about good food and healthy living.",
    },
  ]

  return (
    <section className="section-container bg-gatherers-cream">
      <div className="content-container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-section">Our Core Values</h2>
            <p className="text-body max-w-2xl mx-auto mt-4">
              These principles guide everything we do, from sourcing ingredients 
              to crafting each batch of granola.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4 text-gatherers-orange">
                  <value.Icon size={56} />
                </div>
                <h3 className="text-2xl font-bold text-gatherers-brown mb-4">
                  {value.title}
                </h3>
                <p className="text-base text-gatherers-brown-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValuesGrid


