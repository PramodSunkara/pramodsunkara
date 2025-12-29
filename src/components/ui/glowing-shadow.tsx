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
        hover:border-amber-500/40
        hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.35),0_0_50px_-10px_rgba(251,191,36,0.25)]
        dark:hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3),0_0_50px_-10px_rgba(251,191,36,0.2)]
        ${className}
      `}
    >
      {children}
    </div>
  )
}