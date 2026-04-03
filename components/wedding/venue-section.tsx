"use client"

import Image from "next/image"
import { MapPin, Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VenueSection() {
  return (
    <section id="venue" className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            The Location
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-wide">
            Venue
          </h2>
          <div className="mt-6 mx-auto w-16 h-px bg-primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Venue Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200"
              alt="Wedding Venue"
              fill
              className="object-cover"
            />
          </div>

          {/* Venue Details */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl md:text-4xl text-foreground">
              The Grand Estate
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              Nestled in the heart of wine country, The Grand Estate offers a breathtaking backdrop 
              for our special day. With its elegant ballroom, beautiful gardens, and stunning views, 
              it&apos;s the perfect place to celebrate love.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Address</p>
                  <p className="text-muted-foreground">
                    1234 Vineyard Lane<br />
                    Napa Valley, CA 94558
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Contact</p>
                  <p className="text-muted-foreground">(707) 555-0123</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Venue Website
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
