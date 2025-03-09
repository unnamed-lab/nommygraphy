"use client"

import { useEffect, useRef } from "react"
import { Camera, MessageSquare, ImageIcon, Send } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const processSteps = [
  {
    id: 1,
    title: "Initial Consultation",
    description:
      "We begin with a detailed conversation to understand your vision, preferences, and goals for the photography session.",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "The Photography Session",
    description:
      "Whether in our studio or on location, we create a comfortable environment to capture authentic moments and expressions.",
    icon: Camera,
  },
  {
    id: 3,
    title: "Editing & Refinement",
    description: "Our skilled editors enhance each image, ensuring perfect color, composition, and artistic treatment.",
    icon: ImageIcon,
  },
  {
    id: 4,
    title: "Delivery & Support",
    description:
      "Receive your beautifully finished images along with guidance on printing, sharing, and preserving your memories.",
    icon: Send,
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current && headingRef.current && stepsRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      })

      tl.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      ).fromTo(
        stepsRef.current.querySelectorAll(".process-step"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={sectionRef} className="mt-24 mb-24">
      <div ref={headingRef} className="text-center mb-16">
        <h2 className="text-3xl font-light mb-4">
          Our <span className="font-medium">Process</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          How we work with you to create beautiful, meaningful photography that tells your unique story.
        </p>
      </div>

      <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {processSteps.map((step) => (
          <div key={step.id} className="process-step relative">
            <div className="bg-muted/50 p-8 rounded-xl h-full">
              <div className="bg-background rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
            {step.id < processSteps.length && (
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="w-8 h-0.5 bg-border" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

