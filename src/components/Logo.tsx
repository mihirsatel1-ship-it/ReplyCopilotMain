import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 8L12 4L18 8L15 12L12 16L9 12L6 8Z" opacity="0.8"/>
          <path d="M8 10L14 6L20 10L17 14L14 18L11 14L8 10Z"/>
        </svg>
      </div>
    </div>
  )
}
