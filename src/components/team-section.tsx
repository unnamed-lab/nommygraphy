"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Lead Photographer",
    image: "/placeholder.svg",
    bio: "With over 10 years of experience, Alex specializes in portrait and wedding photography with a unique artistic vision.",
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Maya Rodriguez",
    role: "Creative Director",
    image: "/placeholder.svg",
    bio: "Maya brings her fine art background to every project, ensuring each image tells a compelling visual story.",
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 3,
    name: "David Chen",
    role: "Landscape Specialist",
    image: "/placeholder.svg",
    bio: "David has traveled the world capturing breathtaking landscapes with his distinctive style and technical precision.",
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "Studio Manager",
    image: "/placeholder.svg",
    bio: "Sarah ensures every client experience is seamless from first contact to final delivery of their beautiful images.",
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
];

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current && headingRef.current && teamRef.current) {
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
        teamRef.current.querySelectorAll(".team-member"),
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
    <div ref={sectionRef} className="mt-24">
      <div ref={headingRef} className="text-center mb-16">
        <h2 className="text-3xl font-light mb-4">
          Meet Our <span className="font-medium">Team</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          The passionate professionals behind Nonygraphy who bring creativity,
          expertise, and dedication to every project.
        </p>
      </div>

      <div
        ref={teamRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member group">
            <div className="relative overflow-hidden rounded-xl aspect-square mb-4">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                <div className="flex gap-4">
                  <a
                    href={member.social.instagram}
                    className="text-white hover:text-primary transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href={member.social.facebook}
                    className="text-white hover:text-primary transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-white hover:text-primary transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-medium">{member.name}</h3>
            <p className="text-primary text-sm mb-2">{member.role}</p>
            <p className="text-muted-foreground text-sm">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
