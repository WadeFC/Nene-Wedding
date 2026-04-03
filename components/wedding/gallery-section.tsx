"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Placeholder gallery images - replace with actual images
const galleryImages = [
  {
    id: 1,
    src: "/images/gallery/photo-1.jpg",
    alt: "Couple at sunset",
    caption: "Our first date spot",
  },
  {
    id: 2,
    src: "/images/gallery/photo-2.jpg",
    alt: "Engagement photo",
    caption: "The day we got engaged",
  },
  {
    id: 3,
    src: "/images/gallery/photo-3.jpg",
    alt: "Travel memories",
    caption: "Exploring Paris together",
  },
  {
    id: 4,
    src: "/images/gallery/photo-4.jpg",
    alt: "Family gathering",
    caption: "Meeting the families",
  },
  {
    id: 5,
    src: "/images/gallery/photo-5.jpg",
    alt: "Adventure together",
    caption: "Hiking adventures",
  },
  {
    id: 6,
    src: "/images/gallery/photo-6.jpg",
    alt: "Cozy moments",
    caption: "Lazy Sunday mornings",
  },
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "unset"
  }

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <section id="gallery" className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Memories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Our Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of our favorite moments together
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-card text-sm font-medium">{image.caption}</p>
              </div>
            </button>
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center mt-10">
          <Link href="/guestbook">
            <Button variant="outline" className="group">
              View More & Leave a Wish
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-card hover:text-card/80 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 text-card hover:text-card/80 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 text-card hover:text-card/80 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          <div
            className="relative w-full max-w-4xl h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <div className="absolute bottom-0 left-0 right-0 text-center p-4 bg-gradient-to-t from-foreground/50 to-transparent">
              <p className="text-card font-medium">
                {galleryImages[selectedImage].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
