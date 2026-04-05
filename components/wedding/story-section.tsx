"use client"

import Image from "next/image"

const storyItems = [
  {
    year: "",
    title: "How We Met",
    description: "",
    image: "https://wavetrustfinance.com/assets/images/wedding/gallery4.jpeg",
  },
  {
    year: "",
    title: "The First Date",
    description: "",
    image: "https://wavetrustfinance.com/assets/images/wedding/gallery3.jpeg",
  },
  {
    year: "",
    title: "The Proposal",
    description:
      "On a beautiful sunset evening at our favorite beach, surrounded by the gentle sound of waves, the big question was asked. Through happy tears, the answer was yes!",
    image: "https://wavetrustfinance.com/assets/images/wedding/gallery5.jpeg",
  },
]

export function StorySection() {
  return (
    <section id="story" className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Our Journey
          </p>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-wide">
            Our Story
          </h2>

          <div className="mt-6 mx-auto w-16 h-px bg-primary" />
        </div>

        {/* Timeline */}
        <div className="space-y-20 md:space-y-32">
          {storyItems.map((item, index) => {

            const shouldCenter = index === 0 || index === 1

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                } items-center gap-8 md:gap-16`}
              >

                {/* IMAGE */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  className={`w-full md:w-1/2 ${
                    shouldCenter
                      ? "flex justify-center"
                      : "text-center md:text-left"
                  }`}
                >

                  {/* ✅ LUXURY CARD ONLY FOR FIRST TWO */}
                  {shouldCenter ? (
                    <div className="relative text-center p-10 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-black/40 border border-white/30 shadow-2xl max-w-lg">

                      {/* glow background */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-200/30 via-transparent to-amber-200/30 opacity-70 pointer-events-none" />

                      <span className="relative block text-accent font-serif text-5xl md:text-6xl font-light mb-4">
                        {item.year}
                      </span>

                      <h3 className="relative font-serif text-2xl md:text-3xl mb-4 tracking-wide">
                        {item.title}
                      </h3>

                      <p className="relative text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ) : (

                    /* ✅ PROPOSAL — UNCHANGED */
                    <div>
                      <span className="inline-block text-accent font-serif text-5xl md:text-6xl font-light mb-4">
                        {item.year}
                      </span>

                      <h3 className="font-serif text-2xl md:text-3xl mb-4">
                        {item.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}