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
        hover:border-primary/40
        hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3),0_0_50px_-10px_hsl(var(--primary)/0.2)]
        dark:hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.25),0_0_50px_-10px_hsl(var(--primary)/0.15)]
        ${className}
      `}
    >
      {children}
    </div>
  )
}