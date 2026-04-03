"use client"

import { Clock, MapPin, Music, UtensilsCrossed, Heart, Camera } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const scheduleItems = [
  {
    time: "3:00 PM",
    title: "Guest Arrival",
    description: "Guests arrive and are seated",
    icon: Clock,
  },
  {
    time: "3:30 PM",
    title: "Ceremony",
    description: "Exchange of vows and rings",
    icon: Heart,
  },
  {
    time: "4:30 PM",
    title: "Cocktail Hour",
    description: "Enjoy drinks and hors d'oeuvres",
    icon: UtensilsCrossed,
  },
  {
    time: "5:30 PM",
    title: "Reception",
    description: "Dinner, toasts, and celebration",
    icon: Music,
  },
  {
    time: "7:00 PM",
    title: "First Dance",
    description: "The couple's first dance together",
    icon: Heart,
  },
  {
    time: "10:00 PM",
    title: "Farewell",
    description: "Sparkler send-off for the newlyweds",
    icon: Camera,
  },
]

export function ScheduleSection() {
  return (
    <section id="schedule" className="py-20 md:py-32 bg-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            The Big Day
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-wide">
            Schedule
          </h2>
          <div className="mt-6 mx-auto w-16 h-px bg-primary" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Saturday, February 28, 2026
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduleItems.map((item) => (
            <Card key={item.title} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-accent font-serif text-lg">{item.time}</span>
                    <h3 className="font-serif text-xl text-foreground mt-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
