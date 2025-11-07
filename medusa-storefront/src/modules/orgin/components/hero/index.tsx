import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const OrginHero = () => {
  return (
    <div className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-br from-orgin-green-dark via-orgin-green to-orgin-green-light">
      {/* Botanical overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orgin-green-lighter rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full blur-2xl"></div>
      </div>

      {/* Decorative leaf elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute -top-10 -left-10 w-64 h-64 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-white rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 content-container h-full py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Orgin Organics
              </h1>
              <p className="text-2xl md:text-3xl font-light italic text-white/90">
                Organic Roots Grown In Nature
              </p>
            </div>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
              Experience the pure taste of USDA-certified organic nuts, sustainably sourced 
              and thoughtfully crafted for those who care about what they eat and where it comes from.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <LocalizedClientLink href="/store">
                <button className="px-8 py-4 bg-white text-orgin-green font-bold text-lg rounded-lg hover:bg-orgin-earth-cream transition-colors shadow-lg">
                  Discover Our Organic Nuts
                </button>
              </LocalizedClientLink>
              <LocalizedClientLink href="/orgin/about">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/10 transition-colors">
                  Our Story
                </button>
              </LocalizedClientLink>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-8 text-sm text-white/90">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <span className="font-semibold">USDA Organic</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <span className="font-semibold">Non-GMO</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <span className="font-semibold">Sustainably Sourced</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-2xl"></div>
              <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/images/brand/orgin/Orgin Logo Green.png"
                  alt="Orgin Organics"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24" preserveAspectRatio="none">
          <path
            d="M0,64 C360,16 720,48 1080,80 C1260,96 1350,104 1440,104 L1440,120 L0,120 Z"
            fill="white"
            className="fill-current text-white"
          />
        </svg>
      </div>
    </div>
  )
}

export default OrginHero

