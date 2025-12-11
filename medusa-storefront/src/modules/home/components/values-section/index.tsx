import HandcraftedIcon from "@modules/common/icons/handcrafted"
import IngredientsIcon from "@modules/common/icons/ingredients"
import FamilyRecipeIcon from "@modules/common/icons/family-recipe"
import HeartIcon from "@modules/common/icons/heart"

const ValuesSection = () => {
  const values = [
    {
      Icon: HandcraftedIcon,
      title: "Handcrafted",
      description: "Every batch is carefully hand-stirred and monitored to ensure the perfect texture and flavor in every bite—because quality can't be rushed.",
    },
    {
      Icon: IngredientsIcon,
      title: "Quality Ingredients",
      description: "We source premium, wholesome ingredients—no artificial flavors, no preservatives, just real food you can feel good about serving your family.",
    },
    {
      Icon: FamilyRecipeIcon,
      title: "Family Recipes",
      description: "Time-tested recipes passed down through generations, perfected with love and care. Each flavor carries the warmth of family tradition.",
    },
    {
      Icon: HeartIcon,
      title: "Made with Love",
      description: "We pour our hearts into every batch, treating each one as if we're making it for our own family. You can taste the difference.",
    },
  ]

  return (
    <section className="section-container bg-gatherers-cream" aria-labelledby="values-heading">
      <div className="content-container">
        <div className="text-center mb-12">
          <h2 id="values-heading" className="heading-section">Why Gatherer&apos;s?</h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            We&apos;re not just making granola—we&apos;re preserving a tradition of quality, 
            flavor, and wholesome goodness. Every cluster tells a story of family recipes, 
            careful craftsmanship, and ingredients you can trust.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <article
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4 text-gatherers-orange">
                <value.Icon size={56} />
              </div>
              <h3 className="text-xl font-bold text-gatherers-brown mb-3 font-fraunces">
                {value.title}
              </h3>
              <p className="text-sm text-gatherers-brown-light leading-relaxed font-dm-sans">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection


