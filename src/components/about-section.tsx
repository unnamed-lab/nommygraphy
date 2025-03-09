"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Award, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (
      sectionRef.current &&
      textRef.current &&
      imageRef.current &&
      statsRef.current
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      tl.fromTo(
        textRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          imageRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          statsRef.current.querySelectorAll(".stat-item"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-secondary/30"
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <div ref={textRef} className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight">
              About <span className="font-bold">Nommygraphy</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {`We are a passionate team of photographers dedicated to capturing
              life's most precious moments with artistry and a touch of magic.`}
            </p>
            <p className="text-muted-foreground">
              Founded with a vision to transform ordinary scenes into
              extraordinary memories, Nommygraphy has been at the forefront of
              creative photography for over a decade. Our approach combines
              technical excellence with artistic vision to create images that
              tell compelling stories.
            </p>
            <Button asChild variant="outline" className="mt-2">
              <Link href="/about" className="group">
                Learn more about us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div ref={imageRef} className="relative">
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-300">
              <Image
                src="/placeholder.svg"
                alt="About Nommygraphy"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background p-4 sm:p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <span className="text-base sm:text-lg font-medium">
                  Since 2015
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  gradient?: string;
}

function StatCard({
  icon: Icon,
  value,
  label,
  gradient = "from-primary/20 to-primary/5",
}: StatCardProps) {
  return (
    <div
      className={`stat-item relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-6 shadow-md border border-primary/10 backdrop-blur-sm`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 opacity-10">
        <Icon className="w-full h-full text-primary" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {value}
        </h3>
        <p className="text-muted-foreground font-medium">{label}</p>
      </div>
    </div>
  );
}

const stats = [
  {
    icon: Award,
    value: "10+",
    label: "Years of Experience",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: Users,
    value: "500+",
    label: "Happy Clients",
    gradient: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    icon: Camera,
    value: "1,000+",
    label: "Photo Sessions",
    gradient: "from-violet-500/20 to-violet-500/5",
  },
  {
    icon: Award,
    value: "25+",
    label: "Industry Awards",
    gradient: "from-primary/20 to-primary/5",
  },
];
