"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline()

    // Initial animation
    tl.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(textRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8",
      )

    // Parallax effect on scroll
    if (sectionRef.current && imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 -z-10" ref={imageRef}>
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Hero background"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white"
          >
            Capturing beautiful <span className="font-bold block">moments through</span> the lens
          </h1>
          <p ref={textRef} className="mt-6 text-lg md:text-xl max-w-xl text-white/80">
            Professional photography services that transform ordinary scenes into extraordinary memories with artistry
            and a touch of magic.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/gallery">Explore Gallery</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-primary hover:text-white border-white hover:bg-white/10">
              <Link href="/contact" className="group">
                Book a Session
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

