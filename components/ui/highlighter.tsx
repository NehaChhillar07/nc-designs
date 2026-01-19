"use client"

import { useRef } from "react"
import type React from "react"
import { motion, useInView } from "framer-motion"

type AnnotationAction = "highlight" | "underline"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  animationDuration = 600,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldAnimate = !isView || isInView

  if (action === "underline") {
    return (
      <motion.span
        ref={elementRef}
        style={{
          textDecoration: "underline",
          textDecorationColor: shouldAnimate ? color : "transparent",
          textDecorationThickness: "2px",
          textUnderlineOffset: "3px",
        }}
        initial={{ textDecorationColor: "transparent" }}
        animate={{ textDecorationColor: shouldAnimate ? color : "transparent" }}
        transition={{
          duration: animationDuration / 1000,
          ease: "easeOut",
          delay: 0.1
        }}
      >
        {children}
      </motion.span>
    )
  }

  // Default: highlight action - use CSS background with linear-gradient for proper multiline support
  return (
    <motion.span
      ref={elementRef}
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 0",
        paddingLeft: "4px",
        paddingRight: "4px",
        marginLeft: "-4px",
        marginRight: "-4px",
        borderRadius: "2px",
      }}
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: shouldAnimate ? "100% 100%" : "0% 100%" }}
      transition={{
        duration: animationDuration / 1000,
        ease: "easeOut",
        delay: 0.1
      }}
    >
      {children}
    </motion.span>
  )
}
