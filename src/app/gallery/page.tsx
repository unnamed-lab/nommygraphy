import { GalleryGrid } from "@/components/gallery-grid"
import { GalleryFilter } from "@/components/gallery-filter"
import { AdUnit } from "@/components/ad-unit"
import { NewsletterAd } from "@/components/newsletter-ad"

export default function GalleryPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="container py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
            Our <span className="font-medium">Gallery</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Explore our collection of captivating moments, each telling a unique story through the lens.
          </p>
        </div>

        {/* Top banner ad */}
        <div className="mb-8">
          <AdUnit slot="1234567890" format="horizontal" />
        </div>

        <GalleryFilter />

        <div className="mt-8">
          <GalleryGrid />
        </div>

        {/* Mid-content newsletter ad */}
        <NewsletterAd />

        {/* Bottom banner ad */}
        <div className="mt-12">
          <AdUnit slot="0987654321" format="horizontal" />
        </div>
      </section>
    </main>
  )
}

