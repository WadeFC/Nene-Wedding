"use client"

import Image from "next/image"
import { Star, MapPin, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const hotels = [
  {
    name: "Holiday Inn Express Stoke on Trent by IHG",
    rating: 4.1,
    distance: "0.5 miles from venue",
    price: "$",
    description: "Charming boutique hotel with vineyard views and complimentary breakfast.",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerZ2YfeOiDl-47H8sFvyaqc-UC0dxuVvTGu4q1NygMD8slXdxkTm1-xYmLTiMahUnvWefTXxxdVo1V-Qgf8ue6ge-ex4MIyilidus-teYkwY0OKGnvSgLXaGD7UiY2s7FXMOG4n=w408-h242-k-no",
    bookingUrl: "https://www.ihg.com/holidayinnexpress/hotels/gb/en/stoke-on-trent/xwhuk/hoteldetail?cm_mmc=GoogleMaps-_-EX-_-GB-_-XWHUK",
  },
  {
    name: "Premier Inn Stoke-On-Trent (Hanley) hotel",
    rating: 4.4,
    distance: "1 mile from venue",
    price: "$",
    description: "Luxury resort featuring spa services, fine dining, and pool access.",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerJ27MgWIyIpM55kzHH0SBMzx44IJh3GfjS4oPetjJWdSEqvd9eYr84w-y1FGmg0EW4yXOZGycEenWQMwFGaqDW2-zPj9sQa_u2y5ViUn4JZrSJCQAXR3byFRGndmPM57zd4WB8Xw=w408-h272-k-no",
    bookingUrl: "https://www.premierinn.com/gb/en/hotels/england/staffordshire/stoke-on-trent/stoke-on-trent-hanley.html?cid=GLBC_STOHAN",
  },
  {
    name: "Hilton Garden Inn Stoke on Trent",
    rating: 4.4,
    distance: "2 miles from venue",
    price: "$",
    description: "Cozy lodge nestled among the vineyards with rustic elegance.",
    image: "hhttps://lh3.googleusercontent.com/gps-cs-s/AHVAweqjtP8hFFXOgOck_0JP79KaIaLjbfY9pVGbVDF9JaEH6QrKzOjH9uNU9s41a8HbxDAQWMRq2zAMp6Z2W2A1KkhQgoxeQM1KdHwfifl66DOmN3mEjLBo7xItTGDDpj6oQvtxSmhH=w408-h271-k-no",
    bookingUrl: "https://www.hilton.com/en/hotels/manstgi-hilton-garden-inn-stoke-on-trent/?SEO_id=GMB-EMEA-GI-MANSTGI",
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
