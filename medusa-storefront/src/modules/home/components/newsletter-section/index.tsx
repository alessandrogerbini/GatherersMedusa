"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import NewsletterSignup from "@modules/common/components/mailchimp-signup"

const NewsletterSection = () => {
  return (
    <section className="section-container bg-white overflow-hidden">
      <div className="content-container">
        <motion.div 
          className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Image Side */}
          <div className="relative h-64 md:h-auto">
            <Image
              src="/images/gatherers/breakfast-bowl.jpg"
              alt="Delicious granola breakfast bowl with fresh fruits"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gatherers-cream/20 md:bg-gradient-to-l" />
          </div>
          
          {/* Content Side */}
          <div className="bg-gatherers-cream p-8 md:p-12 flex flex-col justify-center">
            <NewsletterSignup
              title="Stay Connected"
              description="Get exclusive recipes, special offers, and updates delivered straight to your inbox. Join the Gatherer's family today!"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterSection
