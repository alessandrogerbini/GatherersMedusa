import React from "react"

interface FamilyRecipeIconProps {
  className?: string
  size?: number
}

const FamilyRecipeIcon: React.FC<FamilyRecipeIconProps> = ({ 
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
      {/* Recipe book/card - slightly tilted for organic feel */}
      <rect
        x="12"
        y="14"
        width="40"
        height="36"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        transform="rotate(-2 32 32)"
      />
      
      {/* Book spine detail */}
      <path
        d="M18 14L18 50"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
        transform="rotate(-2 32 32)"
      />
      
      {/* Recipe text lines */}
      <path
        d="M24 24L44 23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M24 30L40 29"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M24 36L38 35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      
      {/* Heart symbol - representing family love */}
      <path
        d="M32 44C32 44 26 40 26 36C26 33 28 32 30 32C31 32 32 33 32 34C32 33 33 32 34 32C36 32 38 33 38 36C38 40 32 44 32 44Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
      
      {/* Decorative corner flourish */}
      <path
        d="M44 18C46 16 48 15 50 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M46 20C48 19 49 18 50 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      
      {/* Small decorative elements suggesting generations */}
      <circle cx="48" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
      <circle cx="54" cy="14" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
    </svg>
  )
}

export default FamilyRecipeIcon

