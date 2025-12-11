import LocalizedClientLink from "@modules/common/components/localized-client-link"

const StorySection = () => {
  return (
    <section className="section-container bg-white" aria-labelledby="nybs-story-heading">
      <div className="content-container">
        {/* Main Headline */}
        <div className="text-center mb-12">
          <div className="border-y-4 border-nybs-black py-4 mb-4">
            <h2 id="nybs-story-heading" className="nybs-heading-section">
              EXTRA! EXTRA!
              <br />
              NYC SNACKS TAKE OVER!
            </h2>
          </div>
          <p className="text-lg md:text-xl font-bold text-nybs-red uppercase tracking-wide">
            Empire State Flavors Revolutionize Snack Industry
          </p>
        </div>

        {/* Newspaper Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Column 1 */}
          <div className="newsprint-card p-6">
            <div className="border-b-2 border-nybs-black pb-2 mb-4">
              <h3 className="text-2xl font-black uppercase">THE ORIGIN</h3>
              <p className="text-xs uppercase tracking-wider text-gray-600">Vol. 1 | Since 2024</p>
            </div>
            <p className="nybs-text-body leading-relaxed">
              Born in the heart of the Big Apple, NYBS emerged from a simple truth: New Yorkers know 
              good food. We&apos;re picky, loud about it, and we won&apos;t settle for boring snacks. 
              Life&apos;s too short for bland.
            </p>
            <p className="nybs-text-body leading-relaxed mt-4">
              What started as a corner bodega dream became a full-blown snack revolution. We took 
              classic NYC flavors – bold, unapologetic, and impossible to ignore – and turned them 
              into the snacks you can&apos;t stop reaching for. Because once you taste real NYC flavor, 
              there&apos;s no going back.
            </p>
          </div>

          {/* Column 2 */}
          <div className="newsprint-card p-6">
            <div className="border-b-2 border-nybs-black pb-2 mb-4">
              <h3 className="text-2xl font-black uppercase">THE ATTITUDE</h3>
              <p className="text-xs uppercase tracking-wider text-gray-600">Special Report</p>
            </div>
            <p className="nybs-text-body leading-relaxed">
              Let&apos;s be real – we&apos;re New Yorkers. We&apos;re passionate, we&apos;re direct, 
              and we definitely think we&apos;re the best. But can you blame us when our snacks are 
              this good? We&apos;ve earned the right to brag.
            </p>
            <p className="nybs-text-body leading-relaxed mt-4">
              Every flavor is inspired by the five boroughs, from Manhattan hustle to Brooklyn cool. 
              We don&apos;t do subtle. We do BOLD. Because if it&apos;s worth eating, it&apos;s worth 
              shouting about from the rooftops—and these snacks are definitely worth it.
            </p>
            <div className="mt-4 p-3 bg-nybs-red text-white text-center font-bold uppercase text-sm">
              Made by New Yorkers, For Everyone
            </div>
          </div>

          {/* Column 3 */}
          <div className="newsprint-card p-6">
            <div className="border-b-2 border-nybs-black pb-2 mb-4">
              <h3 className="text-2xl font-black uppercase">THE MISSION</h3>
              <p className="text-xs uppercase tracking-wider text-gray-600">Exclusive Interview</p>
            </div>
            <p className="nybs-text-body leading-relaxed">
              Our mission? Simple. Bring authentic NYC flavor to every pantry in America. 
              We&apos;re not trying to reinvent the wheel – we&apos;re just making it taste better. 
              Way better.
            </p>
            <p className="nybs-text-body leading-relaxed mt-4">
              Quality ingredients, bold seasonings, and that unmistakable New York attitude. 
              Whether you&apos;re a native or just wish you were, these snacks bring the city to you—one 
              delicious bite at a time.
            </p>
            <blockquote className="mt-4 border-l-4 border-nybs-red pl-4 italic text-lg">
              &quot;Fuhgeddabout those other snacks. These are the real deal.&quot;
            </blockquote>
          </div>
        </div>

        {/* Breaking News Box */}
        <div className="bg-nybs-black text-white p-8 border-4 border-nybs-red">
          <div className="text-center">
            <span className="inline-block bg-nybs-red px-6 py-2 font-black text-2xl uppercase mb-4">
              Breaking News
            </span>
            <h3 className="text-3xl md:text-5xl font-black uppercase mb-4">
              Empire State Flavors Are Here!
            </h3>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
              From Everything Bagel to Smoked Mixed Nuts, we&apos;ve captured New York&apos;s 
              iconic tastes in every bag.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold">
              <LocalizedClientLink 
                href="/products/nybs-everything-bagel-cashews-3-5oz"
                className="bg-white text-nybs-black px-4 py-2 hover:bg-nybs-red hover:text-white transition-colors"
              >
                ★ EVERYTHING BAGEL
              </LocalizedClientLink>
              <LocalizedClientLink 
                href="/products/nybs-honey-roasted-cashews-3-5oz"
                className="bg-white text-nybs-black px-4 py-2 hover:bg-nybs-red hover:text-white transition-colors"
              >
                ★ HONEY ROASTED
              </LocalizedClientLink>
              <LocalizedClientLink 
                href="/products/nybs-ranch-cashews-3-5oz"
                className="bg-white text-nybs-black px-4 py-2 hover:bg-nybs-red hover:text-white transition-colors"
              >
                ★ RANCH
              </LocalizedClientLink>
              <LocalizedClientLink 
                href="/products/nybs-smoked-mixed-nuts-3-5oz"
                className="bg-white text-nybs-black px-4 py-2 hover:bg-nybs-red hover:text-white transition-colors"
              >
                ★ SMOKED MIXED NUTS
              </LocalizedClientLink>
            </div>
          </div>
        </div>

        {/* Fun Fact Boxes */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="border-4 border-nybs-black p-6 bg-nybs-newsprint-light">
            <h4 className="text-2xl font-black uppercase mb-3 flex items-center gap-2">
              <span className="text-nybs-red">★</span>
              Did You Know?
            </h4>
            <p className="nybs-text-body">
              New Yorkers consume more snacks per capita than any other US city. We know what 
              we&apos;re talking about when it comes to flavor!
            </p>
          </div>
          <div className="border-4 border-nybs-black p-6 bg-nybs-newsprint-light">
            <h4 className="text-2xl font-black uppercase mb-3 flex items-center gap-2">
              <span className="text-nybs-red">★</span>
              Local Love
            </h4>
            <p className="nybs-text-body">
              Every batch is made with the same care and attention we give to arguing about 
              the best pizza slice in the city. (It&apos;s very serious business.)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySection

