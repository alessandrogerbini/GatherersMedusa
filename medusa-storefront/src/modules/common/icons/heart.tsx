import React from "react"

interface HeartIconProps {
  className?: string
  size?: number
}

const HeartIcon: React.FC<HeartIconProps> = ({ 
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
      {/* Main heart shape with hand-drawn feel */}
      <path
        d="M32 56C32 56 10 42 10 26C10 18 16 12 24 12C28 12 31 14 32 16C33 14 36 12 40 12C48 12 54 18 54 26C54 42 32 56 32 56Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      
      {/* Inner highlight for dimension */}
      <path
        d="M24 18C20 18 16 22 16 28C16 32 18 36 22 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      
      {/* Decorative sparkles/love emanating */}
      <path
        d="M8 20L6 18M8 22L4 22M10 16L8 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M56 20L58 18M56 22L60 22M54 16L56 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      {/* Small hearts floating up */}
      <path
        d="M20 8C20 8 18 6 18 4C18 2 20 2 20 4C20 2 22 2 22 4C22 6 20 8 20 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M46 6C46 6 45 5 45 4C45 3 46 3 46 4C46 3 47 3 47 4C47 5 46 6 46 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.3"
      />
    </svg>
  )
}

export default HeartIcon

