"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, X } from "lucide-react"

export function NewsletterAd() {
  const [email, setEmail] = useState("")
  const [dismissed, setDismissed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Here you would normally send this to your newsletter provider
  }

  if (dismissed || submitted) return null

  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 my-8">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 text-muted-foreground/70 hover:text-foreground"
        onClick={() => setDismissed(true)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Mail className="h-6 w-6 text-primary" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-medium mb-1">Subscribe to our photography newsletter</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Get exclusive photography tips, early access to workshops, and special offers
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </form>

          <p className="text-muted-foreground/60 text-xs mt-2">
            By subscribing, you agree to our terms and privacy policy. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
}

