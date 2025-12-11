"use client"

import { useState, useEffect } from "react"
import { Button } from "@medusajs/ui"

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form")
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Button
        onClick={scrollToForm}
        className="bg-gatherers-orange hover:bg-gatherers-orange-dark text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg transition-all hover:shadow-xl text-sm md:text-base"
        aria-label="Get your free quote"
      >
        <span className="hidden sm:inline">Get Your Free Quote</span>
        <span className="sm:hidden">Get Quote</span>
      </Button>
    </div>
  )
}










