"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type AdSize = "horizontal" | "vertical" | "rectangle" | "responsive"

interface AdUnitProps {
  className?: string
  size?: AdSize
  slot?: string
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
  responsive?: boolean
  showLabel?: boolean
}

export function AdUnit({
  className,
  size = "horizontal",
  slot = "1234567890",
  format = "auto",
  responsive = true,
  showLabel = true,
}: AdUnitProps) {
  const [isClient, setIsClient] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // This would normally load the Google AdSense script
    // For demo purposes, we're just simulating the ad loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Size classes based on the ad format
  const sizeClasses = {
    horizontal: "h-[90px] w-full max-w-[728px]",
    vertical: "h-[600px] w-[160px]",
    rectangle: "h-[250px] w-[300px]",
    responsive: "min-h-[90px] w-full",
  }

  // Don't render anything on the server
  if (!isClient) {
    return <div className={cn("bg-muted/30 flex items-center justify-center", sizeClasses[size], className)} />
  }

  return (
    <div className={cn("relative mx-auto", className)}>
      {showLabel && <div className="absolute -top-5 left-0 text-[10px] text-muted-foreground">Advertisement</div>}

      <div
        className={cn(
          "bg-muted/30 flex items-center justify-center overflow-hidden",
          sizeClasses[size],
          isLoaded ? "border border-border" : "",
        )}
      >
        {!isLoaded ? (
          <div className="animate-pulse text-xs text-muted-foreground">Loading ad...</div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* This would be replaced with actual Google Ad code */}
            <div className="text-center p-4">
              <div className="text-sm font-medium text-primary mb-2">Photography Equipment Sale</div>
              <div className="text-xs text-muted-foreground">Get 20% off professional camera gear</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

