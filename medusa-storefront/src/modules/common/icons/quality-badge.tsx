import React from "react"

interface QualityBadgeIconProps {
  className?: string
  size?: number
}

const QualityBadgeIcon: React.FC<QualityBadgeIconProps> = ({ 
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
      {/* Badge/Seal shape with organic feel */}
      <path
        d="M32 8C24 8 18 14 18 22C18 30 24 36 32 36C40 36 46 30 46 22C46 14 40 8 32 8Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Inner circle for badge detail */}
      <circle
        cx="32"
        cy="22"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      
      {/* Star in center */}
      <path
        d="M32 16L33 20L37 20L34 22L35 26L32 24L29 26L30 22L27 20L31 20L32 16Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.3"
      />
      
      {/* Decorative ribbon ends at bottom */}
      <path
        d="M28 36C28 38 30 40 32 40C34 40 36 38 36 36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 40C26 42 28 44 30 46"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M40 40C38 42 36 44 34 46"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      {/* Small decorative elements */}
      <circle cx="20" cy="18" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="44" cy="18" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

export default QualityBadgeIcon





