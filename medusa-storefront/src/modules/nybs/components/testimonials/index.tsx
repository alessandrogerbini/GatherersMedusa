const Testimonials = () => {
  const letters = [
    {
      author: "Tony M.",
      location: "Bronx, NY",
      date: "November 2024",
      letter: "Dear NYBS, I've been eating snacks my whole life and nothing comes close to what you're doing. The Everything Bagel chips? Fuhgeddaboudit. They're that good. My only complaint is I go through them too fast.",
      rating: 5,
    },
    {
      author: "Maria L.",
      location: "Staten Island, NY",
      date: "October 2024",
      letter: "I'm from New York. I'm picky about my food. These snacks pass the test. The Brooklyn Spicy has the right amount of kick without being ridiculous. Real flavor from real people who get it.",
      rating: 5,
    },
    {
      author: "Chen W.",
      location: "Queens, NY",
      date: "November 2024",
      letter: "Finally, someone gets it right! The flavors are bold, the crunch is perfect, and they actually taste like New York. Not some watered-down version for tourists. This is the real deal.",
      rating: 5,
    },
    {
      author: "Jessica R.",
      location: "Brooklyn, NY",
      date: "October 2024",
      letter: "I brought these to a party and everyone asked where I got them. They're that good. The Pizza Party flavor is dangerous – I can't stop eating it. Worth every penny.",
      rating: 5,
    },
    {
      author: "Mike D.",
      location: "Manhattan, NY",
      date: "September 2024",
      letter: "As a lifelong New Yorker, I approve this message. These snacks have the attitude and flavor I expect from anything claiming to be NYC. No notes. Just keep making them.",
      rating: 5,
    },
    {
      author: "Sarah K.",
      location: "Astoria, NY",
      date: "November 2024",
      letter: "The Deli Pickle chips remind me of the corner deli I grew up going to. That's not easy to capture in a bag. NYBS did it. Respect.",
      rating: 5,
    },
  ]

  return (
    <section className="section-container bg-white" aria-labelledby="nybs-testimonials-heading">
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="border-y-4 border-nybs-black py-6 mb-4">
            <h2 id="nybs-testimonials-heading" className="nybs-heading-section mb-2">
              LETTERS TO
              <br />
              THE EDITOR
            </h2>
            <p className="text-lg font-bold uppercase tracking-wider">
              What Real New Yorkers Are Saying
            </p>
          </div>
          <p className="text-xl font-bold text-nybs-black-ink max-w-3xl mx-auto">
            We don&apos;t need to tell you they&apos;re good. Let our customers do the talking.
          </p>
        </div>

        {/* Letters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {letters.map((letter, index) => (
            <div key={index} className="newsprint-card p-6 hover:border-nybs-red transition-all">
              {/* Letter Header */}
              <div className="border-b-2 border-nybs-black pb-3 mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-black uppercase text-lg">{letter.author}</h3>
                    <p className="text-sm font-bold text-gray-600">{letter.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(letter.rating)].map((_, i) => (
                        <span key={i} className="text-nybs-red text-lg">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Published: {letter.date}
                </p>
              </div>

              {/* Letter Content */}
              <div className="mb-4">
                <p className="text-sm nybs-text-body leading-relaxed">
                  <span className="text-2xl font-black text-nybs-red">&ldquo;</span>
                  {letter.letter}
                  <span className="text-2xl font-black text-nybs-red">&rdquo;</span>
                </p>
              </div>

              {/* Verified Badge */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-300">
                <span className="text-green-600">✓</span>
                <span className="text-xs font-bold uppercase">Verified Customer</span>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Box - Review Summary */}
        <div className="bg-nybs-black text-white p-8 md:p-12 border-4 border-nybs-red mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-black uppercase mb-4">
                THE VERDICT IS IN
              </h3>
              <p className="text-xl">New Yorkers Have Spoken. The Results Are Clear.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="border-2 border-white p-6">
                <div className="text-4xl font-black text-nybs-red mb-2">4.9/5</div>
                <div className="text-sm font-bold uppercase">Average Rating</div>
              </div>
              <div className="border-2 border-white p-6">
                <div className="text-4xl font-black text-nybs-red mb-2">95%</div>
                <div className="text-sm font-bold uppercase">Would Buy Again</div>
              </div>
              <div className="border-2 border-white p-6">
                <div className="text-4xl font-black text-nybs-red mb-2">1000+</div>
                <div className="text-sm font-bold uppercase">5-Star Reviews</div>
              </div>
              <div className="border-2 border-white p-6">
                <div className="text-4xl font-black text-nybs-red mb-2">100%</div>
                <div className="text-sm font-bold uppercase">NYC Approved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Write Your Own */}
        <div className="newsprint-card p-8 md:p-12 max-w-3xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-4">
              HAVE YOUR SAY
            </h3>
            <p className="text-lg font-bold mb-6 text-nybs-black-ink">
              Tried NYBS? Write to us. We read everything (yes, even the complaints).
            </p>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-2 border-nybs-black bg-white p-4 text-left">
                  <span className="text-xs font-bold uppercase block mb-2">Email Us:</span>
                  <span className="font-bold">feedback@nybs.com</span>
                </div>
                <div className="border-2 border-nybs-black bg-white p-4 text-left">
                  <span className="text-xs font-bold uppercase block mb-2">Tag Us:</span>
                  <span className="font-bold">@NYBSnacks</span>
                </div>
              </div>
              <button className="btn-nybs-primary w-full md:w-auto px-10 py-4 text-lg">
                Leave a Review
              </button>
            </div>
          </div>
        </div>

        {/* Quote Box */}
        <div className="text-center mt-12">
          <div className="inline-block border-4 border-nybs-black bg-nybs-newsprint-light p-6 max-w-2xl">
            <blockquote className="text-xl md:text-2xl font-black italic text-nybs-black">
              &quot;If New York can make it there, they&apos;ll make it anywhere. 
              These snacks prove it.&quot;
            </blockquote>
            <cite className="block mt-4 text-sm font-bold not-italic">
              - The Daily Snacker, NYC
            </cite>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

