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
              src="https://lh3.googleusercontent.com/gps-cs-s/AHVAwepx89xUsT8be5QuPNC0b-JcUOl7fR1gV64W9w1se3qR2G7zZUckQg833Z6YggRLAPFAGwhYPGBhdsSO4SsAUOFHWSC0pkZb3bz5NCZUQYPHDAKUImRls9sp0StO9YPFpyFDm3wIEQ=w408-h306-k-no"
              alt="Wedding Venue"
              fill
              className="object-cover"
            />
          </div>

          {/* Venue Details */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl md:text-4xl text-foreground">
              Sacred heart parish centre Hal 1 Eastwood place Hanley
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
             We’re tying the knot at Sacred heart parish centre Hal 1 Eastwood place Hanley , a stunning venue. With sweeping views and an elegant ballroom, it’s the ultimate spot for us to celebrate with all of you
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Address</p>
                  <p className="text-muted-foreground">
                   Jasper St, Hanley, Stoke-on-Trent ST1 3DB,<br />
                   United Kingdom
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Contact</p>
                  <p className="text-muted-foreground">+441782215217</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a 
                  href="https://maps.app.goo.gl/7xYSqrU2JTnoXzFc8" 
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
                  href="https://maps.app.goo.gl/EfwFCAEiECEL73EWA?g_st=ic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Locate of venue from Railway station
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
