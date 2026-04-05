"use client"

import Image from "next/image"

const storyItems = [
  {
    year: "",
    title: "Two Souls, One Story",
    description: "Godwin and Favour serendipitously connected online, without any initial expectations of a profound relationship. Their initial simple exchanges gradually evolved into something more significant, offering comfort, understanding, and tranquility. Through each message, they experienced a diminishing sense of solitude, as if they had discovered a sanctuary. Upon their eventual meeting, there was no dramatic display, but rather a serene assurance, akin to returning home. They did not intentionally plan for an everlasting bond, yet it naturally unfolded through their shared moments and mutual choices, ultimately transforming love into the most secure and inherent place of belonging.",
    image:"https://wavetrustfinance.com/assets/images/wedding/couple.jpeg",

  },
  {
    year: "Groom's Man",
    title: "Temple",
    description: "After months of texting and video calls, we finally had our first official date at a cozy Italian restaurant downtown. We knew then that something special was beginning.",
    image:   "https://wavetrustfinance.com/assets/images/wedding/AssistGroom.jpeg",

  },
  {
    year: "Bride's Maid",
    title: "Bukola",
    description: "May your love grow stronger with each passing day and your hearts always find their way back to each other.Wishing you endless happiness, deep companionship, and a lifetime of shared dreams. 💖",
    image:   "https://wavetrustfinance.com/assets/images/wedding/bride-maid.jpeg",

  },
]

export function StorySectionTales() {
  return (
    <section id="story" className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">
           A Little About the Couple
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
