"use client"

import { useState, useEffect } from "react"

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This is hands down the best granola I've ever had. The perfect balance of sweetness and crunch!",
      author: "Sarah M.",
      location: "New York, NY",
    },
    {
      quote: "I love knowing exactly what's in my granola. Real ingredients, real flavor, real quality.",
      author: "Michael T.",
      location: "Portland, OR",
    },
    {
      quote: "My kids actually ask for this granola! It's become a staple in our household.",
      author: "Jennifer L.",
      location: "Austin, TX",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000) // Change testimonial every 5 seconds

    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="section-container bg-gatherers-orange">
      <div className="content-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            What Our Customers Say
          </h2>

          <div className="relative min-h-[200px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <blockquote className="space-y-6">
                  <p className="text-xl md:text-2xl text-white italic leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="text-white">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-white/80">{testimonial.location}</p>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
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


