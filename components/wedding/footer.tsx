"use client"

import { Heart, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 bg-foreground text-card">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Couple Names */}
          <h3 className="font-serif text-3xl md:text-4xl tracking-wide mb-4">
            Godwin <span className="text-accent">&</span> Favour
          </h3>
          
          <p className="text-card/70 mb-6">
            May 1, 2026
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center hover:bg-card/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="mailto:wedding@GodwinandFavour.com"
              className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center hover:bg-card/20 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Hashtag */}
          <p className="text-accent font-serif text-lg mb-8">
            #Godwin'sFavouredd2026
          </p>

          {/* Copyright */}
          <div className="pt-8 border-t border-card/10">
            <p className="text-card/50 text-sm flex items-center justify-center gap-1">
              Made with <Heart className="h-4 w-4 text-accent fill-accent" /> for our special day
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
