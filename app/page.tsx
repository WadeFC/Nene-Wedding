import { Navigation } from "@/components/wedding/navigation"
import { HeroSection } from "@/components/wedding/hero-section"
import { StorySection } from "@/components/wedding/story-section"
import { StorySectionTales } from "@/components/wedding/story-section-tales"
import { GallerySection } from "@/components/wedding/gallery-section"
import { ScheduleSection } from "@/components/wedding/schedule-section"
import { VenueSection } from "@/components/wedding/venue-section"
import { AccommodationsSection } from "@/components/wedding/accommodations-section"
import { RsvpSection } from "@/components/wedding/rsvp-section"
import { CoupleGifts } from "@/components/wedding/CoupleGifts"
import { Footer } from "@/components/wedding/footer"

export default function WeddingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <StorySection/>
      <GallerySection />
      <StorySectionTales />
      <ScheduleSection />
      <VenueSection />
      <AccommodationsSection />
      <RsvpSection />
      <CoupleGifts />
      <Footer />
    </main>
  )
}
