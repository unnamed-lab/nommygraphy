"use client";

import type React from "react";
import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { galleryItems } from "@/static-data/gallery";

export function GalleryGrid() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryItems)[0] | null
  >(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const category = searchParams.get("category");
    setActiveCategory(category);
  }, [searchParams]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll(".gallery-item");

      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const filteredItems = activeCategory
    ? galleryItems.filter((item) => item.category === activeCategory)
    : galleryItems;

  const handleImageClick = (item: (typeof galleryItems)[0]) => {
    setSelectedImage(item);
    setIsFullscreen(true);
    setZoomLevel(1);
  };

  const handleClose = () => {
    setIsFullscreen(false);
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedImage.id
    );
    const previousIndex =
      (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[previousIndex]);
    setZoomLevel(1);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") handleClose();
  };

  return (
    <Suspense>
      <div
        ref={galleryRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="gallery-item group relative overflow-hidden rounded-xl shadow-sm cursor-pointer"
            onClick={() => handleImageClick(item)}
          >
            <div className="aspect-square sm:aspect-auto sm:h-64 md:h-72 lg:h-80">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-base sm:text-lg font-bold">{item.title}</h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1 capitalize">
                {item.category}
              </p>
            </div>
          </div>
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
                    <p className="text-sm text-white/80 mt-1">
                      {selectedImage.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    aria-label="Download"
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Suspense>
  );
}
