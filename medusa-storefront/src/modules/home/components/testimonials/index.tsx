"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const testimonialVariants = {
  enter: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeIn",
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

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 justify-center mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-white" : "text-white/30"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This is hands down the best granola I've ever had. The perfect balance of sweetness and crunch!",
      author: "Sarah M.",
      location: "New York, NY",
      rating: 5,
      avatar: "SM",
    },
    {
      quote: "I love knowing exactly what's in my granola. Real ingredients, real flavor, real quality. Worth every penny.",
      author: "Michael T.",
      location: "Portland, OR",
      rating: 5,
      avatar: "MT",
    },
    {
      quote: "My kids actually ask for this granola! It's become a staple in our household. The Blueberry Bliss is their favorite.",
      author: "Jennifer L.",
      location: "Austin, TX",
      rating: 5,
      avatar: "JL",
    },
    {
      quote: "Finally found a granola that doesn't taste overly processed. You can really taste the quality ingredients.",
      author: "David K.",
      location: "Seattle, WA",
      rating: 5,
      avatar: "DK",
    },
    {
      quote: "Ordered as a gift and now I'm hooked! The packaging is beautiful and the taste is even better. Highly recommend!",
      author: "Amanda R.",
      location: "Denver, CO",
      rating: 5,
      avatar: "AR",
    },
    {
      quote: "As someone with dietary restrictions, I appreciate the transparency in ingredients. Delicious AND trustworthy.",
      author: "Robert H.",
      location: "Chicago, IL",
      rating: 5,
      avatar: "RH",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="section-container bg-gatherers-orange overflow-hidden">
      <div className="content-container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-12 font-fraunces"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>

          <div className="relative min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 border-2 border-white/40">
                  <span className="text-white font-bold text-lg font-dm-sans">
                    {testimonials[currentIndex].avatar}
                  </span>
                </div>
                
                {/* Star Rating */}
                <StarRating rating={testimonials[currentIndex].rating} />
                
                <blockquote className="space-y-4">
                  <p className="text-xl md:text-2xl text-white italic leading-relaxed font-dm-sans max-w-2xl">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </p>
                  <footer className="text-white">
                    <p className="font-semibold font-dm-sans">{testimonials[currentIndex].author}</p>
                    <p className="text-sm text-white/80 font-dm-sans">{testimonials[currentIndex].location}</p>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                animate={{
                  width: index === currentIndex ? 32 : 12,
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
