"use client"

import { motion } from "framer-motion"
import { BadgeType } from "./index"

const badgeStyles: Record<Exclude<BadgeType, null>, { bg: string; text: string; label: string }> = {
  bestseller: {
    bg: "bg-gatherers-orange",
    text: "text-white",
    label: "Bestseller",
  },
  new: {
    bg: "bg-gatherers-green",
    text: "text-white",
    label: "New",
  },
  limited: {
    bg: "bg-gatherers-brown",
    text: "text-white",
    label: "Limited",
  },
  sale: {
    bg: "bg-red-500",
    text: "text-white",
    label: "Sale",
  },
}

export default function ProductCardWrapper({
  children,
  badge,
}: {
  children: React.ReactNode
  badge?: BadgeType
}) {
  const badgeConfig = badge ? badgeStyles[badge] : null

  return (
    <motion.div
      data-testid="product-wrapper"
      className="relative"
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      {/* Badge */}
      {badgeConfig && (
        <motion.div 
          className={`absolute top-3 right-3 z-10 ${badgeConfig.bg} ${badgeConfig.text} text-xs font-semibold px-3 py-1 rounded-full font-dm-sans shadow-md`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {badgeConfig.label}
        </motion.div>
      )}
      {children}
    </motion.div>
  )
}

