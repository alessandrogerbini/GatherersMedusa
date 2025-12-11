import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const NYBSHero = () => {
  return (
    <header className="relative min-h-[80vh] w-full newsprint-bg" role="banner">
      {/* Tabloid Banner Header */}
      <div className="tabloid-banner text-center">
        <p className="text-lg md:text-2xl italic tracking-wider">NEW YORK&apos;S BEST SNACKS™</p>
      </div>

      {/* Main Content */}
      <div className="content-container py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* NYBS Logo */}
            <div className="relative">
              <Image
                src="/images/brand/nybs/NYBS header.png"
                alt="NYBS - New York's Best Snacks"
                width={800}
                height={200}
                className="w-full max-w-2xl"
                priority
              />
            </div>

            {/* Headline */}
            <div className="border-y-4 border-nybs-black py-4">
              <h1 className="nybs-heading-display leading-none">
                SNACKS SO GOOD,
                <br />
                YOU CAN&apos;T
                <br />
                FUHGEDDABOUDIT!
              </h1>
            </div>

            {/* Subheadline */}
            <div className="bg-white border-2 border-nybs-black p-6 shadow-lg">
              <p className="text-xl md:text-2xl font-bold text-nybs-black-ink uppercase">
                EXTRA! EXTRA! Empire State Flavors Straight From The Five Boroughs To Your Pantry!
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <LocalizedClientLink href="/collections/NYBS">
                <button className="btn-nybs-primary text-lg px-8 py-4">
                  Shop Now
                </button>
              </LocalizedClientLink>
              <LocalizedClientLink href="/nybs/about">
                <button className="btn-nybs-secondary text-lg px-8 py-4">
                  Read Our Story
                </button>
              </LocalizedClientLink>
            </div>

            {/* Trust Badges - Tabloid Style */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="newsprint-card p-4 text-center">
                <span className="text-4xl font-black block mb-2 text-nybs-red">★</span>
                <span className="font-bold text-sm uppercase">Made in NYC</span>
              </div>
              <div className="newsprint-card p-4 text-center">
                <span className="text-4xl font-black block mb-2 text-nybs-red">★</span>
                <span className="font-bold text-sm uppercase">Award Winning</span>
              </div>
              <div className="newsprint-card p-4 text-center">
                <span className="text-4xl font-black block mb-2 text-nybs-red">★</span>
                <span className="font-bold text-sm uppercase">Bold Flavors</span>
              </div>
            </div>
          </div>

          {/* Right Image - Featured Product */}
          <div className="hidden lg:block">
            <div className="bg-white border-8 border-nybs-black p-8 shadow-2xl transform rotate-2">
              <div className="bg-nybs-newsprint p-6 -rotate-2">
                <div className="text-center space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest border-b-2 border-nybs-black pb-2">
                    Featured This Week
                  </p>
                  <h3 className="text-4xl font-black uppercase leading-none">
                    SNACK ATTACK
                    <br />
                    EDITION
                  </h3>
                  <div className="border-4 border-nybs-black bg-white p-4">
                    <Image
                      src="/images/brand/nybs/Website Letterhead.png"
                      alt="NYBS Featured Product - New York's Best Snacks"
                      width={400}
                      height={400}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 1024px) 0vw, 400px"
                    />
                  </div>
                  <p className="text-sm font-bold italic">
                    &quot;IMPOSSIBLE TO RESIST!&quot; - Daily Snacker
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breaking News Ticker */}
      <div className="bg-nybs-black text-white py-2 border-y-2 border-nybs-red">
        <div className="content-container">
          <div className="flex items-center overflow-hidden">
            <span className="bg-nybs-red px-4 py-1 font-bold uppercase text-sm mr-4">
              Breaking
            </span>
            <div className="animate-marquee whitespace-nowrap">
              <span className="mx-8 font-bold">
                ★ NEW FLAVORS JUST DROPPED ★
              </span>
              <span className="mx-8">
                Critics Call Them &quot;Dangerously Delicious&quot;
              </span>
              <span className="mx-8">
                ★ Winner: Best NYC Snack 2024 ★
              </span>
              <span className="mx-8">
                Get Yours Before They&apos;re Gone!
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NYBSHero

