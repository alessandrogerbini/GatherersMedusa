import React from "react"

interface SustainabilityIconProps {
  className?: string
  size?: number
}

const SustainabilityIcon: React.FC<SustainabilityIconProps> = ({ 
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
      {/* Earth/globe circle */}
      <circle
        cx="32"
        cy="32"
        r="18"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      
      {/* Continents/land masses with organic shapes */}
      <path
        d="M20 28C22 26 26 24 28 26C30 28 30 32 28 34C26 36 24 36 22 34C20 32 20 30 20 28Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M36 30C38 28 42 28 44 30C46 32 46 36 44 38C42 40 38 40 36 38C34 36 34 32 36 30Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M24 40C26 38 30 38 32 40C34 42 34 44 32 46C30 48 26 48 24 46C22 44 22 42 24 40Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      
      {/* Leaf on top representing sustainability */}
      <path
        d="M32 12C32 10 34 8 36 8C38 8 40 10 40 12C40 14 38 16 36 18C34 20 32 20 30 18C28 16 28 14 30 12C30 10 32 10 32 12Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M32 18L32 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Decorative sustainability arrows/recycle symbol */}
      <path
        d="M48 20C50 18 52 20 52 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M50 22C52 24 50 26 48 26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}

export default SustainabilityIcon





