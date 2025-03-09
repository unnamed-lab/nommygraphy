"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Wedding Client",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "Nommygraphy captured our wedding day perfectly. Every emotion, every detail was documented with such artistry. The photos tell our story in a way we'll cherish forever.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Corporate Client",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "Working with Nommygraphy for our company branding was a game-changer. Their vision and attention to detail elevated our visual identity to a whole new level.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Portrait Client",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "I've never felt so comfortable in front of a camera. The team at Nommygraphy has a special talent for bringing out natural expressions and creating a relaxed atmosphere.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && headingRef.current && testimonialsRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        testimonialsRef.current.querySelectorAll(".testimonial-card"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="container">
        <div ref={headingRef} className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            What Our <span className="font-medium">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from the people who have experienced our photography services
            and the stories we've helped them tell.
          </p>
        </div>

        <div
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-muted/30 p-6 rounded-xl border testimonial-card"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
