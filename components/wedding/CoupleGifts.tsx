"use client";

import { useState } from "react";

export function CoupleGifts() {
  const revolutAccountNumber = "01703900"; // Replace with actual number
  const revolutSortCode = "04-29-09"; // Replace with actual sort code
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <section id="rsvp" className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Gifts and Presents
          </h2>

          <h5 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-wide">
            Amazon Wedding List
          </h5>

          <a
            href="https://www.amazon.co.uk/wedding/share/GodsFavour"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            Visit Amazon List
          </a>

          <h5 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-wide mt-8">
            Revolut-Pounds
          </h5>

            <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">
              Chijindu Favour
          </h2>


          {/* Account Number */}
          <div className="mt-4">
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-lg">{revolutAccountNumber}</span>
              <button
                onClick={() => handleCopy(revolutAccountNumber, "account")}
                className="text-xs underline text-muted-foreground hover:text-primary"
              >
                {copiedField === "account" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Sort Code */}
          <div className="mt-2">
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-lg">{revolutSortCode}</span>
              <button
                onClick={() => handleCopy(revolutSortCode, "sort")}
                className="text-xs underline text-muted-foreground hover:text-primary"
              >
                {copiedField === "sort" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="mt-6 mx-auto w-16 h-px bg-primary" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            Please let us know by March 21, 2026 if you'll be able to join us on our special day.
          </p>
        </div>
      </div>
    </section>
  );
}   