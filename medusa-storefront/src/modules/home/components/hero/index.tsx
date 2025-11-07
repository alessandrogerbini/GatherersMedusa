import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative h-[70vh] min-h-[600px] w-full border-b border-gatherers-cream-dark overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gatherers-cream via-gatherers-cream-light to-white">
        <div className="absolute inset-0 opacity-10">
          {/* Decorative pattern */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-gatherers-orange rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-gatherers-green rounded-full blur-3xl opacity-20"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 content-container h-full flex flex-col justify-center items-center text-center gap-8 py-12">
        <div className="space-y-4 max-w-4xl">
          <h1 className="heading-display text-gatherers-brown">
            Family Recipes. <br />
            <span className="text-gatherers-orange">Hand Stirred.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gatherers-brown-light max-w-2xl mx-auto leading-relaxed">
            Discover the wholesome goodness of artisan granola, crafted in small batches 
            with premium ingredients and time-honored family recipes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <LocalizedClientLink href="/store">
            <button className="btn-primary text-lg px-8 py-4">
              Shop Granola
            </button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/about">
            <button className="btn-secondary text-lg px-8 py-4">
              Our Story
            </button>
          </LocalizedClientLink>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-gatherers-brown-light">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>100% Natural Ingredients</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>No Preservatives</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Small Batch Crafted</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
