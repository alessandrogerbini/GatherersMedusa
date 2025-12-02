"use client"

import { motion } from "framer-motion"
import HandcraftedIcon from "@modules/common/icons/handcrafted"
import IngredientsIcon from "@modules/common/icons/ingredients"
import FamilyRecipeIcon from "@modules/common/icons/family-recipe"
import HeartIcon from "@modules/common/icons/heart"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const headerVariants = {
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

const ValuesSection = () => {
  const values = [
    {
      Icon: HandcraftedIcon,
      title: "Handcrafted",
      description: "Every batch is carefully hand-stirred and monitored to ensure the perfect texture and flavor in every bite.",
    },
    {
      Icon: IngredientsIcon,
      title: "Quality Ingredients",
      description: "We source premium, wholesome ingredients—no artificial flavors, no preservatives, just real food.",
    },
    {
      Icon: FamilyRecipeIcon,
      title: "Family Recipes",
      description: "Time-tested recipes passed down through generations, perfected with love and care over the years.",
    },
    {
      Icon: HeartIcon,
      title: "Made with Love",
      description: "We pour our hearts into every batch, treating each one as if we're making it for our own family.",
    },
  ]

  return (
    <section className="section-container bg-gatherers-cream">
      <div className="content-container">
        <motion.div 
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="heading-section">Why Gatherer&apos;s?</h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            We&apos;re not just making granola—we&apos;re crafting a tradition of quality, 
            flavor, and wholesome goodness that you can taste in every cluster.
          </p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="mb-4 text-gatherers-orange"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <value.Icon size={56} />
              </motion.div>
              <h3 className="text-xl font-bold text-gatherers-brown mb-3 font-fraunces">
                {value.title}
              </h3>
              <p className="text-sm text-gatherers-brown-light leading-relaxed font-dm-sans">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ValuesSection
