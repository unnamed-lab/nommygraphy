"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const galleryItems = [
  {
    id: 1,
    title: "Serene Landscapes",
    description: "Capturing the beauty of nature",
    image: "/placeholder.svg?height=600&width=800",
    category: "landscape",
    fullDescription: "Our landscape photography captures the serene beauty of nature in its most pristine form.",
  },
  {
    id: 2,
    title: "Elegant Portraits",
    description: "Revealing the soul within",
    image: "/placeholder.svg?height=800&width=600",
    category: "portrait",
    fullDescription: "Our portrait photography reveals the true essence and personality of each individual subject.",
  },
  {
    id: 3,
    title: "Wedding Moments",
    description: "Preserving timeless celebrations",
    image: "/placeholder.svg?height=600&width=800",
    category: "wedding",
    fullDescription:
      "We preserve the most precious moments of your wedding day with artistic and timeless photography.",
  },
  {
    id: 4,
    title: "Urban Exploration",
    description: "Finding beauty in city life",
    image: "/placeholder.svg?height=800&width=600",
    category: "urban",
    fullDescription: "Our urban photography finds beauty in the concrete jungle, capturing the essence of city life.",
  },
  {
    id: 5,
    title: "Commercial Projects",
    description: "Elevating brands through imagery",
    image: "/placeholder.svg?height=600&width=800",
    category: "commercial",
    fullDescription: "We help elevate brands through powerful commercial photography that tells your brand's story.",
  },
  {
    id: 6,
    title: "Abstract Visions",
    description: "Seeing the world differently",
    image: "/placeholder.svg?height=800&width=600",
    category: "abstract",
    fullDescription: "Our abstract photography offers a unique perspective, seeing the world through a different lens.",
  },
]

export function GalleryPreview() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (galleryRef.current && itemsRef.current.length) {
      const items = itemsRef.current

      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleImageClick = (e: React.MouseEvent, item: (typeof galleryItems)[0]) => {
    e.preventDefault()
    setSelectedImage(item)
    setIsFullscreen(true)
    setZoomLevel(1)
  }

  const handleClose = () => {
    setIsFullscreen(false)
    setSelectedImage(null)
  }

  const handlePrevious = () => {
    if (!selectedImage) return
    const currentIndex = galleryItems.findIndex((item) => item.id === selectedImage.id)
    const previousIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
    setSelectedImage(galleryItems[previousIndex])
    setZoomLevel(1)
  }

  const handleNext = () => {
    if (!selectedImage) return
    const currentIndex = galleryItems.findIndex((item) => item.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % galleryItems.length
    setSelectedImage(galleryItems[nextIndex])
    setZoomLevel(1)
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious()
    if (e.key === "ArrowRight") handleNext()
    if (e.key === "Escape") handleClose()
  }

  return (
    <>
      <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {galleryItems.map((item, index) => (
          <Link
            key={item.id}
            href={`/gallery?category=${item.category}`}
            className="group relative overflow-hidden rounded-xl aspect-[4/5] gallery-item"
            ref={(el) => {
              if (el) itemsRef.current[index] = el
            }}
            onClick={(e) => handleImageClick(e, item)}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
              <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1">{item.description}</p>
              <div className="mt-2 sm:mt-4 inline-flex items-center text-sm font-medium text-white group-hover:underline">
                View Collection
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none overflow-hidden"
          onKeyDown={handleKeyDown}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
            {selectedImage && (
              <div
                className="relative transition-transform duration-300 ease-out"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <Image
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  width={1200}
                  height={800}
                  className="max-h-[85vh] w-auto object-contain"
                />
              </div>
            )}

            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={handleZoomIn}
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={handleZoomOut}
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={handleClose}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-10 w-10"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-10 w-10"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {selectedImage && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                    <p className="text-sm text-white/80 mt-1">{selectedImage.fullDescription}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" aria-label="Download">
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

