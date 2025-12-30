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
        transition-all duration-500 ease-out
        hover:border-amber-500/20
        hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.18),0_0_35px_-10px_rgba(251,191,36,0.12)]
        dark:hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.15),0_0_35px_-10px_rgba(251,191,36,0.1)]
        ${className}
      `}
    >
      {children}
    </div>
  )
}