"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const backgroundImages = [

  "https://wavetrustfinance.com/assets/images/wedding/gallery1.jpeg",
  "https://wavetrustfinance.com/assets/images/wedding/gallery2.jpeg",
  "https://wavetrustfinance.com/assets/images/wedding/gallery5.jpeg",
  "https://wavetrustfinance.com/assets/images/wedding/gallery4.jpeg",
  "https://wavetrustfinance.com/assets/images/wedding/gallery5.jpeg",
  "https://wavetrustfinance.com/assets/images/wedding/gallery6.jpeg",
  "https://wavetrustfinance.com/assets/images/wedding/gallery7.jpeg",
  "https://wavetrustfinance.com/assets/images/wedding/gallery8.jpeg",


  
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const scrollToRsvp = () => {
    const element = document.querySelector("#rsvp")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToStory = () => {
    const element = document.querySelector("#story")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images with Crossfade */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${image}')`,
            opacity: index === currentImageIndex ? 1 : 0,
          }}
        />
      ))}
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-secondary/90 text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-sans">
          We&apos;re Getting Married
        </p>
        
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-card tracking-wide mb-6">
          Godwin <span className="text-accent">&</span> Favour
        </h1>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-secondary/50" />
          <p className="text-card/90 text-lg md:text-xl font-serif tracking-wide">
            Saturday, February 28, 2026
          </p>
          <div className="h-px w-12 bg-secondary/50" />
        </div>

        <p className="text-card/80 text-base md:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          We can&apos;t wait to celebrate our special day with you. Join us as we begin our forever together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={scrollToRsvp}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-sm tracking-wide"
          >
            RSVP Now
          </Button>
          <Button
            onClick={scrollToStory}
            variant="outline"
            size="lg"
            className="border-card/50 text-card hover:bg-card/10 px-8 py-6 text-sm tracking-wide"
          >
            Our Story
          </Button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? "bg-card w-6" 
                : "bg-card/50 hover:bg-card/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToStory}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-card/70 hover:text-card transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  )
}
