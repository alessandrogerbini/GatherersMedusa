"use client"

import { motion } from "framer-motion"

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const stats = [
  {
    value: "10K+",
    label: "Happy Customers",
  },
  {
    value: "5★",
    label: "Average Rating",
  },
  {
    value: "100%",
    label: "Natural Ingredients",
  },
  {
    value: "50+",
    label: "Retail Partners",
  },
]

const SocialProof = () => {
  return (
    <section className="py-12 bg-gatherers-cream-dark">
      <div className="content-container">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <motion.p 
                className="text-3xl md:text-4xl font-bold text-gatherers-orange font-fraunces"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm md:text-base text-gatherers-brown-light font-dm-sans mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SocialProof

