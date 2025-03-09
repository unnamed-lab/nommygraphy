"use client"

import type React from "react"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Set up reveal animations for common elements
    const setupRevealAnimations = () => {
      // Text reveal animations
      gsap.utils.toArray(".reveal-text").forEach((element: any) => {
        gsap.fromTo(
          element,
          { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleClass: { targets: element, className: "revealed" },
              once: true,
            },
          },
        )
      })

      // Image reveal animations
      gsap.utils.toArray(".image-reveal").forEach((element: any) => {
        gsap.fromTo(
          element,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0 0 0)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleClass: { targets: element, className: "revealed" },
              once: true,
            },
          },
        )
      })

      // Fade in animations
      gsap.utils.toArray(".fade-in").forEach((element: any) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          },
        )
      })
    }

    setupRevealAnimations()

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <>{children}</>
}

