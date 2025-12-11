import LocalizedClientLink from "@modules/common/components/localized-client-link"

const NYCSpirit = () => {
  const attitudes = [
    {
      icon: "★",
      title: "AUTHENTIC NYC",
      description: "Made by real New Yorkers who actually know good food when they taste it.",
    },
    {
      icon: "★",
      title: "BOLD & UNAPOLOGETIC",
      description: "We don't do subtle. If you wanted boring, you came to the wrong place.",
    },
    {
      icon: "★",
      title: "ALWAYS HUSTLING",
      description: "Like the city that never sleeps, our flavors never quit.",
    },
    {
      icon: "★",
      title: "DIVERSE FLAVORS",
      description: "Five boroughs, infinite tastes. Just like the greatest city on earth.",
    },
  ]

  const funFacts = [
    {
      stat: "8.3M",
      label: "New Yorkers Can't Be Wrong",
      detail: "That's a lot of opinions about snacks",
    },
    {
      stat: "5",
      label: "Boroughs of Flavor",
      detail: "Each one bringing something special",
    },
    {
      stat: "24/7",
      label: "Snacking Like The City",
      detail: "We never stop, so neither should you",
    },
    {
      stat: "100%",
      label: "New York Attitude",
      detail: "Accept no substitutes",
    },
  ]

  return (
    <section className="section-container newsprint-bg" aria-labelledby="nybs-spirit-heading">
      <div className="content-container">
        {/* Main Headline */}
        <div className="text-center mb-12">
          <div className="bg-nybs-red text-white inline-block px-8 py-3 mb-4 border-4 border-nybs-black">
            <span className="text-sm font-bold uppercase tracking-widest">
              Opinion Editorial
            </span>
          </div>
          <h2 id="nybs-spirit-heading" className="nybs-heading-section mb-4">
            THE NYC DIFFERENCE:
            <br />
            IT&apos;S AN ATTITUDE
          </h2>
          <p className="text-xl font-bold text-nybs-black-ink max-w-3xl mx-auto">
            Why New York Snacks Hit Different (And We&apos;re Not Sorry About Being Right)
          </p>
        </div>

        {/* Attitude Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {attitudes.map((attitude, index) => (
            <div key={index} className="newsprint-card p-6 text-center hover:border-nybs-red transition-all">
              <span className="text-7xl font-black block mb-4 text-nybs-red">{attitude.icon}</span>
              <h3 className="text-xl font-black uppercase mb-3 text-nybs-black">
                {attitude.title}
              </h3>
              <p className="text-sm font-bold text-nybs-black-ink">
                {attitude.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Box - Only In New York */}
        <div className="bg-white border-4 border-nybs-black p-8 md:p-12 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block bg-nybs-black text-white px-6 py-2 font-black uppercase text-sm mb-4">
                Special Report
              </span>
              <h3 className="text-3xl md:text-4xl font-black uppercase mb-4">
                ONLY IN NEW YORK
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-nybs-red pl-6">
                <h4 className="font-black uppercase text-xl mb-3">
                  What Makes Us Different?
                </h4>
                <p className="nybs-text-body mb-4">
                  It&apos;s simple: we&apos;re from New York. We grew up with the best food in the 
                  world right outside our door. We know what good tastes like because we&apos;ve 
                  been spoiled by bagels, pizza, and deli sandwiches that would make your hometown 
                  cry. That&apos;s not arrogance—that&apos;s just facts.
                </p>
                <p className="nybs-text-body">
                  So when we say our snacks are the best? We&apos;re not bragging. We&apos;re just 
                  stating facts. (Okay, maybe we&apos;re bragging a little. It&apos;s the New York way. 
                  And honestly? You&apos;ll thank us after you try them.)
                </p>
              </div>

              <div className="border-l-4 border-nybs-red pl-6">
                <h4 className="font-black uppercase text-xl mb-3">
                  The Secret Ingredient
                </h4>
                <p className="nybs-text-body mb-4">
                  It&apos;s not actually a secret – it&apos;s attitude. That unmistakable New York 
                  confidence that comes from living in the greatest city on earth. We put that same 
                  energy into every flavor, and it shows in every bite.
                </p>
                <p className="nybs-text-body">
                  Bold? Yes. Extra? Absolutely. Apologetic about it? Not a chance. Try our snacks 
                  and you&apos;ll taste what we mean—and you&apos;ll understand why we&apos;re so confident.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-nybs-black text-white p-8 md:p-12 border-4 border-nybs-red mb-12">
          <h3 className="text-3xl font-black uppercase text-center mb-8">
            BY THE NUMBERS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {funFacts.map((fact, index) => (
              <div key={index} className="text-center border-2 border-white p-6">
                <div className="text-4xl md:text-5xl font-black text-nybs-red mb-2">
                  {fact.stat}
                </div>
                <div className="font-black uppercase text-sm mb-2">
                  {fact.label}
                </div>
                <div className="text-xs opacity-80">
                  {fact.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Style Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="newsprint-card p-6">
            <div className="mb-4">
              <span className="text-5xl font-black text-nybs-red">★</span>
            </div>
            <h4 className="font-black uppercase text-lg mb-3">
              Manhattan Energy
            </h4>
            <p className="text-sm font-bold italic mb-3">
              &quot;Fast-paced flavor for fast-paced people. No time to waste on boring snacks.&quot;
            </p>
            <cite className="text-xs font-bold not-italic">
              - Midtown Commuter
            </cite>
          </div>

          <div className="newsprint-card p-6">
            <div className="mb-4">
              <span className="text-5xl font-black text-nybs-red">★</span>
            </div>
            <h4 className="font-black uppercase text-lg mb-3">
              Brooklyn Cool
            </h4>
            <p className="text-sm font-bold italic mb-3">
              &quot;These snacks have the edge I expect from anything coming out of Brooklyn.&quot;
            </p>
            <cite className="text-xs font-bold not-italic">
              - Williamsburg Foodie
            </cite>
          </div>

          <div className="newsprint-card p-6">
            <div className="mb-4">
              <span className="text-5xl font-black text-nybs-red">★</span>
            </div>
            <h4 className="font-black uppercase text-lg mb-3">
              Queens Authenticity
            </h4>
            <p className="text-sm font-bold italic mb-3">
              &quot;Real flavors from real neighborhoods. This is what NYC tastes like.&quot;
            </p>
            <cite className="text-xs font-bold not-italic">
              - Astoria Native
            </cite>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-block border-4 border-nybs-black bg-white p-8 max-w-2xl">
            <h3 className="text-3xl font-black uppercase mb-4">
              READY TO TASTE
              <br />
              THE DIFFERENCE?
            </h3>
            <p className="text-lg font-bold mb-6 text-nybs-black-ink">
              Join the 8 million+ who already know: NYBS hits different.
            </p>
            <LocalizedClientLink href="/collections/NYBS">
              <button className="btn-nybs-primary text-lg px-10 py-4">
                Shop NYBS Now
              </button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NYCSpirit

