import Link from "next/link";
import { Camera, Instagram, Facebook, Twitter } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t py-8 sm:py-12 md:py-16 bg-secondary/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-merriweather"
            >
              <Image src={"/logo.png"} alt="Nommygraphy" width={200} height={24} />
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md ml-2">
              {`Capturing life's most precious moments with artistry and a touch
              of magic. Professional photography services for all your special
              occasions.`}
            </p>
            <div className="flex items-center gap-4 mt-6 ml-2">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/80 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/80 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/80 hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/gallery?category=portrait"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Portrait Photography
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery?category=wedding"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Wedding Photography
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery?category=landscape"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Landscape Photography
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery?category=commercial"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Commercial Photography
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Nommygraphy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
