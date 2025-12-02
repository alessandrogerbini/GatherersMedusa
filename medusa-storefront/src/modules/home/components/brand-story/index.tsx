"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const BrandStory = () => {
  return (
    <section className="section-container bg-white">
      <div className="content-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div 
            className="order-2 md:order-1"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/gatherers/product-lineup.jpg"
                alt="Gatherer's Granola product lineup - colorful bags of artisan granola"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            className="order-1 md:order-2 space-y-6"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-3">
              <motion.h2 
                className="heading-section"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Family Recipes. Hand Stirred.
              </motion.h2>
              <motion.p 
                className="text-xl text-gatherers-orange font-semibold italic"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Crafted with love since 2018
              </motion.p>
            </div>

            <motion.div 
              className="space-y-4 text-body"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p>
                At Gatherer&apos;s Granola, we believe the best recipes are the ones passed down through generations. Our granola is made using traditional family recipes, carefully hand-stirred in small batches to ensure every cluster is perfect.
              </p>
              <p>
                We source only the finest ingredients—wholesome oats, real honey, premium nuts, and dried fruits—because we believe great taste starts with great ingredients. No shortcuts, no compromises, just honest, delicious granola.
              </p>
            </motion.div>

            <motion.div 
              className="pt-4"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <LocalizedClientLink href="/about">
                <motion.button 
                  className="btn-primary"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -10px rgba(224, 122, 46, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Learn Our Story
                </motion.button>
              </LocalizedClientLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BrandStory
