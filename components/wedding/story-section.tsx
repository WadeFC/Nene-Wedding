"use client"

import Image from "next/image"

const storyItems = [
  {
    year: "",
    title: "How We Met",
    description: "We crossed paths at a mutual friend’s online show and what started like a check up conversation turned into endless conversations and laughter",
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
                      <div className="relative max-w-lg text-center group">

                        {/* Luxury Glow Background */}
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br 
                          from-[#800020]/40 via-[#d8a7b1]/30 to-[#d4af37]/40 
                          blur-xl opacity-70 group-hover:opacity-100 transition duration-700" />

                        {/* Card */}
                        <div className="relative p-12 rounded-3xl 
                          bg-white/70 dark:bg-black/50 
                          backdrop-blur-xl border border-white/40
                          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                          transition-all duration-500
                          group-hover:-translate-y-2
                          group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]">

                          {/* Gold Divider */}
                          <div className="mx-auto mb-6 w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

                          {/* Title */}
                          <h3 className="font-serif text-3xl md:text-4xl tracking-wide text-[#800020] mb-6">
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p className="text-muted-foreground leading-relaxed text-lg">
                            {item.description}
                          </p>

                          {/* Bottom Accent */}
                          <div className="mt-8 mx-auto w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#d4af37] rounded-full" />
                          </div>

                        </div>
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