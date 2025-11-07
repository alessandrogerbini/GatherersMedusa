import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const BrandStory = () => {
  return (
    <section className="section-container bg-white">
      <div className="content-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 md:order-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/brand/Chipmunk logo 500 x 500 px.png"
                alt="Gatherer's Granola Chipmunk"
                fill
                className="object-contain p-8 bg-gatherers-cream"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 md:order-2 space-y-6">
            <div className="space-y-3">
              <h2 className="heading-section">
                Family Recipes. Hand Stirred.
              </h2>
              <p className="text-xl text-gatherers-orange font-semibold italic">
                Crafted with love since [Year]
              </p>
            </div>

            <div className="space-y-4 text-body">
              <p>
                At Gatherer&apos;s Granola, we believe the best recipes are the ones passed down through generations. Our granola is made using traditional family recipes, carefully hand-stirred in small batches to ensure every cluster is perfect.
              </p>
              <p>
                We source only the finest ingredients—wholesome oats, real honey, premium nuts, and dried fruits—because we believe great taste starts with great ingredients. No shortcuts, no compromises, just honest, delicious granola.
              </p>
            </div>

            <div className="pt-4">
              <LocalizedClientLink href="/about">
                <button className="btn-primary">
                  Learn Our Story
                </button>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandStory


