import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const BrandStory = () => {
  return (
    <section className="section-container bg-white" aria-labelledby="brand-story-heading">
      <div className="content-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 md:order-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/brand/Chipmunk logo 500 x 500 px.png"
                alt="Gatherer's Granola Chipmunk Logo - Handcrafted artisan granola brand"
                fill
                className="object-contain p-8 bg-gatherers-cream"
              />
            </div>
          </div>

          {/* Content Side */}
          <article className="order-1 md:order-2 space-y-6">
            <div className="space-y-3">
              <h2 id="brand-story-heading" className="heading-section">
                Family Recipes. Hand Stirred.
              </h2>
              <p className="text-xl text-gatherers-orange font-semibold italic">
                Crafted with love since 2010
              </p>
            </div>

            <div className="space-y-4 text-body">
              <p>
                At Gatherer&apos;s Granola, the best recipes are the ones passed down through generations. 
                Each batch is hand-stirred in small quantities using traditional family recipes, ensuring 
                every cluster delivers the perfect texture and flavor you can only achieve with care and attention.
              </p>
              <p>
                We source only the finest ingredients—premium oats, real honey, wholesome nuts, and naturally 
                dried fruits—because we believe great taste starts with great ingredients. No shortcuts, 
                no compromises, just honest, delicious granola that tastes like home.
              </p>
            </div>

            <div className="pt-4">
              <LocalizedClientLink href="/about">
                <button className="btn-primary">
                  Learn Our Story
                </button>
              </LocalizedClientLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default BrandStory


