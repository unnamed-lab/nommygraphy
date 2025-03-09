"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "All" },
  { id: "landscape", name: "Landscape" },
  { id: "portrait", name: "Portrait" },
  { id: "wedding", name: "Wedding" },
  { id: "urban", name: "Urban" },
  { id: "commercial", name: "Commercial" },
  { id: "abstract", name: "Abstract" },
]

export function GalleryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<string>("all")

  useEffect(() => {
    const category = searchParams.get("category")
    setActiveCategory(category || "all")
  }, [searchParams])

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === "all") {
      router.push("/gallery")
    } else {
      router.push(`/gallery?category=${categoryId}`)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(category.id)}
          className={cn(
            "transition-all",
            activeCategory === category.id
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted border-primary/30 text-foreground/80",
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}

