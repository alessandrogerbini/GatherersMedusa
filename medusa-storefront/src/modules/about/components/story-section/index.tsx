import Image from "next/image"

const StorySection = () => {
  return (
    <section className="section-container bg-white">
      <div className="content-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-section">Our Story</h2>
            <p className="text-gatherers-orange text-xl font-semibold italic mt-3">
              From Our Kitchen to Yours
            </p>
          </div>

          <div className="space-y-8 text-body">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gatherers-brown">
                  It Started with a Family Recipe
                </h3>
                <p>
                  Gatherer&apos;s Granola began in a small kitchen with a treasured family recipe 
                  passed down through generations. What started as a simple breakfast tradition 
                  quickly became something our friends and family couldn&apos;t get enough of—and 
                  we knew we had to share it.
                </p>
                <p>
                  In a world of mass-produced cereals and overly processed foods, we discovered 
                  something truly special: handcrafted granola made with care, using real ingredients 
                  you can actually pronounce. It&apos;s the difference between food and nourishment.
                </p>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/brand/Chipmunk logo 500 x 500 px.png"
                  alt="Gatherer's Granola"
                  fill
                  className="object-contain p-8 bg-gatherers-cream"
                />
              </div>
            </div>

            <div className="bg-gatherers-cream rounded-xl p-8 space-y-4">
              <h3 className="text-2xl font-bold text-gatherers-brown">
                Crafted with Purpose
              </h3>
              <p>
                Today, we still hand-stir every batch in small quantities, ensuring the same 
                attention to detail and quality that made our granola special from the very beginning. 
                We source the finest ingredients—premium oats, real honey, wholesome nuts, and 
                naturally dried fruits—because we believe great taste starts with great ingredients.
              </p>
              <p>
                Our chipmunk mascot represents the spirit of gathering—bringing together the best 
                nature has to offer and crafting it into something nourishing and delicious. 
                Just like a chipmunk carefully gathers and stores the finest nuts and seeds, 
                we carefully select and combine premium ingredients to create granola worth savoring.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gatherers-brown">
                Our Commitment to You
              </h3>
              <p>
                We&apos;re committed to transparency, quality, and sustainability. Every bag of 
                Gatherer&apos;s Granola is made without artificial preservatives, flavors, or colors. 
                What you see on the label is what you get—honest, wholesome ingredients combined 
                with traditional techniques and a whole lot of love.
              </p>
              <p>
                Whether you&apos;re enjoying our granola with milk for breakfast, sprinkling it 
                on yogurt, or snacking straight from the bag, we hope you taste the care and 
                dedication we put into every batch. Thank you for being part of our story.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySection


