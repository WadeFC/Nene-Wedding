"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Send, ImagePlus, X, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

interface WellWish {
  id: number
  name: string
  message: string
  image_url: string | null
  created_at: string
}

interface GalleryImage {
  id: number
  image_url: string
  caption: string | null
  uploaded_by: string | null
  created_at: string
}

export default function GuestbookPage() {
  const [wishes, setWishes] = useState<WellWish[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<"wishes" | "gallery">("wishes")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [wishesRes, galleryRes] = await Promise.all([
        fetch("/api/wishes"),
        fetch("/api/photos"),
      ])

      if (wishesRes.ok) {
        const wishesData = await wishesRes.json()
        setWishes(wishesData.wishes || [])
      }

      if (galleryRes.ok) {
        const galleryData = await galleryRes.json()
        setGalleryImages(galleryData.images || [])
      }
    } catch (err) {
      console.error("Error fetching data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitWish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          message: formData.get("message"),
          imageUrl: selectedImage,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit")
      }

      setIsSubmitted(true)
      setSelectedImage(null)
      fetchData()

      // Reset form
      e.currentTarget.reset()
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // For now, create a local URL preview
      // In production, you would upload to a storage service
      const url = URL.createObjectURL(file)
      setSelectedImage(url)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <span className="font-serif text-xl tracking-wide text-foreground">
              Guddy & Nene
            </span>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-12">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
              Share Your Love
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Guestbook & Gallery
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leave us a heartfelt message, share your favorite photos, and be part of our celebration
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-10">
            <Button
              variant={activeTab === "wishes" ? "default" : "outline"}
              onClick={() => setActiveTab("wishes")}
              className="gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Well Wishes
            </Button>
            <Button
              variant={activeTab === "gallery" ? "default" : "outline"}
              onClick={() => setActiveTab("gallery")}
              className="gap-2"
            >
              <ImagePlus className="h-4 w-4" />
              Photo Gallery
            </Button>
          </div>

          {/* Well Wishes Tab */}
          {activeTab === "wishes" && (
            <div className="space-y-10">
              {/* Submit Form */}
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <h2 className="font-serif text-2xl text-foreground mb-6 text-center">
                    Leave a Message
                  </h2>

                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Heart className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-serif text-xl text-foreground mb-2">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground">
                        Your message has been added to our guestbook.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitWish} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Your Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Share your wishes, memories, or advice for the happy couple..."
                          rows={4}
                          required
                        />
                      </div>

                      {/* Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Add a Photo (Optional)
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                        {selectedImage ? (
                          <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                            <Image
                              src={selectedImage}
                              alt="Selected"
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setSelectedImage(null)}
                              className="absolute top-1 right-1 bg-foreground/80 text-card rounded-full p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                          >
                            <ImagePlus className="h-5 w-5" />
                            <span>Choose an image</span>
                          </button>
                        )}
                      </div>

                      {error && (
                        <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                          {error}
                        </p>
                      )}

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner className="mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Your Wish
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Messages List */}
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-6 text-center">
                  Messages from Loved Ones
                </h2>

                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Spinner className="h-8 w-8" />
                  </div>
                ) : wishes.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Be the first to leave a message!
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {wishes.map((wish) => (
                      <Card key={wish.id} className="overflow-hidden">
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            {wish.image_url && (
                              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={wish.image_url}
                                  alt={`Photo from ${wish.name}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-serif text-lg text-foreground">
                                  {wish.name}
                                </h3>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(wish.created_at)}
                                </span>
                              </div>
                              <p className="text-muted-foreground leading-relaxed">
                                {wish.message}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="space-y-10">
              {/* Upload Section */}
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <h2 className="font-serif text-2xl text-foreground mb-4 text-center">
                    Share Your Photos
                  </h2>
                  <p className="text-muted-foreground text-center mb-6">
                    Upload your favorite photos of us or from the celebration
                  </p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="gap-2">
                      <ImagePlus className="h-4 w-4" />
                      Upload Photos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Gallery Grid */}
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-6 text-center">
                  Photo Gallery
                </h2>

                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Spinner className="h-8 w-8" />
                  </div>
                ) : galleryImages.length === 0 ? (
                  <div className="text-center py-12">
                    <ImagePlus className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No photos yet. Be the first to share!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.map((image) => (
                      <div
                        key={image.id}
                        className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer"
                      >
                        <Image
                          src={image.image_url}
                          alt={image.caption || "Gallery image"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300" />
                        {(image.caption || image.uploaded_by) && (
                          <div className="absolute inset-0 flex flex-col items-start justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {image.caption && (
                              <p className="text-card text-sm font-medium">
                                {image.caption}
                              </p>
                            )}
                            {image.uploaded_by && (
                              <p className="text-card/80 text-xs">
                                By {image.uploaded_by}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-serif text-2xl text-foreground mb-2">
            Godwin & Favour
          </p>
          <p className="text-muted-foreground text-sm">
            February 26, 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
