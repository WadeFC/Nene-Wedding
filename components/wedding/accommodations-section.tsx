"use client"

import Image from "next/image"
import { Star, MapPin, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const hotels = [
  {
    name: "The Valley Inn",
    rating: 4,
    distance: "0.5 miles from venue",
    price: "$189/night",
    description: "Charming boutique hotel with vineyard views and complimentary breakfast.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
    bookingUrl: "#",
  },
  {
    name: "Grand Napa Resort",
    rating: 5,
    distance: "1 mile from venue",
    price: "$299/night",
    description: "Luxury resort featuring spa services, fine dining, and pool access.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800",
    bookingUrl: "#",
  },
  {
    name: "Vineyard Lodge",
    rating: 4,
    distance: "2 miles from venue",
    price: "$149/night",
    description: "Cozy lodge nestled among the vineyards with rustic elegance.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
    bookingUrl: "#",
  },
]

export function AccommodationsSection() {
  return (
    <section id="accommodations" className="py-20 md:py-32 bg-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Where to Stay
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-wide">
            Accommodations
          </h2>
          <div className="mt-6 mx-auto w-16 h-px bg-primary" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Here are our favorite nearby hotels with special discounts just for our guests. 
            Be sure to mention the wedding to receive the group rate!
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Card key={hotel.name} className="bg-card border-border overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: hotel.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{hotel.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  {hotel.distance}
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {hotel.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-accent">{hotel.price}</span>
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <a 
                      href={hotel.bookingUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1"
                    >
                      Book Now
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
