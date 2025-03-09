import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { GalleryPreview } from "@/components/gallery-preview";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactCta } from "@/components/contact-cta";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="container py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
              Capturing <span className="font-medium">{"life's"}</span> most
              <span className="font-medium block mt-1">precious moments</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md">
              With artistry and a touch of magic, we transform ordinary scenes
              into extraordinary memories.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:text-accent-foreground group"
              >
                Learn more about our approach
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-300">
            <Image
              src="/asset/0002.jpg"
              alt="Elegant photography"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <AboutSection />

      <section className="bg-muted/50 py-24 md:py-32">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Featured <span className="font-medium">Work</span>
            </h2>
            <Link
              href="/gallery"
              className="inline-flex items-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:text-accent-foreground group"
            >
              View full gallery
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <GalleryPreview gridCount={6} />
        </div>
      </section>

      <TestimonialsSection />

      <ContactCta />
    </main>
  );
}
