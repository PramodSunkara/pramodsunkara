"use client"

import { type ReactNode } from "react"

interface GlowingShadowProps {
  children: ReactNode
  className?: string
}

export function GlowingShadow({ children, className = "" }: GlowingShadowProps) {
  return (
    <div 
      className={`
        relative w-full rounded-2xl 
        bg-card border border-border
        transition-all duration-300
        hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
        ${className}
      `}
    >
      {children}
    </div>
  )
}