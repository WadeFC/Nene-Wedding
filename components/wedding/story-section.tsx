"use client"

import Image from "next/image"

const storyItems = [
  {
    year: "",
    title: "How We Met",
    description: "",
    image:"https://wavetrustfinance.com/assets/images/wedding/gallery4.jpeg",

  },
  {
    year: "",
    title: "The First Date",
    description: "",
    image:   "https://wavetrustfinance.com/assets/images/wedding/gallery3.jpeg",

  },
  {
    year: "",
    title: "The Proposal",
    description: "On a beautiful sunset evening at our favorite beach, surrounded by the gentle sound of waves, the big question was asked. Through happy tears, the answer was yes!",
    image:   "https://wavetrustfinance.com/assets/images/wedding/gallery5.jpeg",

  },
]

export function StorySection() {
  return (
    <section id="story" className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Our Journey
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-wide">
            Our Story
          </h2>
          <div className="mt-6 mx-auto w-16 h-px bg-primary" />
        </div>

        {/* Story Timeline */}
        <div className="space-y-20 md:space-y-32">
          {storyItems.map((item, index) => (
            <div
              key={item.year}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-16`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <span className="inline-block text-accent font-serif text-5xl md:text-6xl font-light mb-4">
                  {item.year}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-center mb-4" style={{ textAlign: 'center' }}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
