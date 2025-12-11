import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <header className="relative w-full border-b border-gatherers-cream-dark overflow-hidden bg-gradient-to-br from-gatherers-cream via-gatherers-cream-light to-white" role="banner">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gatherers-orange rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gatherers-green rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 content-container">
        <div className="grid small:grid-cols-2 gap-8 small:gap-12 items-center min-h-[600px] small:min-h-[700px] py-12 small:py-0">
          
          {/* Left side: Text content */}
          <div className="flex flex-col justify-center order-2 small:order-1 text-center small:text-left">
            <div className="space-y-6">
              <h1 className="heading-display text-gatherers-brown">
                Family Recipes. <br />
                <span className="text-gatherers-orange">Hand Stirred.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gatherers-brown-light max-w-xl leading-relaxed font-dm-sans">
                Every bite delivers the warmth of family tradition. Small-batch crafted with 
                premium ingredients, our hand-stirred granola brings generations of love to your table.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center small:items-start mt-8">
              <LocalizedClientLink href="/collections/granola">
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
            <div className="mt-10 flex flex-wrap justify-center small:justify-start gap-6 text-sm text-gatherers-brown-light font-dm-sans">
              <div className="flex items-center gap-2">
                <span className="text-gatherers-orange text-xl">✓</span>
                <span>100% Natural Ingredients</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gatherers-orange text-xl">✓</span>
                <span>No Preservatives</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gatherers-orange text-xl">✓</span>
                <span>Small Batch Crafted</span>
              </div>
            </div>
          </div>

          {/* Right side: Hero image */}
          <div className="relative order-1 small:order-2 flex justify-center small:justify-end">
            <div className="relative w-full max-w-md small:max-w-lg aspect-square">
              {/* Decorative ring behind image */}
              <div className="absolute inset-0 rounded-full border-4 border-gatherers-orange/20 scale-110"></div>
              <div className="absolute inset-0 rounded-full border-2 border-gatherers-cream-dark scale-105"></div>
              
              {/* Main image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/hero/granola-hero.jpg"
                  alt="Delicious handcrafted granola"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 400px, 500px"
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-gatherers-brown/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
