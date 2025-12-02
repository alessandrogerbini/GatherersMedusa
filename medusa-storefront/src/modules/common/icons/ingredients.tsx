import React from "react"

interface IngredientsIconProps {
  className?: string
  size?: number
}

const IngredientsIcon: React.FC<IngredientsIconProps> = ({ 
  className = "", 
  size = 48 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Wheat stalk - main stem */}
      <path
        d="M32 58C32 58 32 48 32 38C32 28 32 18 32 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Left grains */}
      <path
        d="M32 18C28 16 26 14 26 11C26 8 28 7 30 8C32 9 32 12 32 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32 26C27 24 24 21 24 17C24 13 27 12 29 14C31 16 32 20 32 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32 34C26 32 22 28 22 23C22 18 26 17 28 20C30 23 32 28 32 34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right grains */}
      <path
        d="M32 18C36 16 38 14 38 11C38 8 36 7 34 8C32 9 32 12 32 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32 26C37 24 40 21 40 17C40 13 37 12 35 14C33 16 32 20 32 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32 34C38 32 42 28 42 23C42 18 38 17 36 20C34 23 32 28 32 34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Top grain tip */}
      <path
        d="M32 12C32 9 32 7 32 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M30 10C31 8 32 6 32 6C32 6 33 8 34 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Decorative leaves at base */}
      <path
        d="M28 50C26 48 24 46 24 44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M36 50C38 48 40 46 40 44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}

export default IngredientsIcon

