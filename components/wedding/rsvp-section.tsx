"use client"

import { useState } from "react"
import { Send, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

export function RsvpSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attendance, setAttendance] = useState("attending")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          attendance,
          guestCount: attendance === "attending" ? parseInt(formData.get("guests") as string) || 1 : 0,
          dietaryRestrictions: formData.get("dietary"),
          message: formData.get("message"),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit RSVP")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-20 md:py-32 bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Thank You!
          </h2>
          <p className="text-muted-foreground text-lg">
            Your RSVP has been received. We can&apos;t wait to celebrate with you!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Will You Join Us?
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-wide">
            RSVP
          </h2>
          <div className="mt-6 mx-auto w-16 h-px bg-primary" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            Please let us know by April 21, 2026 if you&apos;ll be able to join us on our special day.
          </p>
        </div>

        {/* RSVP Form */}
        <Card className="border-border shadow-lg">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="Your first name"
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Your last name"
                    className="bg-background border-border"
                  />
                </div>
              </div>

              {/* Attendance */}
              <div className="space-y-3">
                <Label className="text-foreground">Will you be attending?</Label>
                <RadioGroup
                  value={attendance}
                  onValueChange={setAttendance}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="attending" id="attending" />
                    <Label htmlFor="attending" className="font-normal cursor-pointer">
                      Joyfully Accept
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="maybe" />
                    <Label htmlFor="maybe" className="font-normal cursor-pointer">
                      Maybe
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-attending" id="not-attending" />
                    <Label htmlFor="not-attending" className="font-normal cursor-pointer">
                      Regretfully Decline
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>
              )}

              {attendance === "attending" && (
                <>
                  {/* Number of Guests */}
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-foreground">Number of Guests (including yourself)</Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      max="5"
                      defaultValue="1"
                      className="bg-background border-border w-24"
                    />
                  </div>

                  {/* Dietary Restrictions */}
                  <div className="space-y-2">
                    <Label htmlFor="dietary" className="text-foreground">Dietary Restrictions</Label>
                    <Input
                      id="dietary"
                      name="dietary"
                      placeholder="e.g., Vegetarian, Gluten-free, Allergies"
                      className="bg-background border-border"
                    />
                  </div>
                </>
              )}

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">Message for the Couple (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Share your well wishes..."
                  rows={4}
                  className="bg-background border-border resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-sm tracking-wide"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send RSVP
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
