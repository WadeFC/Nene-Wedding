"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavLink {
  href: string
  label: string
  isPage?: boolean
}

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#gallery", label: "Gallery" },
  { href: "#schedule", label: "Schedule" },
  { href: "#venue", label: "Venue" },
  { href: "#accommodations", label: "Stay" },
  { href: "#rsvp", label: "RSVP" },
  { href: "/guestbook", label: "Guestbook", isPage: true },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => scrollToSection("#home")}
            className="font-serif text-xl tracking-wide text-foreground"
          >
            Guddy & Nene
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link: NavLink) => (
              <li key={link.href}>
                {link.isPage ? (
                  <Link
                    href={link.href}
                    className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link: NavLink) => (
                <li key={link.href}>
                  {link.isPage ? (
                    <Link
                      href={link.href}
                      className="block w-full text-left text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="block w-full text-left text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
