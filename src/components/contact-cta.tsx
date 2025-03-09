"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ContactCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-primary text-white"
    >
      <div className="container">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4 sm:mb-6">
            Ready to <span className="font-bold">Capture</span> Your Story?
          </h2>
          <p className="text-white/80 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            {`Let's create beautiful memories together. Book a session with
            Nommygraphy and transform your special moments into timeless art.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/contact">Book a Session</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-primary hover:text-white hover:bg-primary/10"
            >
              <Link href="/gallery" className="group">
                Explore Our Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
