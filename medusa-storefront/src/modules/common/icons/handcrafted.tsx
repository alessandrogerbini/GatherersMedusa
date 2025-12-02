import React from "react"

interface HandcraftedIconProps {
  className?: string
  size?: number
}

const HandcraftedIcon: React.FC<HandcraftedIconProps> = ({ 
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
      {/* Hand-drawn style wooden spoon */}
      <path
        d="M18 48C17 47 15.5 44 16 40C16.5 36 20 32 24 30C28 28 32 28 35 30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: "none" }}
      />
      {/* Spoon bowl with organic shape */}
      <ellipse
        cx="42"
        cy="22"
        rx="12"
        ry="10"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        transform="rotate(-25 42 22)"
      />
      {/* Handle with slight curve */}
      <path
        d="M32 30C30 34 26 40 22 46C21 48 20 49 18 50"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Decorative stirring motion lines */}
      <path
        d="M44 34C46 36 48 35 50 33"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M48 30C50 31 52 30 53 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Small grain/oat details */}
      <circle cx="38" cy="20" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="44" cy="18" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="46" cy="24" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

export default HandcraftedIcon

