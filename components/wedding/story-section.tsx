"use client"

import Image from "next/image"

const storyItems = [
  {
    year: "2018",
    title: "How We Met",
    description: "We first crossed paths at a mutual friend's birthday party. What started as a casual conversation turned into hours of talking and laughing together.",
    image:"https://wavetrustfinance.com/assets/images/wedding/gallery4.jpeg",

  },
  {
    year: "2020",
    title: "The First Date",
    description: "After months of texting and video calls, we finally had our first official date at a cozy Italian restaurant downtown. We knew then that something special was beginning.",
    image:   "https://wavetrustfinance.com/assets/images/wedding/gallery3.jpeg",

  },
  {
    year: "2024",
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
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
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
