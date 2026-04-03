"use client"

import { useState } from "react"

export default function GuestbookPage() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message }),
    })

    const data = await res.json()

    if (data.success) {
      alert("Wish submitted ✅")
      setName("")
      setMessage("")
    } else {
      alert(data.error || "Failed to submit wish")
    }

    setLoading(false)
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Guestbook</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  )
}