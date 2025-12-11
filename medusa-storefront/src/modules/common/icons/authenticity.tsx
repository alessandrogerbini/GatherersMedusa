import React from "react"

interface AuthenticityIconProps {
  className?: string
  size?: number
}

const AuthenticityIcon: React.FC<AuthenticityIconProps> = ({ 
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
      {/* Left hand */}
      <path
        d="M18 32C18 28 20 24 24 22C28 20 32 20 34 22C36 24 36 28 36 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M22 32C22 30 22 28 24 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M26 32C26 30 26 28 28 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M30 32C30 30 30 28 32 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      {/* Right hand */}
      <path
        d="M46 32C46 28 44 24 40 22C36 20 32 20 30 22C28 24 28 28 28 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M42 32C42 30 42 28 40 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M38 32C38 30 38 28 36 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M34 32C34 30 34 28 32 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      {/* Connection/handshake area */}
      <path
        d="M32 24C32 22 32 20 32 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      
      {/* Decorative trust/authenticity symbol */}
      <circle
        cx="32"
        cy="40"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M30 40L31 42L34 38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  )
}

export default AuthenticityIcon





