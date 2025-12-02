"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const trustBadgeVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

const Hero = () => {
  return (
    <div className="relative w-full border-b border-gatherers-cream-dark overflow-hidden bg-gradient-to-br from-gatherers-cream via-gatherers-cream-light to-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-64 h-64 bg-gatherers-orange rounded-full blur-3xl opacity-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-80 h-80 bg-gatherers-green rounded-full blur-3xl opacity-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </div>

      {/* Main content container */}
      <div className="relative z-10 content-container">
        <div className="grid small:grid-cols-2 gap-8 small:gap-12 items-center min-h-[600px] small:min-h-[700px] py-12 small:py-0">
          
          {/* Left side: Text content */}
          <motion.div 
            className="flex flex-col justify-center order-2 small:order-1 text-center small:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <motion.h1 
                className="heading-display text-gatherers-brown"
                variants={itemVariants}
              >
                Family Recipes. <br />
                <span className="text-gatherers-orange">Hand Stirred.</span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gatherers-brown-light max-w-xl leading-relaxed font-dm-sans"
                variants={itemVariants}
              >
                Discover the wholesome goodness of artisan granola, crafted in small batches 
                with premium ingredients and time-honored family recipes.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 items-center small:items-start mt-8"
              variants={itemVariants}
            >
              <LocalizedClientLink href="/store">
                <motion.button 
                  className="btn-primary text-lg px-8 py-4"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -10px rgba(224, 122, 46, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Shop Granola
                </motion.button>
              </LocalizedClientLink>
              <LocalizedClientLink href="/about">
                <motion.button 
                  className="btn-secondary text-lg px-8 py-4"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Our Story
                </motion.button>
              </LocalizedClientLink>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="mt-10 flex flex-wrap justify-center small:justify-start gap-6 text-sm text-gatherers-brown-light font-dm-sans"
              variants={containerVariants}
            >
              {[
                "100% Natural Ingredients",
                "No Preservatives",
                "Small Batch Crafted"
              ].map((text, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2"
                  variants={trustBadgeVariants}
                >
                  <span className="text-gatherers-orange text-xl">✓</span>
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side: Hero image */}
          <motion.div 
            className="relative order-1 small:order-2 flex justify-center small:justify-end"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-full max-w-md small:max-w-lg aspect-square">
              {/* Decorative ring behind image */}
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-gatherers-orange/20 scale-110"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-gatherers-cream-dark scale-105"
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1.05, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              
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
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
