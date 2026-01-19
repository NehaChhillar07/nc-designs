"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

// Deterministic pseudo-random function - defined at module scope to avoid hydration mismatch
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

type Grid = {
  rows: number
  cols: number
}

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

interface PixelImageProps {
  src: string
  alt?: string
  className?: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number // in ms
  maxAnimationDelay?: number // in ms
  colorRevealDelay?: number // in ms
}

export const PixelImage = ({
  src,
  alt = "Pixel image",
  className,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Prevent hydration mismatch by only rendering pieces after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const MIN_GRID = 1
  const MAX_GRID = 16

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false
      const { rows, cols } = grid
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      )
    }

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid]
  }, [customGrid, grid])

  // Use IntersectionObserver to trigger animation when element comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            // Start color reveal after the delay
            setTimeout(() => {
              setShowColor(true)
            }, colorRevealDelay)
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px",
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [colorRevealDelay, isVisible])

  const pieces = useMemo(() => {
    const total = rows * cols
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`

      // Use deterministic delay based on index instead of Math.random()
      const delay = seededRandom(index + 1) * maxAnimationDelay
      return {
        clipPath,
        delay,
      }
    })
  }, [rows, cols, maxAnimationDelay])

  return (
    <div ref={containerRef} className={cn("relative w-full h-full select-none", className)}>
      {/* Only render pieces after mount to prevent hydration mismatch */}
      {isMounted && pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            src={src}
            alt={alt}
            className={cn(
              "z-1 rounded-[2.5rem] object-cover",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}
