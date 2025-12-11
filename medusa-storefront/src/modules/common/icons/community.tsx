import React from "react"

interface CommunityIconProps {
  className?: string
  size?: number
}

const CommunityIcon: React.FC<CommunityIconProps> = ({ 
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
      {/* Main heart shape */}
      <path
        d="M32 56C32 56 12 42 12 28C12 20 18 14 26 14C30 14 32 16 32 18C32 16 34 14 38 14C46 14 52 20 52 28C52 42 32 56 32 56Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      
      {/* People/community symbols inside heart */}
      {/* Person 1 */}
      <circle
        cx="24"
        cy="28"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M20 36C20 34 22 32 24 32C26 32 28 34 28 36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      {/* Person 2 (center) */}
      <circle
        cx="32"
        cy="26"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M28 34C28 32 30 30 32 30C34 30 36 32 36 34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      {/* Person 3 */}
      <circle
        cx="40"
        cy="28"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M36 36C36 34 38 32 40 32C42 32 44 34 44 36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      {/* Connection lines between people */}
      <path
        d="M28 30L32 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M36 30L32 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      {/* Decorative elements suggesting community growth */}
      <path
        d="M16 20C18 18 20 18 22 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M48 20C46 18 44 18 42 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  )
}

export default CommunityIcon





