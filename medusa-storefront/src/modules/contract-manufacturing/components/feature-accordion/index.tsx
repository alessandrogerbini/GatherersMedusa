"use client"

import { useState } from "react"
import { ChevronDown } from "@medusajs/icons"

interface AccordionItemProps {
  title: string
  content: string
  isOpen: boolean
  onToggle: () => void
}

const AccordionItem = ({ title, content, isOpen, onToggle }: AccordionItemProps) => {
  return (
    <div className="bg-gatherers-cream rounded-lg overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gatherers-cream-dark transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-bold text-gatherers-brown pr-4">
          {title}
        </h3>
        <ChevronDown
          className={`w-6 h-6 text-gatherers-orange transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <p className="text-gatherers-brown-light leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  )
}

interface FeatureAccordionProps {
  items: Array<{ title: string; content: string }>
}

export default function FeatureAccordion({ items }: FeatureAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}










