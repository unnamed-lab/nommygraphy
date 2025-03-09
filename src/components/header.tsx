"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-merriweather">
          <Image src={"/logo.png"} alt="Nommygraphy" width={200} height={24} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors hover:text-primary",
                pathname === item.href
                  ? !isScrolled && pathname === "/"
                    ? "text-white font-medium"
                    : "text-foreground font-medium"
                  : !isScrolled && pathname === "/"
                  ? "text-white/80"
                  : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className={cn(
              !isScrolled && pathname === "/" && "text-white hover:bg-white/10"
            )}
          >
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Login</span>
            </Link>
          </Button>

          <div className="hidden md:block">
            <Button
              asChild
              className={cn(
                !isScrolled &&
                  pathname === "/" &&
                  "bg-white text-primary hover:bg-white/90"
              )}
            >
              <Link href="/contact">Book a Session</Link>
            </Button>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  !isScrolled &&
                    pathname === "/" &&
                    "text-white hover:bg-white/10"
                )}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-6 border-b">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-merriweather"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src={"/logo.png"}
                      alt="Nommygraphy"
                      width={200}
                      height={24}
                    />
                  </Link>
                </div>

                <nav className="flex flex-col gap-6 py-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-lg transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-foreground font-medium"
                          : "text-foreground/60"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Book a Session
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
