"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const StorySection = () => {
  return (
    <section className="section-container bg-white">
      <div className="content-container">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="heading-section">Our Story</h2>
            <p className="text-gatherers-orange text-xl font-semibold italic mt-3 font-dm-sans">
              From Our Kitchen to Yours
            </p>
          </motion.div>

          <div className="space-y-16 text-body">
            {/* First Section - Origin Story */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gatherers-brown font-fraunces">
                  It Started with a Family Recipe
                </h3>
                <p>
                  Gatherer&apos;s Granola began in a small kitchen with a treasured family recipe 
                  passed down through generations. What started as a simple breakfast tradition 
                  quickly became something our friends and family couldn&apos;t get enough of.
                </p>
                <p>
                  We realized that in a world of mass-produced cereals and overly processed foods, 
                  there was something truly special about handcrafted granola made with care, 
                  using real ingredients you can actually pronounce.
                </p>
              </div>
              <motion.div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/gatherers/granola-bowl.jpg"
                  alt="Artisan granola bowl with fresh fruits and chocolate"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Adventure Section - Full Width Image */}
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <div className="relative h-[300px] md:h-[400px]">
                <Image
                  src="/images/gatherers/lifestyle-adventure.jpg"
                  alt="Enjoying Gatherer's Granola on an adventure at the Grand Canyon"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 font-fraunces">
                    Fuel for Every Adventure
                  </h3>
                  <p className="text-white/90 max-w-2xl font-dm-sans">
                    Whether you&apos;re hiking the Grand Canyon or enjoying breakfast at home, 
                    our granola is the perfect companion for life&apos;s adventures.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Crafted with Purpose */}
            <motion.div 
              className="bg-gatherers-cream rounded-xl p-8 md:p-10 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold text-gatherers-brown font-fraunces">
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
            </motion.div>

            {/* Nature Section */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <motion.div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/gatherers/lifestyle-forest.jpg"
                  alt="Gatherer's Granola in the Sequoia Forest"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="space-y-4 order-1 md:order-2">
                <h3 className="text-2xl font-bold text-gatherers-brown font-fraunces">
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySection
